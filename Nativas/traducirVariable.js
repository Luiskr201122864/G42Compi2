function traduccionDeclaracionTipo1(declaracion, ts, ambitoA, clase, funcion){
 console.log("ESTOY EN TRADUCIENDO DECLARACION TIPO 1");
 var cadena = "";
 var rol = "variable";   
    for(var i in declaracion.lisId){
       /* var global = clase.split("_");
        if("Global" == global[1]){
            contGlobales++;
        }*/
        var ide = declaracion.lisId[i];
        var existe =buscarVariableTraduccion(declaracion.tipo, ide, ambitoA, rol, ts, ambitoA.length);
        if(existe){
            cadena+="##-------- Declaramos variable tipo 1: "+ide+"\n"
            var expresion = declaracion.exp;
            var asignacion = {nombre:"asignacion", id:ide, expresion:expresion, rol:rol};
            cadena += traduccionAsignacion(asignacion, ambitoA, ts, clase, funcion);
            cadena += "\n"; 
        }
    }
    return cadena;
}

function traduccionDeclaracionTipo2(declaracion, ts, ambitoA, clase, funcion){
    console.log("ESTOY EN TRADUCIENDO DECLARACION TIPO 2");
    var rol = "variable";
    var ide = declaracion.id;   
    var existe = buscarVariableTraduccion("", ide, ambitoA, rol, ts, ambitoA.length);
    if(existe){
        var cadena = "##-------- Declaramos variable tipo 2: "+ide+"\n";
        var exp = Expresion(declaracion.exp, ambitoA, clase, funcion, "");
        var simbolo = obtenerSimboloTraduccion2(ide,ts, ambitoA);
        var tmp = generarTemp();
        var tmp2 = generarTemp();
        var tmp3 = generarTemp();
        var tmp4 = generarTemp();
        if(simbolo.ambito.includes("Global")){
           cadena += exp.cadena+"\n";
            cadena += tmp +" = "+simbolo.posicion+";\n";
            cadena += tmp2+"= P + 1;\n";
            cadena += "Stack["+tmp2+"] = "+exp.anterior+";\n";
            cadena += tmp3+"= P + 2;\n";
            cadena += "Stack["+tmp3+"] = "+retornarValor(exp.tipo)+";\n";
            cadena += "call especifico_global_var;\n";
            cadena += tmp4+"= Stack[P];\n";
            cadena += "Heap["+tmp+"] = "+tmp4+";\n";
        }else{
            cadena += exp.cadena+"\n";
            cadena += tmp +" = P + "+simbolo.posicion+";\n";
            cadena += tmp2+"=  P + 1;\n";
            cadena += "Stack["+tmp2+"] = "+exp.anterior+";\n";
            cadena += tmp3+"= P + 2;\n";
            cadena += "Stack["+tmp3+"] = "+retornarValor(exp.tipo)+";\n";
            cadena += "call especifico_global_var;\n";
            cadena += tmp4+"= Stack[P];\n";
            cadena += "Stack["+tmp+"] = "+tmp4+";\n";
        }
        cadena += "\n"; 
        return cadena;
    }
}

function traduccionDeclaracionTipo3(declaracion, ts, ambitoA, clase, funcion){
    console.log("ESTOY EN TRADUCIENDO DECLARACION TIPO 3");
    var rol = "constante";
    var ide = declaracion.id;   
    var existe = buscarVariableTraduccion("", ide, ambitoA,rol, ts, ambitoA.length);
    if(existe){
        var cadena = "##------- Declaramos variable tipo 3: "+ide+"\n";
        var expresion = declaracion.exp;
        var asignacion = {nombre:"asignacion", id:ide, expresion:expresion, rol:rol};
        cadena += traduccionAsignacion(asignacion, ambitoA, ts, clase, funcion);
        cadena += "\n"; 
        return cadena;
    }
}


function traduccionDeclaracionTipo4(declaracion, ts, ambitoA, clase, funcion){
    console.log("ESTOY EN TRADUCIENDO DECLARACION TIPO 4");
    var rol = "variable";
    var ide = declaracion.id;  
    var amb = clase+"_Global";
    var ambito = [amb]; 
    var existe = buscarVariableTraduccion("", ide, ambito, rol, ts, ambitoA.length);
    if(existe){
        var cadena = "##------- Declaramos variable tipo 3: "+ide+"\n";
        //var asignacion = {nombre:"asignacion", id:ide, expresion:expresion, rol:rol};
        //cadena += traduccionAsignacion(asignacion, ambitoA, ts, clase, funcion);
        var exp = Expresion(declaracion.exp, ambitoA, clase, funcion, "");
        var simbolo = obtenerSimboloTraduccion2(ide,ts, ambitoA);
        var tmp = generarTemp();
        var tmp2 = generarTemp();
        var tmp3 = generarTemp();
        var tmp4 = generarTemp();
        if(simbolo.ambito.includes("Global")){
           cadena += exp.cadena+"\n";
            cadena += tmp +" = "+simbolo.posicion+";\n";
            cadena += tmp2+"= P + 1;\n";
            cadena += "Stack["+tmp2+"] = "+exp.anterior+";\n";
            cadena += tmp3+"= P + 2;\n";
            cadena += "Stack["+tmp3+"] = "+retornarValor(exp.tipo)+";\n";
            cadena += "call especifico_global_var;\n";
            cadena += tmp4+"= Stack[P];\n";
            cadena += "Heap["+tmp+"] = "+tmp4+";\n";
        }else{
            cadena += exp.cadena+"\n";
            cadena += tmp +" = P + "+simbolo.posicion+";\n";
            cadena += tmp2+"=  P + 1;\n";
            cadena += "Stack["+tmp2+"] = "+exp.anterior+";\n";
            cadena += tmp3+"= P + 2;\n";
            cadena += "Stack["+tmp3+"] = "+retornarValor(exp.tipo)+";\n";
            cadena += "call especifico_global_var;\n";
            cadena += tmp4+"= Stack[P];\n";
            cadena += "Stack["+tmp+"] = "+tmp4+";\n";
        }
        cadena += "\n"; 
        return cadena;
    }
}

function retornarValor(tipo){
    if(tipo.toLowerCase() == "string"){
        return 1;
    }else if(tipo.toLowerCase() == "integer"){
        return 2;
    }else if(tipo.toLowerCase() == "double"){
        return 3;
    }else if(tipo.toLowerCase() == "char"){
        return 4;
    }else if(tipo.toLowerCase() == "bool"){
        return 5;
    }else{
        var eddPadre = obtenerEstructura(tipo, estructuras);
        return eddPadre.tipo;
    }
}


function traduccionAsignacion(asig, ambitoA, ts, clase, funcion){
    var nombreVar = asig.id;
    var tipoVar = "";
    var posSimbolo = -1;
    var tabla = ts.simbolo;
    var ambito = "";
    var cadena = "##--------- Asignacion de la variable "+nombreVar+"\n";
    var posicionTabla = 0;
    var tipoExtra = 0;
    for(var x in ambitoA){
        for(var y in ts.simbolo){
            if(ambitoA[x] == tabla[y].ambito && tabla[y].nombre == nombreVar ){
                posSimbolo = tabla[y].posicion;
                tipoVar = tabla[y].tipo;
                ambito = tabla[y].ambito;
                rol = tabla[y].rol;
                posicionTabla = y;
                tipoExtra = tabla[y].tipoExtra;
                break;
            }
        }
    }
    var amb = ambito.includes("Global");
    var exp = Expresion(asig.expresion, ambitoA, clase, funcion, tipoVar);

    if(tipoExtra == 2 || tipoExtra == 4){
        //var             global 
        var tmp = generarTemp();  
        var tmp2 = generarTemp();
        if(amb){
            // Es global
            cadena += exp.cadena;
            cadena += tmp +" = "+ posSimbolo +";\n";
            cadena += tmp2+" = Heap["+tmp+"];\n";
            cadena += "Heap["+tmp2+"] = "+exp.anterior+";\n";
            cadena += tmp2+" = "+tmp2+" + 1;\n";
            cadena += "Heap["+tmp2+"] = "+retornarValor(exp.tipo)+";\n";
            return cadena;
        }else{
            // No es global 
            cadena += exp.cadena;
            cadena += tmp +" = P +"+ posSimbolo +";\n";
            cadena += tmp2+" = Stack["+tmp+"];\n";
            cadena += "Heap["+tmp2+"] = "+exp.anterior+";\n";
            cadena += tmp2+" = "+tmp2+" + 1;\n";
            cadena += "Heap["+tmp2+"] = "+retornarValor(exp.tipo)+";\n";
            return cadena;
        }
    }else if(tipoExtra == 3){
        if(!tabla[posicionTabla].valorAsignado){
            tabla[posicionTabla].tipo = exp.tipo;
            if(exp.hasOwnProperty('extra')){
                tabla[posicionTabla].rol = exp.extra;
                tabla[posicionTabla].tipoExtra = -1;
            }
            tabla[posicionTabla].valorAsignado = true;
        }else{
            return "";
        }
    }

    //Vamo a ver el casteo implicito
    console.log(asig.expresion);

    if(amb){
        // Es global
        var tmp = generarTemp();
        //cadena += "H = H + 1;\n"
        cadena += exp.cadena;
        cadena += tmp +" = "+ posSimbolo +";\n";
        cadena += "Heap["+tmp+"] = "+exp.anterior+";\n";
    }else{
        // No es global 
        var tmp2 = generarTemp();
        cadena += exp.cadena;
        cadena += tmp2 + " = P + " + posSimbolo + ";\n";
        cadena += "Stack[" + tmp2 + "] = "+ exp.anterior + ";\n";
    }
    return cadena;
}





