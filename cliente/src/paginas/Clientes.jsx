// Tela de Clientes.  Rota: /clientes
// Requisitos: RF-03 (consultar clientes), RF-51 (histórico de pedidos do cliente).
//
// =============================================================================
// ESTA TELA É O MODELO DAS OUTRAS. Se você vai escrever uma tela nova, leia
// este arquivo inteiro antes. Ele mostra, em ordem:
//
//   1. buscar dados do servidor quando a tela abre  (useState + useEffect)
//   2. mostrar "carregando" e mostrar erro sem quebrar
//   3. filtrar uma lista sem pedir nada de novo ao servidor
//   4. transformar a lista em tela                  (.map)
//   5. guardar qual item está selecionado           (useState)
//
// Copie a estrutura, troque o conteúdo.
// =============================================================================

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import Layout from '../componentes/Layout.jsx';
import CabecalhoPagina from '../componentes/CabecalhoPagina.jsx';
import Campo from '../componentes/Campo.jsx';
import Etiqueta from '../componentes/Etiqueta.jsx';
import Icone from '../componentes/Icone.jsx';
import { api } from '../servicos/api.js';
import { dinheiro, iniciais, corDoCliente } from '../servicos/formato.js';

export default function Clientes() {
  // --- 1. Estado ------------------------------------------------------------
  // Cada useState devolve um par: o valor de agora e a função que troca ele.
  // Trocar o valor faz o React redesenhar a tela sozinho. Você nunca mexe
  // no HTML direto, nunca usa document.getElementById.
  const [clientes, setClientes] = useState([]); // começa vazio, enche depois
  const [historico, setHistorico] = useState([]);
  const [selecionado, setSelecionado] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState('');

  // Filtros. Ficam no estado porque a tela muda conforme eles.
  const [busca, setBusca] = useState('');
  const [tipo, setTipo] = useState('Todos');

  // --- 2. Buscar os dados ---------------------------------------------------
  // useEffect roda o código depois que a tela aparece.
  //
  // O [] no fim é a parte que todo mundo erra: ele diz "rode uma vez só,
  // quando a tela abrir". Sem ele, o efeito roda a cada redesenho, chama
  // setClientes, que causa outro redesenho, que roda o efeito de novo:
  // laço infinito.
  useEffect(() => {
    let cancelado = false; // evita avisar uma tela que já saiu do ar

    async function carregar() {
      try {
        const lista = await api.listarClientes();
        const pedidosDoCliente = await api.historicoDoCliente(lista[0]?.id);

        if (cancelado) return;

        setClientes(lista);
        setHistorico(pedidosDoCliente);
        setSelecionado(lista[0] ?? null); // já abre com o primeiro escolhido
      } catch (problema) {
        if (!cancelado) setErro(problema.message);
      } finally {
        if (!cancelado) setCarregando(false);
      }
    }

    carregar();

    // O que a função devolve é a "limpeza": roda quando a tela sai.
    return () => {
      cancelado = true;
    };
  }, []);

  // --- 3. Filtrar -----------------------------------------------------------
  // Isto roda a cada redesenho, e tudo bem: filtrar uma lista de alguns
  // milhares de itens na memória é instantâneo. Só vale pedir ao servidor
  // quando a lista for grande de verdade.
  const visiveis = clientes.filter((cliente) => {
    const texto = `${cliente.nome} ${cliente.telefone} ${cliente.email}`.toLowerCase();
    const combinaBusca = texto.includes(busca.toLowerCase());
    const combinaTipo = tipo === 'Todos' || cliente.tipo === tipo;
    return combinaBusca && combinaTipo;
  });

  return (
    <Layout>
      <CabecalhoPagina titulo="Clientes" subtitulo={`${clientes.length} cadastrados`}>
        <Link to="/clientes/novo" className="botao botao--primario">
          <Icone nome="mais" espessura={2.5} />
          Novo cliente
        </Link>
      </CabecalhoPagina>

      {/* Erro e carregando primeiro: a tela precisa funcionar nos três estados
          (carregando, deu erro, deu certo), não só quando dá certo. */}
      {erro && <p className="entrar__erro">{erro}</p>}

      {carregando ? (
        <p className="texto-suave">Carregando clientes...</p>
      ) : (
        <div className="colunas">
          {/* ---------------- Lista da esquerda ---------------- */}
          <section className="coluna-lista">
            <div className="cartao cartao--preenchido">
              <div className="campos">
                <Campo id="busca-cli" rotulo="Procurar cliente" largura="largo">
                  <input
                    id="busca-cli"
                    className="entrada"
                    type="search"
                    placeholder="Nome, telefone, email ou CPF"
                    value={busca}
                    onChange={(evento) => setBusca(evento.target.value)}
                  />
                </Campo>

                <Campo id="tipo-cli" rotulo="Tipo">
                  <select
                    id="tipo-cli"
                    className="selecao"
                    value={tipo}
                    onChange={(evento) => setTipo(evento.target.value)}
                  >
                    <option>Todos</option>
                    <option>Final</option>
                    <option>Turma</option>
                    <option>Hospital</option>
                    <option>Clínica</option>
                  </select>
                </Campo>
              </div>
            </div>

            <div className="cartao" style={{ overflow: 'hidden' }}>
              {visiveis.length === 0 ? (
                // Lista vazia precisa dizer o que aconteceu, não ficar em branco.
                <p className="cartao__rodape" style={{ borderTop: 0 }}>
                  Nenhum cliente encontrado com esse filtro.
                </p>
              ) : (
                <ul className="lista">
                  {/* ---- 4. A lista virando tela ----
                      .map percorre o array e devolve um <li> por cliente.
                      O key tem que ser único e estável: usamos o id do banco,
                      nunca a posição no array. */}
                  {visiveis.map((cliente) => (
                    <li
                      key={cliente.id}
                      className={cliente.id === selecionado?.id ? 'linha--ativa' : ''}
                      style={{ borderBottom: '1px solid var(--linha-tabela)' }}
                    >
                      <button
                        type="button"
                        className="lista__botao"
                        onClick={() => setSelecionado(cliente)}
                      >
                        <span
                          className="inicial"
                          style={{ background: corDoCliente(cliente.tipo) }}
                          aria-hidden="true"
                        >
                          {iniciais(cliente.nome)}
                        </span>
                        <span className="lista__principal">
                          <span className="lista__titulo">{cliente.nome}</span>
                          <span className="lista__detalhe">{cliente.contato}</span>
                        </span>
                        <span className="marca-tipo">{cliente.tipo}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </section>

          {/* ---------------- Detalhe da direita ---------------- */}
          {selecionado && (
            <section className="cartao coluna-detalhe" aria-label="Detalhes do cliente">
              <div style={{ padding: '24px', borderBottom: '1px solid var(--divisoria)' }}>
                <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
                  <span
                    className="inicial inicial--grande"
                    style={{ background: corDoCliente(selecionado.tipo) }}
                    aria-hidden="true"
                  >
                    {iniciais(selecionado.nome)}
                  </span>
                  <div style={{ minWidth: 0 }}>
                    <h2 style={{ fontSize: '21px', fontWeight: 700, lineHeight: 1.3 }}>
                      {selecionado.nome}
                    </h2>
                    <p className="texto-suave" style={{ marginTop: '4px', fontSize: '16px' }}>
                      {selecionado.tipo}
                    </p>
                  </div>
                </div>

                <dl className="dados" style={{ marginTop: '20px' }}>
                  {/* O && aqui some com a linha inteira quando não há
                      pessoa de contato, em vez de mostrar um rótulo vazio. */}
                  {selecionado.pessoaContato && (
                    <>
                      <dt>Pessoa de contato</dt>
                      <dd>{selecionado.pessoaContato}</dd>
                    </>
                  )}
                  <dt>Telefone</dt>
                  <dd>{selecionado.telefone}</dd>
                  <dt>E-mail</dt>
                  <dd>{selecionado.email}</dd>
                  <dt>Cidade</dt>
                  <dd>{selecionado.cidade}</dd>
                </dl>

                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginTop: '20px' }}>
                  <Link to="/clientes/novo" className="botao" style={{ flex: '1 1 auto' }}>
                    Editar cadastro
                  </Link>
                  <Link
                    to="/pedidos/novo"
                    className="botao botao--contorno"
                    style={{ flex: '1 1 auto' }}
                  >
                    Novo pedido
                  </Link>
                </div>
              </div>

              <div style={{ padding: '20px 24px 8px' }}>
                <h3>Histórico de pedidos</h3>
              </div>

              <ul className="lista">
                {historico.map((pedido) => (
                  <li key={pedido.id} className="lista__item">
                    <span className="lista__principal">
                      <span className="lista__titulo">{pedido.numero}</span>
                      <span className="lista__detalhe">
                        {pedido.data} · {pedido.resumo}
                      </span>
                    </span>
                    <span style={{ textAlign: 'right', flex: '0 0 auto' }}>
                      <span className="lista__titulo numero">{dinheiro(pedido.valor)}</span>
                      <span style={{ display: 'block', marginTop: '4px' }}>
                        <Etiqueta texto={pedido.situacao} />
                      </span>
                    </span>
                  </li>
                ))}
              </ul>

              <div style={{ padding: '16px 24px 24px' }}>
                <Link to="/pedidos" style={{ fontWeight: 600, textDecoration: 'none' }}>
                  Ver todos os pedidos deste cliente
                </Link>
              </div>
            </section>
          )}
        </div>
      )}
    </Layout>
  );
}
