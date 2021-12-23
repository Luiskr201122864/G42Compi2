class Operacion implements Expresion{


    tipo:TipoOperacion;
    op1:Expresion;
    op2:Expresion;


    constructor(op1:Expresion, op2:Expresion, tipo:TipoOperacion){
        this.op1 = op1;
        this.op2 = op2;
        this.tipo = tipo;
    }

    constructor(op1:Expresion, tipo:TipoOperacion){
        this.op1 = op1;
        this.op2 = op2;
        this.tipo = tipo;
    }

    getValorImplicito(ent:Entorno, arbol:AST){
        
    }
   

    
}

enum TipoOperacion{
    SUMA,
    RESTA,
    MULTIPLICACION,
    DIVISION,
    MODULO,
    POTENCIA,
    NEGATIVO,
    INTEGER,
    CARACTER,
    CADENA,
    CARACTER_ARREGLO,
    IDENTIFICADOR,
    DECREMENTO,
    INCREMENTO,
    STRING,
    FLOAT,
    MAYOR_QUE,
    MENOR_QUE,
    MAYOR_IGUAL_QUE,
    MENOR_IGUAL_QUE,
    DIFERENTE_QUE,
    IGUAL_QUE,
    NOT,
    AND,
    OR,
    NOR,
    NAND,
    TRUE,
    BOOLEAN,
    FALSE, 
    CHAR, 
    NULL,
    DEFAULT,
    CONCATCAD,
    CASTEO,
    TRIPLE_IGUAL_QUE,
    DOUBLE
}