import areEqual from 'deep-equal';
import { useCallback, useState } from 'react';
export default function useSelection (editor){
    const [selection,setSelection] = useState(editor.selection);
    
    const setOptimisedSelection = useCallback((newSelection)=>{
        if(areEqual(selection,newSelection))
        return;
        setSelection(newSelection);

    },[setSelection,selection]);
    return [selection,setOptimisedSelection];
}
