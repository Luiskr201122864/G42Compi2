
function guardarEstructura(estructura, edd){
    tipoObj++;
    var estruct = {nombre:estructura.id, lstEdd:estructura.lstAtr, tipo:tipoObj};
    edd.estructura.push(estruct);
}


function guardarEstructuraArreglo(eddArr, amb, ts, edd){
    console.log("ESTOY EN GUARDAR ESTRUCTURA ARREGLO");
    var rol = "";
    if(eddArr.padre.toLowerCase() == "string"){
        rol = "arreglo";
    }else{
        rol = "estructuraArreglo";
    }
  
    var variable = eddArr.id;
    var existe = existeSimbolo(variable,  rol, ts);
    if(existe){
        //Existe simbolo
        var desp = "La estructura arreglo "+variable +" ya existe en el ambito actual";
        var errorV = {tipo:"semantico", descripcion:desp, fila:1, columna:1};
        errores.error.push(errorV);
    }else{
        //No existe simbolo
        var newSimbolo = {modificador:"", tipo:eddArr.padre, nombre:variable, valor:eddArr.exp, ambito: amb, 
        rol: rol, dimension:"1", tamano:1, parametros:0, valDimension:"-", instancia:false};
        ts.simbolo.push(newSimbolo); 
    }
}


function guardarDeclaracionEstructura(estructura, amb, ts, edd){
    console.log("ESTOY EN GUARDAR ESTRUCTURA ");
    var rol = "estructura";
    for(var i in estructura.lisId){
        var ide = estructura.lisId[i];
        var existe = existeSimboloEdd(ide, rol, amb, ts);
        if(existe){
            //Existe simbolo
            var desp = "La variable estructura  "+ide +" ya existe en el ambito actual";
            var errorV = {tipo:"semantico", descripcion:desp, fila:1, columna:1};
            errores.error.push(errorV);
        }else{
            //No existe simbolo
            if(estructura.padre.toLowerCase() == "string"){
                estructura.padre = "string";
            }
            var existeEdd = existeEstructura(estructura.padre, edd);
            if(existeEdd){
                var exp = "";
                if(estructura.nombre == "declaracionEddTipo1"){
                    if(estructura.exp.valor.nombre == "decEdd"){
                        if(estructura.exp.valor.id == estructura.padre){
                            exp = estructura.exp;
                            var newSimbolo = {modificador:"", tipo:estructura.padre, nombre:ide, valor:exp, ambito: amb, 
                            rol: rol, dimension:"-", tamano:1, parametros:0, valDimension:"-", instancia:false};
                            ts.simbolo.push(newSimbolo); 
                        }else{
                            var desp = "La estructura  "+estructura.padre +" no puede ser instanciada con "+estructura.exp.id+" \n";
                            var errorV = {tipo:"semantico", descripcion:desp, fila:1, columna:1};
                            errores.error.push(errorV);
                        }
                    }else{                     
                        exp = estructura.exp;
                        var newSimbolo = {modificador:"", tipo:estructura.padre, nombre:ide, valor:exp, ambito: amb, 
                        rol: rol, dimension:"-", tamano:1, parametros:0, valDimension:"-", instancia:false};
                        ts.simbolo.push(newSimbolo); 
                    }
                }else{
                    //si es tipo string
                    var newSimbolo = {modificador:"", tipo:estructura.padre, nombre:ide, valor:exp, ambito: amb, 
                    rol: rol, dimension:"-", tamano:1, parametros:0, valDimension:"-", instancia:false};
                    ts.simbolo.push(newSimbolo); 
                }
            }else if(estructura.padre.toLowerCase() == "string"){
                    exp = estructura.exp;
                    var newSimbolo = {modificador:"", tipo:estructura.padre.toLowerCase(), nombre:ide, valor:exp, ambito: amb, 
                    rol: rol, dimension:"-", tamano:1, parametros:0, valDimension:"-", instancia:false};
                    ts.simbolo.push(newSimbolo); 
            }else{    
                var desp = "La estructura  "+estructura.padre +" no ha sido definido.";
                var errorV = {tipo:"semantico", descripcion:desp, fila:1, columna:1};
                errores.error.push(errorV);
            }
        }
    }
}

function guardarAsignacionEstructura(asig, amb, ts, edd){
    var original = asig.padre;
    var simbolo = obtenerSimboloTuta(original, amb, ts);
    if(simbolo!=null){
        var eddPadre = obtenerEstructura(simbolo.tipo, estructuras);
        if(eddPadre== null){
            //no existe padre
            var desp = "La definicion de la estructura  "+simbolo.tipo +" no ha sido definido.";
            var errorV = {tipo:"semantico", descripcion:desp, fila:1, columna:1};
            errores.error.push(errorV);
        }
    }else{
        //no existe simbolo
        var desp = "La estructura  "+original +" no ha sido definido.";
        var errorV = {tipo:"semantico", descripcion:desp, fila:1, columna:1};
        errores.error.push(errorV);
    }
}
