### API DE ARTICULOS

Esta API básica fue creada con el objetivo de administrar los artículos de un sistema de inventario.
Vas a tener la posibilidad de crear, editar, eliminar y consultar los artículos almacenados, filtrarlos por nombre, estado o ID, y manejar el registro e inicio de sesión basado en JWT.

## Requisitos para que puedas usar la API:

- Node.js
- PostgreSQL

## Instalación

- 1. Clona el repositorio: 
    https://github.com/Favio10/articulos-api.git

- 2. Ingresa al repo e instala las depencias necesarias
    npm install 

- 3. Crea en la raiz del proyecto un archivo .env, donde incluiras tus datos:
    LOCAL_DB_USER = aca_va_tu_usuario
    LOCAL_DB_PASSWORD = aca_va_tu_contraseña
    LOCAL_DB_HOST = localhost
    JWT_SECRET = aca_va_tu_clave_secreta

- 4. Inicia el servidor(npm run dev, levanta el servidor en modo desarrollo), deberias recibir un mensaje de que el servidor se encuentra corriendo 
    en el puerto 3000.



## Endpoints

Al utilizar la API podras realizar las operaciones CRUD mas comunes. A continuación 
estará detallado cada endpoint.

- 1. Obtener todos los articulos y filtrado.

    Con este metodo GET podras consultar todos los articulos almacenados.
    Tambien podes filtrar tu busqueda, por nombre, marca y estado, utilizando correctamente
    los parametros de consulta.

    Ejemplo: 
    GET/ articulos?nombre=lavarropas

- 2. Obtener articulo filtrado por ID.
        
        Con este metodo GET podes consultar por un ID de producto en particular.

        Ejemplo: 
        GET /articulos/122230id

- 3. Crear un producto.

    En esta caso estaras trabajando con un metodo POST al que tendras que pasarle los
    datos del producto que quieras almacenar en la base de datos. Los valores
    necesarios son nombre y marca.

    Ejemplo:
    Ruta: POST/articulos
    Cuerpo de solicitud: 
    {
        "nombre": "Lavarropa",
        "marca": "Drean"
    }

- 4. Actualizar un producto.
    
    Con este metodo PATCH tendrás la posibilidad de actualizar un producto ya almacenado en base de datos.
    A travez del ID del articulo accedes a modificar.

    Ejemplo:
    Ruta: PATCH /articulos/:id
    Cuerpo de solicitud: 
    {
        "marca": "Termolar"
    }

- 5. Eliminar un articulo:

    En este caso tambien usaremos un metodo PATCH el cual modificara el valor de estado de activacion
    del producto a Inactivo. De esta manera podemos seguir teniendo el registro del articulo en la base
    de datos, pero con la posibilidad de filtrar entre activo e inactivo.

    Ejemplo:
    Ruta: PATCH /articulos/:id
    Cuerpo de solicitud: 
    {
        "estado_de_activacion": "inactivo"
    }


    ## Endpoints

    Para interactuar con los endpoints antes mencionados, primero tenes que REGISTRARTE o INICIAR SESION.

    - Registro de usuario:
    
    Con este endpoint creas un nuevo usuario por medio del método POST.

    RUTA:
    POST /auth/registro

    Ejemplo de cuerpo de solicitud:
    {
    "email": "usuario@email.com",
    "password": "tu_contraseña"
    }


    - Inicio de sesión:

    Con este metodo POST inicias sesion y recibis tu token JWT.

    RUTA:
    POST /auth/login

    Ejemplo de cuerpo de solicitud:
    {
    "email": "usuario@email.com",
    "password": "tu_contraseña"
    }

    Una vez que lo obtenes, tenes que enviarlo mediante el headers de las peticiones protegidas.
    Ejemplo : Authorization: Bearer tu_token


    Tené en cuenta que el token JWT tiene una validez de 24 horas.