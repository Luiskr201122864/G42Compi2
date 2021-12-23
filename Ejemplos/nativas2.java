/************ STACK *****************/
int[] stack = [0];
int MAXSIZE = 50;
int MINZIE = 0;

function apilar(int num) {
    if(stack.length() == MAXSIZE){
        print("Pila llena");
    }
    else{
        stack.push(num);
    }
}

function desapilar(){
    if(stack.length() == MINZIE){
        print("Pila llena");
        return;
    }
    else{
        stack.pop();
    }
}

boolean estadoPila(){
    return stack.length() == MAXSIZE;
}

function vaciar(){
    stack = [];
}

void main(){
    for(int i = 1; i < 20 && !estadoPila(); i++){
        apilar(i);
    }
    println(stack.length()); //20
    println(stack);

    for(int i = 0; i < 10; i++){
        desapilar();
    }
    println(stack.length()); //10
    println(stack);

    for(int i = 10; i < 55; i++){
        apilar(i);
    }

    println(stack.length()); //50
    println(stack);
    String temp = "";
    for(int i=0;i<stack.length() ; i++){
        temp = temp & "|" & i & "|" & stack[i] & "|\n";
    }
    println("Pos | Val \n");
    print(temp);

    vaciar();
    desapilar();
}


