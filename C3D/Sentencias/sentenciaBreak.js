function traduccionSentenciaBreak(sen, ambitoA, mostrar){
    var ind = mostrar.mostrar.length -1;
    var cadBreak = "";
    if(!(ind == -1)){
        var ciclo = mostrar.mostrar[ind].ciclo; 
        if(ciclo =="while" || ciclo=="for" || ciclo=="forEach" ||  ciclo=="switch" || ciclo=="doWhile" ){
            cadBreak += "##------  empezando sentencia break \n";
            cadBreak += "goto "+mostrar.mostrar[ind].etiqueta+ ";\n";

        }
     }else{
         console.log("El break no esta dentro de una ciclo!!!");
     }
    return cadBreak;
 }
 