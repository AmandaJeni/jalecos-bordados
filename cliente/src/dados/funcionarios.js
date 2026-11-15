// Dados de exemplo dos funcionários.
//
// Os nomes aqui são genéricos de propósito. Os nomes reais das pessoas da
// empresa não entram no protótipo nem no repositório: além de LGPD, este
// código vai ser apresentado e fica público para a turma.

export const funcionarios = [
  { matricula: '1001', nome: 'Proprietária', setor: 'Administrativo', unidade: 'Loja 02', acesso: 'Administrador', ativo: true },
  { matricula: '1004', nome: 'Gerente de vendas', setor: 'Vendas', unidade: 'Loja 02', acesso: 'Administrador', ativo: true },
  { matricula: '1007', nome: 'Gerente geral da fábrica', setor: 'Costura', unidade: 'Fábrica', acesso: 'Administrador', ativo: true },
  { matricula: '1012', nome: 'Atendente 1', setor: 'Vendas', unidade: 'Loja 02', acesso: 'Acesso comum', ativo: true },
  { matricula: '1013', nome: 'Atendente 2', setor: 'Vendas', unidade: 'Loja 28', acesso: 'Acesso comum', ativo: true },
  { matricula: '1018', nome: 'Profissional de bordado 1', setor: 'Bordado', unidade: 'Loja 02', acesso: 'Acesso comum', ativo: true },
  { matricula: '1019', nome: 'Profissional de bordado 2', setor: 'Bordado', unidade: 'Fábrica', acesso: 'Acesso comum', ativo: true },
  { matricula: '1023', nome: 'Costureira 1', setor: 'Costura', unidade: 'Fábrica', acesso: 'Sem acesso', ativo: true },
];

// Permissões que o administrador pode conceder uma a uma.
//
// DECISÃO DA REUNIÃO DE 6 DE NOVEMBRO: o RF-67 deixou de ser um liga e
// desliga de "é administrador" e virou uma lista de permissões soltas, para
// o super administrador liberar só o que cada pessoa precisa. A reunião
// marcou este ponto como "precisa de mais conversa", porque ainda depende de
// validar com as proprietárias: a lista abaixo é a primeira versão.
export const permissoes = [
  {
    chave: 'cadastrar_funcionario',
    rotulo: 'Cadastrar e alterar funcionários',
    explicacao: 'Dá acesso a esta tela de funcionários.',
  },
  {
    chave: 'tabela_preco',
    rotulo: 'Mexer na tabela de preço',
    explicacao: 'Criar e alterar os preços de atacado e varejo.',
  },
  {
    chave: 'ajuste_estoque',
    rotulo: 'Fazer ajuste manual de saldo',
    explicacao: 'Corrigir o estoque sem passar por um pedido. Exige justificativa.',
  },
  {
    chave: 'estornar_pagamento',
    rotulo: 'Estornar pagamento',
    explicacao: 'Devolver as peças ao estoque e reabrir o pedido.',
  },
  {
    chave: 'cadastrar_produto',
    rotulo: 'Cadastrar produtos e unidades',
    explicacao: 'Criar produtos, tipos de produto, unidades e almoxarifados.',
  },
  {
    chave: 'relatorios',
    rotulo: 'Ver relatórios e indicadores',
    explicacao: 'Abrir os painéis de venda, produtividade e estoque.',
  },
];
