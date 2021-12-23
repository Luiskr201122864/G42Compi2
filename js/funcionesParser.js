//#region DEFINICIÒN DE VARIABLES GLOBALES
listaErrores = [];
tablaSimbolosV2 = [];
//#endregion

//#region DEFINICIÒN DE FUNCIÒN PARA EJECUTAR EL PARSER
//Funciòn para ejecutar el parser de Quetzal 1.0 
const parseQuetzal = function (entrada){
    listaErrores = [];
    var mensajeConsola = "";

    document.getElementById('consola').innerHTML += ">Intentando analizar XML (" + new Date() + ") \n";

    try {
        document.getElementById('consola').value += ">Entró a la función para ejecutar el parser \n";
        //let resultado = gramatica.parse(entrada);
        let resultado = gramatica.parse(entrada);

        if (resultado) {
            console.info('Obtuvo respuesta del parser... '+resultado.toString());
            let entorno = new Entorno(null);
            let arbol = recorridoArbol(resultado.instruccion);
            ejecucionArbol(arbol, entorno);
            let entornoMain = new Entorno(entorno);
            if(lstMain.length!=0){
                lstMain[0].ejecutarInstrucciones(arbol, entornoMain);
            }
            alert('Resultado: '+ resultado.toString());
            document.getElementById('consola').value += ">Se ejecutó el parser \n";
            console.info('Entrada fue parseada correctamente!!!!');
            document.getElementById('consola').value += ">Entrada parseada correctamente! \n";

           // console.log("\n\n\n################################################################");
                //var grafoAST = graficarArbolAST(arbol);
                // console.log(grafoAST);
                // alert(grafoAST);
                // document.getElementById("hiddenAST").value = grafoAST;
                //pruebaGraficarViz(grafoAST);
           // console.log("\n\n\n################################################################");
            
        }else{
            console.info('\nNo se ejecutó la clase parser');
        }

        return resultado;
    } catch (e) {
        document.getElementById('consola').value += "\n>Error al parsear la entrada: \n>" + e.toString() + "\n";
        throw ('Error al parserar la entrada: ' + e);
    }
}

function insertarError(error){
    alert("Error: "+error.Descripcion);
    if (error != undefined){
        this.listaErrores.push(error);
    }
}

//#endregion

//#region FUNCIONES CORRESPONDIENTES AL MENÙ PRINCIPAL DEL PROYECTO

/******************************************FUNCIONES DE MENÚ DE BOTONES**************************************************************** */
//función para crear un nuevo archivo reiniciando los objetos de texto
const nuevoArchivo = function(){
    //Elimina el contenido de las text areas para crear un nuevo archivo
    showCode();
    document.getElementById("Entrada").value = "";
    editor.setValue("");
    document.getElementById("Salida").value  = "";
    document.getElementById("consola").value = "";
    document.getElementById("Entrada").focus();
};

//Función para abrir un dialog para seleccionar y cargar el contenido de un archivo externo.
const abrirArchivo = function(evento){
    let archivo = evento.target.files[0];

    if (archivo){
        let reader = new FileReader();
        reader.onload = function(e){
            let contenido = e.target.result;
            //var texto = contenido.replace(/\n/g, '<br />');            
            document.getElementById("Entrada").innerHTML = contenido;//texto;
            editor.setValue(contenido);
        };

        reader.readAsText(archivo);
    }else{
        alert('No se ha seleccionado ningún archivo.');
    }
};


//Funciòn para mostrar la gràfica del arbol AST en la página principal del proyecto
function abrirReporteAST(){
    var informacion = document.getElementById('hiddenAST').value;
    document.getElementById('reporteASTGrafica').visible = true;
    //Se llama la funciòn que genera el còdigo de la gràfica en Graphviz
    alert('Se ejecutará la función que grafica el AST...');
    pruebaGraficarVizAST(informacion);
}

//Función para mostrar la gráfica del arbol CST en la página principal del proyecto
function abrirReporteCST(){
    var informacion = document.getElementById('hiddenCST').value;
    document.getElementById('reporteCSTGrafica').visible = true;
    alert('Se ejecutará la función que grafica el CST');
    //pruebaGraficarVizCST(informacion);
}

//Función para mostrar el reporte de errores en la página principal del proyecto
function abrirReporteErrores(){
    var informacion = document.getElementById('hiddenErrores').value;
    document.getElementById('reporteErroresTabla').visible = true;
    alert('Se ejecutará la función que genera el reporte de errores...');
    //document.getElementById('reporteErroresTabla').innerHTML = informacion;
}

//Funciòn para mostrar el reporte de la tabla de sìmbolos generados al parsear la cadena de entrada
function abrirReporteTS(tabla){
    var tablas = document.getElementById('hiddenTablaSimbolos').value;
    document.getElementById('reporteTablaSimbolosIndex').visible = true;
    document.getElementById('reporteTablaSimbolosIndex').innerHTML = tablas;
}

//Funciòn para mostrar el reporte gramatical en la pàgina principal del proyecto
function abrirReporteGramatical(){
    var informacion = document.getElementById('hiddenGramatical').value;
    document.getElementById('reporteGramatical').visible = true;
    alert('Se ejecutará la función que genera el reporte gramatical...');
    //document.getElementById('reporteGramatical').innerHTML = informacion;
}
//#endregion

//#region GENERAR GRAFICA DE OBJETOS EN GRAPHVIZ

/* *************************** GENERAR GRAFICA DE OBJETOS EN GRAPHVIZ******************************************************* */

//Funciòn para generar la gràfica usando el componente VIZ
function pruebaGraficarViz(grafica){
    var viz = new Viz();
    viz.renderSVGElement(grafica)
    .then(function(element){
        let elemento = document.getElementById('grafica');
        elemento.appendChild(elemento);
    })
    .catch(error => {
        viz = new Viz();
        console.error(error);
    });
}
//#endregion

//#region FUNCIONES ESPECIFICAS DE CODEMIRROR
/***********************************FUNCIONES ESPECÍFICAS DE CODE MIRROR**************************************************** */

function numerar(){
    var contador = 0;
    var contenido = document.getElementById('Entrada').value;
    var lineas = contenido.replace(new RegExp(/([a-z0-9]+)(\s?)/g), function(or) {contador += 1; return contador + '. ' + or});

    document.getElementById('textA').value = lineas;

}

var code = $(".codemirror-textarea")[0];
// var editor = CodeMirror.fromTextArea(code, {
//     lineNumbers : true,
//     mode: "application/xml",
//     enterMode: "indent",
//     tabMode: "shift",   
//     autoRefresh: true
// });

var editor = CodeMirror.fromTextArea(code, {
    lineNumbers : true,
    matchBrackets: true,
    mode: "text/x-java",
    mode: "text/x-csrc",
    mode: "text/x-c++src",
    tabMode: "shift",
    autoRefresh: true
});

function showCode(){

    var text = editor.getValue();
    return text;
}

/*-.---------.-.-.-.-.-.Area de texto para Resultado de Ejecución-.-.-.-.-.-.-.-.-.-.*/
/* codemirror para textarea de resultados */
var code3 = document.getElementById("Salida");
var editor3 = CodeMirror.fromTextArea(code3, {
    height: "350px;",
        mode: "text/x-csrc",
        lineNumbers: true
});

function showCodeResultadoEjecucion(){
    var text = editor3.getValue();
    return text;
}

//#endregion