class sentenciaPrint{
   
    
    expresion:Object;

    constructor(expresion:Object){
        this.expresion = expresion;
    }


    ejecutarInstrucciones(resultadoParcial:Array<Objeto>, entorno:Entorno):any {

        let operacion = recorridoOperaciones(this.expresion, entorno); 
        if(operacion instanceof Simbolo){
            if(operacion.valor instanceof Array){
                //Es arreglo
                let result = "["+lstExpresionFunPrint(operacion.valor)+"]";
                console.log(result);
                document.getElementById("consola").value += "[PARSER][PRINT]: " + result + "\n";
                document.getElementById("Resultados").value += "[PARSER][PRINT]: " + result + "\n";
            }else{
                console.log(operacion.valor);
                document.getElementById("consola").value += "[PARSER][PRINT]: " + operacion.valor+ "\n";
                document.getElementById("Resultados").value += "[PARSER][PRINT]: " + operacion.valor+ "\n";
            }
        }else if(operacion instanceof Array){
            //let result = "";
            let result = "";
            operacion.forEach(item=>{
                result += item+" ";
            });
            console.log("["+result+"]");
            document.getElementById("consola").value += "[PARSER][PRINT]: " + operacion + "\n";
            document.getElementById("Resultados").value += "[PARSER][PRINT]: " + operacion + "\n";

        }else{
            console.log("PRINT "+operacion);    
            document.getElementById("consola").value += "[PARSER][PRINT]: " + operacion + "\n";
            document.getElementById("Resultados").value += "[PARSER][PRINT]: " + operacion + "\n";
            //Resultados

        }
           
        return null;
    }



    function lstExpresionFunPrint(exp:Object) {
        let lstExp = "";
        exp.forEach(item=>{
            if(item instanceof Array){
                //para arreglos dentro de arreglos
                let val = "["+lstExpresionFunPrint(item)+"]";
                lstExp += val;
            }else if(item instanceof Simbolo){
                lstExp += item.valor+" ";
            }else{
                lstExp += item+" ";
            }
         });
        return lstExp; 
    }
}