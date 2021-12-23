class Simbolo implements Expresion {
    public identificador: string;
    private valor: any;
    private tipo: String;
    linea: number;
    columna: number;
    tipoVar:number;

    constructor(tipo:String, id:string, linea:number, columna:number, valor:any, tipoVar:number){
        this.identificador = id;
        this.linea = linea;
        this.columna = columna;
        this.tipo = tipo
        this.valor = valor;
        this.tipoVar = tipoVar;
    }

    public setValor (valor:any ){
        this.valor= valor;
    }

    getTipo(ent: Entorno, arbol: AST): String {
        return this.tipo;
    }
    getValorImplicito(ent: Entorno, arbol: AST) {
        return this.valor;
    }
}