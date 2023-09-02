import { Server } from "@hocuspocus/server";
import { slateNodesToInsertDelta } from "@slate-yjs/core";
import { Logger } from "@hocuspocus/extension-logger";
import * as Y from 'yjs';
import expressWebsockets from  'express-ws';
import express from 'express';
 
 const initialValue = [{type : 'paragraph', children : [{text : ''}]}];
 function printLog(){
    console.log("hi");
 }
 const server = Server.configure({
    extensions : [new Logger()],
    onLoadDocument(data){
    if(data.document.isEmpty('content')){
        const insertDelta = slateNodesToInsertDelta(initialValue);
        const sharedRoot = data.document.get('content',Y.XmlText);
        console.log(sharedRoot);
        sharedRoot.applyDelta(insertDelta);
        }
        printLog();
        return data;
    }
 });
 const { app } = expressWebsockets(express());
 //app.get('/',(req,res)=>{});
 app.ws('/:documentName',(websocket,req)=>{
   console.log("websocket");
   
   websocket.on("hi",(payload)=>{
      console.log('editor received')
      websocket.emit("sbc",req);
   });
   
   server.handleConnection(websocket,req,{user_id:1234});
 })
 //server.enableMessageLogging();
app.listen(1234,()=>{console.log("server runnning on port http://127.0.0.1:1234")})
 