var sentenciaSwitch = /** @class */ (function () {
    function sentenciaSwitch(expresion, lstCase, senDefault) {
        this.expresion = expresion;
        this.lstCase = lstCase;
        this.senDefault = senDefault;
    }
    sentenciaSwitch.prototype.ejecutarInstrucciones = function (resultadoParcial, entorno) {
        var resultado = recorridoOperaciones(this.expresion, entorno);
        var defaultEj = true;
        for (var x in this.lstCase) {
            var item = this.lstCase[x];
            var op = recorridoOperaciones(item.expresion, entorno);
            if (op == resultado) {
                var entornoLocal = new Entorno(entorno);
                var lstInstrucciones = recorridoArbol(item.lstInstrucciones.instruccion, entornoLocal);
                var resultado_1 = ejecucionArbol(lstInstrucciones, entornoLocal);
                if (resultado_1 != null) {
                    if (resultado_1 == "break") {
                        defaultEj = false;
                        break;
                    }
                    else {
                        return resultado_1;
                    }
                }
            }
        }
        if (defaultEj) {
            var entornoLocal = new Entorno(entorno);
            var lstInstrucciones = recorridoArbol(this.senDefault, entornoLocal);
            var resultado_2 = ejecucionArbol(lstInstrucciones, entornoLocal);
            if (resultado_2 != null) {
                return resultado_2;
            }
        }
        return null;
    };
    return sentenciaSwitch;
}());
