class CadastroProntuarios<T extends Prontuarios>{
    protected prontuarios: T[] = [];

    adicionar(prontuario: T): void {
        this.prontuarios.push(prontuario);
    }

    listar(): T[] {
        return this.prontuarios;
    }
    
    imprimirResumos(): void{
        for (const prontuario of this.prontuarios) {
            console.log(prontuario.gerarResumo());
        }
    };
}


abstract class Prontuarios{
    protected paciente: string;
    constructor(paciente: string){
        this.paciente = paciente;
    }

    abstract gerarResumo() :string;
}

class ProntuarioCardiologico extends Prontuarios{
   
    gerarResumo(): string {
        return 'Resumo Cardiologico ruim';
    
    }
}

class ProntuarioOrtopedico extends Prontuarios{
   
    gerarResumo(): string {
        return 'Resumo Ortopedicoo ruim';
    
    }
}   

class ProntuarioPediatrico extends Prontuarios{
   
    gerarResumo(): string {
        return 'Resumo Pediatrico ruim';
    
    }
}

const prontuarios = new CadastroProntuarios<Prontuarios>();

prontuarios.adicionar(new ProntuarioCardiologico('Paciente1'));
prontuarios.adicionar(new ProntuarioOrtopedico('Paciente2'));
prontuarios.adicionar(new ProntuarioPediatrico('Paciente3'));

prontuarios.imprimirResumos();
console.log("-----------------");
console.log(prontuarios.listar());