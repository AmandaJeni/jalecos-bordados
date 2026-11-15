// Funcionários.  Rota: /funcionarios
// Requisitos: RF-02 (área restrita a administrador), RF-05 (consultar e
// inativar funcionário), RF-66 (criar acesso depois), RF-69 (filtrar por
// setor, unidade e situação), RF-70 (inativar preservando o histórico).
//
// Área restrita: quando houver login de verdade, esta tela precisa checar a
// permissão antes de desenhar. Hoje o aviso azul só explica a regra.
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import Layout from '../componentes/Layout.jsx';
import CabecalhoPagina from '../componentes/CabecalhoPagina.jsx';
import Campo from '../componentes/Campo.jsx';
import Etiqueta from '../componentes/Etiqueta.jsx';
import Icone from '../componentes/Icone.jsx';
import Aviso from '../componentes/Aviso.jsx';
import { api } from '../servicos/api.js';

export default function Funcionarios() {
  const [funcionarios, setFuncionarios] = useState([]);
  const [carregando, setCarregando] = useState(true);

  const [busca, setBusca] = useState('');
  const [setor, setSetor] = useState('Todos');
  const [unidade, setUnidade] = useState('Todas');
  const [situacao, setSituacao] = useState('Somente ativos');

  useEffect(() => {
    api
      .listarFuncionarios()
      .then(setFuncionarios)
      .finally(() => setCarregando(false));
  }, []);

  const visiveis = funcionarios.filter((funcionario) => {
    const texto = `${funcionario.nome} ${funcionario.matricula}`.toLowerCase();
    const combinaSituacao =
      situacao === 'Todos' ||
      (situacao === 'Somente ativos' && funcionario.ativo) ||
      (situacao === 'Somente inativos' && !funcionario.ativo);

    return (
      texto.includes(busca.toLowerCase()) &&
      (setor === 'Todos' || funcionario.setor === setor) &&
      (unidade === 'Todas' || funcionario.unidade === unidade) &&
      combinaSituacao
    );
  });

  return (
    <Layout>
      <CabecalhoPagina
        titulo="Funcionários"
        subtitulo={`${funcionarios.length} cadastrados nas três unidades`}
      >
        <Link to="/funcionarios/novo" className="botao botao--primario">
          <Icone nome="mais" espessura={2.5} />
          Novo funcionário
        </Link>
      </CabecalhoPagina>

      <Aviso tom="info" icone="cadeado">
        <strong>Área restrita.</strong> Só quem tem permissão de administrador enxerga esta tela e
        pode criar ou alterar funcionários.
      </Aviso>

      <section className="cartao cartao--preenchido" aria-label="Filtros">
        <div className="campos" style={{ alignItems: 'flex-end' }}>
          <Campo id="busca-func" rotulo="Procurar funcionário" largura="largo">
            <input
              id="busca-func"
              className="entrada"
              type="search"
              placeholder="Nome, matrícula ou CPF"
              value={busca}
              onChange={(evento) => setBusca(evento.target.value)}
            />
          </Campo>

          <Campo id="setor-filtro" rotulo="Setor">
            <select
              id="setor-filtro"
              className="selecao"
              value={setor}
              onChange={(evento) => setSetor(evento.target.value)}
            >
              <option>Todos</option>
              <option>Administrativo</option>
              <option>Vendas</option>
              <option>Costura</option>
              <option>Bordado</option>
              <option>Financeiro</option>
            </select>
          </Campo>

          <Campo id="unid-func" rotulo="Unidade">
            <select
              id="unid-func"
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

          <Campo id="sit-func" rotulo="Situação">
            <select
              id="sit-func"
              className="selecao"
              value={situacao}
              onChange={(evento) => setSituacao(evento.target.value)}
            >
              <option>Somente ativos</option>
              <option>Todos</option>
              <option>Somente inativos</option>
            </select>
          </Campo>
        </div>
      </section>

      <section className="cartao" style={{ overflow: 'hidden' }}>
        {carregando ? (
          <p className="cartao__rodape" style={{ borderTop: 0 }}>
            Carregando funcionários...
          </p>
        ) : (
          <>
            <div className="rolagem">
              <table className="tabela" style={{ minWidth: '900px' }}>
                <thead>
                  <tr>
                    <th scope="col">Funcionário</th>
                    <th scope="col">Setor</th>
                    <th scope="col">Unidade</th>
                    <th scope="col">Acesso ao sistema</th>
                    <th scope="col" className="alinhar-direita">
                      Ação
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {visiveis.map((funcionario) => (
                    <tr key={funcionario.matricula}>
                      <td>
                        <span className="destaque">{funcionario.nome}</span>
                        <span className="lista__detalhe">Matrícula {funcionario.matricula}</span>
                      </td>
                      <td>{funcionario.setor}</td>
                      <td>{funcionario.unidade}</td>
                      <td>
                        <Etiqueta texto={funcionario.acesso} />
                      </td>
                      <td className="alinhar-direita">
                        <Link to="/funcionarios/novo" className="botao botao--pequeno">
                          Editar
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="cartao__rodape">
              Quem não tem acesso ao sistema aparece no cadastro, mas não consegue entrar. Útil
              para quem só é registrado em tarefa de produção.
            </div>
          </>
        )}
      </section>
    </Layout>
  );
}
