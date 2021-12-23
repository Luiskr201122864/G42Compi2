class cicloDoWhile{
   
    condicion:Object;
    lstInstrucciones:Array<Object>;

    constructor(expresion:Object , lstInstrucciones:Array<Object>){
        this.condicion = expresion;
        this.lstInstrucciones = lstInstrucciones;
    }


    ejecutarInstrucciones(resultadoParcial:Array<Objeto>, entorno:Entorno):any {

        do{
            let entornoLocal = new Entorno(entorno);
            let lstInstrucciones2 = recorridoArbol(this.lstInstrucciones,entornoLocal);
            let resultado = ejecucionArbol(lstInstrucciones2, entornoLocal);
            if(resultado!=null){
                return resultado;
            }
        }
        while(this.retornarBooleano(this.condicion, entorno));
        return null;
    }

    retornarBooleano(expresion:Object, entorno:Entorno):any
    {
        let resultado = recorridoOperaciones(expresion, entorno);
        return resultado;
    }
}