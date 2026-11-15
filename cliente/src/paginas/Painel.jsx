// Painel inicial.  Rota: /
// Requisito: RF-57 (pedidos em aberto, atrasados, tarefas do dia e produtos
// abaixo do mínimo, tudo na primeira tela).
//
// RNF-07 pede que as tarefas frequentes estejam a três cliques. Daqui, novo
// pedido, estoque e fila de bordado estão a um.
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import Layout from '../componentes/Layout.jsx';
import CabecalhoPagina from '../componentes/CabecalhoPagina.jsx';
import Etiqueta from '../componentes/Etiqueta.jsx';
import Icone from '../componentes/Icone.jsx';
import { api } from '../servicos/api.js';

/** Escreve a data de hoje por extenso: "Sábado, 15 de novembro de 2026". */
function dataDeHoje() {
  const texto = new Intl.DateTimeFormat('pt-BR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date());

  return texto.charAt(0).toUpperCase() + texto.slice(1);
}

export default function Painel() {
  const [dados, setDados] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState('');

  useEffect(() => {
    api
      .painel()
      .then(setDados)
      .catch((problema) => setErro(problema.message))
      .finally(() => setCarregando(false));
  }, []);

  return (
    <Layout>
      <CabecalhoPagina titulo="Bom dia, Usuário" subtitulo={dataDeHoje()}>
        <Link to="/pedidos/novo" className="botao botao--primario">
          <Icone nome="mais" espessura={2.5} />
          Novo pedido
        </Link>
      </CabecalhoPagina>

      {erro && <p className="entrar__erro">{erro}</p>}
      {carregando && <p className="texto-suave">Carregando o painel...</p>}

      {dados && (
        <>
          {/* --- Indicadores --- */}
          <div className="grade-4">
            {dados.indicadores.map((indicador) => (
              <Link key={indicador.rotulo} to={indicador.destino} className="indicador">
                <div className="indicador__rotulo">{indicador.rotulo}</div>
                <div className="indicador__valor">
                  <span className="indicador__numero numero">{indicador.valor}</span>
                  <span className="texto-apoio">{indicador.unidade}</span>
                </div>
              </Link>
            ))}
          </div>

          <div className="colunas">
            {/* --- Pedidos que precisam de atenção --- */}
            <section className="cartao" style={{ flex: '999 1 520px', minWidth: 0 }}>
              <div className="cartao__cabecalho">
                <h2>Pedidos que precisam de atenção</h2>
                <Link to="/pedidos" style={{ fontWeight: 600, textDecoration: 'none' }}>
                  Ver todos os pedidos
                </Link>
              </div>

              <div className="rolagem">
                <table className="tabela" style={{ minWidth: '560px' }}>
                  <thead>
                    <tr>
                      <th scope="col">Pedido</th>
                      <th scope="col">Cliente</th>
                      <th scope="col">Entrega</th>
                      <th scope="col">Situação</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dados.pedidos.map((pedido) => (
                      <tr key={pedido.id}>
                        <td className="destaque sem-quebra">{pedido.numero}</td>
                        <td>{pedido.cliente}</td>
                        {/* A urgência vem do servidor como palavra; a cor é
                            escolhida aqui, pela classe do CSS. */}
                        <td className={`prazo--${pedido.urgencia}`}>{pedido.entrega}</td>
                        <td>
                          <Etiqueta texto={pedido.situacao} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* --- Bordados de hoje --- */}
            <section className="cartao" style={{ flex: '1 1 340px', minWidth: '300px' }}>
              <div className="cartao__cabecalho">
                <h2>Bordados de hoje</h2>
                <Link to="/producao" style={{ fontWeight: 600, textDecoration: 'none' }}>
                  Abrir fila
                </Link>
              </div>

              <ul className="lista" style={{ padding: '8px 0' }}>
                {dados.tarefas.map((tarefa) => (
                  <li key={tarefa.id} className="lista__item" style={{ alignItems: 'flex-start' }}>
                    <span className="hora">{tarefa.hora}</span>
                    <span className="lista__principal">
                      <span className="lista__titulo" style={{ fontSize: '16px' }}>
                        {tarefa.titulo}
                      </span>
                      <span className="lista__detalhe">{tarefa.detalhe}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </>
      )}
    </Layout>
  );
}
