# Servidor

Ainda não existe. Quando o Node entrar aqui, a lista de rotas que o front-end
espera está em `cliente/src/servicos/api.js`, e o formato de cada resposta está
nos arquivos de `cliente/src/dados/`.

Rotas que o front-end já chama:

| Método | Rota | Devolve |
|---|---|---|
| GET | `/painel` | indicadores, pedidos em atenção e tarefas do dia |
| GET | `/pedidos` | lista de pedidos |
| GET | `/pedidos/:id` | um pedido com itens e pagamentos |
| POST | `/pedidos` | grava um pedido |
| GET | `/clientes` | lista de clientes |
| GET | `/clientes/:id/pedidos` | histórico do cliente |
| POST | `/clientes` | grava um cliente |
| GET | `/estoque` | saldo por produto e almoxarifado |
| GET | `/producao?dia=AAAA-MM-DD` | máquinas e tarefas do dia |
| GET | `/matrizes` | matrizes de bordado |
| GET | `/funcionarios` | lista de funcionários |
| POST | `/funcionarios` | grava um funcionário |
| POST | `/entrar` | autentica e devolve o usuário |

O DDL do banco está em `docs/modelo-fisico-jalecos.sql`.
