// Importa los estilos del Dashboard y la herramienta para crear enlaces entre páginas.
import "./dashboard.css";
import { Link } from "react-router-dom";

// Importa el menú lateral y el encabezado.
import Menu from "../../components/menu/menu";
import Header from "../../components/header/header";

// Importa los hooks para manejar estados y efectos y la conexión con la API.
import { useEffect, useState } from "react";
import api from "../../api/axios";

function Dashboard(){

    // Almacena los datos de clientes, medicamentos y ventas.
    const [clientes, setClientes] = useState([]);
    const [medicamentos, setMedicamentos] = useState([]);
    const [ventas, setVentas] = useState([]);

    // Carga los datos del Dashboard al iniciar.
    useEffect(() => {

        const cargarDashboard = async () => {

            try {

                const respuestaClientes = await api.get("/clientes/");
                const respuestaMedicamentos = await api.get("/medicamentos/");
                const respuestaVentas = await api.get("/ventas/");

                setClientes(respuestaClientes.data);
                setMedicamentos(respuestaMedicamentos.data);
                setVentas(respuestaVentas.data);

            } catch (error) {

                console.error(
                    "Error al cargar datos del Dashboard:",
                    error
                );

            }

        };

        cargarDashboard();

    }, []);

    // Calcula el total de ingresos de las ventas.
    const ingresos = ventas.reduce(
        (acumulado, venta) =>
            acumulado + Number(venta.total),
        0
    );

    return(

        <>

            <Menu/>

            <div className="contenido">

                <Header titulo="Dashboard"/>

                <div className="dashboard">

                    {/* Tarjetas con acceso a los módulos. */}
                    <Link to="/clientes" className="card-link">
                        <div className="card-dashboard card-clientes">
                            <h5>Clientes</h5>
                            <h2>{clientes.length}</h2>
                        </div>
                    </Link>

                    <Link to="/medicamentos" className="card-link">
                        <div className="card-dashboard card-medicamentos">
                            <h5>Medicamentos</h5>
                            <h2>{medicamentos.length}</h2>
                        </div>
                    </Link>

                    <Link to="/ventas" className="card-link">
                        <div className="card-dashboard card-ventas">
                            <h5>Ventas</h5>
                            <h2>{ventas.length}</h2>
                        </div>
                    </Link>

                    <div className="card-dashboard card-ingresos">

                        <h5>Ingresos</h5>
                        <h2>S/. {ingresos.toFixed(2)}</h2>

                    </div>

                </div>

                {/* Muestra las últimas ventas registradas. */}
                <div className="tabla">

                    <div className="card shadow">

                        <div className="card-header">

                            Últimas Ventas

                        </div>

                        <div className="card-body">

                            <table className="table table-hover">

                                <thead>

                                    <tr>
                                        <th className="text-center">ID</th>
                                        <th className="text-center">Fecha</th>
                                        <th className="text-center">Cliente</th>
                                        <th className="text-center">Medicamento</th>
                                        <th className="text-center">Cantidad</th>
                                        <th className="text-center">Total</th>
                                    </tr>

                                </thead>

                                <tbody>

                                    {ventas.length === 0 ? (

                                        <tr>
                                            <td
                                                colSpan="5"
                                                className="text-center"
                                            >
                                                No existen ventas registradas
                                            </td>
                                        </tr>

                                    ) : (

                                        ventas
                                            .slice(0, 5)
                                            .map((venta) => (

                                                <tr key={venta.id_venta}>
                                                    <td className="text-center"> {venta.id_venta} </td>
                                                    <td className="text-center"> {venta.fecha_venta} </td>
                                                    <td className="text-center"> {venta.nomb_cli} {venta.ape_cli} </td>
                                                    <td className="text-center"> {venta.nomb_med} </td>
                                                    <td className="text-center"> {venta.cantidad} </td>
                                                    <td className="text-center"> S/.{" "} {Number(venta.total).toFixed(2)} </td>
                                                </tr>

                                            ))

                                    )}

                                </tbody>

                            </table>

                        </div>

                    </div>

                </div>

            </div>

        </>

    )

}

export default Dashboard;