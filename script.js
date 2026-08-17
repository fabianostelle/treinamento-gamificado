
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
    mostrarPergunta();
    musicaFundo.currentTime = 0;
    musicaFundo.play().catch(() => {});
}

//function iniciarJogo() {
    //nomeJogador = prompt("Digite seu nome:", "Aluno");
   // if (!nomeJogador || nomeJogador.trim() === "") nomeJogador = "Anônimo";

   // resetarModulo();
    //document.getElementById("tela-inicial").style.display = "none";
    //document.getElementById("tela-quiz").style.display = "block";
   // document.getElementById("avatar-container").style.display = "block";

    // Define o avatar escolhido
    //document.getElementById("avatar-img").src = avatarSelecionado === 1 ? "fotohomem.png" : "fotomulher.png";

    //mostrarPergunta();
//}

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

    if (respostaEscolhida === pergunta.resposta) {
        tocarSom('acerto');   // Quando acerta
        pontosGanhos = 50 + (tempoRestante * 5);
        pontuacaoModuloAtual += pontosGanhos;
        pontuacaoTotal += pontosGanhos;

        feedback.innerHTML = `<span style="color: #4ade80;">✅ Correto! +${pontosGanhos} pontos</span>`;
        opcoesBtns[respostaEscolhida].classList.add("correto");
    } else {
        tocarSom('erro');     // Quando erra
        feedback.innerHTML = `<span style="color: #f87171;">❌ Incorreto</span>`;
        opcoesBtns[respostaEscolhida].classList.add("incorreto");
        opcoesBtns[pergunta.resposta].classList.add("correto");
    }

    const avatarImg = document.getElementById("avatar-img");

    // Animação do avatar
    if (respostaEscolhida === pergunta.resposta) {
        avatarImg.classList.remove("avatar-erro");
        avatarImg.classList.add("avatar-acerto");
    } else {
        avatarImg.classList.remove("avatar-acerto");
        avatarImg.classList.add("avatar-erro");
    }

    // Remove a animação depois
    setTimeout(() => {
        avatarImg.classList.remove("avatar-acerto", "avatar-erro");
    }, 1200);

    setTimeout(() => {
        feedback.innerHTML += `<br><br><strong>Explicação:</strong> ${pergunta.explicacao}`;
        
        setTimeout(() => {
            perguntaAtualNoModulo++;
            mostrarPergunta();
        }, 2800);
    }, 800);
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
    const acertouTodas = pontuacaoModuloAtual >= totalPerguntas * 100; // 100 pontos por pergunta

    document.getElementById("titulo-resultado").textContent = `${nomeModulo}`;
    document.getElementById("pontuacao-modulo").textContent = `${pontuacaoModuloAtual} pontos`;

    if (acertouTodas) {
        document.getElementById("mensagem-resultado").innerHTML = "Parabéns! Você acertou todas as questões deste módulo.";
        document.getElementById("btn-continuar").style.display = "inline-block";
        document.getElementById("btn-tentar-novamente").style.display = "none";
    } else {
        document.getElementById("mensagem-resultado").innerHTML = "Você não atingiu 100% de aproveitamento.<br>É necessário acertar todas para avançar.";
        document.getElementById("btn-continuar").style.display = "none";
        document.getElementById("btn-tentar-novamente").style.display = "inline-block";
    }
}

function proximoModulo() {
    atualizarFundo();
    if (moduloAtual < totalModulos) {
        moduloAtual++;
        resetarModulo();
        document.getElementById("tela-resultado-modulo").style.display = "none";
        document.getElementById("tela-quiz").style.display = "block";
        mostrarPergunta();
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

function salvarNoRanking() {
    let ranking = JSON.parse(localStorage.getItem("rankingPolicyQuest")) || [];
    ranking.push({
        nome: nomeJogador,
        pontos: pontuacaoTotal,
        data: new Date().toLocaleDateString('pt-BR')
    });
    ranking.sort((a, b) => b.pontos - a.pontos);
    ranking = ranking.slice(0, 10);
    localStorage.setItem("rankingPolicyQuest", JSON.stringify(ranking));
}

function mostrarRanking() {
    document.getElementById("tela-inicial").style.display = "none";
    document.getElementById("tela-ranking").style.display = "block";

    const ranking = JSON.parse(localStorage.getItem("rankingPolicyQuest")) || [];
    const lista = document.getElementById("lista-ranking");
    lista.innerHTML = "";

    if (ranking.length === 0) {
        lista.innerHTML = "<li>Nenhum jogador registrado ainda.</li>";
        return;
    }

    ranking.forEach((j, i) => {
        const li = document.createElement("li");
        li.innerHTML = `<strong>#${i+1}</strong> ${j.nome} — <strong>${j.pontos} pts</strong> <small>(${j.data})</small>`;
        lista.appendChild(li);
    });
}

function reiniciarJogo() {
    document.getElementById("tela-final").style.display = "none";
    iniciarJogo();
}

function voltarInicio() {
    // Esconde todas as telas
    document.getElementById("tela-avatar").style.display = "none";
    document.getElementById("tela-resultado-modulo").style.display = "none";
    document.getElementById("tela-final").style.display = "none";
    document.getElementById("tela-ranking").style.display = "none";
    document.getElementById("tela-quiz").style.display = "none";
    document.body.style.background = `linear-gradient(rgba(0,0,0,0.45), rgba(0,0,0,0.55)), url('fundo.jpg') center/cover no-repeat fixed`;
    
    // Esconde o avatar do quiz (se estiver visível)
    const avatarContainer = document.getElementById("avatar-container");
    if (avatarContainer) {
        avatarContainer.style.display = "none";
    }

    // Mostra apenas a tela inicial
    document.getElementById("tela-inicial").style.display = "block";
}

window.onload = () => {
    document.getElementById("tela-inicial").style.display = "block";
};