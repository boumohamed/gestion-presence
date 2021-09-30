import React, { useState, useEffect } from 'react'
import { Form, Button, Container, FloatingLabel } from 'react-bootstrap'
import axios from "axios"

export default function SignUp() {

    const InitData = {
        nom: "",
        prenom : "",
        email : "",
        password : "",
        type : "etudiant"
    }
    const [formData, setData] = useState(InitData)
    const [password, setPassword]  = useState('')

    function handleForm(e) {
        const { name, value } = e.target;
        setData({ ...formData, [name]: value });
        }
    function onSubmit  (e)  {
        e.preventDefault()
        console.log(formData)
        let form_date = new FormData();
        form_date.append("email", formData.email);
        form_date.append("password", formData.password);
        axios.post("/api/user/add", form_date)

        .then(res => {
            console.log(res.data)
        });

        form_date.append("type", formData.type);


    }
    return (
        <>
            <Container className="py-5">
                <div className="d-flex justify-content-center align-items-center h-25">
                    <h1 className="text-secondary mb-0">Sign <i class="fas fa-user-plus text-primary"></i> Up</h1>
                </div>
                <Form className="py-4" onSubmit={onSubmit}>
                    
                    <FloatingLabel
                        controlId="Email"
                        label="Email"
                        className="mb-3"
                    >
                        <Form.Control  
                            type="email" 
                            placeholder="Email"
                            name="email"
                            value={formData.email}
                            onChange={handleForm}
                            />
                    </FloatingLabel>
                    <FloatingLabel
                        controlId="Password1"
                        label="Mot de passe"
                        className="mb-3"
                    >
                        <Form.Control  
                            type="password" 
                            placeholder="Mot de passe" 
                            name="password"
                            value={formData.password}     
                            onChange={handleForm}
                        />
                    </FloatingLabel>

                    <FloatingLabel
                        controlId="Password2"
                        label="Confirmez mot de passe"
                        className="mb-3"
                    >
                        <Form.Control  
                            type="password" 
                            placeholder="Confirmez mot de passe" 
                            onChange={e => setPassword( e.target.value )}
                            />
                    </FloatingLabel>
                    <FloatingLabel controlId="floatingSelect" label="Etudiant/Prof">
                    <Form.Select aria-label="Etudiant/Prof" onChange={handleForm} name="type">
                        
                        <option value="etudiant">Etudiant</option>
                        <option value="prof">Prof</option>
                    </Form.Select>
                    </FloatingLabel>
                   
                    <Button className="mt-5" variant="primary" type="submit" disabled={password === '' || formData.email === '' || formData.password === '' || password !== formData.password? true : false}>
                        Login
                    </Button>
                </Form>
            </Container>
        </>
    )
}
