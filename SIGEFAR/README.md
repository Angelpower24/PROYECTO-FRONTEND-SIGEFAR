# SIGEFAR — Sistema Integral de Gestión de Farmacia

## Descripción

SIGEFAR es un frontend desarrollado con React para la gestión de una farmacia.

El sistema permite administrar clientes, medicamentos, ventas y consultar el historial de actividades del sistema.

El frontend se comunica con una API desarrollada con FastAPI mediante Axios.

---

## Tecnologías utilizadas

- React
- Vite
- React Router DOM
- Axios
- Bootstrap
- Bootstrap Icons
- SweetAlert2
- CSS

---

## Requisitos

Antes de ejecutar el proyecto se necesita tener instalado:

- Node.js
- npm
- Backend de SIGEFAR ejecutándose en `http://localhost:8000`

---

## Instalación

### 1. Clonar el repositorio

```bash
git clone URL_DEL_REPOSITORIO
```

### 2. Entrar a la carpeta del proyecto

```bash
cd SIGEFAR
```

### 3. Instalar las dependencias

```bash
npm install
```

---

## Configuración de la API

El frontend utiliza Axios para comunicarse con el backend.

La conexión se encuentra configurada en:

```text
src/api/axios.js
```

Actualmente, el frontend utiliza la siguiente dirección:

```text
http://localhost:8000
```

Por lo tanto, el backend debe estar ejecutándose en dicha dirección para utilizar las funciones que requieren información de la API.

---

## Ejecución

Para iniciar el servidor de desarrollo, ejecutar:

```bash
npm run dev
```

Después de ejecutar el comando, Vite mostrará en la terminal la dirección donde se encuentra disponible la aplicación.

Normalmente será:

```text
http://localhost:5173
```

---

## Credenciales de prueba

El sistema cuenta con un usuario administrador configurado para realizar las pruebas de inicio de sesión.

```text
Usuario: angel flores
Contraseña: admin123
```

---

## Funcionalidades

### Inicio de sesión

Permite ingresar al sistema mediante usuario y contraseña.

Si las credenciales son incorrectas, se muestra una alerta indicando que el acceso fue denegado.

---

### Dashboard

Muestra un resumen general del sistema mediante tarjetas con información de:

- Clientes registrados.
- Medicamentos registrados.
- Ventas realizadas.
- Ingresos obtenidos.

También muestra una tabla con las últimas ventas registradas.

Las tarjetas de clientes, medicamentos y ventas permiten acceder directamente a sus respectivos módulos.

---

### Gestión de clientes

El módulo de clientes permite:

- Registrar clientes.
- Consultar clientes.
- Actualizar información.
- Eliminar clientes.
- Validar los datos ingresados.
- Mostrar alertas según el resultado de las operaciones.

---

### Gestión de medicamentos

El módulo de medicamentos permite:

- Registrar medicamentos.
- Consultar medicamentos.
- Actualizar información.
- Eliminar medicamentos.
- Gestionar precios.
- Gestionar stock.
- Buscar medicamentos.
- Validar los datos ingresados.

---

### Gestión de ventas

El módulo de ventas permite:

- Seleccionar clientes.
- Seleccionar medicamentos.
- Registrar cantidades.
- Validar la disponibilidad de stock.
- Calcular el total de la venta.
- Registrar ventas.
- Consultar las ventas realizadas.

---

### Registros

El módulo de registros permite consultar el historial de actividades realizadas en el sistema.

Cuenta con:

- Filtro por módulo.
- Filtro por acción.
- Búsqueda de registros.
- Limpieza de filtros.
- Eliminación del historial.
- Confirmación antes de eliminar los registros.

---

## Navegación

El sistema cuenta con un menú lateral que permite acceder a los diferentes módulos:

- Inicio
- Clientes
- Medicamentos
- Ventas
- Registros

El logo de SIGEFAR permite regresar al Dashboard.

El encabezado muestra:

- Título de la sección.
- Mensaje de bienvenida.
- Usuario administrador.
- Hora actual.

También permite realizar el cierre de sesión mediante una ventana de confirmación.

---

## Estructura del proyecto

```text
src/
├── api/
│   └── axios.js
│
├── assets/
│   └── imagenes/
│
├── components/
│   ├── header/
│   │   ├── header.jsx
│   │   └── header.css
│   │
│   └── menu/
│       ├── menu.jsx
│       └── menu.css
│
├── pages/
│   ├── clientes/
│   │   ├── clientes.jsx
│   │   └── clientes.css
│   │
│   ├── dashboard/
│   │   ├── dashboard.jsx
│   │   └── dashboard.css
│   │
│   ├── login/
│   │   ├── login.jsx
│   │   └── login.css
│   │
│   ├── medicamentos/
│   │   ├── medicamentos.jsx
│   │   └── medicamentos.css
│   │
│   ├── registros/
│   │   ├── registros.jsx
│   │   └── registros.css
│   │
│   └── ventas/
│       ├── ventas.jsx
│       └── ventas.css
│
├── utils/
│   └── alertas.js
│
├── App.jsx
└── main.jsx
```

---

## Componentes principales

### Menu

Componente reutilizable encargado de mostrar el menú lateral y las opciones de navegación del sistema.

### Header

Componente reutilizable encargado de mostrar el encabezado de cada sección, el usuario administrador y la hora actual.

### Alertas

El archivo `alertas.js` contiene funciones reutilizables para mostrar:

- Alertas de éxito.
- Alertas de error.
- Alertas de advertencia.
- Confirmaciones de eliminación.

Estas alertas utilizan SweetAlert2.

---

## Conexión con el backend

El frontend utiliza Axios para realizar las peticiones a la API.

La instancia principal de Axios se encuentra en:

```text
src/api/axios.js
```

El backend debe estar disponible en:

```text
http://localhost:8000
```

El frontend utiliza diferentes endpoints para obtener y modificar la información de:

- Clientes.
- Medicamentos.
- Ventas.
- Registros.

---

## Comandos disponibles

### Iniciar el proyecto

```bash
npm run dev
```

### Generar la versión de producción

```bash
npm run build
```

### Ejecutar una vista previa de producción

```bash
npm run preview
```

### Ejecutar el análisis del código

```bash
npm run lint
```

---

## Flujo general del sistema

```text
Inicio de sesión
       ↓
    Dashboard
       ↓
 ┌─────┼──────────┬───────────┐
 ↓     ↓          ↓           ↓
Clientes  Medicamentos  Ventas  Registros
                    ↓
              Historial de
               actividades
```

---

## Autor

Proyecto académico desarrollado para la gestión integral de una farmacia.