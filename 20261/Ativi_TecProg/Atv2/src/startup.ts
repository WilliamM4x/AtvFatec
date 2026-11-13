// import { Aluno } from "./academico";

class Repositorio<T>{
    protected itens: T[] = [];

    adicionar(item: T): void {
        this.itens.push(item);
    }

    listar(): T[] {
        return this.itens;
    }
    
    buscar(indice: number): T | undefined {
     return this.itens[indice];
    }

    // filtrar(criterio: (item: T) => boolean): T[]{
    //     return this.itens.filter(criterio);
    // }

    remover(indice: number): void {
        if (indice >= 0 && indice < this.itens.length) {
            this.itens.splice(indice, 1);
            return console.log("Item removido com sucesso.");
        } else {
            return console.log("Índice inválido.");
        }
    }
}

const repositorio = new Repositorio<string>();

repositorio.adicionar("Item 1");
repositorio.adicionar("Item 2");
repositorio.adicionar("Item 3");

console.log(repositorio.listar());
console.log(repositorio.buscar(1));

repositorio.remover(1);
repositorio.remover(10);
console.log(repositorio.listar());

// console.log(repositorio.filtrar((Item) => item.includes("2")));