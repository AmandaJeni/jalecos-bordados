// Lista de pedidos.  Rota: /pedidos
// Requisitos: RF-50 (situação com cor e texto), RF-52 (localizar pedido por
// número, cliente, situação, período e origem).
//
// DECISÃO DA REUNIÃO DE 6 DE NOVEMBRO: não existe mais orçamento separado.
// O registro nasce EM ABERTO (faz o papel do orçamento, sem reservar peça) e
// vira FECHADO quando é confirmado. Por isso o filtro principal são os três
// botões Todos / Em aberto / Fechados, que o Samuel propôs por serem mais
// diretos para quem não tem familiaridade com sistema.
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import Layout from '../componentes/Layout.jsx';
import CabecalhoPagina from '../componentes/CabecalhoPagina.jsx';
import Campo from '../componentes/Campo.jsx';
import Etiqueta from '../componentes/Etiqueta.jsx';
import Icone from '../componentes/Icone.jsx';
import { api } from '../servicos/api.js';
import { dinheiro } from '../servicos/formato.js';

// A legenda de cores da tabela. Os nomes têm que ser os mesmos que o
// componente Etiqueta conhece, senão a bolinha sai de uma cor e a etiqueta
// da tabela de outra.
const LEGENDA = [
  { rotulo: 'Negociação', cor: 'var(--amarelo-texto)' },
  { rotulo: 'Orçamento enviado', cor: 'var(--azulclaro-texto)' },
  { rotulo: 'Aprovado', cor: 'var(--verde-texto)' },
  { rotulo: 'Em produção', cor: 'var(--roxo-texto)' },
  { rotulo: 'Pronto', cor: 'var(--ciano-texto)' },
  { rotulo: 'Entregue', cor: 'var(--cinza-texto)' },
  { rotulo: 'Cancelado', cor: 'var(--vermelho-texto)' },
];

export default function Pedidos() {
  const [pedidos, setPedidos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState('');

  const [estado, setEstado] = useState('Todos'); // Todos | Em aberto | Fechado
  const [busca, setBusca] = useState('');
  const [situacao, setSituacao] = useState('Todas');
  const [origem, setOrigem] = useState('Todas');

  useEffect(() => {
    api
      .listarPedidos()
      .then(setPedidos)
      .catch((problema) => setErro(problema.message))
      .finally(() => setCarregando(false));
  }, []);

  const visiveis = pedidos.filter((pedido) => {
    const texto = `${pedido.numero} ${pedido.cliente}`.toLowerCase();
    return (
      texto.includes(busca.toLowerCase()) &&
      (estado === 'Todos' || pedido.estado === estado) &&
      (situacao === 'Todas' || pedido.situacao === situacao) &&
      (origem === 'Todas' || pedido.origem === origem)
    );
  });

  function limparFiltros() {
    setBusca('');
    setSituacao('Todas');
    setOrigem('Todas');
    setEstado('Todos');
  }

  return (
    <Layout>
      <CabecalhoPagina titulo="Pedidos" subtitulo={`${visiveis.length} registros encontrados`}>
        <Link to="/pedidos/novo" className="botao botao--primario">
          <Icone nome="mais" espessura={2.5} />
          Novo pedido
        </Link>
      </CabecalhoPagina>

      {erro && <p className="entrar__erro">{erro}</p>}

      {/* --- Botões de em aberto e fechado --- */}
      <section className="cartao cartao--preenchido" aria-label="Filtros">
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', alignItems: 'center' }}>
          <span className="campo__rotulo">Mostrar:</span>
          <div className="escolha" role="group" aria-label="Estado do pedido">
            {['Todos', 'Em aberto', 'Fechado'].map((opcao) => (
              <button
                key={opcao}
                type="button"
                className="escolha__botao"
                aria-pressed={estado === opcao}
                onClick={() => setEstado(opcao)}
              >
                {opcao === 'Fechado' ? 'Fechados' : opcao}
              </button>
            ))}
          </div>
        </div>

        <div className="campos" style={{ marginTop: '20px', alignItems: 'flex-end' }}>
          <Campo id="busca" rotulo="Procurar" largura="largo">
            <input
              id="busca"
              className="entrada"
              type="search"
              placeholder="Número do pedido, nome ou telefone"
              value={busca}
              onChange={(evento) => setBusca(evento.target.value)}
            />
          </Campo>

          <Campo id="situacao" rotulo="Situação">
            <select
              id="situacao"
              className="selecao"
              value={situacao}
              onChange={(evento) => setSituacao(evento.target.value)}
            >
              <option>Todas</option>
              {LEGENDA.map((item) => (
                <option key={item.rotulo}>{item.rotulo}</option>
              ))}
            </select>
          </Campo>

          <Campo id="origem" rotulo="Origem">
            <select
              id="origem"
              className="selecao"
              value={origem}
              onChange={(evento) => setOrigem(evento.target.value)}
            >
              <option>Todas</option>
              <option>Loja</option>
              <option>Site</option>
              <option>WhatsApp</option>
            </select>
          </Campo>

          <Campo id="periodo" rotulo="Período">
            <select id="periodo" className="selecao" defaultValue="Últimos 30 dias">
              <option>Últimos 30 dias</option>
              <option>Este mês</option>
              <option>Mês passado</option>
              <option>Escolher datas</option>
            </select>
          </Campo>

          <button type="button" className="botao botao--contorno" onClick={limparFiltros}>
            Limpar filtros
          </button>
        </div>
      </section>

      {/* --- Legenda: a cor sozinha nunca informa (RNF-04) --- */}
      <section className="cartao legenda" aria-label="Legenda das situações">
        <span className="campo__rotulo texto-suave" style={{ fontSize: 'var(--texto-apoio)' }}>
          O que cada cor quer dizer:
        </span>
        {LEGENDA.map((item) => (
          <span key={item.rotulo} className="legenda__item">
            <span className="legenda__cor" style={{ background: item.cor }} aria-hidden="true" />
            {item.rotulo}
          </span>
        ))}
      </section>

      {/* --- Tabela --- */}
      <section className="cartao" style={{ overflow: 'hidden' }}>
        {carregando ? (
          <p className="cartao__rodape" style={{ borderTop: 0 }}>
            Carregando pedidos...
          </p>
        ) : (
          <>
            <div className="rolagem">
              <table className="tabela" style={{ minWidth: '900px' }}>
                <caption>Clique no número do pedido para abrir os detalhes.</caption>
                <thead>
                  <tr>
                    <th scope="col">Número</th>
                    <th scope="col">Cliente</th>
                    <th scope="col">Origem</th>
                    <th scope="col">Entrega</th>
                    <th scope="col" className="alinhar-direita">
                      Valor
                    </th>
                    <th scope="col">Situação</th>
                  </tr>
                </thead>
                <tbody>
                  {visiveis.map((pedido) => (
                    <tr key={pedido.id}>
                      <td>
                        <Link
                          to="/pedidos/novo"
                          style={{ fontWeight: 600, textDecoration: 'none' }}
                        >
                          {pedido.numero}
                        </Link>
                        <span className="lista__detalhe">{pedido.estado}</span>
                      </td>
                      <td>{pedido.cliente}</td>
                      <td className="texto-suave">{pedido.origem}</td>
                      <td>{pedido.entrega}</td>
                      <td className="alinhar-direita numero">{dinheiro(pedido.valor)}</td>
                      <td>
                        <Etiqueta texto={pedido.situacao} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div
              className="cartao__rodape"
              style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', justifyContent: 'space-between', alignItems: 'center' }}
            >
              <span>
                Mostrando {visiveis.length} de {pedidos.length}
              </span>
              {/* RF-52 pede paginação de até 50 registros por página.
                  Com dados de exemplo cabe tudo em uma página só; quando o
                  backend existir, a paginação vem dele. */}
              <div className="paginacao">
                <button type="button">Anterior</button>
                <button type="button" aria-current="page">
                  1
                </button>
                <button type="button">Próxima</button>
              </div>
            </div>
          </>
        )}
      </section>
    </Layout>
  );
}
