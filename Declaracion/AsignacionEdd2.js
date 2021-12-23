var AsignacionEdd2 = /** @class */ (function () {
    function AsignacionEdd2(simbolo, lstIds, exp, tipoDeclaracion) {
        this.variable = simbolo;
        this.exp = exp;
        this.lstIds = lstIds;
        this.tipoDeclaracion = tipoDeclaracion;
    }
    AsignacionEdd2.prototype.ejecutarInstrucciones = function (resultadoParcial, entorno) {
        var simbolo = entorno.getSimbolo(this.variable.identificador);
        if (simbolo != null) {
            var resultado_1 = recorridoOperaciones(this.exp, entorno);
            var tipoExp = getTipoValor(resultado_1);
            if (this.lstIds.length == 1) {
                var pos_1 = 0;
                simbolo.valor.forEach(function (item) {
                    // if(item.identificador == this.lstIds[0] && tipoExp == item.tipo){
                    if (resultado_1 instanceof Simbolo) {
                        resultado_1 = resultado_1.valor;
                    }
                    item.valor = resultado_1;
                    simbolo.valor[pos_1] = item;
                    //}
                    pos_1 = pos_1 + 1;
                });
            }
            else {
                recursivaObj(simbolo, this.lstIds, 0, resultado_1, tipoExp);
            }
        }
        else {
            console.log("No existe edd");
        }
        return null;
    };
    return AsignacionEdd2;
}());
function recursivaObj(obj, lstIds, pos, val, tipoOp) {
    if (obj instanceof Simbolo) {
        for (var y in obj.valor) {
            if (obj.valor[y].identificador == lstIds[pos] && obj.valor[y].valor instanceof Simbolo) {
                console.log("No existe acceso al id");
                pos = pos + 1;
                recursivaObj(obj.valor[y].valor, lstIds, pos, val, tipoOp);
            }
            else if (obj.valor[y].identificador == lstIds[pos]) {
                if (pos + 1 == lstIds.length) {
                    if (obj.valor[y].tipo == tipoOp) {
                        obj.valor[y].valor = val;
                        break;
                    }
                }
            }
        }
    }
    return null;
}
