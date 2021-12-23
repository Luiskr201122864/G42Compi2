var Simbolo = /** @class */ (function () {
    function Simbolo(tipo, id, linea, columna, valor, tipoVar) {
        this.identificador = id;
        this.linea = linea;
        this.columna = columna;
        this.tipo = tipo;
        this.valor = valor;
        this.tipoVar = tipoVar;
    }
    Simbolo.prototype.setValor = function (valor) {
        this.valor = valor;
    };
    Simbolo.prototype.getTipo = function (ent, arbol) {
        return this.tipo;
    };
    Simbolo.prototype.getValorImplicito = function (ent, arbol) {
        return this.valor;
    };
    return Simbolo;
}());
