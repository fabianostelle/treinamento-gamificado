import {
    auth,
    db,
    signInAnonymously,
    collection,
    addDoc,
    getDocs,
    query,
    orderBy,
    limit
} from "./firebase-config.js";


// script.js
let moduloAtual = 1;
let perguntaAtualNoModulo = 0;
let pontuacaoTotal = 0;
let pontuacaoModuloAtual = 0;
let nomeJogador = "";
let avatarSelecionado = 1; // 1 = Homem, 2 = Mulher
let timerInterval;
let tempoRestante = 30;

const totalModulos = 5;

const nomesModulos = {
    1: "Integração",
    2: "Segurança do Trabalho",
    3: "Qualidade na Execução",
    4: "Processos e Procedimentos",
    5: "Sustentabilidade e Meio Ambiente"
};

// Sons diferentes por avatar
const sonsHomem = {
    acerto: new Audio("https://assets.mixkit.co/sfx/preview/2964/2964.wav"),
    erro: new Audio("https://assets.mixkit.co/sfx/preview/2957/2957.wav"),
    final: new Audio("https://assets.mixkit.co/sfx/preview/2962/2962.wav")
};

const sonsMulher = {
    acerto: new Audio("https://assets.mixkit.co/sfx/preview/2965/2965.wav"),
    erro: new Audio("https://assets.mixkit.co/sfx/preview/2958/2958.wav"),
    final: new Audio("https://assets.mixkit.co/sfx/preview/2963/2963.wav")
};

// Sons
const somAcerto = new Audio("acerto.mp3");
const somErro = new Audio("erro.mp3");
const somFinal = new Audio("final.mp3");

function tocarSom(tipo) {
    // Para todos os sons
    [somAcerto, somErro, somFinal].forEach(audio => {
        audio.pause();
        audio.currentTime = 0;
    });

    let audio = null;

    if (tipo === "acerto") audio = somAcerto;
    if (tipo === "erro") audio = somErro;
    if (tipo === "final") audio = somFinal;

    if (audio) {
        audio.volume = 0.65;
        audio.play().catch(() => {});
    }
}

// Música de fundo
const musicaFundo = new Audio("fundo.mp3");
musicaFundo.loop = true;      // Fica em loop
musicaFundo.volume = 0.25;    // Volume mais baixo para não atrapalhar os efeitos


function irParaSelecaoAvatar() {
    document.getElementById("tela-inicial").style.display = "none";
    document.getElementById("tela-avatar").style.display = "block";

    // Esconde o título
    const header = document.querySelector("header");
    if (header) header.classList.add("esconder-titulo");

    // Ajusta o espaçamento
    const container = document.querySelector(".container");
    if (container) container.classList.add("sem-titulo");
}

function selecionarAvatar(num) {
    avatarSelecionado = num;

    // Destaca o card selecionado
    document.getElementById("card-thor").style.border = "3px solid transparent";
    document.getElementById("card-nina").style.border = "3px solid transparent";

    if (num === 1) {
        document.getElementById("card-thor").style.border = "3px solid #60a5fa";
    } else {
        document.getElementById("card-nina").style.border = "3px solid #f472b6";
    }

    document.getElementById("btn-confirmar-avatar").style.display = "inline-block";
}

function confirmarAvatar() {
    // Pede o nome depois de escolher o avatar
    nomeJogador = prompt("Digite seu nome:", "Aluno");
    if (!nomeJogador || nomeJogador.trim() === "") nomeJogador = "Anônimo";

    // Inicia o jogo
    document.getElementById("tela-avatar").style.display = "none";
    document.getElementById("tela-quiz").style.display = "block";
    document.getElementById("avatar-container").style.display = "block";
    document.getElementById("avatar-img").src = avatarSelecionado === 1 ? "fotohomem.png" : "fotomulher.png";

    resetarModulo();
    mostrarIntroModulo();
    musicaFundo.currentTime = 0;
    musicaFundo.play().catch(() => {});
}

function falar(texto, callback) {
    window.speechSynthesis.cancel();
    pararMovimentoBoca();

    const utterance = new SpeechSynthesisUtterance(texto);
    utterance.lang = "pt-BR";
    utterance.rate = 1.15;
    utterance.pitch = avatarSelecionado === 1 ? 0.95 : 1.15;
    utterance.volume = 1;
    
    // Velocidade um pouco mais rápida e natural
    utterance.rate = 1.15;
    
    // Tom mais natural
    utterance.pitch = avatarSelecionado === 1 ? 0.95 : 1.15;
    utterance.volume = 1;

    const vozes = window.speechSynthesis.getVoices();

    // Lista de vozes preferidas (mais naturais)
    const vozesMasculinas = ["Google português do Brasil", "Microsoft Daniel", "Daniel", "Luciano"];
    const vozesFemininas = ["Google português do Brasil", "Microsoft Maria", "Maria", "Luciana", "Fernanda"];

    let vozEscolhida = null;

    if (avatarSelecionado === 1) {
        // Thor - tenta voz masculina mais natural
        vozEscolhida = vozes.find(v => 
            v.lang.includes("pt") && 
            vozesMasculinas.some(nome => v.name.includes(nome))
        );
    } else {
        // Nina - tenta voz feminina mais natural
        vozEscolhida = vozes.find(v => 
            v.lang.includes("pt") && 
            vozesFemininas.some(nome => v.name.includes(nome))
        );
    }

    // Fallback
    if (!vozEscolhida) {
        vozEscolhida = vozes.find(v => v.lang === "pt-BR") || vozes[0];
    }

    if (vozEscolhida) {
        utterance.voice = vozEscolhida;
    }

    // Inicia o movimento da boca
    iniciarMovimentoBoca();

    utterance.onend = () => {
        pararMovimentoBoca();
        if (callback) callback();
    };

    utterance.onerror = () => {
        pararMovimentoBoca();
        if (callback) callback();
    };

    window.speechSynthesis.speak(utterance);
}

// Carrega as vozes
window.speechSynthesis.onvoiceschanged = () => {
    window.speechSynthesis.getVoices();
};

let intervaloBoca = null;

function iniciarMovimentoBoca() {
    const avatarImg = document.getElementById("avatar-img");
    if (!avatarImg) return;

    const imagemNormal = avatarSelecionado === 1 ? "fotohomem.png" : "fotomulher.png";
    const imagemFalando = avatarSelecionado === 1 ? "fotohomem-falando.png" : "fotomulher-falando.png";

    let bocaAberta = false;

    if (intervaloBoca) clearInterval(intervaloBoca);

function alternarBoca() {
        bocaAberta = !bocaAberta;
        avatarImg.src = bocaAberta ? imagemFalando : imagemNormal;

        // Intervalo variável para parecer mais natural (entre 120ms e 220ms)
        const proximoIntervalo = 120 + Math.random() * 100;
        
        intervaloBoca = setTimeout(alternarBoca, proximoIntervalo);
    }

    // Começa o movimento
    alternarBoca();
}

function pararMovimentoBoca() {
    if (intervaloBoca) {
        clearTimeout(intervaloBoca);
        intervaloBoca = null;
    }

    const avatarImg = document.getElementById("avatar-img");
    if (avatarImg) {
        avatarImg.src = avatarSelecionado === 1 ? "fotohomem.png" : "fotomulher.png";
    }
}

function atualizarFundo() {
    const body = document.body;

    if (moduloAtual >= 1 && moduloAtual <= 5) {
        body.style.background = `linear-gradient(rgba(0,0,0,0.45), rgba(0,0,0,0.55)), url('modulo${moduloAtual}.png') center/cover no-repeat fixed`;
    }
}

function fundoFinal() {
    document.body.style.background = `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.5)), url('fundocompleto.png') center/cover no-repeat fixed`;
}


function resetarModulo() {
    perguntaAtualNoModulo = 0;
    pontuacaoModuloAtual = 0;
}

function getPerguntasDoModulo(modulo) {
    return perguntasData.filter(p => p.modulo === modulo);
}

function mostrarPergunta() {
    atualizarFundo();
    const perguntasModulo = getPerguntasDoModulo(moduloAtual);
    
    if (perguntaAtualNoModulo >= perguntasModulo.length) {
        mostrarResultadoModulo();
        return;
    }

    tempoRestante = 30;
    clearInterval(timerInterval);

    const pergunta = perguntasModulo[perguntaAtualNoModulo];
    const nomeModulo = nomesModulos[moduloAtual];

    document.getElementById("pergunta-atual").textContent = 
        `Módulo ${moduloAtual} - ${nomeModulo} | ${perguntaAtualNoModulo + 1}/${perguntasModulo.length}`;

    document.getElementById("pergunta-texto").textContent = pergunta.pergunta;
    
    const pontosEl = document.getElementById("pontos");
    pontosEl.textContent = `Pontos: ${pontuacaoTotal} | Tempo: ${tempoRestante}s`;

    const opcoesDiv = document.getElementById("opcoes");
    opcoesDiv.innerHTML = "";

    pergunta.opcoes.forEach((opcao, index) => {
        const btn = document.createElement("button");
        btn.textContent = opcao;
        btn.onclick = () => verificarResposta(index);
        opcoesDiv.appendChild(btn);
    });

    document.getElementById("feedback").innerHTML = "";

    timerInterval = setInterval(() => {
        tempoRestante--;
        pontosEl.textContent = `Pontos: ${pontuacaoTotal} | Tempo: ${tempoRestante}s`;

        if (tempoRestante <= 5) pontosEl.classList.add("pontos-timer-critico");
        if (tempoRestante <= 0) {
            clearInterval(timerInterval);
            pularPergunta();
        }
    }, 1000);
}

function verificarResposta(respostaEscolhida) {
    clearInterval(timerInterval);
    const perguntasModulo = getPerguntasDoModulo(moduloAtual);
    const pergunta = perguntasModulo[perguntaAtualNoModulo];
    const opcoesBtns = document.querySelectorAll("#opcoes button");
    const feedback = document.getElementById("feedback");

    opcoesBtns.forEach(btn => btn.disabled = true);

    let pontosGanhos = 0;
    let textoFala = "";

    if (respostaEscolhida === pergunta.resposta) {
        tocarSom("acerto");
        pontosGanhos = 50 + (tempoRestante * 5);
        pontuacaoModuloAtual += pontosGanhos;
        pontuacaoTotal += pontosGanhos;

        feedback.innerHTML = `<span style="color: #4ade80;">✅ Correto! +${pontosGanhos} pontos</span>`;
        opcoesBtns[respostaEscolhida].classList.add("correto");
        textoFala = `Correto! ${pergunta.explicacao}`;
    } else {
        tocarSom("erro");
        feedback.innerHTML = `<span style="color: #f87171;">❌ Incorreto</span>`;
        opcoesBtns[respostaEscolhida].classList.add("incorreto");
        opcoesBtns[pergunta.resposta].classList.add("correto");
        textoFala = `Incorreto. ${pergunta.explicacao}`;
    }

    // Mostra a explicação na tela
    setTimeout(() => {
        feedback.innerHTML += `<br><br><strong>Explicação:</strong> ${pergunta.explicacao}`;
    }, 600);

    // Avatar fala e só depois avança
    falar(textoFala, () => {
        setTimeout(() => {
            perguntaAtualNoModulo++;
            mostrarPergunta();
        }, 800);
    });
}

function pularPergunta() {
    tocarSom('final');    // Quando termina o jogo
    const feedback = document.getElementById("feedback");
    feedback.innerHTML = `<span style="color: #f87171;">⏰ Tempo esgotado!</span>`;
    
    setTimeout(() => {
        perguntaAtualNoModulo++;
        mostrarPergunta();
    }, 1500);
}

function mostrarResultadoModulo() {
    clearInterval(timerInterval);
    document.getElementById("tela-quiz").style.display = "none";
    const telaResultado = document.getElementById("tela-resultado-modulo");
    telaResultado.style.display = "block";

    const nomeModulo = nomesModulos[moduloAtual];
    const perguntasModulo = getPerguntasDoModulo(moduloAtual);
    const totalPerguntas = perguntasModulo.length;
    const acertouTodas = pontuacaoModuloAtual >= totalPerguntas * 100;

    document.getElementById("titulo-resultado").textContent = `${nomeModulo}`;
    document.getElementById("pontuacao-modulo").textContent = `${pontuacaoModuloAtual} pontos`;

    if (acertouTodas) {
        document.getElementById("mensagem-resultado").innerHTML = "Parabéns! Você acertou todas as questões deste módulo.";
        document.getElementById("btn-continuar").style.display = "inline-block";
        document.getElementById("btn-tentar-novamente").style.display = "none";

        falar(`Parabéns! Você concluiu o módulo de ${nomeModulo}. Pode seguir para o próximo.`);
    } else {
        document.getElementById("mensagem-resultado").innerHTML = "Você não atingiu 100% de aproveitamento.<br>É necessário acertar todas para avançar.";
        document.getElementById("btn-continuar").style.display = "none";
        document.getElementById("btn-tentar-novamente").style.display = "inline-block";

        falar(`Atenção! Você precisa acertar todas as questões para avançar. Vamos tentar novamente?`);
    }
}

function proximoModulo() {
    atualizarFundo();
    if (moduloAtual < totalModulos) {
        moduloAtual++;
        resetarModulo();
        document.getElementById("tela-resultado-modulo").style.display = "none";
        document.getElementById("tela-quiz").style.display = "block";
        mostrarIntroModulo();
    } else {
        finalizarJogo();
    }
}

function tentarNovamenteModulo() {
    resetarModulo();
    document.getElementById("tela-resultado-modulo").style.display = "none";
    document.getElementById("tela-quiz").style.display = "block";
    mostrarPergunta();
}

function finalizarJogo() {
    fundoFinal();
    clearInterval(timerInterval);
    tocarSom('acerto');   // Quando acerta
    tocarSom('erro');     // Quando erra
    tocarSom('final');    // Quando termina o jogo

    document.getElementById("tela-resultado-modulo").style.display = "none";
    document.getElementById("tela-final").style.display = "block";

    document.getElementById("pontuacao-final").textContent = `Pontuação Final: ${pontuacaoTotal} pontos`;
    document.getElementById("mensagem-final").innerHTML = "🎉 Parabéns! Você concluiu todos os 5 módulos com sucesso!";
    
    salvarNoRanking();
    musicaFundo.pause();
    musicaFundo.currentTime = 0;
}

// Login anônimo (necessário para gravar no Firestore)
async function loginAnonimo() {
    try {
        await signInAnonymously(auth);
        console.log("Usuário autenticado anonimamente");
    } catch (erro) {
        console.error("Erro no login anônimo:", erro);
    }
}


// Chama o login quando a página carregar
loginAnonimo();

// Salvar pontuação
async function salvarNoRanking() {
    try {
        await addDoc(collection(db, "ranking"), {
            nome: nomeJogador,
            pontos: pontuacaoTotal,
            data: new Date().toLocaleDateString("pt-BR"),
            criadoEm: new Date()
        });
        console.log("Ranking salvo com sucesso!");
    } catch (erro) {
        console.error("Erro ao salvar ranking:", erro);
    }
}

// Mostrar ranking (Firebase)
async function mostrarRanking() {
    document.getElementById("tela-inicial").style.display = "none";
    document.getElementById("tela-final").style.display = "none";
    document.getElementById("tela-ranking").style.display = "block";

    const lista = document.getElementById("lista-ranking");
    lista.innerHTML = "<li>Carregando ranking...</li>";

    try {
        const q = query(
            collection(db, "ranking"),
            orderBy("pontos", "desc"),
            limit(10)
        );

        const snapshot = await getDocs(q);
        lista.innerHTML = "";

        if (snapshot.empty) {
            lista.innerHTML = "<li>Nenhum jogador registrado ainda.</li>";
            return;
        }

        let posicao = 1;
        snapshot.forEach((doc) => {
            const dados = doc.data();
            const li = document.createElement("li");
            li.innerHTML = `<strong>#${posicao}</strong> ${dados.nome} — <strong>${dados.pontos} pts</strong> <small>(${dados.data})</small>`;
            lista.appendChild(li);
            posicao++;
        });
    } catch (erro) {
        console.error("Erro ao carregar ranking:", erro);
        lista.innerHTML = "<li>Erro ao carregar o ranking.</li>";
    }
}


function reiniciarJogo() {
    location.reload(); // Recarrega a página (solução mais simples e segura)
}

function voltarInicio() {
    document.getElementById("tela-avatar").style.display = "none";
    document.getElementById("tela-resultado-modulo").style.display = "none";
    document.getElementById("tela-final").style.display = "none";
    document.getElementById("tela-ranking").style.display = "none";
    document.getElementById("tela-quiz").style.display = "none";

    const intro = document.getElementById("tela-intro-modulo");
    if (intro) intro.style.display = "none";

    document.body.style.background = `linear-gradient(rgba(0,0,0,0.45), rgba(0,0,0,0.55)), url('Foto2.jpg') center/cover no-repeat fixed`;

    const avatarContainer = document.getElementById("avatar-container");
    if (avatarContainer) avatarContainer.style.display = "none";

    document.getElementById("tela-inicial").style.display = "block";

    // Mostra o título novamente
    const header = document.querySelector("header");
    if (header) header.classList.remove("esconder-titulo");

    const container = document.querySelector(".container");
    if (container) container.classList.remove("sem-titulo");
}

window.onload = () => {
    document.getElementById("tela-inicial").style.display = "block";
};

const infoModulos = {
  1: {
    titulo: "Fundação do Conhecimento",
    descricao: "Todo grande projeto começa com uma base sólida."
  },
  2: {
    titulo: "Segurança do Trabalho",
    descricao: "A segurança é o alicerce de toda obra bem-sucedida."
  },
  3: {
    titulo: "Qualidade na Execução",
    descricao: "A excelência se constrói detalhe por detalhe."
  },
  4: {
    titulo: "Processos e Procedimentos",
    descricao: "Organização e método garantem o sucesso da obra."
  },
  5: {
    titulo: "Sustentabilidade e Meio Ambiente",
    descricao: "Construir o futuro começa com responsabilidade ambiental."
  }
};

function mostrarIntroModulo() {
  const info = infoModulos[moduloAtual];

  document.getElementById("intro-numero-modulo").textContent = moduloAtual;
  document.getElementById("intro-titulo-modulo").textContent = info.titulo;
  document.getElementById("intro-descricao-modulo").textContent = info.descricao;
  document.getElementById("intro-progresso-texto").textContent = `${moduloAtual}/5`;
  document.getElementById("intro-barra-progresso").style.width = `${(moduloAtual / 5) * 100}%`;

  // Esconde outras telas
  document.getElementById("tela-avatar").style.display = "none";
  document.getElementById("tela-quiz").style.display = "none";
  document.getElementById("tela-resultado-modulo").style.display = "none";
  document.getElementById("tela-inicial").style.display = "none";

  // Aplica o fundo do módulo
  document.body.style.background = `linear-gradient(rgba(0,0,0,0.25), rgba(0,0,0,0.35)), url('modulo${moduloAtual}.png') center/cover no-repeat fixed`;

  // Mostra a intro (sem card)
  document.getElementById("tela-intro-modulo").style.display = "block";

}

function iniciarPerguntasModulo() {
  document.getElementById("tela-intro-modulo").style.display = "none";
  document.getElementById("tela-quiz").style.display = "block";
  document.getElementById("avatar-container").style.display = "block";
  mostrarPergunta();
}

// Expõe as funções para o HTML
window.irParaSelecaoAvatar = irParaSelecaoAvatar;
window.selecionarAvatar = selecionarAvatar;
window.confirmarAvatar = confirmarAvatar;
window.iniciarPerguntasModulo = iniciarPerguntasModulo;
window.mostrarRanking = mostrarRanking;
window.voltarInicio = voltarInicio;
window.reiniciarJogo = reiniciarJogo;
window.proximoModulo = proximoModulo;
window.tentarNovamenteModulo = tentarNovamenteModulo;