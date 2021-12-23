var AsignacionArreglo = /** @class */ (function () {
    function AsignacionArreglo(simbolo, posicion, expresion, tipoDeclaracionArr) {
        this.variable = simbolo;
        this.posicion = posicion;
        this.expresion = expresion;
        this.tipoDeclaracionArr = tipoDeclaracionArr;
    }
    AsignacionArreglo.prototype.ejecutarInstrucciones = function (resultadoParcial, entorno) {
        var simbolo = entorno.getSimbolo(this.variable.identificador);
        if (this.tipoDeclaracionArr == "asignacionArr") {
            if (this.expresion == null && simbolo != null) {
                simbolo.tipo = simbolo.tipo;
                simbolo.valor = [];
                simbolo.tipoVar = 2;
            }
            else if (this.expresion instanceof Array && simbolo != null) {
                var lstExp = [];
                var lstTipoExp = [];
                lstExp = lstExpresionFunAsig(this.expresion, entorno);
                var guardar = lstExpTiposAsig(lstTipoExp, simbolo.tipo);
                if (guardar) {
                    simbolo.tipo = simbolo.tipo;
                    simbolo.valor = lstExp;
                    simbolo.tipoVar = 2;
                }
            }
        }
        else if (this.tipoDeclaracionArr == "asignacionArr2") {
            var pos = recorridoOperaciones(this.posicion, entorno);
            var exp = recorridoOperaciones(this.expresion, entorno);
            if (simbolo != null && simbolo.tipoVar == 2) {
                for (var x in simbolo.valor) {
                    if (x == pos) {
                        simbolo.valor[pos] = exp;
                    }
                }
            }
        }
        return null;
    };
    return AsignacionArreglo;
}());
function lstExpresionFunAsig(exp, entorno) {
    var lstExp = [];
    exp.forEach(function (item) {
        if (item instanceof Array) {
            //para arreglos dentro de arreglos
            var arr = lstExpresionFunAsig(item[0], entorno);
            lstExp.push(arr);
        }
        else {
            var exp_1 = recorridoOperaciones(item, entorno);
            lstExp.push(exp_1);
        }
    });
    return lstExp;
}
function lstExpTiposAsig(exp, tipo) {
    for (var x in exp) {
        var item = exp[x];
        if (item instanceof Array) {
            //para arreglos dentro de arreglos
            var arr2 = lstExpTiposAsig(item, tipo);
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
