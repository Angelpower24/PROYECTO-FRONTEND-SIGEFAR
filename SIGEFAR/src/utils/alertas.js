// Importa SweetAlert2 para mostrar alertas.
import Swal from "sweetalert2";

// Muestra una alerta de éxito.
export const alertaExito = (titulo, mensaje) => {

    Swal.fire({
        icon: "success",
        title: titulo,
        text: mensaje,
        confirmButtonColor: "#198754"
    });

};

// Muestra una alerta de error.
export const alertaError = (titulo, mensaje) => {

    Swal.fire({
        icon: "error",
        title: titulo,
        text: mensaje,
        confirmButtonColor: "#dc3545"
    });

};

// Muestra una alerta de advertencia.
export const alertaAdvertencia = (titulo, mensaje) => {

    Swal.fire({
        icon: "warning",
        title: titulo,
        text: mensaje,
        confirmButtonColor: "#ffc107"
    });

};

// Muestra una confirmación antes de eliminar.
export const confirmarEliminar = async (mensaje) => {

    const resultado = await Swal.fire({

        title: "¿Está seguro?",
        text: mensaje,
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Eliminar",
        cancelButtonText: "Cancelar",
        confirmButtonColor: "#dc3545",
        cancelButtonColor: "#6c757d"
    });

    return resultado.isConfirmed;

};