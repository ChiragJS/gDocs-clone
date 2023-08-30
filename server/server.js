import { Server } from "@hocuspocus/server";
import { slateNodesToInsertDelta } from "@slate-yjs/core";
import { Logger } from "@hocuspocus/extension-logger";
import * as Y from 'yjs';
 
 const initialValue = [{type : 'paragraph', children : [{text : ''}]}];
 function printLog(){
    console.log("hi");
 }
 const server = Server.configure({
    port : 1234,
    extensions : [new Logger()],
    async onLoadDocument(data){
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
 server.enableMessageLogging();
 server.listen();
 