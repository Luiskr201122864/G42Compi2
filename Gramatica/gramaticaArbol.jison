/* description: Parses and executes mathematical expressions. */

/* lexical grammar */
%lex
%%

\s+                   /* skip whitespace */

/*-------------- Expresiones regulares --------------*/
"//"[^\n]*                      /*comentario lineal*/ 
"/*"[^"/#"]*"*/"                /*comentario multilineal*/
[0-9]+"."[0-9]+       return 'DECIMAL'
[0-9]+                return 'NUMBER'
"'"[^"'"]"'"      	  return 'CARACTER'
"\""[^"\""]*"\""	  return 'CADENA'
/*[0-9]+("."[0-9]+)?\b  return 'NUMBER';*/

/* ----------------- Simbolos ----------------------- */

"*"                   return '*';
"."                   return '.';
"/"                   return '/';
"++"                   return '++';
"--"                   return '--';
"-"                   return '-';
"+"                   return '+';
"^"                   return '^';
"%"                   return '%';
"("                   return '(';
")"                   return ')';
";"                   return ';';
":"                   return ':';
"["                   return '[';
"]"                   return ']';
"{"                   return '{';
"}"                   return '}';
","                   return ',';
"==="                 return '==='
"=="                  return '=='
"="                   return '=';
"!="                  return '!='
"<="                  return '<='
">="                  return '>='
"<"                   return '<'
">"                   return '>'
"||"                  return '||'
"&&"                  return '&&'
"&"                   return '&'
"|&"                  return '|&'
"!"                   return '!'
"="                   return '='
"$"                   return '$'
"!"                   return '!';
"?"                   return '?';
"#"                   return '#';

/*----------------- Palabras reservadas ---------------*/

"null"                  return 'NULL'
"int"                   return 'INT'
"double"		return 'DOUBLE'
"boolean"		return 'BOOLEAN'
"String"                return 'STRING'
"char"                  return 'CHAR'
"toInt"		        return 'TOINT'
"toDouble"              return 'TODOUBLE'
"typeof"		return 'TYPEOF'
"string"                return 'STRINGNAT'
"print"                 return 'PRINT';
"println"               return 'PRINTLN';
"if"			return 'IF'
"else"			return 'ELSE'
"switch"		return 'SWITCH'
"case"			return 'CASE'
"default"		return 'DEFAULT'
"break"			return 'BREAK'
"continue"		return 'CONTINUE'
"return"		return 'RETURN'
"struct"		return 'STRUCT'
"for"			return 'FOR'
"while"			return 'WHILE'
"sin"		        return 'SIN'
"log10"		        return 'LOG10'
"cos"			return 'COS'
"tan"			return 'TAN'
"sqrt"			return 'SQRT'
"caracterOfPosition"	return 'OFPOSITION'
"subString"             return 'SUBSTRING'
"length"                return 'LENGTH'
"toUppercase"           return "TOUPPERCASE"
"toLowercase"           return "TOLOWERCASE"
"parse"                 return "PARSE"
"push"                  return "PUSH"
"pop"                   return "POP"
"main"                  return "MAIN"
"void"                  return "VOID"
"do"                    return "DO"
"function"              return "FUNCTION"
"in"                    return "IN"
"begin"                 return "BEGIN"
"end"                   return "END"


(("_"[A-Za-z])|[A-Za-z])([A-Za-z0-9]|"_")*	return 'ID'

<<EOF>>               return 'EOF';
.                     return 'INVALID';


/lex

/*----------------- Precedencia de operadores ---------------*/

%left '+' '-'
%left '*' '/'
%left '^'
%right '!'
%right '%'
%left UMINUS
%token INVALID

%start inicio

%% /* language grammar */

/*----------------- Inicio e Instrucciones ---------------*/

inicio: cuerpo EOF{
           return $1;
        };

cuerpo: cuerpo instrucciones{
            $1.instruccion.push($2);
            $$ = $1;
        }
       |instrucciones{
            $$ = { instruccion : [$1] };
        };

instrucciones: expresionlog{
                    $$ = $1;
            }
        /*declaracionVariable ';' {
                   $$ = $1;
              }
             |declaracionVariable2 ';'{
                   $$ = $1;
             }
             |asignacionVariable ';'{
                  $$ = $1;
             }
             |comentarios ';'{
                 $$ = $1;
             }
             |declaracionStruct ';'{
                $$ = $1;
             }
             |declaracionStruct2 ';'{
                $$ = $1;
             }
             |asignacionStruct ';'{
                $$ = $1;
             }
             |sentenciaBreak ';'{
                 $$ = $1;
             }
             |sentenciaContinue ';'{
                 $$ = $1;
             }
             |sentenciaReturn ';'{
                 $$ = $1;
             }
             |sentenciaIf{
                 $$ = $1;
             }
             |sentenciaSwitch{
                $$ = $1;
             }
             |sentenciaWhile{
                $$ = $1;
             }
             |sentenciaFor{
                $$ = $1;
             }
             |sentenciaDoWhile{
                $$ = $1;
             }
             |declaracionArreglo ';'{
                $$ = $1;
             }
             |asignacionArreglo ';'{
                $$ = $1;
             }
             |declaracionFuncion{
                $$ = $1;
             }
             |llamadaFuncion ';'{
                $$ = $1;
             }
             |incDecRemento ';'{
                $$ = $1;
             }
             |opCadena ';'{
                $$ = $1;
             }*/
            ;


/*-------------------------------------------------------------------- COMENTARIOS ------------------------------------------------------------------------------*/

comentarios: PRINT '('  expresionlog ')' {
                $$ = {nombre:"sentPrint", expresion:$3};  
            }
           | PRINTLN '(' expresionlog  ')'{
                $$ = {nombre:"sentPrintln", expresion:$3};  
           } ;

/*-------------------------------------------------------------  DECLARACION DE VARIABLE --------------------------------------------------------------------------*/

tipoVariable: DOUBLE{
                  $$ = $1;
             }
             |INT{
                  $$ = $1;
             }
             |STRING{
                  $$ = $1;
             }
             |BOOLEAN{
                  $$ = $1;
             }
             |CHAR{
                  $$ = $1;     
             };

declaracionVariable: tipoVariable  ID '=' expresionlog{
                         $$ = {nombre : "declaracion", tipo:$1, id:$2 , exp:$4};
                    }
                    | tipoVariable ID {
                          $$ = {nombre : "declaracion2", tipo:$1, id:$2};
                    };

declaracionVariable2:tipoVariable ID ',' lstID '=' expresionlog{
                         $$ = {nombre : "declaracionLst", tipo:$1, id:$2, lstId:$4 , exp:$6};
                    }
                    |tipoVariable ID ',' lstID {
                         $$ = {nombre : "declaracionLst2", tipo:$1, id:$2, lstId:$4};   
                    };

asignacionVariable: ID '=' expresionlog {
                        $$ = {nombre : "asignacion", id:$1, exp:$3};  
                   };

lstID : lstID ',' ID{
            $1.push($3);
            $$ = $1;
        }
        |ID{
            $$ = [$1];
        };

/*------------------------------------------------------------------- DECLARACION DE ARREGLO -----------------------------------------------------------------------------*/

declaracionArreglo : tipoVariable ID '=' arreglo{
                        $$ = {nombre : "declaracionArr", tipo:$1, id:$2 , arr:$4};
                    }
                    |tipoVariable '[' ']' ID '=' arreglo{
                         $$ = {nombre : "declaracionArr2", tipo:$1, id:$4 , arr:$6};
                    } 
                    |tipoVariable '[' ']' ID '=' copiarArreglo{
                         $$ = {nombre : "declaracionArr3", tipo:$1, id:$4 , arr:$6};
                    } 
                    |tipoVariable '[' ']' ID '=' expresionlog{
                          $$ = {nombre : "declaracionArr4", tipo:$1, id:$4 , exp:$6};
                    } ;

asignacionArreglo : ID '=' arreglo{
                        $$ = {nombre : "asignacionArr",  id:$1 , arr:$3};
                  }
                  |ID arreglo '=' expresionlog{
                        $$ = {nombre : "asignacionArr2", id:$1, arr:$2, exp:$4 };
                  };

arreglo : '[' lstArreglo ']'{
                $$ = $1;
         }
         |'[' expresion ']'{
                $$ = $1;
         };

accesoArreglo: ID '[' expresionlog ':' expresionlog ']'{
                $$ = {nombre : "accesoArr", id:$1, exp:$3, exp2:$5 };
              }
             |ID '[' expresionlog ':' END ']'{
                $$ = {nombre : "accesoArrEnd", id:$1, exp:$3 };
             }
             |ID '[' BEGIN ':' expresionlog ']'{
                $$ = {nombre : "accesoArrBegin", id:$1, exp:$5 };
             }
             |ID '[' BEGIN ':' END ']'{
                $$ = {nombre : "accesoArrBeginEnd", id:$1 };
             }
             |ID '[' expresionlog ']'{
                $$ = {nombre : "accesoArr2", id:$1, exp:$3 };
             };

copiarArreglo: '#' ID{
                $$ = {nombre : "copiaArr", id:$2 };
             }
             |ID '#'{
                $$ = {nombre : "copiaArr", id:$1 };
             };


lstArreglo : lstArreglo lstDatos{
                $1.push($2);
                $$ = $1;
             }    
            | lstDatos{
                $$ = [$1];      
            };

lstDatos : lstDatos ',' expresionlog{
                $1.push($3);
                $$ = $1;
          }
          | lstDatos ',' arreglo{
                $1.push($3);
                $$ = $1;
          }
          | lstDatos ',' contenidoStruct{
                $1.push($3);
                $$ = $1;
          }
          | contenidoStruct{
                $$ = [$1];
          }
          | expresionlog{
                $$ = [$1];
          }
          | arreglo{
                $$ = [$1];
          };

/*----------------------------------------------------------------------- DECLARACION STRUCT -------------------------------------------------------------------------------*/

declaracionStruct: STRUCT ID '{' lstDatos '}'{
                        $$ = {nombre : "declaracionStruct", id:$2 , lstCont:$4};
                  };

declaracionStruct2: ID ID{
                      $$ = {nombre : "declaracionStruct2", id:$1 , id2:$2};
                  };

asignacionStruct: ID ID '=' ID '(' lstDatos ')' {
                      $$ = {nombre : "declaracionObj", padre:$1, id:$2 , padre2:$4, lstExp:$6 };
                  }
                 | ID '=' ID '(' lstDatos ')'{
                      $$ = {nombre : "asignacionObj",  id:$1 , padre:$3, lstExp:$5 };
                 }
                 | ID '.' tipoOpCadena{
                     $$ = {nombre : "asignacionObjCad",  id:$1 , op:$3 };
                 }
                 |ID '.' lstID2 '=' expresionlog{
                     $$ = {nombre : "asignacionObjExp",  id:$1 , lstID:$3, exp:$5 };
                 };

asignacionStruct2:ID '.' lstID2{
                      $$ = {nombre : "asignacionObjExp2",  id:$1 , lstID:$3};  
                 };

contenidoStruct: declaracionVariable{
                    $$ = $1;
                 }
                 | declaracionArreglo{
                     $$ = $1;
                 }
                 | asignacionStruct{
                     $$ = $1;
                 }
                 | declaracionStruct2{
                     $$ = $1;
                 };

lstID2 : lstID2 '.' ID{
            $1.push($3);
            $$ = $1;
        }
        |ID{
            $$ = [$1];
        };

/*------------------------------------------------------------------------ SENTENCIA IF --------------------------------------------------------------------------------------*/

sentenciaIf: si{
                $$ = { nombre:"if_simple", sentIf:$1 };
            }
            | si entonces{
                $$ = { nombre:"if_else", senIf:$1, else:$2 };
            }
            | si entoncesSi{
                $$ = { nombre:"if_ifElse", senIf:$1, senElseIf:$2 };
            }
            | si entoncesSi entonces{
                $$ = { nombre:"if_extremo", senIf:$1, senIfElse:$2, senElse:$3};
            };


si: IF '(' expresionlog ')' '{' cuerpo  '}'{
         $$ = { nombre:"if", expresion:$3, instrucciones:$6, tipo:0 };
     }
    | IF '(' expresionlog ')'  cuerpo {
        $$ = { nombre:"if", expresion:$3, instrucciones:$5, tipo:0 };
    };


entoncesSi:  entoncesSi entSi{
                $1.push($2);
                $$ = $1;
            }
            |entSi{
                 $$ = [$1];
            };

entSi: ELSE IF '(' expresionlog ')' '{' cuerpo '}'{
           $$ = { nombre:"elseif", expresion:$4, instrucciones:$7, tipo:0 };
        }
      | ELSE IF '(' expresionlog ')'  cuerpo{
          $$ = { nombre:"elseif", expresion:$4, instrucciones:$6, tipo:0 };
      } ;

entonces: ELSE '{' cuerpo  '}'{
            $$ = { nombre:"else", instrucciones:$3, tipo:0 };
        }
         |ELSE  cuerpo {
            $$ = { nombre:"else", instrucciones:$2, tipo:0 };
         };

/* ---------------------------------------------------------------------- SENTENCIA SWITCH ---------------------------------------------------------------------------------*/

sentenciaSwitch: SWITCH '(' expresionlog ')' switchBlock{
                   $$ ={ nombre:"sentenciaSwitch", expresion:$3, cuerpoSwitch:$5 }; 
                };

switchBlock: '{' (decBlockGrup)?  (senDef)? '}'{
                 $$ ={ blockG:$2, label:$3 };
            }
            |'{' (decBlockGrup)? '}'{
                 $$ ={ blockG:$2};
            };

decBlockGrup: decBlockGrup decBlock{
                 $1.push($2);
                 $$ =$1;
              }
             |decBlock{
                 $$ =[$1];
             };

decBlock:  switchLabel cuerpo {
                $$ = { tipoCaso:$1, instrucciones:$2 };
          };

switchLabel: switchLabel switchLab {
                $1.push($2);
                $$ = $1;
            }   
            |switchLab{
                $$ = [$1];
            };

switchLab: CASE expresion ':'{
                $$ = { nombre:"case", expresion:$2 };
           };                    

senDef : DEFAULT ':' cuerpo{
                $$ = { nombre:"defaultExp", instrucciones:$3 };
          }
          |DEFAULT ':'{
                 $$ = { nombre:"default" };
          }; 


/* ---------------------------------------------------------------------- SENTENCIA WHILE ---------------------------------------------------------------------------------*/

sentenciaWhile: WHILE '(' expresionlog ')' '{' cuerpo '}'{
                   $$ = { nombre:"sentenciaWhile", expresion:$3, instrucciones:$6 };
                };

/* ---------------------------------------------------------------------- SENTENCIA DO WHILE ---------------------------------------------------------------------------------*/

sentenciaDoWhile: DO '{' cuerpo '}' WHILE '(' expresionlog ')' ';' {
                   $$ = { nombre:"sentenciaDoWhile", expresion:$7, instrucciones:$3 };
                };

/* ---------------------------------------------------------------------- SENTENCIA FOR ---------------------------------------------------------------------------------*/

sentenciaFor: FOR  expresionlog IN expresionlog '{' cuerpo '}'{
                $$ = { nombre:"sentenciaFor", exp1:$2, exp2:$4, instrucciones:$6 };
              };

/* ---------------------------------------------------------------------- SENTENCIAS DE TRANSFERENCIA ---------------------------------------------------------------------------------*/
sentenciaContinue:CONTINUE{
                    $$ = {nombre:"sentenciaContinue"};
                  };

sentenciaReturn:RETURN expresionlog{
                    $$ = {nombre:"sentenciaReturn", exp:$2 };
                };  

sentenciaBreak:BREAK{
                   $$= {nombre:"sentenciaBreak"};
               };      

/*----------------------------------------------------------------------------- OPERADOR TERNARIO  --------------------------------------------------------------------------------*/

opTernario: expresionlog '?' expresionlog ':' expresionlog{
                $$ = { nombre:"ternario", exp1:$1, exp2:$3, exp3:$5 };
            };

/*----------------------------------------------------------------------------- CADENAS --------------------------------------------------------------------------------*/

opCadena: ID '.' tipoOpCadena {
            $$ = {nombre : "operacionCad", id:$1, op:$3 };
          };

tipoOpCadena: OFPOSITION '(' expresion ')'{
                 $$ = {nombre : "opCadOfPosition", exp:$3 };
              }
              |SUBSTRING '(' expresion ',' expresion ')'{
                 $$ = {nombre : "opCadSubString", exp1:$3, exp2:$5 };
              }
              |LENGTH '(' ')'{
                  $$ = {nombre : "opCadLength" };
              }
              |TOUPPERCASE '(' ')'{
                   $$ = {nombre : "opCadUpper"};
              }
              |TOLOWERCASE '(' ')'{
                   $$ = {nombre : "opCadLower" };
              }
              |PUSH '(' expresionlog ')'{
                   $$ = {nombre : "opCadPush", exp:$3 };
              }
              |POP '(' ')'{
                   $$ = {nombre : "opCadPop" };
              };


/*----------------------------------------------------------------------------- FUNCION --------------------------------------------------------------------------------*/

declaracionFuncion: tipoVariable ID '(' lstParametros ')' '{' cuerpo '}'{
                         $$ = { nombre : "funcion", tipo:$1, id:$2, lstPar:$4, lstInst:$7 };
                    }
                    |tipoVariable ID '(' ')' '{' cuerpo '}'{
                         $$ = { nombre : "funcion2", tipo:$1, id:$2, lstInst:$6 };
                    }
                    |FUNCTION ID '(' lstParametros ')' '{' cuerpo '}'{
                         $$ = { nombre : "funcion3", id:$2, lstPar:$4, lstInst:$7 };
                    }
                    |FUNCTION ID '(' ')' '{' cuerpo '}'{
                        $$ = { nombre : "funcion4", id:$2, lstInst:$6 };
                    }
                    |ID ID '(' lstParametros ')' '{' cuerpo '}'{
                        $$ = { nombre : "funcion5", id:$1, id:$2, lstPar:$4, lstInst:$7 };
                    }
                    |ID ID '(' ')' '{' cuerpo '}'{
                        $$ = { nombre : "funcion6", id:$1, id:$2, lstInst:$6 };
                    }
                    |VOID MAIN '(' ')' '{' cuerpo '}'{
                        $$ = { nombre : "funcion7",  lstInst:$6 };
                    }
                    |VOID ID '(' ')' '{' cuerpo '}'{
                        $$ = { nombre : "funcion8", id:$2, lstInst:$6 };
                    };


lstParametros: lstParametros ',' parametro {
                 $1.push($3);
                 $$ = $1;
              }
              |parametro{
                 $$ = [$1];
              };


parametro: tipoVariable ID{
                $$ = { nombre : "declaracion2", tipo:$1, id:$2 };
           } 
           |ID ID{
                $$ = { nombre : "declaracionStruct2", id:$1, id2:$2 };
           }
           |tipoVariable '[' ']' ID{
                 $$ = { nombre : "declaracionArr5", tipo:$1, id:$4 };
           }
           |ID '[' ']' ID{
                $$ = { nombre : "declaracion4", id:$1, id2:$4 };
           };                

llamadaFuncion: ID '(' lstDatos ')'{
                   $$ = { nombre : "llamadaFuncion", id:$1, lstPar:$3 };  
                }
               | ID '('  ')'{
                   $$ = { nombre : "llamadaFuncion2", id:$1 };  
               };

/*------------------------------------------------------------------------- FUNCIONES NATIVAS --------------------------------------------------------------------------------*/

funcionesNativas: tipoVariable '.' PARSE '(' expresion ')'{
                        $$ = { nombre : "funNatParse", tipo:$1, exp:$5 };
                  }
                  |TOINT '(' expresion ')'{
                        $$ = { nombre : "funNatToInt", exp:$3 };
                  }
                  |TODOUBLE '(' expresion ')'{
                        $$ = { nombre : "funNatToDouble", exp:$3 };
                  }
                  |STRINGNAT '(' expresion ')'{
                        $$ = { nombre : "funNatToString", exp:$3 };
                  }
                  |TYPEOF '(' expresion ')'{
                        $$ = { nombre : "funNatTypeOf", exp:$3 };
                  };

/* ---------------------------------------------------------------------- INCREMENTO Y DECREMENTO ---------------------------------------------------------------------------------*/
incDecRemento:ID '++'{
                $$ = {nombre:"incremento", tipo:"incremento", id:$1};
              }
             |ID '--'{
                 $$ = {nombre:"decremento", tipo:"decremento",id:$1};    
             };

/*----------------------------------------------------------------------------- EXPRESION --------------------------------------------------------------------------------*/


expresionlog:expresionlog '&&' expresionlog{
                //$$ = new Operacion($1, $3, Operacion.TipoOperacion.AND);
                $$ = { nombre : "expresion", tipo : $2, op1: $1, op2: $3 };
            }
            | expresionlog '&' expresionlog{
                //$$ = new Operacion($1, $3, Operacion.TipoOperacion.CONCATCAD);    
                $$ = { nombre : "expresion", tipo : $2, op1: $1, op2: $3 }; 
            }
            | expresionlog '||' expresionlog{
                $$ = { nombre : "expresion", tipo : $2, op1: $1, op2: $3 };
                //$$ = new Operacion($1, $3, Operacion.TipoOperacion.OR);
            }
            | '!' expresionlog{
                $$ = { nombre : "expresion", tipo:$1, op1: $2 };
                //$$ = new Operacion($1, Operacion.TipoOperacion.NOT);
            }
            |expresion ID{
                $$ = { tipo:"casteoId", id:$1, exp:$2 };
                //$$ = new Operacion($1, Operacion.TipoOperacion.CASTEO);
            }
            |expresionrel{
                $$ = $1;
            }
            ;

expresionrel: expresion '==' expresion{
                $$ = { nombre : "expresion", tipo : $2, op1: $1, op2: $3 };
                //$$ = new Operacion($1, $3, Operacion.TipoOperacion.IGUAL_QUE);
            }
            |expresion '===' expresion{
                $$ = { nombre : "expresion", tipo : $2, op1: $1, op2: $3 };
                //$$ = new Operacion($1, $3, Operacion.TipoOperacion.TRIPLE_IGUAL_QUE);
            }
            | expresion '!=' expresion{
                $$ = { nombre : "expresion", tipo : $2, op1: $1, op2: $3 };
                //$$ = new Operacion($1, $3, Operacion.TipoOperacion.DIFERENTE_QUE);
            }
            | expresion '<' expresion{
                $$ = { nombre : "expresion", tipo : $2, op1: $1, op2: $3 };
                //$$ = new Operacion($1, $3, Operacion.TipoOperacion.MENOR_QUE);

            }
            | expresion '>' expresion{
                $$ = { nombre : "expresion", tipo : $2, op1: $1, op2: $3 };
                //$$ = new Operacion($1, $3, Operacion.TipoOperacion.MAYOR_QUE);
            }
            | expresion '<=' expresion{
                $$ = { nombre : "expresion", tipo : $2, op1: $1, op2: $3 };
                //$$ = new Operacion($1, $3, Operacion.TipoOperacion.MENOR_IGUAL_QUE);
            }
            | expresion '>=' expresion{
                $$ = { nombre : "expresion", tipo : $2, op1: $1, op2: $3 };
                //$$ = new Operacion($1, $3, Operacion.TipoOperacion.MAYOR_IGUAL_QUE);
            }
            | expresion{
                $$ = $1;
            }
            ;

expresion: expresion '+' expresion{
                $$ = { nombre : "expresion", tipo : $2, op1: $1, op2: $3 };
            }
            |expresion '-' expresion{
                $$ = { nombre : "expresion", tipo : $2, op1: $1, op2: $3 };
            }
            |expresion '*' expresion{
                $$ = { nombre : "expresion", tipo : $2, op1: $1, op2: $3 };
            }
            |expresion '/' expresion{
                $$ = { nombre : "expresion", tipo : $2, op1: $1, op2: $3 };
            }
            |expresion '^^' expresion{
                $$ = { nombre : "expresion", tipo : $2, op1: $1, op2: $3 };
            }
            |expresion '%' expresion{
                $$ = { nombre : "expresion", tipo : $2, op1: $1, op2: $3 };
            }
            |expresion '^' expresion{
                $$ = { nombre : "expresion", tipo : $2, op1: $1, op2: $3 };
            }
            |'-' expresion %prec UMINUS{
                $$ = {nombre : "expresion", tipo: "neg", op1: $2 };
            }
            |'(' expresionlog ')'{
                $$ = $2;
            }
            |SIN '(' expresionlog ')'{
                $$ = { nombre:"funSin", exp:$3 };
            }
            |LOG10 '(' expresionlog ')'{
                $$ = { nombre:"funLog", exp:$3 };
            }
            |COS '(' expresionlog ')'{
                $$ = { nombre:"funCos", exp:$3 };
            }
            |TAN '(' expresionlog ')'{
                $$ = { nombre:"funTan", exp:$3 };
            }
            |SQRT '(' expresionlog ')'{
                $$ = { nombre:"funSQRT", exp:$3 };
            }
            |SIN '#' '(' expresionlog ')'{
                $$ = { nombre:"funSinNum", exp:$4 };
            }
            |LOG10 '#' '(' expresionlog ')'{
                $$ = { nombre:"funLogNum", exp:$4 };
            }
            |COS '#' '(' expresionlog ')'{
                $$ = { nombre:"funCosNum", exp:$4 };
            }
            |TAN '#' '(' expresionlog ')'{
                $$ = { nombre:"funTanNum", exp:$4 };
            }
            |SQRT '#' '(' expresionlog ')'{
                $$ = { nombre:"funSQRTNum", exp:$4 };
            }
            |DECIMAL{
                $$ = {nombre : "expresion", tipo: "double", valor: $1 };
            }
            |NUMBER{
                $$ = {nombre : "expresion", tipo: "integer", valor: $1 };
            }
            |CARACTER{
                $$ = {nombre : "expresion", tipo: "char", valor: $1 };
            }
            |CADENA{
               $$ = {nombre : "expresion", tipo: "string", valor: $1 };     
            }
            |NULL{
                $$ = {nombre : "expresion", tipo: "null", valor: $1 };
            }
            |ID{
                $$ = {nombre : "expresion",  tipo: "id",  valor: $1 };
            }
            |ID '++'{
                $$ = {tipo: "incrementro", id:$1}
            }
            |ID '--'{
                $$ ={ tipo:"decremento", id:$1};
            }
           /* |opCadena{
                    $$ = $1;
            }
            |opTernario{
                    $$ = $1;
            }
            |funcionesNativas{
                    $$ = $1;
            }
            |llamadaFuncion{
                    $$ = $1;
            }
            |arreglo{
                    $$ = $1;
            }
            |asignacionStruct2{
                    $$ = $1;
            }
            |accesoArreglo{
                    $$ = $1;
            }
            |lstExp{
                    $$ = $1;
            }
            |copiarArreglo{
                    $$ = $1;
            }*/
            ;

lstExp: lstExp ',' expresionlog{
            $1.push($3);
            $$ = $1;
        }
        |expresionlog{
            $$ = [$1];    
        };
