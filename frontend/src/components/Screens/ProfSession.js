import React, { useState, useEffect} from 'react'
import { useHistory } from 'react-router-dom'
import { Container, Button, ListGroup } from 'react-bootstrap'
import { Table, Spinner, StatusIndicator, SideSheet, Position } from 'evergreen-ui'


import axios from 'axios'

export default function ProfSession({ match })
 {

    const history = useHistory()
    const [Etudiants, setEtudiants] = useState({})
    const [PrsentSessions, setPrsentSessions] = useState({})
    const [Etudiant, setEtudiant] = useState({})
    const [Session, setSession] = useState({})
    const [isShown, setIsShown] = useState(false)
    const [isLoading, setLoading] = useState(true)

    function Back(){
        history.push(`/grouplist`)
    }

    function Navigation(etd){
        setEtudiant(etd)
        setIsShown(true)
        axios.get(`http://127.0.0.1:8000/api/presence/sessions/${etd.etudiant}/${etd.matiere}`)
        .then(res => {
            //console.log(res.data)
            setPrsentSessions(res.data.reverse())
        })
    }
    useEffect(async () => {
      
        await axios.get(`http://127.0.0.1:8000/api/get/etudiants/present/${match.params.id}`)
            .then(res => {
                //console.log(res.data)
                setEtudiants(res.data)
                return match.params.id
            })
            .then(id => {
                return axios.get(`http://127.0.0.1:8000/api/session/${id}`)
            })
            .then(res => {
                //console.log(res.data[0])
                setSession(res.data[0])
            })
    }, [])

    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 2000)
    })

    return (

            <>
            <Container className="py-5">
            <SideSheet
                position={Position.TOP}
                isShown={isShown}
                shouldCloseOnEscapePress
                onCloseComplete={() => setIsShown(false)}
            >
                <Container className="py-5">
                    <h1>{Etudiant.etudiant_nom} {Etudiant.etudiant_prenom}</h1>
                    <ListGroup>
                        {PrsentSessions && PrsentSessions.length > 0?
                        PrsentSessions.map(elem => (
                            <ListGroup.Item key={elem.id}>
                                {elem.present? 
                                <>
                                    <StatusIndicator color="success">Présent(e) : </StatusIndicator> 
                                </> : 
                                    <StatusIndicator color="danger">Absent(e) : </StatusIndicator> 
                               }
                                &nbsp; {elem.nom_matiere}, le {elem.date} de {elem.heureD} à {elem.heureF}
                            </ListGroup.Item>
                            ))
                    : null}
                    </ListGroup>
                </Container>
            </SideSheet>
            {isLoading?
                <Spinner marginX="auto" marginY={120} />
            :
                <>
                    <Button className="mb-3" variant="outline-danger" size="sm" onClick={Back}><i className="fas fa-arrow-left"></i> Retour</Button>
                    <div className="d-flex justify-content-center align-items-center h-25 mb-3">
                        <h1 className="text-secondary mb-0"> {Session.date}, {Session.nom_annee} {Session.nom_grp}</h1>
                    </div>
                    <div className="d-flex justify-content-center align-items-center mb-3">
                        <h2 className="text-secondary mb-2">{Session.nom_matiere} : de {Session.heureD} à {Session.heureF} </h2>
                    </div>
                    <Table >
                        <Table.Head>
                            <Table.TextHeaderCell>ID</Table.TextHeaderCell>
                            <Table.TextHeaderCell>Nom</Table.TextHeaderCell>
                            <Table.TextHeaderCell>Prenom</Table.TextHeaderCell>
                            <Table.TextHeaderCell>Présence</Table.TextHeaderCell>
                            <Table.TextHeaderCell>Heure de Présence</Table.TextHeaderCell>
                        </Table.Head>
                        <Table.Body>
                            {Etudiants ? 
                                Etudiants.map(etudiant => (
                                    <Table.Row isSelectable onSelect={() => {Navigation(etudiant)}} >
                                        <Table.TextCell>{etudiant.id}</Table.TextCell>
                                        <Table.TextCell>{etudiant.etudiant_nom}</Table.TextCell>
                                        <Table.TextCell>{etudiant.etudiant_prenom}</Table.TextCell>
                                        <Table.TextCell>
                                            {etudiant.present?
                                                <StatusIndicator dotSize={15} color="success">Présent(e)</StatusIndicator>
                                            :   <StatusIndicator dotSize={15} color="danger">Absent(e)</StatusIndicator>
                                            }
                                        </Table.TextCell>
                                        <Table.TextCell>
                                                { !etudiant.presence_heure ? "N/A" : etudiant.presence_heure}
                                        </Table.TextCell>                                    
                                    </Table.Row>
                                    
                                
                            ))
                        : null
                        }
                            
                        </Table.Body>
                    </Table>  
                </>  
            } 
            
            </Container> 
            </>
    )
}
