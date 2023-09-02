
import { useMemo,useCallback, useEffect } from "react";
import {createEditor,Editor,Transforms,Element} from 'slate';
import {Slate,Editable,withReact} from 'slate-react';
import useEditorConfig from "./RenderElement";
import ToolBar from "./ToolBar";
import useSelection from "../hooks/useSelection";
import { withYjs, slateNodesToInsertDelta, YjsEditor,withYHistory } from '@slate-yjs/core';
import * as Y from 'yjs';
import { HocuspocusProvider,HocuspocusProviderWebsocket } from "@hocuspocus/provider";
//import { Range } from "slate";
//const initialValue=
function DocumentEditor({onChange,document}){
    
    const socket = useMemo(()=>{ return new HocuspocusProviderWebsocket({
        url:"ws://127.0.0.1:1234/123"
    })},[]);
   console.log(socket)
    const provider = useMemo(()=>{
        // const yDoc = new Y.Doc();
        // console.log(yDoc)
        return new HocuspocusProvider({
            websocketProvider: socket,
            
            name : 'slate-yjs',
            
            connect : false
        })},[]
    );
    
    // const sharedType = useMemo(()=>{
    //     const yDoc = new Y.Doc();
    //     const sharedType  = yDoc.get("content",Y.XmlText);
    //     sharedType.applyDelta(slateNodesToInsertDelta(document));
    //     return sharedType;
    // },[]);
    //console.log(provider.isConnected);
    const editor = useMemo(()=>{
        const sharedType = provider.document.get('content',Y.XmlText) ;
        const e = withReact(withYHistory(withYjs(createEditor(),sharedType)));

        const { normalizeNode } = e;
        e.normalizeNode = (entry) => {
            const [node] = entry;
            if(!Editor.isEditor(node)|| node.children.length > 0 ){
                return normalizeNode(entry);
            }
        
        Transforms.insertNodes(
            editor, {
                type : 'paragraph',
                children:[{text:''}],
            
            },
            {at:[0]}
        );
        }
        return e;
    },[provider.document]);
    useEffect(() => {
        provider.connect();
        console.log(provider.isConnected)
        return () => provider.disconnect();
      }, [provider]);
    useEffect(() => {
        YjsEditor.connect(editor);
        return () => YjsEditor.disconnect(editor);
      }, [editor]);
    
    const [selection,setSelection]= useSelection(editor);
    const {renderElement,renderLeaf,on_key_down} = useEditorConfig(editor);
    const onChangeHandler = useCallback((doc)=>{
        onChange(doc);
        // console.log("hi");
        setSelection(editor.selection);
        // const [start,end] = Range.edges(editor.selection);
        // console.log(start.path,end.path);
    },[selection,editor.selection,onChange])

    return <Slate editor={editor} initialValue={document} onChange={onChangeHandler} >
        <ToolBar selection={selection} socket={socket}  />
        <div style={{height:"100%",borderWidth:5,borderColor:"black"}}>
        <Editable  renderElement={renderElement} renderLeaf={renderLeaf} onKeyDown={on_key_down} style={{minHeight:"90vh",borderWidth:"20px"}}/>
        </div>
    </Slate>
}
export default DocumentEditor;