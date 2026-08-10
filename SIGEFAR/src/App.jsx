// Importa los componentes para manejar las rutas.
import { Routes, Route } from "react-router-dom";

// Importa las páginas del sistema.
import Login from "./pages/login/login";
import Dashboard from "./pages/dashboard/dashboard";
import Clientes from "./pages/clientes/clientes";
import Medicamentos from "./pages/medicamentos/medicamentos";
import Ventas from "./pages/ventas/ventas";
import Registros from "./pages/registros/registros";

// Define las rutas principales de la aplicación.
function App(){

    return(

        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/clientes" element={<Clientes />} />
            <Route path="/medicamentos" element={<Medicamentos />}/>
            <Route path="/ventas" element={<Ventas />}/>
            <Route path="/registros" element={<Registros />} />
        </Routes>

    )

}

export default App;