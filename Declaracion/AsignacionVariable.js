var AsignacionVariable = /** @class */ (function () {
    function AsignacionVariable(id, expresion, tipoAsignacion) {
        this.variable = id;
        this.expresion = expresion;
        this.tipoAsignacion = tipoAsignacion;
    }
    AsignacionVariable.prototype.ejecutarInstrucciones = function (resultadoParcial, entorno) {
        /***
         * 1. Obtener el valor de operacion
         * 2. Obtener el tipo del valor (int, string, etc....)
         * 3. Buscar en el entorno la variable, este retorna el simbolo (si no existe tirar errorazo)
         * 4. Comparar el tipo de variable con el tipo del valor retornado por la operacion
         * 5. Si es igual los tipos, guardar el valor en el simbolo y guardarlo en el entorno
         */
        console.log("ESTAMOS ACA EN LA ASIGNACIÓN");
        //1. Se obtiene el valor de la operación
        var operacion = recorridoOperaciones(this.expresion, entorno);
        if (operacion != null) {
            console.log("Se obtuvo el valor de la operación de Asignación.");
            //2. Se obtiene el tipo de valor
            var tipoValor = getTipoValor(operacion);
            console.log("El tipo de valor es: " + tipoValor);
            //3. Se busca en el entorno actual la variable involucrada en la asignación
            var simbolo = entorno.existe(this.variable.identificador);
            if (simbolo) {
                //let valorAsignacion = entorno.getSimbolo(this.expresion.valor);//esto retorna el valor de la asignación
                var variableAsignacion = entorno.getSimbolo(this.variable.identificador);
                var tipoVariable = variableAsignacion.tipo;
                //4. Se comparan los tipos de variable y valor a asignar en la operacion
                if (tipoValor == "int") {
                    if (tipoVariable == "double") {
                        tipoValor = "double";
                        /*if(!esDouble(operacion)){
                            operacion = operacion.toFixed(2);
                        }*/
                    }
                }
                else if (tipoValor == "double") {
                    if (tipoVariable == "int") {
                        tipoValor = "int";
                        operacion = Number.parseInt(operacion);
                    }
                }
                if (tipoVariable == tipoValor) {
                    //5.Si los tipos son iguales entonces se guarda el valor en el símbolo y se agrega al entorno.
                    variableAsignacion.valor = operacion;
                    entorno.reemplazar(variableAsignacion.identificador, variableAsignacion);
                }
                else {
                    if (variableAsignacion.tipo == "double" && tipoValor == "int") {
                        //5.Si los tipos son iguales entonces se guarda el valor en el símbolo y se agrega al entorno.
                        variableAsignacion.valor = operacion;
                        entorno.reemplazar(variableAsignacion.identificador, variableAsignacion);
                    }
                    else {
                        console.log("[ERROR]:Los tipos de dato no coinciden. Se esperaba [" + variableAsignacion.tipo + "] y se obtuvo [" + tipoValor + "].");
                    }
                }
            }
            else {
                //3. Si la variable no se encuentra en el entorno actual entonces se produce un error.
                console.log("[ERROR]:La variable involucrada en la asignación no se encuentra declarada.");
            }
        }
        else {
            console.log("[ERROR]:Error en ejecución, no se encontró la expresión [" + this.expresion.toString() + "]");
        }
        return null;
    };
    return AsignacionVariable;
}());
