import "./Container.css"

function Container2(props) {
    return (  
        <div className='container'>{props.children}</div>
    );
}

export default Container2;