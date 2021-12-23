class ternario{
   
    condicion:Object;
    exp1:Object;
    exp2:Object;

    constructor(condicion:Object, exp1:Object, exp2:Object){
        this.condicion = condicion;
        this.exp1 = exp1;
        this.exp2 = exp2;
    }


    ejecutarInstrucciones(resultadoParcial:Array<Object>, entorno:Entorno):any {
       
        let valor = recorridoOperaciones(this.condicion, entorno);
        if(valor){
            let val1 = recorridoOperaciones(this.exp1, entorno);
            return val1;
        }else{
            let val2 = recorridoOperaciones(this.exp2, entorno);
            return val2;
        }

        return null;
    }
}