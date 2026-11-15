// Ponto de entrada da aplicação.
// É aqui que o React "liga" o componente App à div#root do index.html.
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from './App.jsx';

// Os três arquivos de estilo valem para o sistema inteiro.
// A ordem importa: base define as variáveis que os outros dois usam.
import './estilos/base.css';
import './estilos/layout.css';
import './estilos/componentes.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* BrowserRouter é o que faz as rotas (/pedidos, /clientes...) funcionarem. */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);
