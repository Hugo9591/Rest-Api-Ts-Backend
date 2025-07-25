import express from 'express'
import router from "./router";
import db from "./config/db";
import swaggerUi from 'swagger-ui-express'
import swaggerSpec, { swaggerUiOptions } from './config/swagger'
import colors from 'colors';
import cors, {CorsOptions} from 'cors'
import morgan from 'morgan'

//Conectar a bd
export async function connectDB(){
    try {
        await db.sync()
        console.log( colors.blue('Conexion exitosa a la BD'));

    } catch (error) {
        // console.log(error)
        console.log( colors.red.bold('Hubo un error al conectar a la BD' ));
    }
} 
connectDB();

//Instancia de express
const server = express();

// Permitir conexiones
const corsOptions : CorsOptions = {
    origin: function(origin, callback) {
        if(origin === process.env.FRONTEND_URL) {
            callback(null, true)
        } else {
            callback(new Error('Error de CORS')) 
        }
    }
}
server.use(cors(corsOptions))

// Leer datos de formularios
server.use(express.json())

server.use(morgan('dev'))

//Use() engloba todos los metodos http
server.use('/api/products', router)

//ejemplo con supertest
server.get('/api', (req, res) => {
    res.json({msg: 'Desde API'})
})

// Docs
server.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, swaggerUiOptions) )


export default server
