export function renderLeaf(props){
    console.log(props.leaf);
    const {children,leaf,attributes} = props;
    let el = <>{children}</>;
    if(leaf.bold){
        el = <strong>{el}</strong>
    }
    if(leaf.code){
        el = <code>{el}</code>
    }
    if(leaf.italic){
        el = <em>{el}</em>
    }
    if(leaf.underline){
        el = <u>{el}</u>
    }

    return <span {...attributes}>{el}</span>;
}