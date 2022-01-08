import { useState, useEffect } from "react";
import Cliente from "../components/Cliente";
const Inicio = () => {

    const [clientes, setClientes ] = useState([])
    // Traemos los clientes GET
    useEffect(() => {
        const obtenerClientesAPI = async () => {
            try {
                const url = import.meta.env.VITE_API_URL
                const respuesta = await fetch(url)
                const resultado = await respuesta.json()

                setClientes(resultado)
            } catch (e) {
                console.log(e)
            }
        }

        obtenerClientesAPI()
    }, []);

    const handleEliminar = async (id) => {
        const confirmar = confirm('¿Estás seguro de eliminar este registro?')

        if ( confirmar ) {
            try {
                const url = `${import.meta.env.VITE_API_URL}/${id}`
                const respuesta = await fetch( url, {
                    method: 'DELETE'
                })
                await respuesta.json()

                const arrayClientes = clientes.filter( cliente => cliente.id !== id )
                setClientes(arrayClientes)
            } catch (e) {
                console.log(e)
            }
        }
        //console.log('Eliminando...', id)
    }

    return (
        <>
            <h1 className="font-black text-4xl text-blue-900"> Clientes </h1>
            <p className="mt-3"> Aquí mostramos tus clientes registrados </p>

            <table className="w-full mt-5 table-auto shadow bg-white">
                <thead className="bg-blue-800 text-white">
                    <tr>
                        <th className="p-2">Nombre</th>
                        <th className="p-2">Contacto</th>
                        <th className="p-2">Empresa</th>
                        <th className="p-2">Acciones</th>
                    </tr>
                </thead>
                     { clientes.map ( cliente => (
                        <Cliente
                            key = { cliente.id }
                            cliente={cliente}
                            handleEliminar={handleEliminar}
                        />
                    ))}

            </table>
        </>
    );
}
export default Inicio