// Cadastro de cliente.  Rota: /clientes/novo
// Requisitos: RF-03 (cadastrar, identificando pessoa física ou jurídica e o
// tipo de cliente), RF-04 (mais de um telefone por cliente).
//
// ---------------------------------------------------------------------------
// CONCEITO: lista que cresce e diminui na tela
//
// O bloco de telefones mostra como mexer numa lista guardada no estado.
// A regra de ouro: NUNCA altere o array existente (nada de push, splice,
// telefones[0] = ...). Crie um array novo. O React compara o antes e o
// depois para saber se precisa redesenhar; se você mexer no array original,
// o antes e o depois são o mesmo objeto e a tela não atualiza.
//
//   adicionar:  setTelefones([...telefones, novo])
//   remover:    setTelefones(telefones.filter(t => t.id !== id))
//   alterar um: setTelefones(telefones.map(t => t.id === id ? {...t, ...} : t))
// ---------------------------------------------------------------------------
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import Layout from '../componentes/Layout.jsx';
import Campo from '../componentes/Campo.jsx';
import Icone from '../componentes/Icone.jsx';
import { api } from '../servicos/api.js';

export default function ClienteCadastro() {
  const navegar = useNavigate();

  const [pessoa, setPessoa] = useState('fisica'); // 'fisica' | 'juridica'
  const [telefones, setTelefones] = useState([
    { id: 1, tipo: 'WhatsApp', numero: '' },
    { id: 2, tipo: 'Celular', numero: '' },
  ]);
  const [salvando, setSalvando] = useState(false);

  const ehFisica = pessoa === 'fisica';

  function adicionarTelefone() {
    // Date.now() dá um id único o bastante para uma linha nova na tela.
    // Quando o cliente for salvo, quem gera o id de verdade é o banco.
    setTelefones([...telefones, { id: Date.now(), tipo: 'Celular', numero: '' }]);
  }

  function removerTelefone(id) {
    setTelefones(telefones.filter((telefone) => telefone.id !== id));
  }

  function alterarTelefone(id, campo, valor) {
    setTelefones(
      telefones.map((telefone) =>
        telefone.id === id ? { ...telefone, [campo]: valor } : telefone,
      ),
    );
  }

  async function salvar(evento) {
    evento.preventDefault();
    setSalvando(true);

    try {
      await api.salvarCliente({ pessoa, telefones });
      navegar('/clientes');
    } finally {
      setSalvando(false);
    }
  }

  return (
    <Layout>
      <div>
        <Link to="/clientes" className="voltar">
          <Icone nome="voltar" tamanho={20} espessura={2.5} />
          Voltar para a lista de clientes
        </Link>
        <h1 style={{ marginTop: '4px' }}>Novo cliente</h1>
        <p className="cabecalho-pagina__subtitulo">
          Os campos marcados como obrigatórios precisam ser preenchidos para salvar.
        </p>
      </div>

      <form onSubmit={salvar} style={{ display: 'contents' }}>
        {/* --- 1. Tipo --- */}
        <section className="cartao cartao--preenchido">
          <h2 className="cartao__titulo">1. Tipo de cadastro</h2>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '24px', alignItems: 'flex-start' }}>
            <div style={{ flex: '1 1 320px', minWidth: '280px' }}>
              <span className="campo__rotulo" style={{ display: 'block', marginBottom: '10px' }}>
                Esta pessoa é
              </span>
              <div className="escolha" role="group" aria-label="Tipo de pessoa">
                <button
                  type="button"
                  className="escolha__botao"
                  aria-pressed={ehFisica}
                  onClick={() => setPessoa('fisica')}
                >
                  Pessoa física
                </button>
                <button
                  type="button"
                  className="escolha__botao"
                  aria-pressed={!ehFisica}
                  onClick={() => setPessoa('juridica')}
                >
                  Pessoa jurídica
                </button>
              </div>
            </div>

            <Campo
              id="tipo-cliente"
              rotulo="Tipo de cliente"
              obrigatorio
              ajuda="Define qual tabela de preço vem marcada no pedido."
            >
              <select id="tipo-cliente" className="selecao" defaultValue="Consumidor final">
                <option>Consumidor final</option>
                <option>Turma de formandos</option>
                <option>Hospital</option>
                <option>Clínica</option>
                <option>Outro</option>
              </select>
            </Campo>
          </div>
        </section>

        {/* --- 2. Identificação, muda conforme o tipo de pessoa --- */}
        <section className="cartao cartao--preenchido">
          <h2 className="cartao__titulo">2. Identificação</h2>

          {ehFisica ? (
            <div className="campos">
              <Campo id="nome-pf" rotulo="Nome completo" obrigatorio largura="largo">
                <input
                  id="nome-pf"
                  className="entrada"
                  type="text"
                  placeholder="Como está no documento"
                />
              </Campo>
              <Campo id="cpf" rotulo="CPF">
                <input
                  id="cpf"
                  className="entrada"
                  type="text"
                  inputMode="numeric"
                  placeholder="000.000.000-00"
                />
              </Campo>
              <Campo id="sexo" rotulo="Sexo" largura="estreito">
                <select id="sexo" className="selecao" defaultValue="Não informar">
                  <option>Não informar</option>
                  <option>Feminino</option>
                  <option>Masculino</option>
                  <option>Outro</option>
                </select>
              </Campo>
            </div>
          ) : (
            <div className="campos">
              <Campo id="razao" rotulo="Razão social" obrigatorio largura="largo">
                <input
                  id="razao"
                  className="entrada"
                  type="text"
                  placeholder="Como está no cartão CNPJ"
                />
              </Campo>
              <Campo id="fantasia" rotulo="Nome fantasia">
                <input
                  id="fantasia"
                  className="entrada"
                  type="text"
                  placeholder="Nome pelo qual é conhecida"
                />
              </Campo>
              <Campo id="cnpj" rotulo="CNPJ">
                <input
                  id="cnpj"
                  className="entrada"
                  type="text"
                  inputMode="numeric"
                  placeholder="00.000.000/0000-00"
                />
              </Campo>
            </div>
          )}
        </section>

        {/* --- 3. Contato --- */}
        <section className="cartao cartao--preenchido">
          <h2 style={{ marginBottom: '6px' }}>3. Contato</h2>
          <p className="texto-suave" style={{ marginBottom: '20px', fontSize: 'var(--texto-rotulo)' }}>
            Pode cadastrar mais de um telefone. O marcado como WhatsApp é o que recebe o aviso de
            pedido pronto.
          </p>

          <div className="campos" style={{ marginBottom: '20px' }}>
            <Campo id="email" rotulo="E-mail" largura="largo">
              <input id="email" className="entrada" type="email" placeholder="nome@exemplo.com" />
            </Campo>
            <Campo id="responsavel-cli" rotulo="Pessoa de contato">
              <input
                id="responsavel-cli"
                className="entrada"
                type="text"
                placeholder="Representante da turma, comprador, recepção"
              />
            </Campo>
          </div>

          <fieldset style={{ margin: 0, padding: 0, border: 0 }}>
            <legend className="campo__rotulo" style={{ padding: '0 0 10px' }}>
              Telefones <span className="campo__obrigatorio">(pelo menos um)</span>
            </legend>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {telefones.map((telefone, posicao) => (
                <div
                  key={telefone.id}
                  style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'flex-end' }}
                >
                  <Campo id={`tel-tipo-${telefone.id}`} rotulo="Tipo" largura="estreito">
                    <select
                      id={`tel-tipo-${telefone.id}`}
                      className="selecao"
                      value={telefone.tipo}
                      onChange={(evento) =>
                        alterarTelefone(telefone.id, 'tipo', evento.target.value)
                      }
                    >
                      <option>WhatsApp</option>
                      <option>Celular</option>
                      <option>Fixo</option>
                    </select>
                  </Campo>

                  <Campo id={`tel-num-${telefone.id}`} rotulo="Número" largura="largo">
                    <input
                      id={`tel-num-${telefone.id}`}
                      className="entrada"
                      type="tel"
                      placeholder="(31) 00000-0000"
                      value={telefone.numero}
                      onChange={(evento) =>
                        alterarTelefone(telefone.id, 'numero', evento.target.value)
                      }
                    />
                  </Campo>

                  <button
                    type="button"
                    className="botao botao--icone"
                    style={{ minHeight: 'var(--alvo)', minWidth: 'var(--alvo)' }}
                    aria-label={`Remover telefone ${posicao + 1}`}
                    onClick={() => removerTelefone(telefone.id)}
                  >
                    <Icone nome="lixeira" tamanho={20} />
                  </button>
                </div>
              ))}
            </div>

            <button
              type="button"
              className="botao botao--contorno"
              style={{ marginTop: '14px' }}
              onClick={adicionarTelefone}
            >
              <Icone nome="mais" tamanho={20} espessura={2.5} />
              Adicionar telefone
            </button>
          </fieldset>
        </section>

        {/* --- 4. Endereço --- */}
        <section className="cartao cartao--preenchido">
          <h2 className="cartao__titulo">4. Endereço</h2>

          <div className="campos">
            <Campo id="cep" rotulo="CEP" largura="medio">
              <div style={{ display: 'flex', gap: '10px' }}>
                <input
                  id="cep"
                  className="entrada"
                  type="text"
                  inputMode="numeric"
                  placeholder="00000-000"
                />
                <button type="button" className="botao botao--contorno" style={{ flex: '0 0 auto' }}>
                  Buscar
                </button>
              </div>
            </Campo>

            <Campo id="logradouro" rotulo="Endereço" largura="largo">
              <input
                id="logradouro"
                className="entrada"
                type="text"
                placeholder="Rua, avenida ou praça"
              />
            </Campo>

            <Campo id="numero" rotulo="Número" largura="estreito">
              <input id="numero" className="entrada" type="text" placeholder="123" />
            </Campo>
          </div>

          <div className="campos" style={{ marginTop: '18px' }}>
            <Campo id="complemento" rotulo="Complemento">
              <input
                id="complemento"
                className="entrada"
                type="text"
                placeholder="Sala, bloco, apartamento"
              />
            </Campo>
            <Campo id="bairro" rotulo="Bairro">
              <input id="bairro" className="entrada" type="text" />
            </Campo>
            <Campo id="municipio" rotulo="Município">
              <select id="municipio" className="selecao" defaultValue="Belo Horizonte">
                <option>Belo Horizonte</option>
                <option>Contagem</option>
                <option>Betim</option>
                <option>Nova Lima</option>
              </select>
            </Campo>
            <Campo id="uf" rotulo="Estado" largura="estreito">
              <select id="uf" className="selecao" defaultValue="MG">
                <option>MG</option>
                <option>SP</option>
                <option>RJ</option>
                <option>ES</option>
              </select>
            </Campo>
          </div>
        </section>

        {/* --- 5. Situação --- */}
        <section className="cartao cartao--preenchido">
          <h2 style={{ marginBottom: '16px' }}>5. Situação e observações</h2>

          <label className="marcador" htmlFor="ativo">
            <input id="ativo" type="checkbox" defaultChecked />
            <span>Cliente ativo, pode abrir novos pedidos</span>
          </label>

          <div className="campo" style={{ marginTop: '14px' }}>
            <label className="campo__rotulo" htmlFor="obs-cli">
              Observações
            </label>
            <textarea
              id="obs-cli"
              className="area-texto"
              rows={3}
              placeholder="Preferências, combinados de entrega, qualquer coisa que a equipe precise saber"
            />
          </div>
        </section>

        {/* --- Ações --- */}
        <div className="cartao acoes">
          <Link to="/clientes" className="botao botao--grande">
            Cancelar
          </Link>
          <button type="submit" className="botao botao--primario" disabled={salvando}>
            {salvando ? 'Salvando...' : 'Salvar cliente'}
          </button>
        </div>
      </form>
    </Layout>
  );
}
