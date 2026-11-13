abstract class Usuario{
    protected nome: string;
    protected email: string;

    constructor(nome: string, email: string) {
        this.nome = nome;
        this.email = email;
    }
    
    abstract exibirPerfil(): void;
}

class Aluno extends Usuario {
    protected curso: string; 
    protected periodo: string;
    constructor(nome: string, email: string, curso: string, periodo: string) {
        super(nome, email);
        this.curso = curso;
        this.periodo = periodo;
    }
    exibirPerfil(): void {
        console.log(`UserType:${this.constructor.name} | 
            Aluno: ${this.nome} - Email: ${this.email} - Curso: ${this.curso} - Período: ${this.periodo}`);
    }
}

class Professor extends Usuario {
    protected area: string;
    protected titulacao: string;
    constructor(nome: string, email: string, area: string,titulacao: string) {
        super(nome, email);
        this.area = area;
        this.titulacao = titulacao;
    }
    exibirPerfil(): void {
        console.log(`UserType:${this.constructor.name} | 
            Professor: ${this.nome} - Email: ${this.email} - Área: ${this.area} - Titulação: ${this.titulacao}`);   
    }
}    

class Coordenador extends Usuario {
    protected departamento: string;
    protected tempoCasa: number;
    constructor(nome: string, email: string, departamento: string, tempoCasa: number) {
        super(nome, email);
        this.tempoCasa = tempoCasa;
        this.departamento = departamento;
    }
    exibirPerfil(): void {
        console.log(`UserType:${this.constructor.name} | 
            Coordenador: ${this.nome} - Email: ${this.email} - Departamento: ${this.departamento} - Tempo de Cargo: ${this.tempoCasa} anos`);   
    }
}

const usuarios: Usuario[] = [
    new Aluno("Alice", "alice@email.com", "Sistemas de Informação", "3º período"),
    new Professor("Dr. Silva", "silva@email.com", "Computação", "Doutorado"),
    new Coordenador("Prof. Oliveira", "oliveira@email.com", "Departamento de Computação", 5)
];

usuarios.forEach(element => {
    element.exibirPerfil();
});

// export {Usuario, Aluno, Professor, Coordenador}