// Matrizes de bordado.  Rota: /matrizes
// Requisitos: RF-22 (cadastrar matriz), RF-23 (controlar versão, uma vigente),
// RF-24 (consultar e baixar a vigente de qualquer unidade).
//
// Esta tela resolve um problema real da empresa: hoje a matriz circula por
// e-mail e cada um dos nove computadores baixa a sua, então ninguém sabe qual
// é a versão certa. Aqui existe um lugar só, com a vigente marcada.
import { useState, useEffect } from 'react';

import Layout from '../componentes/Layout.jsx';
import CabecalhoPagina from '../componentes/CabecalhoPagina.jsx';
import Campo from '../componentes/Campo.jsx';
import Etiqueta from '../componentes/Etiqueta.jsx';
import Icone from '../componentes/Icone.jsx';
import Aviso from '../componentes/Aviso.jsx';
import { api } from '../servicos/api.js';
import { milhar } from '../servicos/formato.js';

const TOM_DA_SITUACAO = {
  vigente: 'verde',
  'em revisão': 'amarelo',
  arquivada: 'cinza',
};

export default function Matrizes() {
  const [matrizes, setMatrizes] = useState([]);
  const [carregando, setCarregando] = useState(true);

  const [busca, setBusca] = useState('');
  const [formato, setFormato] = useState('Todos');
  const [desenvolvedor, setDesenvolvedor] = useState('Todos');

  useEffect(() => {
    api
      .listarMatrizes()
      .then(setMatrizes)
      .finally(() => setCarregando(false));
  }, []);

  const visiveis = matrizes.filter((matriz) => {
    const combinaFormato =
      formato === 'Todos' || matriz.arquivo.toLowerCase().endsWith(formato.toLowerCase());

    return (
      matriz.nome.toLowerCase().includes(busca.toLowerCase()) &&
      combinaFormato &&
      (desenvolvedor === 'Todos' || matriz.desenvolvedor === desenvolvedor)
    );
  });

  return (
    <Layout>
      <CabecalhoPagina
        titulo="Matrizes de bordado"
        subtitulo="Um lugar só, com a versão certa marcada. Vale para as três unidades."
      >
        <button type="button" className="botao botao--primario">
          <Icone nome="enviar" />
          Enviar nova matriz
        </button>
      </CabecalhoPagina>

      <section className="cartao cartao--preenchido" aria-label="Filtros">
        <div className="campos" style={{ alignItems: 'flex-end' }}>
          <Campo id="busca-matriz" rotulo="Procurar matriz" largura="largo">
            <input
              id="busca-matriz"
              className="entrada"
              type="search"
              placeholder="Nome da matriz, turma ou instituição"
              value={busca}
              onChange={(evento) => setBusca(evento.target.value)}
            />
          </Campo>

          <Campo id="formato" rotulo="Formato do arquivo">
            <select
              id="formato"
              className="selecao"
              value={formato}
              onChange={(evento) => setFormato(evento.target.value)}
            >
              <option>Todos</option>
              <option value=".dst">.DST (Tajima)</option>
              <option value=".emb">.EMB (Barudan)</option>
            </select>
          </Campo>

          <Campo id="desenv" rotulo="Desenvolvedor">
            <select
              id="desenv"
              className="selecao"
              value={desenvolvedor}
              onChange={(evento) => setDesenvolvedor(evento.target.value)}
            >
              <option>Todos</option>
              <option>Equipe interna</option>
              <option>Terceirizado</option>
            </select>
          </Campo>
        </div>
      </section>

      {carregando ? (
        <p className="texto-suave">Carregando as matrizes...</p>
      ) : (
        <section className="grade-3" aria-label="Lista de matrizes">
          {visiveis.map((matriz) => (
            <article key={matriz.id} className="cartao matriz">
              <div className="matriz__previa">
                <Icone nome="imagem" tamanho={40} cor="#8A97A6" espessura={1.5} />
                <span>[PRÉVIA DA MATRIZ]</span>
              </div>

              <div className="matriz__corpo">
                <div className="matriz__topo">
                  <h2 style={{ fontSize: '18px', lineHeight: 1.35 }}>{matriz.nome}</h2>
                  <Etiqueta
                    texto={`Versão ${matriz.versao} · ${matriz.situacao}`}
                    tom={TOM_DA_SITUACAO[matriz.situacao]}
                  />
                </div>

                <dl className="dados" style={{ gap: '4px 12px', fontSize: 'var(--texto-apoio)' }}>
                  <dt>Arquivo</dt>
                  <dd>{matriz.arquivo}</dd>
                  <dt>Pontos</dt>
                  <dd className="numero">{milhar(matriz.pontos)}</dd>
                  <dt>Feita por</dt>
                  <dd>{matriz.desenvolvedor}</dd>
                </dl>

                <div className="matriz__acoes">
                  <button
                    type="button"
                    className="botao botao--contorno botao--pequeno"
                    style={{ flex: '1 1 auto', background: 'var(--azul)', color: 'var(--branco)' }}
                  >
                    Baixar arquivo
                  </button>
                  <button type="button" className="botao botao--pequeno" style={{ flex: '1 1 auto' }}>
                    Ver versões
                  </button>
                </div>
              </div>
            </article>
          ))}
        </section>
      )}

      <Aviso tom="info">
        Ao enviar uma matriz corrigida, a versão anterior fica guardada no histórico e deixa de
        ser a vigente. As máquinas das três unidades passam a usar a nova sem ninguém precisar
        reenviar nada por e-mail.
      </Aviso>
    </Layout>
  );
}
