function Expresion(exp, ambitoValido, clase, metodoA, tipoVar){
    switch(exp.tipo){
        case "+":
            var sum1 = Expresion(exp.op1, ambitoValido, clase, metodoA);
            var sum2 = Expresion(exp.op2, ambitoValido, clase, metodoA);
            var ts = simbolos;
            var tamMetodo = 0;
            for(var is in ts.simbolo){
                if(ts.simbolo[is].nombre == metodoA && ts.simbolo[is].rol == "metodo"){
                     tamMetodo = ts.simbolo[is].tamano;
                     console.log("tamanio tuto metodo a concatenar: "+ tamMetodo);
                     break;
                }
            }
            console.log(exp.op1);
            console.log(exp.op2);
            console.log("Tipo1Sum: " + sum1.tipo);
            console.log("Tipo2Sum: " + sum2.tipo);
        //Tipo resultante int
        if(sum1.tipo == "integer" && sum2.tipo == "integer" || sum1.tipo == "char" && sum2.tipo == "integer" ||
            sum1.tipo == "integer" && sum2.tipo == "char"|| sum1.tipo == "char" && sum2.tipo == "char"){
            var tempS = generarTemp();
            var cadSum = "";
            cadSum += sum1.cadena + sum2.cadena + tempS + " = " + sum1.anterior + " + " + sum2.anterior + ";\n";
            console.log(cadSum);
            return {cadena : cadSum, anterior : tempS, tipo: "integer"};
        //Tipo resultante double
        }else if(sum1.tipo == "integer" && sum2.tipo == "double" ||  sum1.tipo == "double" && sum2.tipo == "integer" ||
            sum1.tipo == "double" && sum2.tipo == "char"|| sum1.tipo == "char" && sum2.tipo == "double"||
            sum1.tipo == "double" && sum2.tipo == "double"){
            var tempS = generarTemp();
            var cadSum  = "";
            cadSum += sum1.cadena + sum2.cadena + tempS + " = " + sum1.anterior + " + " + sum2.anterior + ";\n";
            console.log(cadSum);
            return {cadena : cadSum, anterior : tempS, tipo: "double"};
            //tipo resultante string
        }else if(sum1.tipo == "string" && sum2.tipo == "string"){
                var tmpS = generarTemp();
                var tmpAuxS = generarTemp();
                var tmpPos = generarTemp();
                var tmpRet = generarTemp();
                var cadC = "";
                cadC += sum1.cadena+"\n";
                cadC += sum2.cadena+"\n";
                cadC += tmpS +" = P + "+tamMetodo+";\n";
                cadC += tmpAuxS +" = "+tmpS+" + 2;\n";
                cadC += "Stack["+tmpAuxS+"] = "+sum1.anterior+";\n";
                cadC += tmpAuxS +" = "+tmpS+" + 3;\n";
                cadC += "Stack["+tmpAuxS+"] = "+sum2.anterior+";\n";
                cadC += "P = P + "+tamMetodo+";\n";
                cadC += "call concatenacion_cadena;\n";
                cadC += tmpPos+" = P + 0;\n";
                cadC += tmpRet +" = Stack["+tmpPos+"];\n";
                cadC += "P = P - "+tamMetodo+";\n";
                return {cadena:cadC, anterior:tmpRet,  tipo:"string"};
            }else if(sum1.tipo == "bool" && sum2.tipo == "string"){
                var tmpS = generarTemp();
                var tmpC = generarTemp();
                var tmpPR = generarTemp();
                var tmpR = generarTemp();
                var tmpS2 = generarTemp();
                var tmpC2 = generarTemp();
                var tmpPR2 = generarTemp();
                var tmpR2 = generarTemp();
                var cadBS = "";
                cadBS += sum1.cadena+"\n";
                cadBS += tmpS+ " = P +"+tamMetodo+";\n";
                cadBS += tmpC+ " = "+tmpS+ "+ 2;\n";
                cadBS += "Stack["+tmpC+"] = "+sum1.anterior+";\n";
                cadBS += "P = P + "+tamMetodo+";\n";
                cadBS += "call casteo_boolean_cadena;\n";
                cadBS += tmpPR +" = P + 0;\n";
                cadBS += tmpR +" = Stack["+tmpPR+"];\n";
                cadBS += "P = P - "+tamMetodo+";\n";
                cadBS += sum2.cadena+"\n";
                cadBS += tmpS2 +" = P + "+tamMetodo+";\n";
                cadBS += tmpC2 + " = "+tmpS2+" + 2;\n";
                cadBS += "Stack["+tmpC2+"] = "+tmpR+";\n";
                cadBS += tmpC2 + " = "+tmpS2+" + 3;\n";
                cadBS += "Stack["+tmpC2+"] = "+sum2.anterior+";\n";
                cadBS += "P = P + "+tamMetodo+";\n";
                cadBS += "call concatenacion_cadena;\n";
                cadBS += tmpPR2 + " = P + 0;\n";
                cadBS += tmpR2 +" = Stack["+tmpPR2+"];\n";
                cadBS += "P = P - "+tamMetodo+";\n";
                return {cadena:cadBS, anterior:tmpR2, tipo:"string"};
            }else if(sum1.tipo == "string" && (sum2.tipo == "bool"|| sum2.tipo == "boolean")){
                var tmpSb = generarTemp();
                var tmpCb = generarTemp();
                var tmpPRb = generarTemp();
                var tmpRb = generarTemp();
                var tmpSb2 = generarTemp();
                var tmpCb2 = generarTemp();
                var tmpPRb2 = generarTemp();
                var tmpRb2 = generarTemp();
                var cadSB = "";

                cadSB += sum2.cadena+"\n";
                cadSB += tmpSb + " = P + "+tamMetodo+";\n";
                cadSB += tmpCb + " = "+tmpSb +" + 2;\n";
                cadSB += "Stack["+tmpCb+"] = "+sum2.anterior+";\n";
                cadSB += "P = P + "+tamMetodo+";\n";
                cadSB += "call casteo_boolean_cadena;\n";
                cadSB += tmpPRb +" = P + 0;\n";
                cadSB += tmpRb +" = Stack["+tmpPRb+"];\n";
                cadSB += "P = P - "+tamMetodo+";\n";

                cadSB += sum1.cadena;
                cadSB += tmpSb2 +" = P + "+tamMetodo+";\n";
                cadSB += tmpCb2 +" = "+tmpSb2 +" + 2;\n";
                cadSB += "Stack["+tmpCb2+"] = "+sum1.anterior+";\n";
                cadSB += tmpCb2 +" = "+tmpSb2 +" + 3;\n";
                cadSB += "Stack["+tmpCb2+"] = "+tmpRb+";\n";
                cadSB += "P = P + "+tamMetodo+";\n";
                cadSB += "call concatenacion_cadena;\n";
                cadSB += tmpPRb2 + " = P + 0;\n";
                cadSB += tmpRb2 +" = Stack["+tmpPRb2+"];\n";
                cadSB += "P = P - "+tamMetodo+";\n";
                return {cadena:cadSB, anterior:tmpRb2, tipo:"string"};

            }else if(sum1.tipo == "char" && sum2.tipo == "string"){
                                
                var tmpS = generarTemp();
                var tmpC = generarTemp();
                var tmpPR = generarTemp();
                var tmpR = generarTemp();
                var tmpS2 = generarTemp();
                var tmpC2 = generarTemp();
                var tmpPR2 = generarTemp();
                var tmpR2 = generarTemp();
                var cadBS = "";

                cadBS += sum1.cadena+"\n";
                cadBS += tmpS+ " = P +"+tamMetodo+";\n";
                cadBS += tmpC+ " = "+tmpS+ "+ 2;\n";
                cadBS += "Stack["+tmpC+"] = "+sum1.anterior+";\n";
                cadBS += "P = P + "+tamMetodo+";\n";
                cadBS += "call casteo_char_cadena;\n";
                cadBS += tmpPR +" = P + 0;\n";
                cadBS += tmpR +" = Stack["+tmpPR+"];\n";
                cadBS += "P = P - "+tamMetodo+";\n";
                

                cadBS += sum2.cadena+"\n";
                cadBS += tmpS2 +" = P + "+tamMetodo+";\n";
                cadBS += tmpC2 + " = "+tmpS2+" + 2;\n";
                cadBS += "Stack["+tmpC2+"] = "+tmpR+";\n";
                cadBS += tmpC2 + " = "+tmpS2+" + 3;\n";
                cadBS += "Stack["+tmpC2+"] = "+sum2.anterior+";\n";
                cadBS += "P = P + "+tamMetodo+";\n";
                cadBS += "call concatenacion_cadena;\n";
                cadBS += tmpPR2 + " = P + 0;\n";
                cadBS += tmpR2 +" = Stack["+tmpPR2+"];\n";
                cadBS += "P = P - "+tamMetodo+";\n";

                return {cadena:cadBS, anterior:tmpR2, tipo:"string"};


            }else if(sum1.tipo == "string" && sum2.tipo == "char"){
                var tmpSb = generarTemp();
                var tmpCb = generarTemp();
                var tmpPRb = generarTemp();
                var tmpRb = generarTemp();
                
                var tmpSb2 = generarTemp();
                var tmpCb2 = generarTemp();
                var tmpPRb2 = generarTemp();
                var tmpRb2 = generarTemp();
                var cadSB = "";

                cadSB += sum2.cadena+"\n";
                cadSB += tmpSb + " = P + "+tamMetodo+";\n";
                cadSB += tmpCb + " = "+tmpSb +" + 2;\n";
                cadSB += "Stack["+tmpCb+"] = "+sum2.anterior+";\n";
                cadSB += "P = P + "+tamMetodo+";\n";
                cadSB += "call casteo_char_cadena;\n";
                cadSB += tmpPRb +" = P + 0;\n";
                cadSB += tmpRb +" = Stack["+tmpPRb+"];\n";
                cadSB += "P = P - "+tamMetodo+";\n";

                cadSB += sum1.cadena+"\n";
                cadSB += tmpSb2 +" = P + "+tamMetodo+";\n";
                cadSB += tmpCb2 +" = "+tmpSb2 +" + 2;\n";
                cadSB += "Stack["+tmpCb2+"] = "+sum1.anterior+";\n";
                cadSB += tmpCb2 +" = "+tmpSb2 +" + 3;\n";
                cadSB += "Stack["+tmpCb2+"] = "+tmpRb+";\n";
                cadSB += "P = P + "+tamMetodo+";\n";
                cadSB += "call concatenacion_cadena;\n";
                cadSB += tmpPRb2 + " = P + 0;\n";
                cadSB += tmpRb2 +" = Stack["+tmpPRb2+"];\n";
                cadSB += "P = P - "+tamMetodo+";\n";
                return {cadena:cadSB, anterior:tmpRb2, tipo:"string"};
            
            }else if( sum1.tipo == "integer" && sum2.tipo == "string"){
                
                var tmpS = generarTemp();
                var tmpC = generarTemp();
                var tmpPR = generarTemp();
                var tmpR = generarTemp();
                var tmpS2 = generarTemp();
                var tmpC2 = generarTemp();
                var tmpPR2 = generarTemp();
                var tmpR2 = generarTemp();
                var cadBS = "";

                cadBS += sum1.cadena+"\n";
                cadBS += tmpS+ " = P +"+tamMetodo+";\n";
                cadBS += tmpC+ " = "+tmpS+ "+ 2;\n";
                cadBS += "Stack["+tmpC+"] = "+sum1.anterior+";\n";
                cadBS += "P = P + "+tamMetodo+";\n";
                cadBS += "call casteo_int_cadena;\n";
                cadBS += tmpPR +" = P + 0;\n";
                cadBS += tmpR +" = Stack["+tmpPR+"];\n";
                cadBS += "P = P - "+tamMetodo+";\n";
                

                cadBS += sum2.cadena+"\n";
                cadBS += tmpS2 +" = P + "+tamMetodo+";\n";
                cadBS += tmpC2 + " = "+tmpS2+" + 2;\n";
                cadBS += "Stack["+tmpC2+"] = "+tmpR+";\n";
                cadBS += tmpC2 + " = "+tmpS2+" + 3;\n";
                cadBS += "Stack["+tmpC2+"] = "+sum2.anterior+";\n";
                cadBS += "P = P + "+tamMetodo+";\n";
                cadBS += "call concatenacion_cadena;\n";
                cadBS += tmpPR2 + " = P + 0;\n";
                cadBS += tmpR2 +" = Stack["+tmpPR2+"];\n";
                cadBS += "P = P - "+tamMetodo+";\n";

                return {cadena:cadBS, anterior:tmpR2, tipo:"string"};

            
            }else if( sum1.tipo == "string" && sum2.tipo == "integer"){
                var tmpSb = generarTemp();
                var tmpCb = generarTemp();
                var tmpPRb = generarTemp();
                var tmpRb = generarTemp();
                
                var tmpSb2 = generarTemp();
                var tmpCb2 = generarTemp();
                var tmpPRb2 = generarTemp();
                var tmpRb2 = generarTemp();
                var cadSB = "";

                cadSB += sum2.cadena+"\n";
                cadSB += tmpSb + " = P + "+tamMetodo+";\n";
                cadSB += tmpCb + " = "+tmpSb +" + 2;\n";
                cadSB += "Stack["+tmpCb+"] = "+sum2.anterior+";\n";
                cadSB += "P = P + "+tamMetodo+";\n";
                cadSB += "call casteo_int_cadena;\n";
                cadSB += tmpPRb +" = P + 0;\n";
                cadSB += tmpRb +" = Stack["+tmpPRb+"];\n";
                cadSB += "P = P - "+tamMetodo+";\n";

                cadSB += sum1.cadena;
                cadSB += tmpSb2 +" = P + "+tamMetodo+";\n";
                cadSB += tmpCb2 +" = "+tmpSb2 +" + 2;\n";
                cadSB += "Stack["+tmpCb2+"] = "+sum1.anterior+";\n";
                cadSB += tmpCb2 +" = "+tmpSb2 +" + 3;\n";
                cadSB += "Stack["+tmpCb2+"] = "+tmpRb+";\n";
                cadSB += "P = P + "+tamMetodo+";\n";
                cadSB += "call concatenacion_cadena;\n";
                cadSB += tmpPRb2 + " = P + 0;\n";
                cadSB += tmpRb2 +" = Stack["+tmpPRb2+"];\n";
                cadSB += "P = P - "+tamMetodo+";\n";
                return {cadena:cadSB, anterior:tmpRb2, tipo:"string"};

            }else if( sum1.tipo == "double" && sum2.tipo == "string"){
                
                var tmpS = generarTemp();
                var tmpC = generarTemp();
                var tmpPR = generarTemp();
                var tmpR = generarTemp();
                var tmpS2 = generarTemp();
                var tmpC2 = generarTemp();
                var tmpPR2 = generarTemp();
                var tmpR2 = generarTemp();
                var cadBS = "";

                cadBS += sum1.cadena+"\n";
                cadBS += tmpS+ " = P +"+tamMetodo+";\n";
                cadBS += tmpC+ " = "+tmpS+ "+ 2;\n";
                cadBS += "Stack["+tmpC+"] = "+sum1.anterior+";\n";
                cadBS += "P = P + "+tamMetodo+";\n";
                cadBS += "call casteo_decimal_cadena;\n";
                cadBS += tmpPR +" = P + 0;\n";
                cadBS += tmpR +" = Stack["+tmpPR+"];\n";
                cadBS += "P = P - "+tamMetodo+";\n";
                

                cadBS += sum2.cadena+"\n";
                cadBS += tmpS2 +" = P + "+tamMetodo+";\n";
                cadBS += tmpC2 + " = "+tmpS2+" + 2;\n";
                cadBS += "Stack["+tmpC2+"] = "+tmpR+";\n";
                cadBS += tmpC2 + " = "+tmpS2+" + 3;\n";
                cadBS += "Stack["+tmpC2+"] = "+sum2.anterior+";\n";
                cadBS += "P = P + "+tamMetodo+";\n";
                cadBS += "call concatenacion_cadena;\n";
                cadBS += tmpPR2 + " = P + 0;\n";
                cadBS += tmpR2 +" = Stack["+tmpPR2+"];\n";
                cadBS += "P = P - "+tamMetodo+";\n";

                return {cadena:cadBS, anterior:tmpR2, tipo:"string"};

            }else if(sum1.tipo == "string" && sum2.tipo == "double"){
                var tmpSb = generarTemp();
                var tmpCb = generarTemp();
                var tmpPRb = generarTemp();
                var tmpRb = generarTemp();
                
                var tmpSb2 = generarTemp();
                var tmpCb2 = generarTemp();
                var tmpPRb2 = generarTemp();
                var tmpRb2 = generarTemp();
                var cadSB = "";

                cadSB += sum2.cadena+"\n";
                cadSB += tmpSb + " = P + "+tamMetodo+";\n";
                cadSB += tmpCb + " = "+tmpSb +" + 2;\n";
                cadSB += "Stack["+tmpCb+"] = "+sum2.anterior+";\n";
                cadSB += "P = P + "+tamMetodo+";\n";
                cadSB += "call casteo_decimal_cadena;\n";
                cadSB += tmpPRb +" = P + 0;\n";
                cadSB += tmpRb +" = Stack["+tmpPRb+"];\n";
                cadSB += "P = P - "+tamMetodo+";\n";

                cadSB += sum1.cadena;
                cadSB += tmpSb2 +" = P + "+tamMetodo+";\n";
                cadSB += tmpCb2 +" = "+tmpSb2 +" + 2;\n";
                cadSB += "Stack["+tmpCb2+"] = "+sum1.anterior+";\n";
                cadSB += tmpCb2 +" = "+tmpSb2 +" + 3;\n";
                cadSB += "Stack["+tmpCb2+"] = "+tmpRb+";\n";
                cadSB += "P = P + "+tamMetodo+";\n";
                cadSB += "call concatenacion_cadena;\n";
                cadSB += tmpPRb2 + " = P + 0;\n";
                cadSB += tmpRb2 +" = Stack["+tmpPRb2+"];\n";
                cadSB += "P = P - "+tamMetodo+";\n";
                return {cadena:cadSB, anterior:tmpRb2, tipo:"string"};
            }else{
                console.log(sum1);
                console.log(sum2);
                console.log("\n TIPO DE DATO NO ACEPTADO -> Suma");
            }
          break;  
        case "-":
            var val1 = Expresion(exp.op1, ambitoValido, clase, metodoA);
            var val2 = Expresion(exp.op2, ambitoValido, clase, metodoA);
            console.log("Tipo1Res: " + val1.tipo);
            console.log("Tipo2Res: " + val2.tipo);

            //tipo resultante int
            if(val1.tipo == "integer" && val2.tipo == "integer" ||
                val1.tipo == "char" && val2.tipo == "integer" ||
                val1.tipo == "integer" && val2.tipo == "char" ||
                val1.tipo == "char" && val2.tipo == "char"){
                  var temp = generarTemp();
                  var cadRes = "";
                  cadRes += val1.cadena + val2.cadena + temp + "=" + val1.anterior + " - " +  val2.anterior + ";\n";
                  console.log(" ESTOY EN RESTA \n"+cadRes);
                  return { cadena: cadRes, anterior : temp, tipo: "integer"};
            
            //tipo resultante double
            }else if(val1.tipo == "integer" && val2.tipo == "double" ||
            val1.tipo == "double" && val2.tipo == "integer" ||
            val1.tipo == "double" && val2.tipo == "char" ||
            val1.tipo == "char" && val2.tipo == "double" ||
            val1.tipo == "double" && val2.tipo == "double"){
              var temp = generarTemp();
              var cadRes = "";
              //cadRes += "var "+temp+";\n";
              cadRes += val1.cadena + val2.cadena + temp + "=" + val1.anterior + " - " +  val2.anterior + ";\n";
              console.log(" ESTOY EN RESTA \n"+cadRes);
              return { cadena: cadRes, anterior : temp, tipo: "double"};
            
            }else{
                console.log("\n TIPO DE DATO NO ACEPTADO -> Resta");
            }
            break;

        case "*":
            var mult1 = Expresion(exp.op1, ambitoValido, clase, metodoA);
            var mult2 = Expresion(exp.op2, ambitoValido, clase, metodoA);
            console.log("Tipo1Mult: " + mult1.tipo);
            console.log("Tipo2Mult: " + mult2.tipo);

            //tipo resultante int
            if(mult1.tipo == "integer" && mult2.tipo == "integer" ||
               mult1.tipo == "char" && mult2.tipo == "char" ||
               mult1.tipo == "char" && mult2.tipo == "integer" ||
               mult1.tipo == "integer" && mult2.tipo == "char"){
                var tempMult = generarTemp();
                var cadMult = "";
                cadMult +=  mult2.cadena + mult1.cadena + tempMult + " = " + mult1.anterior + " * " + mult2.anterior +";\n";
                console.log("ESTOY EN MULTIPLICACION \n"+ cadMult);
                return { cadena : cadMult, anterior : tempMult, tipo: "integer"};           
            
            //tipo resultante double    
            }else if(mult1.tipo == "integer" && mult2.tipo == "double" ||
            mult1.tipo == "double" && mult2.tipo == "integer" ||
            mult1.tipo == "double" && mult2.tipo == "char" ||
            mult1.tipo == "char" && mult2.tipo == "double" ||
            mult1.tipo == "double" && mult2.tipo == "double"){
             var tempMult = generarTemp();
             var cadMult = "";
             cadMult = mult1.cadena + mult2.cadena + tempMult + " = " + mult1.anterior + " * " + mult2.anterior +";\n";
             console.log("ESTOY EN MULTIPLICACION \n"+ cadMult);
             return { cadena : cadMult, anterior : tempMult, tipo: "double"};           
         }else{
                console.log("\n TIPO DE DATO NO ACEPTADO -> Multiplicacion ->" +mult1.tipo + " "+ mult2.tipo);
            }   
           break;

        case "/":
            var div1 = Expresion(exp.op1, ambitoValido, clase, metodoA);
            var div2 = Expresion(exp.op2, ambitoValido, clase, metodoA);
            console.log("Tipo1Div: " + div1.tipo);
            console.log("Tipo2Div: " + div2.tipo);
            //tipo resultante int
            if(div1.tipo == "integer" && div2.tipo == "char" ||
               div1.tipo == "char" && div2.tipo == "integer" ||
               div1.tipo == "integer" && div2.tipo == "integer" ||
               div1.tipo == "char" && div2.tipo == "char" ){
                var tempDiv = generarTemp();
                var cadDiv = "";
                cadDiv = div1.cadena + div2.cadena + tempDiv + " = " + div1.anterior + " / " + div2.anterior +";\n";
                console.log(" ESTOY EN DIVISION \n"+cadDiv);
                return { cadena : cadDiv, anterior : tempDiv, tipo: "integer"};           
            
            //tipo resultante double
            }if(div1.tipo == "integer" && div2.tipo == "double" ||
            div1.tipo == "double" && div2.tipo == "integer" ||
            div1.tipo == "double" && div2.tipo == "char" ||
            div1.tipo == "char" && div2.tipo == "double" ||
            div1.tipo == "double" && div2.tipo == "double" ){
             var tempDiv = generarTemp();
             var cadDiv = "";
             cadDiv += div1.cadena + div2.cadena + tempDiv + " = " + div1.anterior + " / " + div2.anterior +";\n";
             console.log(" ESTOY EN DIVISION \n"+cadDiv);
             return { cadena : cadDiv, anterior : tempDiv, tipo: "double"};           
         }else{
                console.log("\n TIPO DE DATO NO ACEPTADO -> Division");
            }

            break;
        case "%":
            var mod1 = Expresion(exp.op1, ambitoValido, clase, metodoA);
            var mod2 = Expresion(exp.op2, ambitoValido, clase, metodoA);
            console.log("Tipo1Mod: " + mod1.tipo);
            console.log("Tipo2Mod: " + mod2.tipo);

            if(mod1.tipo == "integer" && mod2.tipo == "integer" ||  mod1.tipo == "double" && mod2.tipo == "integer" ||
               mod1.tipo == "integer" && mod2.tipo == "double" ||mod1.tipo == "double" && mod2.tipo == "double"){
                var tempMod = generarTemp();
                var cadMod = "";
                cadMod += mod1.cadena + mod2.cadena + tempMod + " = " + mod1.anterior + " % " + mod2.anterior +";\n";
                console.log(" ESTOY EN MODULAR \n"+cadMod);
                return { cadena : cadMod, anterior : tempMod, tipo: "double"};           
            }else if(mod1.tipo == "integer" && mod2.tipo == "char" || mod1.tipo == "char" && mod2.tipo == "integer" ||
                     mod1.tipo == "integer" && mod2.tipo == "integer" || mod1.tipo == "char" && mod2.tipo == "char" ){
                    var tmpM = generarTemp();
                    var cad ="";
                    cad += "var "+tmpM+";\n";
                    cad += mod1.cadena;
                    cad += mod2.cadena;
                    cad += tmpM +" = "+ mod1.anterior+" % "+mod2.anterior+";\n";    
                    return {cadena:cad, anterior:tmpM, anterior:"integer"};
            }else{
                console.log("\n TIPO DE DATO NO ACEPTADO -> Modular");
            }

            break;
        case "^":
            var pot1 = Expresion(exp.op1, ambitoValido, clase, metodoA);
            var pot2 = Expresion(exp.op2, ambitoValido, clase, metodoA);
            console.log("Tipo1Pot: " + pot1.tipo);
            console.log("Tipo2Pot: " + pot2.tipo);

            if(pot1.tipo == "bool" && pot2.tipo == "bool"){
                var tempPot = generarTemp();
                var cadPot = "";
                cadPot += pot1.cadena + pot2.cadena + tempPot + " = " + pot1.anterior + " ^ " + pot2.anterior +";\n";
                console.log(" ESTOY EN POTENCIA \n"+ cadPot);
                
                var resultado ="";
                
                if(or1.valor == "false" && or2.valor == "false"){
                    resultado = "false";
                }
        
                if(or1.valor == "false" && or2.valor == "true"){
                    resultado = "true";
                }
        
                if(or1.valor == "true" && or2.valor == "false"){
                     resultado = "true";
                }
        
                if(or1.valor == "true" && or2.valor == "true"){
                     resultado = "false";
                }
                return { cadena : cadPot, anterior : tempPot, tipo: "bool", valor:resultado };           
            }else{
                console.log("\n TIPO DE DATO NO ACEPTADO -> Potencia");
            }
            
            break;
        case "neg":
            var neg = Expresion(exp.op1, ambitoValido, clase, metodoA);
            if(neg.tipo == "integer"){
                var tempNeg = generarTemp();
                var cadNeg = "";
                cadNeg += neg.cadena + tempNeg + " = " + "-" + neg.anterior + ";\n";
                console.log(" ESTOY EN NEG \n" +cadNeg);
                return { cadena: cadNeg, anterior: tempNeg, tipo : "integer"};
            }

            break;
        case "==":
            var etqV = generarEtiq();
            var etqF = generarEtiq();

             var exp1 = Expresion(exp.op1, ambitoValido, clase, metodoA);
             var exp2 = Expresion(exp.op2, ambitoValido, clase, metodoA);
             if(exp1.tipo === "integer" && exp2.tipo === "integer" || exp1.tipo === "integer" && exp2.tipo === "double" || exp1.tipo === "double" && exp2.tipo === "char" ||
             exp1.tipo === "char" && exp2.tipo === "double" || exp1.tipo === "integer" && exp2.tipo === "char"  || exp1.tipo === "char" && exp2.tipo === "integer" ||
             exp1.tipo === "double" && exp2.tipo === "double" || exp1.tipo === "char" && exp2.tipo === "char"  ||
             exp1.tipo ==="bool" && exp2.tipo ==="bool"|| exp1.tipo === "double" && exp2.tipo === "integer"){

                var cadI = exp1.cadena + exp2.cadena + "if(" + exp1.anterior + " == " + exp2.anterior + " ) goto " + etqV + ";\n";
                cadI  += " goto " + etqF + ";\n";
                var tmp = generarTemp();
                var etq = generarEtiq();
                var cadAux = "";
                cadAux += cadI;
                cadAux += etqV+":\n";
                cadAux += tmp +" = 1;\n";
                cadAux += "goto "+etq+";\n";
                cadAux += etqF+":\n";
                cadAux += tmp +" = 0;\n";
                cadAux += etq+":\n";
                
                var resultado = exp1.anterior == exp2.anterior;
                console.log(" ESTOY EN == \n" + cadI);
                return { cadenaBool:cadI, etqVer:etqV, etqFal:etqF, valor:resultado , tipo:"bool", cadena:cadAux, anterior:tmp};
             } else if(exp1.tipo ==="string" && exp2.tipo ==="string"){
                
                var tmp1 = generarTemp();
                var tmp2 = generarTemp();
                var tmp3 = generarTemp();
                var tmp4 = generarTemp();
                var ambi = clase+"_Global";
                var cadena = "";
                var fun = buscarFuncionTraduccionActualTam(metodoA, ambi, simbolos);
                cadena += "##--- Inicia funcion equals String  \n";
                cadena += exp1.cadena+"\n";
                cadena += exp2.cadena+"\n";
                cadena += "P = P + "+fun+";\n";
                cadena += tmp1+" = P + 2;\n";
                cadena += "Stack["+tmp1+"] = "+exp1.anterior+";\n";
                cadena += tmp4 +" = P + 3;\n";
                cadena += "Stack["+tmp4+"] = "+exp2.anterior+";\n"
                cadena += "call string_equals;\n";
                cadena += tmp2+"=  P + 0;\n";
                cadena += tmp3+" = Stack["+tmp2+"];\n";
                cadena += "P = P - "+fun+";\n";
                cadena += "##--- Finaliza funcion equals String  \n";
                var cadI = "";
                cadI += cadena+"\n";
                cadI +=  exp1.cadena + exp2.cadena + "if(" + tmp3 + " == 1 ) goto " + etqV + ";\n";
                cadI  += " goto " + etqF + ";\n";
                var tmp = generarTemp();
                var etq = generarEtiq();
                return { cadenaBool:cadI, etqVer:etqV, etqFal:etqF, valor:"", tipo:"bool", cadena:cadena, anterior:tmp3};
            
            }
             if(exp1.rol!= undefined){
                if(((exp1.rol == "arreglo" || exp1.rol == "variable" || exp1.rol == "estructura" || exp1.rol == "arregloEdd") &&
                   exp2.tipo == "null") || exp2.tipo == "null"){
                    var cadI = exp1.cadena + exp2.cadena + "if(" + exp1.anterior + " == " + exp2.anterior + " ) goto " + etqV + ";\n";
                    cadI  += " goto " + etqF + ";\n";
                    return { cadenaBool : cadI, etqVer : etqV, etqFal : etqF, valor:"" , tipo:"bool"};
                }
            }

        case "===":
            var exp1 = Expresion(exp.op1, ambitoValido, clase, metodoA);
            var exp2 = Expresion(exp.op2, ambitoValido, clase, metodoA);
            if(exp1.rol == "arreglo" && exp2.rol == "arreglo" || exp1.rol == "estructura" && exp2.rol == "estructura" ){
                var etq1 = generarEtiq();
                var etq2 = generarEtiq();
                var etq3 = generarEtiq();
                var tmp = generarTemp();
                var cad = "";
                cad += exp1.cadena+"\n";
                cad += exp2.cadena+"\n";
                cad += "if( "+exp1.anterior+" == "+exp2.anterior+") goto "+etq1+";\n";
                cad += "goto "+etq2+";\n";
                var cad2 = "";
                cad2 += cad+"\n";
                cad2 += etq1+":\n";
                cad2 += tmp+" = 1;\n";
                cad2 += "goto "+etq3+";\n";
                cad2 += etq2+":\n";
                cad2 += tmp +" = 0";
                cad2 +  etq3+":"
                return { cadenaBool : cad, etqVer:etq1, etqFal:etq2, valor:"" , tipo:"bool", cadena:cad2, anterior:tmp};

            }else{

            }
        case "!=":
            var etqVD = generarEtiq();
            var etqFD = generarEtiq();

            var exp1 = Expresion(exp.op1, ambitoValido, clase, metodoA);
            var exp2 = Expresion(exp.op2, ambitoValido, clase, metodoA);

            if(exp1.tipo === "integer" && exp2.tipo === "integer" || exp1.tipo === "integer" && exp2.tipo === "double" || exp1.tipo === "double" && exp2.tipo === "char" ||
            exp1.tipo === "char" && exp2.tipo === "double" || exp1.tipo === "integer" && exp2.tipo === "char"  || exp1.tipo === "char" && exp2.tipo === "integer" ||
            exp1.tipo === "double" && exp2.tipo === "double" || exp1.tipo === "char" && exp2.tipo === "char" || exp1.tipo ==="string" && exp2.tipo ==="string" ||
            exp1.tipo ==="bool" && exp2.tipo ==="bool" || exp1.tipo === "double" && exp2.tipo === "integer"){

                var cadD = exp1.cadena + exp2.cadena + "if (" + exp1.anterior + " <> " + exp2.anterior + " ) goto " + etqVD + ";\n";
                cadD += " goto "+ etqFD + ";\n";
                var tmp = generarTemp();         
                var etq = generarEtiq();
                var cadAux = "";
                cadAux += cadD;
                cadAux += etqVD+":\n";
                cadAux += tmp +" = 1;\n";
                cadAux += "goto "+etq+";\n";
                cadAux += etqFD+":\n";
                cadAux += tmp +" = 0;\n";
                cadAux += etq+":\n";
                var resultado = exp1.anterior != exp2.anterior;
                console.log(" ESTOY EN != \n"+ cadD);
                return { cadenaBool : cadD,  etqVer : etqVD, etqFal : etqFD, valor:resultado, cadena:cadAux, anterior:tmp};
            
            }
            if(exp1.rol!= undefined){
                if(((exp1.rol == "arreglo" || exp1.rol == "variable" || exp1.rol == "estructura" || exp1.rol == "arregloEdd") &&
                   exp2.tipo == "null") || exp2.tipo == "null"){
                    var cadI = exp1.cadena + exp2.cadena + "if(" + exp1.anterior + " <> " + exp2.anterior + " ) goto " + etqVD + ";\n";
                    cadI  += " goto " + etqFD + ";\n";
                    return { cadenaBool: cadI, etqVer : etqVD, etqFal : etqFD, valor:"" , tipo:"bool"};
                }
            }
        case "<":
            var etqVMen = generarEtiq();
            var etqFMen = generarEtiq();

            var exp1 = Expresion(exp.op1, ambitoValido, clase, metodoA);
            var exp2 = Expresion(exp.op2, ambitoValido, clase, metodoA);
            if(exp1.tipo === "integer" && exp2.tipo === "integer" || exp1.tipo === "integer" && exp2.tipo === "double" || exp1.tipo === "double" && exp2.tipo === "char" ||
            exp1.tipo === "char" && exp2.tipo === "double" || exp1.tipo === "integer" && exp2.tipo === "char"  || exp1.tipo === "char" && exp2.tipo === "integer" ||
            exp1.tipo === "double" && exp2.tipo === "double" || exp1.tipo === "char" && exp2.tipo === "char"||  exp1.tipo === "double" && exp2.tipo === "integer"){

                var cadMen = exp1.cadena + exp2.cadena + "if (" + exp1.anterior + " < " + exp2.anterior + " ) goto " + etqVMen + ";\n";
                cadMen += "  "+" goto " + etqFMen + "; \n";
                var tmp = generarTemp();         
                var etq = generarEtiq();
                var cadAux = "";
                cadAux += cadMen;
                cadAux += etqVMen+":\n";
                cadAux += tmp +" = 1;\n";
                cadAux += "goto "+etq+";\n";
                cadAux += etqFMen+":\n";
                cadAux += tmp +" = 0;\n";
                cadAux += etq+":\n";
                var resultado = exp1.anterior < exp2.anterior;
                return { cadenaBool:cadMen, etqVer: etqVMen , etqFal: etqFMen, valor:resultado, tipo:"bool", cadena:cadAux, anterior:tmp };
            }
            if(exp1.rol!= undefined){
                if(((exp1.rol == "arreglo" || exp1.rol == "variable" || exp1.rol == "estructura" || exp1.rol == "arregloEdd") &&
                   exp2.tipo == "null") || exp2.tipo == "null"){
                    var cadI = exp1.cadena + exp2.cadena + "if(" + exp1.anterior + " == " + exp2.anterior + " ) goto " + etqVMen + ";\n";
                    cadI  += " goto " + etqFMen + ";\n";
                    return { cadenaBool : cadI, etqVer : etqVMen, etqFal : etqFMen, valor:"" , tipo:"bool"};
                }
            }
        case ">":
            var etqVMay = generarEtiq();
            var etqFMay = generarEtiq();
            var exp1 = Expresion(exp.op1, ambitoValido, clase, metodoA);
            var exp2 = Expresion(exp.op2, ambitoValido, clase, metodoA);
            if(exp1.tipo === "integer" && exp2.tipo === "integer" || exp1.tipo === "integer" && exp2.tipo === "double" || exp1.tipo === "double" && exp2.tipo === "char" ||
            exp1.tipo === "char" && exp2.tipo === "double" || exp1.tipo === "integer" && exp2.tipo === "char"  || exp1.tipo === "char" && exp2.tipo === "integer" ||
            exp1.tipo === "double" && exp2.tipo === "double" || exp1.tipo === "char" && exp2.tipo === "char" || exp1.tipo === "double" && exp2.tipo === "integer"){
                var resultado = exp1.anterior > exp2.anterior;
                
                var cadMay = exp1.cadena + exp2.cadena + "if (" + exp1.anterior + " > " + exp2.anterior + " ) goto " + etqVMay + ";\n";
                cadMay +=  "  "+" goto " + etqFMay + "; \n";
                    var tmp = generarTemp();         
                    var etq = generarEtiq();
                    var cadAux = "";
                    cadAux += cadMay;
                    cadAux += etqVMay+":\n";
                    cadAux += tmp +" = 1;\n";
                    cadAux += "goto "+etq+";\n";
                    cadAux += etqFMay+":\n";
                    cadAux += tmp +" = 0;\n";
                    cadAux += etq+":\n";
                return { cadenaBool : cadMay, etqVer: etqVMay , etqFal: etqFMay, valor:resultado, tipo:"bool" , cadena:cadAux, anterior:tmp };
            }
            if(exp1.rol!= undefined){
                if(((exp1.rol == "arreglo" || exp1.rol == "variable" || exp1.rol == "estructura" || exp1.rol == "arregloEdd") &&
                   exp2.tipo == "null") || exp2.tipo == "null"){
                    var cadI = exp1.cadena + exp2.cadena + "if(" + exp1.anterior + " == " + exp2.anterior + " ) goto " + etqVMay + ";\n";
                    cadI  += " goto " + etqFMay + ";\n";
                    return { cadenaBool : cadI, etqVer : etqVMay, etqFal : etqFMay, valor:"" , tipo:"bool"};
                }
            }
        case "<=":
            var etqVMenI = generarEtiq();
            var etqFMenI = generarEtiq();

            var exp1 = Expresion(exp.op1, ambitoValido, clase, metodoA);
            var exp2 = Expresion(exp.op2, ambitoValido, clase, metodoA);
            if(exp1.tipo === "integer" && exp2.tipo === "integer" || exp1.tipo === "integer" && exp2.tipo === "double" || exp1.tipo === "double" && exp2.tipo === "char" ||
            exp1.tipo === "char" && exp2.tipo === "double" || exp1.tipo === "integer" && exp2.tipo === "char"  || exp1.tipo === "char" && exp2.tipo === "integer" ||
            exp1.tipo === "double" && exp2.tipo === "double" || exp1.tipo === "char" && exp2.tipo === "char" || exp1.tipo === "double" && exp2.tipo === "integer"){

            var cadMenI = exp1.cadena + exp2.cadena + "if (" + exp1.anterior + " <= " + exp2.anterior + " ) goto " + etqVMenI + ";\n";
            cadMenI += " goto " + etqFMenI + "; \n";
            var resultado = exp1.anterior <= exp2.anterior;

                var tmp = generarTemp();         
                var etq = generarEtiq();
                var cadAux = "";
                cadAux += cadMenI;
                cadAux += etqVMenI+":\n";
                cadAux += tmp +" = 1;\n";
                cadAux += "goto "+etq+";\n";
                cadAux += etqFMenI+":\n";
                cadAux += tmp +" = 0;\n";
                cadAux += etq+":\n";

            console.log(" ESTOY EN <= \n"+ cadMenI);
            return { cadenaBool:cadMenI, etqVer:etqVMenI , etqFal: etqFMenI, valor: resultado, cadena:cadAux, anterior:tmp};
            
            }
            if(exp1.rol!= undefined){
                if(((exp1.rol == "arreglo" || exp1.rol == "variable" || exp1.rol == "estructura" || exp1.rol == "arregloEdd") &&
                   exp2.tipo == "null") || exp2.tipo == "null"){
                    var cadI = exp1.cadena + exp2.cadena + "if(" + exp1.anterior + " == " + exp2.anterior + " ) goto " + etqVMenI + ";\n";
                    cadI  += " goto " + etqFMenI + ";\n";
                    return { cadenaBool : cadI, etqVer : etqVMenI, etqFal : etqFMenI, valor:"" , tipo:"bool"};
                }
            }
        case ">=":
            var etqVMayI = generarEtiq();
            var etqFMayI = generarEtiq();

            var exp1 = Expresion(exp.op1, ambitoValido, clase, metodoA);
            var exp2 = Expresion(exp.op2, ambitoValido, clase, metodoA);

            if(exp1.tipo === "integer" && exp2.tipo === "integer" || exp1.tipo === "integer" && exp2.tipo === "double" || exp1.tipo === "double" && exp2.tipo === "char" ||
            exp1.tipo === "char" && exp2.tipo === "double" || exp1.tipo === "integer" && exp2.tipo === "char"  || exp1.tipo === "char" && exp2.tipo === "integer" ||
            exp1.tipo === "double" && exp2.tipo === "double" || exp1.tipo === "char" && exp2.tipo === "char" || exp1.tipo === "double" && exp2.tipo === "integer"){

                var cadMayI = exp1.cadena + exp2.cadena + "if (" + exp1.anterior + " >= " + exp2.anterior + " ) goto " + etqVMayI + ";\n";
                cadMayI += " goto " + etqFMayI + "; \n";
                var resultado = exp1.anterior >= exp2.anterior;
                console.log(" ESTOY EN >= \n"+ cadMayI);
                var tmp = generarTemp();         
                var etq = generarEtiq();
                var cadAux = "";
                cadAux += cadMayI;
                cadAux += etqVMayI+":\n";
                cadAux += tmp +" = 1;\n";
                cadAux += "goto "+etq+";\n";
                cadAux += etqFMayI+":\n";
                cadAux += tmp +" = 0;\n";
                cadAux += etq+":\n";
                return { cadenaBool : cadMayI, etqVer: etqVMayI , etqFal: etqFMayI, valor: resultado, cadena:cadAux, anterior:tmp};            
            }
            if(exp1.rol!= undefined){
                if(((exp1.rol == "arreglo" || exp1.rol == "variable" || exp1.rol == "estructura" || exp1.rol == "arregloEdd") &&
                   exp2.tipo == "null") || exp2.tipo == "null"){
                    var cadI = exp1.cadena + exp2.cadena + "if(" + exp1.anterior + " == " + exp2.anterior + " ) goto " + etqVMayI + ";\n";
                    cadI  += " goto " + etqFMayI + ";\n";
                    return { cadenaBool : cadI, etqVer : etqVMayI, etqFal : etqFMayI, valor:"" , tipo:"bool"};
                }
            }
        case "||":
            var or1 = Expresion(exp.op1, ambitoValido, clase, metodoA);
            var or2 = Expresion(exp.op2, ambitoValido, clase, metodoA);
            console.log(or1);
            console.log(or2);

            var cadenaOr = "";
            if(or1.tipo == "bool" && or2.tipo =="bool" ){
                cadenaOr += "  "+or1.cadenaBool ;
                cadenaOr += "  "+or1.etqFal + ":\n";
                cadenaOr += "  "+or2.cadenaBool;
            }

            var resultado ="";
            
            var etqVerdad = " "+or1.etqVer + ":\n" +"   "+ or2.etqVer;
            return {cadenaBool: cadenaOr, etqVer: etqVerdad, etqFal: or2.etqFal , valor: resultado, tipo:"bool"};
        case "&&":
            var and1 = Expresion(exp.op1, ambitoValido, clase, metodoA);
            var and2 = Expresion(exp.op2, ambitoValido, clase, metodoA);
            var cadAnd = "";

            if(and1.tipo == "bool" && and2.tipo =="bool"){
                cadAnd += "  " +and1.cadenaBool;
                cadAnd += "  " +and1.etqVer + ":\n ";
                cadAnd += "  " +and2.cadenaBool;
            }
            var resultado ="";
            var etqFalso = "  "+ and1.etqFal + ":\n"+"    "+ and2.etqFal;
            return {cadenaBool:cadAnd, etqVer: and2.etqVer, etqFal:etqFalso, valor:resultado, tipo:"bool" };

        case "!":
            console.log(" ESTOY EN ! " + exp.valor);
            var neg = Expresion(exp.op1, ambitoValido, clase, metodoA);
            if(neg.tipo == "bool"){
               return {cadenaBool: neg.cadenaBool, etqVer:neg.etqFal, etqFal:neg.etqVer, valor:"", tipo:"bool" };
            }
        case "string":
            var cad = exp.valor.replace(/\"/g, "");
            var cadNueva = cad.replace(/\'/g, "");
            var cadena = "##----        Almacenando cadena\n";
            var temp = generarTemp();
            cadena += temp + "= H; \n";
            cadena += "Heap[" + temp + "] = H;\n"; 

            for(i=0; i < cadNueva.length; i++){
                var caracterCadena = cadNueva.charAt(i);
                var valorCadena = caracterCadena.charCodeAt(0);
                cadena += "Heap[H] = " + valorCadena +";\n ";
                cadena += "H = H + 1; \n ";
            }
            cadena += "Heap[H] = 13;\n";
            cadena += "H = H + 1;\n";
            cadena += "Heap[H] = 0; \n"
            cadena += "H = H + 1; \n";
            console.log(" ESTOY EN STRING \n"+ cadena);
            return {cadena : cadena, anterior : temp.toString() , tipo : "string"};
    
        case "char":
            var cad = exp.valor.replace(/\"/g, "");
            var cadNueva = cad.replace(/\'/g, "");            
            for(i=0; i < cadNueva.length; i++){
                var caracterCadena = cadNueva.charAt(i);
                var valorCadena = caracterCadena.charCodeAt(0);
            }
            console.log(" ESTOY EN CARACTER \n"+ valorCadena);
            var valor;
            valor = parseInt(valorCadena);
            return {cadena : "", anterior : valor , tipo : "char"};

        case "integer":
           console.log(" ESTOY EN integer " + exp.valor);
           var valor;
           valor = parseInt(exp.valor);
            
           return {cadena:"", anterior:valor , tipo:"integer"};
        case "integer":
           console.log(" ESTOY EN integer " + exp.valor);
           var valor;
           valor = parseInt(exp.valor);
            
           return {cadena:"", anterior:valor , tipo:"integer"};
        case "double":
            var valor;
            valor = parseFloat(exp.valor);
            console.log(" ESTOY EN double " + exp.valor);
            return {cadena:"", anterior:valor , tipo: "double"};    
        
        case "id":
            var ts = simbolos;
            var pos = -1;
            var ambSim = "";
            var cadId ="";
            var tipVar = "";
            var existeId = false;
            var tipoExtra = -1;
            //vamo a recorrer los ambitos
           /* for(amb in ambitoValido){
                for(tab in ts){
                    if(ambitoValido[amb] == ts[tab].ambito && ts[tab].nombre == exp.valor){
                        pos = ts[tab].posicion;
                        tipVar =ts[tab].tipo;
                        rol = ts[tab].rol;
                        ambSim = ts[tab].ambito;
                        existeId = true;
                        break;
                    }
                }    
            }*/

            var posi = ambitoValido.length-1;
            for(var x = posi; x >= 0 ; x--){
                for(var tab in ts.simbolo){
                    var ambito = ambitoValido[x];
                    var nombre = ts.simbolo[tab].nombre;
                    var ambi = ts.simbolo[tab].ambito;
                    if(ambito == ambi && nombre == exp.valor){
                        pos = ts.simbolo[tab].posicion;
                        tipVar =ts.simbolo[tab].tipo;
                        rol = ts.simbolo[tab].rol;
                        ambSim = ts.simbolo[tab].ambito;
                        existeId = true;
                        if(ts.simbolo[tab].hasOwnProperty('tipoExtra')){
                            tipoExtra =  ts.simbolo[tab].tipoExtra;
                        }
                        break;
                        
                    }
                }
                if(existeId){
                    break;
                }    
            }
            if(existeId){
                /*if(rol == "Variable_Parametro" && !(tipVar.toLowerCase() == "integer" || tipVar.toLowerCase() == "char" ||
                tipVar.toLowerCase() == "double" || tipVar.toLowerCase() == "boolean")){
                    var cadena = "";
                    var tmp1 = generarTemp();
                    var t1 = generarTemp();
                    var t2 = generarTemp();
                    var t3 = generarTemp();
                    var t4 = generarTemp();
                    var etqV = generarEtiq();
                    var etqF = generarEtiq();
                    var etqV2 = generarEtiq();
                    var etqF2 = generarEtiq();
                    var etqSalida = generarEtiq();
                    var cadena2 = "";
                    cadena2 += t1 +" = P + "+pos+";\n";
                    cadena2 += t2 +"= Stack["+t1+"];\n";
                    cadena += t1 +" = P + "+pos+";\n";
                    cadena += t2 +"= Stack["+t1+"];\n";
                    var posAux = pos+1;
                    cadena += t3 +" = P + "+posAux+";\n";
                    cadena += t4 +" = Stack["+t3+"];\n";
                    cadena += "if( "+t4+"== 1 ) goto "+etqV+";\n";
                    cadena += "goto "+etqF+";\n";
                    cadena += etqV+":\n";
                    cadena += tmp1 +" = Heap["+t2+"];\n";
                    cadena += "goto "+etqSalida+";\n";
                    cadena += etqF+":\n";
                    cadena += "if( "+t4+" == 0 ) goto "+etqV2+";\n";
                    cadena += "goto "+etqF2+";\n";
                    cadena += etqV2+":\n";
                    cadena += tmp1 +" = Stack["+t2+"];\n";
                    cadena += "goto "+etqSalida+";\n";
                    cadena += etqF2+":\n";
                    cadena += tmp1 +" = "+t2+";\n";
                    cadena += etqSalida+":\n";
                    if(tipoVar == "ref"){               
                        return { cadena: cadena, cadena2:cadena2, anterior:tmp1, anterior2:t2, tipo:tipVar, rol:rol, extra:1 , ambito:ambSim};
                    }else{
                        return { cadena: cadena, cadena2:cadena2, anterior:tmp1, anterior2:t2, tipo:tipVar, rol:rol, extra:0 , ambito:ambSim };
                    }
                }else{*/
                    var tmp1 = generarTemp();
                    cadId += "##-------- obteniendo la variable: "+ exp.valor +"\n";
                    var temp2 = generarTemp();
                    if(ambSim.includes("Global")){

                        cadId += tmp1 + " = " +pos +"; \n";
                        cadId += temp2 + " = Heap[" + tmp1 +"];\n";
                        return { cadena: cadId, anterior:temp2, tipo:tipVar, rol:rol, tipoExtra:tipoExtra};
                        
                    }else{
                        cadId += tmp1 + " = P + " +pos +"; \n";
                        cadId += temp2 + "  = Stack[" +tmp1 +"];\n";
                        return { cadena: cadId, anterior:temp2, tipo:tipVar, rol:rol, tipoExtra:tipoExtra};
                       
                    }
                //}
             }else{

                 return "";
             }

        case "null":            
            return {cadena:"", anterior:0 , tipo: "null"};
        
        case "bool":
            if(exp.valor.toString() == "true"){
                return {cadena: "", anterior: 1, tipo: "bool"};
            }else{
                return {cadena: "", anterior: 0, tipo: "bool"};
            }

       case "declaracionEdd":
            return traduccionSTRInstancia(exp.valor, ambitoValido, clase, metodoA, tipoVar);
       
        case "accesoLstObj":
            if(tipoVar == "ref"){
                return traduccionAccesoObjetos(exp.valor, ambitoValido, clase, metodoA, "ref");
            }else{
                return traduccionAccesoObjetos(exp.valor, ambitoValido, clase, metodoA, "");
            }
        case "decremento":
            return traduccionDecremento(exp, ambitoValido, clase, metodoA);
 
         case "incrementro":
            return traduccionIncremento(exp, ambitoValido, clase, metodoA);


        case "referencia":
            if(tipoVar.toLowerCase() == "integer" || tipoVar.toLowerCase() == "char" ||
            tipoVar.toLowerCase() == "double"|| tipoVar.toLowerCase() == "bool"){
                if(exp.val.nombre == "asig"){
                    var refIgnorar = Expresion(exp.val.parametro.expresion, ambitoValido, clase, metodoA, "");
                    return refIgnorar;
                }else{
                    var refIgnorar = Expresion(exp.val.parametro, ambitoValido, clase, metodoA,"" );
                    return refIgnorar;
                }
            }else{
                if(exp.val.nombre == "asig"){
                    var ref = Expresion(exp.val.parametro.expresion, ambitoValido, clase, metodoA, "ref");
                    return ref;
                }else{
                    var ref = Expresion(exp.val.parametro, ambitoValido, clase,metodoA, "ref");
                    return ref;
                }
            }
        case "valor":
            if(exp.val.nombre == "asig"){
                var refIgnorar = Expresion(exp.val.parametro.expresion, ambitoValido, clase, metodoA, "");
                return refIgnorar;
            }else{
                var refIgnorar = Expresion(exp.val.parametro, ambitoValido, clase, metodoA, "");
                return refIgnorar;
            }
        case "callFuncionPar":
            return traduccionLlamadaFuncionParametros(exp, ambitoValido, clase, metodoA);

        case "callFuncion":
            return traduccionLlamadaFuncion(exp, ambitoValido, clase, metodoA);
   
        case "casteoInt":
            return traduccionCasteoInteger(exp, ambitoValido, clase, metodoA);
        case "casteoChar":
            return traduccionCasteoChar(exp, ambitoValido, clase, metodoA);

        case "casteoDouble":
        return traduccionCasteoDouble(exp, ambitoValido, clase, metodoA);    

        case "casteoBoolean":
        return traduccionCasteoBoolean(exp, ambitoValido, clase, metodoA);    

        case "casteoId":
        return traduccionCasteoId(exp, ambitoValido, clase, metodoA);    

         case "initArray":
            return traduccionInstanciaArreglo(exp, ambitoValido, clase, metodoA);
        case "lstValores":
            return traduccionAgregandoValores(exp, ambitoValido, clase, metodoA);

        case "initArrayEDD":
            return traduccionInstanciaArregloEstructura(exp, ambitoValido, clase, metodoA);
        case "expArr":
            return Expresion(exp.valor, ambitoValido, clase, metodoA, tipoVar);    
        case "accesoArrEdd":
            if(exp.valor.nombre == "lstArr"){
                return traduccionAccesoArreglosSimple(exp.valor, ambitoValido, clase, metodoA, ref);
            }else{
                return traduccionAccesoArreglosEstructura(exp.valor, ambitoValido, clase, metodoA, ref);
            }
        case "incremento":
            return traduccionIncremento(exp, ambitoValido, clase, metodoA);
        case "decremento":
            return traduccionDecremento(exp, ambitoValido, clase, metodoA);

            /*
else if(tipoElemento.nombre == "callFuncionPar"){  //llamada con parametros
            var incremento = traduccionLlamadaFuncionParametros(tipoElemento, ambito, clase);
            cadena += incremento.cadena;
        }
            
callParametros: '$' tipoParametros{
                    $$ = { tipo:"valor", val:$1};
                }
                |tipoParametros{
                    $$ = { tipo:"referencia", val:$1 } ;
                };

tipoParametros: variable_Asignacion{
                    $$ = { nombre:"asig", parametro:$1 };
                }
                |expresionlog{
                    $$ = { nombre:"exp", parametro:$1 };
                };

            */

     /*     case "asignacion":
            var asig = ejecutarAsignacion(exp, ambValidos, clase, metodoA);
            return {cadena:asig, anterior:"", tipo:"asignacion"};

        case "ternario":
            return traducirTernario(exp, ambitoValido, clase, metodoA); 
        
        case "callMetSimple":
            var cadCS = trduccionLlamadaMetodoSimpleo(exp, ambitoValido, clase, metodoA); 
            return {cadena:cadCS, anterior:"", tipo:"callMetSimple"};

        case "calMetParametros":
            return trduccionLlamadaMetodo(exp, ambitoValido, clase, metodoA, auxi);
             
        case "casExplicito":
            var pasa = false;
            var idA;
            if(exp.tipoVar == "int"){
               
              if(exp.expresion.tipo == "id"){
                idA = exp.expresion.valor; 
              }
              pasa = true;
            }else if(exp.tipoVar == "char"){
                //var exp2 = Expresion(exp.expresion, ambitoValido, clase, metodoA);
                if(exp.expresion.tipo == "id"){
                    idA = exp.expresion.valor;
                }
                pasa = true;
            }else if(exp.tipoVar == "double"){
                //var exp3 = Expresion(exp.expresion, ambitoValido, clase, metodoA); 
                if(exp.expresion.tipo == "id"){
                    idA = exp.expresion.valor;
                }
                pasa = true;
            }
            if(pasa == true){
                var ts = simbolos.simbolo;
                var pos = -1;
                var ambSim = "";
                var cadId ="";
                var tipVar = "";
                var existeId = false;
                var valorActual;
                //vamo a recorrer los ambitos
                for(amb in ambitoValido){
                    for(tab in ts){
                        if(ambitoValido[amb] == ts[tab].ambito && ts[tab].nombre == idA){
                            pos = ts[tab].posicion;
                            tipVar = tipoResultado(ts[tab].tipo);
                            ambSim = ts[tab].ambito;
                            valorActual = ts[tab].valor;
                            existeId = true;
                            break;
                        }
                    }
                }
                 if(exp.tipoVar == "int"){
                     var exp5 = Expresion(valorActual, ambitoValido, clase, metodoA,0, exp.tipoVar);
                    return {cadena:exp5.cadena, anterior:exp5.anterior, tipo:exp5.tipo};  
                  }else if(exp.tipoVar == "char"){
                    var exp5 = Expresion(valorActual, ambitoValido, clase, metodoA,0, exp.tipoVar);
                    return {cadena:exp5.cadena, anterior:exp5.anterior, tipo:exp5.tipo};  
                  }else if(exp.tipoVar == "double"){
                    var exp5 = Expresion(valorActual, ambitoValido, clase, metodoA,0, exp.tipoVar);
                    return {cadena:exp5.cadena, anterior:exp5.anterior, tipo:exp5.tipo};  
                  }
                if(!(existeId == false)){
                    
                 }else{
    
                     return "";
                 }
            }else{
                //correcto 
            }

            case "casteoStr":
                if(tipoVar == "String"){
                    var tamMetodo = 0;
                    var ts = simbolos;
                    for(var is in ts.simbolo){
                        if(ts.simbolo[is].nombre == metodoA && ts.simbolo[is].rol == "metodo"){
                             tamMetodo = ts.simbolo[is].tamano;
                             console.log("tamanio tuto metodo a concatenar: "+ tamMetodo);
                             break;
                        }
                    }
                    if(exp.expresion.tipo ==  "id" || exp.expresion.tipo == "str" || exp.expresion.tipo == "decimal" || exp.expresion.tipo == "integer"){
                        var exp1 = Expresion(exp.expresion, ambitoValido, clase, metodoA,0, tipoVar);
                        if(exp1.tipo == "int" || exp1.tipo == "integer"){
                            var tmpSi = generarTemp();
                            var tmpT = generarTemp();
                            var tmpP = generarTemp();
                            var tmpR = generarTemp();
                            var cad = "";
                            cad += "var "+tmpSi+", "+tmpT+", "+tmpP+", "+tmpR+";\n";
                            cad += exp1.cadena+"\n";
                            cad += tmpSi +" = P + "+tamMetodo+";\n";
                            cad += tmpT +" = "+tmpSi+"+ 2;\n";
                            cad += "Stack["+tmpT+"] = "+exp1.anterior;
                            cad += "P = P + "+tamMetodo+";\n";
                            cad += "call casteo_int_cadena;\n";
                            cad += tmpP +" = P + 0;\n";
                            cad += tmpR +" = Stack["+tmpP+"];\n";  
                            cad += "P = P - "+tamMetodo+";\n";
                            
                            return {cadena:cad, anterior:tmpR, tipo:"string"};

                        }else if(exp1.tipo == "double" || exp1.tipo == "decimal"){
                            var tmpSi = generarTemp();
                            var tmpT = generarTemp();
                            var tmpP = generarTemp();
                            var tmpR = generarTemp();
                            var cad = "";
                            cad += "var "+tmpSi+", "+tmpT+", "+tmpP+", "+tmpR+";\n";
                            cad += exp1.cadena+"\n";
                            cad += tmpSi +" = P + "+tamMetodo+";\n";
                            cad += tmpT +" = "+tmpSi+"+ 2;\n";
                            cad += "Stack["+tmpT+"] = "+exp1.anterior+";\n";
                            cad += "P = P + "+tamMetodo+";\n";
                            cad += "call casteo_double_cadena;\n";
                            cad += tmpP +" = P + 0;\n";
                            cad += tmpR +" = Stack["+tmpP+"];\n";  
                            cad += "P = P - "+tamMetodo+";\n";
                            return {cadena:cad, anterior:tmpR, tipo:"string"};

                        }else if(exp1.tipo == "char" || exp1.tipo == "str"){
                            var tmpSi = generarTemp();
                            var tmpT = generarTemp();
                            var tmpP = generarTemp();
                            var tmpR = generarTemp();
                            var cad = "";
                            cad += "var "+tmpSi+", "+tmpT+", "+tmpP+", "+tmpR+";\n";
                            cad += exp1.cadena+"\n";
                            cad += tmpSi +" = P + "+tamMetodo+";\n";
                            cad += tmpT +" = "+tmpSi+"+ 2;\n";
                            cad += "Stack["+tmpT+"] = "+exp1.anterior+";\n";
                            cad += "P = P + "+tamMetodo+";\n";
                            cad += "call casteo_char_cadena;\n";
                            cad += tmpP +" = P + 0;\n";
                            cad += tmpR +" =    Stack["+tmpP+"];\n";  
                            cad += "P = P - "+tamMetodo+";\n";
                            return {cadena:cad, anterior:tmpR, tipo:"string"};
                        }
                        
                        
                        
                    }
                }else{
                    //error conversion incorrecta
                }

            case "casteoDouble":
                if(tipoVar == "double"){
                    var tamMetodo = 0;
                    var ts = simbolos;
                    for(var is in ts.simbolo){
                        if(ts.simbolo[is].nombre == metodoA && ts.simbolo[is].rol == "metodo"){
                             tamMetodo = ts.simbolo[is].tamano;
                             console.log("tamanio tuto metodo a concatenar: "+ tamMetodo);
                             break;
                        }
                    }

                    if(exp.expresion.tipo ==  "id"){
                        var exp1 = Expresion(exp.expresion, ambitoValido, clase, metodoA,0, tipoVar);
                        if(exp1.tipo == "string" || exp1.tipo == "String"){
                            var tmpSi = generarTemp();
                            var tmpT = generarTemp();
                            var tmpP = generarTemp();
                            var tmpR = generarTemp();
                            var cad = "";
                            cad += "var "+tmpSi+", "+tmpT+", "+tmpP+", "+tmpR+";\n";
                            cad += exp1.cadena+"\n";
                            cad += tmpSi +" = P + "+tamMetodo+";\n";
                            cad += tmpT +" = "+tmpSi+"+ 2;\n";
                            cad += "Stack["+tmpT+"] = "+exp1.anterior+";\n";
                            cad += "P = P + "+tamMetodo+";\n";
                            cad += "call casteo_cadena_int;\n"; 
                            cad += tmpP +" = P + 0;\n";
                            cad += tmpR +" = Stack["+tmpP+"];\n";  
                            cad += "P = P - "+tamMetodo+";\n";
                            return {cadena:cad, anterior:tmpR, tipo:"decimal"};
                        }
                    }

                }else{
                    //error tipo de casteo imposible
                }
            case "casteoInt":

            if(tipoVar == "int"){
                var tamMetodo = 0;
                var ts = simbolos;
                for(var is in ts.simbolo){
                    if(ts.simbolo[is].nombre == metodoA && ts.simbolo[is].rol == "metodo"){
                         tamMetodo = ts.simbolo[is].tamano;
                         console.log("tamanio tuto metodo a concatenar: "+ tamMetodo);
                         break;
                    }
                }

                if(exp.expresion.tipo ==  "id"){
                    var exp1 = Expresion(exp.expresion, ambitoValido, clase, metodoA,0, tipoVar);
                    if(exp1.tipo == "string" || exp1.tipo == "String"){
                        var tmpSi = generarTemp();
                        var tmpT = generarTemp();
                        var tmpP = generarTemp();
                        var tmpR = generarTemp();
                        var cad = "";
                        cad += "var "+tmpSi+", "+tmpT+", "+tmpP+", "+tmpR+";\n";
                        cad += exp1.cadena+"\n";
                        cad += tmpSi +" = P + "+tamMetodo+";\n";
                        cad += tmpT +" = "+tmpSi+"+ 2;\n";
                        cad += "Stack["+tmpT+"] = "+exp1.anterior;
                        cad += "P = P + "+tamMetodo+";\n";
                        cad += "call casteo_cadena_int;\n";
                        cad += tmpP +" = P + 0;\n";
                        cad += tmpR +" = Stack["+tmpP+"];\n";  
                        cad += "P = P - "+tamMetodo+";\n";
                        return {cadena:cad, anterior:tmpR, tipo:"integer"};
                    }
                }

            }else{
                //error tipo de casteo imposible
            }
            case "casteoChar":
            if(tipoVar == "char"){
                var tamMetodo = 0;
                var ts = simbolos;
                for(var is in ts.simbolo){
                    if(ts.simbolo[is].nombre == metodoA && ts.simbolo[is].rol == "metodo"){
                         tamMetodo = ts.simbolo[is].tamano;
                         console.log("tamanio tuto metodo a concatenar: "+ tamMetodo);
                         break;
                    }
                }

                if(exp.expresion.tipo ==  "id" || exp.expresion.tipo == "integer" || exp.expresion.tipo == "decimal" ){
                    var exp1 = Expresion(exp.expresion, ambitoValido, clase, metodoA,0, tipoVar);
                    if(exp1.tipo == "decimal" || exp1.tipo == "double"){
                        var tmpSi = generarTemp();
                        var tmpT = generarTemp();
                        var tmpP = generarTemp();
                        var tmpR = generarTemp();
                        var cad = "";
                        cad += "var "+tmpSi+", "+tmpT+", "+tmpP+", "+tmpR+";\n";
                        cad += exp1.cadena+"\n";
                        cad += tmpSi +" = P + "+tamMetodo+";\n";
                        cad += tmpT +" = "+tmpSi+"+ 2;\n";
                        cad += "Stack["+tmpT+"] = "+exp1.anterior;
                        cad += "P = P + "+tamMetodo+";\n";
                        cad += "call casteo_cadena_int;\n";
                        cad += tmpP +" = P + 0;\n";
                        cad += tmpR +" = Stack["+tmpP+"];\n";  
                        cad += "P = P - "+tamMetodo+";\n";
                        return {cadena:cad, anterior:tmpR, tipo:"str"};
                    
                    }else if(exp1.tipo == "int" || exp1.tipo == "integer"){
                        var tmpSi = generarTemp();
                        var tmpT = generarTemp();
                        var tmpP = generarTemp();
                        var tmpR = generarTemp();
                        var cad = "";
                        cad += "var "+tmpSi+", "+tmpT+", "+tmpP+", "+tmpR+";\n";
                        cad += exp1.cadena+"\n";
                        cad += tmpSi +" = P + "+tamMetodo+";\n";
                        cad += tmpT +" = "+tmpSi+"+ 2;\n";
                        cad += "Stack["+tmpT+"] = "+exp1.anterior;
                        cad += "P = P + "+tamMetodo+";\n";
                        cad += "call casteo_cadena_int;\n";
                        cad += tmpP +" = P + 0;\n";
                        cad += tmpR +" = Stack["+tmpP+"];\n";  
                        cad += "P = P - "+tamMetodo+";\n";
                        return {cadena:cad, anterior:tmpR, tipo:"str"};
                    }
                }

            }else{
                //error tipo de casteo imposible
            }

            case "potencia":

            case "accesoObjetos":
            var posObject = 0;
            var ts = simbolos;
            var existe = false;
            var tipoObjeto;
            var posVar = -1;
            var existeVar =false;
            var tipoVar = "";
            for(var is in ts.simbolo){
                if(ts.simbolo[is].nombre == exp.id1  & ts.simbolo[is].rol == "objeto"){
                     posObject = ts.simbolo[is].posicion;
                     tipoObjeto = ts.simbolo[is].tipo;
                     existe = true;
                     break;
                }
            }

            if(existe == true){
              
                for(var iss in ts.simbolo){
                    if(ts.simbolo[iss].nombre == exp.id2  & ts.simbolo[iss].ambito ==  tipoObjeto+"_Global" ){
                         posVar = ts.simbolo[iss].posicion;
                         tipoVar = ts.simbolo[iss].tipo;
                         existeVar = true;
                         break;
                    }
                }   
            }
             if(existeVar == true){
                 var cade = "//iniciando acceso \n";
                 var tmp1 = generarTemp();
                 var tmp2 = generarTemp();
                 var tmp3 = generarTemp();
                 var tmp4 = generarTemp();
                 var tmp5 = generarTemp();

                 cade += "var "+tmp1+", "+tmp2+", "+tmp3+", "+tmp4+", "+tmp5+";\n";
                 cade += tmp1+" = P + "+posObject+";\n";
                 cade += tmp2+" = Stack["+tmp1+"];\n";
                 cade += tmp3+" = "+posVar+";\n";
                 cade += tmp4+" = "+tmp2+" + "+tmp3+";\n";
                  cade += tmp5 +" = Heap["+tmp4+"];\n";
                 return {cadena:cade, anterior:tmp5, tipo:tipoVar };
             }  

             case "instanciaClasePar":
            case "objThis":
            console.log("Estamos en this\n");
            var sal =  ejecutarThis(exp, ambitoValido, clase, metodoA);
             return {cadena:sal, tipo:"", anterior:""};
    }*/
       
    }
}


function tipoResultado(tipoVar){
    var t = "";
    if(tipoVar.toString() === "int"){
        t = "integer";
    }else if(tipoVar.toString() === "String"){
        t = "string"
    }else if(tipoVar.toString() === "boolean"){
        t = "bool";
    }else if(tipoVar.toString() === "double"){
        t = "decimal";
    }
    return t;
}