var AsignacionEdd = /** @class */ (function () {
    function AsignacionEdd(padre, simbolo, lstExpresion, tipoDeclaracion) {
        this.padre = padre;
        this.variable = simbolo;
        this.lstExpresion = lstExpresion;
        this.tipoDeclaracion = tipoDeclaracion;
    }
    AsignacionEdd.prototype.ejecutarInstrucciones = function (resultadoParcial, entorno) {
        var lstExp = [];
        this.lstExpresion.forEach(function (item) {
            //Aqui retornamos valores
            var valor = recorridoOperaciones(item, entorno);
            if (valor instanceof Simbolo) {
                lstExp.push(valor.valor);
            }
            else {
                lstExp.push(valor);
            }
        });
        var simbolo = entorno.getSimbolo(this.variable.identificador);
        if (simbolo != null) {
            //edd = Estructura(0,1,2,...);
            if (this.padre.toUpperCase == simbolo.tipo.toUpperCase) {
                var estructura = buscarEstructura(this.padre);
                if (estructura != null) {
                    //Si existe estructura
                    var lstExpEdd = estructura.lstDatos;
                    var lstExpEdd2 = [];
                    for (var exp in lstExp) {
                        var tipoExp = lstExpEdd[exp] instanceof DeclaracionVariable ? lstExpEdd[exp].variable.tipo :
                            lstExpEdd[exp] instanceof DeclaracionEdd ? lstExpEdd[exp].padre : null;
                        if (getTipoValor(lstExp[exp]) == tipoExp || (getTipoValor(lstExp[exp]) == 23242526 && (lstExpEdd[exp] instanceof DeclaracionEdd
                            && lstExpEdd[exp].variable.tipo == "edd"))) {
                            console.log("SI ES IGUAL PAR");
                            lstExpEdd[exp].variable.valor = lstExp[exp];
                            lstExpEdd2.push(lstExpEdd[exp].variable);
                        }
                        else {
                            console.log("El tipo de valores son diferentes");
                            break;
                        }
                    }
                    if (lstExpEdd.length == lstExpEdd2.length) {
                        this.variable.valor = lstExpEdd2;
                        this.variable.tipo = this.padre;
                        entorno.reemplazar(this.variable.identificador, this.variable);
                    }
                }
            }
        }
        return null;
    };
    return AsignacionEdd;
}());
