class DeclaracionArreglo{
   
    tipo:String;
    variable:Simbolo;
    expresion:Object;
    tipoDeclaracionArr:String;

    constructor(tipo:String, simbolo:Simbolo, expresion:Object , tipoDeclaracionArr:string){
        this.tipo = tipo;
        this.variable = simbolo;
        this.expresion = expresion;
        this.tipoDeclaracionArr = tipoDeclaracionArr;
    }


    ejecutarInstrucciones(resultadoParcial:Array<Objeto>, entorno:Entorno):any {

        let simbolo = entorno.getSimbolo(this.variable.identificador);
        if(this.expresion == null && simbolo == null){
            this.variable.tipo = this.tipo;
            this.variable.valor = [];
            entorno.agregar(this.variable.identificador, this.variable);
        }else  if(this.expresion instanceof Array && simbolo == null){
            let lstExp = [];
            
            lstExp = lstExpresionFun(this.expresion, entorno);
            let guardar = lstExpTiposDec(lstExp, this.tipo);
            
            if(guardar){
                this.variable.tipo = this.tipo;
                this.variable.valor = lstExp;
                entorno.agregar(this.variable.identificador, this.variable);
            }

        }

        return null;
    }

    function lstExpresionFun(exp:Object, entorno) {
        let lstExp = [];
        for(let x in exp){
            let item = exp[x];
            if(item instanceof Array){
                //para arreglos dentro de arreglos
                let arr = lstExpresionFun(item[0], entorno);
                lstExp.push(arr);
            }else{
                let exp = recorridoOperaciones(item, entorno);
                lstExp.push(exp);
            }
         };
        return lstExp; 
    }


    function  lstExpTiposDec(exp:Object, tipo:String) {
        for(let x in exp){
            let item = exp[x];
            if(item instanceof Array){
                //para arreglos dentro de arreglos
                let arr2 = lstExpTiposDec(item, tipo);
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