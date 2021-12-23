class DeclaracionArreglo2{
   
    tipo:String;
    variable:Simbolo;
    expresion:Object;
    tipoDeclaracionArr:String;

    constructor(tipo:String, simbolo:Simbolo, expresion:Object , tipoDeclaracionArr:string){
        this.tipo = tipo;
        this.variable = simbolo;
        this.expresion = expresion;
        this.tipoDeclaracionArr = tipoDeclaracionArr;
    }


    ejecutarInstrucciones(resultadoParcial:Array<Objeto>, entorno:Entorno):any {

        
        if(this.tipoDeclaracionArr == "declaracionArr3"){
            let copia = recorridoOperaciones(this.expresion, entorno);
            if(copia != null && copia.valor instanceof Array){
                let simbolo = entorno.getSimbolo(this.variable.identificador);
                if(simbolo==null){
                    if(copia.tipo == this.tipo){
                        this.variable.tipo = this.tipo;
                        this.variable.valor = copia.valor;
                        entorno.agregar(this.variable.identificador, this.variable);
                    }
                }
            }
        }else if(this.tipoDeclaracionArr == "declaracionArr5"){
            let simbolo = entorno.getSimbolo(this.variable.identificador);
            if(simbolo==null){
                this.variable.tipo = this.tipo;
                entorno.agregar(this.variable.identificador, this.variable);
            }
        }else if(this.tipoDeclaracionArr == "declaracion4"){
            let simbolo = entorno.getSimbolo(this.variable.identificador);
            if(simbolo==null){
                this.variable.tipo = this.tipo;
                entorno.agregar(this.variable.identificador, this.variable);
            }
        }
        return null;
    }
}