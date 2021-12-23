var auxSentenciaIf = /** @class */ (function () {
    function auxSentenciaIf(condicion, lstInst, isIf, isElseIf) {
        this.condicion = condicion;
        this.lstInstrucciones = lstInst;
        this.isIf = isIf;
        this.isElseIf = isElseIf;
    }
    auxSentenciaIf.prototype.ejecutarInstrucciones = function (resultadoParcial, entorno) {
        return null;
    };
    return auxSentenciaIf;
}());
