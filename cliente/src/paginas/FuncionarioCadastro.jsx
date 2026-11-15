// Cadastro de funcionário.  Rota: /funcionarios/novo
// Requisitos: RF-05 (cadastrar com setor e unidade), RF-06 (criar acesso),
// RF-64 (matrícula gerada pelo sistema), RF-65 (funcionário sem acesso),
// RF-67 (conceder e revogar permissões), RF-70 (inativar sem perder histórico).
//
// DECISÃO DA REUNIÃO DE 6 DE NOVEMBRO
// ------------------------------------
// O RF-67 era um liga e desliga de "é administrador". Virou uma lista de
// permissões soltas, para o super administrador liberar só o que cada pessoa
// precisa (ajuste de saldo, criar funcionário, estornar pagamento...).
// A reunião marcou este ponto como PRECISA DE MAIS CONVERSA: depende de
// validar com as proprietárias. A lista está em src/dados/funcionarios.js.
//
// O que NÃO entrou: troca de senha no primeiro acesso. O grupo decidiu que
// quem troca senha é o administrador, então o antigo RF-68 caiu.
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import Layout from '../componentes/Layout.jsx';
import Campo from '../componentes/Campo.jsx';
import Icone from '../componentes/Icone.jsx';
import { api } from '../servicos/api.js';
import { permissoes } from '../dados/funcionarios.js';

export default function FuncionarioCadastro() {
  const navegar = useNavigate();

  const [temAcesso, setTemAcesso] = useState(true);
  // Um Set guarda as permissões marcadas. Poderia ser array; Set evita
  // repetido e deixa o "tem ou não tem" mais direto.
  const [concedidas, setConcedidas] = useState(new Set());
  const [salvando, setSalvando] = useState(false);

  function alternarPermissao(chave) {
    const novo = new Set(concedidas); // cópia, nunca o original
    if (novo.has(chave)) {
      novo.delete(chave);
    } else {
      novo.add(chave);
    }
    setConcedidas(novo);
  }

  async function salvar(evento) {
    evento.preventDefault();
    setSalvando(true);

    try {
      await api.salvarFuncionario({ temAcesso, permissoes: [...concedidas] });
      navegar('/funcionarios');
    } finally {
      setSalvando(false);
    }
  }

  return (
    <Layout>
      <div>
        <Link to="/funcionarios" className="voltar">
          <Icone nome="voltar" tamanho={20} espessura={2.5} />
          Voltar para a lista de funcionários
        </Link>
        <h1 style={{ marginTop: '4px' }}>Novo funcionário</h1>
        <p className="cabecalho-pagina__subtitulo">
          Só o perfil administrador consegue abrir esta tela.
        </p>
      </div>

      <form onSubmit={salvar} style={{ display: 'contents' }}>
        {/* --- 1. Dados pessoais --- */}
        <section className="cartao cartao--preenchido">
          <h2 className="cartao__titulo">1. Dados pessoais</h2>

          <div className="campos">
            <Campo id="nome-func" rotulo="Nome completo" obrigatorio largura="largo">
              <input id="nome-func" className="entrada" type="text" />
            </Campo>
            <Campo id="cpf-func" rotulo="CPF" obrigatorio>
              <input
                id="cpf-func"
                className="entrada"
                type="text"
                inputMode="numeric"
                placeholder="000.000.000-00"
              />
            </Campo>
            <Campo id="rg-func" rotulo="RG" largura="estreito">
              <input id="rg-func" className="entrada" type="text" />
            </Campo>
          </div>

          <div className="campos" style={{ marginTop: '18px' }}>
            <Campo id="nasc-func" rotulo="Data de nascimento">
              <input id="nasc-func" className="entrada" type="date" />
            </Campo>
            <Campo id="email-func" rotulo="E-mail" largura="largo">
              <input
                id="email-func"
                className="entrada"
                type="email"
                placeholder="nome@exemplo.com"
              />
            </Campo>
            <Campo id="tel-func" rotulo="Telefone">
              <input
                id="tel-func"
                className="entrada"
                type="tel"
                placeholder="(31) 00000-0000"
              />
            </Campo>
          </div>
        </section>

        {/* --- 2. Lotação --- */}
        <section className="cartao cartao--preenchido">
          <h2 className="cartao__titulo">2. Lotação</h2>

          <div className="campos">
            <Campo
              id="setor-func"
              rotulo="Setor"
              obrigatorio
              ajuda="Só quem é de Costura ou Bordado pode receber tarefa de produção."
            >
              <select id="setor-func" className="selecao" defaultValue="Vendas">
                <option>Administrativo</option>
                <option>Vendas</option>
                <option>Costura</option>
                <option>Bordado</option>
                <option>Financeiro</option>
              </select>
            </Campo>

            <Campo id="unidade-func" rotulo="Unidade" obrigatorio>
              <select id="unidade-func" className="selecao" defaultValue="Loja 02">
                <option>Loja 02</option>
                <option>Loja 28</option>
                <option>Fábrica</option>
              </select>
            </Campo>

            <Campo id="admissao" rotulo="Data de admissão">
              <input id="admissao" className="entrada" type="date" />
            </Campo>

            <Campo
              id="matricula"
              rotulo="Matrícula"
              largura="estreito"
              ajuda="Gerada pelo sistema."
            >
              {/* readOnly porque quem gera é o sistema (RF-64). */}
              <input id="matricula" className="entrada" type="text" value="1027" readOnly />
            </Campo>
          </div>
        </section>

        {/* --- 3. Acesso --- */}
        <section className="cartao cartao--preenchido">
          <h2 style={{ marginBottom: '6px' }}>3. Acesso ao sistema</h2>
          <p className="texto-suave" style={{ marginBottom: '18px', fontSize: 'var(--texto-rotulo)' }}>
            Nem todo funcionário precisa entrar no sistema. Quem só aparece em tarefa de produção
            pode ficar sem acesso.
          </p>

          <div className="escolha" role="group" aria-label="Criar acesso" style={{ marginBottom: '20px' }}>
            <button
              type="button"
              className="escolha__botao"
              aria-pressed={temAcesso}
              onClick={() => setTemAcesso(true)}
            >
              Criar acesso
            </button>
            <button
              type="button"
              className="escolha__botao"
              aria-pressed={!temAcesso}
              onClick={() => setTemAcesso(false)}
            >
              Sem acesso
            </button>
          </div>

          {temAcesso ? (
            <div>
              <div className="campos">
                <Campo id="login-func" rotulo="Login" obrigatorio>
                  <input
                    id="login-func"
                    className="entrada"
                    type="text"
                    placeholder="nome.sobrenome"
                  />
                </Campo>
                <Campo id="senha-func" rotulo="Senha provisória" obrigatorio>
                  <input
                    id="senha-func"
                    className="entrada"
                    type="password"
                    placeholder="Mínimo de 8 caracteres"
                  />
                </Campo>
                <Campo id="senha2-func" rotulo="Repetir a senha">
                  <input id="senha2-func" className="entrada" type="password" />
                </Campo>
              </div>

              {/* --- Permissões, uma a uma (RF-67 novo) --- */}
              <div className="aviso aviso--destaque" style={{ marginTop: '20px', flexDirection: 'column', alignItems: 'stretch' }}>
                <div>
                  <strong style={{ fontSize: 'var(--texto-corpo)' }}>
                    Permissões de administrador
                  </strong>
                  <p style={{ fontSize: 'var(--texto-rotulo)', marginTop: '4px', lineHeight: 1.5 }}>
                    Marque só o que esta pessoa realmente precisa. Cada permissão libera uma
                    função que mexe em dado de outras pessoas.
                  </p>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginTop: '14px' }}>
                  {permissoes.map((permissao) => (
                    <label key={permissao.chave} className="marcador" htmlFor={permissao.chave}>
                      <input
                        id={permissao.chave}
                        type="checkbox"
                        checked={concedidas.has(permissao.chave)}
                        onChange={() => alternarPermissao(permissao.chave)}
                        style={{ accentColor: '#5B21B6' }}
                      />
                      <span>
                        <span style={{ display: 'block', fontWeight: 600 }}>
                          {permissao.rotulo}
                        </span>
                        <span
                          style={{ display: 'block', fontSize: 'var(--texto-apoio)', marginTop: '2px' }}
                        >
                          {permissao.explicacao}
                        </span>
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <p
              style={{ padding: '18px 20px', borderRadius: 'var(--canto-cartao)', background: 'var(--fundo)', fontSize: 'var(--texto-rotulo)', color: 'var(--texto-suave)', lineHeight: 1.55 }}
            >
              Esta pessoa ficará no cadastro e poderá ser atribuída a tarefas de produção, mas não
              vai conseguir entrar no sistema. Dá para criar o acesso depois, a qualquer momento.
            </p>
          )}
        </section>

        {/* --- 4. Situação --- */}
        <section className="cartao cartao--preenchido">
          <h2 style={{ marginBottom: '16px' }}>4. Situação</h2>

          <label className="marcador" htmlFor="ativo-func">
            <input id="ativo-func" type="checkbox" defaultChecked />
            <span>Funcionário ativo</span>
          </label>

          <p className="texto-suave" style={{ marginTop: '8px', fontSize: 'var(--texto-rotulo)', lineHeight: 1.55 }}>
            Ao desmarcar, a pessoa deixa de aparecer para receber tarefa e perde o acesso, mas o
            histórico de vendas e de tarefas dela continua guardado.
          </p>
        </section>

        <div className="cartao acoes">
          <Link to="/funcionarios" className="botao botao--grande">
            Cancelar
          </Link>
          <button type="submit" className="botao botao--primario" disabled={salvando}>
            {salvando ? 'Salvando...' : 'Salvar funcionário'}
          </button>
        </div>
      </form>
    </Layout>
  );
}
