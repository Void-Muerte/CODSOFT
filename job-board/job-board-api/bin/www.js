require('dotenv').config();
const http = require('http');
const app = require('../index');


const PORT = process.env.PORT || 3000;



const server = http.createServer(app);
const onListening = ()=>console.log(`Server running at port ${PORT}`);
const onError = (error)=>console.error(error.message);

server.on('listening', onListening);
server.on('error', onError);
server.listen(PORT);