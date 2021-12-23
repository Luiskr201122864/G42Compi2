var sentenciaReturn = /** @class */ (function () {
    function sentenciaReturn(expresion) {
        this.expresion = expresion;
    }
    sentenciaReturn.prototype.ejecutarInstrucciones = function (resultadoParcial, entorno) {
        var retorno = "null";
        if (this.expresion != null) {
            retorno = recorridoOperaciones(this.expresion, entorno);
        }
        return retorno;
    };
    return sentenciaReturn;
}());
