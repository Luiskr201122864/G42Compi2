class sentenciaSwitch{
   
    
    expresion:Object;
    lstCase:Array<Sentencia_Case>;
    senDefault:Object;

    constructor(expresion:Object , lstCase:Array<Sentencia_Case>, senDefault:Object){
        this.expresion = expresion;
        this.lstCase = lstCase;
        this.senDefault = senDefault;
    }


    ejecutarInstrucciones(resultadoParcial:Array<Object>, entorno:Entorno):any {

        let resultado = recorridoOperaciones(this.expresion, entorno);
        let defaultEj = true;

        for(let x in this.lstCase){
            let item = this.lstCase[x];
            let op = recorridoOperaciones(item.expresion, entorno);
            if(op == resultado){
                let entornoLocal = new Entorno(entorno);
                let lstInstrucciones = recorridoArbol(item.lstInstrucciones.instruccion, entornoLocal);
                let resultado = ejecucionArbol(lstInstrucciones, entornoLocal);
                if(resultado != null){
                    
                    if(resultado == "break"){
                        defaultEj = false;
                         break; 
                     }else{
                         return resultado;
                     }
                 }
             }
        }
         if(defaultEj){
             let entornoLocal = new Entorno(entorno);
             let lstInstrucciones = recorridoArbol(this.senDefault, entornoLocal);
             let resultado = ejecucionArbol(lstInstrucciones, entornoLocal);
             if(resultado!=null){
                 return resultado;
             }
        }
        
        

        return null;
    }
}