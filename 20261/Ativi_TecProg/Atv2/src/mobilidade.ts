abstract class Veiculo {
    protected placa: string;
    protected modelo: string;

    constructor(placa: string, modelo: string) {
        this.placa = placa;
        this.modelo = modelo;
    }
    abstract calcularTarifa(distancia: number): number;
}

class CarroComum extends Veiculo {
    constructor(placa: string, modelo: string){
        super(placa, modelo)
    }
    calcularTarifa(distancia: number): number {
        return distancia * 2.5
    }
}

class CarroPremium extends Veiculo {
    constructor(placa: string, modelo: string){
        super(placa, modelo)
    }
    calcularTarifa(distancia: number): number {
        return distancia * 4.0
    }
}

class Moto extends Veiculo {
    constructor(placa: string, modelo: string){
        super(placa, modelo)
    }
    calcularTarifa(distancia: number): number {
        return distancia * 1.8
    }
}

// A heraça ocorre ao extender a classe pai e o costrutor herda-se os atributos
// O polimorfismo ocorre ao criar as funções clacularTarifa que sobrecrevem a classe pai e para cada uma há um "comportamento"

let Veiculos : Veiculo[] = [
    new CarroComum("ABC1234", "Fiat Uno"),
    new CarroPremium("DEF5678", "BMW X5"),
    new Moto("GHI9012", "Honda CG")
] 

Veiculos.forEach((veiculo)=>{
    console.log(`${veiculo.constructor.name} - Tarifa para 10km: R$ ${veiculo.calcularTarifa(10).toFixed(2)}`);
})