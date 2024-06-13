# Banco Solar

Banco Solar es una aplicación web para la gestión de usuarios y transferencias bancarias, construida con Node.js y PostgreSQL.

## Descripción

La aplicación permite:
- Registrar nuevos usuarios con un balance inicial.
- Realizar transferencias de saldo entre usuarios.
- Editar y eliminar usuarios.
- Ver todas las transferencias realizadas.

## Tecnologías

- Node.js
- Express
- PostgreSQL
- Bootstrap
- jQuery

## Instalación

1. Clonar el repositorio:

    ```bash
    git clone https://github.com/tu-usuario/banco-solar.git
    cd banco-solar
    ```

2. Instalar las dependencias:

    ```bash
    npm install
    ```

3. Configurar la base de datos PostgreSQL:

    ```sql
    CREATE DATABASE bancosolar;

    CREATE TABLE usuarios (
        id SERIAL PRIMARY KEY,
        nombre VARCHAR(50),
        balance FLOAT CHECK (balance >= 0)
    );

    CREATE TABLE transferencias (
        id SERIAL PRIMARY KEY,
        emisor INT REFERENCES usuarios(id) ON DELETE CASCADE,
        receptor INT REFERENCES usuarios(id) ON DELETE CASCADE,
        monto NUMERIC(10, 2) NOT NULL,
        fecha TIMESTAMP NOT NULL DEFAULT NOW()
    );
    ```

4. Crear un archivo `.env` en la raíz del proyecto con las siguientes variables de entorno:

    ```env
    DB_HOST=localhost
    DB_USER=tu_usuario
    DB_PASSWORD=tu_contraseña
    DB_NAME=bancosolar
    ```

5. Ejecutar la aplicación:

    ```bash
    npm start
    ```

    O para ejecutar en modo desarrollo con `nodemon`:

    ```bash
    npm run dev
    ```

6. Abrir en el navegador `http://localhost:3000`.

## Estructura de Archivos

```lua
banco-solar/
│
├── config/
│   └── db.js              # Configuración de la base de datos
│
├── controllers/
│   ├── usuariosController.js  # Controlador para las rutas de usuarios
│   └── transferenciasController.js  # Controlador para las rutas de transferencias
│
├── public/
│   ├── assets/
│   │   └── css/
│   │       └── style.css  # Estilos personalizados
│   └── index.html         # Interfaz de usuario
│
├── routes/
│   ├── usuarios.js        # Rutas para usuarios
│   └── transferencias.js  # Rutas para transferencias
│
├── .env                   # Variables de entorno
├── index.js               # Archivo principal del servidor
├── package.json           # Dependencias y scripts
└── README.md              # Documentación del proyecto
```

## Dependencias

- [express](https://www.npmjs.com/package/express) - Framework web para Node.js
- [pg](https://www.npmjs.com/package/pg) - Cliente PostgreSQL para Node.js
- [dotenv](https://www.npmjs.com/package/dotenv) - Carga variables de entorno desde un archivo `.env`
- [nodemon](https://www.npmjs.com/package/nodemon) - Herramienta para reiniciar automáticamente el servidor en desarrollo

## Uso

### Rutas de la API

- `GET /` - Devuelve la aplicación cliente.
- `POST /usuario` - Crea un nuevo usuario.
- `GET /usuarios` - Devuelve todos los usuarios registrados.
- `PUT /usuario` - Actualiza los datos de un usuario.
- `DELETE /usuario` - Elimina un usuario.
- `POST /transferencia` - Realiza una nueva transferencia.
- `GET /transferencias` - Devuelve todas las transferencias realizadas.

### Ejemplos de Peticiones

#### Crear un nuevo usuario

```bash
curl -X POST http://localhost:3000/usuario -H "Content-Type: application/json" -d '{"nombre": "Juan", "balance": 1000}'
```

#### Realizar una transferencia

```bash
curl -X POST http://localhost:3000/transferencia -H "Content-Type: application/json" -d '{"emisor": "Juan", "receptor": "Maria", "monto": 100}'
```

#### Obtener todos los usuarios

```bash
curl http://localhost:3000/usuarios
```

#### Obtener todas las transferencias

```bash
curl http://localhost:3000/transferencias
```

## Contribuciones

Las contribuciones son bienvenidas. Por favor, abre un issue para discutir cualquier cambio que te gustaría realizar.
