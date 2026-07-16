// script.js
let moduloAtual = 1;
let perguntaAtualNoModulo = 0;
let pontuacaoTotal = 0;
let pontuacaoModuloAtual = 0;
let nomeJogador = "";
let timerInterval;
let tempoRestante = 30;

const totalModulos = 5;

// Sons
const somAcerto = new Audio("https://assets.mixkit.co/sfx/preview/2964/2964.wav");
const somErro = new Audio("https://assets.mixkit.co/sfx/preview/2957/2957.wav");
const somFinal = new Audio("https://assets.mixkit.co/sfx/preview/2962/2962.wav");

function iniciarJogo() {
    nomeJogador = prompt("Digite seu nome:", "Aluno");
    if (!nomeJogador || nomeJogador.trim() === "") nomeJogador = "Anônimo";

    resetarModulo();
    document.getElementById("tela-inicial").style.display = "none";
    document.getElementById("tela-quiz").style.display = "block";

    mostrarPergunta();
}

function resetarModulo() {
    perguntaAtualNoModulo = 0;
    pontuacaoModuloAtual = 0;
}

function getPerguntasDoModulo(modulo) {
    return perguntasData.filter(p => p.modulo === modulo);
}

function mostrarPergunta() {
    const perguntasModulo = getPerguntasDoModulo(moduloAtual);
    
    if (perguntaAtualNoModulo >= perguntasModulo.length) {
        mostrarResultadoModulo();
        return;
    }

    tempoRestante = 30;
    clearInterval(timerInterval);

    const pergunta = perguntasModulo[perguntaAtualNoModulo];

    document.getElementById("pergunta-atual").textContent = `Módulo ${moduloAtual} - ${perguntaAtualNoModulo + 1}/${perguntasModulo.length}`;
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
        somAcerto.play();
        pontosGanhos = 50 + (tempoRestante * 5);
        pontuacaoModuloAtual += pontosGanhos;
        pontuacaoTotal += pontosGanhos;

        feedback.innerHTML = `<span style="color: #4ade80;">✅ Correto! +${pontosGanhos} pontos</span>`;
        opcoesBtns[respostaEscolhida].classList.add("correto");
    } else {
        somErro.play();
        feedback.innerHTML = `<span style="color: #f87171;">❌ Incorreto</span>`;
        opcoesBtns[respostaEscolhida].classList.add("incorreto");
        opcoesBtns[pergunta.resposta].classList.add("correto");
    }

    setTimeout(() => {
        feedback.innerHTML += `<br><br><strong>Explicação:</strong> ${pergunta.explicacao}`;
        
        setTimeout(() => {
            perguntaAtualNoModulo++;
            mostrarPergunta();
        }, 2800);
    }, 800);
}

function pularPergunta() {
    somErro.play();
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

    const perguntasModulo = getPerguntasDoModulo(moduloAtual);
    const totalPerguntas = perguntasModulo.length;
    const acertouTodas = pontuacaoModuloAtual >= totalPerguntas * 100;

    document.getElementById("pontuacao-modulo").textContent = 
        `Módulo ${moduloAtual} - ${pontuacaoModuloAtual} pontos`;

    if (acertouTodas) {
        document.getElementById("titulo-resultado").textContent = `✅ Módulo ${moduloAtual} Concluído!`;
        document.getElementById("mensagem-resultado").innerHTML = "Parabéns! Você acertou todas as questões.";
        document.getElementById("btn-continuar").style.display = "inline-block";
        document.getElementById("btn-tentar-novamente").style.display = "none";
    } else {
        document.getElementById("titulo-resultado").textContent = `Módulo ${moduloAtual}`;
        document.getElementById("mensagem-resultado").innerHTML = "Você não atingiu 100% de aproveitamento.<br>É necessário acertar todas para avançar.";
        document.getElementById("btn-continuar").style.display = "none";
        document.getElementById("btn-tentar-novamente").style.display = "inline-block";
    }
}

function proximoModulo() {
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
    clearInterval(timerInterval);
    somFinal.play();

    document.getElementById("tela-resultado-modulo").style.display = "none";
    document.getElementById("tela-final").style.display = "block";

    document.getElementById("pontuacao-final").textContent = `Pontuação Final: ${pontuacaoTotal} pontos`;
    document.getElementById("mensagem-final").innerHTML = "🎉 Parabéns! Você concluiu todos os 5 módulos com sucesso!";
    
    salvarNoRanking();
}

// Funções de Ranking
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
    document.getElementById("tela-resultado-modulo").style.display = "none";
    document.getElementById("tela-final").style.display = "none";
    document.getElementById("tela-ranking").style.display = "none";
    document.getElementById("tela-inicial").style.display = "block";
}

window.onload = () => {
    document.getElementById("tela-inicial").style.display = "block";
};