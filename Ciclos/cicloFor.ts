class cicloFor{
   
    decla:Object;
    expresion:Object;
    expresion2:Object;
    lstInstrucciones:Array<Object>;
    tipoFor:Number;

    constructor(decla:Object, expresion:Object, expresion2:Expresion , lstInstrucciones:Array<Object>, tipoFor:Number){
        this.decla = decla;
        this.expresion = expresion;
        this.expresion2 = expresion2;
        this.lstInstrucciones = lstInstrucciones;
        this.tipoFor = tipoFor;
    }


    ejecutarInstrucciones(resultadoParcial:Array<Objeto>, entorno:Entorno):any {

        if(this.tipoFor == 1){
            let lstDec = [];
            lstDec.push(this.decla);
            let dec = recorridoArbol(lstDec, entorno);
            lstDec = [];
            lstDec.push(dec);
            ejecucionArbol(lstDec[0], entorno);
            while(recorridoOperaciones(this.expresion, entorno)){
                
                
                let entornoLocal = new Entorno(entorno);

                let instrucciones = recorridoArbol(this.lstInstrucciones.instruccion, entornoLocal);
                let resultado = ejecucionArbol(instrucciones, entornoLocal);

                if(resultado!=null){
                    return resultado;
                }

                recorridoOperaciones(this.expresion2, entorno);
            }

        }else if(this.tipoFor == 0){
            let arr = [];
            if(this.expresion2 instanceof Array){
                
                let op = recorridoOperaciones(this.expresion2[0][0], entorno);
                let tipo = getTipoValor(op);
                if(this.expresion.tipo == "id"){
                    let declaracion = new DeclaracionVariable(new Simbolo(tipo, this.expresion.valor,0,0, null, 0), this.expresion2[0][0], "declaracion");
                    declaracion.ejecutarInstrucciones([], entorno);

                    for(let x = 0; x <= this.expresion2.length; x++){
                        let asignacion = new AsignacionVariable(new Simbolo(null, this.expresion.valor,0,0, null, 0), this.expresion2[0][x], "asignacion")
                        asignacion.ejecutarInstrucciones([], entorno);
                        let simbolo = entorno.getSimbolo(this.expresion.valor);
                        if(simbolo.tipo == "int"){
                            simbolo.valor = simbolo.valor -1;
                            let lst = recorridoArbol(this.lstInstrucciones.instruccion, entorno);
                            let res = ejecucionArbol(lst, entorno);
                            if(res!=null){
                                return res;
                            }
                        }

                    }

                }
                
                



            }
        }
        
        
        return null;
    }
}