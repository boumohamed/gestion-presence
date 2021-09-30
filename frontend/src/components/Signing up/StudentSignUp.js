import React, { useState, useEffect } from 'react'
import { Form, Button, Container, FloatingLabel, Row, Col } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import { toaster } from 'evergreen-ui'
import axios from "axios"

export default function StudentSignUp() {


    const InitData = {
        nom: "",
        prenom : "",
        email : "",
        password : "",
        is_Prof : false,
        is_Etudiant : true,
        user: 0,
        annee: 0,
        groupe: 0,
    }
    const InitDataEtduant = {

        
    }
    const [formData, setData] = useState(InitData)
    const [Annees, setAnnees] = useState([]) 
    const [Groupes, setGroupes] = useState([]) 
    const [password, setPassword]  = useState('')
    const history = useHistory()

    function handleForm(e) {
        const { name, value } = e.target;
        setData({ ...formData, [name]: value });
        }

        useEffect(async () => {
            await axios.get('http://127.0.0.1:8000/api/annees')
            .then(res => {
                setAnnees(res.data)
                //console.table(res.data)
            })

            setGroupes({})

            
        }, []
        )

    function getGroupes(){

        
        axios.get(`http://127.0.0.1:8000/api/groupes/alias/${formData.annee}`)
            .then(res => {
                setGroupes(res.data)
                setData({ ...formData, groupe : res.data[0].id })
                //console.table(res.data)
            })
            .catch(err => {
                setGroupes({})
            })
    }
    function onSubmit  (e)  {
        e.preventDefault()
        let form_log = new FormData();

        form_log.append("email", formData.email)
        form_log.append("password", formData.password)

        let form_data1 = new FormData();
        let form_data2 = new FormData();
        
        form_data1.append("email", formData.email);
        form_data1.append("password", formData.password);
        form_data1.append("is_Prof", formData.is_Prof);
        form_data1.append("is_Etudiant", formData.is_Etudiant);

        //console.log(formData.email, formData.password, formData.nom, formData.prenom, formData.groupe, formData.annee)
        
       axios.post("http://127.0.0.1:8000/api/user/add", form_data1)
        .then(res => {
            //console.log(res.data)
            //id = res.data.id

            return res.data.id
        }).then(id => {

            form_data2.append("user_id", id)
            form_data2.append("nom", formData.nom)
            form_data2.append("prenom", formData.prenom)
            form_data2.append("annee", formData.annee)
            form_data2.append("groupe", formData.groupe)
           
            return axios.post("http://127.0.0.1:8000/api/etudiant/add", form_data2)

        }).then(res => {
            //console.log(res.data)
            return axios.post("http://127.0.0.1:8000/api/login", form_log)
        }).then(res => {

            sessionStorage.setItem('currentUser', JSON.stringify(res.data));
            toaster.success('Logged In',{
                duration: 2,
                description: 'Bienvenu(e)',
            },)
            history.push('/')
            window.location.reload(true);
        }).catch(err => {
            //error = true
            toaster.danger('échec de la connexion',{
                duration: 2,
                description: 'Vérifiez Votre Email et votre mot de passe',
            })
        }); 


        
       
    }
    return (
        <>
            <Container className="py-5">
                <div className="d-flex justify-content-center align-items-center h-25">
                    <h1 className="text-secondary mb-0">Sign <i className="fas fa-user-plus text-primary"></i> Up {/* <i className="fas fa-user-graduate"></i> */}</h1>
                </div>
                <Form className="py-4" onSubmit={onSubmit}>
                    
                <Row className="mb-3">
                    <FloatingLabel as={Col}
                            controlId="Nom"
                            label="Nom"
                            className="mb-3"
                        >
                    <Form.Control  
                        type="text" 
                        placeholder="Nom"
                        name="nom"
                        value={formData.nom}
                        onChange={handleForm}
                        />
                        </FloatingLabel>
                        <FloatingLabel as={Col}
                            controlId="Prenom"
                            label="Prénom"
                            className="mb-3"
                        >
                        <Form.Control  
                            type="text" 
                            placeholder="Prénom"
                            name="prenom"
                            value={formData.prenom}
                            onChange={handleForm}
                            />
                    </FloatingLabel>
                </Row>
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

                    <FloatingLabel as={Col}
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
                    </Row>
                    <Row className="mb-3">
                        <FloatingLabel as={Col} controlId="floatingSelectAnnee" label="Année">
                        <Form.Select aria-label="Année" onChange={handleForm} name="annee">
                            {
                                Annees.map(Annee => <option key={Annee.id} value={Annee.id}>{Annee.nom_annee}</option>)
                            }
                        </Form.Select>
                        </FloatingLabel>
                        <FloatingLabel as={Col} controlId="floatingSelectGroupe" label="Groupe">
                        <Form.Select aria-label="Groupe" onChange={handleForm} name="groupe" onFocus={getGroupes}>
                            {Groupes.length > 0?
                            
                                Groupes.map(Groupe => <option key={Groupe.id} value={Groupe.id}>{Groupe.nom_grp}</option>)
                           
                            : <option >Vide</option>
                            }
                           
                        </Form.Select>
                        </FloatingLabel>
                    </Row>
                    <Button className="mt-5" variant="primary" type="submit" disabled={password === '' || formData.email === '' || formData.password === '' || password !== formData.password? true : false}>
                        Login
                    </Button>
                </Form>
            </Container>
        </>
    )
}
