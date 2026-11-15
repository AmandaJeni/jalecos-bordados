// Funções pequenas de formatação, usadas por várias telas.
//
// Ficam aqui, e não dentro de uma tela, porque "R$ 18.600,00" precisa sair
// igual na lista de pedidos, no histórico do cliente e no total do pedido.
// Se cada tela formatar do seu jeito, uma hora saem diferentes.

/** 18600 vira "R$ 18.600,00". O navegador faz o trabalho, não precisa de biblioteca. */
export function dinheiro(valor) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(valor ?? 0);
}

/** "Turma Medicina 2026/2" vira "TM". Usado no círculo da lista de clientes. */
export function iniciais(nome) {
  if (!nome) return '?';

  return nome
    .trim()
    .split(/\s+/) // separa em palavras
    .slice(0, 2) // pega as duas primeiras
    .map((palavra) => palavra[0])
    .join('')
    .toUpperCase();
}

/** Cada tipo de cliente tem uma cor de círculo. Só aparência, fica longe dos dados. */
const COR_POR_TIPO = {
  Turma: '#1F4E79',
  Hospital: '#0E7490',
  Clínica: '#5B21B6',
  Final: '#B45309',
};

export function corDoCliente(tipo) {
  return COR_POR_TIPO[tipo] ?? '#5A6472';
}

/** 220 minutos viram "3h40". 45 viram "45min". */
export function duracao(minutos) {
  const horas = Math.floor(minutos / 60);
  const resto = minutos % 60;

  if (horas === 0) return `${resto}min`;
  return `${horas}h${String(resto).padStart(2, '0')}`;
}

/** 14280 vira "14.280". Para número de pontos da matriz. */
export function milhar(valor) {
  return new Intl.NumberFormat('pt-BR').format(valor ?? 0);
}
