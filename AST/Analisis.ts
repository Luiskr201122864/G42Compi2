/**
 * 
  - instruccion 
     Ej. declaracion
             RESULT = new Declaracion(new Simbolo(a), b);
   - expresion
     Ej. decimal
            RESULT = new Operacion(a, Operacion.TipoOperacion.FLOAT);  
            
 */

function recorridoArbol(instrucciones){
    
    lstInstrucciones:Array<Instruccion>;

    for(let ins in instrucciones){
        
        if(ins.nombre == "declaracion"){
        //int a = 20;
            lstInstrucciones.push(new DeclaracionVariable(new Simbolo(ins.indexOf,0,0), null, "declaracion"));

        }else if(ins.nombre == "declaracion2"){
        //int a; -> instruccion

        }else if(ins.nombre == "declaracionLst"){
        //int a, b, c = 10; -> instruccion
        
        }else if(ins.nombre == "declaracionLst2"){
        //int a, b, c; -> instruccion
    
        }else if(ins.nombe == "asignacion"){
        //a = 10; -> instruccion
            
        }else if(ins.nombre == "sentPrintln"){
        //println(10); -> instruccion

        }else if(ins.nombre == "sentPrint"){
        //print(10); -> instruccion

        }else if(ins.nombre=="declaracionStruct"){
        //struct edd { listaContenido }; -> instruccion

        }else if(ins.nombre=="declaracionStruct2"){
        //edd estructura; -> instruccion
    
        }else if(ins.nombre == "declaracionObj"){
        //edd estructura2 = estructura(par...); -> instruccion

        }else if(ins.nombre == "asignacionObj"){
        //estructura2 = estructura(par...); -> instruccion

        }else if(ins.nombre == "asignacionObjCad"){
        //variable.length() -> expresion

        }else if(ins.nombre == "asignacionObjExp"){
         //estructura.par1 = 13; -> instruccion

        }else if(ins.nombre == "asignacionObjExp2"){
          //estructura.par1  -> expresion

        }else if(ins.nombre == "sentenciaContinue"){
        //continue;  -> expresion
  
        }else if(ins.nombre == "sentenciaBreak"){
        //break;  -> expresion

        }else if(ins.nombre == "sentenciaReturn"){
        //return exp;  -> expresion

        }else if(ins.nombre == "if_simple"){
        /**  -> instruccion
         * if (condicion) 
         *     instrucciones  
         */

        }else if(ins.nombre == "if_else"){
        /**  ->instruccion
         * if(condicion) 
         *      instrucciones 
         * else 
         *      instrucciones 
         */
            
        }else if(ins.nombre == "if_ifElse"){
            /*  ->instruccion
              if(condicion) 
                instrucciones 
               else if(condicion2) 
                 instrucciones
            */ 
            
        }else if(ins.nombre == "if_extremo"){
           /**  ->instruccion
            * if(condicion) 
                    instrucciones 
               else if(condicion2) 
                    instrucciones
                else
                    instrucciones
            */
            

        }else if(ins.nombre == "sentenciaSwitch"){
            // ->instruccion


        }else if(ins.nombre == "sentenciaWhile"){
            // ->instruccion

            
        }else if(ins.nombre == "sentenciaDoWhile"){
            // ->instruccion

            
        }else if(ins.nombre == "sentenciaFor"){
            // ->instruccion

            
        }else if(ins.nombre == "declaracionArr"){
            // int arreglo = [1,2,3,4];  ->instruccion

            
        }else if(ins.nombre == "declaracionArr2"){
            // int[] arreglo = [1,2,3,4];  ->instruccion

            
        }else if(ins.nombre == "declaracionArr3"){
            // int[] arreglo2 = #arreglo;  ->instruccion

            
        }else if(ins.nombre == "declaracionArr4"){
            // int[] arreglo2 = exp;  ->instruccion

            
        }else if(ins.nombre == "asignacionArr"){
            // arreglo = [1,2,3,4];  ->instruccion

            
        }else if(ins.nombre == "asignacionArr2"){
            // arreglo[1] = 10;  ->instruccion

            
        }else if(ins.nombre == "accesoArr"){
            // arreglo[1:10]  ->Expresion

            
        }else if(ins.nombre == "accesoArrEnd"){
            // arreglo[1:END]  ->Expresion

            
        }else if(ins.nombre == "accesoArrBegin"){
            // arreglo[BEGIN:10]  ->Expresion

            
        }else if(ins.nombre == "accesoBeginEnd"){
            // arreglo[BEGIN:END]  ->Expresion

            
        }else if(ins.nombre == "accesoArr2"){
            // arreglo[1]  ->Expresion

            
        }else if(ins.nombre == "copiaArr"){
            // #arreglo o arreglo# ->Expresion

            
        }else if(ins.nombre == "funcion"){
            /**  ->instruccion
               int funcion1(int a){
                 instrucciones
               }
             */


        }else if(ins.nombre == "funcion2"){
            /**  ->instruccion
               int funcion1(){
                 instrucciones
               }
             */


        }else if(ins.nombre == "funcion3"){
            /**  ->instruccion
               function funcion1(int a){
                 instrucciones
               }
             */


        }else if(ins.nombre == "funcion4"){
            /**  ->instruccion
               function funcion1(){
                 instrucciones
               }
             */


        }else if(ins.nombre == "funcion5"){
            /**  ->instruccion
               Estructura funcion1(int a){
                 instrucciones
               }
             */


        }else if(ins.nombre == "funcion6"){
            /**  ->instruccion
               Estructura funcion1(){
                 instrucciones
               }
             */


        }else if(ins.nombre == "funcion7"){
            /**  ->instruccion
               void main(){
                 instrucciones
               }
             */



        }else if(ins.nombre == "funcion8"){
            /**  ->instruccion
               void metodo(){
                 instrucciones
               }
             */


        }else if(ins.nombre == "llamadaFuncion"){
            //nombreFuncion(1,2,3) ->expresion

        }else if(ins.nombre == "llamadaFuncion2"){
            //nombreFuncion()  ->expresion

        }else if(ins.nombre == "declaracionArr5"){
            //int [] arreglo -> instruccion

        }else if(ins.nombre == "declaracion4"){
            //edd [] arreglo  -> instruccion

        }else if(ins.nombre == "operacionCad"){
            //cadena.toUpperCase()  -> expresion

        }else if(ins.nombre == "opCadOfPosition"){
            //cadena.toOfPosition(1)   -> expresion

        }else if(ins.nombre == "opCadSubString"){
            //cadena.subString(1,2)   -> expresion

        }else if(ins.nombre == "opCadLength"){
            //cadena.length()   -> expresion

        }else if(ins.nombre == "opCadUpper"){
            //cadena.toUpperCase()   -> expresion

        }else if(ins.nombre == "opCadLower"){
            //cadena.toLowerCase()   -> expresion

        }else if(ins.nombre == "opCadPush"){
            //cadena.push(1)   -> expresion

        }else if(ins.nombre == "opCadPop"){
            //cadena.pop()   -> expresion

        }else if(ins.nombre == "funNatParse"){
            //int.parse(1)   -> expresion

        }else if(ins.nombre == "funNatToInt"){
            //toInt(cad)   -> expresion

        }else if(ins.nombre == "funNatToDouble"){
            //toDouble(cad)   -> expresion

        }else if(ins.nombre == "funNatToString"){
            //string(3)   -> expresion

        }else if(ins.nombre == "funNatTypeOf"){
            //typeof(3)   -> expresion

        }else if(ins.nombre == "incremento"){
            //var++  ->expresion

        }else if(ins.nombre == "decremento"){
            //var-- ->expresion

        }else if(ins.nombre == "ternario"){
            //condicion? exp : exp2  ->expresion

        }



    }
}





