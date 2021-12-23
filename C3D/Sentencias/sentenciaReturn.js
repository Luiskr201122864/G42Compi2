function traduccionSentenciaRetornar(senR, ambitoA, mostrar, clase, metodoA){
    var cadRetornar = "";
    var exp = Expresion(senR.exp, ambitoA, clase, metodoA,"");
    if(exp.hasOwnProperty("etqVer")){
        cadRetornar+= "##----- Empieza sentencia retorno \n";
        var tmp = generarTemp();
        //cadRetornar += "var "+tmp+";\n";
        cadRetornar += tmp + " = P + 0; ";
        cadRetornar += exp.cadenaBool;
        cadRetornar += exp.etqVer + ":\n";
        cadRetornar += "Stack["+ tmp +"] = 1;\n";
        var etq1 = generarEtiq();
        cadRetornar += "goto " + etq1 +";\n";
        cadRetornar += exp.etqFal + ":\n";
        cadRetornar += "Stack["+tmp +"] = 0;\n";
        cadRetornar += etq1 +":\n";
        cadRetornar += "goto "+ mostrar.etiquetaReturn +";\n";
        cadRetornar+= "##----- Finaliza sentencia retorno \n";
        return cadRetornar;
    }else{
        var tmp2 = generarTemp();
        cadRetornar+= "##----- Empieza sentencia retorno  del metodo\n";
        //cadRetornar += "var "+tmp2+";\n";
        //cadRetornar += "##---- Empieza el return del metodo\n";
        cadRetornar += exp.cadena;
        cadRetornar += tmp2 + " = P + 0;\n";
        cadRetornar += "Stack["+ tmp2 +"] = " + exp.anterior +";\n";
        cadRetornar += "goto "+ mostrar.etiquetaReturn+";\n";
        cadRetornar += "\n";
        cadRetornar+= "##----- Finaliza sentencia retorno del metodo\n";
        return cadRetornar;
    }
}