
//elementos de interação:

//visuais
const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
const grass = document.querySelector('.grass')
const clouds = document.querySelector('.clouds')
const cloudsSlow = document.querySelector('.cloudsSlow')

//música e ações
const iniciarBtn = document.querySelector('#iniciarbtn')
const inicio = document.querySelector('.start')
const musicJump = new Audio("./audios/mario-jump.mp3")
const gameOverImg = document.querySelector('.game-over-img')
const gameOver = document.querySelector('.game-over')
const musicGameOver = new Audio("./audios/audio_gameover.mp3")
const musicTheme = new Audio("./audios/audio_theme.mp3")
const anime = document.querySelectorAll('keyframes')

//para as animações iniciarem pausadas até que o jogador clique em iniciar
let isPaused = false
let started = false


function iniciar() {

    musicTheme.play()

    //inicia o jogo, dando a cada elemento suas animações e posições iniciais
    inicio.style.display = 'none'

    grass.style.animation = 'grass-animation 15s infinite linear'
    clouds.style.animation = 'clouds-animation 20s infinite linear '
    cloudsSlow.style.animation = 'cloudsSlow-animation 30s infinite linear'
    pipe.style.animation = 'pipe-animation 3s infinite linear'
    clouds.style.right = '-550px'
    grass.style.right = '-3500px'
    pipe.style.right = '-80px'
    clouds.style.right = '-3500px'
    mario.src = './imagens/mario.gif'
    gameLoop = setInterval(loop, 10)


}
function pause() {
    // pause ou continua o jogo
    if (!isPaused) {
        pipe.style.animationPlayState = 'paused'
        mario.style.animationPlayState = 'paused'
        grass.style.animationPlayState = 'paused'
        clouds.style.animationPlayState = 'paused'
        cloudsSlow.style.animationPlayState = 'paused'
        isPaused = true
    } else {
        pipe.style.animationPlayState = 'running'
        mario.style.animationPlayState = 'running'
        grass.style.animationPlayState = 'running'
        clouds.style.animationPlayState = 'running'
        cloudsSlow.style.animationPlayState = 'running'
        isPaused = false
    }
}

function restart() {
    location.reload()
    iniciar()
}


const loop = () => {
    setInterval

    const pipePosition = pipe.offsetLeft
    const grassPosition = grass.offsetLeft
    const cloudsPosition = clouds.offsetLeft
    const cloudsSlowPosition = cloudsSlow.offsetLeft
    const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '')

    console.log("a")
    if (pipePosition <= 110 && pipePosition > 0 && marioPosition < 100) {
        musicTheme.pause()

        pipe.style.animation = 'none'
        pipe.style.left = `${pipePosition}px`

        grass.style.animation = 'none'
        grass.style.left = `${grassPosition}px`

        clouds.style.animation = 'none'
        clouds.style.left = `${cloudsPosition}px`

        cloudsSlow.style.animation = 'none'
        cloudsSlow.style.left = `${cloudsSlowPosition}px`

        mario.style.animation = 'none'
        mario.style.bottom = `${marioPosition}px`

        mario.src = './imagens/game-over.png'
        mario.style.width = '75px'
        mario.style.marginleft = '100px'
        musicGameOver.play()
        musicGameOver.loop = false
        gameOver.style.display = "flex"
        clearInterval(gameLoop)
    }

    if (pipePosition <= 110 && pipePosition > 0 && marioPosition > 100 && !collidedWithPipe) {
        // Incrementar a pontuação em 1
        score++;

        // Atualizar a interface com a nova pontuação
        document.getElementById('score').innerText = score;

        collidedWithPipe = true; // Defina a variável de controle como verdadeira para evitar incrementos múltiplos
    }

    // Se o Mario não estiver mais colidindo com o cano, redefina a variável de controle para false
    if (pipePosition > 110 || pipePosition <= 0 || marioPosition <= 100) {
        collidedWithPipe = false;
    }
}

// score

let score = 0;
let collidedWithPipe = false;

//Aqui é onde cada botão do teclado e verificado para ver se foi pressionado ou não

const jump = () => {
    mario.classList.add('jump')
    musicJump.play()
    setTimeout(() => {
        mario.classList.remove('jump')
    }, 800)

}

document.addEventListener('keydown', (e) => {
    if (e.key === ' ' || e.key === 'Spacebar') {
        jump()
    }
})

document.addEventListener('touchstart', ()=>{
    
        jump()
    
})

document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && started) {
        restart()
    } else {
        iniciar()
        started = true
    }
})

document.addEventListener('keydown', (e) => {
    if (e.key === 'p' || e.key === 'P') {
        pause()
    }
})
