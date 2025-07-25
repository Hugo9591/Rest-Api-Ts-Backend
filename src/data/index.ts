import {exit} from 'node:process'
import db from '../config/db'

const clearDB = async() => {
    try {
        await db.sync({force: true})//Elimina los datos de la BD
        console.log('Datos eliminados correctamente')
        exit();
        
    } catch (error) {
        console.log(error);
        exit(1);//finaliza el programa con exito y al ponerle 1 es que lo finaliza con errores
    }
}

if(process.argv[2] === '--clear'){
    //process.argv es algo que siempre se manda a llamar
    clearDB()
}