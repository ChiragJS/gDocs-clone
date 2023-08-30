import { useEffect } from 'react';
import { io } from 'socket.io-client';

function DocConnection (){
    useEffect(()=>{
        const socket =io("http://localhost:3000");
        socket.on("connect",()=>{
            console.log(socket.id);
        })
    },[])
}
export default DocConnection;