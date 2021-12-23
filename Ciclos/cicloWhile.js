var cicloWhile = /** @class */ (function () {
    function cicloWhile(expresion, lstInstrucciones) {
        //this.simbolo = this.simbolo;
        this.condicion = expresion;
        this.lstInstrucciones = lstInstrucciones;
    }
    cicloWhile.prototype.ejecutarInstrucciones = function (resultadoParcial, entorno) {
        while (true) {
            var resBool = recorridoOperaciones(this.condicion, entorno);
            if (resBool) {
                var entornoLocal = new Entorno(entorno);
                var lstInstrucciones = recorridoArbol(this.lstInstrucciones, entornoLocal);
                var resultado = ejecucionArbol(lstInstrucciones, entornoLocal);
                if (resultado != null) {
                    return resultado;
                }
            }
            else {
                break;
            }
        }
        return null;
    };
    return cicloWhile;
}());
