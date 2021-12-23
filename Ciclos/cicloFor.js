var cicloFor = /** @class */ (function () {
    function cicloFor(decla, expresion, expresion2, lstInstrucciones, tipoFor) {
        this.decla = decla;
        this.expresion = expresion;
        this.expresion2 = expresion2;
        this.lstInstrucciones = lstInstrucciones;
        this.tipoFor = tipoFor;
    }
    cicloFor.prototype.ejecutarInstrucciones = function (resultadoParcial, entorno) {
        if (this.tipoFor == 1) {
            var lstDec = [];
            lstDec.push(this.decla);
            var dec = recorridoArbol(lstDec, entorno);
            lstDec = [];
            lstDec.push(dec);
            ejecucionArbol(lstDec[0], entorno);
            while (recorridoOperaciones(this.expresion, entorno)) {
                var entornoLocal = new Entorno(entorno);
                var instrucciones = recorridoArbol(this.lstInstrucciones.instruccion, entornoLocal);
                var resultado = ejecucionArbol(instrucciones, entornoLocal);
                if (resultado != null) {
                    return resultado;
                }
                recorridoOperaciones(this.expresion2, entorno);
            }
        }
        else if (this.tipoFor == 0) {
            var arr = [];
            if (this.expresion2 instanceof Array) {
                var op = recorridoOperaciones(this.expresion2[0][0], entorno);
                var tipo = getTipoValor(op);
                if (this.expresion.tipo == "id") {
                    var declaracion = new DeclaracionVariable(new Simbolo(tipo, this.expresion.valor, 0, 0, null, 0), this.expresion2[0][0], "declaracion");
                    declaracion.ejecutarInstrucciones([], entorno);
                    for (var x = 0; x <= this.expresion2.length; x++) {
                        var asignacion = new AsignacionVariable(new Simbolo(null, this.expresion.valor, 0, 0, null, 0), this.expresion2[0][x], "asignacion");
                        asignacion.ejecutarInstrucciones([], entorno);
                        var simbolo = entorno.getSimbolo(this.expresion.valor);
                        if (simbolo.tipo == "int") {
                            simbolo.valor = simbolo.valor - 1;
                            var lst = recorridoArbol(this.lstInstrucciones.instruccion, entorno);
                            var res = ejecucionArbol(lst, entorno);
                            if (res != null) {
                                return res;
                            }
                        }
                    }
                }
            }
        }
        return null;
    };
    return cicloFor;
}());
