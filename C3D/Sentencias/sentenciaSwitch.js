function guardarSwitch(actual, ambitoA, ts, edd, pasada){
    if(pasada == "varGlobal"){
        for(sw in actual.cuerpoSwitch.blockG){
            var tCaso = actual.cuerpoSwitch.blockG[sw];
                for(cas in tCaso.tipoCaso){
                    var n = tCaso.tipoCaso[cas];
                    if(n.nombre.toLowerCase() === "case"){
                        console.log("case");
                        primeraPasadaGlobales(tCaso.instrucciones, ts, "", ambitoA,  edd, pasada);
                    }
                    if(actual.cuerpoSwitch.label.nombre == "defaultExp"){
                        console.log("default");
                        primeraPasadaGlobales(actual.cuerpoSwitch.label.instrucciones, ts, "", ambitoA,  edd, pasada);
                    }
                }
            }
    }else{
        console.log("sentencia switch");
        tempSent.switch++;
        var newAmbito = ambitoA+"_switch"+tempSent.switch;
        console.log(newAmbito);
        for(sw in actual.cuerpoSwitch.blockG){
        var tCaso = actual.cuerpoSwitch.blockG[sw];
            for(cas in tCaso.tipoCaso){
                var n = tCaso.tipoCaso[cas];
                if(n.nombre.toLowerCase() === "case"){
                    console.log("case");
                    crearTablaSimbolos(tCaso.instrucciones, ts, newAmbito,"", edd);
                }
                if(actual.cuerpoSwitch.label.nombre == "defaultExp"){
                    console.log("default");
                    crearTablaSimbolos(actual.cuerpoSwitch.label.instrucciones, ts, newAmbito,"", edd);
                }

            }
        }
    }    
}


function traduccionSwitch(senSw, ambito, valRetorno, clase, metodoA, pasada){

    if(pasada ==  "varGlobal"){
        var cadena = "";
        for(var a in senSw.cuerpoSwitch.blockG){
            var caso = senSw.cuerpoSwitch.blockG[a];
            cadena +=  traduccionBloqueGlobal(caso.instrucciones, ambito, clase, pasada,"");
        }
        if(senSw.cuerpoSwitch.label.nombre == "defaultExp"){
            cadena +=  traduccionBloqueGlobal(senSw.cuerpoSwitch.label.instrucciones, ambito, clase, pasada,"");
         }
        return cadena;
    }else{
        var exp = Expresion(senSw.expresion, ambito, clase, metodoA,"");
        var tmp = generarTemp();
        var cadenaSwitch = "";
        var etqSalida = generarEtiq();
        var cadenaComparacion = "";
        var cadenaInstruccion = "";

        cadenaSwitch += "##------ inicia sentencia switch\n";
        tempAux.switch++;
        var indice = ambito.length -1;
        var newAmb = ambito[indice] + "_switch"+tempAux.switch;
        ambito.push(newAmb);
        var display = {ciclo:"switch", id:"-", etiqueta:etqSalida, etiquetaInicio:etqSalida };
        valRetorno.mostrar.push(display);
        cadenaSwitch += exp.cadena;
        for(var a in senSw.cuerpoSwitch.blockG){
            var caso = senSw.cuerpoSwitch.blockG[a];
            var casito = caso.tipoCaso[0];
            var exp2 = Expresion(caso.tipoCaso[0].expresion,ambito, clase, metodoA,"");
            var tc = generarEtiq();
            var tf = generarEtiq(); 
            if(casito.nombre == "case"){
                cadenaSwitch += exp2.cadena;
                cadenaComparacion += "if( "+ exp.anterior + "=="+ exp2.anterior +") goto "+ tc+";\n";
                cadenaComparacion += "goto "+tf+";\n";
                //cadenaComparacion +=  tc +":\n";              
            }
            cadenaComparacion += tc +":\n";
            cadenaComparacion += traduccionBloque(caso.instrucciones, ambito, valRetorno, 1, clase, metodoA); 
            cadenaComparacion += tf +":\n";
        }
        if(senSw.cuerpoSwitch.label.nombre == "defaultExp"){
        var etqd = generarEtiq();
            var instru = traduccionBloque(senSw.cuerpoSwitch.label.instrucciones, ambito, valRetorno, 1, clase, metodoA);
            cadenaSwitch += cadenaComparacion;
            cadenaSwitch += "##----- salto al default\n";
            cadenaSwitch += "goto " + etqd + ";\n";
            cadenaSwitch += cadenaInstruccion;
            cadenaSwitch += etqd +":\n"+ instru +"\n"
            cadenaSwitch += etqSalida +":\n"  ;
         }
        valRetorno.mostrar.pop();
        ambito.pop();
        cadenaSwitch += "##------ Finaliza sentencia switch\n";
    return cadenaSwitch;
    }
}