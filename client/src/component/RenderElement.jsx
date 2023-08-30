import { DefaultElement } from "slate-react";
import { renderLeaf } from "./RenderLeaf";
import isHotKey from 'is-hotkey';
import { toggleStyle } from "../utils/EditorUtils";
import { useCallback } from "react";
export default function useEditorConfig(editor){
    const on_key_down = useCallback((event)=>KeyBindings.onKeyDown(editor,event),[editor]);
        return {renderElement ,renderLeaf, on_key_down};
}
const KeyBindings = {
    onKeyDown : (editor,event)=>{
        if(isHotKey('mod+b',event)){
            toggleStyle(editor,"bold");
            return;
        }
        if(isHotKey('mod+i',event)){
            toggleStyle(editor,"italic");
            return;
        }
        if(isHotKey('mod+c',event)){
            toggleStyle(editor,"code");
            return;
        }
        if(isHotKey('mod+u',event)){
            toggleStyle(editor,"underline");
            return;
        }
    }
}
function renderElement(props){
    // console.log(props);
    const {element, attributes, children} = props;
    // console.log(element.type);
    // console.log(children[0].props.text.type);
    
    switch(children[0].props.text.type){
        case 'paragraph' :
            return <p {...attributes}>{children}</p>;
        case 'h1':
            return <h1 {...attributes}>{children}</h1>;
        case 'h2' :
            return <h2 {...attributes}>{children}</h2>;
        case 'h3' :
            return <h3 {...attributes}>{children}</h3>;
        case 'h4' :
            return <h4 {...attributes}>{children}</h4>;
        default :
            // children[0].props.text.type='paragraph'
            return <p {...attributes}>{children}</p>
    }
}