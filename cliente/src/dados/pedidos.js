// Dados de exemplo da tela de Pedidos e da tela de Pedido.
//
// DECISÃO DA REUNIÃO DE 6 DE NOVEMBRO: acabou a separação entre orçamento e
// pedido. Todo registro nasce como pedido EM ABERTO (faz o papel do antigo
// orçamento e não reserva peça no estoque) e, quando é fechado, o backend
// valida e reserva o estoque. Por isso o campo abaixo é "estado", com os
// valores 'Em aberto' e 'Fechado', e não mais um tipo de registro.
//
// "situacao" continua existindo em paralelo: é o andamento do pedido
// (Negociação, Aprovado, Em produção, Pronto, Entregue, Cancelado).

export const pedidos = [
  {
    id: 433,
    numero: '2026-0433',
    estado: 'Em aberto',
    cliente: 'Joana Ribeiro Dias',
    origem: 'WhatsApp',
    entrega: 'Vence amanhã',
    valor: 289.0,
    situacao: 'Orçamento enviado',
  },
  {
    id: 431,
    numero: '2026-0431',
    estado: 'Em aberto',
    cliente: 'Clínica Vida Plena',
    origem: 'WhatsApp',
    entrega: '30 de outubro',
    valor: 4120.0,
    situacao: 'Negociação',
  },
  {
    id: 427,
    numero: '2026-0427',
    estado: 'Fechado',
    cliente: 'Maria Aparecida Lopes',
    origem: 'Loja',
    entrega: '28 de outubro',
    valor: 212.0,
    situacao: 'Aprovado',
  },
  {
    id: 423,
    numero: '2026-0423',
    estado: 'Fechado',
    cliente: 'Turma Medicina 2026/2',
    origem: 'Loja',
    entrega: 'Hoje',
    valor: 18600.0,
    situacao: 'Em produção',
  },
  {
    id: 418,
    numero: '2026-0418',
    estado: 'Fechado',
    cliente: 'Hospital Santa Clara',
    origem: 'WhatsApp',
    entrega: 'Atrasado 2 dias',
    valor: 9840.0,
    situacao: 'Em produção',
  },
  {
    id: 412,
    numero: '2026-0412',
    estado: 'Fechado',
    cliente: 'Rafael Nogueira Pinto',
    origem: 'Site',
    entrega: '24 de outubro',
    valor: 178.0,
    situacao: 'Pronto',
  },
  {
    id: 405,
    numero: '2026-0405',
    estado: 'Fechado',
    cliente: 'Ana Beatriz Carvalho',
    origem: 'Site',
    entrega: '21 de outubro',
    valor: 356.0,
    situacao: 'Entregue',
  },
  {
    id: 399,
    numero: '2026-0399',
    estado: 'Fechado',
    cliente: 'Turma Enfermagem 2026/1',
    origem: 'Loja',
    entrega: '18 de outubro',
    valor: 7250.0,
    situacao: 'Cancelado',
  },
];

// Um pedido aberto, com itens e pagamentos. É o que a tela PedidoNovo mostra.
export const pedido = {
  id: 423,
  numero: '2026-0423',
  estado: 'Fechado',
  cliente: 'Turma Medicina 2026/2',
  contato: 'Carla Menezes · (31) 98877-1200',
  origem: 'Loja',
  tabelaPreco: 'Atacado 2026',
  validoAte: '2026-11-01',
  desconto: 0,

  // Pedido de turma: 120 peças divididas por tamanho, mais o serviço de
  // bordado do brasão. As contas fecham de propósito, para quem abrir a tela
  // conferir: 120 × 137 = 16.440, mais 120 × 18 = 2.160, total 18.600, que é
  // o que os dois pagamentos de 9.300 somam.
  itens: [
    {
      id: 1,
      produto: 'Jaleco gabardine branco · M',
      sku: 'JAL-GAB-BR-M',
      bordado: 'Nome no bolso e brasão',
      detalheBordado: 'Nomes vindos da lista da turma · linha azul-marinho',
      quantidade: 48,
      unitario: 137.0,
    },
    {
      id: 2,
      produto: 'Jaleco gabardine branco · G',
      sku: 'JAL-GAB-BR-G',
      bordado: 'Nome no bolso e brasão',
      detalheBordado: 'Nomes vindos da lista da turma · linha azul-marinho',
      quantidade: 42,
      unitario: 137.0,
    },
    {
      id: 3,
      produto: 'Jaleco gabardine branco · P',
      sku: 'JAL-GAB-BR-P',
      bordado: 'Nome no bolso e brasão',
      detalheBordado: 'Nomes vindos da lista da turma · linha azul-marinho',
      quantidade: 30,
      unitario: 137.0,
    },
    {
      id: 4,
      produto: 'Bordado de brasão',
      sku: 'SER-BOR-BRA',
      bordado: 'Serviço',
      detalheBordado: 'Matriz Medicina 2026/2 · versão 3 · nas 120 peças',
      quantidade: 120,
      unitario: 18.0,
    },
  ],

  pagamentos: [
    { id: 1, tipo: 'Sinal (50%)', forma: 'Pix', valor: 9300.0, situacao: 'Confirmado' },
    { id: 2, tipo: 'Saldo', forma: 'A combinar', valor: 9300.0, situacao: 'Pendente' },
  ],
};
