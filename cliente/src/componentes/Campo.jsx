// Um campo de formulário: rótulo em cima, o campo no meio, a ajuda embaixo.
//
//   <Campo id="cpf" rotulo="CPF" obrigatorio ajuda="Só números">
//     <input id="cpf" className="entrada" type="text" />
//   </Campo>
//
// REPARE: o id aparece duas vezes, no Campo e no <input>. Não é descuido.
// O <label htmlFor> precisa apontar para o id do campo, senão clicar no
// rótulo não foca o campo e o leitor de tela não sabe o que está lendo.
// Em JSX é htmlFor, não "for", porque "for" é palavra reservada do JavaScript.
//
// A palavra "(obrigatório)" vai escrita por extenso em vez de asterisco
// (RNF-09): asterisco é convenção de quem já usa sistema.
export default function Campo({ id, rotulo, obrigatorio = false, ajuda, largura, children }) {
  // largura aceita 'largo' ou 'estreito'; sem nada, o campo divide o espaço.
  const classe = ['campo', largura ? `campo--${largura}` : ''].join(' ').trim();

  return (
    <div className={classe}>
      <label className="campo__rotulo" htmlFor={id}>
        {rotulo}
        {obrigatorio && <span className="campo__obrigatorio"> (obrigatório)</span>}
      </label>
      {children}
      {ajuda && <span className="campo__ajuda">{ajuda}</span>}
    </div>
  );
}
