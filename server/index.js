const express = require('express');
const app = express();
const PORT = 3000;
const cors = require('cors');
const socket = require('socket.io');
 
app.use(cors());
app.use(express.json());

const server = app.listen(PORT,()=>{
    console.log(`Listening on port ${PORT}`);
});
const io = socket(server,{
    cors:{origin : "*"}
});
io.on('connection',(socket)=>{
    console.log('a user connected ');
})