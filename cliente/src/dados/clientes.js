// Dados de exemplo das telas de Clientes.
//
// Não guardamos as iniciais nem a cor do círculo: as duas coisas saem do
// nome e do tipo, na própria tela. Regra geral: se dá para calcular a
// partir do que já existe, calcule na hora, não guarde.

export const clientes = [
  {
    id: 1,
    nome: 'Turma Medicina 2026/2',
    tipo: 'Turma',
    contato: 'Carla Menezes · (31) 98877-1200',
    pessoaContato: 'Carla Menezes',
    telefone: '(31) 98877-1200',
    email: 'carla.menezes@exemplo.com',
    cidade: 'Belo Horizonte, MG',
  },
  {
    id: 2,
    nome: 'Hospital Santa Clara',
    tipo: 'Hospital',
    contato: 'Compras · (31) 3344-8800',
    pessoaContato: 'Compras',
    telefone: '(31) 3344-8800',
    email: 'compras@santaclara.exemplo.com',
    cidade: 'Belo Horizonte, MG',
  },
  {
    id: 3,
    nome: 'Clínica Vida Plena',
    tipo: 'Clínica',
    contato: 'Recepção · (31) 3290-4512',
    pessoaContato: 'Recepção',
    telefone: '(31) 3290-4512',
    email: 'contato@vidaplena.exemplo.com',
    cidade: 'Contagem, MG',
  },
  {
    id: 4,
    nome: 'Maria Aparecida Lopes',
    tipo: 'Final',
    contato: '(31) 99120-7744',
    pessoaContato: '',
    telefone: '(31) 99120-7744',
    email: 'maria.lopes@exemplo.com',
    cidade: 'Belo Horizonte, MG',
  },
  {
    id: 5,
    nome: 'Rafael Nogueira Pinto',
    tipo: 'Final',
    contato: '(31) 98433-1097',
    pessoaContato: '',
    telefone: '(31) 98433-1097',
    email: 'rafael.pinto@exemplo.com',
    cidade: 'Nova Lima, MG',
  },
  {
    id: 6,
    nome: 'Turma Enfermagem 2026/1',
    tipo: 'Turma',
    contato: 'Júlia Barros · (31) 99777-2233',
    pessoaContato: 'Júlia Barros',
    telefone: '(31) 99777-2233',
    email: 'julia.barros@exemplo.com',
    cidade: 'Belo Horizonte, MG',
  },
  {
    id: 7,
    nome: 'Laboratório Bioanálise',
    tipo: 'Clínica',
    contato: 'Administrativo · (31) 3561-7700',
    pessoaContato: 'Administrativo',
    telefone: '(31) 3561-7700',
    email: 'adm@bioanalise.exemplo.com',
    cidade: 'Betim, MG',
  },
];

export const historicoCliente = [
  {
    id: 423,
    numero: 'Pedido 2026-0423',
    data: '18 de outubro',
    resumo: '120 peças com brasão',
    valor: 18600.0,
    situacao: 'Em produção',
  },
  {
    id: 290,
    numero: 'Pedido 2026-0290',
    data: '2 de setembro',
    resumo: '8 peças de reposição',
    valor: 1240.0,
    situacao: 'Entregue',
  },
  {
    id: 188,
    numero: 'Pedido 2026-0188',
    data: '14 de julho',
    resumo: 'Mostruário de 6 peças',
    valor: 0,
    situacao: 'Entregue',
  },
  {
    id: 171,
    numero: 'Pedido 2026-0171',
    data: '28 de junho',
    resumo: 'Proposta inicial da turma',
    valor: 17900.0,
    situacao: 'Expirado',
  },
];
