class sentenciaIf{
   
    ifSimple:auxSentenciaIf;
    lstElseIf:Array<Object>;
    isElse:auxSentenciaIf;

    constructor(ifSimple:auxSentenciaIf, lstElseIf:Array<Object>, isElse:auxSentenciaIf){
        this.ifSimple = ifSimple;
        this.lstElseIf = lstElseIf;
        this.isElse = isElse;
    }


    ejecutarInstrucciones(resultadoParcial:Array<Objeto>, entorno:Entorno):any {
        let entraElse = true;
        let condicion = recorridoOperaciones(this.ifSimple.condicion, entorno);
        if(condicion){
            let entornoLocal = new Entorno(entorno);
            let instrucciones = recorridoArbol(this.ifSimple.lstInstrucciones.instruccion);
            let retorno = ejecucionArbol(instrucciones, entornoLocal);
            entraElse = false;
            if(retorno!=null){
                return retorno;
            }
        }else if(this.lstElseIf.length!=0){
            //tenemos una lista de else if
            for(let x in this.lstElseIf){
                let senElseIf = this.lstElseIf[x];
                let condicion = recorridoOperaciones(senElseIf.condicion, entorno);
                if(condicion){
                    let entornoLocal = new Entorno(entorno);
                    let instrucciones = recorridoArbol(senElseIf.lstInstrucciones.instruccion);
                    let retorno = ejecucionArbol(instrucciones, entornoLocal);
                    entraElse = false;
                    if(retorno!=null){
                        return retorno;
                    }
                }
            }
        }
        if(this.isElse!=null && entraElse){
            let entornoLocal = new Entorno(entorno);

            let instrucciones = null;
            if(this.isElse.hasOwnProperty('lstInstrucciones')){
                instrucciones = recorridoArbol(this.isElse.lstInstrucciones.instruccion);
            }else{
                instrucciones = recorridoArbol(this.isElse.instruccion);
            }
            
            let retorno = ejecucionArbol(instrucciones, entornoLocal);
            entraElse = false;
            if(retorno!=null){
                return retorno;
            }
        }


        return null;
    }
}