// A faixa colorida com ícone e uma frase.
//
//   <Aviso tom="atencao" icone="alerta">
//     <strong>7 produtos estão no estoque mínimo ou abaixo dele.</strong>
//   </Aviso>
//
// tom: 'info' (azul), 'atencao' (amarelo) ou 'destaque' (roxo claro).
//
// role="status" faz o leitor de tela anunciar o aviso quando ele aparece,
// sem interromper o que a pessoa está fazendo.
import Icone from './Icone.jsx';

const COR_DO_ICONE = {
  info: '#1F4E79',
  atencao: '#92400E',
  destaque: '#5B21B6',
};

export default function Aviso({ tom = 'info', icone = 'info', children, acao }) {
  return (
    <div className={`aviso aviso--${tom}`} role="status">
      <Icone nome={icone} tamanho={24} cor={COR_DO_ICONE[tom]} />
      <p className="aviso__texto">{children}</p>
      {acao}
    </div>
  );
}
