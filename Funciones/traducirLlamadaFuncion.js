//----------------------------------------- TRADUCCION DE LLAMADA DE FUNCION CON PARAMETROS ----------------------------------
function traduccionLlamadaFuncionParametrosAsignacion(fun, ambito, clase, funcionActual){
    var cadena = "";
    var noParametros = fun.lstPar.length;
    var simbolo = buscarFuncionTraduccionAsignacion(fun.nomFun, ambito, "funcion", simbolos, noParametros);
    var inicioTmp = 0;
    var finalTmp = 0;
    if(simbolo.length!= 0){
        var funFinal = null;
        for(var f in simbolo){
            var par = simbolo[f].lstParametros;
            var noPar = 0;
            for(var p in fun.lstPar){
                for(var pa in par){
                    if(fun.lstPar[p].val.parametro.id == par[pa].id){
                        noPar++;
                    }
                }
            }
            if(noPar == simbolo[f].lstParametros.length){
                funFinal = simbolo[f];
                break;
            }
        }

        var nombreFuncion = funFinal.nombre;
        var cadPar = "";
        var cadExp = "";
        for(var x in fun.lstPar){
            var simboloPar = obtenerSimboloTraduccionParametros(fun.lstPar[x].val.parametro.id, nombreFuncion, simbolos);
            var exp =  Expresion(fun.lstPar[x], ambito, clase, funcionActual, simboloPar.tipo);
            if((simboloPar.tipo.toLowerCase() == "integer" || simboloPar.tipo.toLowerCase() == "char" || simboloPar.tipo.toLowerCase() == "double"
                                || simboloPar.tipo.toLowerCase() == "boolean" ) && !(simboloPar.rol == "arreglo")){
                //ignoramos si es paso por referencia
                var tmp = generarTemp();    
                cadExp += exp.cadena;
                finalTmp = numTemp;
                cadPar += tmp+" = P + "+simboloPar.posicion+";\n";
                cadPar += "Stack["+tmp+"] = "+exp.anterior+";\n";                    
            }else{
                if(fun.lstPar[x].tipo == "valor"){
                    var tmp = generarTemp();
                    var tmp2 = generarTemp();
                    var tmp3 = generarTemp();
                    var tmp4 = generarTemp();
                    cadExp += exp.cadena;
                    finalTmp = numTemp;
                    var tamPosActual = buscarFuncionTraduccionActualTam(funcionActual, ambi, simbolos);
                    
                    if(simboloPar.rol == "estructura"){
                        
                        var eddPadre = obtenerEstructura(simboloPar.tipo, estructuras);     
                        cadPar += "##--- Obtengo parametro por valor - edd\n"; 
                        cadPar += "P = P + "+tamPosActual+";\n";
                        cadPar += tmp + "= P + 2 \n";
                        cadPar += "Stack["+tmp+"] = "+exp.anterior+"; \n";
                        cadPar += tmp2 + "= P + 3;\n";
                        cadPar += "Stack["+tmp2+"] = " +eddPadre.lstEdd.length+"; \n";
                        cadPar += "call clonar_object;\n";
                        cadPar += tmp3+" = P + 0;\n";
                        cadPar += tmp3+" = Stack["+tmp3+"];\n";
                        cadPar += "P = P - "+tamPosActual+";\n";

                        cadPar += tmp4 + "= P +"+simboloPar.posicion+";\n";
                        cadPar += "Stack["+tmp4+"] = "+tmp3+"; \n";
                        cadPar += "##---- Finaliza parametro por valor - edd\n";
                    }else if(simboloPar.rol == "arreglo" || simboloPar.rol == "arregloEdd"){
                        cadPar += "##--- Objengo parametros por valor - arr \n";
                        cadPar += "P = P + "+tamPosActual+";\n";
                        cadPar += tmp+" = P + 2;\n";
                        cadPar += "Stack["+tmp+"] = "+exp.anterior+";\n";
                        cadPar += "call arreglo_linealize;\n";
                        cadPar += tmp2+"=  P + 0;\n";
                        cadPar += tmp3+" = Stack["+tmp2+"];\n";
                        cadPar += "P = P - "+tamPosActual+";\n";
                        cadPar += tmp4 + "= P +"+simboloPar.posicion+";\n";
                        cadPar += "Stack["+tmp4+"] = "+tmp3+"; \n";
                        cadPar += "##--- Finaliza parametro por valor - arr \n";    
                
                    }
                    
                }else{
                    var tmp = generarTemp();
                    var tmp2 = generarTemp();
                    cadExp += exp.cadena;
                    finalTmp = numTemp;
                    cadPar += tmp + "= P +"+simboloPar.posicion+";\n";
                    cadPar += "Stack["+tmp+"] = "+exp.anterior+"; \n";
                   /* var pos = simboloPar.posicion + 1;
                    cadPar += tmp2 + "= P +"+pos+";\n";
                    cadPar += "Stack["+tmp2+"] ="+exp.extra+"; \n";*/
                }
             }
        }
        var funActual = 
       
        inicioTmp = funFinal.inicioTmp;
        var tmpReturn = generarTemp();
        var tmpReturn2 = generarTemp();
        var cadReturn = "";
        cadReturn += tmpReturn +" = P + 0;\n"
        cadReturn += tmpReturn2 + " = Stack["+tmpReturn+"];\n";

        var ambi = clase+"_Global";
        var funActual = buscarFuncionTraduccionActual(funcionActual, ambi, simbolos);
        var tamPosActual = 0;
        if(funActual!= null){
           tamPosActual =  funActual[0].tamano;
        }
        cadena += "##----- Inicio llamada a funcion "+funFinal.nombre+"\n";
        cadena += cadExp+"\n";
        cadena += "P = P + "+tamPosActual+";\n";
        var extra = "";
        var fin = 0;
        if(ambito[ambito.length-1].includes(funFinal.nombre)){ 
            for(var aux2=funFinal.inicioTmp; aux2 < finalTmp - 1; aux2++){
                extra += "Stack[P] = t"+aux2+";\n";
                extra += "P = P + 1;\n";
                fin = aux2;
            }
        }
        cadena += extra +"\n";
        cadena += cadPar+ "\n";
        cadena += "call "+funFinal.nombre+";\n";
        cadena += cadReturn+"\n";
        var extra2 = "";
        if(ambito[ambito.length-1].includes(funFinal.nombre)){
            for(var aux2 = fin ; aux2 >= funFinal.inicioTmp ; aux2--){
                 extra2 += "P = P - 1;\n";
                 extra2 += "t"+aux2+"= Stack[P]; \n";  
            }
        }
        cadena += extra2 +"\n";
        cadena += "P = P - "+tamPosActual+";\n";
        cadena += "##----- Finaliza llamada a funcion "+funFinal.nombre+"\n";

        return {cadena:cadena, anterior:tmpReturn2 , tipo:funFinal.tipo};
    }else{
        //no existe funcion
    }


}

function traduccionLlamadaFuncionParametrosExpresion(fun, ambito, clase, funcionActual){
    var cadena = "";
    var noParametros = fun.lstPar.length;
    var lstParametros = { par:[] };        
    var cadParametros = "";
    for(var p in fun.lstPar){
        var expPar = Expresion(fun.lstPar[p], ambito, clase, funcionActual, "callFun");
        lstParametros.par.push(expPar);
        cadParametros += "_"+expPar.tipo;
    }

    var nombreFuncion = "";
   
    var funciones =  buscarFuncionTraduccionAsignacion(fun.nomFun, ambito, "funcion", simbolos, noParametros);
    var funcion = null;
    for(var f in funciones){
        if(funciones[f].parametros == noParametros){
            var nomFun = funciones[f].nombre.split("_");
            var n = nomFun.length-1;
            var total = 0;
            var pos = noParametros-1;
            for(var p = pos; p >= 0 ; p--){
                if( nomFun[n] == lstParametros.par[p].tipo || (lstParametros.par[p].tipo == "double" && nomFun[n] =="integer")
                ||(lstParametros.par[p].tipo == "integer" && nomFun[n] =="double") ||(lstParametros.par[p].tipo == "char" && nomFun[n] =="integer") 
                  ||(lstParametros.par[p].tipo == "char" && nomFun[n] =="double")){
                    n--;
                    total++;
                }
            }
            if(total == funciones[f].parametros){
                funcion = funciones[f];
                break;
            }
        }
    }



    var inicioTmp = 0;
    var finalTmp = 0;
   
    if(funcion != null){
        var cadPar = "";
        var cadExp = "";
        nombreFuncion = funcion.nombre;
        for(var x in funcion.lstParametros){
            var simboloPar = obtenerSimboloTraduccionParametros(funcion.lstParametros[x].id , nombreFuncion, simbolos);
            var exp = lstParametros.par[x];
            if((simboloPar.tipo.toLowerCase() == "integer" || simboloPar.tipo.toLowerCase() == "char" || simboloPar.tipo.toLowerCase() == "double"
                                || simboloPar.tipo.toLowerCase() == "boolean") && !(simboloPar.rol == "arreglo")){
                //ignoramos si es paso por referencia
                var tmp = generarTemp();    
                cadExp += exp.cadena;
                finalTmp = numTemp;
                cadPar += tmp+" = P + "+simboloPar.posicion+";\n";
                cadPar += "Stack["+tmp+"] = "+exp.anterior+";\n";                    
            }else{
                if(fun.lstPar[x].tipo == "valor"){
                    var tmp = generarTemp();
                    var tmp2 = generarTemp();
                    var tmp3 = generarTemp();
                    var tmp4 = generarTemp();
                    var tmp5 = generarTemp();
                    cadExp += exp.cadena;
                    finalTmp = numTemp;
                    var tamPosActual = buscarFuncionTraduccionActualTam(funcionActual, ambi, simbolos);

                    if(simboloPar.rol == "estructura"){
                        
                        var eddPadre = obtenerEstructura(simboloPar.tipo, estructuras);     
                        cadPar += "##--- Obtengo parametro por valor - edd\n"; 
                        cadPar += "P = P + "+tamPosActual+";\n";
                        cadPar += tmp + "= P + 2 \n";
                        cadPar += "Stack["+tmp+"] = "+exp.anterior+"; \n";
                        cadPar += tmp2 + "= P + 3;\n";
                        cadPar += "Stack["+tmp2+"] = " +eddPadre.lstEdd.length+"; \n";
                        cadPar += "call clonar_object;\n";
                        cadPar += tmp3+" = P + 0;\n";
                        cadPar += tmp3+" = Stack["+tmp3+"];\n";
                        cadPar += "P = P - "+tamPosActual+";\n";

                        cadPar += tmp4 + "= P +"+simboloPar.posicion+";\n";
                        cadPar += "Stack["+tmp4+"] = "+tmp3+"; \n";
                        cadPar += "##---- Finaliza parametro por valor - edd\n";
                    }else if(simboloPar.rol == "arreglo" || simboloPar.rol == "arregloEdd"){
                        cadPar += "##--- Objengo parametros por valor - arr \n";
                        cadPar += "P = P + "+tamPosActual+";\n";
                        cadPar += tmp+" = P + 2;\n";
                        cadPar += "Stack["+tmp+"] = "+exp.anterior+";\n";
                        cadPar += "call arreglo_linealize;\n";
                        cadPar += tmp2+"=  P + 0;\n";
                        cadPar += tmp3+" = Stack["+tmp2+"];\n";
                        cadPar += "P = P - "+tamPosActual+";\n";
                        cadPar += tmp4 + "= P +"+simboloPar.posicion+";\n";
                        cadPar += "Stack["+tmp4+"] = "+tmp3+"; \n";
                        cadPar += "##--- Finaliza parametro por valor - arr \n";    
                
                    }
                    
                }else{
                    var tmp = generarTemp();
                    var tmp2 = generarTemp();
                    cadExp += exp.cadena;
                    finalTmp = numTemp;
                    cadPar += tmp + "= P +"+simboloPar.posicion+";\n";
                    cadPar += "Stack["+tmp+"] = "+exp.anterior+"; \n";
                }
             }
        }

       
        inicioTmp = funcion.inicioTmp;
        var tmpReturn = generarTemp();
        var tmpReturn2 = generarTemp();
        var ambi = clase+"_Global";
        var funActual = buscarFuncionTraduccionActual(funcionActual, ambi, simbolos);
        var tamPosActual = 0;
        if(funActual!= null){
           tamPosActual =  funActual[0].tamano;
        }
        var cadReturn = "";
        cadReturn += tmpReturn +" = P + 0;\n"
        cadReturn += tmpReturn2 + " = Stack["+tmpReturn+"];\n";

        cadena += "##----- Inicio llamada a funcion "+funcion.nombre+"\n";
        cadena += cadExp+"\n";
        cadena += "P = P + "+tamPosActual+";\n";
        var extra = "";
        var fin = 0;
        if(ambito[ambito.length-1].includes(funcion.nombre)){ 
            for(var aux2=funcion.inicioTmp; aux2 < finalTmp - 1; aux2++){
                extra += "Stack[P] = t"+aux2+";\n";
                extra += "P = P + 1;\n";
                fin = aux2;
            }
        }
        cadena += extra +"\n";
        cadena += cadPar+ "\n";
        cadena += "call "+funcion.nombre+";\n";
        cadena += cadReturn+"\n";
        var extra2 = "";
        if(ambito[ambito.length-1].includes(funcion.nombre)){
            for(var aux2 = fin ; aux2 >= funcion.inicioTmp ; aux2--){
                 extra2 += "P = P - 1;\n";
                 extra2 += "t"+aux2+"= Stack[P]; \n";  
            }
        }
        cadena += extra2 +"\n";
        cadena += "P = P - "+tamPosActual+";\n";
        cadena += "##----- Finaliza llamada a funcion "+funcion.nombre+"\n";

        return {cadena:cadena, anterior:tmpReturn2 , tipo:funcion.tipo};
    }else{
        //no existe funcion
    }

}

function traduccionLlamadaFuncionParametros(fun, ambito, clase, funcion){
    var noParametrosAsig = 0;
    var noParametrosExp = 0;
    for(var i in fun.lstPar){
        var par = fun.lstPar[i];
        if(par.val.nombre == "asig"){
            noParametrosAsig++;
        }else{
            noParametrosExp++;
        }
    }
    if(noParametrosAsig == fun.lstPar.length){
        //Entonces todos los parametros son tipo asignacion
        return traduccionLlamadaFuncionParametrosAsignacion(fun, ambito, clase, funcion);
    }else if(noParametrosExp == fun.lstPar.length){
        //Entonces todos los parametros son tipo 
        return traduccionLlamadaFuncionParametrosExpresion(fun, ambito, clase, funcion);
    }else{
        var desp = "La llamada a la funcion "+fun.nomFun +" no coinciden el tipo de parametros (asignacion o expresion).";
        var errorV = {tipo:"semantico", descripcion:desp, fila:1, columna:1};
        errores.error.push(errorV);
        return "";
    }
}

//------------------------------------------- TRADUCCION DE FUNCIONES SIN PARAMETROS -------------------------------------------
function traduccionLlamadaFuncion(fun, amb, clase, funcionActual){
    var cadena = "";
    var nombreFuncion = "";
    nombreFuncion += claseActual+"_"+fun.nomFun;
    var funcion = buscarFuncionTraduccion(nombreFuncion, amb, "funcion", simbolos, 0);
    if(funcion != null){
        inicioTmp = funcion.inicioTmp;
        var tmpReturn = generarTemp();
        var tmpReturn2 = generarTemp();
        var cadReturn = "";
        
        var ambi = clase+"_Global";
        var funActual = buscarFuncionTraduccionActual(funcionActual, ambi, simbolos);
        var tamPosActual = 0;
        if(funActual!= null){
           tamPosActual =  funActual[0].tamano;
        }
        cadReturn += tmpReturn +" = P + 0;\n"
        cadReturn += tmpReturn2 + " = Stack["+tmpReturn+"];\n";
        cadena += "##----- Inicio llamada a funcion "+funcion.nombre+"\n";
        cadena += "P = P + "+tamPosActual+";\n";
        var extra = "";
        var fin = 0;
        if(amb[amb.length-1].includes(funcion.nombre)){ 
            for(var aux2=funcion.inicioTmp; aux2 < finalTmp - 1; aux2++){
                extra += "Stack[P] = t"+aux2+";\n";
                extra += "P = P + 1;\n";
                fin = aux2;
            }
        }
        cadena += extra +"\n";
        cadena += "call "+funcion.nombre+";\n";
        cadena += cadReturn+"\n";
        var extra2 = "";
        if(amb[amb.length-1].includes(funcion.nombre)){
            for(var aux2 = fin ; aux2 >= funcion.inicioTmp ; aux2--){
                 extra2 += "P = P - 1;\n";
                 extra2 += "t"+aux2+"= Stack[P]; \n";  
            }
        }
        cadena += extra2 +"\n";
        cadena += "P = P - "+tamPosActual+";\n";
        cadena += "##----- Finaliza llamada a funcion "+funcion.nombre+"\n";

        return {cadena:cadena, anterior:tmpReturn2 , tipo:funcion.tipo};
    }else{
        //no existe funcion
    }

}