// perguntas.js
const perguntasData = [
    // ==================== MÓDULO 1 - INTEGRAÇÃO ====================
    {
        modulo: 1,
        pergunta: "Qual o principal objetivo da integração de novos colaboradores?",
        opcoes: [
            "Apenas apresentar a empresa",
            "Transmitir a cultura, normas, valores e procedimentos da empresa",
            "Apenas assinar documentos",
            "Treinar apenas as ferramentas de trabalho"
        ],
        resposta: 1,
        explicacao: "A integração visa alinhar o novo colaborador à cultura e normas da empresa."
    },
    {
        modulo: 1,
        pergunta: "O que é a 'Política de Integridade' da empresa?",
        opcoes: [
            "Política de descontos para clientes",
            "Conjunto de princípios éticos e de compliance da organização",
            "Política de remuneração variável",
            "Política de benefícios"
        ],
        resposta: 1,
        explicacao: "A Política de Integridade estabelece os padrões éticos esperados de todos os colaboradores."
    },

    // ==================== MÓDULO 2 - SEGURANÇA DO TRABALHO ====================
    {
        modulo: 2,
        pergunta: "Qual o principal objetivo da NR-18?",
        opcoes: [
            "Regular instalações elétricas",
            "Estabelecer diretrizes de segurança na indústria da construção",
            "Regular transporte de cargas",
            "Normatizar uso de EPI"
        ],
        resposta: 1,
        explicacao: "A NR-18 trata especificamente de condições e meio ambiente de trabalho na construção."
    },
    {
        modulo: 2,
        pergunta: "O que significa EPI?",
        opcoes: [
            "Equipamento de Proteção Individual",
            "Equipamento de Proteção Interna",
            "Equipamento Principal de Impacto",
            "Equipamento de Produção Industrial"
        ],
        resposta: 0,
        explicacao: "EPI = Equipamento de Proteção Individual."
    },

    // ==================== MÓDULO 3 - QUALIDADE NA EXECUÇÃO ====================
    {
        modulo: 3,
        pergunta: "O que é o 'slump test'?",
        opcoes: [
            "Teste de resistência do concreto",
            "Ensaio de consistência do concreto fresco",
            "Teste de impermeabilização",
            "Ensaio de tração do aço"
        ],
        resposta: 1,
        explicacao: "O slump test avalia a trabalhabilidade do concreto."
    },
    {
        modulo: 3,
        pergunta: "Qual norma regula o projeto de estruturas de concreto armado?",
        opcoes: [
            "NBR 6120",
            "NBR 6118",
            "NBR 7480",
            "NBR 7212"
        ],
        resposta: 1,
        explicacao: "A NBR 6118 é a norma principal para projeto de estruturas de concreto."
    },

    // ==================== MÓDULO 4 - PROCESSOS E PROCEDIMENTOS ====================
    {
        modulo: 4,
        pergunta: "Qual a importância do 'Projeto Executivo'?",
        opcoes: [
            "Apenas para aprovação na prefeitura",
            "Detalhar todos os elementos necessários para execução da obra",
            "Definir apenas o cronograma",
            "Fazer o orçamento da obra"
        ],
        resposta: 1,
        explicacao: "O Projeto Executivo contém todas as informações técnicas detalhadas para execução."
    },
    {
        modulo: 4,
        pergunta: "O que é o PGRS?",
        opcoes: [
            "Plano de Gerenciamento de Resíduos Sólidos",
            "Plano de Gestão de Recursos Humanos",
            "Programa de Gestão de Segurança",
            "Plano de Gerenciamento de Riscos"
        ],
        resposta: 0,
        explicacao: "PGRS = Plano de Gerenciamento de Resíduos Sólidos."
    },

    // ==================== MÓDULO 5 - SUSTENTABILIDADE E MEIO AMBIENTE ====================
    {
        modulo: 5,
        pergunta: "Qual é um dos principais objetivos da construção sustentável?",
        opcoes: [
            "Aumentar o custo da obra",
            "Reduzir o impacto ambiental e promover eficiência de recursos",
            "Apenas cumprir exigências legais",
            "Utilizar apenas materiais importados"
        ],
        resposta: 1,
        explicacao: "A construção sustentável busca reduzir impactos ambientais e otimizar recursos."
    },
    {
        modulo: 5,
        pergunta: "O que significa 'Certificação LEED'?",
        opcoes: [
            "Certificação de eficiência energética",
            "Sistema de certificação de construções sustentáveis",
            "Certificação de segurança do trabalho",
            "Certificação de qualidade ISO"
        ],
        resposta: 1,
        explicacao: "LEED é um dos principais sistemas de certificação de edifícios sustentáveis."
    }
];

window.perguntasData = perguntasData;