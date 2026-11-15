// O esqueleto das telas internas: menu à esquerda, conteúdo à direita.
//
// Toda tela que não seja a de entrar começa assim:
//
//   export default function MinhaTela() {
//     return (
//       <Layout>
//         ... o que é só desta tela ...
//       </Layout>
//     );
//   }
//
// "children" é o que você escreveu entre <Layout> e </Layout>. É assim que
// um componente React envolve outro conteúdo sem saber o que ele é.
import MenuLateral from './MenuLateral.jsx';

export default function Layout({ children }) {
  return (
    <div className="shell">
      <MenuLateral />
      <main className="conteudo">{children}</main>
    </div>
  );
}
