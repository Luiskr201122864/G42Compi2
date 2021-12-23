class auxSentenciaIf  {
   
    condicion:Object;
    lstInstrucciones:Array<Object>;
    isIf:Boolean;
    isElseIf:Boolean;

    constructor(condicion:Object, lstInst:Array<Object>, isIf:Boolean, isElseIf:Boolean){
      this.condicion = condicion;
      this.lstInstrucciones = lstInst;
      this.isIf = isIf;
      this.isElseIf = isElseIf;
    }


    ejecutarInstrucciones(resultadoParcial:Array<Objeto>, entorno:Entorno):any {

        

        
        return null;
    }
}