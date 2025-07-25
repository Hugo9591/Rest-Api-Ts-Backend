import request from 'supertest'
import server, { connectDB } from '../../server'
import db from '../../config/db'

//PRuebas con el metodo POST
describe('POST /api/products', () => {

    it('Should display validation error', async () => {
        const response = await request(server).post('/api/products').send({})

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors).toHaveLength(4)

        expect(response.status).not.toBe(404);
        expect(response.body.errors).not.toHaveLength(2)

    })

    it('Should validate that the price is greater than 0', async () => {
        const response = await request(server).post('/api/products').send({
            name: "monitor - Testing",
            price: 0
        })

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors).toHaveLength(1)

        expect(response.status).not.toBe(404);
        expect(response.body.errors).not.toHaveLength(2)

    })

    it('Should validate that the price is a number and greater than 0', async () => {
        const response = await request(server).post('/api/products').send({
            name: "monitor - Testing",
            price: "hola"
        })

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors).toHaveLength(2)

        expect(response.status).not.toBe(404);
        expect(response.body.errors).not.toHaveLength(4)

    })

    it('should create a new product', async () => {
        const response = await request(server).post('/api/products').send({
            name: "Mouse - Testing",
            price: 300
            })

            expect(response.status).toBe(201);
            expect(response.body).toHaveProperty('data')

            expect(response.status).not.toBe(404)
            expect(response.status).not.toBe(200);
            expect(response.body).not.toHaveProperty('errors')
    })
})

//Pruebas con GET
describe('GET /api/products', () => {
    it('Should check if api/products url exist', async () => {
        const response = await request(server).get('/api/products')

        expect(response.status).not.toBe(404);
    })

    it('Get a json response with products', async () => {
        const response = await request(server).get('/api/products')

        expect(response.status).toBe(200);
        expect(response.headers['content-type']).toMatch(/json/)
        expect(response.body).toHaveProperty('data');
        expect(response.body.data).toHaveLength(1);

        expect(response.body).not.toHaveProperty('errors');

    })
})

//Obtener produc con id invalido
describe('Get api/products/:id', () => {
    it('Should return a 404 response for a non-existent product', async () => {
        const productId = 2000;
        const response = await request(server).get(`/api/products/${productId}`)

        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty('error');
        expect(response.body.error).toBe('Producto No Encontrado')
    })

    //Url no valida
    it('Should check a valid id in the url', async () =>{
        const response = await request(server).get(`/api/products/not-valid-url`)

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('errors');
        expect(response.body.errors).toHaveLength(1)
        expect(response.body.errors[0].msg).toBe('ID no válido')

    })

    //Obtener product con un id valido
    it('get a JSON response for a single product', async () =>{
        const response = await request(server).get(`/api/products/1`)

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('data');
        
    })



})

//Actualizar product mensajes campos vacios
describe('PUT /api/products/:id', () => {

        it('Should check a valid id in the url', async () =>{
        const response = await request(server).put(`/api/products/not-valid-url`).send({
                name: "Monitor Curvo de 34 Pulgadas",
                price: 300,
                availability: true
            });

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('errors');
        expect(response.body.errors).toHaveLength(1)
        expect(response.body.errors[0].msg).toBe('ID no válido')

    })

    it('Should display validation error messages when updatiing a product', async () =>{
        const response = await request(server).put(`/api/products/1`).send({});

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('errors');
        expect(response.body.errors).toBeTruthy();
        expect(response.body.errors).toHaveLength(5);

        expect(response.status).not.toBe(200);
        expect(response.body).not.toHaveProperty('data');
    })

    //Mayor a cero
    it('Should validate that the price is greater than 0', async () =>{
        const response = await request(server).put(`/api/products/1`).send({
            name: "Monitor Curvo de 34 Pulgadas",
            price: 0,
            availability: true
            });

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('errors');
        expect(response.body.errors).toBeTruthy();
        expect(response.body.errors).toHaveLength(1);
        expect(response.body.errors[0].msg).toBe('Precio no válido')
        
        expect(response.status).not.toBe(200);
        expect(response.body).not.toHaveProperty('data');
    })

    //Existe el producto
    it('Should return a 404 response for a non-existent preduct', async () =>{
        const productId = 2000
        const response = await request(server).put(`/api/products/${productId}`).send({
            name: "Monitor Curvo de 34 Pulgadas",
            price: 300,
            availability: true
            });

        expect(response.status).toBe(404);
        expect(response.body.error).toBe('Producto No Encontrado');
        
        expect(response.status).not.toBe(200);
        expect(response.body).not.toHaveProperty('data');
    })

    //Actualizar
    it('Should update an existing product with valid data', async () =>{
        const response = await request(server).put(`/api/products/1`).send({
                name: "Monitor Curvo de 34 Pulgadas",
                price: 300,
                availability: true
            });

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('data');
        
        expect(response.status).not.toBe(400);
        expect(response.body).not.toHaveProperty('errors');
    })
})

describe('PATCH /api/products/:id', () => {

    it('Should return a 404 response for a non-existing product', async () =>{
        const productId = 2000
        const response = await request(server).patch(`/api/products/${productId}`)

        expect(response.status).toBe(404);
        expect(response.body.error).toBe('Producto No Encontrado');

        expect(response.status).not.toBe(200)
        expect(response.body).not.toHaveProperty('data')

    })

    it('Should update the product availability', async () =>{
        const response = await request(server).patch(`/api/products/2`)

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('data');
        expect(response.body.availability).toBe(false);

        expect(response.status).not.toBe(404)
        expect(response.status).not.toBe(400)
        expect(response.body).not.toHaveProperty('error')

    })

})

//Eliminar
describe('DELETE /api/products/:id',() =>{

    it('Should check a valid id', async () =>{

        const response = await request(server).delete('/api/products/not-valid')

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('errors');
        expect(response.body.errors[0].msg).toBe('ID no válido')

    })

    it('Should return a 404 response for a non-existent product', async () =>{

        const productId = 2000
        const response = await request(server).delete(`/api/products/${productId}`)

        expect(response.status).toBe(404);
        expect(response.body.error).toBe('Producto No Encontrado');

        expect(response.status).not.toBe(200)

    })

    //Eliminar
    it('Should delete a product', async () =>{

        const response = await request(server).delete(`/api/products/1`)

        expect(response.status).toBe(200);
        expect(response.body.data).toBe('Producto Eliminado');

        expect(response.status).not.toBe(404)
        expect(response.status).not.toBe(400)

    })

})


jest.mock('../config/db')
//Forzar errores
describe('connectDB', () => {
  it('Should handle database connect error', async () => {
    jest.spyOn(db, 'authenticate').mockRejectedValueOnce(new Error('Hubo un error al conectar a la BD'))
    const consoleSpy = jest.spyOn(console, 'log')
    await connectDB()

    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('Hubo un error al conectar a la BD'))
  })
})
