
function getTipoValor(valor){
    if(valor == 23242526){
        return 23242526; //null
    }
    else if(Number.isInteger(valor)){
        return "int";
    }else if(isString(valor)){
        return "String";
    }else if(esEntero(valor)){
        return "double";
    }else if(valor instanceof Simbolo){
        return valor.tipo;
    }else if(typeof valor === 'boolean'){
        return "boolean";
    }

    return "null";
}

function isString(value) {
	return typeof value === 'string' || value instanceof String;
}

function esEntero(numero){
    if (numero - Math.floor(numero) == 0) {
        return false;
    } else {
        return true;
    }
}