// Importa los estilos del menú y el logo
import "./menu.css";
import logo from "../../assets/imagenes/logo.png";

// Importa la herramienta para crear enlaces entre páginas.
import { Link } from "react-router-dom";

// Importa los iconos de Bootstrap.
import "bootstrap-icons/font/bootstrap-icons.css";

function Menu() {
return (

    <aside className="sidebar">

        {/* Contiene el logo y la información del sistema. */}
        <div className="logo-container">

            {/* Permite volver al inicio al hacer clic en el logo. */}
            <Link to="/dashboard">
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
                    <Link to="/dashboard">
                        <i className="bi bi-house-door-fill"></i>
                        <span>Inicio</span>
                    </Link>
                </li>

                <li>
                    <Link to="/clientes">
                        <i className="bi bi-people-fill"></i>
                        <span>Clientes</span>
                    </Link>
                </li>

                <li>
                    <Link to="/medicamentos">
                        <i className="bi bi-capsule"></i>
                        <span>Medicamentos</span>
                    </Link>
                </li>

                <li>
                    <Link to="/ventas">
                        <i className="bi bi-receipt"></i>
                        <span>Ventas</span>
                    </Link>
                </li>

                <li>
                    <Link to="/registros">
                        <i className="bi bi-clock-history"></i>
                        <span>Registros</span>
                    </Link>
                </li>

            </ul>

        </nav>

    </aside>
);

}

export default Menu;