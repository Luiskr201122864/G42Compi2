
class DeclaracionVariable{

    tipo:String;
    variable:Simbolo;
    expresion:Object;
    tipoDeclaracion:String;

    constructor(simbolo:Simbolo, expresion:Object , tipoDeclaracion:string){
        this.variable = simbolo;
        this.expresion = expresion;
        this.tipoDeclaracion = tipoDeclaracion;
    }


    ejecutarInstrucciones(resultadoParcial:Array<Objeto>, entorno:Entorno):any {
        console.log("ESTAMOS ACA EN DECLARACION");
        

        //declaracion

        if(!entorno.existeEnactual(this.variable.identificador)){
            if(this.tipoDeclaracion == "declaracion2"){
                //int a
                let val = null;
                if(this.variable.tipo == "int"){
                    val = 0;
                }else if(this.variable.tipo == "String"){
                    val = "";
                }else if(this.variable.tipo == "double"){
                    val = 0.0;
                }else if(this.variable.tipo == "char"){
                    val = '';
                }
                this.variable.valor = val;
                entorno.agregar(this.variable.identificador, this.variable);

            }else if(this.tipoDeclaracion == "declaracion"){
                //int a = 10
                let operacion = recorridoOperaciones(this.expresion, entorno);
                // si no existe entonces creamos
                if(this.variable.tipo == getTipoValor(operacion)){
                    /*si el tipo de declaracion y el tipo de 
                       resultado es igual entonces guardamos*/
                    this.variable.valor = operacion;
                    entorno.agregar(this.variable.identificador, this.variable);
                }else{
                    if (this.variable.tipo == "double" && getTipoValor(operacion) == "int"){
                        //5.Si los tipos son iguales entonces se guarda el valor en el símbolo y se agrega al entorno.
                        this.variable.valor = operacion;
                        entorno.agregar(this.variable.identificador, this.variable);
                    }else{
                        /**El tipo de declaracion y el valor asignado no coinciden */
                        console.log("ERROR - Declaracion variable");
                    }
                }
            }
        }
        return null;
    }


}