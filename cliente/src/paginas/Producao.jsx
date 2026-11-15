// Fila de produção.  Rota: /producao
// Requisitos: RF-24 (abrir a matriz vigente), RF-28 (tarefa com responsável,
// máquina e tempo), RF-30 (fila por unidade e máquina), RF-31 (iniciar e
// concluir tarefa).
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import Layout from '../componentes/Layout.jsx';
import CabecalhoPagina from '../componentes/CabecalhoPagina.jsx';
import Campo from '../componentes/Campo.jsx';
import Etiqueta from '../componentes/Etiqueta.jsx';
import { api } from '../servicos/api.js';
import { duracao } from '../servicos/formato.js';

/**
 * Quanto a máquina está ocupada, em palavras e em cor.
 * A regra fica aqui, perto de quem usa, e não espalhada pelo JSX.
 */
function ocupacao(minutosOcupados, minutosDisponiveis) {
  const porcentagem = Math.round((minutosOcupados / minutosDisponiveis) * 100);

  if (porcentagem >= 90) return { porcentagem, rotulo: 'Lotada', cor: 'var(--vermelho)' };
  if (porcentagem >= 70) return { porcentagem, rotulo: 'Quase cheia', cor: 'var(--laranja)' };
  return { porcentagem, rotulo: 'Folgada', cor: 'var(--verde-texto)' };
}

/** O botão da tarefa muda conforme a situação dela. */
function acaoDaTarefa(situacao) {
  if (situacao === 'Pendente') return { rotulo: 'Iniciar', classe: 'botao botao--contorno' };
  if (situacao === 'Em execução') return { rotulo: 'Concluir', classe: 'botao botao--primario' };
  return { rotulo: 'Ver detalhes', classe: 'botao' };
}

export default function Producao() {
  const [dados, setDados] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [unidade, setUnidade] = useState('Todas');

  useEffect(() => {
    api
      .filaDoDia('2026-10-25')
      .then(setDados)
      .finally(() => setCarregando(false));
  }, []);

  if (carregando || !dados) {
    return (
      <Layout>
        <p className="texto-suave">Carregando a fila de produção...</p>
      </Layout>
    );
  }

  const maquinasVisiveis =
    unidade === 'Todas'
      ? dados.maquinas
      : dados.maquinas.filter((maquina) => maquina.detalhe.includes(unidade));

  const concluidas = dados.tarefas.filter((tarefa) => tarefa.situacao === 'Concluída').length;

  return (
    <Layout>
      <CabecalhoPagina titulo="Fila de produção" subtitulo="Sexta-feira, 25 de outubro de 2026" />

      <section className="cartao cartao--preenchido" aria-label="Filtros">
        <div className="campos" style={{ alignItems: 'flex-end' }}>
          <Campo id="dia" rotulo="Dia" largura="estreito">
            <input id="dia" className="entrada" type="date" defaultValue={dados.dia} />
          </Campo>
          <Campo id="unid-prod" rotulo="Unidade" largura="estreito">
            <select
              id="unid-prod"
              className="selecao"
              value={unidade}
              onChange={(evento) => setUnidade(evento.target.value)}
            >
              <option>Todas</option>
              <option>Fábrica</option>
              <option>Loja 02</option>
              <option>Loja 28</option>
            </select>
          </Campo>
          {/* O espaço vazio à direita empurra os dois campos para a esquerda. */}
          <div style={{ flex: '999 1 auto' }} />
        </div>
      </section>

      {/* --- Ocupação das máquinas --- */}
      <section className="grade-4" aria-label="Ocupação das máquinas">
        {maquinasVisiveis.map((maquina) => {
          const carga = ocupacao(maquina.minutosOcupados, maquina.minutosDisponiveis);

          return (
            <div key={maquina.id} className="cartao" style={{ padding: '18px 20px' }}>
              <div style={{ fontSize: '17px', fontWeight: 700 }}>{maquina.nome}</div>
              <div className="texto-apoio">{maquina.detalhe}</div>

              <div className="barra">
                <div
                  className="barra__preenchida"
                  style={{ width: `${carga.porcentagem}%`, background: carga.cor }}
                />
              </div>

              <div
                style={{ display: 'flex', justifyContent: 'space-between', gap: '8px', marginTop: '8px', fontSize: 'var(--texto-apoio)' }}
              >
                <span className="texto-suave">
                  {duracao(maquina.minutosOcupados)} de {duracao(maquina.minutosDisponiveis)}
                </span>
                {/* A palavra ao lado da barra existe porque a cor sozinha
                    não informa (RNF-04). */}
                <span style={{ fontWeight: 600, color: carga.cor }}>{carga.rotulo}</span>
              </div>
            </div>
          );
        })}
      </section>

      {/* --- Tarefas --- */}
      <section className="cartao" style={{ overflow: 'hidden' }}>
        <div className="cartao__cabecalho">
          <h2>Tarefas do dia</h2>
          <span className="texto-suave" style={{ fontSize: 'var(--texto-rotulo)' }}>
            {dados.tarefas.length} tarefas · {concluidas} concluídas
          </span>
        </div>

        <ul className="lista">
          {dados.tarefas.map((tarefa) => {
            const acao = acaoDaTarefa(tarefa.situacao);

            return (
              <li
                key={tarefa.id}
                className={`tarefa ${tarefa.situacao === 'Concluída' ? 'linha--calma' : ''}`}
              >
                <div className="tarefa__horario">
                  <div className="tarefa__hora">{tarefa.hora}</div>
                  <div className="texto-apoio">{tarefa.duracao}</div>
                </div>

                <div className="tarefa__descricao">
                  <div className="tarefa__titulo">{tarefa.titulo}</div>
                  <div className="texto-suave" style={{ fontSize: 'var(--texto-rotulo)', marginTop: '3px' }}>
                    {tarefa.pedido} · {tarefa.cliente}
                  </div>
                  <div className="texto-apoio" style={{ marginTop: '3px' }}>
                    {tarefa.matriz}
                  </div>
                </div>

                <div className="tarefa__maquina">
                  <div style={{ fontSize: 'var(--texto-rotulo)', fontWeight: 600 }}>
                    {tarefa.maquina}
                  </div>
                  <div className="texto-apoio">{tarefa.responsavel}</div>
                </div>

                <div className="tarefa__situacao">
                  <Etiqueta texto={tarefa.situacao} />
                </div>

                <div className="tarefa__acoes">
                  <Link to="/matrizes" className="botao botao--pequeno">
                    Abrir matriz
                  </Link>
                  <button type="button" className={`${acao.classe} botao--pequeno`}>
                    {acao.rotulo}
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      </section>
    </Layout>
  );
}
