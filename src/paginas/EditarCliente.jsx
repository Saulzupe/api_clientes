import Formulario from "../components/Formulario";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";


const EditarCliente = () => {

    const [cliente, setCliente] = useState({});
    const [cargando, setCargando] = useState(true);
    const { id } = useParams()
    //console.log(id)

    useEffect( () => {
        setCargando(!cargando)
        const obtenerClienteAPI = async () => {
            try {
                const url = `http://localhost:4000/clientes/${id}`
                const respuesta = await fetch(url)
                const resultado = await respuesta.json()

                setCliente(resultado)
            } catch (e) {
                console.log(e)
            }
            setTimeout( () => {
                setCargando(!cargando)
            }, 3000 )

        }

        obtenerClienteAPI()
    }, [])
    return (
        <>
            <h1 className="font-black text-4xl text-blue-900"> Editar Cliente</h1>
            <p className="mt-3"> Corrige y/o Edita los datos de tus clientes </p>
            { cliente?.nombre ? (
                <Formulario
                    cliente={cliente}
                    cargando={cargando}
                />
            ): <p> Cliente ID no válido</p>}

        </>
    );
}
export default EditarCliente