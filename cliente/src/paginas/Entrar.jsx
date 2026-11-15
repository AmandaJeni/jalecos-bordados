// Tela de acesso ao sistema.  Rota: /entrar
// Requisitos: RF-01 (autenticar com login e senha), RF-71 (informar a unidade).
//
// Esta é a única tela sem o menu lateral, porque quem está aqui ainda não
// entrou. Por isso ela não usa o componente Layout.
//
// ---------------------------------------------------------------------------
// CONCEITO: campo controlado
//
// Repare no par  value={login}  onChange={...}  de cada campo. Em React o
// valor do campo é o estado, não o que está na tela. A pessoa digita, o
// onChange guarda no estado, o React redesenha o campo com o valor novo.
// Parece volta desnecessária, mas é o que permite validar, limpar e
// preencher o formulário por código depois.
// ---------------------------------------------------------------------------
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Icone from '../componentes/Icone.jsx';
import { api } from '../servicos/api.js';

export default function Entrar() {
  // useNavigate dá uma função para trocar de tela por código,
  // em vez de a pessoa clicar num link.
  const navegar = useNavigate();

  const [login, setLogin] = useState('');
  const [senha, setSenha] = useState('');
  const [unidade, setUnidade] = useState('Loja 02');
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [entrando, setEntrando] = useState(false);
  const [erro, setErro] = useState('');

  async function aoEnviar(evento) {
    // Sem isto o navegador recarrega a página inteira ao enviar o formulário,
    // que é o comportamento de 1995 e derruba todo o estado do React.
    evento.preventDefault();

    setErro('');
    setEntrando(true);

    try {
      await api.entrar(login, senha, unidade);
      navegar('/'); // deu certo: vai para o painel
    } catch {
      // Mensagem escrita como frase, não como código de erro (RNF-08).
      setErro('Não consegui entrar. Confira o login e a senha e tente de novo.');
    } finally {
      setEntrando(false);
    }
  }

  return (
    <div className="entrar">
      {/* Lado azul, só apresentação */}
      <div className="entrar__marca">
        <div className="entrar__titulo">
          Jalecos
          <br />
          Bordados
        </div>
        <p className="entrar__frase">
          Pedidos, estoque e bordados das três unidades em um só lugar.
        </p>
      </div>

      {/* Lado do formulário */}
      <div className="entrar__area">
        <div className="entrar__caixa">
          <h1 style={{ fontSize: '28px' }}>Entrar no sistema</h1>
          <p className="entrar__ajuda">Use o login que a administração cadastrou para você.</p>

          <form className="entrar__form" onSubmit={aoEnviar}>
            <div className="campo">
              <label className="campo__rotulo" htmlFor="login">
                Login
              </label>
              <input
                id="login"
                className="entrada"
                type="text"
                autoComplete="username"
                placeholder="Digite o seu nome de usuário"
                value={login}
                onChange={(evento) => setLogin(evento.target.value)}
              />
            </div>

            <div className="campo">
              <label className="campo__rotulo" htmlFor="senha">
                Senha
              </label>
              <input
                id="senha"
                className="entrada"
                // O tipo do campo muda conforme o estado: é o que faz a
                // caixinha "mostrar a senha" funcionar.
                type={mostrarSenha ? 'text' : 'password'}
                autoComplete="current-password"
                placeholder="Digite sua senha"
                value={senha}
                onChange={(evento) => setSenha(evento.target.value)}
              />
              <label className="marcador" htmlFor="ver-senha">
                <input
                  id="ver-senha"
                  type="checkbox"
                  checked={mostrarSenha}
                  onChange={(evento) => setMostrarSenha(evento.target.checked)}
                />
                <span className="texto-suave">Mostrar a senha enquanto digito</span>
              </label>
            </div>

            <div className="campo">
              <label className="campo__rotulo" htmlFor="unidade">
                Unidade em que você está
              </label>
              <select
                id="unidade"
                className="selecao"
                value={unidade}
                onChange={(evento) => setUnidade(evento.target.value)}
              >
                <option>Loja 02</option>
                <option>Loja 28</option>
                <option>Fábrica</option>
              </select>
            </div>

            {/* Só aparece quando existe erro. */}
            {erro && (
              <p className="entrar__erro" role="alert">
                {erro}
              </p>
            )}

            <button type="submit" className="botao botao--primario" disabled={entrando}>
              {entrando ? 'Entrando...' : 'Entrar'}
            </button>

            <a href="#ajuda" className="entrar__esqueci">
              Esqueci minha senha
            </a>
          </form>

          <div className="entrar__rodape" id="ajuda">
            <Icone nome="ajuda" cor="#5A6472" />
            <p className="texto-suave" style={{ fontSize: '16px', lineHeight: 1.55 }}>
              Problema para entrar? Procure a administração
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
