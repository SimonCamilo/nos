/*const pessoa = {
    nome: "simon",
    idade: 15,
    altura: 1.68,
    jogar: function(){
        console.log(`${this.nome} tem ${this.idade} esta jogar`)
    }
};

const pessoa2 = {
    nome: "andre",
    idade: 41,
    altura: 1.8,
    correr: () => {
        console.log(`${this.nome} tem ${this.idade} esta correndo`)
    }
};

pessoa.jogar();
pessoa2.correr();*/

let numeros = [10,20,30,40,50];
let frutas =["melancia", "maça" , "uva"];

let supermercado = Array(3).fill("banana");
console.log(supermercado)

frutas.forEach((valor, index) => {
    console.log(`fruta ${index}: ${valor}`)
})

let resultados = numeros.map((num) => {
    console.log(`a lista é: ${num*10}`)
})

let resultadoFilter = numeros.filter((n) => {
    return n > 20
    }
)
console.log(resultadoFilter)

let mapa = Array.from({length: 3}, () => Array(2).fill("x"));
console.log(mapa);
