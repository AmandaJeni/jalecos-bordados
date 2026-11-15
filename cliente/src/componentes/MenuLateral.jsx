// O menu azul da esquerda. Aparece igual em todas as telas internas (RNF-10).
//
// ESTA É A PEÇA MAIS COMPARTILHADA DO PROJETO. Se você vai mexer aqui,
// avise o grupo antes: seis pessoas editando o mesmo arquivo é conflito
// garantido no merge.
//
// Para acrescentar uma tela ao menu, basta uma linha na lista ITENS abaixo.
import { NavLink, Link } from 'react-router-dom';

import Icone from './Icone.jsx';

// A lista é só dado: rótulo, endereço e nome do ícone. Nada de cor aqui.
// Qual item fica branco é o CSS que decide, pela classe --ativo.
const ITENS = [
  { rotulo: 'Painel', destino: '/', icone: 'painel' },
  { rotulo: 'Pedidos', destino: '/pedidos', icone: 'pedidos' },
  { rotulo: 'Clientes', destino: '/clientes', icone: 'clientes' },
  { rotulo: 'Estoque', destino: '/estoque', icone: 'estoque' },
  { rotulo: 'Produção', destino: '/producao', icone: 'producao' },
  { rotulo: 'Matrizes', destino: '/matrizes', icone: 'matrizes' },
  { rotulo: 'Funcionários', destino: '/funcionarios', icone: 'funcionarios' },
];

export default function MenuLateral({ usuario = 'Usuário', papel = 'Administrador', unidade = 'Loja 02' }) {
  return (
    <nav className="menu" aria-label="Menu principal">
      <div className="menu__marca">
        <div className="menu__nome">Jalecos Bordados</div>
        <div className="menu__unidade">{unidade}</div>
      </div>

      <div className="menu__lista">
        {/* .map() transforma cada item da lista em um link.
            O key é obrigatório e precisa ser único: é como o React sabe
            qual item mudou quando a lista muda. */}
        {ITENS.map((item) => (
          <NavLink
            key={item.destino}
            to={item.destino}
            // NavLink sabe sozinho se a rota atual é a dele e passa isActive.
            // "end" faz o item Painel (/) só acender em /, não em /pedidos.
            end={item.destino === '/'}
            className={({ isActive }) =>
              isActive ? 'menu__item menu__item--ativo' : 'menu__item'
            }
          >
            <Icone nome={item.icone} />
            {item.rotulo}
          </NavLink>
        ))}
      </div>

      <div className="menu__rodape">
        <div className="menu__usuario">
          <div className="menu__usuario-nome">{usuario}</div>
          <div className="menu__usuario-papel">{papel}</div>
        </div>
        <Link to="/entrar" className="menu__item">
          <Icone nome="sair" tamanho={20} />
          Sair da conta
        </Link>
      </div>
    </nav>
  );
}
