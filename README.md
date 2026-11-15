# Jalecos Bordados

Sistema de gestão para a confecção e as lojas de jalecos bordados.
Trabalho da disciplina de Análise e Desenvolvimento de Sistemas, PUC Minas.

Esta é a base do front-end: as **onze telas internas** convertidas do protótipo
para React, com menu, rotas, estilos e o arquivo de API prontos. Daqui em diante
cada pessoa do grupo desenvolve uma ou duas telas novas por cima desta base.

## Como rodar

Precisa de Node.js 18 ou mais novo.

```bash
cd cliente
npm install
npm run dev
```

Abre em `http://localhost:5173`.

## O que já está pronto

| Rota | Tela | Requisitos |
|---|---|---|
| `/entrar` | Entrar no sistema | RF-01, RF-71 |
| `/` | Painel | RF-57 |
| `/pedidos` | Pedidos | RF-50, RF-52 |
| `/pedidos/novo` | Pedido: abrir, editar, fechar | RF-25, RF-26, RF-34 a RF-47 |
| `/estoque` | Estoque | RF-12, RF-13, RF-14, RF-18, RF-19, RF-21 |
| `/producao` | Fila de produção | RF-24, RF-28, RF-30, RF-31 |
| `/matrizes` | Matrizes de bordado | RF-22, RF-23, RF-24 |
| `/clientes` | Clientes | RF-03, RF-51 |
| `/clientes/novo` | Cadastro de cliente | RF-03, RF-04 |
| `/funcionarios` | Funcionários | RF-02, RF-05, RF-66, RF-69, RF-70 |
| `/funcionarios/novo` | Cadastro de funcionário | RF-05, RF-06, RF-64, RF-65, RF-67 |

## Estrutura

```
cliente/
  src/
    componentes/   peças usadas por várias telas (menu, campo, etiqueta...)
    paginas/       uma tela por arquivo
    dados/         dados de exemplo, enquanto o backend não existe
    servicos/      api.js (fala com o servidor) e formato.js (dinheiro, datas)
    estilos/       base.css (variáveis), layout.css, componentes.css
docs/              requisitos, modelo do banco, processos
servidor/          Node, quando chegar a hora
```

## Os dados ainda são de exemplo

Nenhuma tela chama `fetch` direto: todas chamam uma função de
`src/servicos/api.js`. Lá existe a chave:

```js
export const USAR_DADOS_DE_EXEMPLO = true;
```

Com ela ligada, as funções devolvem os dados de `src/dados/` com um atraso de
300 ms, para o estado de "carregando" das telas funcionar de verdade.

Quando o servidor Node estiver no ar, troque para `false` e confira o endereço
em `.env.local`. **Nenhuma tela precisa ser alterada.**

## Para escrever uma tela nova

1. Leia `src/paginas/Clientes.jsx` inteiro. Ele está comentado passo a passo e
   mostra buscar dados, estado de carregando, filtrar e montar a lista.
2. Crie `src/paginas/SuaTela.jsx` começando com o componente `Layout`.
3. Acrescente a rota em `src/App.jsx`.
4. Se a tela entra no menu, acrescente também em `src/componentes/MenuLateral.jsx`.
5. Acrescente a função dela em `src/servicos/api.js` e os dados de exemplo em
   `src/dados/`.

Antes de escrever CSS novo, procure em `src/estilos/componentes.css`. Botão,
campo, cartão, tabela, etiqueta de situação e aviso já existem. Usar o que está
lá é o que mantém as telas parecidas entre si, que é requisito (RNF-10).

## Usabilidade não é enfeite

O sistema vai ser usado por pessoas mais velhas e com pouca familiaridade com
computador. Os números em `src/estilos/base.css` saem dos requisitos RNF-01 a
RNF-11 e diminuir qualquer um deles quebra um requisito:

- corpo de texto em 17px, rótulos em 16px
- alvo de clique de no mínimo 44px, 48px na maioria
- contraste nível AA
- situação nunca informada só pela cor: sempre bolinha **e** palavra
- ícone nunca sozinho: ou vem com texto, ou o botão tem `aria-label`
- campo obrigatório marcado com a palavra "(obrigatório)", não com asterisco
- mensagem escrita como frase, não como código de erro

## Como o grupo trabalha

Uma branch por tela, nunca commit direto na `main`:

```bash
git checkout main
git pull                          # pega o que os outros subiram
git checkout -b tela/produtos     # sua branch
# ... programa ...
git add .
git commit -m "Tela de produtos: lista com filtro por tipo"
git push -u origin tela/produtos
# abre o Pull Request no GitHub
```

Três regras que evitam quase toda dor de cabeça:

1. `git pull` na `main` antes de começar qualquer coisa, todo dia.
2. Uma branch por tela.
3. Arquivo compartilhado (`MenuLateral.jsx`, `App.jsx`, `componentes.css`) tem
   dono. Avise o grupo antes de mexer.

## Diferenças em relação ao protótipo em imagem

A reunião de 6 de novembro mudou duas coisas que já entraram neste código:

- **Acabou o orçamento separado.** Todo registro nasce como pedido **em aberto**
  (faz o papel do orçamento e não reserva peça) e vira **fechado** quando é
  confirmado, aí o backend valida e reserva o estoque. O seletor
  "Orçamento / Pedido" da tela de pedido virou "Em aberto / Fechado", e a lista
  de pedidos ganhou os três botões de filtro.
- **RF-67 virou permissão por item.** Em vez do liga e desliga de "é
  administrador", o cadastro de funcionário tem uma lista de permissões soltas.
  A reunião marcou este ponto como "precisa de mais conversa", então a lista em
  `src/dados/funcionarios.js` é a primeira versão.

O antigo RF-68 (troca de senha no primeiro acesso) saiu: quem troca senha é o
administrador.
