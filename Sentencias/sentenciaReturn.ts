class sentenciaReturn implements Instruccion{
   

    expresion:Expresion;

    constructor(expresion:Expresion){
        this.expresion = expresion;
    }


    ejecutarInstrucciones(resultadoParcial:Array<Objeto>, entorno:Entorno):any {

        let retorno = "null";
        if(this.expresion != null){
            retorno = recorridoOperaciones(this.expresion, entorno);
        }
        return retorno;
    }
}