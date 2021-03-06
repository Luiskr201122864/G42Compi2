# MANUAL TECNICO Quetzal 1.0 G42

## Integrantes de G42 鉁掞笍

* **Luis Carlos Valiente Salazar         -   201122864** - *Luiskr1993*
* **Daniel Alejandro Herrera Hern谩ndez   -   201213194** - *alwueso*

### Descripci贸n General 馃搵

Quetzal es un lenguaje de programaci贸n inspirado en C, su caracter铆stica principal es la inclusi贸n de tipos impl铆citos. El sistema de tipos de Quetzal realiza una formalizaci贸n de los tipos de C y Java. Esto permite a los desarrolladores definir variables y funciones tipadas sin perder la esencia. Otra inclusi贸n importante de Quetzal es la simplificaci贸n de los lenguajes C y Java para poder realizar diferentes instrucciones en menos pasos.

Adicional Quetzal tendr谩 2 flujos, se podr谩 interpretar el c贸digo fuente ingresado y efectuar todas sus instrucciones, o bien se puede traducir este lenguaje a un lenguaje intermedio basado en un lenguaje de 3 direcciones, este se podr谩 ejectuar posteriormente en cualquier compilador de C, tomando en cuenta las reglas especificas de un lenguaje de 3 direcciones.


### Framework Utilizado 馃敡

Para la construcci贸n del proyecto no se utiliz贸 ning煤n framework, se construy贸 煤nicamente utilizando clases de javascript, css y archivos html. 

## Dependencias de Quetzal G42 鈿欙笍

Debido a que el proyecto no se construy贸 utilizando ning煤n framework, fue necesario agregar dependencias de algunas herramientas externas para m贸dulos espec铆ficos de Quetzal. A continuaci贸n se describen dichas dependencias:

### CodeMirror 馃敥

Ya que Quetzal en principio pone a disposici贸n del usuario una secci贸n de texto para cargar archivos C/Java, o bien escribir directamente las sentencias de c贸digo en la secci贸n, era necesario dar un formato adecuado que mostrara al usuario el detalle de l铆neas escritas. Para eso se utiliz贸 CodeMirror a trav茅s de la importaci贸n de un plugin obtenido desde la p谩gina oficial de la herramienta:

* **https://codemirror.net/mode/java/index.html**

### Viz.js 馃敥

Para la generaci贸n de gr谩ficas de 谩rbol AST fue necesario agregar las dependencias de Viz.js la cual es una herramienta con licencia MIT que permite la generaci贸n de grafos a partir de una entrada de texto trasladada.

### Jison 馃敥

Esta herramienta fue necesaria para la generaci贸n de la gram谩tica y una clase javascript que permite ejecutar un parser sobre una cadena de entrada. Se utiliz贸 para parsear las entradas de codigo C/Java. Para la utilizaci贸n de jison se realiz贸 una instalaci贸n global de dicha herramienta a trav茅s de la cadena en consola:

```bash
npm install -g jison
```
Al haber generado un archivo .jison donde se incluy贸 la gram谩tica del lenguaje en cuesti贸n (XML y XPATH) se gener贸 la clase javascript para la ejecuci贸n del parser desde la interfaz gr谩fica de TytusX G27. La generaci贸n de la gram谩tica .js se realiza de la siguiente forma: 

```bash
jison ./Luiskr201122864/G42Compi2/Gramatica/gramatica.jison
```

### Clases de AST, Expresiones, Instrucciones e Interfaces 馃敥

Debido a que el parser generado por jison se ejecuta a trav茅s de una clase javascript, al no tener ning煤n servidor intermedio corriendo como node hace que desde la gram谩tica no se pudieran generar imports de las clases generadas para AST, Expresiones, Instrucciones e Interfaces. Para hacer que los objetos relacionados a estas clases fueran visibles y utilizables desde cualquier clase javascript, incluyendo la gram谩tica, se agregaron las referencias de todos los archivos necesarios en la p谩gina index.html: 

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
## Gram谩ticas  馃搫

A continuaci贸n se describen las gram谩ticas generadas para Quetzal:

### Gram谩tica Ascendente XML

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



## Despliegue 馃摝

Para el despliegue del proyecto no se requiri贸 realizar ning煤n build de integraci贸n debido a que las dependencias se agregan directamente en el index.html a trav茅s de archivos javascript. Por lo tanto 煤nicamente se accede al index.html y ya se realiza el despliegue de Quetzal G42.


## Licencia 馃搫

Este proyecto y todos sus componentes est谩n basados en licencia MIT.
