/**
 * 
  - instruccion 
     Ej. declaracion
             RESULT = new Declaracion(new Simbolo(a), b);
   - expresion
     Ej. decimal
            RESULT = new Operacion(a, Operacion.TipoOperacion.FLOAT);  
            
 */


            /**
 * 
 * 0 variable normal
 * 1 estructura
 * 2 arreglo
 * 3 arreglo de estructura
 */

let lstEstructuras = [];
let lstFunciones = [];
let lstMain = [];

function buscarEstructura(id){
    let retorno = null;
    for(let x in lstEstructuras){
        if(lstEstructuras[x].variable.identificador.toUpperCase() == id.toUpperCase()){
            retorno = lstEstructuras[x];
            break;
        }
    }
    return retorno;
}
function buscarFuncion(id){
    let retorno = null;
    for(let x in lstFunciones){
        if(lstFunciones[x].id.toUpperCase() == id.toUpperCase()){
            retorno = lstFunciones[x];
            break;
        }
    }
    return retorno;
}


function comparar(tipo, nombre){
    if(tipo=="integer"){
        return true;
    }else if(nombre =="operacionCad"){
        return true;
    }else if(nombre =="operacionCad2"){
        return true;
    }
    return false;
}




function esDouble(numero){
    if (numero - Math.floor(numero) == 0){
        return 0;
    }else{
        return 1;
    }
}

function tipoVariable(tipo){
    if(tipo=="int"){
        return Tipo.INT;
    }else if(tipo=="string"){
        return Tipo.STRING;
    }else if(tipo == "double"){
        return Tipo.DOUBLE;
    }
    return null;
}




            
            
        
            
            
function recorridoOperaciones(ins, entorno){

        listaOperaciones = [];
      
        if(ins instanceof Array){
            if(ins.length==1){
                ins = ins[0];
            }
             //un arreglo de cadenas en el print
            
             var listaCadenas = [];
             var cadenaFinal = "";
             if (ins.length > 0){
                 ins.forEach(element => {
                     var cadenaConcatenada = "";
                     if (element.tipo == '&'){
                         //Se separa la cadena general por espacios para obtener cada palabra del print
                         var listOp1 = element.op1.valor.toString().split("\"");
                         var insOp1;
                         if (listOp1.length == 1){
                             insOp1 = listOp1[0];
                             insOp1 = entorno.getSimbolo(insOp1);
                             insOp1 = insOp1.valor;
                         }else{
                             insOp1 = listOp1[1];
                         }
 
                         var listOp2 = element.op2.valor.toString().split("\"");
                         var insOp2;
                         if (listOp2.length == 1){
                             insOp2 = listOp2[0];
                             insOp2 = entorno.getSimbolo(insOp2);
                             insOp2 = insOp2.valor;
                         }else{
                             insOp2 = listOp2[1];
                         }
 
                         //cadenaConcatenada += element.op1.valor.toString() + element.op2.valor.toString().replace('\"', '');
                         cadenaConcatenada += insOp1 + insOp2;
 
                         cadenaConcatenada = retornaValorReal(cadenaConcatenada, entorno);
 
                         console.log("[OPERACION]:PRINT MULTIPLE => "+ cadenaConcatenada);
                         //document.getElementById('consola').value += "[OPERACION]:[PRINT MULTIPLE] => "+ cadenaConcatenada + "\n";
                         cadenaFinal += cadenaConcatenada;
                     }else{
                         console.log("[OPERACION]:PRINT MULTIPLE => "+ element.valor.toString());
                         //document.getElementById('consola').value += "[OPERACION]:[PRINT MULTIPLE] => "+ element.valor.toString() + "\n";
                         let elementoValor = element.valor.split("\"");
                         var insElementoValor;
 
                         if(elementoValor.length == 1){
                             insElementoValor = elementoValor[0];
                             insElementoValor = entorno.getSimbolo(insElementoValor);
                             insElementoValor = insElementoValor.valor;
                             cadenaFinal += insElementoValor;
                         }else{
                             cadenaFinal += elementoValor[1];
                         }
                     }
                 });
             }
 
            // document.getElementById('consola').value += "[PARSER][PRINT]: "+cadenaFinal+"" + "\n";
             return cadenaFinal;
        }

        let op1 = ins.op1!=null?comparar(ins.tipo, ins.nombre)?null:recorridoOperaciones(ins.op1, entorno):null;
        let op2 = ins.op2!=null?comparar(ins.tipo, ins.nombre)?null:recorridoOperaciones(ins.op2, entorno):null;

        if(op1 instanceof Simbolo){
            op1 = op1.valor;
        }
        if(op2 instanceof Simbolo){
            op2 = op2.valor;
        }

        if(ins.tipo == "&&"){
            // (a > 0) && (a < 100)
            if (op1 && op2){
               // console.log("[OPERACION]:AND => true");
                return true;
            }else{
                //console.log("[OPERACION]:AND => false");
                return false;
            }

        }else if(ins.tipo == "&"){
            // 'a'&'b'
           // alert("OPERACION CONCATENAR");
           // console.log("[OPERACION]:CONCATENAR CADENA => " + op1.toString() + op2.toString());
            let concatenar = "";
            if(Number.isInteger(op1)){
                op1 = op1+'';
            }
            if(Number.isInteger(op2)){
                op2 = op2+'';
            }
            
            let concatenar2 = concatenar.concat(op1,op2);
            return concatenar2;
        }else if(ins.tipo == "||"){
            // (a == 0) || (a == 100)
            if (op1 || op2){
               // console.log("[OPERACION]:OR => true");
                return true;
            }else{
                //console.log("[OPERACION]:OR => false");
                return false;
            }
        }else if(ins.tipo == "!"){
            // !a
            ///console.log("[OPERACION]:NEGACION => !operacion =>"+ !op1);
            return !op1;
        }else if(ins.tipo == "casteoId"){
            // Objeto nuevoObjeto
            
        }else if(ins.tipo == "=="){
            // (a == 0)
            if (op1 == op2){
                //console.log("[OPERACION]:IGUAL => true");
                return true;
            }else{
                //console.log("[OPERACION]:IGUAL => false");
                return false;
            }
        }else if(ins.tipo == "==="){
            // (a === b)
            if (op1 === op2){
                //console.log("[OPERACION]:TRIPLE IGUAL => true");
                return true;
            }else{
                //console.log("[OPERACION]:TRIPLE IGUAL => false");
                return false;
            }
        }else if(ins.tipo == "!="){
            // (a != 0)
            if (op1 != op2){
                //console.log("[OPERACION]:DISTINTO QUE => true");
                return true;
            }else{
                //console.log("[OPERACION]:DISTINTO QUE => false");
                return false;
            }
        }else if(ins.tipo == "<"){
            // (a < 0)
            if (op1 < op2){
                //console.log("[OPERACION]:MENOR QUE => true");
                return true;
            }else{
                //console.log("[OPERACION]:MENOR QUE => false");
                return false;
            }
        }else if(ins.tipo == ">"){
            // (a > 0)
            if (op1 > op2){
                //console.log("[OPERACION]:MAYOR QUE => true");
                return true;
            }else{
                //console.log("[OPERACION]:MAYOR QUE => false");
                return false;
            }
        }else if(ins.tipo == "<="){
            // (a <= 0)
            if (op1 <= op2){
                //console.log("[OPERACION]:MENOR IGUAL QUE => true");
                return true;
            }else{
                //console.log("[OPERACION]:MENOR IGUAL QUE => false");
                return false;
            }
        }else if(ins.tipo == ">="){
            // (a >= 0)
            if (op1 >= op2){
               // console.log("[OPERACION]:MAYOR IGUAL QUE => true");
                return true;
            }else{
               // console.log("[OPERACION]:MAYOR IGUAL QUE => false");
                return false;
            }
        }else if(ins.tipo == "+"){
            // A + B
            if(Number.isInteger(op1) && Number.isInteger(op2)){
               // console.log("[OPERACION]:SUMA => "+ (op1 + op2));
                return (op1+op2);
            }else if(Number.isInteger(op1) && esDouble(op2) == 1 ){
               // console.log("[OPERACION]:SUMA => "+ (op1 + op2));
                return (op1 + op2);
            }else if( (esDouble(op1) == 1) && Number.isInteger(op2)){
               // console.log("[OPERACION]:SUMA => "+ (op1 + op2));
                return (op1 + op2);
            }else if( (esDouble(op1) == 1) && ( esDouble(op2) == 1 ) ){
                //console.log("[OPERACION]:SUMA => "+ (op1 + op2));
                return (op1 + op2);
            }else{
                //console.log("[OPERACION]:SUMA => [Error sintáctico]no se pueden sumar los operandos que no son numéricos.");
            }

        }else if(ins.tipo == "-"){
            // A - B
            if(Number.isInteger(op1) && Number.isInteger(op2)){
                //console.log("[OPERACION]:RESTA => "+ (op1 - op2));
                return (op1-op2);
                }else if(Number.isInteger(op1) && esDouble(op2) == 1 ){
               // console.log("[OPERACION]:RESTA => "+ (op1 - op2));
                    return (op1 - op2);
                }else if( (esDouble(op1) == 1) && Number.isInteger(op2)){
                //console.log("[OPERACION]:RESTA => "+ (op1 - op2));
                    return (op1 - op2);
                }else if( (esDouble(op1) == 1) && ( esDouble(op2) == 1 ) ){
                //console.log("[OPERACION]:RESTA => "+ (op1 - op2));
                    return (op1 - op2);
                }else{
               // console.log("[OPERACION]:RESTA => [Error sintáctico]no se pueden restar los operandos que no son numéricos.");
            }
        }else if(ins.tipo == "*"){
            // A * B
            if(Number.isInteger(op1) && Number.isInteger(op2)){
                //console.log("[OPERACION]:MULTIPLICACION => "+ (op1 * op2));
                return (op1*op2);
                }else if(Number.isInteger(op1) && esDouble(op2) == 1 ){
               // console.log("[OPERACION]:MULTIPLICACION => "+ (op1 * op2));
                    return (op1 * op2);
                }else if( (esDouble(op1) == 1) && Number.isInteger(op2)){
                //console.log("[OPERACION]:MULTIPLICACION => "+ (op1 * op2));
                    return (op1 * op2);
                }else if( (esDouble(op1) == 1) && ( esDouble(op2) == 1 ) ){
                //console.log("[OPERACION]:MULTIPLICACION => "+ (op1 * op2));
                    return (op1 * op2);
                }else{
                //console.log("[OPERACION]:MULTIPLICACION => [Error sintáctico]no se pueden multiplicar los operandos que no son numéricos.");
            }
        }else if(ins.tipo == "/"){
            // A / B
            
            if( (Number.isInteger(op1) && Number.isInteger(op2)) ){
                if(op2 > 0){
                    //console.log("[OPERACION]:DIVISION => "+ (op1 / op2));
                    return Number.parseFloat(op1 / op2);
                }else{
                    //console.log("[OPERACION]:DIVISION => [Error sintáctico]no se pueden operar divisiones entre cero.");
                }
                }else if( Number.isInteger(op1) && esDouble(op2) == 1 ){
                if(op2 > 0){
                   // console.log("[OPERACION]:DIVISION => "+ (op1 / op2));
                    return Number.parseFloat(op1 / op2);
                } else{
                    //console.log("[OPERACION]:DIVISION => [Error sintáctico]no se pueden operar divisiones entre cero.");
                }
                }else if( (esDouble(op1) == 1) && Number.isInteger(op2) ){
                if(op2 > 0){
                    //console.log("[OPERACION]:DIVISION => "+ (op1 / op2));
                    return Number.parseFloat(op1 / op2);
                } else{
                    //console.log("[OPERACION]:DIVISION => [Error sintáctico]no se pueden operar divisiones entre cero.");
                }
                }else if( (esDouble(op1) == 1) && ( esDouble(op2) == 1 ) ){
                if(op2 > 0){
                    //console.log("[OPERACION]:DIVISION => "+ (op1 / op2));
                    return Number.parseFloat(op1 / op2);
                } else{
                    console.log("[OPERACION]:DIVISION => [Error sintáctico]no se pueden operar divisiones entre cero.");
                }
                }else{
                    console.log("[OPERACION]:DIVISION => [Error sintáctico]no se pueden operar divisiones entre operadondos de tipo no numérico.");
                }
        }else if(ins.tipo == "^^"){
            // 
        }else if(ins.tipo == "%"){
            // A % 5
            if (Number.isInteger(op1) && Number.isInteger(op2)){
                //console.log("[OPERACION]:MODULO => "+ (op1 % op2));
                return Number.parseFloat(op1 % op2);
            }
        }else if(ins.tipo == "^"){
            // 
            if(isString(op1) && Number.isInteger(op2)){
                let val = "";
                for(let x = 0; x< op2; x++){
                    val += op1+" ";
                }
                return val;
            }else if (Number.isInteger(op1) && Number.isInteger(op2)){
               // console.log("[OPERACION]:POTENCIA => "+ (op1 ^ op2));
                return op1 ^ op2;
            }
        }else if(ins.tipo == "neg"){
            // -A
            if (Number.isInteger(op1)){
               // console.log("[OPERACION]:NEGATIVO => "+ (-op1));
                return -op1;
            }
        }else if(ins.tipo == "double"){
            // 
           // console.log("[OPERACION]:DOUBLE => "+ parseFloat(ins.valor));
            return parseFloat(ins.valor);
        }else if(ins.tipo == "integer"){
            // 
            //console.log("[OPERACION]:INTEGER => "+ parseInt(ins.valor));
            return parseInt(ins.valor);

        }else if(ins.tipo == "char"){
            // 
            //console.log("[OPERACION]:CHAR => "+ Array.from(ins.valor));
            return Array.from(ins.valor);
        }else if(ins.tipo == "string"){
            // 
            //console.log("[OPERACION]:STRING => "+ ins.valor.toString());
            let cad = ins.valor.replace(/\"/g, "");
            let cadNueva = cad.replace(/\'/g, "");
            return cadNueva;
        }else if(ins.tipo == "null"){
            // 

           return 23242526;
            
        }else if(ins.tipo == "id"){
            // 
            if(ins.valor == "BEGIN"){
                return 13131313;
            }else if(ins.valor == "END"){
                return 13131314;
            }else if(ins.valor == "false"){
                return false;
            }else if(ins.valor == "true"){
                return true;
            }else{
                let simbolo = entorno.getSimbolo(ins.valor);
                return simbolo;
            }
        }else if(ins.tipo == "incrementro"){
            // a++
            var inc = null;
            let simbolo = entorno.getSimbolo(ins.id);
            if(simbolo!=null){
                if(simbolo.tipo == "int"){
                    let val = simbolo.valor+1;
                    simbolo.valor = val;
                    inc = val;
                }
            }
            
           // console.log("[OPERACION]:NULL => INCREMENTO "+inc.toString());
            return inc;

        }else if(ins.tipo == "decremento"){
            // a-- 
            let dec = null;
            let simbolo = entorno.getSimbolo(ins.id);
            if(simbolo!=null){
                if(simbolo.tipo == "int"){
                    let val = simbolo.valor-1;
                    simbolo.valor = val;
                    dec = val;
                }
            }
            //console.log("[OPERACION]:NULL => INCREMENTO "+inc.toString());
            return dec;
        }else if(ins.nombre == "funPowNum"){
            let val1 = recorridoOperaciones(ins.exp, entorno);
            let val2 = recorridoOperaciones(ins.exp2, entorno);
            let x = Math.pow(val1, val2);
            return x;

        }else if(ins.nombre == "funSQRTNum"){
            let val1 = recorridoOperaciones(ins.exp, entorno);

        }else if(ins.nombre == "funTanNum"){
            let val1 = recorridoOperaciones(ins.exp, entorno);

        }else if(ins.nombre == "funCosNum"){
            let val1 = recorridoOperaciones(ins.exp, entorno);

        }else if(ins.nombre == "funLogNum"){
            let val1 = recorridoOperaciones(ins.exp, entorno);
        
        }else if(ins.nombre == "funSinNum"){
            let val1 = recorridoOperaciones(ins.exp, entorno);
        
        }else if(ins.nombre == "funSQRT"){
            let val1 = recorridoOperaciones(ins.exp, entorno);
            let x = Math.sqrt(val1);
            return x;
        }else if(ins.nombre == "funTan"){
            let val1 = recorridoOperaciones(ins.exp, entorno);
            let x = Math.tan(val1);
            return x;
        }else if(ins.nombre == "funCos"){
            let val1 = recorridoOperaciones(ins.exp, entorno);
            let x = Math.cos(val1); 
            return x;
        }else if(ins.nombre == "funLog"){
            let val1 = recorridoOperaciones(ins.exp, entorno);
            let x = Math.log(val1);
            return x;
        }else if(ins.nombre == "funSin"){
            let val1 = recorridoOperaciones(ins.exp, entorno);
            let x = Math.sin(val1); 
            return x;
        }else if(ins.nombre == "asignacionObjExp2"){

            let acceso = new AccesoEdd(new Simbolo("edd", ins.id, 0,0, null, 1),ins.lstID,"asignacionObjExp2");
            return acceso.ejecutarInstrucciones(acceso, entorno);
        } else if(ins.tipo == "^"){
            // 
            if (Number.isInteger(op1) && Number.isInteger(op2)){
               // console.log("[OPERACION]:POTENCIA => "+ (op1 ^ op2));
                return op1 ^ op2;
            }
        }else if(ins.tipo == "neg"){
            // -A
            if (Number.isInteger(op1)){
               // console.log("[OPERACION]:NEGATIVO => "+ (-op1));
                return -op1;
            }
        }else if(ins.tipo == "double"){
            // 
           // console.log("[OPERACION]:DOUBLE => "+ parseFloat(ins.valor));
            return parseFloat(ins.valor);
        }else if(ins.tipo == "integer"){
            // 
            //console.log("[OPERACION]:INTEGER => "+ parseInt(ins.valor));
            return parseInt(ins.valor);

        }else if(ins.tipo == "char"){
            // 
            //console.log("[OPERACION]:CHAR => "+ Array.from(ins.valor));
            return Array.from(ins.valor);
        
        }else if(ins.tipo == "null"){
            // 

           // console.log("[OPERACION]:NULL => NULL");
            return 23242526;
        }else if(ins.nombre == "asignacionObjExp2"){
            let acceso = new AccesoEdd(new Simbolo("edd", ins.id, 0,0, null, 1),ins.lstID,"asignacionObjExp2");
            return acceso.ejecutarInstrucciones(acceso, entorno);
        }
        else if(ins.nombre == "accesoArr"){
            // arreglo[1:10]  ->Expresion
            let accesoArr = new AccesoArreglo(ins.id, ins.exp, ins.exp2, "accesoArr");
            return accesoArr.ejecutarInstrucciones(ins, entorno);
            
        }
        else if(ins.nombre == "accesoArrEnd"){
            // arreglo[1:END]  ->Expresion
            let accesoArr = new AccesoArreglo(ins.id, ins.exp, null, "accesoArrEnd");
            return accesoArr.ejecutarInstrucciones(ins, entorno);
            
        }
        else if(ins.nombre == "accesoArrBegin"){
            // arreglo[BEGIN:10]  ->Expresion
            let accesoArr = new AccesoArreglo(ins.id, ins.exp, null, "accesoArrBegin");
            return accesoArr.ejecutarInstrucciones(ins, entorno);
            
        }
        else if(ins.nombre == "accesoBeginEnd"){
            // arreglo[BEGIN:END]  ->Expresion
            let accesoArr = new AccesoArreglo(ins.id, ins.exp, null, "accesoBeginEnd");
            return accesoArr.ejecutarInstrucciones(ins, entorno);
        }
        else if(ins.nombre == "accesoArr2"){
            // arreglo[1]  ->Expresion
            let accesoArr = new AccesoArreglo(ins.id, ins.exp, null, "accesoArr2");
            return accesoArr.ejecutarInstrucciones(ins, entorno);
        }
        else if(ins.nombre == "copiaArr"){
            // #arreglo o arreglo# ->Expresion
            let simbolo = entorno.getSimbolo(ins.id);
            return simbolo;
            
        }else if(ins.nombre == "sentenciaBreak"){
            //break;  -> expresion
                lstInstrucciones.push(new sentenciaBreak());
       }
        else if(ins.nombre == "sentenciaReturn"){
            //return exp;  -> expresion
            let senRet = new sentenciaReturn(ins.exp);
            lstInstrucciones.push(senRet);

        }else if(ins.nombre == "sentenciaContinue"){
            //continue;  -> expresion
      
        }else if(ins.nombre == "asignacionObjCad"){
            //variable.length() -> expresion
            
        }else if(ins.nombre == "operacionCad"){
            //cadena.toUpperCase()  -> expresion
            let opNat = new NativasArreglo(ins.id, ins.op1, "operacionCad");
            return opNat.ejecutarInstrucciones(ins, entorno);
        }
        else if(ins.nombre == "operacionCad2"){
            //cadena.toUpperCase()  -> expresion
            let opNat = new NativasArreglo(ins.id, ins.op1, "operacionCad2");
            return opNat.ejecutarInstrucciones(ins, entorno);
        }
        else if(ins.nombre == "opCadOfPosition"){
            //cadena.toOfPosition(1)   -> expresion
            let opNat = new NativasArreglo(ins.id, ins.op1, "operacionCad");
            return opNat.ejecutarInstrucciones(ins, entorno);
        }
        else if(ins.nombre == "opCadSubString"){
            //cadena.subString(1,2)   -> expresion
            let opNat = new NativasArreglo(ins.id, ins.op1, "operacionCad");
            return opNat.ejecutarInstrucciones(ins, entorno);
        }
        else if(ins.nombre == "opCadLength"){
            //cadena.length()   -> expresion
            let opNat = new NativasArreglo(ins.id, ins.op1, "operacionCad");
            return opNat.ejecutarInstrucciones(ins, entorno);
        }
        else if(ins.nombre == "opCadUpper"){
            //cadena.toUpperCase()   -> expresion
            let opNat = new NativasArreglo(ins.id, ins.op1, "operacionCad");
            return opNat.ejecutarInstrucciones(ins, entorno);
        }
        else if(ins.nombre == "opCadLower"){
            //cadena.toLowerCase()   -> expresion
            let opNat = new NativasArreglo(ins.id, ins.op1, "operacionCad");
            return opNat.ejecutarInstrucciones(ins, entorno);
        }
        
        else if(ins.nombre == "opCadPop"){
            //cadena.pop()   -> expresion
            let opNat = new NativasArreglo(ins.id, ins.op1, "operacionCad");
            return opNat.ejecutarInstrucciones(ins, entorno);
        } else if(ins.nombre == "opCadPush"){
            //cadena.push(1)   -> expresion
            let opNat = new NativasArreglo(ins.id, ins.op1, "operacionCad");
            return opNat.ejecutarInstrucciones(ins, entorno);
       
        }else if(ins.nombre == "llamadaFuncion"){
            //nombreFuncion(1,2,3) ->expresion
            let llamadaFun = new LlamadaFuncion(ins.id, ins.lstPar, "callParametros");
            let result = llamadaFun.ejecutarInstrucciones(llamadaFun, entorno);
            return result;
        }else if(ins.nombre == "llamadaFuncion2"){
            //nombreFuncion(1,2,3) ->expresion
            let llamadaFun2 = new LlamadaFuncion(ins.id, null, "callSinParametros");
            let result = llamadaFun2.ejecutarInstrucciones(llamadaFun2, entorno);
            return result;
        }
        else if(ins.nombre == "funNatParse"){
            //int.parse(1)   -> expresion

        }
        else if(ins.nombre == "funNatToInt"){
            //toInt(cad)   -> expresion

        }
        else if(ins.nombre == "funNatToDouble"){
            //toDouble(cad)   -> expresion

        }
        else if(ins.nombre == "funNatToString"){
            //string(3)   -> expresion
            let val = null;
            if(ins.exp instanceof Array){
                val = recorridoOperaciones(ins.exp[0], entorno);
            }else{
                val = recorridoOperaciones(ins.exp, entorno);
            }
            
            if(val instanceof Array){
                let val2 = "";
                val.forEach(item=>{
                    val2 += val+"";
                });
                return val2;
            }else{
                return val.toString();
            }

        }
        else if(ins.nombre == "funNatTypeOf"){
            //typeof(3)   -> expresion

        }else if(ins.nombre == "ternario"){
            //condicion? exp : exp2  ->expresion
            let ternarioSen = new ternario(ins.exp1, ins.exp2, ins.exp3);
            let valor = ternarioSen.ejecutarInstrucciones(ins, entorno);
            return valor;
        }
   
    
    return listaOperaciones;
}


//funcion que sirve para devolver el valor de una instancia de variable
function retornaValorReal(cadena, entorno)
{
//Se evalúa si en la cadena general existe algúna palabra que contenga $
            let contieneDolar = cadena.includes('$');
            let arrayCadenas = [];
            var cadenaFinal = "";
            var tmp = "";

            if (contieneDolar){
                console.log("Esta cadena contiene $, debe accederse a su valor. \n");
                //document.getElementById('consola').value += "[PARSER][CADENA]:Esta cadena contiene $, debe accederse a su valor. \n";

                
                var cadenas = cadena.split(" ");
                

                if (cadenas.length > 0){

                    //Se recorre el arreglo de cadenas
                    cadenas.forEach(element => {
                        //Se evalùa si la parte de la cadena actual contiene un simbolo $
                        let contieneDolar2 = element.includes('$');
                        let cadenaSinDolar = element.split('$');
                        if(contieneDolar2){
                            //Se manda a traer el valor real de la variable a la que se hizo referencia en el print
                                tmp = cadenaSinDolar[1].toString();
                            let valorCadena = entorno.getSimbolo(tmp);

                            if(valorCadena){
                                //Se inserta la cadena en el arreglo de cadenas filtradas y evaluadas
                                arrayCadenas.push(valorCadena.valor);
                            }
                            else{
                                console.log("La variable " + tmp + " no ha sido definida. \n");
                                document.getElementById('consola').value += "[PARSER][ERROR]:"+ "La variable " + cadenaSinDolar[0] + " no ha sido definida. \n";
                                return ins.valor.toString();
                            }
                        }else{
                            //Se inserta la cadena en el arreglo de cadenas filtradas y evaluadas
                            arrayCadenas.push(cadenaSinDolar[0]);
                        }
                    });
                }

                if (arrayCadenas.length > 0){
                    arrayCadenas.forEach(element => {
                        cadenaFinal += element + " ";
                    });
                }
                console.log("La variable " + tmp + " no ha sido definida. \n");
                //document.getElementById('consola').value += "[PARSER][CADENA]:PRINT =>  " + cadenaFinal + " \n";
                return cadenaFinal;
            }
            else{
                console.log("Esta es una cadena normal \n");
                //document.getElementById('consola').value += "[PARSER][CADENA]:Esta es una cadena normal \n";
                
                //document.getElementById('consola').value += "[PARSER][CADENA]: PRINT => " + cadena +"\n";
                return cadena;
            }
}

//funcion que recorre el arbol de instrucciones
function recorridoArbol(instrucciones, entorno){

    let lstInstrucciones = [];

    instrucciones.forEach(ins => {
        if(ins.nombre == "declaracion") {
            //int a = 20;
            let declaracion = new DeclaracionVariable(new Simbolo(ins.tipo, ins.id,0,0, null, 0), ins.exp, "declaracion");
            lstInstrucciones.push(declaracion);
        }
        else if(ins.nombre == "declaracion2") {
            //int a; -> instruccion
            let declaracion = new DeclaracionVariable(new Simbolo(ins.tipo, ins.id,0,0, null, 0), ins.exp, "declaracion2");
            lstInstrucciones.push(declaracion);
        }
        else if(ins.nombre == "declaracionLst") {
            //int a, b, c = 10; -> instruccion
            let declaracion = new DeclaracionVariable(new Simbolo(ins.tipo, ins.id,0,0, null, 0), null, "declaracion");
            lstInstrucciones.push(declaracion);
            for(let x in ins.lstId){
                let id = ins.lstId[x];
                let declaracion2 = new DeclaracionVariable(new Simbolo(ins.tipo, id,0,0, null, 0), null, "declaracion");
                lstInstrucciones.push(declaracion2);
            }
        }
        else if(ins.nombre == "declaracionLst2") {
            //int a, b, c; -> instruccion
            let declaracion = new DeclaracionVariable(new Simbolo(ins.tipo, ins.id,0,0, null, 0), null, "declaracion2");
            lstInstrucciones.push(declaracion);
            for(let x in ins.lstId){
                let id = ins.lstId[x];
                let declaracion2 = new DeclaracionVariable(new Simbolo(ins.tipo, id,0,0, null, 0), null, "declaracion2");
                lstInstrucciones.push(declaracion2);
            }

        }
        else if(ins.nombre == "asignacion"){
            /** AQUI VA LA ASIGNACION */
            let asignacion = new AsignacionVariable(new Simbolo(null, ins.id,0,0, null, 0), ins.exp, "asignacion");
            //lstEstructuras.push(asignacion);
            lstInstrucciones.push(asignacion);

        }
        else if(ins.nombre == "sentPrintln"){
        //println(10); -> instruccion
            let println = new sentenciaPrint(ins.expresion);
            lstInstrucciones.push(println);

        }
        else if(ins.nombre == "sentPrint"){
        //print(10); -> instruccion
            let println = new sentenciaPrint(ins.expresion);
            lstInstrucciones.push(println);

        }
        else if(ins.nombre=="declaracionStruct"){
        //struct edd { listaContenido }; -> instruccion
            let lstContenido = recorridoArbol(ins.lstCont, entorno);
            let decStruct = new DeclaracionStruct(new Simbolo("edd", ins.id, 0,0, null, 1), lstContenido, "declaracionStruct" );
            lstEstructuras.push(decStruct);

        }
        else if(ins.nombre=="declaracionStruct2"){
        //edd estructura; -> instruccion
            let declaracionEdd = new DeclaracionEdd(ins.id, "", new Simbolo("edd", ins.id2,0,0, null, 1),[], "declaracionStruct2" );
            lstInstrucciones.push(declaracionEdd);
    
        }
        else if(ins.nombre == "declaracionObj"){
        //estructura estructura2 = estructura(par...); -> instruccion
            let declaracionEdd = new DeclaracionEdd(ins.padre, ins.padre2, new Simbolo("objeto", ins.id,0,0, null, 1),ins.lstExp, "declaracionObj" );
            lstInstrucciones.push(declaracionEdd);

        }
        else if(ins.nombre == "asignacionObj"){
        //estructura2 = estructura(par...); -> instruccion
            let asignacionEdd = new AsignacionEdd(ins.padre, new Simbolo(ins.padre, ins.id,0,0, null, 1), ins.lstExp, "asignacionObj");
            lstInstrucciones.push(asignacionEdd);

        } 
        else if(ins.nombre == "asignacionObjExp"){
         //estructura.par1 = 13; -> instruccion
            let asigEdd = new AsignacionEdd2(new Simbolo("", ins.id,0,0, null, 1), ins.lstID, ins.exp, "asignacionObjExp");
            lstInstrucciones.push(asigEdd);
        
        } 
        else if(ins.nombre == "if_simple"){
        /**  -> instruccion
         * if (condicion){
         *     instrucciones  
        }
        */
            let sentencia = new sentenciaIf(new auxSentenciaIf(ins.sentIf.expresion, ins.sentIf.instrucciones, true, false), [], null);
            lstInstrucciones.push(sentencia);
        }
        else if(ins.nombre == "if_else"){
        /**  ->instruccion
         * if(condicion) 
         *      instrucciones 
         * else 
         *      instrucciones 
         */
         let sentencia = new sentenciaIf(new auxSentenciaIf(ins.senIf.expresion, ins.senIf.instrucciones, true, false), [], ins.else.instrucciones);
         lstInstrucciones.push(sentencia);
        }
        else if(ins.nombre == "if_ifElse"){
            /*  ->instruccion
              if(condicion) 
                instrucciones 
               else if(condicion2) 
                 instrucciones
            */ 
                let lstElseIf = [];
                ins.senElseIf.forEach(item=>{
                    let sentenciaElse = new auxSentenciaIf(item.expresion,item.instrucciones,false,true);
                    lstElseIf.push(sentenciaElse);
                });
    
                let sentencia = new sentenciaIf(new auxSentenciaIf(ins.senIf.expresion,ins.senIf.instrucciones,true,false),lstElseIf, 
                null);
                lstInstrucciones.push(sentencia);

        }
        else if(ins.nombre == "if_extremo"){
           /**  ->instruccion
            * if(condicion) 
                    instrucciones 
               else if(condicion2) 
                    instrucciones
                else
                    instrucciones
            */
            let lstElseIf = [];
            ins.senIfElse.forEach(item=>{
                let sentenciaElse = new auxSentenciaIf(item.expresion,item.instrucciones,false,true);
                lstElseIf.push(sentenciaElse);
            });

            let sentencia = new sentenciaIf(new auxSentenciaIf(ins.senIf.expresion,ins.senIf.instrucciones,true,false),lstElseIf, 
              new auxSentenciaIf(null, ins.senElse.instrucciones, false, false));
              lstInstrucciones.push(sentencia);

        }
        else if(ins.nombre == "sentenciaSwitch"){
            // ->instruccion
           
            let lstCase = [];
            ins.cuerpoSwitch.blockG.forEach(item=>{
                let sentCase = new Sentencia_Case(item.tipoCaso[0].expresion,item.instrucciones);
                lstCase.push(sentCase);
            });

            let senSwich = null;
            if(ins.cuerpoSwitch.hasOwnProperty('label')){
                let lstWhile = [];
                senSwitch = new sentenciaSwitch(ins.expresion,lstCase, ins.cuerpoSwitch.label.instrucciones.instruccion);
            }else{
                senSwitch = new sentenciaSwitch(ins.expresion,lstCase, null);
            }

            lstInstrucciones.push(senSwitch);
        }
        else if(ins.nombre == "sentenciaWhile"){
            // ->instruccion
            let senWhile = new cicloWhile(ins.expresion,ins.instrucciones.instruccion);
            lstInstrucciones.push(senWhile);
        }
        else if(ins.nombre == "sentenciaDoWhile"){
            // ->instruccion
           
            let senDoWhile = new cicloDoWhile(ins.expresion,ins.instrucciones.instruccion);
            lstInstrucciones.push(senDoWhile);
    
        }else if(ins.nombre == "sentenciaFor"){

            let senCicloFor = new cicloFor(null, ins.exp1, ins.exp2, ins.instrucciones, 0);
            lstInstrucciones.push(senCicloFor);

        }else if(ins.nombre == "sentenciaFor2"){
            let senCicloFor = new cicloFor(ins.dec, ins.exp1, ins.exp2, ins.instrucciones, 1);
            lstInstrucciones.push(senCicloFor);

        }else if(ins.nombre == "declaracionArr"){
            // int arreglo = [1,2,3,4];  ->instruccion
            let arreglo = null;
            if(ins.arr instanceof Array){
                arreglo = new DeclaracionArreglo(ins.tipo, new Simbolo("", ins.id,0,0, null, 2), ins.arr[0], "declaracionArr");
            }else{
                arreglo = new DeclaracionArreglo(ins.tipo, new Simbolo("", ins.id,0,0, null, 2), null, "declaracionArr");
            }
            lstInstrucciones.push(arreglo);
        }
        else if(ins.nombre == "declaracionArr2"){
            // int[] arreglo = [1,2,3,4];  ->instruccion
            let arreglo = new DeclaracionArreglo(ins.tipo, new Simbolo("", ins.id,0,0, null, 2), ins.arr[0], "declaracionArr2");
            lstInstrucciones.push(arreglo);
        }
        else if(ins.nombre == "declaracionArr3"){
            // int[] arreglo2 = #arreglo;  ->instruccion
            let arregloCopia = new DeclaracionArreglo2(ins.tipo, new Simbolo(ins.tipo, ins.id,0,0, null, 2), ins.arr, "declaracionArr3");
            lstInstrucciones.push(arregloCopia);
        }
        else if(ins.nombre == "declaracionArr4"){
            // int[] arreglo2 = exp;  ->instruccion

            
        }else if(ins.nombre == "asignacionObjCad"){
            //variable.length() -> expresion
            let valor = new NativasArreglo(ins.id, ins.op1, "asignacionObjCad");
            lstInstrucciones.push(valor);
        }
        else if(ins.nombre == "asignacionArr"){
            // arreglo = [1,2,3,4];  ->instruccion
            let asigArreglo = null;
            if(ins.arr instanceof Array){
              asigArreglo = new AsignacionArreglo(new Simbolo("", ins.id,0,0, null, 2), null, ins.arr[0], "asignacionArr");
            }else{
                asigArreglo = new AsignacionArreglo(new Simbolo("", ins.id,0,0, null, 2), null, null, "asignacionArr");
            }
            
            lstInstrucciones.push(asigArreglo);
            
        }
        else if(ins.nombre == "asignacionArr2"){
            // arreglo[1] = 10;  ->instruccion
            let asigArreglo = new AsignacionArreglo(new Simbolo("", ins.id,0,0, null, 2), ins.arr, ins.exp, "asignacionArr2");
            lstInstrucciones.push(asigArreglo);
            
        }
       
        else if(ins.nombre == "funcion"){
            /**  ->instruccion
               int funcion1(int a){
                 instrucciones
               }
             */
            let decFuncion = new Funcion(ins.tipo, ins.id, ins.lstPar, ins.lstInst, "funcion");
            lstFunciones.push(decFuncion);
            //lstInstrucciones.push(decFuncion); //Agregado para prueba
        }
        else if(ins.nombre == "funcion2"){
            /**  ->instruccion
               int funcion1(){
                 instrucciones
               }
             */
            let decFuncion2 = new Funcion(ins.tipo, ins.id, null, ins.lstInst, "funcion2");
            lstFunciones.push(decFuncion2);
            //lstInstrucciones.push(decFuncion2); //Agregado para prueba
        }
        else if(ins.nombre == "funcion3"){
            /**  ->instruccion
               function funcion1(int a){
                 instrucciones
               }
             */
            let decFuncion3 = new Funcion("funcion", ins.id, ins.lstPar, ins.lstInst, "funcion3");
            lstFunciones.push(decFuncion3);
            //lstInstrucciones.push(decFuncion3); //Agregado para prueba
        }
        else if(ins.nombre == "funcion4"){
            /**  ->instruccion
               function funcion1(){
                 instrucciones
               }
             */
            let decFuncion4 = new Funcion("funcion", ins.id, null, ins.lstInst, "funcion4");
            lstFunciones.push(decFuncion4);
            //lstInstrucciones.push(decFuncion4); //Agregado para prueba
        }
        else if(ins.nombre == "funcion5"){
            /**  ->instruccion
               Estructura funcion1(int a){
                 instrucciones
               }
             */
            let decFuncion5 = new Funcion(ins.id, ins.id2, ins.lstPar, ins.lstInst, "funcion5");
            lstFunciones.push(decFuncion5);
            //lstInstrucciones.push(decFuncion5); //Agregado para prueba
        }
        else if(ins.nombre == "funcion6"){
            /**  ->instruccion
               Estructura funcion1(){
                 instrucciones
               }
             */
            let decFuncion6 = new Funcion(ins.id, ins.id2, ins.lstPar, ins.lstInst, "funcion6");
            lstFunciones.push(decFuncion6);
            //lstInstrucciones.push(decFuncion6); //Agregado para prueba
        }
        else if(ins.nombre == "funcion7"){
            /**  ->instruccion
               void main(){
                 instrucciones
               }
             */
          //  let decFuncion8 = new Funcion("", ins.id, null, ins.lstInst, "funcion8");
           
//lstFunciones.push(decFuncion8);
            let decFuncion7 = new Funcion("", "main", null, ins.lstInst, "funcion7");
            lstMain.push(decFuncion7);
        }
        else if(ins.nombre == "funcion8"){
            /**  ->instruccion
               void metodo(){
                 instrucciones
               }
             */
            let decFuncion7 = new Funcion("", "main", null, ins.lstInst, "funcion7");
            lstMain.push(decFuncion7);

        }
        else if(ins.nombre == "funcion9"){
            /**  ->instruccion
               void metodo(lstPar){
                 instrucciones
               }
             */
            let decFuncion9 = new Funcion("void", ins.id, ins.lstPar, ins.lstInst, "funcion9");
            lstFunciones.push(decFuncion9);

        }
        else if(ins.nombre == "llamadaFuncion"){
            //nombreFuncion(1,2,3) ->expresion
            let llamadaFun = new LlamadaFuncion(ins.id, ins.lstPar, "callParametros");
            lstInstrucciones.push(llamadaFun);
        }
        else if(ins.nombre == "llamadaFuncion2"){
            //nombreFuncion()  ->expresion
            let llamadaFun2 = new LlamadaFuncion(ins.id, null, "callSinParametros");
            lstInstrucciones.push(llamadaFun2);
        }
        else if(ins.nombre == "declaracionArr5"){
            //int [] arreglo -> instruccion -- AQUI
            let arregloCopia = new DeclaracionArreglo2(ins.tipo, new Simbolo(ins.tipo, ins.id,0,0, null, 2), null, "declaracionArr5");
            lstInstrucciones.push(arregloCopia);
        }
        else if(ins.nombre == "declaracion4"){
            //edd [] arreglo  -> instruccion --AQUI
            let arregloCopia = new DeclaracionArreglo2(ins.id, new Simbolo(ins.id, ins.id2,0,0, null, 3), null, "declaracion4");
            lstInstrucciones.push(arregloCopia);
        }  
        else if(ins.nombre == "sentenciaReturn"){
            //return exp;  -> expresion
            let senRet = new sentenciaReturn(ins.exp);
            lstInstrucciones.push(senRet);

        }
        else if(ins.nombre == "sentenciaReturn2"){
            //return exp;  -> expresion
            let senRet = new sentenciaReturn(null);
            lstInstrucciones.push(senRet);

        }
        else if(ins.nombre == "incremento"){
            //var++  ->expresion

        }
        else if(ins.nombre == "decremento"){
            //var-- ->expresion

        }
                
    }); 
        return lstInstrucciones;

}


function ejecucionArbol(instrucciones, entorno){

    for(let y in instrucciones){
        let ins = instrucciones[y];

        if (ins instanceof DeclaracionVariable) {
            //int a = 20;
           let val = ins.ejecutarInstrucciones(instrucciones, entorno);
           if(val!=null){
               return val;
           }
        }else if(ins instanceof DeclaracionStruct){
            let val = ins.ejecutarInstrucciones(instrucciones, entorno);
            if(val!=null){
                return val;
            }
        }else if(ins instanceof sentenciaPrint){
            ins.ejecutarInstrucciones(instrucciones, entorno);
        }else if(ins instanceof DeclaracionEdd){
           //edd estructura2 = estructura(par...); -> instruccion
            ins.ejecutarInstrucciones(instrucciones, entorno);
           
        }else if(ins instanceof AsignacionVariable){
            //AQUI VA ASIGNACION
            ins.ejecutarInstrucciones(instrucciones, entorno);

        }else if(ins instanceof AsignacionEdd2){
            ins.ejecutarInstrucciones(instrucciones, entorno);
        }else if(ins instanceof AsignacionEdd){
            ins.ejecutarInstrucciones(instrucciones, entorno);
        }else if(ins instanceof AsignacionArreglo){
            ins.ejecutarInstrucciones(instrucciones, entorno);

        }else if(ins instanceof DeclaracionArreglo){
                ins.ejecutarInstrucciones(instrucciones, entorno);
        }else if(ins instanceof DeclaracionArreglo2){
                ins.ejecutarInstrucciones(instrucciones, entorno);
        }else if(ins instanceof NativasArreglo){
            let val = ins.ejecutarInstrucciones(instrucciones, entorno);
            if(val!=null){
                return val;
            }
        }else if(ins instanceof LlamadaFuncion){
            let val = ins.ejecutarInstrucciones(instrucciones, entorno);
            if(val!=null){
                return val;
            }
        }else if(ins instanceof sentenciaReturn){
            let val = ins.ejecutarInstrucciones(instrucciones, entorno);
            if(val!=null){
                return val;
            }
        }else if(ins instanceof sentenciaIf){
            let val = ins.ejecutarInstrucciones(instrucciones, entorno);
            if(val!=null){
                return val;
            }
        }else if(ins instanceof sentenciaSwitch){
            ins.ejecutarInstrucciones(instrucciones, entorno);
        }else if(ins instanceof sentenciaBreak){
            return "break";
        }else if(ins instanceof cicloWhile){
            ins.ejecutarInstrucciones(instrucciones, entorno);
        }else if(ins instanceof cicloDoWhile){
            ins.ejecutarInstrucciones(instrucciones, entorno);
        }else if(ins instanceof cicloFor){
            ins.ejecutarInstrucciones(instrucciones, entorno);
        }
    };
}
