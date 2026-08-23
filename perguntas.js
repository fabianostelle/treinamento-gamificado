// perguntas.js
const perguntasData = [
    // ==================== MÓDULO 1 - INTEGRAÇÃO ====================
    {
        modulo: 1,
        pergunta: "Qual o principal objetivo da integração de novos colaboradores?",
        opcoes: [
            "Apenas apresentar a empresa",
            "Transmitir a cultura, normas, valores e procedimentos da empresa",
            "Realizar exclusivamente o treinamento em ferramentas de trabalho",
            "Treinar apenas as ferramentas de trabalho"
        ],
        resposta: 1,
        explicacao: "A integração visa alinhar o novo colaborador à cultura e normas da empresa."
    },
    {
        modulo: 1,
        pergunta: "Durante o processo de integração, qual prática contribui mais para que o novo colaborador se sinta parte da equipe?",
        opcoes: [
            "Entregar apenas o crachá de identificação",
            "Focar exclusivamente em treinamento técnicos",
            "Solicitar a leitura individual de manuais sem interação",
            "Apresentar os colegas e promover interação inicial"
        ],
        resposta: 3,
        explicacao: "A integração não é só burocrática ou técnica ela cria vínculos e promove interação desde o início e ajuda o colaborador a se sentir acolhido e engajado."
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
        opcoes: [
            "Reduzir custos operacionais de obra",
            "Apenas cumprir exigência legal e obrigatória da empresa",
            "Aumentar a retenção de talentos e o engajamento inicial",
            "Acelerar o processo de contratação"
        ],
        resposta: 2,
        explicacao: "Uma boa integração aumenta o engajamento e reduz a rotatividade nos primeiros meses."
    },

    // ==================== MÓDULO 2 - SEGURANÇA DO TRABALHO ====================
    {
        modulo: 2,
        pergunta: "Qual é a principal razão para o uso obrigatório de Equipamentos de Proteção Individual (EPIs) no canteiro de obras?",
        opcoes: [
            "Atender apenas às exigências legais",
            "Facilitar a identificação dos colaboradores dentro da obra",
            "Garantir a segurança e reduzir riscos de acidentes e lesões",
            "Aumentar a produtividade sem pausas para descanso"
        ],
        resposta: 2,
        explicacao: "os EPIs têm como objetivo principal proteger a saúde e a integridade física dos trabalhadores, prevenindo acidentes e doenças ocupacionais."
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
        pergunta: "Qual prática é essencial para garantir a qualidade na execução da alvenaria?",
        opcoes: [
            "Utilizar materiais sem inspeção prévia",
            "Ignorar o alinhamento das paredes",
            "Acelerar o processo sem controle de qualidade",
            "Seguir rigorosamente o projeto e especificações técnicas"
        ],
        resposta: 3,
        explicacao: "seguir o projeto e as especificações técnicas assegura que a obra mantenha o padrão de qualidade esperado."
    },
    {
        modulo: 3,
        pergunta: "Qual medida deve ser adotada para garantir a qualidade no controle de materiais utilizados na obra?",
        opcoes: [
            "Armazenar os materiais sem proteção contra intempéries",
            "Utilizar qualquer material disponível sem inspeção",
            "Registrar entradas e saídas em planilhas ou sistemas",
            "Ignorar prazos de validade e especificações técnicas"
        ],
        resposta: 1,
        explicacao: "o registro e controle sistemático dos materiais assegura rastreabilidade, evita desperdícios e garante que apenas insumos adequados sejam utilizados na execução da obra."
    },

    {
        modulo: 3,
        pergunta: "Durante a concretagem de uma laje, qual medida contribui diretamente para a qualidade da execução?",
        opcoes: [
            "Controlar o tempo de mistura e aplicação", 
            "Dispensar o uso de vibrador de concreto", 
            "Adicionar água sem critério para facilitar o trabalho", 
            "Ignorar a cura do concreto após a aplicação"
        ],
        resposta: 0,
        explicacao: "Sempre é importantecontrolar o tempo de mistura e aplicação garante resistência e durabilidade da estrutura."
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
            "Apenas para aprovação na prefeitura sem utilidade prática",
            "Detalhar todos os elementos necessários para execução da obra",
            "Atender apenas o cronograma solicitado pelo cliente",
            "Fazer o orçamento da obra sem detalhamento técnico"
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
        opcoes: [
            "Apenas o valor da obra e o prazo de execução",
            "Só o cronograma físico-financeiro da obra",
            "Apenas a ART (Anotação de Responsabilidade Técnica) do engenheiro responsável",
            "Descrição detalhada dos serviços, materiais e especificações técnicas"
        ],
        resposta: 3,
        explicacao: "O Memorial Descritivo detalha os serviços e materiais a serem executados."
    },
    {
        modulo: 4,
        pergunta: "Qual a função do 'As Built'?",
        opcoes: [
            "Documento de propaganda da obra",
            "Registro final da obra como realmente foi executada",
            "Orçamento inicial da obra",
            "Plano de marketing da construtora"
        ],
        resposta: 1,
        explicacao: "O As Built é o registro final das alterações realizadas durante a obra."
    },

    // ==================== MÓDULO 5 - SUSTENTABILIDADE E MEIO AMBIENTE ====================
    {
        modulo: 5,
        pergunta: "Qual é um dos principais objetivos da construção sustentável?",
        opcoes: [
            "Aumentar o custo da obra sem benefícios ambientais",
            "Apenas cumprir exigências legais sem preocupação ambiental",
            "Reduzir o impacto ambiental e promover eficiência de recursos",
            "Utilizar apenas materiais importados sem considerar o impacto ambiental"
        ],
        resposta: 2,
        explicacao: "A construção sustentável busca reduzir impactos ambientais e otimizar recursos."
    },
    {
        modulo: 5,
        pergunta: "O que significa 'Certificação LEED'?",
        opcoes: [
            "Certificação de eficiência energética em eletrodomésticos",
            "Sistema de certificação de construções sustentáveis",
            "Certificação de segurança do trabalho em obras",
            "Certificação de qualidade ISO 9001"
        ],
        resposta: 1,
        explicacao: "LEED é um dos principais sistemas de certificação de edifícios sustentáveis."
    },
    {
        modulo: 5,
        pergunta: "Qual prática contribui para a sustentabilidade em obra?",
        opcoes: [
            "Descarte de todo entulho na rua sem tratamento",
            "Reaproveitamento de água e segregação de resíduos",
            "Uso intensivo de materiais descartáveis sem reciclagem",
            "Ignorar licenças ambientais e normas de proteção ambiental"
        ],
        resposta: 1,
        explicacao: "O reaproveitamento de água e a correta gestão de resíduos são práticas sustentáveis."
    },
    {
        modulo: 5,
        pergunta: "O que é a 'Licença Ambiental'?",
        opcoes: [
            "Autorização para iniciar a venda de imóveis sem fiscalização",
            "Licença para contratar funcionários sem treinamento",
            "Autorização de pagamento de impostos sem fiscalização",
            "Documento obrigatório para obras que possam impactar o meio ambiente"
        ],
        resposta: 3,
        explicacao: "A Licença Ambiental é obrigatória para atividades com potencial impacto ambiental."
    }
];

window.perguntasData = perguntasData;