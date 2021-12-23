function guardarDeclaracionTipo1(declaracion, ts, ambitoA){
    console.log("ESTOY EN GUARDAR DECLARACION TIPO 1 ");
    var rol = "variable";   
    for(var i in declaracion.lisId){
        var ide = declaracion.lisId[i];
        var existe = existeSimbolo(ide, rol, ts, ambitoA);
        if(existe){
            //Existe simbolo
            var desp = "La varaible "+ide +" ya existe en el ambito actual";
            var errorV = {tipo:"semantico", descripcion:desp, fila:1, columna:1};
            errores.error.push(errorV);
        }else{
            //No existe simbolo
            var newSimbolo = {modificador:"", tipo:declaracion.tipo, nombre:ide, valor:declaracion.exp, ambito: ambitoA, 
            rol: rol, dimension:"-", tamano:1, parametros:0, valDimension:"-"};
            ts.simbolo.push(newSimbolo); 
        }
    }
}


function guardarDeclaracionTipo2(declaracion, ts, ambitoA){
    console.log("ESTOY EN GUARDAR DECLARACION TIPO 2");
    var rol = "variable";
    var variable = declaracion.id;
    var existe = existeSimbolo(variable,  rol, ts, ambitoA);
    if(existe){
        //Existe simbolo
        var desp = "La varaible "+variable +" ya existe en el ambito actual";
        var errorV = {tipo:"semantico", descripcion:desp, fila:1, columna:1};
        errores.error.push(errorV);
    }else{
        //No existe simbolo
        var newSimbolo = {modificador:"", tipo:"", nombre:variable, valor:declaracion.exp, ambito: ambitoA, 
        rol: rol, dimension:"-", tamano:1, parametros:0, valDimension:"-", tipoExtra:2 };
        ts.simbolo.push(newSimbolo); 
    }
}


function guardarDeclaracionTipo3(declaracion, ts, ambitoA){
    console.log("ESTOY EN GUARDAR DECLARACION TIPO 3");
    var rol = "constante";
    var variable = declaracion.id;
    var existe = existeSimbolo(variable,  rol, ts, ambitoA);
    if(existe){
        //Existe simbolo
        var desp = "La constante "+variable+" ya existe en el ambito actual";
        var errorV = {tipo:"semantico", descripcion:desp, fila:1, columna:1};
        errores.error.push(errorV);
    }else{
        //No existe simbolo
        var newSimbolo = {modificador:"", tipo:"", nombre:variable, valor:declaracion.exp, ambito: ambitoA, 
        rol: rol, dimension:"-", tamano:1, parametros:0, valDimension:"-",  tipoExtra:3, valorAsignado:false};
        ts.simbolo.push(newSimbolo); 

        
    }

}


function guardarDeclaracionTipo4(declaracion, ts, ambitoA, clase){
    console.log("ESTOY EN GUARDAR DECLARACION TIPO 4");
    var rol = "variable";
    var variable = declaracion.id;
    var existe = existeSimbolo(variable,  rol, ts, ambitoA);
    if(existe){
        //Existe simbolo
        var desp = "La variable global "+variable+" ya existe en el ambito actual";
        var errorV = {tipo:"semantico", descripcion:desp, fila:1, columna:1};
        errores.error.push(errorV);
    }else{
        //No existe simbolo
        //var amb = clase+"_Global";
        var newSimbolo = {modificador:"", tipo:"", nombre:variable, valor:declaracion.exp, ambito: ambitoA, 
        rol: rol, dimension:"-", tamano:1, parametros:0, valDimension:"-", tipoExtra:4};
        ts.simbolo.push(newSimbolo); 
    }
}


function guardarDeclaracionTipo5(declaracion, ts, ambitoA){
    console.log("ESTOY EN GUARDAR DECLARACION TIPO 5");
    var rol = "variable";   
    for(var i in declaracion.lisId){
        var variable = declaracion.lisId[i];
        var existe = existeSimbolo(variable, rol, ts, ambitoA);
        if(existe){
            //Existe simbolo
            var desp = "La varaible "+variable+" ya existe en el ambito actual";
            var errorV = {tipo:"semantico", descripcion:desp, fila:1, columna:1};
            errores.error.push(errorV);
        }else{
            //No existe simbolo
            var newSimbolo = {modificador:"", tipo:declaracion.tipo, nombre:variable, valor:declaracion.exp, ambito: ambitoA, 
            rol: rol, dimension:"-", tamano:1, parametros:0, valDimension:"-"};
            ts.simbolo.push(newSimbolo); 

            
        }
    }
}