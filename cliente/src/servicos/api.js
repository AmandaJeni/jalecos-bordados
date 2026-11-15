// =========================================================================
// O único arquivo que fala com o servidor.
//
// Nenhuma tela chama fetch() direto. Todas chamam uma função daqui. Assim,
// quando o endereço da API mudar, ou quando precisar mandar o token de
// login junto, muda em um lugar só.
//
// ENQUANTO O BACKEND NÃO EXISTE
// -----------------------------
// A chave USAR_DADOS_DE_EXEMPLO abaixo está ligada. Com ela ligada, as
// funções devolvem os dados de src/dados/ em vez de chamar o servidor.
// As telas não sabem a diferença: elas já estão escritas do jeito final,
// com estado de carregando e tudo.
//
// Quando o servidor Node estiver no ar:
//   1. troque USAR_DADOS_DE_EXEMPLO para false
//   2. confira se VITE_API_URL aponta para o endereço certo (.env.local)
//   3. pronto, nenhuma tela precisa ser alterada
//
// COMO ACRESCENTAR UMA ROTA NOVA
// -------------------------------
// Acrescente uma função no objeto api lá embaixo, seguindo o padrão. Se ela
// for usada enquanto o backend não existe, acrescente também o caso dela em
// dadosDeExemplo().
// =========================================================================

import * as exemplos from '../dados/index.js';

export const USAR_DADOS_DE_EXEMPLO = true;

// import.meta.env é como o Vite entrega variáveis de ambiente.
// Para mudar sem mexer no código, crie um arquivo .env.local com:
//   VITE_API_URL=http://localhost:3000
const BASE = import.meta.env.VITE_API_URL ?? 'http://localhost:3000';

/** Faz um GET e devolve o JSON. Erro vira exceção, para a tela poder avisar. */
async function buscar(caminho) {
  const resposta = await fetch(`${BASE}${caminho}`);

  if (!resposta.ok) {
    throw new Error(`Não consegui carregar ${caminho} (código ${resposta.status})`);
  }

  return resposta.json();
}

/** Faz um POST ou PUT mandando JSON. */
async function enviar(caminho, corpo, metodo = 'POST') {
  const resposta = await fetch(`${BASE}${caminho}`, {
    method: metodo,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(corpo),
  });

  if (!resposta.ok) {
    throw new Error(`Não consegui salvar em ${caminho} (código ${resposta.status})`);
  }

  return resposta.json();
}

/**
 * Devolve o dado de exemplo fingindo uma ida ao servidor.
 * Os 300ms existem de propósito: sem eles, o "Carregando..." nunca aparece
 * e ninguém descobre que ele está quebrado só na hora de ligar o backend.
 */
function daExemplos(valor) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(valor), 300);
  });
}

export const api = {
  // --- Painel -------------------------------------------------------------
  painel: () =>
    USAR_DADOS_DE_EXEMPLO ? daExemplos(exemplos.painel) : buscar('/painel'),

  // --- Pedidos ------------------------------------------------------------
  listarPedidos: () =>
    USAR_DADOS_DE_EXEMPLO ? daExemplos(exemplos.pedidos) : buscar('/pedidos'),

  buscarPedido: (id) =>
    USAR_DADOS_DE_EXEMPLO ? daExemplos(exemplos.pedido) : buscar(`/pedidos/${id}`),

  salvarPedido: (pedido) =>
    USAR_DADOS_DE_EXEMPLO ? daExemplos(pedido) : enviar('/pedidos', pedido),

  // --- Clientes -----------------------------------------------------------
  listarClientes: () =>
    USAR_DADOS_DE_EXEMPLO ? daExemplos(exemplos.clientes) : buscar('/clientes'),

  historicoDoCliente: (id) =>
    USAR_DADOS_DE_EXEMPLO
      ? daExemplos(exemplos.historicoCliente)
      : buscar(`/clientes/${id}/pedidos`),

  salvarCliente: (cliente) =>
    USAR_DADOS_DE_EXEMPLO ? daExemplos(cliente) : enviar('/clientes', cliente),

  // --- Estoque ------------------------------------------------------------
  listarEstoque: () =>
    USAR_DADOS_DE_EXEMPLO ? daExemplos(exemplos.estoque) : buscar('/estoque'),

  // --- Produção -----------------------------------------------------------
  filaDoDia: (dia) =>
    USAR_DADOS_DE_EXEMPLO ? daExemplos(exemplos.producao) : buscar(`/producao?dia=${dia}`),

  // --- Matrizes -----------------------------------------------------------
  listarMatrizes: () =>
    USAR_DADOS_DE_EXEMPLO ? daExemplos(exemplos.matrizes) : buscar('/matrizes'),

  // --- Funcionários -------------------------------------------------------
  listarFuncionarios: () =>
    USAR_DADOS_DE_EXEMPLO ? daExemplos(exemplos.funcionarios) : buscar('/funcionarios'),

  salvarFuncionario: (funcionario) =>
    USAR_DADOS_DE_EXEMPLO ? daExemplos(funcionario) : enviar('/funcionarios', funcionario),

  // --- Acesso -------------------------------------------------------------
  entrar: (login, senha, unidade) =>
    USAR_DADOS_DE_EXEMPLO
      ? daExemplos({ nome: 'Usuário', papel: 'Administrador', unidade })
      : enviar('/entrar', { login, senha, unidade }),
};
