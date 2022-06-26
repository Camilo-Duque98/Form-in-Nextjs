import Link from "next/link";
import { useQuery } from "react-query";

//importamos la data con useQuery
export default function Contacts(){
    const {data, error, isLoading} = useQuery('/contacts')
    if (error){
        return JSON.stringify(error)
    }
    if(isLoading){
        return 'Cargando...'
    }
    return(
        <div>
            <Link href = "/contacts/new">Nuevo contacto</Link>
            {data.map((contact) => (<div key={contact.id}>
                <Link href={`/contacts/${contact.id}`}>
                    {contact.name}
                </Link>
            </div>))}
        </div>
    )
}