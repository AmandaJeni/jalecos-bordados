// Pedido: abrir, editar e fechar.  Rota: /pedidos/novo
// Requisitos: RF-25, RF-26 (bordado do item), RF-34 a RF-47 (pedido, itens,
// preço, pagamento, estorno, cancelamento, importar lista de nomes).
//
// DECISÃO DA REUNIÃO DE 6 DE NOVEMBRO
// ------------------------------------
// O protótipo tinha um seletor "Orçamento / Pedido" no topo. Ele saiu.
// Agora o registro nasce EM ABERTO e é fechado quando o cliente confirma:
//
//   Em aberto  faz o papel do antigo orçamento. Não reserva peça no estoque.
//              Tem data de validade.
//   Fechado    o backend valida e reserva o estoque. Exige pagamento
//              confirmado para entrar na fila de produção (RF-43).
//
// Estornar o pagamento devolve o pedido para em aberto e solta as peças.
//
// O total é calculado aqui, a partir dos itens, e nunca vem pronto do
// servidor: se o preço de um item mudar, a soma acompanha sozinha.
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import Layout from '../componentes/Layout.jsx';
import Campo from '../componentes/Campo.jsx';
import Etiqueta from '../componentes/Etiqueta.jsx';
import Icone from '../componentes/Icone.jsx';
import Aviso from '../componentes/Aviso.jsx';
import { api } from '../servicos/api.js';
import { dinheiro } from '../servicos/formato.js';

export default function PedidoNovo() {
  const [pedido, setPedido] = useState(null);
  const [estado, setEstado] = useState('Em aberto');
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    api
      .buscarPedido(423)
      .then((dados) => {
        setPedido(dados);
        setEstado(dados.estado);
      })
      .finally(() => setCarregando(false));
  }, []);

  if (carregando) {
    return (
      <Layout>
        <p className="texto-suave">Carregando o pedido...</p>
      </Layout>
    );
  }

  const emAberto = estado === 'Em aberto';

  // Contas derivadas dos itens. reduce percorre a lista somando.
  const subtotal = pedido.itens.reduce(
    (soma, item) => soma + item.quantidade * item.unitario,
    0,
  );
  const total = subtotal - (pedido.desconto ?? 0);

  /** Remove um item da lista. Nunca mexa no array original: crie um novo. */
  function removerItem(id) {
    setPedido({ ...pedido, itens: pedido.itens.filter((item) => item.id !== id) });
  }

  return (
    <Layout>
      <div>
        <Link to="/pedidos" className="voltar">
          <Icone nome="voltar" tamanho={20} espessura={2.5} />
          Voltar para a lista
        </Link>
        <h1 style={{ marginTop: '4px' }}>Pedido {pedido.numero}</h1>
      </div>

      {/* --- Estado do pedido --- */}
      <section className="cartao cartao--preenchido" aria-label="Estado do pedido">
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', alignItems: 'center' }}>
          <span className="campo__rotulo">Este pedido está:</span>

          <div className="escolha" role="group" aria-label="Estado do pedido">
            <button
              type="button"
              className="escolha__botao"
              aria-pressed={emAberto}
              onClick={() => setEstado('Em aberto')}
            >
              Em aberto
            </button>
            <button
              type="button"
              className="escolha__botao"
              aria-pressed={!emAberto}
              onClick={() => setEstado('Fechado')}
            >
              Fechado
            </button>
          </div>

          <p className="texto-apoio" style={{ flex: '1 1 280px', minWidth: '240px' }}>
            {emAberto
              ? 'Em aberto o pedido vale como orçamento: dá para alterar à vontade e nenhuma peça fica reservada no estoque.'
              : 'Fechado o sistema reserva as peças e o pedido só entra na fila de produção com pagamento confirmado.'}
          </p>
        </div>
      </section>

      {/* --- 1. Cliente --- */}
      <section className="cartao cartao--preenchido">
        <h2 className="cartao__titulo">1. Cliente</h2>
        <div className="campos">
          <Campo id="cliente" rotulo="Nome do cliente" largura="largo" ajuda={pedido.contato}>
            <input id="cliente" className="entrada" type="text" defaultValue={pedido.cliente} />
          </Campo>

          <Campo id="origem-ped" rotulo="Origem">
            <select id="origem-ped" className="selecao" defaultValue={pedido.origem}>
              <option>Loja</option>
              <option>Site</option>
              <option>WhatsApp</option>
            </select>
          </Campo>

          <Campo
            id="tabela"
            rotulo="Tabela de preço"
            ajuda="Fica gravada no pedido, para reajuste futuro não mexer nele."
          >
            <select id="tabela" className="selecao" defaultValue={pedido.tabelaPreco}>
              <option>Atacado 2026</option>
              <option>Varejo 2026</option>
            </select>
          </Campo>
        </div>
      </section>

      {/* --- 2. Itens --- */}
      <section className="cartao">
        <div className="cartao__cabecalho">
          <h2>2. Itens</h2>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <button type="button" className="botao">
              <Icone nome="enviar" tamanho={20} />
              Importar lista de nomes
            </button>
            <button type="button" className="botao botao--contorno">
              <Icone nome="mais" tamanho={20} espessura={2.5} />
              Adicionar item
            </button>
          </div>
        </div>

        <div className="rolagem">
          <table className="tabela" style={{ minWidth: '860px' }}>
            <thead>
              <tr>
                <th scope="col">Produto</th>
                <th scope="col">Personalização</th>
                <th scope="col" className="alinhar-centro">
                  Qtd
                </th>
                <th scope="col" className="alinhar-direita">
                  Unitário
                </th>
                <th scope="col" className="alinhar-direita">
                  Total
                </th>
                <th scope="col" className="alinhar-direita">
                  Ação
                </th>
              </tr>
            </thead>
            <tbody>
              {pedido.itens.map((item) => (
                <tr key={item.id}>
                  <td>
                    <span className="destaque">{item.produto}</span>
                    <span className="lista__detalhe">{item.sku}</span>
                  </td>
                  <td>
                    <span>{item.bordado}</span>
                    <span className="lista__detalhe">{item.detalheBordado}</span>
                  </td>
                  <td className="alinhar-centro numero">{item.quantidade}</td>
                  <td className="alinhar-direita numero">{dinheiro(item.unitario)}</td>
                  <td className="alinhar-direita numero destaque">
                    {dinheiro(item.quantidade * item.unitario)}
                  </td>
                  <td className="alinhar-direita">
                    {/* Botão só com ícone precisa de aria-label, senão quem
                        usa leitor de tela ouve só "botão". */}
                    <button
                      type="button"
                      className="botao botao--icone"
                      aria-label={`Remover ${item.produto}`}
                      onClick={() => removerItem(item.id)}
                    >
                      <Icone nome="lixeira" tamanho={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '20px 24px', borderTop: '1px solid var(--divisoria)' }}>
          <dl className="totais">
            <dt>Subtotal</dt>
            <dd className="numero">{dinheiro(subtotal)}</dd>
            <dt>Desconto</dt>
            <dd className="numero">{dinheiro(pedido.desconto)}</dd>
            <dt className="totais__linha-final">Total</dt>
            <dd className="totais__linha-final numero">{dinheiro(total)}</dd>
          </dl>
        </div>
      </section>

      {/* --- 3. Validade, só enquanto está em aberto --- */}
      {emAberto && (
        <section className="cartao cartao--preenchido">
          <h2 className="cartao__titulo">3. Validade da proposta</h2>
          <div className="campos" style={{ alignItems: 'flex-end' }}>
            <Campo id="validade" rotulo="Válida até">
              <input
                id="validade"
                className="entrada"
                type="date"
                defaultValue={pedido.validoAte}
              />
            </Campo>
            <p className="texto-apoio" style={{ flex: '999 1 320px', minWidth: '260px' }}>
              Passada essa data sem o cliente confirmar, o sistema marca o pedido como{' '}
              <strong style={{ color: 'var(--texto)' }}>Expirado</strong> sozinho.
            </p>
          </div>
        </section>
      )}

      {/* --- 3. Pagamento, só depois de fechado --- */}
      {!emAberto && (
        <section className="cartao cartao--preenchido">
          <h2 style={{ marginBottom: '6px' }}>3. Pagamento</h2>
          <p className="texto-suave" style={{ marginBottom: '20px', fontSize: 'var(--texto-rotulo)' }}>
            O pedido só entra na fila de produção depois que houver pagamento confirmado.
          </p>

          <div className="rolagem" style={{ marginBottom: '18px' }}>
            <table className="tabela" style={{ minWidth: '620px' }}>
              <thead>
                <tr>
                  <th scope="col">Tipo</th>
                  <th scope="col">Forma</th>
                  <th scope="col" className="alinhar-direita">
                    Valor
                  </th>
                  <th scope="col">Situação</th>
                </tr>
              </thead>
              <tbody>
                {pedido.pagamentos.map((pagamento) => (
                  <tr key={pagamento.id}>
                    <td className="destaque">{pagamento.tipo}</td>
                    <td>{pagamento.forma}</td>
                    <td className="alinhar-direita numero">{dinheiro(pagamento.valor)}</td>
                    <td>
                      <Etiqueta texto={pagamento.situacao} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <button type="button" className="botao botao--contorno">
              Lançar pagamento
            </button>
            <button type="button" className="botao botao--perigo">
              Estornar pagamento
            </button>
          </div>

          <div style={{ marginTop: '18px' }}>
            <Aviso tom="atencao" icone="alerta">
              O estorno devolve as peças ao estoque e volta o pedido para{' '}
              <strong>em aberto</strong>. O sistema pede confirmação antes de concluir.
            </Aviso>
          </div>
        </section>
      )}

      {/* --- Ações --- */}
      <div className="cartao acoes acoes--separadas">
        {/* A ação destrutiva fica longe das outras, do lado oposto (RNF-06). */}
        <button type="button" className="botao botao--perigo botao--grande">
          Cancelar pedido
        </button>

        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <Link to="/pedidos" className="botao botao--grande">
            Salvar e sair
          </Link>
          <button type="button" className="botao botao--primario">
            {emAberto ? 'Fechar pedido e reservar estoque' : 'Enviar para produção'}
          </button>
        </div>
      </div>
    </Layout>
  );
}
