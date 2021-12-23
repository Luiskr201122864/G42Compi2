var LlamadaFuncion = /** @class */ (function () {
    function LlamadaFuncion(id, lstPar, tipoFuncion) {
        this.id = id;
        this.lstPar = lstPar;
        this.tipoFuncion = tipoFuncion;
    }
    LlamadaFuncion.prototype.ejecutarInstrucciones = function (resultadoParcial, entorno) {
        var funcionB = buscarFuncion(this.id);
        if (funcionB != null) {
            var entornoLocal = new Entorno(entorno);
            if (this.lstPar == null) {
                var retorno = funcionB.ejecutarInstrucciones([], entornoLocal);
                if (retorno != null) {
                    return retorno;
                }
            }
            else {
                var lstParArbol = recorridoArbol(funcionB.lstPar);
                var funcionValida = validarParametros(this.lstPar, lstParArbol, entornoLocal);
                if (funcionValida) {
                    var retorno = funcionB.ejecutarInstrucciones([], entornoLocal);
                    if (retorno != null) {
                        return retorno;
                    }
                }
            }
        }
        else {
            console.log("No existe funcion");
        }
        return null;
    };
    return LlamadaFuncion;
}());
function validarParametros(lstParametros, lstParametrosFuncion, entornoLocal) {
    /**
     * ins.tipo, ins.id, ins.lstPar, ins.lstInst
     *
     */
    if (lstParametros.length == lstParametrosFuncion.length) {
        var entornoLocal2 = new Entorno(null);
        //Si es el mismo numero de parametros
        for (var x in lstParametros) {
            var exp = lstParametros[x];
            var resultado = recorridoOperaciones(exp, entornoLocal);
            var tipoResultado = null;
            if (resultado instanceof Simbolo) {
                tipoResultado = resultado.tipo;
                resultado = resultado.valor;
            }
            else {
                tipoResultado = getTipoValor(resultado);
            }
            if (lstParametrosFuncion[x] instanceof DeclaracionVariable) {
                if (tipoResultado == lstParametrosFuncion[x].variable.tipo) {
                    var v = lstParametrosFuncion[x];
                    v.ejecutarInstrucciones([], entornoLocal2);
                    var variableB = entornoLocal2.getSimbolo(v.variable.identificador);
                    variableB.valor = resultado;
                }
                else {
                    console.log("No coinciden los tipos de parametros");
                    return false;
                }
            }
            else if (lstParametrosFuncion[x] instanceof DeclaracionEdd) {
                // if(tipoResultado ==23242526 && lstParametrosFuncion[x].variable.tipo == "edd"){
                var v = lstParametrosFuncion[x];
                v.ejecutarInstrucciones([], entornoLocal2);
                var variableB = entornoLocal2.getSimbolo(v.variable.identificador);
                variableB.valor = resultado;
                // }
            }
            else if (lstParametrosFuncion[x] instanceof DeclaracionArreglo2) {
            }
        }
        /**
         * Aqui copio el entorno aux al entornolocal
         */
        for (var x in entornoLocal2.tabla) {
            var item = entornoLocal2.tabla[x];
            var id = item.identificador.toLowerCase();
            item.identificador = item.identificador.toLowerCase();
            entornoLocal.tabla[id] = item;
        }
    }
    else {
        console.log("No coinciden el numero de parametros");
        return false;
    }
    return true;
}
