
import { DispatchStatus, Process, UserType, Article, Specialist, Message } from './types';

// Mock INPI database for simulation
export const MOCK_INPI_DB: Record<string, Process> = {
  '987654321': {
    id: 'p1',
    inpiNumber: '987654321',
    brandName: 'CAFE TECH',
    niceClass: '30',
    owner: 'JOSÉ SILVA',
    specification: 'Café torrado e moído.',
    status: 'Aguardando Exame de Mérito',
    lastUpdate: '2023-10-15',
    dispatches: [
      {
        code: 'IP002',
        date: '2023-10-15',
        description: 'Publicação de pedido de registro',
        status: DispatchStatus.INFORMATIVE,
        actionGuidance: 'Aguardar prazo de oposição de terceiros (60 dias).',
        isCritical: false
      }
    ],
    deadlines: []
  },
  '123456789': {
    id: 'p2',
    inpiNumber: '123456789',
    brandName: 'FUTURE APPS',
    niceClass: '42',
    owner: 'FUTURE TECH LTDA',
    specification: 'Desenvolvimento de software.',
    status: 'Exigência Formal',
    lastUpdate: '2023-11-01',
    dispatches: [
      {
        code: 'EX001',
        date: '2023-11-01',
        description: 'Exigência Formal',
        status: DispatchStatus.PENDING_ACTION,
        actionGuidance: 'Responder à exigência em até 5 dias úteis para evitar arquivamento.',
        isCritical: true
      }
    ],
    deadlines: [
      {
        id: 'd1',
        title: 'Responder Exigência Formal',
        date: '2023-11-06T17:00:00.000Z',
        dispatchId: 'EX001',
        isCompleted: false
      }
    ]
  }
};

export const MOCK_SPECIALISTS: Specialist[] = [
  {
    id: 's1',
    name: 'Dra. Ana Pereira',
    oab: 'OAB/SP 123.456',
    specialty: 'Especialista em Oposições e Recursos',
    rating: 4.9,
    reviewsCount: 128,
    priceStart: 'R$ 450,00',
    imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150&h=150'
  },
  {
    id: 's2',
    name: 'Dr. Carlos Mendes',
    oab: 'OAB/RJ 987.654',
    specialty: 'Registro de Marcas e Patentes',
    rating: 4.7,
    reviewsCount: 84,
    priceStart: 'R$ 350,00',
    imageUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=150&h=150'
  },
  {
    id: 's3',
    name: 'Advocacia Silva & Associados',
    oab: 'Sociedade 12.345',
    specialty: 'Assessoria Completa para Empresas',
    rating: 5.0,
    reviewsCount: 310,
    priceStart: 'R$ 600,00',
    imageUrl: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=150&h=150'
  }
];

export const INITIAL_CHAT_MESSAGE: Message = {
  id: 'welcome',
  text: 'Olá! Recebi sua solicitação. Como posso ajudar com seu processo hoje?',
  sender: 'specialist',
  timestamp: new Date().toISOString()
};

export const EDUCATION_ARTICLES: Article[] = [
  {
    id: 1,
    title: 'Como depositar uma marca?',
    summary: 'Guia passo a passo para proteger sua marca no INPI.',
    content: `
      <h3>1. Entenda o que é marca</h3>
      <p>Marca é todo sinal distintivo (palavra, figura, símbolo) visualmente perceptível que identifica e distingue produtos e serviços. Registrar sua marca garante o uso exclusivo dela em todo o território nacional.</p>
      
      <h3>2. Faça uma busca prévia</h3>
      <p>Antes de pagar qualquer taxa, verifique se a marca já não existe.</p>
      <ul>
        <li>Acesse o sistema de busca do INPI.</li>
        <li>Pesquise pelo nome exato e variações fonéticas.</li>
        <li>Verifique a classe (NCL) do seu produto/serviço.</li>
      </ul>

      <h3>3. Cadastre-se no e-INPI</h3>
      <p>Crie seu login no portal oficial do INPI. Se for Pessoa Física, use seu CPF; se for Jurídica, CNPJ.</p>

      <h3>4. Emita e pague a GRU</h3>
      <p>A Guia de Recolhimento da União (GRU) é a taxa inicial.</p>
      <ul>
        <li>Código <strong>389</strong>: Para pedido de registro de marca (com especificação pré-aprovada).</li>
        <li>O valor é reduzido para MEI, ME, EPP e Pessoas Físicas (aprox. R$ 142,00).</li>
      </ul>

      <h3>5. Preencha o formulário e-Marcas</h3>
      <p>Após pagar a GRU, acesse o sistema e-Marcas e preencha o formulário eletrônico informando o número da GRU paga.</p>
      <p>Anexe o logotipo (se houver) e documentos que comprovem a atividade exercida (opcional para PF, mas recomendado).</p>

      <h3>6. Acompanhe o processo</h3>
      <p>Após o depósito, o processo não anda sozinho. Use este aplicativo para monitorar semanalmente a Revista da Propriedade Industrial (RPI).</p>
    `
  },
  {
    id: 2,
    title: 'Entenda as Classes (NCL)',
    summary: 'Como escolher a categoria correta para o seu produto ou serviço.',
    content: `
      <h3>O que são Classes de Nice?</h3>
      <p>A classificação internacional de Nice (NCL) organiza todos os produtos e serviços em 45 categorias.</p>
      <ul>
        <li><strong>Classes 1 a 34:</strong> Produtos (ex: Roupas = Classe 25, Café = Classe 30).</li>
        <li><strong>Classes 35 a 45:</strong> Serviços (ex: Propaganda = Classe 35, Educação = Classe 41).</li>
      </ul>
      <p>Você só tem proteção na classe em que registrou a marca.</p>
    `
  },
  {
    id: 3,
    title: 'Prazos Importantes',
    summary: 'Não perca sua marca por falta de acompanhamento.',
    content: `
      <h3>Prazos Críticos</h3>
      <p>Perder um prazo no INPI pode significar o arquivamento definitivo do seu processo.</p>
      <ul>
        <li><strong>Oposição:</strong> 60 dias após a publicação do pedido para terceiros reclamarem.</li>
        <li><strong>Recurso:</strong> 60 dias caso seu pedido seja indeferido.</li>
        <li><strong>Concessão:</strong> 60 dias para pagar a taxa final de registro após o deferimento.</li>
      </ul>
    `
  }
];

export const AI_SYSTEM_INSTRUCTION = `
  Você é um advogado especialista em propriedade intelectual no Brasil.
  Seu objetivo é explicar despachos do INPI para leigos.
  Use linguagem simples, direta e orientada a ação.
  Não use juridiquês desnecessário.
  Sempre termine com uma recomendação clara do próximo passo.
`;