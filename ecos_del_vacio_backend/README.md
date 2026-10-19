# Ecos del Vacío — Backend API

Backend de ejemplo para el Proyecto Integrador **Ecos del Vacío**, organizado con Node.js, Express, PostgreSQL y arquitectura MVC. Incluye endpoints REST y una colección de Postman.

## 1. Requisitos

- Node.js (versión LTS recomendada).
- PostgreSQL instalado y funcionando.
- Visual Studio Code.
- Postman.

## 2. Crear la base de datos

Abrí pgAdmin o la terminal de PostgreSQL y creá una base de datos llamada `ecos_del_vacio`.

```sql
CREATE DATABASE ecos_del_vacio;
```

Seleccioná esa base de datos y ejecutá, en este orden:

1. `database/01_schema.sql` — DDL: crea tablas, claves, relaciones, restricciones e índices.
2. `database/02_seed.sql` — DML: carga personajes, finales y decisiones de ejemplo.

También podés abrir cada archivo y ejecutarlo desde el Query Tool de pgAdmin.

## 3. Configurar el proyecto

Abrí una terminal en la carpeta del proyecto y ejecutá:

```bash
npm install
```

Copiá `.env.example` a un archivo llamado `.env` y completá los datos de tu PostgreSQL. Por ejemplo:

```env
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_NAME=ecos_del_vacio
DB_USER=postgres
DB_PASSWORD=TU_CLAVE_DE_POSTGRES
```

No compartas ni subas el archivo `.env` a GitHub. Está excluido mediante `.gitignore`.

## 4. Ejecutar

Modo normal:

```bash
npm start
```

Modo desarrollo (reinicia al cambiar archivos):

```bash
npm run dev
```

Si la conexión y el servidor están bien, la terminal mostrará que la conexión con PostgreSQL fue correcta y que la API funciona en `http://localhost:3000`.

Probá primero en el navegador:

- `http://localhost:3000/`
- `http://localhost:3000/api/health`

## 5. Endpoints disponibles

Todas las rutas comienzan con `http://localhost:3000`.

| Método | Endpoint | Función |
|---|---|---|
| GET | `/api/health` | Comprueba que la API está activa |
| GET | `/api/personajes` | Lista personajes |
| GET | `/api/personajes/:id` | Obtiene un personaje |
| POST | `/api/personajes` | Crea un personaje |
| PUT | `/api/personajes/:id` | Modifica un personaje |
| DELETE | `/api/personajes/:id` | Elimina un personaje si no está referenciado |
| GET | `/api/finales` | Lista los finales |
| GET | `/api/finales/:id` | Obtiene un final |
| GET | `/api/decisiones` | Lista decisiones |
| GET | `/api/decisiones?escena=Bosque%20antiguo` | Filtra decisiones por escena |
| GET | `/api/decisiones/:id` | Obtiene una decisión |
| GET | `/api/partidas` | Lista partidas con personaje y final |
| GET | `/api/partidas/:id` | Obtiene una partida |
| POST | `/api/partidas` | Crea una partida |
| PATCH | `/api/partidas/:id/finalizar` | Asocia un final y marca la partida como finalizada |

### Ejemplos de cuerpos JSON

Crear personaje (`POST /api/personajes`):

```json
{
  "nombre": "Guardián",
  "descripcion": "Protege los senderos del bosque.",
  "habilidad": "Defensa"
}
```

Crear partida (`POST /api/partidas`):

```json
{
  "jugador": "Jugador de prueba",
  "personaje_id": 1
}
```

Finalizar partida (`PATCH /api/partidas/1/finalizar`):

```json
{
  "final_id": 1
}
```

En Postman seleccioná el método, ingresá la URL, elegí **Body → raw → JSON** para solicitudes con cuerpo y presioná **Send**. Las respuestas exitosas deben mostrar JSON y códigos como `200 OK` o `201 Created`.

## 6. Importar la colección de Postman

1. Abrí Postman.
2. Seleccioná **Import**.
3. Elegí `postman/Ecos-del-Vacio.postman_collection.json`.
4. Ejecutá primero `Estado API`, después las consultas GET.
5. Para probar crear, modificar y finalizar, verificá los IDs disponibles en las respuestas y actualizá las variables `personajeId`, `partidaId` y `finalId` si fuera necesario.

**Importante:** las peticiones de creación y modificación cambian la base de datos. La petición de eliminación borra el personaje y puede ser rechazada si una partida lo referencia.

## 7. Arquitectura MVC

- **Model (Modelo):** `src/models/` contiene las consultas SQL y el acceso a PostgreSQL.
- **View (Vista):** en una API REST, las respuestas JSON cumplen el papel de salida que consume el frontend; no se usan plantillas HTML en este backend.
- **Controller (Controlador):** `src/controllers/` valida la entrada, coordina los modelos y define los códigos de respuesta.
- **Routes (Rutas):** `src/routes/` relaciona las URL y métodos HTTP con los controladores.
- **Config:** `src/config/db.js` centraliza la conexión con la base de datos.
- **Middlewares:** gestionan rutas inexistentes y errores.

## 8. Estructura de carpetas

```text
ecos_del_vacio_backend/
├── database/
│   ├── 01_schema.sql
│   └── 02_seed.sql
├── postman/
│   └── Ecos-del-Vacio.postman_collection.json
├── src/
│   ├── config/db.js
│   ├── controllers/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   ├── app.js
│   └── server.js
├── .env.example
├── .gitignore
├── package.json
└── README.md
```

## 9. Subir a GitHub

Creá un repositorio vacío en GitHub, sin agregar README ni licencia (ya están en este proyecto). Luego, desde la terminal ubicada en la carpeta del proyecto:

```bash
git init
git add .
git commit -m "Entrega inicial del backend Ecos del Vacío"
git branch -M main
git remote add origin https://github.com/TU-USUARIO/TU-REPOSITORIO.git
git push -u origin main
```

Reemplazá la URL de ejemplo por la URL real del repositorio. Nunca subas `.env` ni contraseñas.

## 10. Qué demostrar en la entrega

1. Que el servidor inicia y conecta a PostgreSQL.
2. Que los endpoints GET consultan información guardada en la base.
3. Que POST inserta un personaje o partida.
4. Que PUT modifica un personaje.
5. Que PATCH guarda el final de una partida.
6. Que las respuestas de error usan códigos HTTP apropiados.
7. Que el repositorio contiene código, SQL, README y colección Postman.

## Alcance

Este backend es una base funcional de API para registrar personajes, decisiones, finales y partidas del universo narrativo de **Ecos del Vacío**. No reemplaza ni implementa automáticamente el videojuego completo en Godot; sirve como backend demostrable para la consigna de Node.js, Express, MVC, PostgreSQL y Postman.
