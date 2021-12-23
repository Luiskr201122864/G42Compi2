var DeclaracionArreglo2 = /** @class */ (function () {
    function DeclaracionArreglo2(tipo, simbolo, expresion, tipoDeclaracionArr) {
        this.tipo = tipo;
        this.variable = simbolo;
        this.expresion = expresion;
        this.tipoDeclaracionArr = tipoDeclaracionArr;
    }
    DeclaracionArreglo2.prototype.ejecutarInstrucciones = function (resultadoParcial, entorno) {
        if (this.tipoDeclaracionArr == "declaracionArr3") {
            var copia = recorridoOperaciones(this.expresion, entorno);
            if (copia != null && copia.valor instanceof Array) {
                var simbolo = entorno.getSimbolo(this.variable.identificador);
                if (simbolo == null) {
                    if (copia.tipo == this.tipo) {
                        this.variable.tipo = this.tipo;
                        this.variable.valor = copia.valor;
                        entorno.agregar(this.variable.identificador, this.variable);
                    }
                }
            }
        }
        else if (this.tipoDeclaracionArr == "declaracionArr5") {
            var simbolo = entorno.getSimbolo(this.variable.identificador);
            if (simbolo == null) {
                this.variable.tipo = this.tipo;
                entorno.agregar(this.variable.identificador, this.variable);
            }
        }
        else if (this.tipoDeclaracionArr == "declaracion4") {
            var simbolo = entorno.getSimbolo(this.variable.identificador);
            if (simbolo == null) {
                this.variable.tipo = this.tipo;
                entorno.agregar(this.variable.identificador, this.variable);
            }
        }
        return null;
    };
    return DeclaracionArreglo2;
}());
