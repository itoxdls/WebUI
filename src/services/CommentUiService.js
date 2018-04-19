const Substring = ({text, length}) => text.length <= length ? text : text.slice(0, length - 3) + '...' 

export default Substring;