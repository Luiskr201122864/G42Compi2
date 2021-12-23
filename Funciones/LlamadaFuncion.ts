class LlamadaFuncion{
   
    id:String;
    lstPar:Object;
    tipoFuncion:String;

    constructor(id:String, lstPar:Object, tipoFuncion:String ){
 
        this.id = id;
        this.lstPar = lstPar;
        this.tipoFuncion = tipoFuncion;
    }

    ejecutarInstrucciones(resultadoParcial:Array<Object>, entorno:Entorno):any {
        let funcionB = buscarFuncion(this.id);

        if(funcionB!=null){
            let entornoLocal = new Entorno(entorno);

            if(this.lstPar== null){
          
                let retorno = funcionB.ejecutarInstrucciones([], entornoLocal);
                if(retorno!=null){
                    return retorno;
                }
            }else{      
                let lstParArbol = recorridoArbol(funcionB.lstPar);
                let funcionValida = validarParametros(this.lstPar, lstParArbol, entornoLocal);
                if(funcionValida){
                    let retorno = funcionB.ejecutarInstrucciones([], entornoLocal);
                    if(retorno!=null){
                        return retorno;
                    }
                }
            }
        }else{
            console.log("No existe funcion");
        }
       
        return null;
    }



    function validarParametros(lstParametros:Object, lstParametrosFuncion:Object, entornoLocal:Entorno) {
        /**
         * ins.tipo, ins.id, ins.lstPar, ins.lstInst
         * 
         */
        if(lstParametros.length == lstParametrosFuncion.length){
            let entornoLocal2 = new Entorno(null);
            //Si es el mismo numero de parametros
            for(let x in lstParametros){
                let exp = lstParametros[x];
                let resultado = recorridoOperaciones(exp, entornoLocal);
                let tipoResultado = null;
                if(resultado instanceof Simbolo){
                    tipoResultado = resultado.tipo;
                    resultado = resultado.valor;
                }else{
                    tipoResultado = getTipoValor(resultado);
                }
                
                if(lstParametrosFuncion[x] instanceof DeclaracionVariable){
                    if(tipoResultado == lstParametrosFuncion[x].variable.tipo){
                        let v = lstParametrosFuncion[x];
                        v.ejecutarInstrucciones([],entornoLocal2);
                        let variableB = entornoLocal2.getSimbolo(v.variable.identificador);
                        variableB.valor = resultado;
                    }else{
                        console.log("No coinciden los tipos de parametros");
                        return false;
                    }
                }else if(lstParametrosFuncion[x] instanceof DeclaracionEdd){
                   // if(tipoResultado ==23242526 && lstParametrosFuncion[x].variable.tipo == "edd"){
                        let v = lstParametrosFuncion[x];
                        v.ejecutarInstrucciones([],entornoLocal2);
                        let variableB = entornoLocal2.getSimbolo(v.variable.identificador);
                        variableB.valor = resultado;
                   // }
                }else if(lstParametrosFuncion[x] instanceof DeclaracionArreglo2){

                }
                

            }

            /**
             * Aqui copio el entorno aux al entornolocal
             */
            for(let x in entornoLocal2.tabla){
                let item = entornoLocal2.tabla[x];
                let id = item.identificador.toLowerCase();
                item.identificador = item.identificador.toLowerCase();
                entornoLocal.tabla[id] = item;
            }

        }else{
            console.log("No coinciden el numero de parametros")
            return false;
        }
        return true;
    }


   
    



}