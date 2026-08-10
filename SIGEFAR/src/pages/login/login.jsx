// Importa los estilos del Login.
import "./login.css";
// Importa la función para navegar entre páginas.
import { useNavigate } from "react-router-dom";
// Importa el hook para manejar estados.
import { useState } from "react";
// Importa el logo del sistema.
import logo from "../../assets/imagenes/logo.png";
// Importa la alerta de error.
import { alertaError } from "../../utils/alertas";

function Login() {

    // Permite redirigir al Dashboard.
    const navigate = useNavigate();

    // Guarda los datos ingresados en el formulario.
    const [usuario, setUsuario] = useState("");
    const [contraseña, setContraseña] = useState("");

    // Define las credenciales de acceso.
    const usuarioCorrecto = "angel flores";
    const contraseñaCorrecta = "admin123";

    // Valida las credenciales e inicia sesión.
    const ingresar = (e) => {
        e.preventDefault();
        if (
            usuario === usuarioCorrecto &&
            contraseña === contraseñaCorrecta
        ) {
            navigate("/dashboard");
        } else {
            alertaError("Acceso denegado", "Usuario o contraseña incorrectos.");
        }
    };

    return (

        <div className="login-container">

            <div className="login-card shadow">

                <div className="row g-0 h-100">

                    <div className="col-md-6 logo-section">

                        <img
                            src={logo}
                            alt="SIGEFAR"
                            className="logo"
                        />

                        <h1>SIGEFAR</h1>

                        <p>
                            Sistema Integral
                            <br />
                            de Gestión de Farmacia
                        </p>

                    </div>

                    <div className="col-md-6 formulario">

                        <h3 className="mb-4">

                            Iniciar sesión

                        </h3>

                        <form onSubmit={ingresar}>

                            <div className="mb-3">

                                <label>

                                    Usuario

                                </label>

                                <input
                                    className="form-control"
                                    placeholder="Ingrese su usuario"
                                    value={usuario}
                                    onChange={(e) => setUsuario(e.target.value)}
                                />

                            </div>

                            <div className="mb-4">

                                <label>

                                    Contraseña

                                </label>

                                <input
                                    type="password"
                                    className="form-control"
                                    placeholder="Ingrese su contraseña"
                                    value={contraseña}
                                    onChange={(e) => setContraseña(e.target.value)}
                                />

                            </div>

                            <button
                                className="btn btn-primary w-100"
                            >
                                Iniciar sesión
                            </button>

                        </form>

                        <div className="text-center mt-3">

                            <a href="#">

                                ¿Olvidaste tu contraseña?

                            </a>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default Login;