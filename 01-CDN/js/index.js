const HelloWord = ()=>{
    return (
        <div>
            <h1>Hello world CDN React</h1>
            <h2>Fecha: {new Date().getFullYear()}</h2>
            <hr />
        </div>
    )
}



ReactDOM.render(
    <HelloWord />, document.getElementById("root")
);