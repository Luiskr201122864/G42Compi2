var AccesoEdd = /** @class */ (function () {
    function AccesoEdd(simbolo, lstIds, tipoAcceso) {
        this.variable = simbolo;
        this.lstIds = lstIds;
        this.tipoAcceso = tipoAcceso;
    }
    AccesoEdd.prototype.ejecutarInstrucciones = function (resultadoParcial, entorno) {
        var valorRetorno = null;
        var simbolo = entorno.getSimbolo(this.variable.identificador);
        if (simbolo != null) {
            if (this.lstIds.length == 1) {
                var pos = 0;
                for (var s in simbolo.valor) {
                    if (simbolo.valor[s].identificador == this.lstIds[0]) {
                        valorRetorno = simbolo.valor[s].valor;
                        return valorRetorno;
                    }
                    pos = pos + 1;
                }
            }
            else {
                valorRetorno = recursivaObjAcceso(simbolo, this.lstIds, 0);
                return valorRetorno;
            }
        }
        else {
            console.log("No existe edd");
        }
        return valorRetorno;
    };
    return AccesoEdd;
}());
function recursivaObjAcceso(obj, lstIds, pos) {
    var valorRetorno = null;
    if (obj instanceof Simbolo) {
        for (var y in obj.valor) {
            if (obj.valor[y].identificador == lstIds[pos] && obj.valor[y].valor instanceof Simbolo) {
                console.log("No existe acceso al id");
                pos = pos + 1;
                valorRetorno = recursivaObjAcceso(obj.valor[y].valor, lstIds, pos);
            }
            else if (obj.valor[y].identificador == lstIds[pos]) {
                if (pos + 1 == lstIds.length) {
                    valorRetorno = obj.valor[y].valor;
                    break;
                }
            }
        }
    }
    return valorRetorno;
}
