import { Button } from "@mui/material";
import FormatAlignJustifyIcon from '@mui/icons-material/FormatAlignJustify';
import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter';
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
import FormatAlignRightIcon from '@mui/icons-material/FormatAlignRight';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import CodeIcon from '@mui/icons-material/Code';
import { useCallback, useState,useEffect } from "react";
import { getActiveStyles,getTextBlockStyle,toggleBlockStyle,toggleStyle } from "../utils/EditorUtils";
import { useSlateStatic } from "slate-react";
const activeStyle={
    backgroundColor: "#eeeeee"

}
const notActiveStyle={

}

function ToolBar({selection}){
    const editor = useSlateStatic();
    const PARAGRAPH = ["h1","h2","h3","h4","paragraph"];
    const ICONS = [{icon : <FormatAlignCenterIcon sx={{marginRight:1,marginLeft:1}} />,type : "alignCenter"},{icon :<FormatAlignLeftIcon sx={{marginRight:1,marginLeft:1}} />,type:'alignLeft'},{icon :<FormatAlignJustifyIcon sx={{marginRight:1,marginLeft:1}} />,type : "alignJustify"},{icon : <FormatAlignRightIcon sx={{marginRight:1,marginLeft:1}} />,type : "alignRight"},{icon : <FormatBoldIcon sx={{marginRight:1,marginLeft:1}} />,type : "bold"},{icon :<FormatItalicIcon sx={{marginRight:1,marginLeft:1}} />, type : "italic"},{icon : <FormatUnderlinedIcon sx={{marginRight:1,marginLeft:1}} />,type :"underline"},{icon : <CodeIcon sx={{marginRight:1,marginLeft:1}} />,type:"code"}];
    // const [activeButton,setButtonActive] = useState(false);
    const onBlockTypeChange = useCallback(
        (targetType)=>{
           // console.log(targetType);
            if(targetType==="multiple"){
                return;
            }
            toggleBlockStyle(editor,targetType)
        },[editor]
    );
    const blockType = getTextBlockStyle(editor);
    return<div style={{display:"flex",justifyContent:'center', flexDirection:'row wrap'}}>
        {PARAGRAPH.map((type)=><HighLevelFormatting editor={editor} isActive={getActiveStyles(editor).has(type)} onBlockTypeChange={onBlockTypeChange} blockType={blockType} type={type}/>)
         }
         {ICONS.map((x)=> <LowLevelFormatting editor={editor} isActive={getActiveStyles(editor).has(x.type)} type={x.type} icon={x.icon}/>)}
    </div>
}

function HighLevelFormatting(props){
    const handleClick=()=>{
        setButtonActive(!active);
    }
    const {isActive,type,editor,blockType,onBlockTypeChange} = props;
    const [active,setButtonActive]= useState(isActive);
    useEffect(()=>{
       // console.log(`hi from ${blockType}`)
        if(blockType===type)
        setButtonActive(true);
        else
        setButtonActive(false)
    },[editor.selection]);
    return <Button key={type} size="small"  variant={active?'contained':"outlined"} sx={{marginRight:1,padding:0.2}} onMouseDown={(event)=>{
        event.preventDefault();
        if(active)
        onBlockTypeChange('paragraph');
        else
        onBlockTypeChange(type)
        handleClick();
    }}  >{type}</Button>
}
function LowLevelFormatting(props){
    const handleClick=()=>{
        console.log(active);
        setButtonActive(!active);
    }
    const {isActive,type,editor,icon} = props;
    const [active,setButtonActive]= useState(isActive);
    return <div key={type} onMouseDown={(event)=>{
        event.preventDefault();
        toggleStyle(editor,type);
        handleClick();
    }} style={active?{...activeStyle,margin:4,paddingTop:3,borderRadius:5}:{...notActiveStyle,margin:4,paddingTop:3,borderRadius:5}} >{icon}</div>;
}
export default ToolBar;
