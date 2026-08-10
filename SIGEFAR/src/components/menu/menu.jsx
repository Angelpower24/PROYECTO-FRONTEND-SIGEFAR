// Importa los estilos del menú y el logo
import "./menu.css";
import logo from "../../assets/imagenes/logo.png";

// Importa la herramienta para crear enlaces entre páginas.
import { Link } from "react-router-dom";

// Importa los iconos de Bootstrap.
import "bootstrap-icons/font/bootstrap-icons.css";

import { useState } from "react";

function Menu() {
    const [menuAbierto, setMenuAbierto] = useState(false);
    const cerrarMenu = () => {
        setMenuAbierto(false);
    };
    return (

    <>
        <button
            className="boton-menu"
            onClick={() => setMenuAbierto(!menuAbierto)}
        >
            <i className={menuAbierto ? "bi bi-x-lg" : "bi bi-list"}></i>
        </button>

    <aside className={`sidebar ${menuAbierto ? "menu-abierto" : ""}`}>

        {/* Contiene el logo y la información del sistema. */}
        <div className="logo-container">

            {/* Permite volver al inicio al hacer clic en el logo. */}
            <Link to="/dashboard" onClick={cerrarMenu}>
                <img src={logo} alt="SIGEFAR" className="logo" />
            </Link>

            <h2>SIGEFAR</h2>
            <p>Sistema Integral de Gestión de Farmacia</p>

        </div>

        {/* Contiene las opciones de navegación. */}
        <nav>

            <ul>

                {/* Enlaces a los módulos principales. */}
                <li>
                    <Link to="/dashboard" onClick={cerrarMenu}>
                        <i className="bi bi-house-door-fill"></i>
                        <span>Inicio</span>
                    </Link>
                </li>

                <li>
                    <Link to="/clientes" onClick={cerrarMenu}>
                        <i className="bi bi-people-fill"></i>
                        <span>Clientes</span>
                    </Link>
                </li>

                <li>
                    <Link to="/medicamentos" onClick={cerrarMenu}>
                        <i className="bi bi-capsule"></i>
                        <span>Medicamentos</span>
                    </Link>
                </li>

                <li>
                    <Link to="/ventas" onClick={cerrarMenu}>
                        <i className="bi bi-receipt"></i>
                        <span>Ventas</span>
                    </Link>
                </li>

                <li>
                    <Link to="/registros" onClick={cerrarMenu}>
                        <i className="bi bi-clock-history"></i>
                        <span>Registros</span>
                    </Link>
                </li>

            </ul>

        </nav>

    </aside>
</>
);

}

export default Menu;