var contNodos = 0;
var contNodos2 = 0;
var cantidadHijos = 0;

/* Estructura del Arbol que retorna el Parser */
/* 
    ID:
        expresion:
            nombre: "expresion"
            tipo: "integer"
            valor: "5"

        tipoDeclaracion

        variable: Simbolo
            columna: 0
            identificador: "a"
            linea: 0
            tipo: "int"
            tipoVar: 0
            valor: null
*/
function graficarArbolAST(Arbol){
    var script = "";
    console.log("*********************************************************\n");
    console.log("********************** GRAFICA AST **********************\n");
    if (Arbol){
        var Raiz = Arbol[0];
        cantidadHijos = Arbol.length;
        console.log("Raiz de arbol: "+Raiz[0]);
        if (Raiz){
            script = "digraph G{\n";
            script += "graph[label=\"Grafica AST\", labelloc=t, fontsize=30];\n";
            script += "node[shape = record, height = 0.1];\n";
            script += recorrerHijosAST(Raiz);
            script += "}\n";
        }

        console.log("*********************************************************\n");
        console.log("********************** GRAFICA AST **********************\n");
    }
    return script;
}

function recorrerHijosAST(Nodo){
    console.log("Ingresando a función para recorrer hijos...\n");
    var script = "";
    contNodos++;

    var numHijos = getCantidadHijos(Nodo);
    console.log("La cantidad de hijos del nodo es: "+ numHijos);

    let Padre = "node"+contNodos;
    script += Padre + ";\n";
    script += Padre + "[label = \"" + Nodo[0] + "\"];\n";
}

function getCantidadHijos(Nodo){
    var contador = 0;
    
    contador = Nodo.length();

    return contador;
}


function pruebaGraficarVizAST(grafica){
    var viz = new Viz();
    viz.renderSVGElement(grafica)
    .then(function(element) {
        //document.body.appendChild(element);
        //alert('entro a la funcion elemento');
        let elemento = document.getElementById('reporteASTGrafica');
        elemento.appendChild(element);
    })
    .catch(error => {
        viz = new Viz();
        console.error(error);
    });
}