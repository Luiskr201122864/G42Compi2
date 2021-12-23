var sentenciaPrint = /** @class */ (function () {
    function sentenciaPrint(expresion) {
        this.expresion = expresion;
    }
    sentenciaPrint.prototype.ejecutarInstrucciones = function (resultadoParcial, entorno) {
        var operacion = recorridoOperaciones(this.expresion, entorno);
        if (operacion instanceof Simbolo) {
            if (operacion.valor instanceof Array) {
                //Es arreglo
                var result = "[" + lstExpresionFunPrint(operacion.valor) + "]";
                console.log(result);
                document.getElementById("consola").value += "[PARSER][PRINT]: " + result + "\n";
                document.getElementById("Resultados").value += "[PARSER][PRINT]: " + result + "\n";
            }
            else {
                console.log(operacion.valor);
                document.getElementById("consola").value += "[PARSER][PRINT]: " + operacion.valor + "\n";
                document.getElementById("Resultados").value += "[PARSER][PRINT]: " + operacion.valor + "\n";
            }
        }
        else if (operacion instanceof Array) {
            //let result = "";
            var result_1 = "";
            operacion.forEach(function (item) {
                result_1 += item + " ";
            });
            console.log("[" + result_1 + "]");
            document.getElementById("consola").value += "[PARSER][PRINT]: " + operacion + "\n";
            document.getElementById("Resultados").value += "[PARSER][PRINT]: " + operacion + "\n";
        }
        else {
            console.log("PRINT " + operacion);
            document.getElementById("consola").value += "[PARSER][PRINT]: " + operacion + "\n";
            document.getElementById("Resultados").value += "[PARSER][PRINT]: " + operacion + "\n";
            //Resultados
        }
        return null;
    };
    return sentenciaPrint;
}());
function lstExpresionFunPrint(exp) {
    var lstExp = "";
    exp.forEach(function (item) {
        if (item instanceof Array) {
            //para arreglos dentro de arreglos
            var val = "[" + lstExpresionFunPrint(item) + "]";
            lstExp += val;
        }
        else if (item instanceof Simbolo) {
            lstExp += item.valor + " ";
        }
        else {
            lstExp += item + " ";
        }
    });
    return lstExp;
}
