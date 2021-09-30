import React, { useState, useEffect } from 'react'
import { Form, Button, Container, FloatingLabel } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import { Spinner, toaster } from 'evergreen-ui'
import { LinkContainer } from 'react-router-bootstrap'
import axios from "axios"

export default function ProfSettings() {

    const InitData = {
        annee: "",
        groupe : "",
        matiere : "",
    }
    const [user, setUser] = useState(JSON.parse(sessionStorage.getItem('currentUser')))
    const [formData, setData] = useState({})
    const [userDetails, setUserDetails] = useState({})
    const [Annees, setAnnees] = useState([]) 
    const [Groupes, setGroupes] = useState({}) 
    const [Matieres, setMatieres] = useState([]) 
    const [matiere, setMatiere]  = useState('')
    const history = useHistory()
    function Back(){
        history.push(`/`)
    }


    function handleForm(e) {
        const { name, value } = e.target;
        setData({ ...formData, [name]: value });
        
        }

        useEffect(async () => {
            await axios.get('http://127.0.0.1:8000/api/annees')
            .then(res => {
                setAnnees(res.data)
                //console.table(res.data)
                setData({...formData, annee: res.data[0].id });
            }).then(() => {
                return axios.get(`http://127.0.0.1:8000/api/get/prof/${user.id}`)
            }).then(res => {
                setUserDetails(res.data)
            })
            setGroupes({})

        }, []
        )

    function getGroupes(){

        
         axios.get(`http://127.0.0.1:8000/api/groupes/alias/${formData.annee}`)
            .then(res => {
                setGroupes(res.data)
                setData({...formData, groupe: res.data[0].id });
                //console.table(res.data)
            })
            
    }

    function getMatiere(){
        axios.get(`http://127.0.0.1:8000/api/matieres/${userDetails.id}`)
            .then(res => {
                setMatieres(res.data)
                setData({...formData, matiere: res.data[0].id });
            })
    }
    function onSubmit1  (e)  {
        e.preventDefault()
        let form_log = new FormData();
        form_log.append("prof", userDetails.id)
        form_log.append("groupe", formData.groupe)
        form_log.append("matiere", formData.matiere)
        form_log.append("annee", formData.annee)
        console.log( )
        let grp_nom
        let mat_nom
        let an_nom = Annees.filter(annee => annee.id === parseInt(formData.annee))[0].nom_annee
        if(Groupes && Groupes.length === 1){
            grp_nom = Groupes[0].nom_grp
        }
        else{
            grp_nom = Groupes.filter(grp => grp.id === parseInt(formData.groupe))[0].nom_grp
        }
        if(Matieres && Matieres.length === 1){
            mat_nom = Matieres[0].Intitule_matiere
        }
        else{
            mat_nom = Matieres.filter(mat => mat.id === parseInt(formData.matiere))[0].Intitule_matiere
        }

        form_log.append("groupe_nom", grp_nom)
        form_log.append("matiere_nom", mat_nom)
        form_log.append("annee_nom", an_nom)
        //console.log(formData, an_nom, grp_nom, mat_nom)
        axios.post("http://127.0.0.1:8000/api/add/groupe/derige", form_log)
        .then(res => {
            //console.log(res.data)
            toaster.success('Groupe ajouté',{
                duration: 2,
                description : `${an_nom} ${grp_nom}`
            })
        }) 
    }
   
    function onSubmit2  (e)  {
        //e.preventDefault()
        let form_log = new FormData();
        form_log.append("prof", userDetails.id)
        form_log.append("matiere", matiere)
        axios.post("http://127.0.0.1:8000/api/matiere/add", form_log)
        .then(res => {
            toaster.success(`${res.data.Intitule_matiere} Ajoutée à vos matières`,{
                duration: 2,
            })
        })

    }
    return (
        <>
            <Container className="py-5">
            <Button className="mb-3" variant="outline-danger" size="sm" onClick={Back}><i className="fas fa-arrow-left"></i> Retour</Button>
                <div className="d-flex justify-content-center align-items-center h-25">
                    <h1 className="text-secondary mb-0">Ajouter Matière</h1>
                </div>
                <Form className="py-4" onSubmit={onSubmit2} >
                <FloatingLabel
                        controlId="matiere"
                        label="Matiére"
                        className="mb-3"
                    >
                        <Form.Control  
                            type="text" 
                            placeholder="Matiére" 
                            onChange={e => setMatiere( e.target.value )}
                            />
                    </FloatingLabel>                    
                    <Button className="mt-5" variant="primary" type="submit" /* disabled={password === '' || formData.email === '' || formData.password === '' || password !== formData.password? true : false} */>
                        Ajouter
                    </Button>
                </Form>

                <div className="d-flex justify-content-center align-items-center h-25">
                    <h1 className="text-secondary mb-0">Ajouter Groupe</h1>
                </div>
                <Form className="py-4" onSubmit={onSubmit1} >
                    <FloatingLabel className="mb-4" controlId="floatingSelectAnnee" label="Année">
                        <Form.Select aria-label="Année" onChange={handleForm} name="annee">
                            {
                                Annees.map(Annee => <option key={Annee.id} value={Annee.id}>{Annee.nom_annee}</option>)
                            }
                        </Form.Select>
                        </FloatingLabel>
                    <FloatingLabel className="mb-4" controlId="floatingSelectGroupe" label="Groupe">
                        <Form.Select aria-label="Groupe"  name="groupe" onChange={handleForm} onFocus={getGroupes}>
                            {Groupes.length > 0?
                            
                                Groupes.map(Groupe => <option key={Groupe.id} value={Groupe.id}>{Groupe.nom_grp}</option>)
                           
                            : <option >Vide</option>
                            }
                           
                        </Form.Select>
                        </FloatingLabel>
                    <FloatingLabel className="mb-4" controlId="floatingSelectGroupe" label="Matiere">
                        <Form.Select aria-label="Groupe"  name="matiere" onChange={handleForm} onFocus={getMatiere}>
                        {Matieres.length > 0?
                            
                            Matieres.map(matiere => <option key={matiere.id} value={matiere.id}>{matiere.Intitule_matiere}</option>)
                       
                        : <option >Vide</option>
                        }
                           
                        </Form.Select>
                    </FloatingLabel>
                    
                    <Button className="mt-5" variant="primary" type="submit" /* disabled={password === '' || formData.email === '' || formData.password === '' || password !== formData.password? true : false} */>
                        Ajouter
                    </Button>
                </Form>
            </Container>
        </>
    )
}
