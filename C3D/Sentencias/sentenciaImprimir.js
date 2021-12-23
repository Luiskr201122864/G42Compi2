
function traducirImprimir(imprimir, ambito, clase, metodo){
    var cadena = "\n"; 
    var tamMetodo = 0;
    var ts = simbolos;
    var tmpE = generarTemp();
    var tmpAux = generarTemp();
    for(var is in ts.simbolo){
        if(ts.simbolo[is].nombre == metodo && ts.simbolo[is].rol == "funcion"){
             tamMetodo = ts.simbolo[is].tamano;
             console.log("tamanio tuto metodo: "+ tamMetodo);
        }
    }
    var exp = Expresion(imprimir.expresion, ambito, clase, metodo, "");
    console.log("ESTOY EN METODO: ->retuta"+metodo);
     
     if(exp.tipo == "num" || exp.tipo == "int" || exp.tipo == "integer"){
        cadena += "##------ Inicia sentencia imprimir entero\n";
        cadena += exp.cadena;
        cadena += tmpE + " = P +"+tamMetodo+";\n";
        cadena += tmpAux + " = " +tmpE +" + 2;\n";
        cadena += "Stack["+tmpAux+"] = "+exp.anterior+";\n"
        cadena += "P = P + "+tamMetodo+";\n";
        cadena += "call imprimir_entero;\n";
        cadena += "P = P - "+tamMetodo+";\n";      
        cadena += "##------ Finaliza sentencia imprimir entero\n";
    }else if(exp.tipo == "string" || exp.tipo == "String"){
        cadena += "##------ Inicia sentencia imprimir cadena\n";
        cadena += exp.cadena;
        cadena += tmpE + " = P +"+tamMetodo+";\n";
        cadena += tmpAux + " = " +tmpE +" + 2;\n";
        cadena += "Stack["+tmpAux+"] = "+exp.anterior+";\n"
        cadena += "P = P + "+tamMetodo+";\n";
        cadena += "call imprimir_cadena;\n";
        cadena += "P = P - "+tamMetodo+";\n";        
        cadena += "##------ Finaliza sentencia imprimir cadena\n";
     }else if(exp.tipo == "str" || exp.tipo == "char" ){
        cadena += "##------ Inicia sentencia imprimir caracter\n";
        cadena += exp.cadena;
        cadena += tmpE + " = P +"+tamMetodo+";\n";
        cadena += tmpAux + " = " +tmpE +" + 2;\n";
        cadena += "Stack["+tmpAux+"] = "+exp.anterior+";\n"
        cadena += "P = P + "+tamMetodo+";\n";
        cadena += "call imprimir_caracter;\n";
        cadena += "P = P - "+tamMetodo+";\n";   
        cadena += "##------ Finaliza sentencia imprimir caracter\n";
     }else if(exp.tipo == "decimal" || exp.tipo == "double"){
        cadena += "##------ Inicia sentencia imprimir decimal\n";
        cadena += exp.cadena;
        cadena += tmpE + " = P +"+tamMetodo+";\n";
        cadena += tmpAux + " = " +tmpE +" + 2;\n";
        cadena += "Stack["+tmpAux+"] = "+exp.anterior+";\n"
        cadena += "P = P + "+tamMetodo+";\n";
        cadena += "call imprimir_decimal;\n";
        cadena += "P = P - "+tamMetodo+";\n"; 
        cadena += "##------ Finaliza sentencia imprimir decimal\n";
     }else if(exp.tipo == "bool" || exp.tipo == "boolean"){
        cadena += "##------ Inicia sentencia imprimir boolean\n";
        cadena += exp.cadena;
        console.log("valor del bool: "+exp.anterior);
        cadena += tmpE + " = P +"+tamMetodo+";\n";
        cadena += tmpAux + " = " +tmpE +" + 2;\n";
        cadena += "Stack["+tmpAux+"] = "+exp.anterior+";\n"
        cadena += "P = P + "+tamMetodo+";\n";
        cadena += "call imprimir_booleano;\n";
        cadena += "P = P - "+tamMetodo+";\n"; 
        cadena += "##------ Finaliza sentencia imprimir boolean\n";
     }else if(exp.tipoExtra != -1){
        var tmp1 = generarTemp();
        var tmp2 = generarTemp();
        var tmp3 = generarTemp();
        var tmp4 = generarTemp();
        var tmp5 = generarTemp();
        cadena += "##------- Inicia sentencia imprimir var - global\n"; 
        cadena += exp.cadena+"\n";
        cadena += tmp3+" = Heap["+exp.anterior+"];\n";
        cadena += tmp1+" = "+exp.anterior+" + 1;\n";
        cadena += tmp2+" = Heap["+tmp1+"];\n";
        cadena += "P = P + "+tamMetodo+";\n";
        cadena += tmp4 +" = P + 2;\n";
        cadena += "Stack["+tmp4+"] ="+tmp3+";\n";
        cadena += tmp5 +" = P + 3;\n";
        cadena += "Stack["+tmp5+"] ="+tmp2+";\n";
        cadena += "call print_var_global;\n";
        cadena += "P = P - "+tamMetodo+";\n";
        cadena += "##------- Finaliza sentencia imprimir var - global\n";
     }else{
        var desp = "Tipo de dato a imprimir incorrecto ";
        var errorV = {tipo:"semantico", descripcion:desp, fila:1, columna:1};
        errores.error.push(errorV);
     }
     
   return cadena;
}