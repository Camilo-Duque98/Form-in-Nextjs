//{ name: "Homero", lastName: "J", middleName: "Simpson", email: "homero@mail.con", phone: "+499212345321", id: "rdNtARa" }
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Form from '../components/contacts/form'

describe('Form',()=>{
    it('Probando',()=>{
        render(<Form/>)
        const heading = screen.getByRole('heading',{
            name: /Nuevo Contacto/i
        })
        expect(heading).toBeInTheDocument()
    })

})