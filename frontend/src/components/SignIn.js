import React, { useState } from 'react'
import { Form, Button, Container, FloatingLabel, Row, Col } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import { toaster, Popover, Menu, Position } from 'evergreen-ui'
import axios from 'axios'

export default function SignIn() {

    const InitData = {
        email : "",
        password : "",
    }
    const [formData, setData] = useState(InitData)
    const history = useHistory()
    /* const [authUser, setAuthuser] = useState(InitData)
    const [error, setError] = useState(false) */
    var auth_user = {}
    var error = false

    function handleForm(e) {
        const { name, value } = e.target;
        setData({ ...formData, [name]: value });
        }
    async function onSubmit(e){
        e.preventDefault()
        
        let form_data = new FormData();
        form_data.append("email", formData.email);
        form_data.append("password", formData.password);

        await axios
        .post("http://127.0.0.1:8000/api/login", form_data)
        .then(res => {
            auth_user = res.data
            //console.log(auth_user)
            error = false
            
        }).catch(err => {
            error = true
            
        })   

        if(error){
            toaster.danger('échec de la connexion',{
                duration: 2,
                description: 'Vérifiez Votre Email et votre mot de passe',
            })
        }
        else{
            sessionStorage.setItem('currentUser', JSON.stringify(auth_user));
            toaster.success('Logged In',{
                duration: 2,
                description: 'Bienvenu(e)',
            },)
            history.push('/')
            window.location.reload(true);
        } 
        
    }
    return (
        <>
            <>
            
            <Container className="py-5">
            
            <div className="d-flex justify-content-center align-items-center h-25">
                <h1 className="text-secondary mb-0">Sign <i class="fas fa-user-lock text-primary"></i> In</h1>
            </div>
                <Form className="py-4" onSubmit={onSubmit}>
                <Row className="mb-3">
                    <FloatingLabel as={Col}
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
                    </Row>
                    <Row className="mb-3">
                    <FloatingLabel as={Col}
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
                    </Row>
                    
                        <Button variant="primary" type="submit" disabled={formData.email === '' || formData.password === '' ? true : false}>
                            Login
                        </Button>
                        
                        <Popover className="m-4"
                            position={Position.BOTTOM_LEFT}
                            content={
                                <Menu>
                                <Menu.Group>
                                    <Menu.Item onSelect={() => history.push({ 
                                                pathname: `/SignUp/prof` })
                                        }>Prof</Menu.Item>
                                    <Menu.Item onSelect={() => history.push({ 
                                                pathname: `/SignUp/etudiant` })
                                        }>Etudiant</Menu.Item>
                                </Menu.Group>
                                <Menu.Divider />
                                </Menu>
                            }
                            >
                            <Button className="m-4" variant="secondary" >Sign Up</Button>
                            </Popover>
                            
                </Form>
            </Container>
        </>
        </>
    )
}
