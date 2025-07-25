import server from "./server";
import colors from 'colors';

//Servidor escuhe por el puerto 4000
const port = process.env.PORT || 4000;
server.listen(port, () => {
    console.log( colors.cyan.bold(`REST API en el puerto ${port}`))
})