var ternario = /** @class */ (function () {
    function ternario(condicion, exp1, exp2) {
        this.condicion = condicion;
        this.exp1 = exp1;
        this.exp2 = exp2;
    }
    ternario.prototype.ejecutarInstrucciones = function (resultadoParcial, entorno) {
        var valor = recorridoOperaciones(this.condicion, entorno);
        if (valor) {
            var val1 = recorridoOperaciones(this.exp1, entorno);
            return val1;
        }
        else {
            var val2 = recorridoOperaciones(this.exp2, entorno);
            return val2;
        }
        return null;
    };
    return ternario;
}());
