import React, { useState, useEffect } from 'react'
import { Form, Button,  Container, FloatingLabel, Row, Col } from 'react-bootstrap'
import { CornerDialog, Pane, Spinner, toaster } from 'evergreen-ui'
import axios from 'axios'




export default function AddSession() {

   
    const InitData = {
        date: "",
        heureD: "",
        heureF: "",
        nom_groupe: "",
        groupe: "",
        nom_matiere : "",
        matiere: "", 
        annee : "",
        nom_annee : "",
        seance : ""
    }
    const [user, setUser] = useState(JSON.parse(sessionStorage.getItem('currentUser')))
    const [userDetails, setUserDetails] = useState({})
    const [formData, setData] = useState(InitData)
    const [Groupes, setGroupes] = useState({})
    const [Matieres, setMatieres] = useState({}) 
    const [Annees, setAnnees] = useState({}) 
    const [Etudiants, setEtudiants] = useState({})
    const [Session, setSession] = useState({})
    let date    = new Date()
    var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };


    function handleForm(e) {
        const { name, value } = e.target;
        setData({ ...formData, [name]: value });
        }

        useEffect(async () => {
    
               await axios.get(`http://127.0.0.1:8000/api/get/prof/${user.id}`)
               .then(res => {
                   setUserDetails(res.data)
               })
               .catch(error => console.log(error)) 
               setGroupes({})

               
       }, []
       ) 

    function getGroupes(){
        if(formData.annee){

            axios.get(`http://127.0.0.1:8000/api/prof/get/groupes/${userDetails.id}/${formData.annee}`) //test annee
            .then(res => {
                setGroupes(res.data)
                setData({ ...formData, groupe : res.data[0].id });
                //console.log(res.data)
            })
            .catch(err => {
                setGroupes({})
            })
        }
    }

     function getMatieres(){
       
         axios.get(`http://127.0.0.1:8000/api/prof/matiere/${userDetails.id}`)
            .then(res => {
                setMatieres(res.data)
                setData({ ...formData, matiere : res.data[0].id });
            })
            .catch(err => {
                setMatieres({})
            })
            let grp_id
            if(Groupes && Groupes.length === 1){
                grp_id = Groupes[0].groupe
            }
            else if(Groupes && Groupes.length > 1){
                grp_id = Groupes.filter(grp => grp.id === parseInt(formData.groupe))[0].groupe
            }
            axios.get(`http://127.0.0.1:8000/api/get/etudiants/${grp_id}`)
            .then(res => {
                setEtudiants(res.data)
                //console.log(res.data)
            })
            /* if(grp_id)
            {
                axios.get(`http://127.0.0.1:8000/api/get/etudiants/${grp_id}`)
               .then(res => {
                   setEtudiants(res.data)           
               })

            } */

            //console.log(Etudiants, grp_id)
    }

    function getAnnees(){
       
        axios.get(`http://127.0.0.1:8000/api/annees`)
            .then(res => {
                setAnnees(res.data)
                setData({ ...formData, annee : res.data[0].id });
                //console.table(res.data)
            })
            
            setGroupes({})
            
    }

    function marquer_presence(grp_nom, mat_nom, id_session, grp_id){

        Etudiants.forEach(etudiant => {
            let form_data_absence = new FormData();
            
            form_data_absence.append("seance", id_session)
            form_data_absence.append("etudiant", etudiant.id)
            form_data_absence.append("etudiant_nom", etudiant.nom)
            form_data_absence.append("etudiant_prenom", etudiant.prenom)
            form_data_absence.append("date", date.toLocaleDateString('fr-FR', options))
            form_data_absence.append("heureD", formData.heureD)
            form_data_absence.append("heureF", formData.heureF)
            form_data_absence.append("groupe", grp_id)
            form_data_absence.append("matiere", formData.matiere)
            form_data_absence.append("groupe_nom", grp_nom)
            form_data_absence.append("matiere_nom", mat_nom)

            axios.post("http://127.0.0.1:8000/api/present/marquer/", form_data_absence)
            toaster.success("envoyée à",{
                duration: 2,
                description: etudiant.nom + ' ' + etudiant.prenom
            },)            
        })
    }

    function onSubmit(e){
        e.preventDefault()
        let form_data = new FormData();
        let grp_nom
        let grp_id
        let mat_nom
        let an_nom
        form_data.append("prof", userDetails.id)
        form_data.append("date", date.toLocaleDateString('fr-FR', options))
        form_data.append("heureD", formData.heureD)
        form_data.append("heureF", formData.heureF)
        form_data.append("matiere", formData.matiere)
        form_data.append("annee", formData.annee)
        if(Groupes && Groupes.length > 0){

            grp_nom = Groupes.filter(grp => grp.id === parseInt(formData.groupe))[0].nom_grp
            grp_id  = Groupes.filter(grp => grp.id === parseInt(formData.groupe))[0].groupe
        }
        if(Matieres && Matieres.length > 0){

            mat_nom =  Matieres.filter(matiere => matiere.id === parseInt(formData.matiere))[0].Intitule_matiere
        }
        if(Annees && Annees.length > 0){

            an_nom  = Annees.filter(annee => annee.id === parseInt(formData.annee))[0].nom_annee
        }
        form_data.append("groupe", grp_id)
        form_data.append("groupe_nom", grp_nom)
        form_data.append("matiere_nom", mat_nom)
        form_data.append("annee_nom", an_nom)


        axios.post("http://127.0.0.1:8000/api/session/add/", form_data)
        .then(res => {
            

        marquer_presence(grp_nom, mat_nom, res.data.id, grp_id)
        //console.log(res.data)
        toaster.success('Séance créee avec success',{
            duration: 4,
        },)

        }).catch(err => {
            toaster.danger('Oops ;(',{
                duration: 2,
            },)
        })
        

        
        
    }

    return (
        <>
            <Container className="py-5">
            <div className="d-flex justify-content-center align-items-center h-25 mb-5">
                <h1 className="text-secondary mb-0">Créez <i class="fas fa-calendar-alt text-primary"></i> la Séance</h1>
            </div>
            <Form onSubmit={onSubmit} >
                    <Row className="mb-3">
                    <FloatingLabel as={Col} controlId="floatingSelect" label="Année">
                    <Form.Select aria-label="Matiére" onChange={handleForm} name="annee" onFocus={getAnnees}>
                    {Annees.length > 0?
                            Annees.map(an => <option key={an.id} value={an.id}>{an.nom_annee}</option>)
                        : <option >Vide</option>
                        }
                    </Form.Select>
                    </FloatingLabel>
                    <FloatingLabel as={Col} controlId="floatingSelect" label="Groupe" >
                    <Form.Select aria-label="Groupe" onChange={handleForm} name="groupe" onFocus={getGroupes} disabled={!(Annees.length > 0)? true : false}>
                    {Groupes.length > 0?

                            Groupes.map(Groupe => <option key={Groupe.id} value={Groupe.id}>{Groupe.nom_grp}</option>)
                            
                        : <option >Vide</option>
                        }
                    </Form.Select>
                    </FloatingLabel>
                    <FloatingLabel as={Col} controlId="floatingSelect" label="Matiére">
                    <Form.Select aria-label="Matiére" onChange={handleForm} name="matiere" onFocus={getMatieres}>
                    {Matieres.length > 0?
                            
                            Matieres.map(Matiere => <option key={Matiere.id} value={Matiere.id}>{Matiere.Intitule_matiere}</option>)
                       
                        : <option >Vide</option>
                        }
                    </Form.Select>
                    </FloatingLabel>
                    </Row>
                    <Row className="mb-3">
                    <FloatingLabel as={Col}
                        controlId="heureD"
                        label="Heure Debut"
                        className="mb-3"
                    >
                    <Form.Control  
                        type="time" 
                        placeholder="Heure Debut"
                        name="heureD"
                        value={formData.heureD}
                        onChange={handleForm}
                        
                        />
                    </FloatingLabel>
                    <FloatingLabel as={Col}
                        controlId="heureF"
                        label="Heure Fin"
                        className="mb-3"
                    >
                        <Form.Control  
                            type="time" 
                            placeholder="Heure Fin"
                            name="heureF"
                            value={formData.heureF}
                            onChange={handleForm}
                            />
                    </FloatingLabel>
                    </Row>
                    <Button variant="primary" type="submit">
                        Créer
                    </Button>
                </Form>
                
            </Container>
        </>
    )
}


{/* <Popover
                position={Position.BOTTOM_LEFT}
                content={
                    <Menu>
                    <Menu.Group>
                        <Menu.Item icon={PeopleIcon}>Share...</Menu.Item>
                        <Menu.Item icon={CircleArrowRightIcon}>Move...</Menu.Item>
                        <Menu.Item icon={EditIcon} secondaryText="⌘R">
                        Rename...
                        </Menu.Item>
                    </Menu.Group>
                    <Menu.Divider />
                    <Menu.Group>
                        <Menu.Item icon={TrashIcon} intent="danger">
                        Delete...
                        </Menu.Item>
                    </Menu.Group>
                    </Menu>
                }
                >
                <Button variant="outline-primary" size="sm">With Icons</Button>
            </Popover> */}