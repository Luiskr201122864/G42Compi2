var Elemento = /** @class */ (function () {
    function Elemento(valor, tipo) {
        this.valor = valor;
        this.tipo = tipo;
    }
    Elemento.prototype.ejecutarInstrucciones = function (objetoRaiz, elementoABuscar) {
        var listaRetorno = [];
        if (Array.isArray(objetoRaiz)) {
            objetoRaiz.forEach(function (value) {
                if (elementoABuscar.tipo == "Operacion") {
                    listaRetorno = listaRetorno.concat(value.obtenerObjetos(elementoABuscar.valor));
                }
            });
        }
        return listaRetorno;
    };
    return Elemento;
}());
