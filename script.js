// script.js
let perguntaAtual = 0;
let pontuacao = 0;
let nomeJogador = "";

function iniciarJogo() {
    nomeJogador = prompt("Digite seu nome para o ranking:", "Aluno");
    if (!nomeJogador || nomeJogador.trim() === "") nomeJogador = "Anônimo";

    perguntaAtual = 0;
    pontuacao = 0;

    document.getElementById("tela-inicial").style.display = "none";
    document.getElementById("tela-final").style.display = "none";
    document.getElementById("tela-ranking").style.display = "none";
    document.getElementById("tela-quiz").style.display = "block";

    mostrarPergunta();
}

function mostrarPergunta() {
    if (perguntaAtual >= perguntasData.length) {
        finalizarJogo();
        return;
    }

    const pergunta = perguntasData[perguntaAtual];

    document.getElementById("pergunta-atual").textContent = `${perguntaAtual + 1}/${perguntasData.length}`;
    document.getElementById("pergunta-texto").textContent = pergunta.pergunta;
    document.getElementById("pontos").textContent = `Pontos: ${pontuacao}`;

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
}

function verificarResposta(respostaEscolhida) {
    const pergunta = perguntasData[perguntaAtual];
    const opcoesBtns = document.querySelectorAll("#opcoes button");
    const feedback = document.getElementById("feedback");

    opcoesBtns.forEach(btn => btn.disabled = true);

    if (respostaEscolhida === pergunta.resposta) {
        pontuacao += 100;
        feedback.innerHTML = `<span style="color: #4ade80;">✅ Correto!</span>`;
        opcoesBtns[respostaEscolhida].classList.add("correto");
    } else {
        feedback.innerHTML = `<span style="color: #f87171;">❌ Incorreto</span>`;
        opcoesBtns[respostaEscolhida].classList.add("incorreto");
        opcoesBtns[pergunta.resposta].classList.add("correto");
    }

    setTimeout(() => {
        feedback.innerHTML += `<br><br><strong>Explicação:</strong> ${pergunta.explicacao}`;
        
        setTimeout(() => {
            perguntaAtual++;
            mostrarPergunta();
        }, 2500);
    }, 800);
}

function finalizarJogo() {
    document.getElementById("tela-quiz").style.display = "none";
    document.getElementById("tela-final").style.display = "block";

    const pontuacaoFinal = document.getElementById("pontuacao-final");
    const mensagemFinal = document.getElementById("mensagem-final");

    pontuacaoFinal.textContent = `Sua pontuação: ${pontuacao} pontos`;

    if (pontuacao >= 800) {
        mensagemFinal.textContent = "🎉 Excelente! Você domina as políticas da empresa!";
        mensagemFinal.style.color = "#4ade80";
    } else if (pontuacao >= 500) {
        mensagemFinal.textContent = "👍 Bom trabalho! Continue estudando.";
        mensagemFinal.style.color = "#fbbf24";
    } else {
        mensagemFinal.textContent = "📚 Recomendamos revisar as políticas.";
        mensagemFinal.style.color = "#f87171";
    }

    salvarNoRanking();
}

function salvarNoRanking() {
    let ranking = JSON.parse(localStorage.getItem("rankingPolicyQuest")) || [];
    
    ranking.push({
        nome: nomeJogador,
        pontos: pontuacao,
        data: new Date().toLocaleDateString('pt-BR')
    });

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

    if (ranking.length === 0) {
        lista.innerHTML = "<li>Nenhum jogador ainda.</li>";
        return;
    }

    ranking.forEach((jogador, index) => {
        const li = document.createElement("li");
        li.innerHTML = `<strong>#${index + 1}</strong> ${jogador.nome} — <strong>${jogador.pontos} pts</strong> <small>(${jogador.data})</small>`;
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

// Inicia o jogo
window.onload = () => {
    document.getElementById("tela-inicial").style.display = "block";
};