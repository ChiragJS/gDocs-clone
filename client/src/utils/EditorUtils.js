import {Editor, Transforms} from 'slate';
import { Range } from 'slate';
export function getActiveStyles(editor){
    return new Set(Object.keys(Editor.marks(editor)??{}));
}
export function toggleStyle(editor,style){
    const activeStyles = getActiveStyles(editor);
    console.log(activeStyles);
    // console.log("hi from toggleStyle");
    if(activeStyles.has(style)){
        Editor.removeMark(editor,style);
    }
    else
    {
        Editor.addMark(editor,style,true);
    }
}

export function getTextBlockStyle(editor){
    const selection = editor.selection;
    if(selection==null){
        return null;
    }
    const [start,end] = Range.edges(selection);
    // const topLevelBlockNodesInSelection = Editor.nodes(editor,{
    //     at: selection,
    //     mode:"highest",
    //     match:(n)=>Editor.isBlock(editor,n)
    // });
    let blockType = null;
    //let nodeEntry = topLevelBlockNodesInSelection.next();
    let startTopLevelBlockIndex = start.path[0];
    const endTopLevelBlockIndex = end.path[0];
    //console.log(startTopLevelBlockIndex,endTopLevelBlockIndex);
    while(startTopLevelBlockIndex<=endTopLevelBlockIndex){
        const [node,_]=Editor.node(editor,[startTopLevelBlockIndex]);
        
        if(blockType==null){
            blockType = node.children[0].type;
        }
        else if(blockType!==node.children[0].type){
            return "multiple";
        }
        //nodeEntry= topLevelBlockNodesInSelection.next();
        startTopLevelBlockIndex++;
    }
    // console.log(blockType)
    return blockType;
}
export function toggleBlockStyle(editor,blockType){
    const currentBlockType = getTextBlockStyle(editor);
    // console.log(currentBlockType);
    // console.log(blockType);
    let changeTo = (currentBlockType === blockType) ? "paragraph" : blockType;
   
    changeTo = changeTo.toLowerCase();
    console.log(changeTo)
    Transforms.setNodes(
        editor,
        {type : changeTo} ,
        {
            at: editor.selection,
            match : (n)=>Editor.isBlock(editor,n)
    }
    );
    // console.log(getTextBlockStyle(editor));
}