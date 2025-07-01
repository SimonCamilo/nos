const canvas = document.querySelector (".game-canvas")
const ctx = canvas.getContext("2d");

const jogador = {
    x: 18 * 16 - 8,
    y: 12 * 16,
    direcao:"down",
    frameIndex: 0,
    frameContador: 0,
    frameFinal: 8,
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

const mapa = {
    x: -3 * 16,
    y: 0,
}

const camera = {
    x: 0,
    y: 0,
    largura: canvas.width,
    altura: canvas.height,
}

const gameObjects = [   
    {
        nome: "npc1",
        x: 11 * 16 - 8,
        y: 10 * 16,
        direcao:"down",
        frameIndex: 0,
        frameContador: 0,
        frameFinal: 8,
        movimentoRestante:0,
        estaMovimentando:false,
        velocidade: 1,
        imagem: new Image(),
        
        comportamentos: [
            {tipo: "andar", direcao: "left", passos: 1},
            {tipo: "andar", direcao: "down", passos: 1},
            {tipo: "andar", direcao: "right", passos: 1},
            {tipo:"esperar", time: 3000},
            {tipo: "andar", direcao: "up", passos: 1},
        ],
        comportamentoAtual: null,
        tempodeEspera: 0,
    },
    {
        nome: "npc2",
        x: 25 * 16 - 8,
        y: 10 * 16,
        direcao:"down",
        frameIndex: 0,
        frameContador: 0,
        frameFinal: 8,
        movimentoRestante:0,
        estaMovimentando:false,
        velocidade: 1,
        imagem: new Image(),

        comportamentos: [
            {tipo: "esperar", direcao: "left", time:2000},
            {tipo: "esperar", direcao: "right", time:2000},
            {tipo: "esperar", direcao: "down", time:2000},
            {tipo: "esperar", direcao: "up", time: 2000},
        ],
        comportamentoAtual: null,
        tempodeEspera: 0,
    },
    {
        nome: "npc3",
        x: 5 * 16,
        y: 10 * 16,
        direcao:"down",
        frameIndex: 0,
        frameContador: 0,
        frameFinal: 8,
        imagem: new Image(),
        movimentoRestante:0,
        estaMovimentando:false,
        velocidade: 1,

        comportamento: [
            {tipo:"andar", passos: 1},
        ]
    }
];

let imagemJogador = new Image();
imagemJogador.src = "src/assets/imagens/characters/people/hero.png";

let ImageMapaEmbaixo = new Image();
ImageMapaEmbaixo.src = "src/assets/imagens/maps/StreetLower.png";

let ImageMapaAcima = new Image();
ImageMapaAcima.src = "src/assets/imagens/maps/StreetUpper.png";

gameObjects[0].imagem.src = "src/assets/imagens/characters/people/npc1.png";
gameObjects[1].imagem.src = "src/assets/imagens/characters/people/npc3.png";
gameObjects[2].imagem.src = "src/assets/imagens/characters/people/npc4.png"

function desenharJogador(){
    ctx.drawImage(
        imagemJogador,
        jogador.frameIndex, direcoes[jogador.direcao],
        32, 32,
        jogador.x - camera.x, jogador.y - camera.y,
        32,32
    );
}

function desenharMapaEmbaixo(){
    ctx.drawImage(ImageMapaEmbaixo, mapa.x - camera.x, mapa.y - camera.y);
}
function desenharMapaAcima(){
    ctx.drawImage(ImageMapaAcima, mapa.x - camera.x, mapa.y - camera.y);
} 

function InicialMovimento(){
    if(jogador.movimentoRestante > 0)return;

    let direcao = null

    if(teclas.down) direcao = "down";
    else if (teclas.right) direcao = "right";
    else if (teclas.up) direcao = "up";
    else if (teclas.left) direcao = "left";

    if (!direcao) return;

    //Depuração
    console.log(`x: ${Math.floor(jogador.x/16)}`);
    console.log(`y: ${Math.floor(jogador.y/16)}`);

    const [prop, valor] = direcaoupdate[direcao];

    const neoX = jogador.x + (prop === "x" ? valor * 16 : 0);
    const neoY = jogador.y + (prop === "y" ? valor * 16 : 0);

    if (podemover(neoX,neoY)){
        jogador.direcao = direcao;
        jogador.movimentoRestante = 16;
    }
}

function podemover(x,y){
    const tileX = Math.floor(x/16);
    const tileY = Math.floor(y/16);

    //Colisão com os limites do mapa
    if (tileX < 0 ||
        tileX >= mapacolisao[0].length ||
        tileY < 0 ||
        tileY >= mapacolisao.length 
    )return false;

    //Colisão com os tiles 1 do mapa
    if (mapacolisao[tileY][tileX]== 1){
        return false;
    }

    for (let obj of gameObjects){
        const npcTileX = Math.floor(obj.x / 16);
        const npcTileY = Math.floor(obj.y / 16);

        if(npcTileX === tileX && npcTileY === tileY){
            return false;
        }
    }

    //Retorne passagem livre, caso não tenha colisão
    return true;
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

function atualizarMovimentodoJogador(){
    if(jogador.estaMovimentando){
        jogador.frameContador++;

        if(jogador.frameContador > jogador.frameFinal){
            jogador.frameIndex = (jogador.frameIndex + 32)% 128;
            jogador.frameContador = 0;
        }
    }
}

function atualizarCamera(){
    camera.x = jogador.x - camera.largura/2
    camera.y = jogador.y - camera.altura/2
}

function desenharGameObject(){
    gameObjects.forEach( (obj) => {
        ctx.drawImage(
            obj.imagem,
            obj.frameIndex, direcoes[obj.direcao],
            32, 32,
            obj.x - camera.x, obj.y - camera.y,
            32,32
        );  
    } )
}

function atualizarAnimacaoGameobj(){
    gameObjects.forEach((npc) => {
        if (npc.estaMovimentando){
            npc.frameContador++;
            if(npc.frameContador> npc.frameFinal){
                npc.frameIndex = (npc.frameIndex + 32) % 128;
                npc.frameContador = 0;
            }
        }else{
            npc.frameIndex = 0;
        }
    })
}

function criarMapaColisao(linhas, colunas){
    const mapa = Array.from({length: linhas}, () => Array(colunas).fill(0));
    for (let i = 10; i < 23; i++){
        mapa[10][i] = 1;
    }
    for (let i = 0; i < 1; i++){
        mapa[8][i] = 1
    }
    for (let i = 2; i < 9; i++){
        mapa[8][i] = 1;
    }
    for (let i = 9; i < 11; i++){
        mapa[7][i] = 1;
    }
    for (let i = 11; i < 21; i++){
        mapa[6][i] = 1;
    }
    for (let i = 22; i < 25; i++){
        mapa[6][i] = 1;
    }
    for (let i = 24; i < 25; i++){
        mapa[8][i] = 1;
    }
    for (let i = 26; i < 30; i++){
        mapa[8][i] = 1;
    }
    return mapa;
}

const mapacolisao = criarMapaColisao(13,30);

gameObjects.forEach((npc) => {
    if(npc.comportamentos && npc.comportamentos.length > 0){
        executarComportamento(npc);
    }
});

async function executarComportamento(npc){
    while (true){
        for(let comportamento of npc.comportamentos){
            if(comportamento.tipo == "andar"){

                npc.estaMovimentando= true;

                for(let i = 0; i < comportamento.passos; i++){
                    moverNpc(npc,comportamento.direcao)
                    while (npc.movimentoRestante > 0){
                        await esperar(16);
                    }
                }                    
                npc.estaMovimentando= false;
            }
            else if(comportamento.tipo == "esperar"){
                if(comportamento.direcao){
                    npc.direcao = comportamento.direcao;
                }
                await esperar(comportamento.time || 1000);
            }
                await esperar(200)
        }
    }
};

async function executarComportamentos(npc) {
    if(npc.nome === "Npc3"){
        while(true){
            if (npc.movimentoRestante === 0) {
                const dx = jogador.x - npc.x;
                const dy = jogador.y - npc.y;

                let direcaoPerseguidor;

                if (Math.abs(dx) > Math.abs(dy)) {
                    direcaoPerseguidor = dx > 0 ? "right" : "left";
                }else{
                    direcaoPerseguidor = dy > 0 ? "down" : "up";
                }

                moverNpc(npc, direcaoPerseguidor)
            }
            await esperar(10);
        }
    }else{
    }
};
function moverNpc(npc, direcao){

    if (npc.movimentoRestante > 0) return;

    npc.direcao = direcao;
    npc.movimentoRestante = 16;
}

function esperar(ms){
    return new Promise ((resolve) => {setTimeout(resolve, ms)}); 
}

function atualizarPosicaodoNPC(){
    gameObjects.forEach((npc) => {
        if(npc.movimentoRestante > 0){
            const [prop, valor] = direcaoupdate[npc.direcao];
            npc[prop] += valor * npc.velocidade;
            npc.movimentoRestante -= npc.velocidade;

            if(npc.movimentoRestante < 0){
                npc.movimentoRestante = 0;
            }
            npc.estaMovimentando = true;
        }
        else{
            npc.estaMovimentando = false;
        }
    });
}
function gameLoop(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    desenharMapaEmbaixo();
    desenharJogador ();
    desenharMapaAcima();
    
    InicialMovimento();
    atualizarPosicaodoJogador();
    atualizarMovimentodoJogador();

    desenharGameObject();
    atualizarAnimacaoGameobj()
    atualizarPosicaodoNPC();

    atualizarCamera();
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