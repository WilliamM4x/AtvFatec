// class User1{
//     constructor(private name: string, private age: number) {}
// }

// class User{
//     //definindo propriedades da classe
//     private name: string = "";
//     private age:number = 0;

//     constructor(name: string, age:number){
//         // definindo atributos que tem o mesmo nome da propriedades
//         this.name = name;
//         this.age = age;
//     }

//     setAge(age:number){
//         this.age=age
//     }

//     print(){
//         console.log(this.name, this.age)
//     }
// }

// const a = new User("Maria", 12);
// const b = new User("Ana", 10);
// const c= a;
// c.setAge(25)
// a.print()
// console.log(typeof(c))

interface Veiculo{
    acelerar(): void;
    frear(): void;
} 

class Carro implements Veiculo{
    acelerar(): void {
        console.log("Acelerando....")
    }
    frear(): void {
        console.log("Freando....")
    }
}

const a:Veiculo = new Carro();