function traduccionSentenciaContinue(senC, ambitoA, mostrar){
    var indi = mostrar.mostrar.length -1;
    var cadCont = "";
    if(!(indi == -1)){
         if(senC.nombre == "senContinuar"){
             var ciclo = mostrar.mostrar[indi].ciclo; 
             if(ciclo =="while" || ciclo=="for" || ciclo=="forEach" ||  ciclo=="switch" || ciclo=="doWhile" ){
                 cadCont += "##------ empezando sentencia continue \n";
                 cadCont += "goto "+mostrar.mostrar[indi].etiquetaInicio+ ";\n";
 
             }
         }
     }else{
         console.log("El break no esta dentro de una ciclo!!!");
     }
    return cadCont;

}