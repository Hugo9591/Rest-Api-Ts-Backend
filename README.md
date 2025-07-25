# REST-API

## Descrpcion
Esta es una API REST que hice como práctica para aprender mejor cómo funciona una API en Node. Usé Express con TypeScript y la conecté a una base de datos usando Sequelize como ORM. 
La base de datos la manejo desde TablePlus, la API permite hacer peticiones con los métodos GET, POST, PUT, PATCH y DELETE.

## Tecnologías
Express – Para crear el servidor y las rutas.
TypeScript – Para tener tipado y más control en el desarrollo.
Sequelize – ORM para trabajar con la base de datos sin escribir SQL directamente.
TablePlus – Para visualizar y manejar la base de datos.
Nodemon – Para reiniciar el servidor automáticamente cuando hay cambios.
CORS – Para aceptar solicitudes desde el frontend.
Jest y Supertest – Para hacer testing de la API y los endpoints.
Swagger – Para documentar la API de forma visual.
Thunder Client – Cliente tipo Postman, pero integrado en VS Code, lo usé para probar los endpoints mientras la desarrollaba.

# Instalacion
  - Clona el repo:
  git clone https://github.com/Hugo9591/Rest-Api-Ts-Backend.git

  - Instala las dependencias:
  npm install

  - Crea un archivo .env con tus variables (como la URL del frontend para CORS, la URL de la base de datos, etc.).

  - Corre el servidor en modo desarrollo:
  npm run dev
Cada vez que hagas cambios en el código, nodemon reiniciará el servidor automáticamente.

# Sobre la API
La API tiene varias rutas agrupadas en un solo archivo y desde ahí se manejan los controladores. Los datos se validan y se guardan en la base de datos usando Sequelize.

También agregué Swagger para documentar todos los endpoints, así es más fácil ver qué parámetros acepta cada ruta y probarlos ahi mismo.

# Testing
Incluye pruebas con Jest y Supertest. Hay tests para verificar que los endpoints funcionen bien, devuelvan los datos correctos y que no fallen cuando se les manda algo incorrecto.
npm run test
