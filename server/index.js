import express from 'express';
import http from 'http'; //http module from nodejs
import {Server} from 'socket.io'; //

const app = express();
const PORT = 4000;
const httpServer = http.createServer(app); // we can link this server with socket.io
const io = new Server(httpServer);

import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// method + route 
app.get('/', (req, res) => {
    res.json({data:"hello world"})
    res.sendFile(__dirname + '/index.html');
})

io.on('connection',(socket) => {
    console.log("connection is ready");
})

httpServer.listen(PORT,()=>{
    console.log(`listening on port ${PORT}`)
    http://localhost:4000/
})