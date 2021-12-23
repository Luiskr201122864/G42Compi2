
function traduccionFuncionParametros(funcion, clase, ts, edd, pasada){
    if(pasada == "varGlobal"){
        var ambG = clase+"_"+"Global";
        var ambMetodo = [ambG];
        return traduccionBloqueGlobal(funcion.bloque, ambMetodo, clase, pasada);
    }else{
        console.log("TRADUCCION DE FUNCION CON PARAMETROS");
        var retorno = generarEtiq();
        var valorRetorno = { etiquetaReturn: retorno, mostrar:[] };
        var tipo = "";
        var rol = "funcion";
        var nombreFun = funcion.nombreFun;
        if(!(funcion.tipo == undefined)){        
            tipo = funcion.tipo;
            console.log("-> tipo Funcion: "+funcion.tipo);
        }
        var cadParametro = cadenaParametros(funcion);
        var ambitoNuevo = clase+"_"+nombreFun+cadParametro;
        var ambito = clase+"_Global";
        //nombreFun = nombreFun+cadenaParametros;
        var inicioTmp = numTemp;
        var existeFuncion = buscarFuncion(ambitoNuevo, ambito, "funcion", ts, inicioTmp);
        var cadena ="\n";
        funActual = ambitoNuevo;
        cadena += "##------- Inicia traduccion de funcion "+nombreFun+" \n";
            if(existeFuncion){
                var ambNue = ambitoNuevo;
                var existe = false; 
                for(var m in auxMetodo){
                    if(auxMetodo[m] == ambNue){
                        existe = true;
                    }
                }
                if(!existe){
                    cadena += "proc " +ambNue+" begin\n";
                    var ambG = clase+"_"+"Global";
                    var ambMetodo = [ambG, ambNue];
                    if(!(funcion.bloque == undefined)){                    
                        cadena += "  "+ traduccionBloque(funcion.bloque, ambMetodo, valorRetorno, 0, clase, ambNue);
                    }
                    cadena += retorno + ":\n";
                    cadena += "end\n";
                    auxMetodo.push(ambNue);
                }
            }
            cadena += "##-------- Finaliza traduccion funcion "+nombreFun+"\n";
        
        return cadena;
    }

}


function traduccionFuncionSinParametros(funcion, clase, ts, edd, pasada){
    if(pasada == "varGlobal"){
        var ambG = clase+"_"+"Global";
        var ambMetodo = [ambG];
        return traduccionBloqueGlobal(funcion.bloque, ambMetodo, clase, pasada);
    }else{
        console.log("TRADUCCION DE FUNCION SIN PARAMETROS");
        var retorno = generarEtiq();
        var valorRetorno = { etiquetaReturn: retorno, mostrar:[] };
        var tipo = "";
        var rol = "funcion";
        var nombreFun = funcion.nombreFun;
        if(!(funcion.tipo == undefined)){        
            tipo = funcion.tipo;
            console.log("-> tipo Funcion: "+funcion.tipo);
        }
        var ambitoNuevo = clase+"_"+nombreFun;
        nombreFun = nombreFun+cadenaParametros;
        var ambito = clase+"_Global";
        var existeFuncion = buscarFuncion(ambitoNuevo, ambito, "funcion", ts);
        var cadena ="\n";
        funActual = ambitoNuevo;
        cadena += "##------- Inicia traduccion de funcion sin parametro\n";
        if(existeFuncion){
        //metodo sin parametros
        var nuevoAmb = ambitoNuevo;
            var existe = false; 
            for(var m in auxMetodo){
                if(auxMetodo[m] == nuevoAmb){
                existe = true;
                }
            }
            if(!existe){
                var ambG = clase+"_"+"Global";
                var ambMetodo = [ambG, nuevoAmb];
                cadena += "proc "+nuevoAmb+" begin\n";
                if(!(funcion.bloque == undefined)){
                    cadena += "  "+ traduccionBloque(funcion.bloque, ambMetodo, valorRetorno,0, clase, nuevoAmb);
                }
                cadena += retorno+":\n";
                cadena += "end\n";
                auxMetodo.push(nuevoAmb);
            }
        }
        cadena += "##------- Finaliza traduccion de funcion sin parametros\n";
        return cadena;
    }
}