// Importa los estilos del módulo de clientes.
import "./clientes.css";

// Importa los hooks para manejar estados y efectos y la conexión con la API.
import { useEffect, useState } from "react";
import api from "../../api/axios";

// Importa el menú lateral y el encabezado.
import Menu from "../../components/menu/menu";
import Header from "../../components/header/header";

// Importa las funciones de alerta.
import {
    alertaExito,
    alertaError,
    alertaAdvertencia,
    confirmarEliminar
} from "../../utils/alertas";

function Clientes() {

    const [clientes, setClientes] = useState([]);
    const [nomb_cli, setNombCli] = useState("");
    const [ape_cli, setApeCli] = useState("");
    const [dni, setDni] = useState("");
    const [telefono, setTelefono] = useState("");
    const [idEditar, setIdEditar] = useState(null);
    const [busqueda, setBusqueda] = useState("");

    const clientesFiltrados = clientes.filter((cliente) => {

        const texto = busqueda.toLowerCase();
        return (
            cliente.nomb_cli.toLowerCase().includes(texto) ||
            cliente.ape_cli.toLowerCase().includes(texto) ||
            cliente.dni.includes(texto) ||
            (cliente.telefono && cliente.telefono.includes(texto))
        );
    });

    const cargarClientes = async () => {
        try {
            const respuesta = await api.get("/clientes");
            console.log(respuesta.data);
            setClientes(respuesta.data);
        } catch (error) {
            console.error("Error al cargar clientes", error);
        }
    };

    useEffect(() => {
        cargarClientes();
    }, []);

    const guardarCliente = async () => {

        try {
            // Validar campos vacíos
            if (
                nomb_cli.trim() === "" ||
                ape_cli.trim() === "" ||
                dni.trim() === "" ||
                telefono.trim() === ""
            ) {
                alertaAdvertencia("Campos incompletos", "Debe completar todos los campos.");
                return;
            }

            // Validar DNI
            if (!/^\d{8}$/.test(dni)) {
                alertaAdvertencia("DNI inválido", "El DNI debe contener exactamente 8 dígitos.");
                return;
            }

            // Validar teléfono
            if (!/^\d{9}$/.test(telefono)) {
                alertaAdvertencia("Teléfono inválido", "El teléfono debe contener exactamente 9 dígitos.");
                return;
            }

            await api.post("/clientes/", {
                nomb_cli,
                ape_cli,
                dni,
                telefono
            });

            cargarClientes();
            limpiarFormulario();

            alertaExito("Registro exitoso", "Cliente registrado correctamente.");

        } catch (error) {
            console.error(error);
            alertaError("Error", "No se pudo registrar el cliente.");
        }
    };

    const editarCliente = (cliente) => {

        setIdEditar(cliente.id_cliente);

        setNombCli(cliente.nomb_cli);
        setApeCli(cliente.ape_cli);
        setDni(cliente.dni);
        setTelefono(cliente.telefono);

    };

    const actualizarCliente = async () => {

        try {
            // Validar campos vacíos
            if (
                nomb_cli.trim() === "" ||
                ape_cli.trim() === "" ||
                dni.trim() === "" ||
                telefono.trim() === ""
            ) {
                alertaAdvertencia("Campos incompletos", "Debe completar todos los campos.");
                return;
            }

            // Validar DNI
            if (!/^\d{8}$/.test(dni)) {
                alertaAdvertencia("DNI inválido", "El DNI debe contener exactamente 8 dígitos.");
                return;
            }

            // Validar teléfono
            if (!/^\d{9}$/.test(telefono)) {
                alertaAdvertencia("Teléfono inválido","El teléfono debe contener exactamente 9 dígitos.");
                return;
            }

            await api.put(`/clientes/${idEditar}`, {
                nomb_cli,
                ape_cli,
                telefono
            });

            cargarClientes();
            limpiarFormulario();

            alertaExito("Actualización exitosa", "Cliente actualizado correctamente.");
        }

        catch(error){
            console.error(error);
            alertaError("Error", "No se pudo actualizar el cliente.");
        }

    };

    const limpiarFormulario = () => {

        setIdEditar(null);

        setNombCli("");
        setApeCli("");
        setDni("");
        setTelefono("");
    };
    
    const eliminarCliente = async (id) => {

        const confirmar = await confirmarEliminar("El cliente será eliminado permanentemente.");
        if (!confirmar) return;

        try {
            await api.delete(`/clientes/${id}`);

            cargarClientes();
            alertaExito("Eliminado", "Cliente eliminado correctamente.");

        } catch (error) {

            console.error(error);
            alertaError("Error", "No se pudo eliminar el cliente.");
        }
    };
    return (

        <>
            <Menu />
            <div className="contenido">

                <Header titulo="Clientes" />

                <div className="clientes-contenido">

                    <div className="row">

                        <div className="col-md-4">

                            <div className="card shadow">

                                <div className="card-header">

                                    <h5>
                                        <i className="bi bi-person-plus-fill me-2"></i>
                                        {idEditar ? "Editar Cliente" : "Registrar Cliente"}
                                    </h5>

                                </div>
                                <div className="card-body">

                                    <div className="mb-3">
                                        <label>Nombre</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={nomb_cli}
                                            onChange={(e) => setNombCli(e.target.value)}
                                        />
                                    </div>

                                    <div className="mb-3">

                                        <label>Apellido</label>

                                        <input
                                            type="text"
                                            className="form-control"
                                            value={ape_cli}
                                            onChange={(e) => setApeCli(e.target.value)}
                                        />

                                    </div>

                                    <div className="mb-3">

                                        <label>DNI</label>

                                        <input
                                            type="text"
                                            className="form-control"
                                            value={dni}
                                            onChange={(e) => setDni(e.target.value)}
                                        />

                                    </div>

                                    <div className="mb-3">

                                        <label>Teléfono</label>

                                        <input
                                            type="text"
                                            className="form-control"
                                            value={telefono}
                                            onChange={(e) => setTelefono(e.target.value)}
                                        />

                                    </div>

                                    <button
                                        className="btn btn-success"
                                        onClick={idEditar ? actualizarCliente : guardarCliente}
                                    >
                                        <i className={`bi ${idEditar ? "bi-pencil-square" : "bi-person-plus-fill"} me-2`}></i>
                                        {idEditar ? "Actualizar" : "Guardar"}
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

                        <div className="col-md-8">

                            <div className="card shadow">

                                <div className="card-header">

                                    <h5>
                                        <i className="bi bi-people-fill me-2"></i>
                                        Clientes registrados
                                    </h5>

                                </div>

                                <div className="card-body">
                                    <div className="mb-3">

                                        <div className="input-group">

                                            <span className="input-group-text">
                                                <i className="bi bi-search"></i>
                                            </span>

                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Buscar cliente por nombre, apellido, DNI o teléfono..."
                                                value={busqueda}
                                                onChange={(e) => setBusqueda(e.target.value)}
                                            />

                                        </div>

                                    </div>

                                    <table className="table table-hover">

                                        <thead>

                                            <tr>
                                                <th>ID</th>
                                                <th>Nombre</th>
                                                <th>Apellido</th>
                                                <th>DNI</th>
                                                <th>Teléfono</th>
                                                <th>Acciones</th>
                                            </tr>

                                        </thead>

                                        <tbody>

                                            {clientesFiltrados.length === 0 ? (

                                                <tr>
                                                    <td colSpan="6" className="text-center">
                                                        {clientes.length === 0
                                                            ? "No existen clientes registrados"
                                                            : "No se encontraron clientes con esa búsqueda"
                                                        }
                                                    </td>
                                                </tr>

                                            ) : (

                                                clientesFiltrados.map((cliente) => (

                                                    <tr key={cliente.id_cliente}>
                                                        <td>{cliente.id_cliente}</td>
                                                        <td>{cliente.nomb_cli}</td>
                                                        <td>{cliente.ape_cli}</td>
                                                        <td>{cliente.dni}</td>
                                                        <td>{cliente.telefono}</td>
                                                        <td>
                                                            <button
                                                                className="btn btn-warning btn-sm me-2"
                                                                onClick={() => editarCliente(cliente)}
                                                                title="Editar cliente"
                                                            >
                                                                <i className="bi bi-pencil-square"></i>
                                                            </button>

                                                            <button
                                                                className="btn btn-danger btn-sm"
                                                                onClick={() => eliminarCliente(cliente.id_cliente)}
                                                                title="Eliminar cliente"
                                                            >
                                                                <i className="bi bi-trash-fill"></i>
                                                            </button>                                                
                                                        </td>
                                                    </tr>
                                                ))

                                            )}

                                        </tbody>

                                    </table>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </>

    );

}

export default Clientes;