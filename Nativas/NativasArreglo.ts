class NativasArreglo{
   

    id:String;
    expresion:Object;
    tipoOpNat:String;

    constructor(id:String, expresion:Object , tipoOpNat:string){
        this.id = id;
        this.expresion = expresion;
        this.tipoOpNat = tipoOpNat;
    }


    ejecutarInstrucciones(resultadoParcial:Array<Objeto>, entorno:Entorno):any {

        let simbolo = entorno.getSimbolo(this.id);

        if(simbolo!=null){
            if(simbolo.tipoVar == 2 && (this.tipoOpNat =="asignacionObjCad" || this.tipoOpNat == "operacionCad")){
                if(this.expresion.nombre == "opCadPush"){
                    // PUSH
                    let operacion = recorridoOperaciones(this.expresion.exp, entorno);
                    let tipoOp = getTipoValor(operacion);
                    if(tipoOp == simbolo.tipo || tipoOp == "int" && simbolo.tipo == "double" || tipoOp == "double" && simbolo.tipo == "int"){
                        simbolo.valor.push(operacion);
                    }
                }else if(this.expresion.nombre == "opCadPop"){
                    // POP
                    let val = simbolo.valor.pop();
                    return val;
                }else if(this.expresion.nombre == "opCadLength"){
                    let val = simbolo.valor.length;
                    return val;
                }
            }else if(this.tipoOpNat == "operacionCad2"){
                
                if(simbolo.tipoVar == "String"){
                    this.expresion.forEach(item => {
                        if(item.nombre == "opCadSubString"){
                            let valorString = simbolo.valor;
                            let exp1 = recorridoOperaciones(item.exp1, entorno);
                            let exp2 = recorridoOperaciones(item.exp2, entorno);
                            let cadSubString = valorString.substring(exp1,exp2);
                            simbolo.valor = cadSubString;

                        }else if(item.nombre == "opCadUpper"){
                             simbolo.valor = simbolo.valor.toUpperCase();
                        }else if(item.nombre == "opCadLower"){
                            simbolo.valor = simbolo.valor.toLowerCase() ;
                        }else if(item.nombre == "opCadOfPosition"){
                            let exp1 = recorridoOperaciones(item.exp1, entorno);
                            simbolo.valor = simbolo.valor.indexOf(exp1);
                        }
                    });
                }

            }
        }
        
        return null;
    }

    



    



}