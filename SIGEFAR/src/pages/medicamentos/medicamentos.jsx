// Importa los estilos del módulo de medicamentos.
import "./medicamentos.css";

// Importa los hooks de React y la conexión con la API.
import { useEffect, useState } from "react";
import api from "../../api/axios";

// Importa el menú lateral y el encabezado.
import Menu from "../../components/menu/menu";
import Header from "../../components/header/header";

// Importa las alertas utilizadas en el módulo.
import {
    alertaExito,
    alertaError,
    alertaAdvertencia,
    confirmarEliminar
} from "../../utils/alertas";

function Medicamentos() {

    // Guarda la lista de medicamentos.
    const [medicamentos, setMedicamentos] = useState([]);

    // Guarda los datos del formulario.
    const [nomb_med, setNombMed] = useState("");
    const [precio, setPrecio] = useState("");
    const [stock, setStock] = useState("");

    // Controla el medicamento que se está editando.
    const [idEditar, setIdEditar] = useState(null);
    const [busqueda, setBusqueda] = useState("");

    // Obtiene los medicamentos desde la API.
    const cargarMedicamentos = async () => {

        try {
            const respuesta = await api.get("/medicamentos");
            setMedicamentos(respuesta.data);
        } catch (error) {

            console.error("Error al cargar medicamentos:", error);
            alertaError("Error", "No se pudieron cargar los medicamentos.");
        }
    };

    // Carga los medicamentos al iniciar el componente.
    useEffect(() => {
        cargarMedicamentos();
    }, []);

    // Limpia los campos del formulario.
    const limpiarFormulario = () => {

        setIdEditar(null);

        setNombMed("");
        setPrecio("");
        setStock("");

    };

    // Registra un nuevo medicamento.
    const guardarMedicamento = async () => {
        // VALIDAR CAMPOS VACÍOS
        if (
            nomb_med.trim() === "" ||
            precio === "" ||
            stock === ""
        ) {
            alertaAdvertencia("Campos incompletos", "Debe completar todos los campos.");
            return;
        }

        // VALIDAR NOMBRE
        if (nomb_med.trim().length < 3) {

            alertaAdvertencia("Nombre inválido", "El nombre del medicamento debe tener al menos 3 caracteres.");
            return;
        }

        // VALIDAR QUE PRECIO Y STOCK SEAN NÚMEROS
        if (isNaN(Number(precio)) || isNaN(Number(stock))) {

            alertaAdvertencia("Datos inválidos", "El precio y el stock deben ser valores numéricos.");
            return;
        }

        // VALIDAR PRECIO
        if (Number(precio) <= 0) {

            alertaAdvertencia("Precio inválido", "El precio debe ser mayor que cero.");
            return;
        }

        // VALIDAR STOCK
        if (!Number.isInteger(Number(stock)) || Number(stock) < 0) {

            alertaAdvertencia("Stock inválido", "El stock debe ser un número entero mayor o igual a cero.");
            return;
        }

        try {
            await api.post("/medicamentos/", {
                nomb_med,
                precio: Number(precio),
                stock: Number(stock)
            });

            await cargarMedicamentos();
            limpiarFormulario();
            alertaExito("Registro exitoso", "Medicamento registrado correctamente." );

        } catch (error) {

            console.error(error);

            alertaError("Error", "No se pudo registrar el medicamento.");

        }

    };

    // Carga los datos del medicamento seleccionado para editar.
    const editarMedicamento = (medicamento) => {

        setIdEditar(medicamento.id_medicamento);

        setNombMed(medicamento.nomb_med);
        setPrecio(medicamento.precio);
        setStock(medicamento.stock);

    };

    // Actualiza un medicamento existente.
    const actualizarMedicamento = async () => {
        // VALIDAR CAMPOS VACÍOS
        if (
            nomb_med.trim() === "" ||
            precio === "" ||
            stock === ""
        ) {
            alertaAdvertencia("Campos incompletos", "Debe completar todos los campos.");
            return;

        }

        // VALIDAR NOMBRE
        if (nomb_med.trim().length < 3) {

            alertaAdvertencia("Nombre inválido", "El nombre del medicamento debe tener al menos 3 caracteres.");
            return;
        }

        // VALIDAR QUE PRECIO Y STOCK SEAN NÚMEROS
        if (isNaN(Number(precio)) || isNaN(Number(stock))) {

            alertaAdvertencia("Datos inválidos", "El precio y el stock deben ser valores numéricos.");
            return;
        }

        // VALIDAR PRECIO
        if (Number(precio) <= 0) {

            alertaAdvertencia("Precio inválido", "El precio debe ser mayor que cero.");
            return;

        }

        // VALIDAR STOCK
        if (!Number.isInteger(Number(stock)) || Number(stock) < 0) {

            alertaAdvertencia("Stock inválido", "El stock debe ser un número entero mayor o igual a cero.");
            return;
        }

        try {
            await api.put(`/medicamentos/${idEditar}`, {
                nomb_med,
                precio: Number(precio),
                stock: Number(stock)
            });

            await cargarMedicamentos();
            limpiarFormulario();
            alertaExito("Actualización exitosa", "Medicamento actualizado correctamente.");

        } catch (error) {
            console.error(error);
            alertaError("Error", "No se pudo actualizar el medicamento.");
        }

    };

    // Elimina un medicamento después de confirmar.
    const eliminarMedicamento = async (id) => {
        const confirmar = await confirmarEliminar(
            "El medicamento será eliminado permanentemente."
        );

        if (!confirmar) return;

        try {
            await api.delete(`/medicamentos/${id}`);
            await cargarMedicamentos();
            alertaExito("Eliminado", "Medicamento eliminado correctamente.");

        } catch (error) {

            console.error(error);
            alertaError("Error", "No se pudo eliminar el medicamento.");
        }
    };

    // Filtra los medicamentos según el texto buscado.
    const medicamentosFiltrados = medicamentos.filter((medicamento) => {
        const texto = busqueda.toLowerCase();
        return medicamento.nomb_med
            .toLowerCase()
            .includes(texto);
    });

    return (

        <>

            <Menu />

            <div className="contenido">

                <Header titulo="Medicamentos" />

                <div className="medicamentos-contenido">

                    <div className="row">

                        {/* FORMULARIO */}

                        <div className="col-md-4">

                            <div className="card shadow">

                                <div className="card-header">

                                    <h5>
                                        <i
                                            className={`bi ${
                                                idEditar
                                                    ? "bi-pencil-square"
                                                    : "bi-capsule"
                                            } me-2`}
                                        ></i>
                                        {idEditar
                                            ? "Editar Medicamento"
                                            : "Registrar Medicamento"}
                                    </h5>

                                </div>

                                <div className="card-body">

                                    <div className="mb-3">

                                        <label className="form-label">
                                            Nombre
                                        </label>

                                        <input
                                            type="text"
                                            className="form-control"
                                            value={nomb_med}
                                            onChange={(e) =>
                                                setNombMed(e.target.value)
                                            }
                                            placeholder="Nombre del medicamento"
                                        />

                                    </div>

                                    <div className="mb-3">

                                        <label className="form-label">
                                            Precio
                                        </label>

                                        <input
                                            type="number"
                                            step="0.01"
                                            min="0"
                                            className="form-control"
                                            value={precio}
                                            onChange={(e) =>
                                                setPrecio(e.target.value)
                                            }
                                            placeholder="Precio"
                                        />

                                    </div>

                                    <div className="mb-3">

                                        <label className="form-label">
                                            Stock
                                        </label>

                                        <input
                                            type="number"
                                            min="0"
                                            className="form-control"
                                            value={stock}
                                            onChange={(e) =>
                                                setStock(e.target.value)
                                            }
                                            placeholder="Cantidad disponible"
                                        />

                                    </div>

                                    <button
                                        className="btn btn-success"
                                        onClick={
                                            idEditar
                                                ? actualizarMedicamento
                                                : guardarMedicamento
                                        }
                                    >
                                        
                                        <i
                                            className={`bi ${
                                                idEditar
                                                    ? "bi-pencil-square"
                                                    : "bi-capsule"
                                            } me-2`}
                                        ></i>

                                        {idEditar
                                            ? "Actualizar"
                                            : "Guardar"}

                                    </button>

                                    <button
                                        className="btn btn-secondary ms-2"
                                        onClick={limpiarFormulario}
                                    >

                                        <i className="bi bi-eraser-fill me-2"></i>

                                        Limpiar

                                    </button>

                                </div>

                            </div>

                        </div>


                        {/* TABLA */}

                        <div className="col-md-8">

                            <div className="card shadow">

                                <div className="card-header">

                                    <h5>

                                        <i className="bi bi-capsule-pill me-2"></i>

                                        Medicamentos registrados

                                    </h5>

                                </div>

                                <div className="card-body">

                                    {/* Buscador de medicamentos. */}
                                    <div className="mb-3">

                                        <div className="input-group">

                                            <span className="input-group-text">

                                                <i className="bi bi-search"></i>

                                            </span>

                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Buscar medicamento..."
                                                value={busqueda}
                                                onChange={(e) =>
                                                    setBusqueda(e.target.value)
                                                }
                                            />

                                        </div>

                                    </div>

                                    <div className="table-responsive">

                                        <table className="table table-hover">

                                            <thead>

                                                <tr>
                                                    <th>ID</th>
                                                    <th>Nombre</th>
                                                    <th>Precio</th>
                                                    <th>Stock</th>
                                                    <th>Acciones</th>
                                                </tr>

                                            </thead>

                                            <tbody>

                                                {medicamentosFiltrados.length === 0 ? (

                                                    <tr>
                                                        <td
                                                            colSpan="5"
                                                            className="text-center"
                                                        >

                                                            {medicamentos.length === 0
                                                                ? "No existen medicamentos registrados"
                                                                : "No se encontraron medicamentos con esa búsqueda"
                                                            }

                                                        </td>
                                                    </tr>

                                                ) : (

                                                    medicamentosFiltrados.map(
                                                        (medicamento) => (

                                                            <tr key={medicamento.id_medicamento}
                                                            >

                                                                <td>{ medicamento.id_medicamento}</td>
                                                                <td>{ medicamento.nomb_med}</td>
                                                                <td>S/.{" "}{Number( medicamento.precio).toFixed(2)}</td>
                                                                <td>{medicamento.stock}</td>
                                                                <td>
                                                                    <button
                                                                        className="btn btn-warning btn-sm me-2"
                                                                        onClick={() =>
                                                                            editarMedicamento(
                                                                                medicamento
                                                                            )
                                                                        }
                                                                        title="Editar medicamento"
                                                                    >

                                                                        <i className="bi bi-pencil-square"></i>
                                                                    </button>

                                                                    <button
                                                                        className="btn btn-danger btn-sm"
                                                                        onClick={() =>
                                                                            eliminarMedicamento(
                                                                                medicamento.id_medicamento
                                                                            )
                                                                        }
                                                                        title="Eliminar medicamento"
                                                                    >

                                                                        <i className="bi bi-trash-fill"></i>
                                                                    </button>
                                                                </td>

                                                            </tr>

                                                        )
                                                    )

                                                )}

                                            </tbody>

                                        </table>

                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </>

    );

}

export default Medicamentos;