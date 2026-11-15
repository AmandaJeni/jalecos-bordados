// Dados de exemplo da fila de produção.
//
// As máquinas trazem minutosOcupados e minutosDisponiveis em vez da largura
// da barra em porcentagem: a largura é conta de tela, não informação do
// servidor. A tela calcula e também decide se a máquina está folgada,
// quase cheia ou lotada.

export const producao = {
  dia: '2026-10-25',

  maquinas: [
    { id: 1, nome: 'Máquina 1', detalhe: 'Tajima · Fábrica', minutosOcupados: 220, minutosDisponiveis: 480 },
    { id: 2, nome: 'Máquina 2', detalhe: 'Barudan · Fábrica', minutosOcupados: 375, minutosDisponiveis: 480 },
    { id: 3, nome: 'Máquina 3', detalhe: 'Barudan · Loja 02', minutosOcupados: 460, minutosDisponiveis: 480 },
    { id: 4, nome: 'Máquina 4', detalhe: 'Barudan · Loja 28', minutosOcupados: 145, minutosDisponiveis: 480 },
  ],

  tarefas: [
    {
      id: 1,
      hora: '08:00',
      duracao: '2h10',
      titulo: 'Brasão na manga · 24 peças',
      pedido: 'Pedido 2026-0423',
      cliente: 'Turma Medicina 2026/2',
      matriz: 'Matriz Medicina 2026/2 · versão 3 · arquivo .EMB',
      maquina: 'Máquina 3',
      responsavel: 'Profissional de bordado 1',
      situacao: 'Concluída',
    },
    {
      id: 2,
      hora: '10:20',
      duracao: '50min',
      titulo: 'Nome no bolso · 6 peças',
      pedido: 'Pedido 2026-0427',
      cliente: 'Maria Aparecida Lopes',
      matriz: 'Sem matriz · bordado de nome',
      maquina: 'Máquina 3',
      responsavel: 'Profissional de bordado 1',
      situacao: 'Em execução',
    },
    {
      id: 3,
      hora: '11:30',
      duracao: '3h00',
      titulo: 'Logo na manga · 40 peças',
      pedido: 'Pedido 2026-0418',
      cliente: 'Hospital Santa Clara',
      matriz: 'Matriz Santa Clara · versão 2 · arquivo .DST',
      maquina: 'Máquina 3',
      responsavel: 'Profissional de bordado 2',
      situacao: 'Pendente',
    },
    {
      id: 4,
      hora: '13:00',
      duracao: '1h30',
      titulo: 'Brasão na manga · 18 peças',
      pedido: 'Pedido 2026-0423',
      cliente: 'Turma Medicina 2026/2',
      matriz: 'Matriz Medicina 2026/2 · versão 3 · arquivo .EMB',
      maquina: 'Máquina 2',
      responsavel: 'Profissional de bordado 2',
      situacao: 'Pendente',
    },
    {
      id: 5,
      hora: '14:40',
      duracao: '40min',
      titulo: 'Ajuste de barra e manga · 3 peças',
      pedido: 'Pedido 2026-0412',
      cliente: 'Rafael Nogueira Pinto',
      matriz: 'Costura · sem bordado',
      maquina: 'Costura',
      responsavel: 'Costureira 1',
      situacao: 'Pendente',
    },
    {
      id: 6,
      hora: '15:30',
      duracao: '1h20',
      titulo: 'Nome no bolso · 12 peças',
      pedido: 'Pedido 2026-0431',
      cliente: 'Clínica Vida Plena',
      matriz: 'Sem matriz · bordado de nome',
      maquina: 'Máquina 4',
      responsavel: 'Profissional de bordado 1',
      situacao: 'Pendente',
    },
  ],
};
