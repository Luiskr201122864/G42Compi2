function traduccionDeclaracionEstructura(estructura, amb, ts, edd, clase , funcion){
    console.log("ESTOY EN GUARDAR ESTRUCTURA ");
    var rol = "estructura";
    for(var i in estructura.lisId){
        var ide = estructura.lisId[i];
        var simbolo = obtenerSimboloTraduccionEdd(ide, rol, amb, ts, amb.length);
        var cadena = "";
        if(simbolo!=null){
            var existeEdd = existeEstructura(estructura.padre, edd);
            if(existeEdd){
                if(estructura.nombre == "declaracionEddTipo1"){
                   //Con expresion\
                   console.log(estructura);
                     
                   var tmp = generarTemp(); 
                   var ambito = simbolo.ambito;
                   var esGlobal = ambito.includes("Global");
                   var exp = Expresion(estructura.exp, amb,clase, funcion, simbolo.tipo);   
                 
                    if(esGlobal){
                        // Es global
                            //cadena += "H = H + 1;\n"
                            var tmp = generarTemp();
                            cadena += exp.cadena;
                            cadena += tmp +" = "+ simbolo.posicion +";\n";
                            cadena += "Heap["+tmp+"] = "+exp.anterior+";\n";
                        }else{
                            // No es global 
                            var tmp2 = generarTemp();
                            cadena += exp.cadena;
                            cadena += tmp2 + " = P + " + simbolo.posicion + ";\n";
                            cadena += "Stack[" + tmp2 + "] = "+ exp.anterior + ";\n";
                        }
                    
                   
                }else{
                    //cadena += "H = H + 1;";
                    
                }
            }else if(estructura.padre.toLowerCase() == "string"){
                var tmp = generarTemp(); 
                var ambito = simbolo.ambito;
                var esGlobal = ambito.includes("Global");
                var exp = Expresion(estructura.exp, amb,clase, funcion, simbolo.tipo);   
                 if(esGlobal){
                         var tmp = generarTemp();
                         cadena += exp.cadena;
                         cadena += tmp +" = "+ simbolo.posicion +";\n";
                         cadena += "Heap["+tmp+"] = "+exp.anterior+";\n";
                     }else{
                         // No es global 
                         var tmp2 = generarTemp();
                         cadena += exp.cadena;
                         cadena += tmp2 + " = P + " + simbolo.posicion + ";\n";
                         cadena += "Stack[" + tmp2 + "] = "+ exp.anterior + ";\n";
                     }
            }
            return cadena; 
        }
    }
}


function traduccionAsignacionEstructura(asig, amb, ts, edd, clase, funcion){
    var original = asig.padre;
    var tipoEstructura = null;
    var cadena = "";
    var simbolo = null;
    cadena += "##----- Inicio asignacion atributos estructura\n";
    if(asig.padre != null){
        simbolo = obtenerSimboloTraduccion2(original, simbolos,amb);
        tipoEstructura = simbolo.tipo;
    }else{
      var variable = asig.extra.exp;
      simbolo = obtenerSimboloTraduccion2(variable, simbolos,amb);
      tipoEstructura = asig.extra.id.valor;
    }
    
    var cadAux = "";
    if(simbolo!=null){
        var tmp = generarTemp();
        var aux = generarTemp();
        var esGlobal = simbolo.ambito.includes("Global");
       
            if(esGlobal){
                // Es global
                    cadAux += aux +" = "+ simbolo.posicion +";\n";
                    cadAux += tmp +" = Heap["+aux+"];\n";
                }else{
                    // No es global
                    cadAux += aux + " = P + " + simbolo.posicion + ";\n";
                    cadAux += tmp +" = Stack[" + aux + "];\n";
                    //cadena += tmp +" = Heap["+tempAux+"];\n"
            }
       



        var eddPadre = obtenerEstructura(tipoEstructura, estructuras);
        var tipoAnterior = "";
        var expAnterior = null;
        var cadena2 = "";
        var tmpPosArr = "";
        if(eddPadre!= null){
            var anterior = "";
            var exp = Expresion(asig.exp, amb, clase, funcion, "asigEdd");
            var auxi = 1;
            cadena += exp.cadena+"\n";
            cadena += cadAux+"\n";
            for(var x in asig.lstObj){
                var atr = asig.lstObj[x];
                var pos = 0;
                for(var y in eddPadre.lstEdd){
                    var tmp2 = generarTemp();                  
                    if(eddPadre.lstEdd[y].id == atr.id){
                            

                         if(atr.nombre == "soloId"){
                            if(asig.lstObj.length == 1){
                                cadena += tmp2 +" = "+tmp+" + "+ pos +";\n";
                                anterior = tmp2;
                               // break;
                            }else if(asig.lstObj.length > 1 && auxi== 1 ){
                                var tmp3 = generarTemp();
                                cadena += tmp2 +" = "+tmp+" + "+ pos +";\n";
                                cadena += tmp3 +" = Heap["+tmp2+"];\n";
                                anterior = tmp3;
                                //break;
                            }else if(auxi >= 1 && auxi < asig.lstObj.length ){
                                var tmp3 = generarTemp();
                                var tmp4 = generarTemp();
                                cadena += tmp2 +" = Heap["+anterior+"];\n";
                                cadena += tmp3 +" = "+tmp2+" + "+pos+";\n";
                                cadena += tmp4 +" = Heap["+tmp3+"];\n";
                                anterior = tmp4;
                                //break;
                            }else if(asig.lstObj.length == auxi){
                                var tmp3 = generarTemp();
                                cadena += tmp2 +" = Heap["+anterior+"];\n";
                                cadena += tmp3 +" = "+tmp2+" + "+pos+";\n";
                                anterior = tmp3;
                                //break;
                            }
                        }else{
                            //arreglo
                            cadena += "##---- Inicio valor arreglo \n";
                            var posArr = Expresion(atr.exp, amb,clase, funcion, "");
                                var tmp1 = generarTemp();
                                var tmp2 = generarTemp();
                                var tmp3 = generarTemp();
                                var tmp4 = generarTemp();
                                var tmp5 = generarTemp();
                                var tmp6 = generarTemp();
                                var etq1 = generarEtiq();
                                var etq2 = generarEtiq();
                                cadena += posArr.cadena+"\n";
                                if(anterior == ""){
                                    anterior = tmp;
                                }
                                cadena += aux + " = "+anterior+" + "+pos+";\n";
                                cadena += tmp4 +" = Heap["+aux+"];\n";
                                cadena += tmp2 +" = Heap["+tmp4+"];\n";
                                cadena2 += cadena;
                                tmpPosArr = tmp2;
                                cadena += "if( "+posArr.anterior+" < "+tmp2+") goto "+etq1+";\n";
                                cadena += "goto "+etq2+";\n";
                                cadena += etq1+":\n";
                                cadena += tmp5+" = "+tmp4+" + 1;\n";
                                cadena += tmp3+" = "+tmp5+" + "+posArr.anterior+";\n";
                                cadena += etq2+":\n";
                                anterior = tmp3;
                                cadena += "##----- Final valor arreglo\n";
                                 
                        }

                        if(eddPadre.lstEdd[y].nombre == "atr"){ //tipoVar id
                            tipo = eddPadre.lstEdd[y].tipo;
                        }else if(eddPadre.lstEdd[y].nombre == "atrExp"){  //tipo id = exp
                                tipo = eddPadre.lstEdd[y].tipo;
                        }else if(eddPadre.lstEdd[y].nombre == "declaracionEddSin" || 
                                eddPadre.lstEdd[y].nombre == "declaracionEdd"){  //ID ID '=' exp 
                            tipo = eddPadre.lstEdd[y].padre;
                            if(tipo != simbolo.tipo){
                                eddPadre = obtenerEstructura(eddPadre.lstEdd[y].padre, estructuras);
                                y = 0;
                            }
                        }else if(eddPadre.lstEdd[y].nombre == "declaracionArr"){  //tipoVar '[' ']' lst_ids '=' expr
                            tipo = eddPadre.lstEdd[y].tipo;
                            tipoAnterior = "declaracionArr";
                            expAnterior = eddPadre.lstEdd[y].exp.valor;
                        }else if(eddPadre.lstEdd[y].nombre == "declaracionArrSinExp"){ //tipoVar '[' ']' ID 
                            tipo = eddPadre.lstEdd[y].tipo;
                            tipoAnterior = "declaracionArrSinExp";
                            expAnterior = null;
                        }else if(eddPadre.lstEdd[y].nombre == "declaracionEddArr"){ // ID []  ID = EXP
                            tipo = eddPadre.lstEdd[y].padre;
                            tipoAnterior = "declaracionEddArr";
                            expAnterior = eddPadre.lstEdd[y].exp.valor;
                            if(tipo != simbolo.tipo){
                                eddPadre = obtenerEstructura(eddPadre.lstEdd[y].padre, estructuras);
                                y = 0;
                            }
                        }else if(eddPadre.lstEdd[y].nombre == "declaracionEddArrSinExp" ){  // ID [] ID
                            tipo = eddPadre.lstEdd[y].padre;
                            tipoAnterior = "declaracionEddArrSinExp";
                            expAnterior = null;
                            if(tipo != simbolo.tipo){
                                eddPadre = obtenerEstructura(eddPadre.lstEdd[y].padre, estructuras);
                                y = 0;
                            }
                        }
                        break;

                    }
                   
                    pos++;
                }
                auxi++;
            }

            
            if(asig.exp.tipo == "declaracionEdd"){
                var tmp = generarTemp();
                cadena += tmp +" = "+exp.anterior+" + 1;\n"
                cadena += "Heap["+exp.anterior+"] = "+ tmp+";\n";
            }
            cadena += "Heap["+anterior+"] = "+exp.anterior+";\n";
            cadena += "##----- Final asignacion a atributos estructura\n";
            return cadena;
        }else{
            //no existe padre
        }
    }else{
        //no existe simbolo
    }
}


 

function traduccionAccesoObjetos(lstObj, ambitoValido, clase, metodoA, ref){
    var original = lstObj.padre;
    var cadena = "";
    var simbolo = null;
    var tipoEstructura = null;
    if(lstObj.padre != null){
        simbolo = obtenerSimboloTraduccion2(original, simbolos, ambitoValido);
        tipoEstructura = simbolo.tipo;
    }else{
        var variable = lstObj.cast.exp;
        simbolo = obtenerSimboloTraduccion2(variable, simbolos, ambitoValido);
        tipoEstructura = lstObj.cast.id.valor;
    }
    var pasoaca = false;
    if(simbolo!=null){
        var tmp = generarTemp();
        var aux = generarTemp();
        var esGlobal = simbolo.ambito.includes("Global");
       
            if(esGlobal){
                // Es global
                    cadena += aux +" = "+ simbolo.posicion +";\n";
                    cadena += tmp +" = Heap["+aux+"];\n";
                }else{
                    // No es global 
                    var tempAux = generarTemp();
                    cadena += aux + " = P + " + simbolo.posicion + ";\n";
                    cadena += tmp +" = Stack[" + aux + "];\n";
                    //cadena += tmp +" = Heap["+tempAux+"];\n"
                }
        //}

        if(simbolo.rol == "arreglo" || simbolo.rol == "arregloEdd"){
            if(lstObj.lstAtr.length == 1){
                if(lstObj.lstAtr[0].id.toLowerCase() == "length"){
                    cadena += "##--- Inicio atr length\n";
                    var tamArr = generarTemp();
                    cadena += tamArr+" = Heap["+tmp+"];\n";
                    cadena += "##--- Final atr length\n";
                    return {cadena: cadena, anterior:tamArr, tipo:"integer"};
                }
            }
        }
        var tipo = "";
        var anterior = "";
        var eddPadre = obtenerEstructura(tipoEstructura, estructuras);
        if(eddPadre!= null){
           
             var auxi = 1;
             var tipoAnterior = "";
             var expAnterior = null;
             var cadena2 = "";
             var tmpPosAr = "";
            
            for(var x in lstObj.lstAtr){
                var atr = lstObj.lstAtr[x];
                var pos = 0;
                for(var y in eddPadre.lstEdd){
                    var tmp2 = generarTemp();
                    if(eddPadre.lstEdd[y].id == atr.id){     
                       
                      
                            if(eddPadre.lstEdd[y].nombre == "atr" || eddPadre.lstEdd[y].nombre == "atrExp" ||
                            eddPadre.lstEdd[y].nombre == "declaracionEddSin" ||  eddPadre.lstEdd[y].nombre == "declaracionEdd" ){ //tipoVar id
                                if(eddPadre.lstEdd[y].nombre == "declaracionEddSin" || eddPadre.lstEdd[y].nombre == "declaracionEdd"){
                                    tipo = eddPadre.lstEdd[y].padre;
                                    if(tipo.toLowerCase()=="string"){
                                        tipo = "string";
                                    }
                                    if(tipo != simbolo.tipo && tipo!= "string"){
                                        eddPadre = obtenerEstructura(eddPadre.lstEdd[y].padre, estructuras);
                                        y = 0;
                                    }
                                }else{
                                    tipo = eddPadre.lstEdd[y].tipo;
                                }

                                    if(lstObj.lstAtr.length == 1){
                                        cadena += tmp2 +" = "+tmp+" + "+ pos +";\n";
                                        anterior = tmp2;
                                        break;
                                    }else if(lstObj.lstAtr.length > 1 && auxi== 1 ){
                                        var tmp3 = generarTemp();
                                        cadena += tmp2 +" = "+tmp+" + "+ pos +";\n";
                                        cadena += tmp3 +" = Heap["+tmp2+"];\n";
                                        anterior = tmp3;
                                        break;
                                    }else if(auxi >= 1 && auxi < lstObj.lstAtr.length ){
                                        var tmp3 = generarTemp();
                                        var tmp4 = generarTemp();
                                        cadena += tmp2 +" = Heap["+anterior+"];\n";
                                        cadena += tmp3 +" = "+tmp2+" + "+pos+";\n";
                                        cadena += tmp4 +" = Heap["+tmp3+"];\n";
                                        anterior = tmp4;
                                        break;
                                    }else if(lstObj.lstAtr.length == auxi){
                                        var tmp3 = generarTemp();
                                        cadena += tmp2 +" = Heap["+anterior+"];\n";
                                        cadena += tmp3 +" = "+tmp2+" + "+pos+";\n";
                                        anterior = tmp3;
                                        break;
                                    }  



                            }else  if(eddPadre.lstEdd[y].nombre == "declaracionArr" ||     //tipoVar '[' ']' lst_ids '=' expr
                                    eddPadre.lstEdd[y].nombre == "declaracionEddArr"){  //ID '[' ']' lst_ids '=' expr
                                    
                                    if(eddPadre.lstEdd[y].nombre == "declaracionEddArr"){
                                        tipo = eddPadre.lstEdd[y].padre;
                                        if(tipo.toLowerCase()=="string"){
                                            tipo = "string";
                                        }
                                        tipoAnterior = "declaracionEddArr";
                                        expAnterior = eddPadre.lstEdd[y].exp.valor;
                                        if(tipo != simbolo.tipo){
                                            eddPadre = obtenerEstructura(eddPadre.lstEdd[y].padre, estructuras);
                                            y = 0;
                                        }
                                    }else{
                                        tipo = eddPadre.lstEdd[y].tipo;
                                        tipoAnterior = "declaracionArr";
                                        expAnterior = eddPadre.lstEdd[y].exp.valor;
                                    }

                                    var tmp1 = generarTemp();
                                    var tmp2 = generarTemp();
                                    var tmp3 = generarTemp();
                                    var tmp4 = generarTemp();
                                    var tmp5 = generarTemp();
                                    var tmp6 = generarTemp();
                                    var etq1 = generarEtiq();
                                    var etq2 = generarEtiq();

                                    if(atr.nombre == "soloId"){
                                        cadena += "##---- Inicio valor arreglo \n";
                                        cadena += aux + " = "+anterior+" + "+pos+";\n";
                                        cadena += tmp4 +" = Heap["+aux+"];\n";
                                        cadena += tmp2 +" = Heap["+tmp4+"];\n";
                                        cadena2 += cadena;
                                        tmpPosArr = tmp2;
                                        cadena += "##---- Final valor arreglo \n";
                                    }else{    
                                        cadena += "##---- Inicio valor arreglo \n";
                                        var posArr = Expresion(atr.exp, ambitoValido, clase, metodoA, "");
                                        
                                        cadena += posArr.cadena+"\n";
                                        if(anterior == ""){
                                            anterior = tmp;
                                        }
                                        cadena += aux + " = "+anterior+" + "+pos+";\n";
                                        cadena += tmp4 +" = Heap["+aux+"];\n";
                                        cadena += tmp2 +" = Heap["+tmp4+"];\n";
                                        cadena2 += cadena;
                                        tmpPosArr = tmp2;
                                        cadena += "if( "+posArr.anterior+" < "+tmp2+") goto "+etq1+";\n";
                                        cadena += "goto "+etq2+";\n";
                                        cadena += etq1+":\n";
                                        cadena += tmp5+" = "+tmp4+" + 1;\n";
                                        cadena += tmp3+" = "+tmp5+" + "+posArr.anterior+";\n";
                                        cadena += etq2+":\n";
                                        anterior = tmp3;
                                        cadena += "##----- Final valor arreglo\n";
                                    }
                            }else if(eddPadre.lstEdd[y].nombre == "declaracionArrSinExp" //tipoVar '[' ']' ID 
                                    || eddPadre.lstEdd[y].nombre == "declaracionEddArrSinExp"){ //ID '[' ']' ID 

                                    if(eddPadre.lstEdd[y].nombre == "declaracionEddArrSinExp"){
                                        tipo = eddPadre.lstEdd[y].padre;
                                        if(tipo.toLowerCase()=="string"){
                                            tipo = "string";
                                        }
                                        tipoAnterior = "declaracionEddArrSinExp";
                                        expAnterior = null;
                                        if(tipo != simbolo.tipo){
                                            eddPadre = obtenerEstructura(eddPadre.lstEdd[y].padre, estructuras);
                                            y = 0;
                                        }
                                    }else{
                                        tipo = eddPadre.lstEdd[y].tipo;
                                        tipoAnterior = "declaracionArrSinExp";
                                        expAnterior = null;
                                    }

                                    var tmp1 = generarTemp();
                                    var tmp2 = generarTemp();
                                    var tmp3 = generarTemp();
                                    var tmp4 = generarTemp();
                                    var tmp5 = generarTemp();
                                    var tmp6 = generarTemp();
                                    var etq1 = generarEtiq();
                                    var etq2 = generarEtiq();

                                    if(atr.nombre == "soloId"){
                                        cadena += "##---- Inicio valor arreglo \n";
                                        if(anterior == ""){
                                            anterior = tmp;
                                        }
                                        cadena += tmp1 + " = "+anterior+" + "+pos+";\n";
                                        cadena += tmp4 +" = Heap["+tmp1+"];\n";
                                        cadena += tmp2 +" = Heap["+tmp4+"];\n";
                                        cadena2 += cadena;
                                        tmpPosArr = tmp2;
                                        cadena += "##---- Final valor arreglo \n";
                                    }else{ 
                                        cadena += "##---- Inicio valor arreglo \n";
                                        var posArr = Expresion(atr.exp, ambitoValido, clase, metodoA, "");
                                        
                                        cadena += posArr.cadena+"\n";
                                        if(anterior == ""){
                                            anterior = tmp;
                                        }
                                        cadena += aux + " = "+anterior+" + "+pos+";\n";
                                        cadena += tmp4 +" = Heap["+aux+"];\n";
                                        cadena += tmp2 +" = Heap["+tmp4+"];\n";
                                        cadena2 += cadena;
                                        tmpPosArr = tmp2;
                                        cadena += "if( "+posArr.anterior+" < "+tmp2+") goto "+etq1+";\n";
                                        cadena += "goto "+etq2+";\n";
                                        cadena += etq1+":\n";
                                        cadena += tmp5+" = "+tmp4+" + 1;\n";
                                        cadena += tmp3+" = "+tmp5+" + "+posArr.anterior+";\n";
                                        cadena += etq2+":\n";
                                        anterior = tmp3;
                                        cadena += "##----- Final valor arreglo\n";
                                    }
                            
                            
                            }
                            break;

                        
                    }else if(atr.id.toLowerCase() == "length" && !(tipo.toLowerCase()=="string")){
                        var tmp1 = generarTemp();
                        if(tipoAnterior == "declaracionEddArr"){
                            if(expAnterior.nombre == "initArrayEDD"){
                                var expt = Expresion(expAnterior.exp, ambitoValido, clase, metodoA, "");
                                return {cadena:expt.cadena, anterior:expt.anterior, tipo:"integer"};
                            }
                        }else if(tipoAnterior == "declaracionArr"){
                             if(expAnterior.nombre =="initArray" ){
                                var expt = Expresion(expAnterior.exp, ambitoValido, clase, metodoA, "");
                                return {cadena:expt.cadena, anterior:expt.anterior, tipo:"integer"};
                             }else if(expAnterior.nombre == "lstValores"){
                                var aux = "";
                                aux += tmp1+" = "+expAnterior.val.length+";\n";
                                return {cadena:aux, anterior:tmp1, tipo:"integer"};
                             }            
                        }else if(tipoAnterior == "declaracionEddArrSinExp" || tipoAnterior == "declaracionArrSinExp"){
                             return {cadena:cadena2, anterior:tmpPosArr , tipo:"integer" };
                        }
                    }else if(atr.nombre == "funProp"){
                        var tmp1 = generarTemp();
                        var tmp2 = generarTemp();
                        var tmp3 = generarTemp();
                        var tmp4 = generarTemp();
                        var tmp5 = generarTemp();

                        if(anterior == ""){
                            anterior = tmp;
                        }
                       


                        var fun = buscarFuncionTraduccionActualTam(metodoA, ambi, simbolos);
                        if(atr.id.toLowerCase() == "length"){
                            cadena += "P = P + "+fun+";\n";
                            cadena += tmp1+" = P + 2;\n";
                            cadena += "Stack["+tmp1+"] = "+anterior+";\n";
                            cadena += "call get_Length_String;\n";
                            cadena += tmp2+"=  P + 0;\n";
                            cadena += tmp3+" = Stack["+tmp2+"];\n";
                            cadena += "P = P - "+fun+";\n";
                            anterior = tmp3;
                            tipo = "integer";
                        }else if(atr.id.toLowerCase() == "tochararray"){
                            cadena += "P = P + "+fun+";\n";
                            cadena += tmp1+" = P + 2;\n";
                            cadena += "Stack["+tmp1+"] = "+anterior+";\n";
                            cadena += "call string_tochararray;\n";
                            cadena += tmp2+"=  P + 0;\n";
                            cadena += tmp3+" = Stack["+tmp2+"];\n";
                            cadena += "P = P - "+fun+";\n";
                            anterior = tmp3;
                            tipo = "char";
                        }else if(atr.id.toLowerCase() == "touppercase"){
                            cadena += "P = P + "+fun+";\n";
                            cadena += tmp1+" = P + 2;\n";
                            cadena += "Stack["+tmp1+"] = "+anterior+";\n";
                            cadena += "call string_touppercase;\n";
                            cadena += tmp2+"=  P + 0;\n";
                            cadena += tmp3+" = Stack["+tmp2+"];\n";
                            cadena += "P = P - "+fun+";\n";
                            anterior = tmp3;
                            tipo = "string";
                        }else if(atr.id.toLowerCase() == "tolowercase"){
                            cadena += "P = P + "+fun+";\n";
                            cadena += tmp1+" = P + 2;\n";
                            cadena += "Stack["+tmp1+"] = "+anterior+";\n";
                            cadena += "call string_toLowerCase;\n";
                            cadena += tmp2+"=  P + 0;\n";
                            cadena += tmp3+" = Stack["+tmp2+"];\n";
                            cadena += "P = P - "+fun+";\n";
                            anterior = tmp3;
                            tipo = "string";
                        }else if(atr.id.toLowerCase() == "linealize"){
                            cadena += "##--- Inicia funcion propia arreglo linealize \n";
                            cadena += "P = P + "+fun+";\n";
                            cadena += tmp1+" = P + 2;\n";
                            cadena += "Stack["+tmp1+"] = "+anterior+";\n";
                            cadena += "call arreglo_linealize;\n";
                            cadena += tmp2+"=  P + 0;\n";
                            cadena += tmp3+" = Stack["+tmp2+"];\n";
                            cadena += "P = P - "+fun+";\n";
                            cadena += "##--- Finaliza funcion propia arreglo linealize \n";
                            anterior = tmp3;
                            tipo = simbolo.tipo;
                            
                        }else if(atr.id.toLowerCase() == "size"){
                            var cad2 = "##------ Size de estructura "+simbolo.nombre+"\n";
                            cad2 += tmp1 +" = "+eddPadre.lstEdd.length+";\n";     
                            return { cadena: cad2, anterior:tmp1, tipo:"integer"};
                        }else if(atr.id.toLowerCase() == "getreference"){
                            var cad2 = "## ---- Reference de estructura "+simbolo.nombre+"\n";
                            cad2 += cadena;
                            return { cadena: cad2, anterior:anterior, tipo:"integer"};
                        }   
                        if(lstObj.lstAtr.length == auxi){
                            return { cadena: cadena, anterior:anterior, tipo:tipo};
                        }
                    }else if(atr.nombre == "funProp2"){
                        var tmp1 = generarTemp();
                        var tmp2 = generarTemp();
                        var tmp3 = generarTemp();
                        var tmp4 = generarTemp();
                        var tmp5 = generarTemp();
                        if(anterior == ""){
                            anterior = tmp;
                        }
                        var fun = buscarFuncionTraduccionActualTam(metodoA, ambi, simbolos);
                        var exp = Expresion(atr.exp,ambitoValido, clase, metodoA, "");
                        if(atr.id.toLowerCase() == "charat"){
                            
                            var exp = Expresion(atr.exp,ambitoValido, clase, metodoA, "");
                            cadena += "##--- Inicia funcion propia String CharAt \n";
                            cadena += exp.cadena+"\n";
                            cadena += "P = P + "+fun+";\n";
                            cadena += tmp1+" = P + 2;\n";
                            cadena += "Stack["+tmp1+"] = "+anterior+";\n";
                            cadena += tmp4 +" = P + 3;\n";
                            cadena += "Stack["+tmp4+"] = "+exp.anterior+";\n"
                            cadena += "call string_charat;\n";
                            cadena += tmp2+"=  P + 0;\n";
                            cadena += tmp3+" = Stack["+tmp2+"];\n";
                            cadena += "P = P - "+fun+";\n";
                            cadena += "##--- Finaliza funcion propia String CharAt \n";
                            anterior = tmp3;
                            tipo = "char";
                        }else if(atr.id.toLowerCase() == "instanceof"){
                            if(atr.exp.tipo == "id"){
                                var cad = "##---- Inicio instance of de estructura "+simbolo.nombre+"\n";
                                var etq1 = generarEtiq();
                                var etq2 = generarEtiq();
                                if(simbolo.tipo.toLowerCase() == atr.exp.valor.toLowerCase()){
                                    cad += "if( 1 == 1) goto "+etq1+";\n";
                                    cad += "goto "+etq2+";\n";
                                    var cad2 = cad;
                                    cad2 += etq1+":\n";
                                    cad2 += tmp1+"= 1;\n"
                                    return { cadenaBool:cad, etqVer:etq1 , etqFal:etq2, valor:"", cadena:cad2, anterior:tmp1};
                                }else{
                                    cad += "if( 1 == 0) goto "+etq1+";\n";
                                    cad += "goto "+etq2+";\n";
                                    var cad2 = cad;
                                    cad2 += etq1+":\n";
                                    cad2 += tmp1+"= 0;\n"
                                    return { cadenaBool:cad, etqVer:etq1 , etqFal:etq2, valor:"", cadena:cad2, anterior:tmp1};
                                }
                            }
                        }
                        if(lstObj.lstAtr.length == auxi){
                            return { cadena: cadena, anterior:anterior, tipo:tipo};
                        }
                    }
                    pos++;
                 }
                    auxi++;
            }
            var tmpFinal = generarTemp();
            //if(ref == "ref"){
              //  return { cadena: cadena, anterior:anterior, tipo:tipo, extra:1};
            //}else{
                cadena += tmpFinal +" = Heap["+anterior+"];\n";
                return { cadena: cadena, anterior:tmpFinal, tipo:tipo, rol:simbolo.rol};
           // }
        }else{
            //no existe padre
            var tmp1 = generarTemp();
            var tmp2 = generarTemp();
            var tmp3 = generarTemp();
            var tmp4 = generarTemp();
            var tmp5 = generarTemp();
            var tmp6 = generarTemp();
            var tmp7 = generarTemp();
            var ambi = clase+"_Global";
            var fun = buscarFuncionTraduccionActualTam(metodoA, ambi, simbolos);
            if(simbolo!= null){
                for(var x in lstObj.lstAtr){
                    var atr = lstObj.lstAtr[x];
                    if(anterior == ""){
                        anterior = tmp;
                    }
                    if(atr.nombre == "funProp"){
                        if(atr.id.toLowerCase() == "length"){
                            if(simbolo.hasOwnProperty('tipoExtra') && pasoaca==false){
                                if(simbolo.tipoExtra!= -1){
                                    cadena += tmp4+" = "+anterior+" + 1;\n";
                                    cadena += tmp5+" = Heap["+tmp4+"];\n";
                                    cadena += "if("+tmp5+"<> 1 ) goto L1;\n";
                                    cadena += tmp3+" = Heap["+anterior+"];\n";
                                    anterior = tmp3;
                                    pasoaca = true;
                                }
                            }
                            cadena += "##--- Inicia funcion propia String Length \n";
                            cadena += "P = P + "+fun+";\n";
                            cadena += tmp1+" = P + 2;\n";
                            cadena += "Stack["+tmp1+"] = "+anterior+";\n";
                            cadena += "call get_Length_String;\n";
                            cadena += tmp2+"=  P + 0;\n";
                            cadena += tmp3+" = Stack["+tmp2+"];\n";
                            cadena += "P = P - "+fun+";\n";
                            cadena += "##--- Termina funcion propia String Length \n";
                            anterior = tmp3;
                            tipo= "integer";
                        }else if(atr.id.toLowerCase() == "tochararray"){
                            if(simbolo.hasOwnProperty('tipoExtra') && pasoaca==false){
                                if(simbolo.tipoExtra!= -1){
                                    cadena += tmp4+" = "+anterior+" + 1;\n";
                                    cadena += tmp5+" = Heap["+tmp4+"];\n";
                                    cadena += "if("+tmp5+"<> 1 ) goto L1;\n";
                                    cadena += tmp3+" = Heap["+anterior+"];\n";
                                    anterior = tmp3;
                                    pasoaca = true;
                                }
                            }
                            cadena += "##--- Inicia funcion propia toCharArray \n";
                            cadena += "P = P + "+fun+";\n";
                            cadena += tmp1+" = P + 2;\n";
                            cadena += "Stack["+tmp1+"] = "+anterior+";\n";
                            cadena += "call string_tochararray;\n";
                            cadena += tmp2+"=  P + 0;\n";
                            cadena += tmp3+" = Stack["+tmp2+"];\n";
                            cadena += "P = P - "+fun+";\n";
                            cadena += "##--- termina funcion propioa toCharArray \n";
                            tipo = "char";
                            anterior = tmp3;
                        }else if(atr.id.toLowerCase() == "touppercase"){
                            if(simbolo.hasOwnProperty('tipoExtra') && pasoaca==false){
                                if(simbolo.tipoExtra!= -1){
                                    cadena += tmp4+" = "+anterior+" + 1;\n";
                                    cadena += tmp5+" = Heap["+tmp4+"];\n";
                                    cadena += "if("+tmp5+"<> 1 ) goto L1;\n";
                                    cadena += tmp3+" = Heap["+anterior+"];\n";
                                    anterior = tmp3;
                                    pasoaca = true;
                                }
                            }
                            cadena += "##--- Inicia funcion propia String toUpperCase \n";
                            cadena += "P = P + "+fun+";\n";
                            cadena += tmp1+" = P + 2;\n";
                            cadena += "Stack["+tmp1+"] = "+anterior+";\n";
                            cadena += "call string_touppercase;\n";
                            cadena += tmp2+"=  P + 0;\n";
                            cadena += tmp3+" = Stack["+tmp2+"];\n";
                            cadena += "P = P - "+fun+";\n";
                            cadena += "##--- Finaliza funcion propia String ToUpperCase \n";
                            tipo = "string";
                            anterior = tmp3;
                        }else if(atr.id.toLowerCase() == "tolowercase"){
                            if(simbolo.hasOwnProperty('tipoExtra') && pasoaca==false){
                                if(simbolo.tipoExtra!= -1){
                                    cadena += tmp4+" = "+anterior+" + 1;\n";
                                    cadena += tmp5+" = Heap["+tmp4+"];\n";
                                    cadena += "if("+tmp5+"<> 1 ) goto L1;\n";
                                    cadena += tmp3+" = Heap["+anterior+"];\n";
                                    anterior = tmp3;
                                    pasoaca = true;
                                }
                            }
                            cadena += "##--- Inicia funcion propia String toLowerCase \n";
                            cadena += "P = P + "+fun+";\n";
                            cadena += tmp1+" = P + 2;\n";
                            cadena += "Stack["+tmp1+"] = "+anterior+";\n";
                            cadena += "call string_toLowerCase;\n";
                            cadena += tmp2+"=  P + 0;\n";
                            cadena += tmp3+" = Stack["+tmp2+"];\n";
                            cadena += "P = P - "+fun+";\n";
                            cadena += "##--- Finaliza funcion propia String toLowerCase \n";
                            anterior = tmp3;
                            tipo = "string";
                        }else if(atr.id.toLowerCase() == "linealize"){
                            if(simbolo.rol == "arreglo"){
                                cadena += "##--- Inicia funcion propia arreglo linealize \n";
                                cadena += "P = P + "+fun+";\n";
                                cadena += tmp1+" = P + 2;\n";
                                cadena += "Stack["+tmp1+"] = "+anterior+";\n";
                                cadena += "call arreglo_linealize;\n";
                                cadena += tmp2+"=  P + 0;\n";
                                cadena += tmp3+" = Stack["+tmp2+"];\n";
                                cadena += "P = P - "+fun+";\n";
                                cadena += "##--- Finaliza funcion propia arreglo linealize \n";
                                anterior = tmp3;
                                tipo = simbolo.tipo;
                            }
                        }else if(atr.id.toLowerCase() == "size"){
                            if(simbolo.hasOwnProperty('tipoExtra') && pasoaca==false){
                                if(simbolo.tipoExtra!= -1){
                                    cadena += tmp4+" = "+anterior+" + 1;\n";
                                    cadena += tmp5+" = Heap["+tmp4+"];\n";
                                    cadena += "P = P + "+fun+";\n";
                                    cadena += tmp6 +" = P + 1;\n";
                                    cadena += "Stack["+tmp6+"] = "+tmp5+";\n";
                                    cadena += "call size_estructura;\n";
                                    cadena += tmp7+" = Stack[P];\n";    
                                    cadena += "P = P - "+fun+";\n";
                                    return { cadena: cadena, anterior:tmp7, tipo:"integer"};
                                }
                            }
                        }else if(atr.id.toLowerCase() == "getreference"){
                            if(simbolo.hasOwnProperty('tipoExtra') && pasoaca==false){
                                if(simbolo.tipoExtra!= -1){
                                    cadena += tmp3+" = Heap["+anterior+"];\n";
                                    return { cadena: cadena, anterior:tmp3, tipo:"integer"};
                                }
                            }
                        }
                    }else{
                        if(atr.id.toLowerCase() == "charat"){
                            if(simbolo.hasOwnProperty('tipoExtra') && pasoaca==false){
                                if(simbolo.tipoExtra!= -1){
                                    cadena += tmp6+" = "+anterior+" + 1;\n";
                                    cadena += tmp6+" = Heap["+tmp6+"];\n";
                                    cadena += "if("+tmp6+"<> 1 ) goto L1;\n";
                                    cadena += tmp7+" = Heap["+anterior+"];\n";
                                    anterior = tmp7;
                                    pasoaca = true;
                                }
                            }
                            var exp = Expresion(atr.exp,ambitoValido, clase, metodoA, "");
                            cadena += "##--- Inicia funcion propia String CharAt \n";
                            cadena += exp.cadena+"\n";
                            cadena += "P = P + "+fun+";\n";
                            cadena += tmp1+" = P + 2;\n";
                            cadena += "Stack["+tmp1+"] = "+anterior+";\n";
                            cadena += tmp4 +" = P + 3;\n";
                            cadena += "Stack["+tmp4+"] = "+exp.anterior+";\n"
                            cadena += "call string_charat;\n";
                            cadena += tmp2+"=  P + 0;\n";
                            cadena += tmp3+" = Stack["+tmp2+"];\n";
                            cadena += "P = P - "+fun+";\n";
                            cadena += "##--- Finaliza funcion propia String CharAt \n";
                            anterior = tmp3;
                            tipo = "char";
                        }else if( atr.id.toLowerCase() == "instanceof"){
                            if(simbolo.hasOwnProperty('tipoExtra') && pasoaca==false){
                                if(atr.exp.tipo == "id"){
                                    var eddPadre = obtenerEstructura(atr.exp.valor, estructuras);
                                    if(simbolo.tipoExtra!= -1 && eddPadre!= null){
                                        var etq = generarEtiq();
                                        var etq2 = generarEtiq();
                                        var etq3 = generarEtiq();
                                        cadena += tmp6+" = "+anterior+" + 1;\n";
                                        cadena += tmp6+" = Heap["+tmp6+"];\n";
                                        cadena += "if("+tmp6+"== "+eddPadre.tipo+" ) goto"+etq+";\n";
                                        cadena += "goto "+etq2+";\n";
                                        var cad = cadena+"\n";
                                        cad += etq+":\n";
                                        cad += tmp1+" = 1;\n";
                                        cad += "goto "+etq3+";\n";
                                        cad += etq2+":\n";
                                        cad += tmp1+" = 0;\n";
                                        cad += etq3+":\n";
                                        return { cadenaBool:cadena, etqVer:etq , etqFal:etq2, valor:"", cadena:cad, anterior:tmp1};
                                    }
                                }
                            }



                        }
                    }
                    //cadena += tmpFinal +" = Heap["+anterior+"];\n";
                    return { cadena: cadena, anterior:anterior, tipo:tipo, rol:simbolo.rol};
                }
            }
        }
    }else{
        //no existe simbolo
    }
}



function traduccionSTRInstancia(nomEdd, ambitoValido, clase, metodoA, tipo){
    var existeEdd = false;
    var lstEdd = null;
    var cad = "";
    var nombreEdd = "";
    for(var i in estructuras.estructura){
        if(estructuras.estructura[i].nombre == nomEdd.id){
            existeEdd = true;
            lstEdd = estructuras.estructura[i].lstEdd;
            nombreEdd =  nomEdd.id;
        }
    }
    if(existeEdd){
        var tmp1 = generarTemp();

        cad += tmp1+"= H;\n";
        for(var x=0; x < lstEdd.length; x++){
            cad += "Heap[H] = 0; \n";
            cad += "H = H + 1;\n";
        }
        var pos = 0;
        if(tipo == "asigEdd"){
            cad += "Heap[H] = 0; \n";
            cad += "H = H + 1;\n";
            pos = 1;
        }
        var tmp = generarTemp();
      
        for(var s in lstEdd){
            var edd = lstEdd[s];
            var tmp2 = generarTemp();
           
            if(edd.nombre == "atr"){ //tipoVar ID
            }else if(edd.nombre == "atrExp"){ // tipoVar ID '=' 
                cad += tmp +" = "+tmp1+"+ "+pos+";\n";
                var exp = Expresion(edd.exp, ambitoValido, clase,metodoA, "");
                cad +=  exp.cadena+"\n";
                cad += "Heap["+tmp+"] = "+ exp.anterior+";\n";
            }else if(edd.nombre == "declaracionArr"){ //tipoVar '[' ']' ID '=' expresionlog
                cad += tmp +" = "+tmp1+"+ "+pos+";\n";    
                var exp = Expresion(edd.exp.valor, ambitoValido, clase,metodoA, "");
                cad += exp.cadena+"\n";
                cad += tmp2 +" = "+tmp+";\n";
                cad += "Heap["+tmp2+"] = "+exp.anterior+";\n";
            }else if(edd.nombre ==  "declaracionEddArr"){ //ID '[' ']' ID '=' expresionlog
                if(edd.exp.valor.nombre == "initArrayEDD"){
                    if(edd.padre == edd.exp.valor.padre){
                        cad += tmp +" = "+tmp1+"+ "+pos+";\n";
                        var exp = Expresion(edd.exp.valor, ambitoValido, clase,metodoA, "");
                        cad += exp.cadena+"\n";
                        cad += tmp2 +" = "+tmp+";\n";
                        cad += "Heap["+tmp2+"] = "+exp.anterior+";\n";
                    }
                }
            }else if(edd.nombre == "declaracionEddSin"){//ID ID
            }else if(edd.nombre == "declaracionEdd"){//ID ID '=' expresionlog
                cad += tmp +" = "+tmp1+"+ "+pos+";\n";
                var exp = Expresion(edd.exp, ambitoValido, clase,metodoA, "");
                cad += exp.cadena;
                cad += "Heap["+tmp+"] = "+exp.anterior+";\n";
            }
            pos++;
        }
        return { cadena: cad, anterior:tmp1, tipo:nombreEdd, extra:"estructura"};
        
    }
   
}


