// Importa los hooks para manejar estados y efectos.
import { useEffect, useState } from "react";

// Importa los estilos del módulo de registros.
import "./registros.css";

// Importa el menú lateral y el encabezado.
import Menu from "../../components/menu/menu";
import Header from "../../components/header/header";

function Registros() {

    // Guarda los registros del sistema.
    const [registros, setRegistros] = useState([]);

    // Controla los filtros y la búsqueda.
    const [filtroModulo, setFiltroModulo] = useState("Todos");
    const [filtroAccion, setFiltroAccion] = useState("Todas");
    const [busqueda, setBusqueda] = useState("");

    // Controla la ventana de confirmación.
    const [mostrarConfirmacion, setMostrarConfirmacion] = useState(false);

    // Restablece los filtros de búsqueda.
    const limpiarFiltros = () => {

        setFiltroModulo("Todos");
        setFiltroAccion("Todas");
        setBusqueda("");

    };

    // Elimina todo el historial mediante la API.
    const eliminarHistorial = async () => {

        try {
            const respuesta = await fetch("http://127.0.0.1:8000/registros/", {
                method: "DELETE"
            });

            if (!respuesta.ok) {
                throw new Error("No se pudo eliminar el historial");
            }

            // Vaciar el historial de la pantalla
            setRegistros([]);
            // Cerrar el modal
            setMostrarConfirmacion(false);
        } catch (error) {

            console.error("Error al eliminar historial:", error);

        }
    };

    // Carga los registros al iniciar el componente.
    useEffect(() => {
        cargarRegistros();
    }, []);

    // Obtiene el historial desde la API.
    const cargarRegistros = async () => {

        try {
            const respuesta = await fetch("http://127.0.0.1:8000/registros/");
            if (!respuesta.ok) {
                throw new Error("No se pudieron cargar los registros");
            }
            const datos = await respuesta.json();
            setRegistros(datos);
        } catch (error) {

            console.error("Error al cargar registros:", error);

        }

    };

    // Filtra los registros según los criterios seleccionados.
    const registrosFiltrados = registros.filter((registro) => {

        const coincideModulo =
            filtroModulo === "Todos" ||
            registro.modulo === filtroModulo;

        const coincideAccion =
            filtroAccion === "Todas" ||
            registro.accion === filtroAccion;

        const texto = (
            registro.hora +
            " " +
            registro.modulo +
            " " +
            registro.accion +
            " " +
            registro.informacion
        ).toLowerCase();

        const coincideBusqueda =
            texto.includes(busqueda.toLowerCase());

        return coincideModulo && coincideAccion && coincideBusqueda;

    });

    return (

    <>

        <Menu />

        <div className="contenido">

            <Header titulo="Registros" />

            <div className="registros">

                <div className="card shadow">

                    <div className="card-header">

                        <div className="d-flex justify-content-between align-items-center">

                            <div>

                                <h4>
                                    <i className="bi bi-clock-history"></i> Historial
                                </h4>

                                <p className="mb-0"> Historial de actividades del sistema </p>

                            </div>

                            <span className="badge bg-primary">
                                {registrosFiltrados.length} registros
                            </span>

                        </div>

                    </div>

                    <div className="card-body">

                        {/* Filtros y buscador del historial. */}
                        <div className="row mb-4">

                            <div className="col-md-3">

                                <label className="form-label">
                                    Módulo
                                </label>

                                <select
                                    className="form-select"
                                    value={filtroModulo}
                                    onChange={(e) => setFiltroModulo(e.target.value)}
                                >

                                    <option value="Todos">Todos</option>
                                    <option value="Clientes">Clientes</option>
                                    <option value="Medicamentos">Medicamentos</option>
                                    <option value="Ventas">Ventas</option>

                                </select>

                            </div>

                            <div className="col-md-3">

                                <label className="form-label">
                                    Acción
                                </label>

                                <select
                                    className="form-select"
                                    value={filtroAccion}
                                    onChange={(e) => setFiltroAccion(e.target.value)}
                                >
                                    <option value="Todas">Todas</option>
                                    <option value="Registrar">Registrar</option>
                                    <option value="Actualizar">Actualizar</option>
                                    <option value="Eliminar">Eliminar</option>
                                </select>

                            </div>

                            <div className="col-md-6">

                                <label className="form-label">
                                    Buscar
                                </label>

                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Buscar en los registros..."
                                    value={busqueda}
                                    onChange={(e) => setBusqueda(e.target.value)}
                                />

                            </div>

                            <div className="col-md-12 mt-3 text-end">

                                <button
                                    className="btn btn-outline-secondary"
                                    onClick={limpiarFiltros}
                                >
                                    Limpiar filtros
                                </button>

                                <button
                                    className="btn btn-outline-danger ms-2"
                                    onClick={() => setMostrarConfirmacion(true)}
                                >
                                    🗑 Limpiar historial
                                </button>

                            </div>

                        </div>

                        {/* Tabla que muestra los registros. */}
                        <table className="table table-hover">

                            <thead>

                                <tr>
                                    <th className="text-center">Hora</th>
                                    <th className="text-center">Módulo</th>
                                    <th className="text-center">Acción</th>
                                    <th className="text-center">Información</th>
                                </tr>

                            </thead>

                            <tbody>

                                {registrosFiltrados.map((registro, index) => (

                                    <tr key={index}>
                                        <td className="text-center">{registro.hora}</td>
                                        <td className="text-center">{registro.modulo}</td>
                                        <td className="text-center">
                                            <span
                                                className={
                                                    registro.accion === "Registrar"
                                                        ? "badge bg-success"
                                                        : registro.accion === "Actualizar"
                                                        ? "badge bg-primary"
                                                        : registro.accion === "Eliminar"
                                                        ? "badge bg-danger"
                                                        : "badge bg-secondary"
                                                }
                                            >
                                                {registro.accion}
                                            </span>
                                        </td>

                                        <td className="text-center">{registro.informacion}</td>
                                    </tr>

                                ))}

                            </tbody>

                        </table>

                    </div>

                </div>

            </div>

        </div>

        {/* Muestra la confirmación antes de eliminar el historial. */}
        {mostrarConfirmacion && (

            <div className="modal-overlay">

                <div className="modal-confirmacion">

                    <div className="modal-icono">
                        ⚠️
                    </div>

                    <h3>¿Limpiar historial?</h3>

                    <p>Se eliminarán todos los registros de actividades.</p>

                    <div className="modal-botones">

                        <button
                            className="btn-cancelar"
                            onClick={() => setMostrarConfirmacion(false)}
                        >
                            Cancelar
                        </button>

                        <button
                            className="btn-cerrar"
                            onClick={eliminarHistorial}
                        >
                            Limpiar historial
                        </button>

                    </div>

                </div>

            </div>

        )}

    </>

);

}

export default Registros;