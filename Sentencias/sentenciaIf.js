var sentenciaIf = /** @class */ (function () {
    function sentenciaIf(ifSimple, lstElseIf, isElse) {
        this.ifSimple = ifSimple;
        this.lstElseIf = lstElseIf;
        this.isElse = isElse;
    }
    sentenciaIf.prototype.ejecutarInstrucciones = function (resultadoParcial, entorno) {
        var entraElse = true;
        var condicion = recorridoOperaciones(this.ifSimple.condicion, entorno);
        if (condicion) {
            var entornoLocal = new Entorno(entorno);
            var instrucciones = recorridoArbol(this.ifSimple.lstInstrucciones.instruccion);
            var retorno = ejecucionArbol(instrucciones, entornoLocal);
            entraElse = false;
            if (retorno != null) {
                return retorno;
            }
        }
        else if (this.lstElseIf.length != 0) {
            //tenemos una lista de else if
            for (var x in this.lstElseIf) {
                var senElseIf = this.lstElseIf[x];
                var condicion_1 = recorridoOperaciones(senElseIf.condicion, entorno);
                if (condicion_1) {
                    var entornoLocal = new Entorno(entorno);
                    var instrucciones = recorridoArbol(senElseIf.lstInstrucciones.instruccion);
                    var retorno = ejecucionArbol(instrucciones, entornoLocal);
                    entraElse = false;
                    if (retorno != null) {
                        return retorno;
                    }
                }
            }
        }
        if (this.isElse != null && entraElse) {
            var entornoLocal = new Entorno(entorno);
            var instrucciones = null;
            if (this.isElse.hasOwnProperty('lstInstrucciones')) {
                instrucciones = recorridoArbol(this.isElse.lstInstrucciones.instruccion);
            }
            else {
                instrucciones = recorridoArbol(this.isElse.instruccion);
            }
            var retorno = ejecucionArbol(instrucciones, entornoLocal);
            entraElse = false;
            if (retorno != null) {
                return retorno;
            }
        }
        return null;
    };
    return sentenciaIf;
}());
