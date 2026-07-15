// script.js
let perguntaAtual = 0;
let pontuacao = 0;
let nomeJogador = "";
let timerInterval;
let tempoRestante = 30;

// ==================== SONS ====================
const somAcerto = new Audio("https://assets.mixkit.co/sfx/preview/2964/2964.wav");
const somErro = new Audio("https://assets.mixkit.co/sfx/preview/2957/2957.wav");
const somFinal = new Audio("https://assets.mixkit.co/sfx/preview/2962/2962.wav");

function iniciarJogo() {
    nomeJogador = prompt("Digite seu nome para o ranking:", "Aluno");
    if (!nomeJogador || nomeJogador.trim() === "") nomeJogador = "Anônimo";

    perguntaAtual = 0;
    pontuacao = 0;

    document.getElementById("tela-inicial").style.display = "none";
    document.getElementById("tela-quiz").style.display = "block";

    mostrarPergunta();
}

function mostrarPergunta() {
    if (perguntaAtual >= perguntasData.length) {
        finalizarJogo();
        return;
    }

    tempoRestante = 30;
    clearInterval(timerInterval);

    const pergunta = perguntasData[perguntaAtual];

    document.getElementById("pergunta-atual").textContent = `${perguntaAtual + 1}/${perguntasData.length}`;
    document.getElementById("pergunta-texto").textContent = pergunta.pergunta;
    
    const pontosEl = document.getElementById("pontos");
    pontosEl.textContent = `Pontos: ${pontuacao} | Tempo: ${tempoRestante}s`;

    const progresso = ((perguntaAtual) / perguntasData.length) * 100;
    document.getElementById("barra-progresso").style.width = `${progresso}%`;

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
        pontosEl.textContent = `Pontos: ${pontuacao} | Tempo: ${tempoRestante}s`;

        if (tempoRestante <= 5) {
            pontosEl.classList.add("pontos-timer-critico");
        }

        if (tempoRestante <= 0) {
            clearInterval(timerInterval);
            pularPergunta();
        }
    }, 1000);
}

function verificarResposta(respostaEscolhida) {
    clearInterval(timerInterval);
    const pergunta = perguntasData[perguntaAtual];
    const opcoesBtns = document.querySelectorAll("#opcoes button");
    const feedback = document.getElementById("feedback");

    opcoesBtns.forEach(btn => btn.disabled = true);

    let pontosGanhos = 0;

    if (respostaEscolhida === pergunta.resposta) {
        somAcerto.play();
        pontosGanhos = 50 + (tempoRestante * 5);
        pontuacao += pontosGanhos;

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
            perguntaAtual++;
            mostrarPergunta();
        }, 2800);
    }, 800);
}

function pularPergunta() {
    somErro.play();
    const feedback = document.getElementById("feedback");
    feedback.innerHTML = `<span style="color: #f87171;">⏰ Tempo esgotado!</span>`;
    
    setTimeout(() => {
        perguntaAtual++;
        mostrarPergunta();
    }, 1500);
}

function finalizarJogo() {
    clearInterval(timerInterval);
    somFinal.play();

    document.getElementById("tela-quiz").style.display = "none";
    document.getElementById("tela-final").style.display = "block";

    const pontuacaoFinal = document.getElementById("pontuacao-final");
    const mensagemFinal = document.getElementById("mensagem-final");

    pontuacaoFinal.textContent = `Sua pontuação final: ${pontuacao} pontos`;

    if (pontuacao >= 1200) {
        mensagemFinal.textContent = "🎉 Excelente desempenho! Você é um expert!";
        mensagemFinal.style.color = "#4ade80";
    } else if (pontuacao >= 800) {
        mensagemFinal.textContent = "👍 Muito bom! Continue se aprimorando.";
        mensagemFinal.style.color = "#fbbf24";
    } else {
        mensagemFinal.textContent = "📚 Recomendamos revisar os conceitos.";
        mensagemFinal.style.color = "#f87171";
    }

    salvarNoRanking();
}

function salvarNoRanking() {
    let ranking = JSON.parse(localStorage.getItem("rankingPolicyQuest")) || [];
    ranking.push({ nome: nomeJogador, pontos: pontuacao, data: new Date().toLocaleDateString('pt-BR') });
    ranking.sort((a, b) => b.pontos - a.pontos);
    ranking = ranking.slice(0, 10);
    localStorage.setItem("rankingPolicyQuest", JSON.stringify(ranking));
}

function mostrarRanking() {
    document.getElementById("tela-final").style.display = "none";
    document.getElementById("tela-ranking").style.display = "block";
    const ranking = JSON.parse(localStorage.getItem("rankingPolicyQuest")) || [];
    const lista = document.getElementById("lista-ranking");
    lista.innerHTML = "";
    ranking.forEach((j, i) => {
        const li = document.createElement("li");
        li.innerHTML = `<strong>#${i+1}</strong> ${j.nome} — <strong>${j.pontos} pts</strong>`;
        lista.appendChild(li);
    });
}

function reiniciarJogo() {
    document.getElementById("tela-final").style.display = "none";
    iniciarJogo();
}

function voltarInicio() {
    document.getElementById("tela-ranking").style.display = "none";
    document.getElementById("tela-inicial").style.display = "block";
}

window.onload = () => {
    document.getElementById("tela-inicial").style.display = "block";
};