import * as Yup from 'yup'
import { useMutation, useQueryClient } from 'react-query'
import instance from 'axios-instance'
import { useFormik } from 'formik'
import { useRouter } from 'next/router'
import Link from 'next/link'
//creamos el componente de formulario
//armamos el esquema de los que estamos construyendo

const FormSchema = Yup.object().shape({
    name: Yup.string().required(''),
    lastName: Yup.string().required(''),
    middleName: Yup.string().required(''),
    email: Yup.string().required('').email(''),
    phone: Yup.string().required('')
})

export default function Form({contact}){//es el atributo que le pasamos a la función
    const router = useRouter()
    const queryClient = useQueryClient()
    const mutation = useMutation((contactObject)=>{//argumento que viene de mutation.mutate, es decir el value que proviene del formik.
        if(contact){
            return instance.put(`/contacts/${contact.id}`, contactObject)
        }
        return instance.post('/contacts', contactObject)
    },{
        onSuccess: () => {
            queryClient.invalidateQueries('/contacts')
            if(contact){
                queryClient.invalidateQueries(`/contacts/${contact.id}`)
                router.push(`/contacts/${contact.id}`)
            }else{
                router.push('/contacts')
            }
        }
    }
    )
    const formik = useFormik({
        initialValues: {
            name: contact?.name || '',
            lastName: contact?.lastName || '',
            middleName: contact?.middleName || '',
            email: contact?.email || '',
            phone: contact?.phone || ''
        },
        validationSchema: FormSchema,
        onSubmit: async (values)=>{
            mutation.mutate(values)
        }
    })
    if (mutation.isLoading){
        return 'Cargando...'
    }
    return (
        <div>
            {!contact && <h1>Nuevo contacto</h1>}
            {contact && <h1>Editar Contacto</h1>}
            {mutation.error && JSON.stringify(mutation.error)}
            <form onSubmit={formik.handleSubmit}>
                <input type="text" name='name' placeholder="Nombre" onChange={formik.handleChange} value={formik.values.name} required />
                <input type="text" name='lastName' placeholder="Apellido" onChange={formik.handleChange} value={formik.values.lastName} required />
                <input type="text" name='middleName' placeholder="Segundo Apellido" onChange={formik.handleChange} value={formik.values.middleName} required />
                <input type="email" name='email' placeholder="Email" onChange={formik.handleChange} value={formik.values.email} required />
                <input type="tel" name='phone' placeholder="Teléfono" onChange={formik.handleChange} value={formik.values.phone} required />
                <button type='submit'>{contact ? 'Editar Contacto' : 'Crear Contacto'}</button>
            </form>
            {!contact && <Link href="/contacts">Contactos</Link>}
            {contact && <Link href={`/contacts/${contact.id}`}>Volver</Link>}
        </div>
    )
}