var NativasArreglo = /** @class */ (function () {
    function NativasArreglo(id, expresion, tipoOpNat) {
        this.id = id;
        this.expresion = expresion;
        this.tipoOpNat = tipoOpNat;
    }
    NativasArreglo.prototype.ejecutarInstrucciones = function (resultadoParcial, entorno) {
        var simbolo = entorno.getSimbolo(this.id);
        if (simbolo != null) {
            if (simbolo.tipoVar == 2 && (this.tipoOpNat == "asignacionObjCad" || this.tipoOpNat == "operacionCad")) {
                if (this.expresion.nombre == "opCadPush") {
                    // PUSH
                    var operacion = recorridoOperaciones(this.expresion.exp, entorno);
                    var tipoOp = getTipoValor(operacion);
                    if (tipoOp == simbolo.tipo || tipoOp == "int" && simbolo.tipo == "double" || tipoOp == "double" && simbolo.tipo == "int") {
                        simbolo.valor.push(operacion);
                    }
                }
                else if (this.expresion.nombre == "opCadPop") {
                    // POP
                    var val = simbolo.valor.pop();
                    return val;
                }
                else if (this.expresion.nombre == "opCadLength") {
                    var val = simbolo.valor.length;
                    return val;
                }
            }
            else if (this.tipoOpNat == "operacionCad2") {
                if (simbolo.tipoVar == "String") {
                    this.expresion.forEach(function (item) {
                        if (item.nombre == "opCadSubString") {
                            var valorString = simbolo.valor;
                            var exp1 = recorridoOperaciones(item.exp1, entorno);
                            var exp2 = recorridoOperaciones(item.exp2, entorno);
                            var cadSubString = valorString.substring(exp1, exp2);
                            simbolo.valor = cadSubString;
                        }
                        else if (item.nombre == "opCadUpper") {
                            simbolo.valor = simbolo.valor.toUpperCase();
                        }
                        else if (item.nombre == "opCadLower") {
                            simbolo.valor = simbolo.valor.toLowerCase();
                        }
                        else if (item.nombre == "opCadOfPosition") {
                            var exp1 = recorridoOperaciones(item.exp1, entorno);
                            simbolo.valor = simbolo.valor.indexOf(exp1);
                        }
                    });
                }
            }
        }
        return null;
    };
    return NativasArreglo;
}());
