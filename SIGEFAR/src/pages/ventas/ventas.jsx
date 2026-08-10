// Importa los estilos del módulo de ventas.
import "./ventas.css";

// Importa los hooks para manejar estados y efectos y la conexión con la API.
import { useEffect, useState } from "react";
import api from "../../api/axios";

// Importa el menú lateral y el encabezado.
import Menu from "../../components/menu/menu";
import Header from "../../components/header/header";

// Importa SweetAlert2 para mostrar ventanas de alerta.
import Swal from "sweetalert2";

// Importa las funciones de alerta del sistema.
import {
    alertaExito,
    alertaError,
    alertaAdvertencia
} from "../../utils/alertas";

function Ventas() {

    // Guarda las ventas, clientes y medicamentos.
    const [ventas, setVentas] = useState([]);

    const [clientes, setClientes] = useState([]);
    const [medicamentos, setMedicamentos] = useState([]);

    // Guarda los datos de la venta.
    const [idCliente, setIdCliente] = useState("");
    const [idMedicamento, setIdMedicamento] = useState("");
    const [cantidad, setCantidad] = useState(1);

    // Controla el filtro de clientes.
    const [filtroCliente, setFiltroCliente] = useState("");

    // Guarda precio, stock y total de la venta.
    const [precio, setPrecio] = useState(0);
    const [stock, setStock] = useState(0);
    const [total, setTotal] = useState(0);

    // Obtiene todas las ventas.
    const cargarVentas = async () => {
        try {
            const respuesta = await api.get("/ventas");
            console.log(respuesta.data);
            setVentas(respuesta.data);
        } catch (error) {
            console.error("Error al cargar ventas:", error);
            alertaError("Error", "No se pudieron cargar las ventas.");
        }
    };

    // Obtiene las ventas de un cliente específico.
    const cargarVentasPorCliente = async (clienteId) => {
        try {
            if (!clienteId) {
                await cargarVentas();
                return;
            }
            const respuesta = await api.get(
                `/ventas/cliente/${clienteId}`
            );
            setVentas(respuesta.data);
        } catch (error) {

            console.error("Error al cargar ventas por cliente:",error);
            alertaError("Error", "No se pudieron cargar las ventas del cliente.");
        }
    };

    // Obtiene la lista de clientes.
    const cargarClientes = async () => {
        try {
            const respuesta = await api.get("/clientes/");
            setClientes(respuesta.data);
        } catch (error) {
            console.error("Error al cargar clientes:", error);
            alertaError("Error", "No se pudieron cargar los clientes.");
        }
    };

    // Obtiene la lista de medicamentos.
    const cargarMedicamentos = async () => {
        try {
            const respuesta = await api.get("/medicamentos/");
            setMedicamentos(respuesta.data);
        } catch (error) {

            console.error("Error al cargar medicamentos:", error);
            alertaError("Error","No se pudieron cargar los medicamentos.");
        }
    };

    // Carga los datos al iniciar el módulo.
    useEffect(() => {
        cargarVentas();
        cargarClientes();
        cargarMedicamentos();
    }, []);

    // Obtiene el precio y stock del medicamento seleccionado.
    useEffect(() => {
        if (!idMedicamento) {
            setPrecio(0);
            setStock(0);
            return;
        }

        const medicamentoSeleccionado = medicamentos.find(
            (medicamento) =>
                medicamento.id_medicamento === Number(idMedicamento)
        );

        if (medicamentoSeleccionado) {
            setPrecio(Number(medicamentoSeleccionado.precio));
            setStock(Number(medicamentoSeleccionado.stock));
        }
    }, [idMedicamento, medicamentos]);

    // Calcula el total según el precio y la cantidad.
    useEffect(() => {
        const cantidadNumerica = Number(cantidad);
        const totalCalculado =
            precio * cantidadNumerica;
        setTotal(totalCalculado);
    }, [precio, cantidad]);


    const registrarVenta = async () => {
        // VALIDAR CLIENTE
        if (!idCliente) {
            alertaAdvertencia("Cliente requerido", "Debe seleccionar un cliente.");
            return;
        }

        // VALIDAR MEDICAMENTO
        if (!idMedicamento) {
            alertaAdvertencia("Medicamento requerido", "Debe seleccionar un medicamento.");
            return;
        }

        // CONVERTIR CANTIDAD A NÚMERO
        const cantidadNumerica = Number(cantidad);
        // VALIDAR CANTIDAD
        if (
            !Number.isInteger(cantidadNumerica) ||
            cantidadNumerica <= 0
        ) {
            alertaAdvertencia("Cantidad inválida", "La cantidad debe ser un número entero mayor que cero.");
            return;
        }

        // VALIDAR STOCK
        if (cantidadNumerica > stock) {
            alertaAdvertencia("Stock insuficiente",`Solo hay ${stock} unidades disponibles.`)
            return;
        }

        // ==============================
        // REGISTRAR VENTA
        // ==============================
        try {
            await api.post("/ventas/", {
                id_cliente: Number(idCliente),
                id_medicamento: Number(idMedicamento),
                cantidad: cantidadNumerica
            });
            // RECARGAR VENTAS
            await cargarVentas();
            // RECARGAR MEDICAMENTOS
            // Esto permite actualizar el stock mostrado.
            await cargarMedicamentos();
            // LIMPIAR FORMULARIO
            setIdCliente("");
            setIdMedicamento("");
            setCantidad(1);
            setPrecio(0);
            setStock(0);
            setTotal(0);
            // MENSAJE DE ÉXITO
            alertaExito("Venta registrada", "La venta se registró correctamente.");
        } catch (error) {

            console.error("Error al registrar venta:", error);
            // ERROR DEVUELTO POR FASTAPI
            const mensaje =
                error.response?.data?.detail ||
                "No se pudo registrar la venta.";
            alertaError("Error", mensaje);
        }
    };

    // Muestra el detalle de una venta.
    const verVenta = async (id) => {
        try {
            const respuesta = await api.get(`/ventas/${id}`);
            const venta = respuesta.data;
            Swal.fire({
                title: "Detalle de la venta",
                html: `
                    <div class="text-start">
                        <p><strong>ID:</strong> ${venta.id_venta}</p>
                        <p><strong>Cliente:</strong> ${venta.nomb_cli} ${venta.ape_cli}</p>
                        <p><strong>Medicamento:</strong> ${venta.nomb_med}</p>
                        <p><strong>Cantidad:</strong> ${venta.cantidad}</p>
                        <p><strong>Fecha:</strong> ${venta.fecha_venta}</p>
                        <p><strong>Total:</strong> S/. ${Number(venta.total).toFixed(2)}</p>
                    </div>
                `,
                confirmButtonText: "Cerrar",
                confirmButtonColor: "#198754"
            });

        } catch (error) {
            console.error("Error al obtener la venta:", error);
            alertaError("Error", "No se pudo obtener el detalle de la venta.");
        }
    };

    return (
        
    <>

        <Menu />

        <div className="contenido">

            <Header titulo="Ventas" />

            <div className="ventas-contenido">

                <div className="row">

                    {/* ========================= */}
                    {/* FORMULARIO DE REGISTRO */}
                    {/* ========================= */}

                    <div className="col-md-4">

                        <div className="card shadow">

                            <div className="card-header">

                                <h5>

                                    <i className="bi bi-cart-plus-fill me-2"></i>

                                    Registrar Venta

                                </h5>

                            </div>

                            <div className="card-body">

                                {/* CLIENTE */}

                                <div className="mb-3">

                                    <label className="form-label"> Cliente </label>

                                    <select
                                        className="form-select"
                                        value={idCliente}
                                        onChange={(e) =>
                                            setIdCliente(e.target.value)
                                        }
                                    >
                                        <option value=""> Seleccionar cliente </option>

                                        {clientes.map((cliente) => (
                                            <option
                                                key={cliente.id_cliente}
                                                value={cliente.id_cliente}
                                            >
                                                {cliente.nomb_cli} {cliente.ape_cli}
                                            </option>
                                        ))}
                                    </select>

                                </div>

                                {/* MEDICAMENTO */}
                                <div className="mb-3">

                                    <label className="form-label"> Medicamento </label>

                                    <select
                                        className="form-select"
                                        value={idMedicamento}
                                        onChange={(e) =>
                                            setIdMedicamento(e.target.value)
                                        }
                                    >

                                        <option value=""> Seleccionar medicamento </option>

                                        {medicamentos.map((medicamento) => (
                                            <option
                                                key={medicamento.id_medicamento}
                                                value={medicamento.id_medicamento}
                                            >
                                                {medicamento.nomb_med}
                                            </option>
                                        ))}
                                    </select>

                                </div>

                                {/* CANTIDAD */}
                                <div className="mb-3">
                                    <label className="form-label"> Cantidad </label>
                                    <input
                                        type="number"
                                        min="1"
                                        className="form-control"
                                        value={cantidad}
                                        onChange={(e) =>
                                            setCantidad(e.target.value)
                                        }
                                    />
                                </div>

                                {/* INFORMACIÓN DEL MEDICAMENTO */}

                                { idMedicamento && (

                                    <div className="mb-3">

                                        <div className="alert alert-info">

                                            <div>
                                                <strong>Precio:</strong>{" "}
                                                S/. {precio.toFixed(2)}
                                            </div>

                                            <div>
                                                <strong>Stock disponible:</strong>{" "}
                                                {stock}
                                            </div>

                                            <hr />

                                            <div>
                                                <strong>Total:</strong>{" "}
                                                S/. {total.toFixed(2)}
                                            </div>

                                        </div>

                                    </div>

                                )}

                                {/* BOTÓN */}
                                <button
                                    className="btn btn-success"
                                    type="button"
                                    onClick={registrarVenta}
                                >
                                    <i className="bi bi-cart-check-fill me-2"></i>
                                    Registrar Venta
                                </button>

                            </div>

                        </div>

                    </div>


                    {/* ========================= */}
                    {/* TABLA DE VENTAS */}
                    {/* ========================= */}

                    <div className="col-md-8">

                        <div className="card shadow">

                            <div className="card-header">

                                <div className="d-flex justify-content-between align-items-center">

                                    <h5 className="mb-0">
                                        <i className="bi bi-cart-check-fill me-2"></i>
                                        Ventas registradas
                                    </h5>

                                    {/* Filtro de ventas por cliente. */}
                                    <div className="d-flex align-items-center gap-2">

                                        <label className="mb-0">
                                            Filtrar cliente:
                                        </label>

                                        <select
                                            className="form-select"
                                            value={filtroCliente}
                                            onChange={(e) => {
                                                const clienteId = e.target.value;
                                                setFiltroCliente(clienteId);
                                                cargarVentasPorCliente(clienteId);
                                            }}
                                        >
                                            <option value="">
                                                Todos los clientes
                                            </option>

                                            {clientes.map((cliente) => (
                                                <option
                                                    key={cliente.id_cliente}
                                                    value={cliente.id_cliente}
                                                >
                                                    {cliente.nomb_cli} {cliente.ape_cli}
                                                </option>
                                            ))}

                                        </select>

                                    </div>

                                </div>

                            </div>

                            <div className="card-body">

                                <div className="table-responsive">

                                    <table className="table table-hover">

                                        <thead>

                                            <tr>
                                                <th>ID</th>
                                                <th>Cliente</th>
                                                <th>Medicamento</th>
                                                <th>Cantidad</th>
                                                <th>Fecha</th>
                                                <th>Total</th>
                                                <th>Acciones</th>
                                            </tr>

                                        </thead>

                                        <tbody>

                                            {ventas.length === 0 ? (

                                                <tr>
                                                    <td
                                                        colSpan="7"
                                                        className="text-center"
                                                    >
                                                        No existen ventas registradas
                                                    </td>
                                                </tr>

                                            ) : (

                                                ventas.map((venta) => (

                                                    <tr key={venta.id_venta}>
                                                        <td>{venta.id_venta}</td>
                                                        <td>{venta.nomb_cli}{" "}{venta.ape_cli}</td>
                                                        <td>{venta.nomb_med}</td>
                                                        <td>{venta.cantidad}</td>
                                                        <td>{venta.fecha_venta}</td>

                                                        <td>
                                                            S/.{" "}
                                                            {Number(
                                                                venta.total
                                                            ).toFixed(2)}
                                                        </td>

                                                        <td>
                                                            S/.{" "}
                                                            {Number(
                                                                venta.total
                                                            ).toFixed(2)}
                                                        </td>
                                                        <td>

                                                            <button
                                                                className="btn btn-primary btn-sm"
                                                                type="button"
                                                                onClick={() => verVenta(venta.id_venta)}
                                                            >
                                                                <i className="bi bi-eye-fill me-1"></i>
                                                                Ver
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

        </div>

    </>

);

}

export default Ventas;