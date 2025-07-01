const canvas = document.querySelector(".game-canvas")
const ctx = canvas.getContext("2d");

const jogador = {
    x: 10,
    y: 5,
    direcao:"down",
    frameIndex: 0,
    frameContador: 0,
    frameFinal: 0,
    movimentoRestante:0,
    estaMovimentando:false,
    velocidade: 1,
}

const direcoes = {
    "down": 0,
    "right": 32,
    "up": 64,
    "left": 96,
}

const teclas = {
    down:false,
    up: false,
    right: false,
    left: false,
}

const direcaoupdate = {
    "up": ["y", -1],
    "down": ["y", 1],
    "left": ["x", -1],
    "right": ["x", 1],
}

let imagemJogador = new Image();
imagemJogador.src = "src/assets/imagens/characters/people/hero.png";

function desenharJogador(){
    ctx.drawImage(
        imagemJogador,
        jogador.frameIndex, direcoes[jogador.direcao],
        32, 32,
        jogador.x, jogador.y,
        32,32
    );
}

function InicialMovimento(){
    if(jogador.movimentoRestante > 0)return;

    let direcao = null

    if(teclas.down) direcao = "down";
    else if (teclas.right) direcao = "right";
    else if (teclas.up) direcao = "up";
    else if (teclas.left) direcao = "left";

    if (!direcao) return;

    jogador.direcao = direcao;
    jogador.movimentoRestante = 4;
}

function atualizarPosicaodoJogador(){
    if(jogador.movimentoRestante > 0){

        const[prop,valor] = direcaoupdate[jogador.direcao];
        jogador[prop] += valor * jogador.velocidade;
        jogador.movimentoRestante -= jogador.velocidade;

        if(jogador.movimentoRestante <= 0){
            jogador.movimentoRestante = 0;
        }

        jogador.estaMovimentando = true;
    }
    else{
        jogador.estaMovimentando = false;
    }
}

function gameLoop(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    desenharJogador ();
    InicialMovimento();
    atualizarPosicaodoJogador();
    requestAnimationFrame(gameLoop);

}

addEventListener("keydown",(event) => {
    const tecla = event.key;
    if (tecla == "ArrowDown") teclas.down = true;
    if (tecla == "ArrowUp") teclas.up = true;
    if (tecla == "ArrowRight") teclas.right = true;
    if (tecla == "ArrowLeft") teclas.left = true;

})

addEventListener("keyup",(event) => {
    const tecla = event.key;
    if (tecla == "ArrowDown") teclas.down = false;
    if (tecla == "ArrowUp") teclas.up = false;
    if (tecla == "ArrowRight") teclas.right = false;
    if (tecla == "ArrowLeft") teclas.left = false;

})

gameLoop()