abstract class Produto {
    protected nome: string;
    protected preco: number;

    constructor(nome: string, preco: number) {
        this.nome = nome;
        this.preco = preco;
    }
    
    abstract calcularDesconto(): number;
    abstract calcularFrete(): number;
    getPreco():number{
        return this.preco
    }

    getName():string{
        return this.nome
    }
}

class Eletronico extends Produto {
    constructor(nome: string, preco: number) {
        super(nome, preco);
    }
    calcularDesconto(): number {
        return this.preco * 0.1;
    }
    calcularFrete(): number {
        return 15;
    }
}    

class Livro extends Produto {
    constructor(nome: string, preco: number) {
        super(nome, preco);
    }
    calcularDesconto(): number {
        return this.preco * 0.05;
    }
    calcularFrete(): number {
        return 5;
    }
}

class Alimento extends Produto {
    constructor(nome: string, preco: number) {
        super(nome, preco);
    }
    calcularDesconto(): number {
        return this.preco * 0.02;
    }
    calcularFrete(): number {
        return 10;
    }
}

function valorTotal(produtos: Produto): void {
    const valor= produtos.getPreco() - produtos.calcularDesconto() + produtos.calcularFrete();
    console.log(`Produto: ${produtos.getName()} - Valor Total: R$ ${valor.toFixed(2)}`);
}

let produtos: Produto[] = [
    new Eletronico("Smartphone", 2000),
    new Livro("Livro de Programação", 100),
    new Alimento("Chocolate", 10)
]

produtos.forEach((produto) => {
    valorTotal(produto);
})