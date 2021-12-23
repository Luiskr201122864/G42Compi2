class AsignacionArreglo{
   

    variable:Simbolo;
    posicion:Object;
    expresion:Object;
    tipoDeclaracionArr:String;

    constructor(simbolo:Simbolo, posicion:Object, expresion:Object , tipoDeclaracionArr:string){
        this.variable = simbolo;
        this.posicion = posicion;
        this.expresion = expresion;
        this.tipoDeclaracionArr = tipoDeclaracionArr;
    }


    ejecutarInstrucciones(resultadoParcial:Array<Objeto>, entorno:Entorno):any {

        let simbolo = entorno.getSimbolo(this.variable.identificador);

        if(this.tipoDeclaracionArr == "asignacionArr"){
            if(this.expresion == null && simbolo!=null){
                simbolo.tipo = simbolo.tipo;
                simbolo.valor = [];
                simbolo.tipoVar = 2;
            }else if(this.expresion instanceof Array && simbolo != null){
                let lstExp = [];
                let lstTipoExp = [];
                
                lstExp = lstExpresionFunAsig(this.expresion, entorno);
                let guardar = lstExpTiposAsig(lstTipoExp, simbolo.tipo);
                
                if(guardar){
                    simbolo.tipo = simbolo.tipo;
                    simbolo.valor = lstExp;
                    simbolo.tipoVar = 2;
                }
    
            }
        }else if(this.tipoDeclaracionArr == "asignacionArr2"){

            let pos = recorridoOperaciones(this.posicion, entorno);
            let exp = recorridoOperaciones(this.expresion, entorno);
            if(simbolo!= null && simbolo.tipoVar == 2){
                for(let x in simbolo.valor){
                    if(x == pos){
                        simbolo.valor[pos] = exp;
                    }
                }
            }

        }
        
        return null;
    }

    function lstExpresionFunAsig(exp:Object, entorno) {
        let lstExp = [];
        exp.forEach(item=>{
            if(item instanceof Array){
                //para arreglos dentro de arreglos
                let arr = lstExpresionFunAsig(item[0], entorno);
                lstExp.push(arr);
            }else{
                let exp = recorridoOperaciones(item, entorno);
                lstExp.push(exp);
            }
         });
        return lstExp; 
    }


    function lstExpTiposAsig(exp:Object, tipo:String) {
        for(let x in exp){
            let item = exp[x];
            if(item instanceof Array){
                //para arreglos dentro de arreglos
                let arr2 = lstExpTiposAsig(item, tipo);
                if(!arr2){
                    return false;
                }
            }else{
                let tipoArr = getTipoValor(item);
                if(tipoArr != tipo){
                    return false;
                }
            }
         };
        return true; 
    }



}