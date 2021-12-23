var Funcion = /** @class */ (function () {
    function Funcion(tipo, id, lstPar, lstIns, tipoFuncion) {
        this.tipo = tipo;
        this.id = id;
        this.lstPar = lstPar;
        this.lstInt = lstIns;
        this.tipoFuncion = tipoFuncion;
    }
    Funcion.prototype.ejecutarInstrucciones = function (resultadoParcial, entorno) {
        var lstIntruccionesFun = recorridoArbol(this.lstInt.instruccion, entorno);
        var retorno = ejecucionArbol(lstIntruccionesFun, entorno);
        if (retorno != null) {
            return retorno;
        }
        return null;
    };
    return Funcion;
}());
