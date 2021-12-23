var DeclaracionEdd = /** @class */ (function () {
    function DeclaracionEdd(padre, padre2, simbolo, lstExpresion, tipoDeclaracion) {
        this.padre = padre;
        this.padre2 = padre2;
        this.variable = simbolo;
        this.lstExpresion = lstExpresion;
        this.tipoDeclaracion = tipoDeclaracion;
    }
    DeclaracionEdd.prototype.ejecutarInstrucciones = function (resultadoParcial, entorno) {
        console.log("Estoy en declaracion EDD");
        if (this.tipoDeclaracion == "declaracionStruct2") {
            this.variable.tipo = this.padre;
            entorno.agregar(this.variable.identificador, this.variable);
        }
        else {
            var lstExp = [];
            this.lstExpresion.forEach(function (item) {
                //Aqui retornamos valores
                console.log("ESTAMOS ACAAAA");
                lstExp.push(recorridoOperaciones(item, entorno));
            });
            if (this.padre.toUpperCase == this.padre2.toUpperCase) {
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
                        entorno.agregar(this.variable.identificador, this.variable);
                    }
                }
            }
        }
        return null;
    };
    return DeclaracionEdd;
}());
