import React, { useState, useEffect } from 'react'
import { Form, Button, Container, FloatingLabel } from 'react-bootstrap'
import axios from "axios"

export default function Settings() {


    const [user, setUser] = useState(JSON.parse(sessionStorage.getItem('currentUser')))
    const [userDetails, setUserDetails] = useState({})
    const [password1, setPassword1]  = useState('')
    const [password2, setPassword2]  = useState('')
    const [password3, setPassword3]  = useState('')
    useEffect(async () => {
    
    await axios.get(`http://127.0.0.1:8000/api/get/etudiant/${user.id}`)
    .then(res => {
        setUserDetails(res.data)
        //console.log(res.data)
    })
       
   }, [])

   async function onSubmit  (e)  {
    e.preventDefault()
    
    let form_update = new FormData();
    form_update.append("password", password2);
    await axios.put(`http://127.0.0.1:8000/api/user/change/${user.id}`, form_update)
    .then(res => {
        
        console.log(res.data)
    })

}
    return (
        <>
            <Container className="py-5">
                <Form className="py-4"  onSubmit={onSubmit} >
                    <FloatingLabel 
                        controlId="Password1"
                        label="Ancien mot de passe"
                        className="mb-3"
                    >
                    <Form.Control  
                        type="password" 
                        placeholder="ncien mot de passe" 
                        name="password"    
                        onChange={e => setPassword1( e.target.value )}
                    />
                    </FloatingLabel>

                    <FloatingLabel 
                        controlId="Password2"
                        label="Nouveau mot de passe"
                        className="mb-3"
                    >
                    <Form.Control  
                        type="password" 
                        placeholder="Nouveau mot de passe" 
                        onChange={e => setPassword2( e.target.value )}
                        />
                    </FloatingLabel>
                    <FloatingLabel 
                        controlId="Password2"
                        label="Confirmez nouveau mot de passe"
                        className="mb-3"
                    >
                    <Form.Control  
                        type="password" 
                        placeholder="Confirmez nouveau mot de passe" 
                        onChange={e => setPassword3( e.target.value )}
                        />
                    </FloatingLabel>
                    <Button className="mt-5" variant="primary" type="submit"  disabled={password1 === '' || password2 === '' || password3 === '' || password2 !== password3? true : false} >
                        Mettre à jour
                    </Button>
                </Form>
            </Container>
        </>
    )
}
