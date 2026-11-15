// Estoque.  Rota: /estoque
// Requisitos: RF-12 (saldo por almoxarifado, disponível e reservado),
// RF-13 (consolidado), RF-14 (entrada), RF-18 (abaixo do mínimo),
// RF-19 (transferência), RF-21 (localização física).
import { useState, useEffect } from 'react';

import Layout from '../componentes/Layout.jsx';
import CabecalhoPagina from '../componentes/CabecalhoPagina.jsx';
import Campo from '../componentes/Campo.jsx';
import Etiqueta from '../componentes/Etiqueta.jsx';
import Icone from '../componentes/Icone.jsx';
import Aviso from '../componentes/Aviso.jsx';
import { api } from '../servicos/api.js';

// A situação decide a cor de fundo da linha inteira, além da etiqueta.
const CLASSE_DA_LINHA = {
  'No mínimo': 'linha--atencao',
  'Sem estoque': 'linha--perigo',
};

export default function Estoque() {
  const [linhas, setLinhas] = useState([]);
  const [carregando, setCarregando] = useState(true);

  const [busca, setBusca] = useState('');
  const [almoxarifado, setAlmoxarifado] = useState('Todos');
  const [soAbaixoDoMinimo, setSoAbaixoDoMinimo] = useState(false);

  useEffect(() => {
    api
      .listarEstoque()
      .then(setLinhas)
      .finally(() => setCarregando(false));
  }, []);

  const abaixoDoMinimo = linhas.filter((linha) => linha.situacao !== 'Disponível');

  const visiveis = linhas.filter((linha) => {
    const texto = `${linha.produto} ${linha.sku}`.toLowerCase();
    return (
      texto.includes(busca.toLowerCase()) &&
      (almoxarifado === 'Todos' || linha.almoxarifado === almoxarifado) &&
      (!soAbaixoDoMinimo || linha.situacao !== 'Disponível')
    );
  });

  return (
    <Layout>
      <CabecalhoPagina titulo="Estoque" subtitulo="Saldo por produto em cada almoxarifado">
        <button type="button" className="botao botao--grande">
          Transferir entre unidades
        </button>
        <button type="button" className="botao botao--primario">
          <Icone nome="mais" espessura={2.5} />
          Registrar entrada
        </button>
      </CabecalhoPagina>

      {/* Aviso escrito como frase, com o número dentro (RNF-08).
          Só aparece quando há algo a avisar. */}
      {abaixoDoMinimo.length > 0 && (
        <Aviso
          tom="atencao"
          icone="alerta"
          acao={
            <button
              type="button"
              className="botao botao--pequeno"
              style={{ borderColor: 'var(--amarelo-texto)', color: '#78350F' }}
              onClick={() => setSoAbaixoDoMinimo(!soAbaixoDoMinimo)}
            >
              {soAbaixoDoMinimo ? 'Ver todos' : 'Ver só esses'}
            </button>
          }
        >
          <strong>
            {abaixoDoMinimo.length} produtos estão no estoque mínimo ou abaixo dele.
          </strong>{' '}
          Eles aparecem marcados na lista.
        </Aviso>
      )}

      <section className="cartao cartao--preenchido" aria-label="Filtros">
        <div className="campos" style={{ alignItems: 'flex-end' }}>
          <Campo id="busca-prod" rotulo="Procurar produto" largura="largo">
            <input
              id="busca-prod"
              className="entrada"
              type="search"
              placeholder="Nome, modelo ou código"
              value={busca}
              onChange={(evento) => setBusca(evento.target.value)}
            />
          </Campo>

          <Campo id="almox" rotulo="Almoxarifado">
            <select
              id="almox"
              className="selecao"
              value={almoxarifado}
              onChange={(evento) => setAlmoxarifado(evento.target.value)}
            >
              <option>Todos</option>
              <option>Fábrica</option>
              <option>Loja 02</option>
              <option>Loja 28</option>
            </select>
          </Campo>

          <Campo id="cor-filtro" rotulo="Cor">
            <select id="cor-filtro" className="selecao" defaultValue="Todas">
              <option>Todas</option>
              <option>Branco</option>
              <option>Azul-marinho</option>
              <option>Verde-água</option>
            </select>
          </Campo>

          <Campo id="tam-filtro" rotulo="Tamanho" largura="estreito">
            <select id="tam-filtro" className="selecao" defaultValue="Todos">
              <option>Todos</option>
              <option>PP</option>
              <option>P</option>
              <option>M</option>
              <option>G</option>
              <option>GG</option>
              <option>XG</option>
            </select>
          </Campo>
        </div>
      </section>

      <section className="cartao" style={{ overflow: 'hidden' }}>
        {carregando ? (
          <p className="cartao__rodape" style={{ borderTop: 0 }}>
            Carregando o estoque...
          </p>
        ) : (
          <>
            <div className="rolagem">
              <table className="tabela" style={{ minWidth: '940px' }}>
                <thead>
                  <tr>
                    <th scope="col">Produto</th>
                    <th scope="col">Almoxarifado</th>
                    <th scope="col" className="alinhar-direita">
                      Disponível
                    </th>
                    <th scope="col" className="alinhar-direita">
                      Reservado
                    </th>
                    <th scope="col" className="alinhar-direita">
                      Mínimo
                    </th>
                    <th scope="col">Situação</th>
                  </tr>
                </thead>
                <tbody>
                  {visiveis.map((linha) => (
                    <tr key={linha.id} className={CLASSE_DA_LINHA[linha.situacao] ?? ''}>
                      <td>
                        <span className="destaque">{linha.produto}</span>
                        <span className="lista__detalhe">
                          {linha.sku} · {linha.local}
                        </span>
                      </td>
                      <td>{linha.almoxarifado}</td>
                      <td
                        className="alinhar-direita numero"
                        style={{ fontSize: '18px', fontWeight: 700 }}
                      >
                        {linha.disponivel}
                      </td>
                      <td className="alinhar-direita numero texto-suave">{linha.reservado}</td>
                      <td className="alinhar-direita numero texto-suave">{linha.minimo}</td>
                      <td>
                        <Etiqueta texto={linha.situacao} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="cartao__rodape">
              Mostrando {visiveis.length} de {linhas.length} produtos.{' '}
              <strong style={{ color: 'var(--texto)' }}>Reservado</strong> são peças de pedidos já
              fechados que ainda não saíram.
            </div>
          </>
        )}
      </section>
    </Layout>
  );
}
