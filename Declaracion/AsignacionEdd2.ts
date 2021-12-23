
class AsignacionEdd2{

    variable:Simbolo;
    lstIds:Array<Object>;
    tipoAsignacion:String;
    exp:Object;

    constructor(simbolo:Simbolo, lstIds:Array<Object> , exp:Object, tipoDeclaracion:string){
        this.variable = simbolo;
        this.exp = exp;
        this.lstIds = lstIds;
        this.tipoDeclaracion = tipoDeclaracion;
    }


    ejecutarInstrucciones(resultadoParcial:Array<Objeto>, entorno:Entorno):any {

       
        let simbolo = entorno.getSimbolo(this.variable.identificador);

        if(simbolo!=null){
            let resultado = recorridoOperaciones(this.exp, entorno);
            let tipoExp = getTipoValor(resultado);
            if(this.lstIds.length == 1){
                let pos = 0;
                simbolo.valor.forEach(item => {
                   // if(item.identificador == this.lstIds[0] && tipoExp == item.tipo){
                       if(resultado instanceof Simbolo){
                           resultado = resultado.valor;
                       }
                        item.valor = resultado;
                        simbolo.valor[pos] = item;    
                    //}
                    pos = pos+1;
                });
            }else{
                recursivaObj(simbolo, this.lstIds, 0, resultado, tipoExp);
            }
            
        }else{
            console.log("No existe edd");
        }

        return null;
    }


    function recursivaObj(obj:Object, lstIds:String, pos:Number, val:Object, tipoOp:String) {

        if(obj instanceof Simbolo){
            for (var y in obj.valor) {
                if (obj.valor[y].identificador == lstIds[pos] && obj.valor[y].valor instanceof Simbolo) {
                    console.log("No existe acceso al id");
                    pos = pos+1;
                    recursivaObj(obj.valor[y].valor, lstIds, pos, val, tipoOp);
                }else if(obj.valor[y].identificador == lstIds[pos]){
                    if(pos+1 == lstIds.length){
                        if(obj.valor[y].tipo == tipoOp){
                            obj.valor[y].valor = val;
                            break;
                        }
                    }
                }
            }
        }
        return null;
    }


}