const html = document.querySelector('html')
const focoBt = document.querySelector('.app__card-button--foco')
const curtoBt = document.querySelector('.app__card-button--curto')
const longoBt = document.querySelector('.app__card-button--longo')
const banner = document.querySelector('.app__image')
const texto = document.querySelector('.app__title')
const botoes = document.querySelectorAll('.app__card-button')
const startPauseBt = document.querySelector('#start-pause')
const audioTempoFinalizado = new Audio('./sons/beep.mp3')
const playPauseBt = document.querySelector('#start-pause span')
const playPauseImgBt = document.querySelector('#start-pause img')
const tempoNaTela = document.querySelector('#timer')

const musicaFoco = document.querySelector('#alternar-musica')
const musica = new Audio('/sons/luna-rise-part-one.mp3')
const audioPlay = new Audio('/sons/play.wav')
const audioPausa = new Audio('/sons/pause.mp3')

let tempoEmSegundos = 1500
let intervaloId = null

musicaFoco.addEventListener ('change', () => {
  if(musica.paused) {
    musica.play()
  } else {
    musica.pause()
  }

})

function alterarContexto (contexto) {
  mostrarTempo()
  botoes.forEach(function (contexto) {
    contexto.classList.remove('active')
  })
  html.setAttribute('data-contexto', contexto)
  banner.setAttribute('src', `/imagens/${contexto}.png`)
  switch (contexto) {
    case "foco":
      texto.innerHTML = `Otimize sua produtividade,<br>
      <strong class="app__title-strong">mergulhe no que importa.</strong>`
      
      break;
    case "descanso-curto":
      texto.innerHTML = `Que tal dar uma respirada?<strong class="app__title-strong"> Faça uma pausa curta!</strong>`

      break;

    case "descanso-longo":
      texto.innerHTML = `Hora de voltar à superfície.
      <strong class="app__title-strong"> Faça uma pausa longa.</strong>`

      default:
      break;
  }
}

focoBt.addEventListener('click', () => {
  tempoEmSegundos = 1500
  alterarContexto('foco')
  focoBt.classList.add('active')
})

curtoBt.addEventListener('click', () => {
  tempoEmSegundos = 300
  alterarContexto('descanso-curto')
  curtoBt.classList.add('active')
})

longoBt.addEventListener('click', () => {
  tempoEmSegundos = 900
  alterarContexto ('descanso-longo')
  longoBt.classList.add('active')
})

const contagemRegressiva = () => {
  if(tempoEmSegundos<=0) {
    audioTempoFinalizado.play()
    zerar()
    alert('Fim do tempo')
    return
  }
  tempoEmSegundos -= 1
  mostrarTempo()
}
  
startPauseBt.addEventListener('click', iniciarEPausar)

function iniciarEPausar () {
  if (intervaloId){
    audioPausa.play()
    zerar()
    return
  }
  audioPlay.play()
  intervaloId = setInterval(contagemRegressiva, 1000)
  playPauseImgBt.setAttribute('src', `/imagens/pause.png`)
  playPauseBt.textContent = 'Pausar'
}

function zerar () {
  clearInterval (intervaloId)
  playPauseBt.textContent = 'Começar'
  playPauseImgBt.setAttribute('src', `/imagens/play_arrow.png`)
  intervaloId = null
}

function mostrarTempo() {
  const tempo = new Date(tempoEmSegundos * 1000)
  const tempoFormatado = tempo.toLocaleString ('pt-br',{minute: '2-digit', second: '2-digit'})
  tempoNaTela.innerHTML = `${tempoFormatado}`
}

mostrarTempo()