const Contador = () => {
    const [contador, setContador] = React.useState(0);

    const AumentarContador = () => setContador(contador + 1);
    const DisminuirContador = () => setContador(contador - 1);
    
    return (
        <div>
            <h1 className={contador < 0 ? "menor" : "mayor"}>Contador: {contador}</h1>
            <hr />
            <button onClick={AumentarContador}>Aumentar</button>
            <button onClick={DisminuirContador}>Disminuir</button>
        </div>
        
    );
}