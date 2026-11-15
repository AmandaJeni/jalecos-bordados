// Mapa de rotas do sistema: qual endereço abre qual tela.
//
// COMO ADICIONAR UMA TELA NOVA (leia antes de mexer aqui):
//   1. crie o arquivo em src/paginas/MinhaTela.jsx
//   2. importe ele aqui em cima
//   3. acrescente uma linha <Route ... /> na lista abaixo
//   4. se a tela deve aparecer no menu, acrescente também em src/componentes/MenuLateral.jsx
//
// Este arquivo é mexido por todo mundo, então mantenha a lista em ordem
// e evite reorganizar linhas que não são suas: reduz conflito no merge.
import { Routes, Route, Navigate } from 'react-router-dom';

import Entrar from './paginas/Entrar.jsx';
import Painel from './paginas/Painel.jsx';
import Pedidos from './paginas/Pedidos.jsx';
import PedidoNovo from './paginas/PedidoNovo.jsx';
import Estoque from './paginas/Estoque.jsx';
import Producao from './paginas/Producao.jsx';
import Matrizes from './paginas/Matrizes.jsx';
import Clientes from './paginas/Clientes.jsx';
import ClienteCadastro from './paginas/ClienteCadastro.jsx';
import Funcionarios from './paginas/Funcionarios.jsx';
import FuncionarioCadastro from './paginas/FuncionarioCadastro.jsx';

export default function App() {
  return (
    <Routes>
      {/* Acesso */}
      <Route path="/entrar" element={<Entrar />} />

      {/* Telas internas */}
      <Route path="/" element={<Painel />} />
      <Route path="/pedidos" element={<Pedidos />} />
      <Route path="/pedidos/novo" element={<PedidoNovo />} />
      <Route path="/estoque" element={<Estoque />} />
      <Route path="/producao" element={<Producao />} />
      <Route path="/matrizes" element={<Matrizes />} />
      <Route path="/clientes" element={<Clientes />} />
      <Route path="/clientes/novo" element={<ClienteCadastro />} />
      <Route path="/funcionarios" element={<Funcionarios />} />
      <Route path="/funcionarios/novo" element={<FuncionarioCadastro />} />

      {/* Qualquer endereço que não existe cai no painel. */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
