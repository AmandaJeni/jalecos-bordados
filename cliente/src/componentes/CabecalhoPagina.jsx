// O topo de cada tela: título, uma linha de apoio e os botões da direita.
//
//   <CabecalhoPagina titulo="Pedidos" subtitulo="124 registros encontrados">
//     <Link to="/pedidos/novo" className="botao botao--primario">Novo pedido</Link>
//   </CabecalhoPagina>
//
// O subtitulo e os children são opcionais: as chaves com && só desenham
// o pedaço quando o valor existe. É o jeito mais comum de fazer
// "mostre isto só se" em React.
export default function CabecalhoPagina({ titulo, subtitulo, children }) {
  return (
    <div className="cabecalho-pagina">
      <div>
        <h1>{titulo}</h1>
        {subtitulo && <p className="cabecalho-pagina__subtitulo">{subtitulo}</p>}
      </div>
      {children && <div className="cabecalho-pagina__acoes">{children}</div>}
    </div>
  );
}
