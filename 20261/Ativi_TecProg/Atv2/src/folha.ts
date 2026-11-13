abstract class Colaborador {
    protected nome: string;
    protected matricula: string;

    constructor(nome: string, matricula: string) {
        this.nome = nome;
        this.matricula = matricula;
    }

    abstract calcularPagamento(): number;
}

class Efetivo extends Colaborador {
    protected salarioMensal: number;
    constructor(nome: string, matricula: string, salarioMensal: number) {
        super(nome, matricula);
        this.salarioMensal = salarioMensal;
    }
    calcularPagamento(): number {
        return this.salarioMensal;
    }
}

class Freelancer extends Colaborador {
    protected valorHora: number;
    protected horasTrabalhadas: number;

    constructor(nome: string, matricula: string, valorHora: number, horasTrabalhadas: number) {
        super(nome, matricula);
        this.valorHora = valorHora;
        this.horasTrabalhadas = horasTrabalhadas;
    }

    calcularPagamento(): number {
        return this.valorHora * this.horasTrabalhadas;
    }

}

class Estagiario extends Colaborador {
    protected bolsaAuxilio: number;
    constructor(nome: string, matricula: string, bolsaAuxilio: number) {
        super(nome, matricula);
        this.bolsaAuxilio = bolsaAuxilio;
    }
    calcularPagamento(): number {
        return this.bolsaAuxilio;
    }
}

let colaboradores: Colaborador[] = [
    new Efetivo("João Silva", "12345", 3000),
    new Freelancer("Maria Oliveira", "67890", 50, 160),
    new Estagiario("Carlos Souza", "54321", 1500)
]

function processarPagamentos(colaboradores: Colaborador[]): void {
    for (const c of colaboradores) {
        console.log(`${c.constructor.name}: R$ ${c.calcularPagamento().toFixed(2)}`);
    }
}
processarPagamentos(colaboradores);