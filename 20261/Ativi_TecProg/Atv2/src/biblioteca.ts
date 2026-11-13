abstract class MaterialBiblioteca {
  protected titulo: string;
  protected codigo: string;
  protected date: Date;

  constructor(titulo: string, codigo: string) {
    ((this.titulo = titulo), (this.codigo = codigo), (this.date = new Date()));
  }

  abstract calcularPrazoEmprestimo(): number;

  multaPrazo(): void {
    const multaDiaria = 1.5; // Valor da multa diária em reais
    const prazo = this.calcularPrazoEmprestimo();
    const dataEmprestimo = this.date;
    const dataDevolucao = new Date(
      dataEmprestimo.getTime() + prazo * 24 * 60 * 60 * 1000,
    );
    if (new Date() > dataDevolucao) {
      const diasAtraso = Math.ceil(
        (new Date().getTime() - dataDevolucao.getTime()) /
          (24 * 60 * 60 * 1000),
      );
      return console.log(`Você deve pagar: R$ ${(diasAtraso * multaDiaria).toFixed(2)}`);
    } else {
      return console.log("Não há multa para este material.");
    }
  }

  exibirResumo(): void {
    console.log(`${this.constructor.name} - Título: ${this.titulo}, 
            Código: ${this.codigo} - Prazo: ${this.calcularPrazoEmprestimo()} dias`);
  }
}

class Livro extends MaterialBiblioteca{
    constructor (titulo: string, codigo:string) {
        super(titulo, codigo)
    }
    calcularPrazoEmprestimo(): number {
        return 7      
    }
}

class Revista extends MaterialBiblioteca {
    constructor ( titulo: string, codigo:string) { 
        super(titulo, codigo) }
    calcularPrazoEmprestimo(): number {
        return 3
    }
}

class Tese extends MaterialBiblioteca {
    constructor(titulo: string, codigo:string){
        super(titulo, codigo)
    }
    calcularPrazoEmprestimo(): number {
        return 10
    }
}

const livro1 = new Livro("O Senhor dos Anéis", "L001");
const revista1 = new Revista("Revista de Ciência", "R001");
const tese1 = new Tese("Tese de Doutorado", "T001");

livro1.exibirResumo();
revista1.exibirResumo();
tese1.exibirResumo();

livro1.multaPrazo();