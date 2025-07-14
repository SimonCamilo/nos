let n1 = (x) => Math.abs(x * 2)
console.log(n1(5))
    
const n= (x, y) => x > y ? x : y;
console.log(n(5, 7))

const nomes= (nome, sobrenome) => `${nome} ${sobrenome}`;
const nome = prompt("Digite seu nome:");
const sobrenome = prompt("Digite seu sobrenome:");
console.log(nomes(nome, sobrenome));

const exercicio4 = numero => numero > 0;
console.log(exercicio4(9))
console.log(exercicio4(-2))

const exercicio5 = (base, altura) => base * altura;
console.log(exercicio5(15, 6))

const exercicio6 = celsius => (celsius * 9/5) + 32;
console.log(exercicio6(15));

const exercicio7 = idade => idade >= 18 ? "Maior de idade" : "Menor de idade";
console.log(exercicio7(19))

const exercicio8 = (n) => {
    if (n < 0) return;
    if (n === 0) return 1;
    let resultado = 1;
    for (let i = 1; i <= n; i++) {
        resultado *= i;
    }
    return resultado;
};
console.log(exercicio8(8))

const exercicio9 = (a, b) => Math.abs(a - b);
console.log(exercicio9(3,9))

const exercicio10 = (numeros) => numeros % 3 === 0;
console.log(exercicio10(9))
console.log(exercicio10(17))