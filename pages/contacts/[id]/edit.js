import Form from 'components/contacts/form'
import { useRouter } from 'next/router'
import { useQuery } from 'react-query'

export default function New (){
    const router = useRouter()
    const { id } = router.query
    const { data, error, isLoading} = useQuery(`/contacts/${id}`)
    if(error){
        return JSON.stringify(error)
    }
    if(isLoading){
        return 'Cargando...'
    }
    return <Form contact={data}/>
}