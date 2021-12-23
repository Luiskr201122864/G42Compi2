class cicloWhile{
   
    condicion:Object;
    lstInstrucciones:Array<Object>;

    constructor(expresion:Object , lstInstrucciones:Array<Object>){
        //this.simbolo = this.simbolo;
        this.condicion= expresion;
        this.lstInstrucciones = lstInstrucciones;
    }


    ejecutarInstrucciones(resultadoParcial:Array<Objeto>, entorno:Entorno):any {

        while(true){
            let resBool = recorridoOperaciones(this.condicion, entorno);
            if(resBool){
                let entornoLocal = new Entorno(entorno);
                let lstInstrucciones = recorridoArbol(this.lstInstrucciones,entornoLocal);
                let resultado = ejecucionArbol(lstInstrucciones, entornoLocal);
                if(resultado!=null){
                    return resultado;
                }
            }else{
                break;
            }
        }
        return null;
    }


  
}