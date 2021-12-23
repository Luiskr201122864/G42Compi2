
class DeclaracionStruct{

    variable:Simbolo;
    tipoDeclaracion:String;
    lstDatos:Array<Object>;

    constructor(simbolo:Simbolo, lstDatos:Array<Object> , tipoDeclaracion:string){
        this.variable = simbolo;
        this.lstDatos = lstDatos;
        this.tipoDeclaracion = tipoDeclaracion;
    }


    ejecutarInstrucciones(resultadoParcial:Array<Objeto>, entorno:Entorno):any {
       // let entornoLocal:Entorno;

        return null;
    }


}