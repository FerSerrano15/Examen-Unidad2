class Nodo {
    constructor(valor) {
        this.valor = valor;
        this.derecha = null;
        this.izquierda = null;
    }
}
// Crar metodo borrar y buscar 
class Arbol {
    constructor() {
        this.ruta = null;
    }

    eliminar() {
        return this.valor.pop();
    }

    isEmpty() {
        return this.ruta === null;
    }

    add(valor) {
        if (this.isEmpty()) {
            this.ruta = new Nodo(valor);
            return;
        }

        let aux = this.ruta;

        while (aux) {
            if (valor < aux.valor) {
                if (aux.izquierda) {
                    aux = aux.izquierda;
                } else {
                    aux.izquierda = new Nodo(valor);
                    return;
                }
            } else {
                if (aux.derecha) {
                    aux = aux.derecha;
                } else {
                    aux.derecha = new Nodo(valor);
                    return;
                }
            }
        }
    }

    Mostrar() {
        const contenedor = document.createElement('div');
        contenedor.className = 'arbol';
        this.MostrarNodo(this.ruta, contenedor, 0); 
        document.body.appendChild(contenedor);
    }

    MostrarNodo(nodo, contenedor, nivel) {
        if (nodo) {
            
            let nivelContenedor = contenedor.querySelector(`.nivel-${nivel}`);
            if (!nivelContenedor) {
                nivelContenedor = document.createElement('div');
                nivelContenedor.className = `nivel nivel-${nivel} color-nivel-${nivel}`;
                contenedor.appendChild(nivelContenedor);
            }
            
            
            const nodoDiv = document.createElement('div');
            nodoDiv.className = 'nodo';
            nodoDiv.innerText = nodo.valor;
            nivelContenedor.appendChild(nodoDiv);

           
            this.MostrarNodo(nodo.izquierda, contenedor, nivel + 1); 
            this.MostrarNodo(nodo.derecha, contenedor, nivel + 1); 
        }
    }
}

const ramitas = new Arbol();
const valores = [20, 5, 12, 6, 31, 16, 14, 75, 98, 76, 2, 60, 100, 3, 10, 1 ];
valores.forEach(valor => ramitas.add(valor));
ramitas.Mostrar();
console.log("El numero 6 será seleccionado: ");
valores.eliminar(6);