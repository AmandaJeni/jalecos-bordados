// Dados de exemplo do Painel.
//
// Estes arquivos existem só enquanto o backend não responde. Quando a API
// estiver no ar, nada aqui é usado: basta trocar USAR_DADOS_DE_EXEMPLO em
// src/servicos/api.js. Por isso os campos têm o formato que o backend
// deveria devolver, e não o formato que seria cômodo para a tela.
//
// REPARE no que NÃO está aqui: cor, fundo, peso da fonte. Isso é aparência,
// não dado. Quem decide a cor é o CSS, a partir de "situacao" e "urgencia".

export const painel = {
  indicadores: [
    { rotulo: 'Pedidos em aberto', valor: 18, unidade: 'pedidos', destino: '/pedidos' },
    { rotulo: 'Pedidos atrasados', valor: 3, unidade: 'pedidos', destino: '/pedidos' },
    { rotulo: 'Tarefas de bordado hoje', valor: 12, unidade: 'tarefas', destino: '/producao' },
    { rotulo: 'Produtos abaixo do mínimo', valor: 7, unidade: 'produtos', destino: '/estoque' },
  ],

  // urgencia: 'atrasado' | 'proximo' | 'normal'. A tela traduz em cor.
  pedidos: [
    {
      id: 418,
      numero: '2026-0418',
      cliente: 'Hospital Santa Clara',
      entrega: 'Atrasado 2 dias',
      urgencia: 'atrasado',
      situacao: 'Em produção',
    },
    {
      id: 423,
      numero: '2026-0423',
      cliente: 'Turma Medicina 2026/2',
      entrega: 'Hoje',
      urgencia: 'proximo',
      situacao: 'Em produção',
    },
    {
      id: 427,
      numero: '2026-0427',
      cliente: 'Maria Aparecida Lopes',
      entrega: '28 de outubro',
      urgencia: 'normal',
      situacao: 'Aprovado',
    },
    {
      id: 431,
      numero: '2026-0431',
      cliente: 'Clínica Vida Plena',
      entrega: '30 de outubro',
      urgencia: 'normal',
      situacao: 'Negociação',
    },
    {
      id: 433,
      numero: '2026-0433',
      cliente: 'Joana Ribeiro Dias',
      entrega: 'Vence amanhã',
      urgencia: 'proximo',
      situacao: 'Orçamento enviado',
    },
  ],

  tarefas: [
    {
      id: 1,
      hora: '08:00',
      titulo: 'Brasão Medicina 2026/2',
      detalhe: 'Máquina 3 · 24 peças · Profissional de bordado 1',
    },
    {
      id: 2,
      hora: '10:30',
      titulo: 'Nome bordado no bolso',
      detalhe: 'Máquina 4 · 6 peças · Profissional de bordado 1',
    },
    {
      id: 3,
      hora: '13:00',
      titulo: 'Logo Hospital Santa Clara',
      detalhe: 'Máquina 3 · 40 peças · Profissional de bordado 2',
    },
    {
      id: 4,
      hora: '15:30',
      titulo: 'Ajuste de barra e manga',
      detalhe: 'Costura · 3 peças · Costureira 1',
    },
  ],
};
