class Elemento implements Instruccion{
    valor:string;
    tipo:string;

    constructor(valor:string, tipo:string){
        this.valor = valor;
        this.tipo = tipo;
    }

    ejecutarInstrucciones(objetoRaiz:Array<Objeto>, elementoABuscar:Elemento): Array<Objeto>{
        let listaRetorno : Array <Objeto> = [];
        if (Array.isArray(objetoRaiz)){
            objetoRaiz.forEach( function(value){
                if (elementoABuscar.tipo == "Operacion"){
                    listaRetorno = listaRetorno.concat(value.obtenerObjetos(elementoABuscar.valor));
                }
            });
        }

        return listaRetorno;
    }
}