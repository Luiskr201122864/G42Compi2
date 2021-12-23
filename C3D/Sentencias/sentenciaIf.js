function guardarSentenciaIf(actual, ambitoA, ts,edd, pasada){
    if(pasada ==  "varGlobal"){
        if(actual.nombre === "if_simple"){
            primeraPasadaGlobales(actual.sentIf.instrucciones, ts, "", ambitoA,  edd, pasada);
        }else if(actual.nombre === "if_else"){
            primeraPasadaGlobales(actual.senIf.instrucciones, ts, "", ambitoA,  edd, pasada);
            primeraPasadaGlobales(actual.else.instrucciones, ts, "", ambitoA,  edd, pasada);
        }else if(actual.nombre === "if_ifElse"){
            var actualNodo = actual;
            primeraPasadaGlobales(actualNodo.senIf.instrucciones, ts, "", ambitoA,  edd, pasada);
            for(var ei in actualNodo.senElseIf){
                var sen = actualNodo.senElseIf[ei];
                primeraPasadaGlobales(sen.instrucciones, ts, "", ambitoA,  edd, pasada);
            }
        }else if(actual.nombre === "if_extremo"){
            console.log("sentencia if -> if extremo");
            var actualN = actual;
            primeraPasadaGlobales(actualN.senIf.instrucciones, ts, "", ambitoA,  edd, pasada);
            for( var ei in actualN.senIfElse){
                var sen = actualN.senIfElse[ei];
                primeraPasadaGlobales(sen.instrucciones, ts, "", ambitoA,  edd, pasada);   
            }
            primeraPasadaGlobales(actualN.senElse.instrucciones, ts, "", ambitoA,  edd, pasada);        
        }
    }else{
    
        if(actual.nombre === "if_simple"){
            console.log("sentencia if -> if simple");
            tempSent.if++;
            var ambitoNuevo = ambitoA + "_if"+ tempSent.if;           
            crearTablaSimbolos(actual.sentIf.instrucciones, ts, ambitoNuevo,1,edd);
        
        }else if(actual.nombre === "if_else"){
            console.log("sentencia if -> if else-----------------------------------------------------------------------------");
            tempSent.if++;
            var nuevoAmbitoIf = ambitoA +"_if"+tempSent.if;
            console.log(nuevoAmbitoIf);
            crearTablaSimbolos(actual.senIf.instrucciones, ts, nuevoAmbitoIf,1,edd);
            tempSent.else++;
            var nuevoAmbitoElse = ambitoA+"_else"+tempSent.else;
            console.log(nuevoAmbitoElse);
            crearTablaSimbolos(actual.else.instrucciones, ts, nuevoAmbitoElse,1,edd);

        }else if(actual.nombre === "if_ifElse"){
            var actualNodo = actual;
            console.log("sentencia if -> if - if else");
            tempSent.if++;
            var nuevoAmbIf = ambitoA +"_if"+tempSent.if;
            console.log(nuevoAmbIf);
            crearTablaSimbolos(actualNodo.senIf.instrucciones, ts, nuevoAmbIf,0,edd);
            for(var ei in actualNodo.senElseIf){
                var sen = actualNodo.senElseIf[ei];
                tempSent.elseIf++;
                var nuevoAmbElse = ambitoA+"_elseIf"+ tempSent.elseIf;
                console.log(nuevoAmbElse);
                crearTablaSimbolos(sen.instrucciones, ts, nuevoAmbElse,0,edd);
            }
        }else if(actual.nombre === "if_extremo"){
            console.log("sentencia if -> if extremo");
            var actualN = actual;
            tempSent.if++;
            var nuevoAmbIf2 = ambitoA +"_if"+tempSent.if;
            console.log(nuevoAmbIf2);
            crearTablaSimbolos(actualN.senIf.instrucciones, ts, nuevoAmbIf2,0,edd);
            for( var ei in actualN.senIfElse){
                var sen = actualN.senIfElse[ei];
                tempSent.elseIf++;
                var nuevoAmbElse = ambitoA+"_elseIf"+ tempSent.elseIf;
                console.log(nuevoAmbElse);
                crearTablaSimbolos(sen.instrucciones, ts, nuevoAmbElse, 0,edd);   
            }
            tempSent.else++;
            var nAmbElse = ambitoA+"_else"+tempSent.else;
            console.log(nAmbElse);
            crearTablaSimbolos(actualN.senElse.instrucciones, ts, nAmbElse, 0,edd);        
        }
    }
}


function traduccionSentenciaIf(senIf, ambValidos, valRetorno, tipo , clase, metodoA, pasada){
    if(pasada ==  "varGlobal"){
        var cadSenIf = "  "+"\n\n";
        if(senIf.nombre == "if_simple"){
            console.log("TRADUCCION SENTECIA IF SIMPLE - global");
            cadSenIf += "  "+  traduccionBloqueGlobal(senIf.sentIf.instrucciones, ambValidos, clase, pasada);
            return cadSenIf + "\n";
        }
        if(senIf.nombre == "if_else"){
            console.log("TRADUCCION SENTECIA IF ELSE - global");
            cadSenIf += "  "+  traduccionBloqueGlobal(senIf.senIf.instrucciones, ambValidos, clase, pasada);
            cadSenIf += "  "+  traduccionBloqueGlobal(senIf.else.instrucciones, ambValidos, clase, pasada);
            return cadSenIf + "\n";
        }
        if(senIf.nombre == "if_ifElse"){
            console.log("TRADUCCION SENTECIA IF IF_ELSE - global");
                cadSenIf += "  "+  traduccionBloqueGlobal(senIf.senIf.instrucciones, ambValidos, clase, pasada);
            for(ei in senIf.senElseIf){
                var sen = senIf.senElseIf[ei];
                cadSenIf += "  "+  traduccionBloqueGlobal(sen.instrucciones, ambValidos, clase, pasada);
            }
            return cadSenIf + "\n";
        }

        if(senIf.nombre == "if_extremo" ){
            console.log("TRADUCCION SENTECIA IF EXTREMO - global");
            cadSenIf += "  "+  traduccionBloqueGlobal(senIf.senIf.instrucciones, ambValidos, clase, pasada);
            for(ei in senIf.senIfElse){
                var sen = senIf.senIfElse[ei];
                cadSenIf += "  "+  traduccionBloqueGlobal(sen.instrucciones, ambValidos, clase, pasada);
            }
            cadSenIf += "  "+  traduccionBloqueGlobal(senIf.senElse.instrucciones, ambValidos, clase, pasada);
            return cadSenIf +"\n";

        }

    }else{
        var etqSalida ="";
        var cadSenIf = "  "+"\n\n";
        if(senIf.nombre == "if_simple"){       
            console.log("TRADUCCION SENTECIA IF SIMPLE");
            console.log(senIf.sentIf.expresion);
            var exp = Expresion(senIf.sentIf.expresion, ambValidos, clase, metodoA, "");
            cadSenIf += "  "+ "##---- Inicia sentencia If simple\n";
            cadSenIf += "  "+ exp.cadenaBool;
            cadSenIf += "  "+ exp.etqVer+ ":\n";
            tempAux.if++;
            var im = ambValidos.length -1;
            var newAmbIf = ambValidos[im] + "_if"+  tempAux.if;
            ambValidos.push(newAmbIf);
            cadSenIf += "  "+ traduccionBloque(senIf.sentIf.instrucciones, ambValidos, valRetorno, 1, clase, metodoA);
            ambValidos.pop();
            etqSalida = generarEtiq();
            cadSenIf += "  "+ "goto "+ etqSalida + ";\n";
            cadSenIf += "  "+ exp.etqFal + ": \n";
            cadSenIf += "  "+ etqSalida+":\n";
            cadSenIf += "##------ Finaliza sentencia If simple\n";
            return cadSenIf + "\n";
        }

        if(senIf.nombre == "if_else"){
            console.log("TRADUCCION SENTECIA IF ELSE");
            var exp = Expresion(senIf.senIf.expresion, ambValidos, clase, metodoA,"");
            
                cadSenIf += "  "+ "##----- Inicia sentencia If else\n";
                cadSenIf += "  "+ exp.cadenaBool;
                cadSenIf += "  "+ exp.etqVer+ ":\n";
                tempAux.if++;
                etqSalida = generarEtiq();
                var imm = ambValidos.length -1;
                var newAmbIf = ambValidos[imm] + "_if"+  tempAux.if;
                ambValidos.push(newAmbIf);
                cadSenIf += "  "+ traduccionBloque(senIf.senIf.instrucciones, ambValidos, valRetorno, 1, clase, metodoA);
                ambValidos.pop();
                cadSenIf += "  "+ "goto "+ etqSalida + ";\n";
                cadSenIf += "  "+ exp.etqFal + ": \n";
                //Agregando else
                tempAux.else++;
                var is = ambValidos.length -1;
                var nuevoAmbitoElse = ambValidos[is]+"_else"+tempAux.else;
                ambValidos.push(nuevoAmbitoElse);
                cadSenIf += "  "+traduccionBloque(senIf.else.instrucciones, ambValidos, valRetorno, 1, clase, metodoA);
                ambValidos.pop();
                cadSenIf += etqSalida + ":\n";
                cadSenIf += "##------ Finalizacion sentencia If else\n";
                return cadSenIf + "\n";
            
        }


        if(senIf.nombre == "if_ifElse"){
            console.log("TRADUCCION SENTECIA IF IF_ELSE");
            var exp = Expresion(senIf.senIf.expresion, ambValidos, clase, metodoA,"");
            etqSalida = generarEtiq();
            
                cadSenIf += "  "+ "##----- Inicia sentencia If anidado \n";
                cadSenIf += "  "+ exp.cadenaBool;
                cadSenIf += "  "+ exp.etqVer+ ":\n";
                tempAux.if++;
                var i = ambValidos.length -1;
                var newAmbIf = ambValidos[i] + "_if"+  tempAux.if;
                ambValidos.push(newAmbIf);
                cadSenIf += "  "+ traduccionBloque(senIf.senIf.instrucciones, ambValidos, valRetorno, 1, clase, metodoA);
                ambValidos.pop();
                cadSenIf += "  "+ "goto "+ etqSalida + ";\n";
                cadSenIf += "  "+ exp.etqFal + ": \n";
            
            
            for(ei in senIf.senElseIf){
                    var sen = senIf.senElseIf[ei];
                    var exp = Expresion(sen.expresion, ambValidos, clase, metodoA,"");
                            
                    cadSenIf += "  "+ exp.cadenaBool;
                    cadSenIf += "  "+ exp.etqVer+ ":\n";
                    //cadSenIf += "  "+ "##---- Intrucciones else If \n";
                    tempAux.elseIf++;                
                    var i = ambValidos.length -1;
                    var newAmbIf = ambValidos[i] + "_elseIf"+  tempAux.elseIf;
                    ambValidos.push(newAmbIf);
                    cadSenIf += "  "+ traduccionBloque(sen.instrucciones, ambValidos, valRetorno, 1, clase, metodoA);
                    valRetorno.mostrar.pop();
                    cadSenIf += "  "+ "goto "+ etqSalida + ";\n";
                    cadSenIf += "  "+ exp.etqFal + ": \n";
                    
                
            }
            cadSenIf += " "+etqSalida+":\n";
            cadSenIf += "##------ Finaliza Sentencia If anidado\n";
            return cadSenIf + "\n";
        }

        if(senIf.nombre == "if_extremo" ){
            console.log("TRADUCCION SENTECIA IF EXTREMO");
            etqSalida = generarEtiq();
            var exp = Expresion(senIf.senIf.expresion, ambValidos, clase, metodoA,"");
            
                cadSenIf += "  "+ "##------ Inicia If extremo\n";
                cadSenIf += "  "+ exp.cadenaBool;
                cadSenIf += "  "+ exp.etqVer+ ":\n";
                tempAux.if++;
                var i = ambValidos.length -1;
                var newAmbIf = ambValidos[i] + "_if"+  tempAux.if;
                ambValidos.push(newAmbIf);
                cadSenIf += "  "+ traduccionBloque(senIf.senIf.instrucciones, ambValidos, valRetorno, 1, clase, metodoA);
                ambValidos.pop();
                cadSenIf += "  "+ "goto "+ etqSalida + ";\n";
                cadSenIf += "  "+ exp.etqFal + ": \n";
            
            
            for(ei in senIf.senIfElse){
                    var sen = senIf.senIfElse[ei];
                    var exp = Expresion(sen.expresion, ambValidos, clase, metodoA,"");
                        
                        cadSenIf += "  "+ "##----- estoy en else if \n";
                    cadSenIf += "  "+ exp.cadenaBool;
                    cadSenIf += "  "+ exp.etqVer+ ":\n";
                    tempAux.elseIf++;                
                    var i = ambValidos.length -1;
                    var newAmbIf = ambValidos[i] + "_elseIf"+  tempAux.elseIf;
                    ambValidos.push(newAmbIf);
                    cadSenIf += "  "+ traduccionBloque(sen.instrucciones, ambValidos, valRetorno, 1, clase, metodoA);
                    ambValidos.pop();
                    cadSenIf += "  "+ "goto "+ etqSalida + ";\n";
                    cadSenIf += "  "+ exp.etqFal + ": \n";
                    
                
            }

            //Agregando else
            tempAux.else++;
            var is = ambValidos.length -1;
            var nuevoAmbitoElse = ambValidos[is]+"_else"+tempAux.else;
            ambValidos.push(nuevoAmbitoElse);
            //cadSenIf += "##----- estoy en el else \n";
            cadSenIf += "  "+ traduccionBloque(senIf.senElse.instrucciones, ambValidos, valRetorno, 1, clase, metodoA);
            ambValidos.pop();
            cadSenIf += etqSalida + ":\n";
            cadSenIf += "##------ Finaliza Sentencia If extremo\n";
            return cadSenIf +"\n";

        }

        return cadSenIf +"\n";
    }
}