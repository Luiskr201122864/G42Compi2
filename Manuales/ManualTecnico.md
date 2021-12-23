# MANUAL TECNICO Quetzal 1.0 G42

## Integrantes de G42 ✒️

* **Luis Carlos Valiente Salazar         -   201122864** - *Luiskr1993*
* **Daniel Alejandro Herrera Hernández   -   201213194** - *alwueso*

### Descripción General 📋

Quetzal es un lenguaje de programación inspirado en C, su característica principal es la inclusión de tipos implícitos. El sistema de tipos de Quetzal realiza una formalización de los tipos de C y Java. Esto permite a los desarrolladores definir variables y funciones tipadas sin perder la esencia. Otra inclusión importante de Quetzal es la simplificación de los lenguajes C y Java para poder realizar diferentes instrucciones en menos pasos.

Adicional Quetzal tendrá 2 flujos, se podrá interpretar el código fuente ingresado y efectuar todas sus instrucciones, o bien se puede traducir este lenguaje a un lenguaje intermedio basado en un lenguaje de 3 direcciones, este se podrá ejectuar posteriormente en cualquier compilador de C, tomando en cuenta las reglas especificas de un lenguaje de 3 direcciones.


### Framework Utilizado 🔧

Para la construcción del proyecto no se utilizó ningún framework, se construyó únicamente utilizando clases de javascript, css y archivos html. 

## Dependencias de Quetzal G42 ⚙️

Debido a que el proyecto no se construyó utilizando ningún framework, fue necesario agregar dependencias de algunas herramientas externas para módulos específicos de Quetzal. A continuación se describen dichas dependencias:

### CodeMirror 🔩

Ya que Quetzal en principio pone a disposición del usuario una sección de texto para cargar archivos C/Java, o bien escribir directamente las sentencias de código en la sección, era necesario dar un formato adecuado que mostrara al usuario el detalle de líneas escritas. Para eso se utilizó CodeMirror a través de la importación de un plugin obtenido desde la página oficial de la herramienta:

* **https://codemirror.net/mode/java/index.html**

### Viz.js 🔩

Para la generación de gráficas de árbol AST fue necesario agregar las dependencias de Viz.js la cual es una herramienta con licencia MIT que permite la generación de grafos a partir de una entrada de texto trasladada.

### Jison 🔩

Esta herramienta fue necesaria para la generación de la gramática y una clase javascript que permite ejecutar un parser sobre una cadena de entrada. Se utilizó para parsear las entradas de codigo C/Java. Para la utilización de jison se realizó una instalación global de dicha herramienta a través de la cadena en consola:

```bash
npm install -g jison
```
Al haber generado un archivo .jison donde se incluyó la gramática del lenguaje en cuestión (XML y XPATH) se generó la clase javascript para la ejecución del parser desde la interfaz gráfica de TytusX G27. La generación de la gramática .js se realiza de la siguiente forma: 

```bash
jison ./Luiskr201122864/G42Compi2/Gramatica/gramatica.jison
```

### Clases de AST, Expresiones, Instrucciones e Interfaces 🔩

Debido a que el parser generado por jison se ejecuta a través de una clase javascript, al no tener ningún servidor intermedio corriendo como node hace que desde la gramática no se pudieran generar imports de las clases generadas para AST, Expresiones, Instrucciones e Interfaces. Para hacer que los objetos relacionados a estas clases fueran visibles y utilizables desde cualquier clase javascript, incluyendo la gramática, se agregaron las referencias de todos los archivos necesarios en la página index.html: 

```bash

<script src="AST/Entorno.js"></script>
<script src="AST/Simbolo.js"></script>
<script src="AST/Tipo.js"></script>
<script src="Interfaces/Instruccion.js"></script>
<script src="Interfaces/Expresion.js"></script>
<script src="Declaracion/AsignacionVariable.js"></script>
<script src="Declaracion/DeclaracionVariable.js"></script>
<script src="Declaracion/DeclaracionArreglo.js"></script>
<script src="Declaracion/DeclaracionStruct.js"></script>
<script src="Declaracion/DeclaracionEdd.js"></script>
<script src="Declaracion/AsignacionEdd2.js"></script>
<script src="Sentencias/Sentencia_Case.js"></script>
<script src="Sentencias/sentenciaSwitch.js"></script>
<script src="Sentencias/sentenciaBreak.js"></script>
<script src="Sentencias/sentenciaContinue.js"></script>
<script src="Sentencias/sentenciaReturn.js"></script>
<script src="Sentencias/auxSentenciaIf.js"></script>
<script src="Sentencias/sentenciaIf.js"></script>
<script src="Sentencias/sentenciaPrint.js"></script>
<script src="Accesos/AccesoEdd.js"></script>
<script src="Declaracion/DeclaracionArreglo.js"></script>
<script src="Declaracion/DeclaracionArreglo2.js"></script>
<script src="Declaracion/AsignacionArreglo.js"></script>
<script src="Nativas/NativasArreglo.js"></script>
<script src="Accesos/AccesoArreglo.js"></script>
<script src="Funciones/Funcion.js"></script>
<script src="Funciones/LlamadaFuncion.js"></script>
<script src="Ciclos/cicloDoWhile.js"></script>
<script src="Ciclos/cicloWhile.js"></script>
<script src = "js/funcionesParser2.js"></script> 
<script src = "js/funcionesParser.js"></script> 
<script src = "js/viz.js"></script>
<script src = "js/full.render.js"></script>
<script src = "Gramatica/gramatica.js"></script>
<script src = "Gramatica/gramaticaArbol.js"></script>
<script src = "AST/Analisis.js"></script>
<script src = "Reportes/graficaAST.js"></script>
<script src = "Reportes/graficaTS.js"></script>

```
## Gramáticas  📄

A continuación se describen las gramáticas generadas para Quetzal:

### Gramática Ascendente XML

``` bash
<inicio> ::= <cuerpo> EOF 
  
<cuerpo> ::= <cuerpo>  <instrucciones>   
        |    <instrucciones>  

<instrucciones> ::=  <declaracionVariable> ';' 
	            |    <declaracionVariable2> ';'  
                |    <asignacionVariable> ';'
                |    <comentarios> ';'
                |    <declaracionStruct> ';'
                |    <declaracionStruct2> ';'
                |    <asignacionStruct> ';'
                |    <sentenciaBreak> ';'
                |    <sentenciaContinue> ';'
                |    <sentenciaReturn> ';'
                |    <sentenciaIf>
                |    <sentenciaSwitch>
                |    <sentenciaWhile>
                |    <sentenciaFor>
                |    <sentenciaDoWhile>
                |    <declaracionArreglo> ';'
                |    <asignacionArreglo> ';'
                |    <declaracionFuncion> ';'
                |    <llamadaFuncion> ';'
                |    <incDecRemento> ';'
                |    <opCadena> ';'
  
<comentarios>::=  <PRINT> '(' <expresionlog> ')' 
             |    <PRINTLN>'(' <expresionlog> ')'

<tipoVariable> ::= <DOUBLE>                          
                |  <INT>
                |  <STRING>
                |  <BOOLEAN>
                |  <CHAR> 

<declaracionVariable> ::= <tipoVariable> <ID> '=' <expresionlog>
                       |  <tipoVariable> <ID>   

<declaracionVariable2> ::= <tipoVariable> <ID> ',' <lstID> ',' <expresionlog>
                       |  <tipoVariable> <ID>  ',' <lstID>  

<asignacionVariable> ::= <ID> '=' <expresionlog> ','  

<lstID> ::= <lstID> ',' <ID>
        |   <ID>

<declaracionArreglo> ::= <tipoVariable> <ID> '=' <arreglo>
                     |   <tipoVariable> '[' ']' <ID> '=' <arreglo>
                     |   <tipoVariable> '[' ']' <ID> '=' <copiarArreglo>
                     |   <tipoVariable> '[' ']' <ID> '=' <expresionlog>
                     |   <tipoVariable> '[' ']' <ID>
                     |   <ID> '[' ']' <ID>

<asignacionArreglo> ::= <ID> '=' <arreglo>
                    |   <ID> <arreglo> '=' <expresionlog>

<arreglo> ::= '[' <lstArreglo> ']'
            | '[' <expresion> ']'

<accesoArreglo> ::= <ID> '[' <expresionlog> ':' <expresionlog> ']'
                |   <ID> '[' <expresionlog> ':' <END> ']'
                |   <ID> '[' <BEGIN> ':' <expresionlog> ']'
                |   <ID> '[' <BEGIN> ':' <END> ']'
                |   <ID> '[' <expresionlog> ']'

<copiarArreglo> ::= '#' <ID>
                |   <ID> '#'

<lstArreglo> ::= <lstArreglo> <lstDatos>
            | <lstDatos>

<lstDatos> ::= <lstDatos> ',' <expresionlog>
          | <lstDatos> ',' <arreglo>
          | <lstDatos> ',' <contenidoStruct>
          | <contenidoStruct>
          | <expresionlog>
          | <arreglo>

<declaracionStruct> ::= <STRUCT> <ID>

<declaracionStruct2> ::= <ID> <ID>

<asignacionStruct> ::= <ID> <ID> '=' <ID> '(' <lstDatos> ')'
                    | <ID> '=' <ID> '(' <lstDatos> ')'
                    | <ID> '.' <tipoOpCadena>
                    | <ID> '.' <lstID2> '=' <expresionlog>

<asignacionStruct2> ::= <ID> '.' <lstID2>


<contenidoStruct> ::= <declaracionVariable>
                 | <declaracionArreglo>
                 | <asignacionStruct>
                 | <declaracionStruct2>

<lstID2> ::= <lstID2> '.' <ID>
          | <ID>

sentenciaIf: si
            | si entonces
            | si entoncesSi
            | si entoncesSi entonces


si: IF '(' expresionlog ')' '{' cuerpo  '}'
    | IF '(' expresionlog ')'  cuerpo 


entoncesSi:  entoncesSi entSi
            |entSi

entSi: ELSE IF '(' expresionlog ')' '{' cuerpo '}'
      | ELSE IF '(' expresionlog ')'  cuerpo

entonces: ELSE '{' cuerpo  '}'
         |ELSE  cuerpo 
sentenciaSwitch: SWITCH '(' expresionlog ')' switchBlock

switchBlock: '{' (decBlockGrup)?  (senDef)? '}'
            |'{' (decBlockGrup)? '}'

decBlockGrup: decBlockGrup decBlock
             |decBlock

decBlock:  switchLabel cuerpo 

switchLabel: switchLabel switchLab 
            |switchLab

switchLab: CASE expresion ':'                   

senDef : DEFAULT ':' cuerpo
          |DEFAULT ':'

sentenciaWhile: WHILE '(' expresionlog ')' '{' cuerpo '}'
sentenciaDoWhile: DO '{' cuerpo '}' WHILE '(' expresionlog ')' ';' 

sentenciaFor: FOR  expresionlog IN expresionlog '{' cuerpo '}'
sentenciaContinue:CONTINUE

sentenciaReturn:RETURN expresionlog
sentenciaBreak:BREAK
opTernario: expresionlog '?' expresionlog ':' expresionlog
opCadena: ID '.' tipoOpCadena 

tipoOpCadena: OFPOSITION '(' expresion ')'
              |SUBSTRING '(' expresion ',' expresion ')'
              |LENGTH '(' ')'
              |TOUPPERCASE '(' ')'
              |TOLOWERCASE '(' ')'
              |PUSH '(' expresionlog ')'
              |POP '(' ')'

declaracionFuncion: tipoVariable ID '(' lstParametros ')' '{' cuerpo '}'
                    |tipoVariable ID '(' ')' '{' cuerpo '}'
                    |FUNCTION ID '(' lstParametros ')' '{' cuerpo '}'
                    |FUNCTION ID '(' ')' '{' cuerpo '}'
                    |ID ID '(' lstParametros ')' '{' cuerpo '}'
                    |ID ID '(' ')' '{' cuerpo '}'
                    |VOID MAIN '(' ')' '{' cuerpo '}'
                    |VOID ID '(' ')' '{' cuerpo '}'


lstParametros: lstParametros ',' parametro 
              |parametro


parametro: tipoVariable ID
           |ID ID
           |tipoVariable '[' ']' ID
           |ID '[' ']' ID                

llamadaFuncion: ID '(' lstDatos ')'
               | ID '('  ')'
funcionesNativas: tipoVariable '.' PARSE '(' expresion ')'
                  |TOINT '(' expresion ')'
                  |TODOUBLE '(' expresion ')'
                  |STRINGNAT '(' expresion ')'
                  |TYPEOF '(' expresion ')'
incDecRemento:ID '++'
             |ID '--'
expresionlog:expresionlog '&&' expresionlog
            | expresionlog '&' expresionlog
            | expresionlog '||' expresionlog
            | '!' expresionlog
            |expresion ID
            |expresionrel

expresionrel: expresion '==' expresion
            |expresion '===' expresion
            | expresion '!=' expresion
            | expresion '<' expresion
            | expresion '>' expresion
            | expresion '<=' expresion
            | expresion '>=' expresion
            | expresion

expresion: expresion '+' expresion
            |expresion '-' expresion
            |expresion '*' expresion
            |expresion '/' expresion
            |expresion '^^' expresion
            |expresion '%' expresion
            |expresion '^' expresion
            |'-' expresion %prec UMINUS
            |'(' expresionlog ')'
            |SIN '(' expresionlog ')'
            |LOG10 '(' expresionlog ')'
            |COS '(' expresionlog ')'
            |TAN '(' expresionlog ')'
            |SQRT '(' expresionlog ')'
            |SIN '#' '(' expresionlog ')'
            |LOG10 '#' '(' expresionlog ')'
            |COS '#' '(' expresionlog ')'
            |TAN '#' '(' expresionlog ')'
            |SQRT '#' '(' expresionlog ')'
            |DECIMAL
            |NUMBER
            |CARACTER
            |CADENA
            |NULL
            |ID
            |ID '++'
            |ID '--'
            |opCadena
            |opTernario
            |funcionesNativas
            |llamadaFuncion
            |arreglo
            |asignacionStruct2
            |accesoArreglo
            |lstExp
            |copiarArreglo

lstExp: lstExp ',' expresionlog
        |expresionlog

```



## Despliegue 📦

Para el despliegue del proyecto no se requirió realizar ningún build de integración debido a que las dependencias se agregan directamente en el index.html a través de archivos javascript. Por lo tanto únicamente se accede al index.html y ya se realiza el despliegue de Quetzal G42.


## Licencia 📄

Este proyecto y todos sus componentes están basados en licencia MIT.
