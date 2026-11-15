// A pílula colorida de situação: bolinha mais a palavra.
//
//   <Etiqueta texto="Em produção" />
//
// O tom (a cor) sai da própria palavra, pela tabela TONS abaixo. Assim
// "Em produção" é roxo na tela de pedidos, no painel e no histórico do
// cliente sem ninguém ter que repetir o hexadecimal em três lugares.
//
// Se o backend devolver uma situação que não está na tabela, a etiqueta sai
// cinza em vez de quebrar. Quando isso acontecer, acrescente a palavra aqui.

const TONS = {
  // Pedidos
  'Em aberto': 'amarelo',
  Fechado: 'verde',
  Negociação: 'amarelo',
  'Orçamento enviado': 'azul',
  Aprovado: 'verde',
  'Em produção': 'roxo',
  Pronto: 'ciano',
  Entregue: 'cinza',
  Cancelado: 'vermelho',
  Expirado: 'cinza',

  // Estoque
  Disponível: 'verde',
  'No mínimo': 'amarelo',
  'Sem estoque': 'vermelho',

  // Produção
  Pendente: 'amarelo',
  'Em execução': 'azul',
  Concluída: 'cinza',

  // Pagamento
  Confirmado: 'verde',
  Estornado: 'vermelho',

  // Funcionários
  Administrador: 'roxo',
  'Acesso comum': 'verde',
  'Sem acesso': 'cinza',
};

export default function Etiqueta({ texto, tom }) {
  // tom passado por fora ganha; senão procura na tabela; senão cinza.
  const cor = tom ?? TONS[texto] ?? 'cinza';

  return (
    <span className={`etiqueta etiqueta--${cor}`}>
      <span className="etiqueta__ponto" aria-hidden="true" />
      {texto}
    </span>
  );
}
