function guardarFuncionConParametros(funcion, ts, ambito, clase, edd, pasada){
    if(pasada == "varGlobal"){
        primeraPasadaGlobales(funcion.bloque, ts, clase, ambito,  edd,"");
    }else{
        console.log("ESTOY GUARDAR FUNCION CON PARAMETROS");
        var tipo = "";
        var rol = "funcion";
        var nombreFun = funcion.nombreFun;
        var numParametros = funcion.parametros.length;
        var tipoExtra = "";
        if(!(funcion.tipo == undefined)){        
            tipo = funcion.tipo;
            console.log("-> tipo Funcion: "+funcion.tipo);
        }
        if(funcion.nombre == "funcionIDPB" || funcion.nombre == "funcionIDP"){
            tipoExtra = "estructura";
        }else if(funcion.nombre == "funcionIDARRPB" || funcion.nombre == "funcionIDARRP"){
            tipoExtra = "estructuraArreglo";
        }else if(funcion.nombre == "funcionTARRPB" || funcion.nombre == "funcionTARRP"){
            tipoExtra = "arreglo";
        }else{
            tipoExtra = "primitivo";
        }

        var cadParametro = cadenaParametros(funcion);
        var ambitoNuevo = clase+"_"+nombreFun+cadParametro;
        nombreFun = nombreFun+cadenaParametros;

        var existeFuncion = buscarFuncion(ambitoNuevo, ambito, "funcion", ts);
        if(!existeFuncion){
            
            //Guardando nombre
            if(tipo.toLowerCase() == "string"){
                tipo = "string";
            }
            var nuevoSimbolo = {modificador:"public" , tipo:tipo, nombre:ambitoNuevo, valor:"-",  ambito:ambito, rol:rol, 
                                        dimension:"-", tamano:1, parametros:numParametros, valDimension:"-", lstParametros:funcion.parametros
                                        , inicioTmp:numTemp , extraTipo:tipoExtra};
            ts.simbolo.push(nuevoSimbolo);
            
            var nuevoSimbolo2 = {modificador:"-" , tipo:"void", nombre:"return", valor:"-",  ambito:ambitoNuevo , rol:"retorno", 
                                dimension:"-", tamano:1, parametros:0, valDimension:"-"};
            ts.simbolo.push(nuevoSimbolo2);

            var nuevoSimbolo3 = {modificador:"-" , tipo:"void", nombre:"this", valor:"-",  ambito:ambitoNuevo , rol:"this", 
                                dimension:"-", tamano:1, parametros:0, valDimension:"-"};
            ts.simbolo.push(nuevoSimbolo3);

            guardarParametros(funcion,ts,ambitoNuevo);
            if(!(funcion.bloque == undefined)){
                crearTablaSimbolos(funcion.bloque, simbolos, ambitoNuevo, "",edd);
            }
        }else{
            var desp = "Funcion ya declarado: "+ ambitoNuevo;
            var errorV = {tipo:"semantico", descripcion:desp, fila:1, columna:1};
            errores.error.push(errorV);
        }  
   }  
}

function cadenaParametros(funcion){
    console.log("Vamo a registrar los parametros");   
    var cadenaPar= "";
    var tipo = "";     
    for(var par in funcion.parametros){
            var p = funcion.parametros[par];
            if(p.tipo.toLowerCase() =="string"){
                p.tipo = "string";
            }
            tipo = p.tipo;
            cadenaPar +="_"+tipo;
        }
    return cadenaPar;
}

/**
 * 
 * tipoVar ID {
                $$ = {nombre:"parametro", tipo:$1, id:$2};
           }
           |ID ID{
                $$ = {nombre:"parametroEdd", tipo:$1, id:$2};  
           }
           |tipoVar '[' ']' ID{
                $$ = {nombre: "parametroTipoArr" , tipo:$1, id:$4};
           }
           |ID '[' ']' ID{
               $$ = {nombre: "parametroEddArr" , tipo:$1, id:$4};
           }; 
 */


function guardarParametros(actual, ts, ambitoA){
    console.log("Vamo a registrar los parametros");   
    for(par in actual.parametros){
        var p = actual.parametros[par];
        var rol = "";                      
        if(p.nombre == "parametro"){
            rol = "variable";
        }else if(p.nombre == "parametroEdd"){
            rol = "estructura";
        }else if(p.nombre == "parametroTipoArr"){
            rol = "arreglo";
        }else{
            rol = "arregloEdd";
        }
        if(p.tipo.toLowerCase() == "integer" || p.tipo.toLowerCase() == "char" || 
                                 p.tipo.toLowerCase()=="double" || p.tipo.toLowerCase()=="boolean"){
                               
            var nuevoSimbolo = {modificador:"-", tipo:p.tipo, nombre:p.id, valor:"-", ambito:ambitoA, rol:rol, 
            dimension:"-", tamano:1, parametros:0, valDimension:"-", par:true};
            ts.simbolo.push(nuevoSimbolo);
        }else{
            if(p.tipo.toLowerCase() == "string"){
                p.tipo = "string";
            }
            var nuevoSimbolo = {modificador:"-", tipo:p.tipo, nombre:p.id, valor:"-", ambito:ambitoA, rol:rol, 
            dimension:"-", tamano:1, parametros:0, valDimension:"-", par:true};
            ts.simbolo.push(nuevoSimbolo);
          /*  var nuevoSimbolo2 = {modificador:"-", tipo:"auxiliar", nombre:"parametroAuxiliar", valor:"-", ambito:ambitoA, rol:"Variable_Parametro", 
            dimension:"-", tamano:1, parametros:0, valDimension:"-"};
            ts.simbolo.push(nuevoSimbolo2);*/
        }
    };
}

function guardarFuncionSinParametros(funcion, ts, ambito, clase,edd, pasada){
    if(pasada == "varGlobal"){
        primeraPasadaGlobales(funcion.bloque, ts, clase, ambito,  edd,"");
    }else{
        console.log("ESTOY GUARDAR FUNCION SIN PARAMETROS");
        var visibilidad = "public";
        var tipo = "";
        var rol = "funcion";
        var nombreFun = funcion.nombreFun;
        var tipoExtra = "";
        if(!(funcion.visibilidad == undefined)){
            visibilidad = funcion.visibilidad;
            console.log("-> visibilidad Funcion: "+visibilidad);
        }
        if(!(funcion.tipo == undefined)){        
            tipo = funcion.tipo;
            console.log("-> tipo Funcion: "+funcion.tipo);
        }
        if(funcion.nombre == "funcionIDB" || funcion.nombre == "funcionID"){
            tipoExtra = "estructura";
        }else if(funcion.nombre == "funcionIDARRB" || funcion.nombre == "funcionIDARR"){
            tipoExtra = "estructuraArreglo";
        }else if(funcion.nombre == "funcionTARRB" || funcion.nombre == "funcionTARR"){
            tipoExtra = "arreglo";
        }else{
            tipoExtra = "primitivo";
        }
        var ambitoNuevo = clase+"_"+nombreFun;
        var existeFuncion = buscarFuncion(ambitoNuevo, ambito, "funcion", ts);
        if(!existeFuncion){
            //Guardando nombre
            var nuevoSimbolo = {modificador:visibilidad , tipo:tipo, nombre:ambitoNuevo, valor:"-",  ambito:ambito, rol:rol, 
                                        dimension:"-", tamano:1, parametros:0, valDimension:"-", inicioTmp:numTemp };
            ts.simbolo.push(nuevoSimbolo);
            
            var nuevoSimbolo2 = {modificador:"-" , tipo:"void", nombre:"return", valor:"-",  ambito:ambitoNuevo , rol:"retorno", 
                                dimension:"-", tamano:1, parametros:0, valDimension:"-"};
            ts.simbolo.push(nuevoSimbolo2);

            var nuevoSimbolo3 = {modificador:"-" , tipo:"void", nombre:"this", valor:"-",  ambito:ambitoNuevo , rol:"this", 
                                dimension:"-", tamano:1, parametros:0, valDimension:"-"};
            ts.simbolo.push(nuevoSimbolo3);
            if(!(funcion.bloque == undefined)){
                crearTablaSimbolos(funcion.bloque, simbolos, ambitoNuevo, "",edd);
            }
        }else{
            var desp = "Funcion ya declarado: "+ ambitoNuevo;
            var errorV = {tipo:"semantico", descripcion:desp, fila:1, columna:1};
            errores.error.push(errorV);
        }   
    }   
}