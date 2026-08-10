// Importa el modo estricto de React y la función para renderizar la aplicación.
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

// Importa Bootstrap para estilos y funcionalidades.
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

// Importa el componente principal.
import App from './App.jsx'

// Permite manejar las rutas de la aplicación.
import { BrowserRouter } from "react-router-dom";

// Renderiza la aplicación en el elemento root.
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)