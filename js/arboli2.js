class Nodo {
    constructor(valor) {
        this.valor = valor;
        this.izquierdo = null;
        this.derecho = null;
    }
}

class ArbolBinario {
    constructor() {
        this.raiz = null;
    }

    insertar(valor) {
        const nuevoNodo = new Nodo(valor);
        if (this.raiz === null) {
            this.raiz = nuevoNodo;
        } else {
            this.insertarNodo(this.raiz, nuevoNodo);
        }
    }

    insertarNodo(nodo, nuevoNodo) {
        if (nuevoNodo.valor < nodo.valor) {
            if (nodo.izquierdo === null) {
                nodo.izquierdo = nuevoNodo;
            } else {
                this.insertarNodo(nodo.izquierdo, nuevoNodo);
            }
        } else {
            if (nodo.derecho === null) {
                nodo.derecho = nuevoNodo;
            } else {
                this.insertarNodo(nodo.derecho, nuevoNodo);
            }
        }
    }

    eliminar(valor) {
        this.raiz = this.eliminarNodo(this.raiz, valor);
    }

    eliminarNodo(nodo, valor) {
        if (nodo === null) {
            return null;
        } else if (valor < nodo.valor) {
            nodo.izquierdo = this.eliminarNodo(nodo.izquierdo, valor);
            return nodo;
        } else if (valor > nodo.valor) {
            nodo.derecho = this.eliminarNodo(nodo.derecho, valor);
            return nodo;
        } else {
            if (nodo.izquierdo === null && nodo.derecho === null) {
                return null;
            } else if (nodo.izquierdo === null) {
                return nodo.derecho;
            } else if (nodo.derecho === null) {
                return nodo.izquierdo;
            } else {
                const sucesor = this.encontrarSucesor(nodo.derecho);
                nodo.valor = sucesor.valor;
                nodo.derecho = this.eliminarNodo(nodo.derecho, sucesor.valor);
                return nodo;
            }
        }
    }

    encontrarSucesor(nodo) {
        let sucesor = nodo;
        while (sucesor.izquierdo !== null) {
            sucesor = sucesor.izquierdo;
        }
        return sucesor;
    }

    buscar(valor) {
        return this.buscarNodo(this.raiz, valor);
    }

    buscarNodo(nodo, valor) {
        if (nodo === null || nodo.valor === valor) {
            return nodo;
        } else if (valor < nodo.valor) {
            return this.buscarNodo(nodo.izquierdo, valor);
        } else {
            return this.buscarNodo(nodo.derecho, valor);
        }
    }

    preorden(nodo, nivel = 0, resultado = []) {
        if (nodo !== null) {
            if (!resultado[nivel]) {
                resultado[nivel] = [];
            }
            resultado[nivel].push(nodo.valor);
            this.preorden(nodo.izquierdo, nivel + 1, resultado);
            this.preorden(nodo.derecho, nivel + 1, resultado);
        }
        return resultado;
    }

    mostrar() {
        const niveles = this.preorden(this.raiz);
        const container = document.getElementById('container');
        container.innerHTML = '';
        niveles.forEach((nivel, index) => {
            const nivelDiv = document.createElement('div');
            nivelDiv.className = `nivel color-nivel-${index}`;
            nivel.forEach(valor => {
                const nodoDiv = document.createElement('div');
                nodoDiv.className = 'nodo';
                nodoDiv.textContent = valor;
                nivelDiv.appendChild(nodoDiv);
            });
            container.appendChild(nivelDiv);
        });
    }
}

const arbol = new ArbolBinario();

document.querySelector('input[name="agregar"]').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        arbol.insertar(parseInt(this.value));
        this.value = '';
        arbol.mostrar();
    }
});

document.querySelector('input[name="eliminar"]').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        arbol.eliminar(parseInt(this.value));
        this.value = '';
        arbol.mostrar();
    }
});

document.querySelector('input[name="buscar"]').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        const nodo = arbol.buscar(parseInt(this.value));
        if (nodo) {
            alert(`El valor ${this.value} si está en el arbol`);
        } else {
            alert(`El valor ${this.value} no está en el arbol `);
        }
        this.value = '';
    }
});
