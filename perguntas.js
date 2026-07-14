// perguntas.js
const perguntasData = [
    {
        pergunta: "Qual é o prazo máximo para comunicar um incidente de segurança da informação?",
        opcoes: [
            "24 horas",
            "48 horas",
            "72 horas",
            "Imediatamente, no mesmo dia"
        ],
        resposta: 3,
        explicacao: "De acordo com a Política de Segurança da Informação, todo incidente deve ser comunicado imediatamente."
    },
    {
        pergunta: "É permitido compartilhar senhas entre colegas de trabalho?",
        opcoes: [
            "Sim, em caso de urgência",
            "Não, nunca é permitido",
            "Sim, desde que seja o gestor",
            "Apenas senhas temporárias"
        ],
        resposta: 1,
        explicacao: "A Política de Senhas proíbe expressamente o compartilhamento de senhas."
    },
    {
        pergunta: "O que você deve fazer ao receber um e-mail suspeito com anexo?",
        opcoes: [
            "Abrir o anexo para verificar",
            "Encaminhar para o TI",
            "Não abrir e reportar ao time de Segurança da Informação",
            "Responder pedindo mais informações"
        ],
        resposta: 2,
        explicacao: "Nunca abra anexos suspeitos. Deve-se reportar imediatamente."
    },
    {
        pergunta: "Qual o procedimento correto ao sair da mesa por mais de 10 minutos?",
        opcoes: [
            "Deixar o computador ligado",
            "Bloquear a tela com Windows + L ou Ctrl + Cmd + Q",
            "Desligar o monitor",
            "Não é necessário fazer nada"
        ],
        resposta: 1,
        explicacao: "A Política de Uso de Ativos exige o bloqueio da tela sempre que se afastar."
    },
    {
        pergunta: "É permitido usar pendrives pessoais na empresa?",
        opcoes: [
            "Sim, desde que escaneados",
            "Não é permitido",
            "Apenas com autorização do gestor",
            "Sim, para trabalho externo"
        ],
        resposta: 1,
        explicacao: "A Política de Segurança proíbe o uso de dispositivos de armazenamento não autorizados."
    }
];

window.perguntasData = perguntasData;