function Substring (props){
    return props.text.length <= props.length 
        ? props.text 
        : props.text.slice(0, props.length - 3) + '...';
}

export default Substring;