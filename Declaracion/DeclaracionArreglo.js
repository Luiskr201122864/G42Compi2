var DeclaracionArreglo = /** @class */ (function () {
    function DeclaracionArreglo(tipo, simbolo, expresion, tipoDeclaracionArr) {
        this.tipo = tipo;
        this.variable = simbolo;
        this.expresion = expresion;
        this.tipoDeclaracionArr = tipoDeclaracionArr;
    }
    DeclaracionArreglo.prototype.ejecutarInstrucciones = function (resultadoParcial, entorno) {
        var simbolo = entorno.getSimbolo(this.variable.identificador);
        if (this.expresion == null && simbolo == null) {
            this.variable.tipo = this.tipo;
            this.variable.valor = [];
            entorno.agregar(this.variable.identificador, this.variable);
        }
        else if (this.expresion instanceof Array && simbolo == null) {
            var lstExp = [];
            lstExp = lstExpresionFun(this.expresion, entorno);
            var guardar = lstExpTiposDec(lstExp, this.tipo);
            if (guardar) {
                this.variable.tipo = this.tipo;
                this.variable.valor = lstExp;
                entorno.agregar(this.variable.identificador, this.variable);
            }
        }
        return null;
    };
    return DeclaracionArreglo;
}());
function lstExpresionFun(exp, entorno) {
    var lstExp = [];
    for (var x in exp) {
        var item = exp[x];
        if (item instanceof Array) {
            //para arreglos dentro de arreglos
            var arr = lstExpresionFun(item[0], entorno);
            lstExp.push(arr);
        }
        else {
            var exp_1 = recorridoOperaciones(item, entorno);
            lstExp.push(exp_1);
        }
    }
    ;
    return lstExp;
}
function lstExpTiposDec(exp, tipo) {
    for (var x in exp) {
        var item = exp[x];
        if (item instanceof Array) {
            //para arreglos dentro de arreglos
            var arr2 = lstExpTiposDec(item, tipo);
            if (!arr2) {
                return false;
            }
        }
        else {
            var tipoArr = getTipoValor(item);
            if (tipoArr != tipo) {
                return false;
            }
        }
    }
    ;
    return true;
}
