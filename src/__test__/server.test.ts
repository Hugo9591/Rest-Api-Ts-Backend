//Ejemplo de test con JEST
// describe('Primer Test', () => {
//     test('1 + 1 son 2', () => {
//         expect(1 + 1).toBe(2)
//     });

//     test('1 + 1 no sean 3', () => {
//         expect(1 + 1).not.toBe(3)
//     })
// })


//Ejemplo con supertest
import request from "supertest";
import server from "../server";

describe('GET /api', () => {
    it('shoud send back a json response', async () => {
        const res = await request(server).get('/api')

        expect(res.status).toBe(200)//Llamado correcto a la api 200 si no existe 404
        expect(res.headers['content-type']).toMatch(/json/)//que la respuesta sea tipo json
        expect(res.body.msg).toBe('Desde API')//Que sea la informacionde la api
    })
})