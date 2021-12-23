function traduccionCasteoInteger(cast, ambito, clase, funcion){
    var cadena = "";
    var tamFuncion = 0;
    for(var is in simbolos.simbolo){
        if(simbolos.simbolo[is].nombre == funcion && simbolos.simbolo[is].rol == "funcion"){
             tamFuncion = simbolos.simbolo[is].tamano;
             console.log("tamanio tuto metodo: "+ tamFuncion);
        }
    }
    var tmp1 = generarTemp();
    var tmp2 = generarTemp();
    var tmp3 = generarTemp();
    var tmp4 = generarTemp();
    var exp = Expresion(cast.exp, ambito,clase,funcion,"");
    if(exp.tipo == "double"){
        cadena += "##------ Inicia casteo de double a integer\n";
        cadena += exp.cadena;
        cadena += tmp1 + " = P +"+tamFuncion+";\n";
        cadena += tmp2 + " = " +tmp1 +" + 2;\n";
        cadena += "Stack["+tmp2+"] = "+exp.anterior+";\n"
        cadena += "P = P + "+tamFuncion+";\n";
        cadena += "call casteo_double_integer;\n";
        cadena += tmp3 +" = P + 0;\n";
        cadena += tmp4 +" = Stack["+tmp3+"];\n";  
        cadena += "P = P - "+tamFuncion+";\n";      
        cadena += "##------ Finaliza casteo de double a integer\n";
    }else if(exp.tipoExtra != -1){

        cadena += "##------ Inicia casteo de integer para var o global\n";
        cadena += exp.cadena+"\n";
        cadena += tmp1+" = "+exp.anterior+" + 1;\n";
        cadena += tmp2+" = Heap["+tmp1+"];\n";
        cadena += "if( 2 <> "+tmp2+") goto L1;\n";
        cadena += tmp4+" = Heap["+exp.anterior+"];\n";
        cadena += "##------ Finaliza casteo de integer para var o global\n";
    }
    return {cadena:cadena, anterior:tmp4 , tipo:"integer"};
}

function traduccionCasteoChar(cast, ambito, clase, funcion){
    var cadena = "";
    var tamFuncion = 0;
    for(var is in simbolos.simbolo){
        if(simbolos.simbolo[is].nombre == funcion && simbolos.simbolo[is].rol == "funcion"){
             tamFuncion = simbolos.simbolo[is].tamano;
             console.log("tamanio tuto metodo: "+ tamFuncion);
        }
    }
    var exp = Expresion(cast.exp, ambito,clase, funcion, "");
    var tmp1 = generarTemp();
    var tmp2 = generarTemp();
    var tmp3 = generarTemp();
    var tmp4 = generarTemp();
    if(exp.tipo == "double"){
        cadena += "##------ Inicia casteo de double a char\n";
        cadena += exp.cadena;
        cadena += tmp1 + " = P +"+tamFuncion+";\n";
        cadena += tmp2 + " = " +tmp1 +" + 2;\n";
        cadena += "Stack["+tmp2+"] = "+exp.anterior+";\n"
        cadena += "P = P + "+tamFuncion+";\n";
        cadena += "call casteo_decimal_caracter;\n";
        cadena += tmp3 +" = P + 0;\n";
        cadena += tmp4 +" = Stack["+tmp3+"];\n";  
        cadena += "P = P - "+tamFuncion+";\n";      
        cadena += "##------ Finaliza casteo de double a char\n";

    }else if(exp.tipo == "integer"){
        cadena += "##------ Inicia casteo de integer a char\n";
        cadena += exp.cadena;
        cadena += tmp1 + " = P +"+tamFuncion+";\n";
        cadena += tmp2 + " = " +tmp1 +" + 2;\n";
        cadena += "Stack["+tmp2+"] = "+exp.anterior+";\n"
        cadena += "P = P + "+tamFuncion+";\n";
        cadena += "call casteo_int_caracter;\n";
        cadena += tmp3 +" = P + 0;\n";
        cadena += tmp4 +" = Stack["+tmp3+"];\n";  
        cadena += "P = P - "+tamFuncion+";\n";      
        cadena += "##------ Finaliza casteo de integer a char\n";
    }else if(exp.tipoExtra != -1){

        cadena += "##------ Inicia casteo de char para var o global\n";
        cadena += exp.cadena+"\n";
        cadena += tmp1+" = "+exp.anterior+" + 1;\n";
        cadena += tmp2+" = Heap["+tmp1+"];\n";
        cadena += "if( 4 <> "+tmp2+") goto L1;\n";
        cadena += tmp4+" = Heap["+exp.anterior+"];\n";
        cadena += "##------ Finaliza casteo de char para var o global\n";
        return {cadena:cadena, anterior:tmp4 , tipo:"char"};
    }
    return {cadena:cadena, anterior:tmp4 , tipo:"integer"};
}

function traduccionCasteoDouble(expre, ambitoValido, clase, funcion){
    var cadena = "";
    var tamFuncion = 0;
    for(var is in simbolos.simbolo){
        if(simbolos.simbolo[is].nombre == funcion && simbolos.simbolo[is].rol == "funcion"){
             tamFuncion = simbolos.simbolo[is].tamano;
             console.log("tamanio tuto metodo: "+ tamFuncion);
        }
    }
    var tmp1 = generarTemp();
    var tmp2 = generarTemp();
    var tmp3 = generarTemp();
    var exp = Expresion(expre.exp, ambitoValido,clase,funcion,"");
    if(exp.tipoExtra!= -1){
        cadena += "##------ Inicia casteo de double para var o global\n";
        cadena += exp.cadena+"\n";
        cadena += tmp1+" = "+exp.anterior+" + 1;\n";
        cadena += tmp2+" = Heap["+tmp1+"];\n";
        cadena += "if( 3 <> "+tmp2+") goto L1;\n";
        cadena += tmp3+" = Heap["+exp.anterior+"];\n";
        cadena += "##------ Finaliza casteo de double para var o global\n";
        return {cadena:cadena, anterior:tmp3 , tipo:"double"};
    }
    
}

function traduccionCasteoBoolean(expre, ambitoValido, clase, funcion){
    var cadena = "";
    var tamFuncion = 0;
    for(var is in simbolos.simbolo){
        if(simbolos.simbolo[is].nombre == funcion && simbolos.simbolo[is].rol == "funcion"){
             tamFuncion = simbolos.simbolo[is].tamano;
             console.log("tamanio tuto metodo: "+ tamFuncion);
        }
    }
    var tmp1 = generarTemp();
    var tmp2 = generarTemp();
    var tmp3 = generarTemp();
    var exp = Expresion(expre.exp, ambitoValido,clase,funcion,"");
    if(exp.tipoExtra!= -1){
        cadena += "##------ Inicia casteo de boolean para var o global\n";
        cadena += exp.cadena+"\n";
        cadena += tmp1+" = "+exp.anterior+" + 1;\n";
        cadena += tmp2+" = Heap["+tmp1+"];\n";
        cadena += "if( 5 <> "+tmp2+") goto L1;\n";
        cadena += tmp3+" = Heap["+exp.anterior+"];\n";
        cadena += "##------ Finaliza casteo de boolean para var o global\n";
    }
    return {cadena:cadena, anterior:tmp3 , tipo:"boolean"};
} 

function traduccionCasteoId(expre, ambitoValido, clase, funcion){
    var cadena = "";
    var tamFuncion = 0;
    for(var is in simbolos.simbolo){
        if(simbolos.simbolo[is].nombre == funcion && simbolos.simbolo[is].rol == "funcion"){
             tamFuncion = simbolos.simbolo[is].tamano;
             console.log("tamanio tuto metodo: "+ tamFuncion);
        }
    }
    var tmp1 = generarTemp();
    var tmp2 = generarTemp();
    var tmp3 = generarTemp();
    var tipo = expre.id.valor;
    expre.id.valor = expre.exp;
    var exp = Expresion(expre.id, ambitoValido,clase,funcion,"");
    
    if(exp.tipoExtra!= -1){
        if(tipo.toLowerCase() == "string"){
            cadena += "##------ Inicia casteo de string para var o global\n";
            cadena += exp.cadena+"\n";
            cadena += tmp1+" = "+exp.anterior+" + 1;\n";
            cadena += tmp2+" = Heap["+tmp1+"];\n";
            cadena += "if( 1 <> "+tmp2+") goto L1;\n";
            cadena += tmp3+" = Heap["+exp.anterior+"];\n";
            cadena += "##------ Finaliza casteo de string para var o global\n";
            return {cadena:cadena, anterior:tmp3 , tipo:"string"};
        }else{
            var eddPadre = obtenerEstructura(expre.tipo, estructuras);
            cadena += "##------ Inicia casteo de Estructura para var o global\n";
            cadena += exp.cadena+"\n";
            cadena += tmp1+" = "+exp.anterior+" + 1;\n";
            cadena += tmp2+" = Heap["+tmp1+"];\n";
            cadena += "if("+eddPadre.tipo+"<> "+tmp2+") goto L1;\n";
            cadena += tmp3+" = Heap["+exp.anterior+"];\n";
            cadena += "##------ Finaliza casteo de estructura para var o global\n";
            return {cadena:cadena, anterior:tmp3 , tipo:"string"};
        }
    }
    

}  
