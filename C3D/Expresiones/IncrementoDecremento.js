
function traduccionIncremento(inc, amb,clase, funcion){
    var simbolo = obtenerSimboloTraduccion2(inc.id, simbolos,amb);
    if(simbolo!= null){
        var cadena = "";
        var esGlobal = simbolo.ambito.includes("Global");
        if(simbolo.tipo.toLowerCase("integer")){
            var tmp1 = generarTemp();
            var tmp2 = generarTemp();
            var tmp3 = generarTemp();
            if(esGlobal){
                cadena += tmp1 + " = " +simbolo.posicion +"; \n";
                cadena += tmp2 + " = Heap[" + tmp1 +"];\n";
                cadena += tmp3 + " = "+tmp2+" + 1;\n";
                cadena += "Heap["+tmp1+"] = "+tmp3+";\n";
            }else{
                cadena += tmp1 + " = P + " +simbolo.posicion +"; \n";
                cadena += tmp2 + "  = Stack[" +tmp1 +"];\n";
                cadena += tmp3 + " = "+tmp2+" + 1;\n";
                cadena += "Stack["+tmp1+"] = "+tmp3+";\n";    
            }
            return { cadena:cadena, anterior:tmp3, tipo:simbolo.tipo};
        }
    }
}

function traduccionDecremento(dec, amb,clase, funcion){
    var simbolo =  obtenerSimboloTraduccion2(dec.id, simbolos,amb);
    if(simbolo!= null){
        var cadena = "";
        var esGlobal = simbolo.ambito.includes("Global");
        if(simbolo.tipo.toLowerCase("integer")){
            var tmp1 = generarTemp();
            var tmp2 = generarTemp();
            var tmp3 = generarTemp();
            if(esGlobal){
                cadena += tmp1 + " = " +simbolo.posicion +"; \n";
                cadena += tmp2 + " = Heap[" + tmp1 +"];\n";
                cadena += tmp3 + " = "+tmp2+" - 1;\n";
                cadena += "Heap["+tmp1+"] = "+tmp3+";\n";
            }else{
                cadena += tmp1 + " = P + " +simbolo.posicion +"; \n";
                cadena += tmp2 + "  = Stack[" +tmp1 +"];\n";
                cadena += tmp3 + " = "+tmp2+" - 1;\n";
                cadena += "Stack["+tmp1+"] = "+tmp3+";\n";    
            }
            return { cadena:cadena, anterior:tmp3, tipo:simbolo.tipo};
        }
    }
}