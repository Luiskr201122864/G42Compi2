class Funcion{
   

    tipo:String;
    id:String;
    lstPar:Object;
    lstInt:Object;
    tipoFuncion:String;

    constructor(tipo:String, id:String, lstPar:Object, lstIns:Object, tipoFuncion:String ){
        this.tipo = tipo;
        this.id = id;
        this.lstPar = lstPar;
        this.lstInt = lstIns;
        this.tipoFuncion = tipoFuncion;
    }


    ejecutarInstrucciones(resultadoParcial:Array<Objeto>, entorno:Entorno):any {

        let lstIntruccionesFun = recorridoArbol(this.lstInt.instruccion, entorno);
        let retorno = ejecucionArbol(lstIntruccionesFun, entorno);
        if(retorno!=null){
            return retorno;
        }
        
        return null;
    }

    



}