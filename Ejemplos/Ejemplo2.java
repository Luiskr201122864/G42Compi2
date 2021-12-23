 /*
        Esto es un
        comentario de
        múltiples líneas
    */

    struct Rectangulo{
    int base,
    int altura
};

cadena1 ="para" & "caidismo";
cadena2 ="Cadena"^3;
animal = "Tigre";
println(animal.caracterOfPosition(2)); //g
println(animal.subString(2,4)); //gre
println(animal.length()); //5
println(animal.toUppercase()); //TIGRE
println(animal.toLowercase()); //tigre
respuesta = edad >= 50 ? "Puede vacunarse" : "No puede vacunarse";

println(animal == "Perro" ? 15 : 10);

println("+"+"-");       // Imprime + -
print("El resultado de 2 + 2 es $(2 + 2)");  // Imprime El resultado de 2 + 2 es 4
println("$a $(b[1])"); 

a = [0, 1, 2];
    println(a);          // Imprime [0, 1, 2]
    s = Hora(10, 30);
    print(s);           // Imprime Hora(10, 30)

    int x = (3*5);
    double y = (10/4);
    String str = "Saludo";
   

    var1 = "Adios";
    v = 89 - 9;

    ordenamiento(arr1,arr2);
imprimirLista(lista);
nuevaLinea();

var1 =  toInt(3.99999);  // retorna 3
var2 =   toDouble(34);  // retorna 34.0
var3 = string(45.87);  // retorna "45.87"
var4 =    string([1,2,3]);  // retorna "[1,2,3]"
var5 =typeof(5 * 5); // int

TIPO imprimirHola(){
    print("Hola");
    println(" Mundo");
}

TIPO sumar(int num1, double num2){
    return num1 + toInt(num2);
}

if(x == 8){
    int var1 = (x + 8);
    println(sqrt(var1));
}

if(x == 8){
    int var1 = (x + 8);
    println(sqrt(var1));
}
else if(x < 8){
    double var1 = (x/3);
    println(sin(var1));
}
else
    println("Error");


int day = 4;
switch (day) {
  case 1:
    println("Monday");
    break;
  case 2:
    println("Tuesday");
    break;
  case 3:
    println("Wednesday");
    break;
  case 4:
    println("Thursday");
    break;
  case 5:
    println("Friday");
    break;
  case 6:
    println("Saturday");
    break;
  case 7:
    println("Sunday");
    break;
}


int i = 0;
while (i < 5) {
  println(i);
   i++;
}

int i = 0;
do {
  println(i);
  i++;
}
while (i < 5);

NOMBRE_STRUCT ID = NOMBRE_STRUCT(LISTA_VALORES);



struct Estructura{
    int x
};

function cambiarAtributo(Estructura s){
    s.x = 10;
    println(a);  
}

Estructura a = Estructura(0);
println(a);             // Imprime 'Estructura(0)'
println(a.x);           // Imprime 0

cambiarAtributo(a);
println(a);             // Imprime 'Estructura(10)'
println(a.x);           // Imprime 10

struct Estructura{
    int x,
   Estructura e
};



print(arr[1]); //O
print(arr[2:4]); //[2,3,4]
print(arr[begin:4]); //[1,2,3,4]

print(arr); //[1,0,3,4,5,6]
print(arr2); //[1,2,3,4,5,6]

Estructura a = Estructura(0, null);
println(a);             // Imprime 'Estructura(0, null)'

// o tambien se puede declarar 
Estructura b = Estructura(1, a);
println(b);             // Imprime 'Estructura(1, Estructura(0, null))'




String[] arr = ["H","O","L","A"];

int[] arr = [1,2,3,4,5,6];
int[] arr = [1,2,3,4,5,6];


int[] arr = [1,2,3,4,5,6];
arr.push(7); // arr = [1,2,3,4,5,6,7]
int[] arr = [1,2,3,4,5,6];
arr.pop(); // retorna 6, arr = [1,2,3,4,5]
int[] arr = [1,2,3,4,5,6];
arr.length(); // 6
print(arr[4:end]); //[4,5,6]
arr[2] = 0;
int[] arr = [1,2,3];

variable = id.id;
X.atributo = expresi;







// ------------------- ME FALTA ESTOOOOOOOOOOOOOOO

 

for letra in "Hola Mundo!"  // Recorre las letras de la cadena
{
    print(letra, "-");      // Imprime H-o-l-a-M-u-n-d-o-!
}

String cadena = "OLC2";
for letra in cadena
{
    print(letra, "-");      // Imprime O-L-C-2
}
    
for animal in ["perro", "gato", "tortuga"]
{
    println("$animal es mi favorito");
    /* Imprime
        perro es mi favorito
        gato es mi favorito
        tortuga es mi favorito
    */
}

int[] arr = [1,2,3,4,5];
for numero in arr[2:4]{
    print(numero, " ") ;    // Imprime 2 3 4
}



int[] arr2 = #arr;



rint(arr#*2); //[2,4,6]

double[] arr2 = sin#(arr); //[0.8415, 0.9093, 0.1411]

int var1, var2, var3; 