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

    {
        modulo: 1,
        pergunta: "Qual documento é geralmente entregue durante a integração?",
        opcoes: ["Apenas o holerite", "Manual do Colaborador e Políticas Internas", "Apenas o contrato de trabalho", "Apenas o crachá"],
        resposta: 1,
        explicacao: "O Manual do Colaborador e as Políticas Internas são documentos fundamentais na integração."
    },
    {
        modulo: 1,
        pergunta: "Qual o principal benefício da integração bem feita?",
        opcoes: ["Reduzir custos", "Aumentar a retenção de talentos e o engajamento inicial", "Apenas cumprir exigência legal", "Acelerar o processo de contratação"],
        resposta: 1,
        explicacao: "Uma boa integração aumenta o engajamento e reduz a rotatividade nos primeiros meses."
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

    {
        modulo: 2,
        pergunta: "Quando deve ser utilizado o cinto de segurança tipo paraquedista?",
        opcoes: ["Em qualquer altura", "Em trabalhos a mais de 2 metros de altura com risco de queda", "Apenas em escadas", "Somente em trabalhos internos"],
        resposta: 1,
        explicacao: "O cinto tipo paraquedista é obrigatório em trabalhos com risco de queda superior a 2 metros."
    },
    {
        modulo: 2,
        pergunta: "O que é CIPA?",
        opcoes: ["Comissão Interna de Prevenção de Acidentes", "Comissão de Integração de Pessoal", "Comissão de Investimento em Proteção", "Comissão Interna de Produção Acelerada"],
        resposta: 0,
        explicacao: "A CIPA tem como objetivo prevenir acidentes e doenças do trabalho."
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

    {
        modulo: 3,
        pergunta: "O que significa 'fck' no concreto?",
        opcoes: ["Resistência característica do concreto à compressão", "Peso específico do concreto", "Coeficiente de segurança", "Tempo de cura"],
        resposta: 0,
        explicacao: "fck é a resistência característica do concreto à compressão."
    },
    {
        modulo: 3,
        pergunta: "Qual a importância do controle tecnológico do concreto?",
        opcoes: ["Apenas para cumprir norma", "Garantir que o concreto atenda aos requisitos de resistência e durabilidade", "Reduzir custo de materiais", "Acelerar a execução"],
        resposta: 1,
        explicacao: "O controle tecnológico garante qualidade e segurança da estrutura."
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

    {
        modulo: 4,
        pergunta: "O que deve conter um 'Memorial Descritivo'?",
        opcoes: ["Apenas o valor da obra", "Descrição detalhada dos serviços, materiais e especificações técnicas", "Só o cronograma físico-financeiro", "Apenas a ART"],
        resposta: 1,
        explicacao: "O Memorial Descritivo detalha os serviços e materiais a serem executados."
    },
    {
        modulo: 4,
        pergunta: "Qual a função do 'As Built'?",
        opcoes: ["Documento de propaganda", "Registro final da obra como realmente foi executada", "Orçamento inicial", "Plano de marketing"],
        resposta: 1,
        explicacao: "O As Built é o registro final das alterações realizadas durante a obra."
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
    },
    {
        modulo: 5,
        pergunta: "Qual prática contribui para a sustentabilidade em obra?",
        opcoes: ["Descarte de todo entulho na rua", "Reaproveitamento de água e segregação de resíduos", "Uso intensivo de materiais descartáveis", "Ignorar licenças ambientais"],
        resposta: 1,
        explicacao: "O reaproveitamento de água e a correta gestão de resíduos são práticas sustentáveis."
    },
    {
        modulo: 5,
        pergunta: "O que é a 'Licença Ambiental'?",
        opcoes: ["Autorização para iniciar a venda", "Documento obrigatório para obras que possam impactar o meio ambiente", "Licença para contratar funcionários", "Autorização de pagamento de impostos"],
        resposta: 1,
        explicacao: "A Licença Ambiental é obrigatória para atividades com potencial impacto ambiental."
    }
];

window.perguntasData = perguntasData;