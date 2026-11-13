// class Pessoa {
//     // Propriedades
//     // private nome: string;
//     // private idade: number;

//     // Construtores que são os parêmetro esperados pela class
//     // constructor(nome:string, idade: number){
//     //     this.nome="";
//     //     this.idade=0;
//     // }

//     constructor(private nome:string, private idade:number){
//     }

//     print():void{
//         console.log("Oie");
//     }


//     // Métodos para alterção de propriedades
//     setX(nome:string):string{
//         return this.nome = nome;
//     }

//     getX(){
//         return this.nome;
//     }
// }

class Um {
    constructor(private caracter:string){}

    letra(){
        console.log("Um.letra", this.caracter);
    }
}

class Dois extends Um {
    private nro:number;

    constructor(letra:string, nro:number){
        super(letra);
        this.nro = nro;
    }

    digito(){
        console.log("Dois.digito", this.nro);
    }
}

class Tres extends Dois {
    private pont:string;

    constructor(letra:string, nro:number, pont:string){
        super(letra, nro);
        this.pont = pont;
    }

    pontuacao(){
        console.log("Tres.pontuacao", this.pont);
    }
}

const a = new Tres("a",9,":");
a.letra();
a.digito();
a.pontuacao();

