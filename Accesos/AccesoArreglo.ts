class AccesoArreglo{
   
    id:String;
    expresion:Object;
    expresion2:Object;
    tipoDeclaracionArr:String;

    constructor(id:String, expresion:Object , expresion2:Object, tipoDeclaracionArr:string){
        this.id = id;
        this.expresion = expresion;
        this.expresion2 = expresion2;
        this.tipoDeclaracionArr = tipoDeclaracionArr;
    }


    ejecutarInstrucciones(resultadoParcial:Array<Object>, entorno:Entorno):any {
        var valorRetorno = null;
        var simbolo = entorno.getSimbolo(this.id);
        var op = recorridoOperaciones(this.expresion, entorno);
        if(this.tipoDeclaracionArr == "accesoArr2"){
            if (simbolo != null && simbolo.tipoVar == 2) {
                if (Number.isInteger(op)) {
                    for (var x in simbolo.valor) {
                        if (x == op) {
                            valorRetorno = simbolo.valor[x];
                            break;
                        }
                    }
                }else if(op instanceof Simbolo){
                    if(op.tipo == "int"){
                        for (var x in simbolo.valor) {
                            if (x == op.valor) {
                                valorRetorno = simbolo.valor[x];
                                break;
                            }
                        }
                    }
                }
            }
        }else if(this.tipoDeclaracionArr == "accesoArr"){
            var op2 = recorridoOperaciones(this.expresion2, entorno);
            if (simbolo != null && simbolo.tipoVar == 2) {
                let tipoOp1 = null;
                let tipoOp2 = null;
                if (Number.isInteger(op)) {
                    if(op == 13131313){
                        tipoOp1 = 0;
                    }else{
                        tipoOp1 = op;
                    }
                }
                if (Number.isInteger(op2)) {
                    if(op == 13131314){
                        tipoOp2 = simbolo.valor.length;
                    }else{
                        tipoOp2 = op2;
                    }
                }
                if (op instanceof Simbolo) {
                    if (op.tipo == "int") {
                        tipoOp1 = op.valor;
                    }
                }
                if (op2 instanceof Simbolo) {
                    if (op2.tipo == "int") {
                        tipoOp2 = op2.valor;
                    }
                }
                if (Number.isInteger(tipoOp1) && Number.isInteger(tipoOp2)) {
                    var arreglo = [];
                    for (var x in simbolo.valor) {
                        if (x >= tipoOp1 && x <= tipoOp2) {
                            arreglo.push(simbolo.valor[x]);
                        }
                    }
                    return arreglo;
                }
            }
        }

        return valorRetorno;
    }
}