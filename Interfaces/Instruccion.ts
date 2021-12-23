import { Entorno } from "../AST/Entorno"

interface Instruccion{
    linea:number;
    columna:number;

    ejecutarInstrucciones(resultadoParcial:Array<Objeto>, elemento:Elemento):any ;
}
