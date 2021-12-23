class AccesoEdd{

    variable:Simbolo;
    lstIds:Array<Object>;
    tipoAcceso:String;
    

    constructor(simbolo:Simbolo, lstIds:Array<Object> , tipoAcceso:string){
        this.variable = simbolo;
        this.lstIds = lstIds;
        this.tipoAcceso = tipoAcceso;
    }


    ejecutarInstrucciones(resultadoParcial:Array<Objeto>, entorno:Entorno):any {
        let valorRetorno = null;
        let simbolo = entorno.getSimbolo(this.variable.identificador);
        
        if(simbolo!=null){
            if(this.lstIds.length == 1){
                let pos = 0;
                for(let s in simbolo.valor){
                    if(simbolo.valor[s].identificador == this.lstIds[0]){
                        valorRetorno = simbolo.valor[s].valor;   
                        return valorRetorno;
                    }
                    pos = pos+1;
                }
            }else{
                valorRetorno = recursivaObjAcceso(simbolo, this.lstIds, 0);
                return valorRetorno;
            }
            
        }else{
            console.log("No existe edd");
        }

        return valorRetorno;
    }


    function recursivaObjAcceso(obj:Object, lstIds:String, pos:Number) {
        let valorRetorno = null;
        if(obj instanceof Simbolo){
            for (let y in obj.valor) {
                if (obj.valor[y].identificador == lstIds[pos] && obj.valor[y].valor instanceof Simbolo) {
                    console.log("No existe acceso al id");
                    pos = pos+1;
                    valorRetorno = recursivaObjAcceso(obj.valor[y].valor, lstIds, pos);
                }else if(obj.valor[y].identificador == lstIds[pos]){
                    if(pos+1 == lstIds.length){
                        valorRetorno = obj.valor[y].valor;
                        break;
                    }
                }
            }
        }
        return valorRetorno;
    }


}