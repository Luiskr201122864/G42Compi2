var cicloDoWhile = /** @class */ (function () {
    function cicloDoWhile(expresion, lstInstrucciones) {
        this.condicion = expresion;
        this.lstInstrucciones = lstInstrucciones;
    }
    cicloDoWhile.prototype.ejecutarInstrucciones = function (resultadoParcial, entorno) {
        do {
            var entornoLocal = new Entorno(entorno);
            var lstInstrucciones2 = recorridoArbol(this.lstInstrucciones, entornoLocal);
            var resultado = ejecucionArbol(lstInstrucciones2, entornoLocal);
            if (resultado != null) {
                return resultado;
            }
        } while (this.retornarBooleano(this.condicion, entorno));
        return null;
    };
    cicloDoWhile.prototype.retornarBooleano = function (expresion, entorno) {
        var resultado = recorridoOperaciones(expresion, entorno);
        return resultado;
    };
    return cicloDoWhile;
}());
