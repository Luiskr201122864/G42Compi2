function LinkedList() {
    var Node = function(element) {
        this.element = element;
        this.next = null;
    };

    var listSize = 0;
    var headNode = null;
    this.get = get;
    this.add = add;
    this.insert = insert;
    this.remove = remove;
    this.removeFrom = removeFrom;
    this.indexOf = indexOf;
    this.hasElements = hasElements;
    this.size = size;
    this.toString = toString;
    this.clone = clone;

    function add(element) {

        var node = new Node(element);
        var currentNode;

        if (!headNode) {
            headNode = node;
        } else {
            currentNode = headNode;
            while (currentNode.next) {
                currentNode = currentNode.next;
            }
            currentNode.next = node;
        }
        listSize++;
    }

    function insert(element, pos) {
        if (pos > -1 && pos < listSize) {
            var node = new Node(element);
            var currentNode = headNode;
            var previousNode;
            var index = 0;
            if (pos === 0) {
                node.next = currentNode;
                headNode = node;
            } else {
                while (index++ < pos) {
                    previousNode = currentNode;
                    currentNode = currentNode.next;
                }
                node.next = currentNode;
                previousNode.next = node;
            }
            listSize++;
            return true;
        }

        return false;
    }

    function remove(element) {
        var index = this.indexOf(element);
        return this.removeFrom(index);
    }

    function removeFrom(pos) {
        if (pos > -1 && pos < listSize) {
            var currentNode = headNode;
            var previousNode;
            var index = 0;
            if (pos === 0) {
                headNode = currentNode.next;
            } else {
                while (index++ < pos) {
                    previousNode = currentNode;
                    currentNode = currentNode.next;
                }
                previousNode.next = currentNode.next;
            }
            listSize--;
            return currentNode.element;
        }
        return null;
    }

    function indexOf(element) {
        var currentNode = headNode;
        var index = 0;
        while (currentNode) {
            if (currentNode.element === element) {
                return index;
            }
            index++;
            currentNode = currentNode.next;
        }
        return -1;
    }
    function get(index) {
        var currentNode = headNode;
        var index2 = 0;

        while (currentNode) {
            if (index === index2) {
                return currentNode.element;
            }
            index2++;
            currentNode = currentNode.next;
        }

        return null;
    }

    function hasElements() {
        return listSize > 0;
    }

    function size() {
        return listSize;
    }

    function clone() {
        var currentNode = headNode;
        var retorno = new LinkedList();

        while (currentNode) {
             retorno.add(currentNode.element.nombre);
             currentNode = currentNode.next;
        }

        return retorno;
    }

    function toString() {
        var currentNode = headNode;
        var str = "|";

        while (currentNode) {
            str += currentNode.element.nombre + "|";
            currentNode = currentNode.next;
        }

        return str;
    }

}


function arbol() {
        this.nombre = "";
        this.valor = "";
        this.tipo = "";
        this.linea = "";
        this.columna = "";
        this.hijos = new LinkedList();
}