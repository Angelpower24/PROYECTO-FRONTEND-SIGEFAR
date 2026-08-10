// Importa los estilos del encabezado
import "./header.css";

// Importa los hooks para manejar estados y efectos.
import { useState, useEffect } from "react";

// Importa la función para navegar entre páginas.
import { useNavigate } from "react-router-dom";

function Header({ titulo }) {

    // Actualiza la hora cada segundo.
    const [hora, setHora] = useState(new Date());

    useEffect(() => {

        const intervalo = setInterval(() => {
            setHora(new Date());
        }, 1000);
        return () => clearInterval(intervalo);

    }, []);

    // Controla la ventana de confirmación.
    const [mostrarConfirmacion, setMostrarConfirmacion] = useState(false);

    const navigate = useNavigate();

    // Cierra la sesión y vuelve al Login.
    const cerrarSesion = () => {
        setMostrarConfirmacion(false);
        navigate("/");
    };

    return (

        <>

            <header className="header">

                <div>
                    <h2>{titulo}</h2>
                    <p> Bienvenido al Sistema Integral de Gestión de Farmacia </p>
                </div>

                <div
                    className="usuario"
                    onClick={() => setMostrarConfirmacion(true)}
                >
                    <i className="bi bi-person-circle"></i>

                    <span>Administrador</span>
                    <span className="hora">
                        {hora.toLocaleTimeString()}
                    </span>
                </div>

            </header>


            {/* Muestra la confirmación para cerrar sesión. */}
            {mostrarConfirmacion && (

                <div className="modal-overlay">

                    <div className="modal-confirmacion">

                        <div className="modal-icono">
                            ⚠️
                        </div>

                        <h3> ¿Cerrar sesión? </h3>
                        <p> ¿Estás seguro de que deseas cerrar tu sesión? </p>

                        <div className="modal-botones">

                            <button
                                className="btn-cancelar"
                                onClick={() => setMostrarConfirmacion(false)}
                            >
                                Cancelar
                            </button>

                            <button
                                className="btn-cerrar"
                                onClick={cerrarSesion}
                            >
                                Cerrar sesión
                            </button>

                        </div>

                    </div>

                </div>

            )}

        </>

    );

}

export default Header;