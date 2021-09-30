import React, {useState, useEffect} from 'react'
import { useHistory } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import { Table, Pane, Spinner } from 'evergreen-ui'
import { Button } from 'react-bootstrap'
import axios from 'axios'

export default function EtudiantList({ match }) {

    const [Etudiants, setEtudiants] = useState([]) 
    const [isLoading, setLoading] = useState(true)
    const [isShown, setIsShown] = useState(false)
    const history = useHistory()

    function Back(){
        history.push(`/grouplist`)
    }
    useEffect(async () => {
               
        await axios.get(`http://127.0.0.1:8000/api/get/etudiants/${match.params.id}`)
       .then(res => {  
            setEtudiants(res.data)            
        })
            
    }, [])

    useEffect(() => {
          
        setTimeout(() => {
            setLoading(false)
            
        }, 2000)
    })
    
    return (
        <>

            {isLoading?
            <>
                <Pane>
                    <Spinner marginX="auto" marginY={120} />
                </Pane>
             </>
            :
            <>
                <Container className="py-5">   
                    <Button className="mb-3" variant="outline-danger" size="sm" onClick={Back}><i className="fas fa-arrow-left"></i> Retour</Button>
                    <Table >
                        <Table.Head height={50}>
                            <Table.TextHeaderCell>ID</Table.TextHeaderCell>
                            <Table.TextHeaderCell>Nom</Table.TextHeaderCell>
                            <Table.TextHeaderCell>Prenom</Table.TextHeaderCell>
                        </Table.Head>
                        <Table.VirtualBody height={240} scrollToAlignment="start">
                            {
                                Etudiants.map(etd => (
                                    <Table.Row  isSelectable key={etd.id} >
                                        <Table.TextCell>{etd.id} </Table.TextCell>
                                        <Table.TextCell>{etd.nom} </Table.TextCell>
                                        <Table.TextCell>{etd.prenom}</Table.TextCell>
                                    </Table.Row>
                                ))
                            }
                        </Table.VirtualBody>
                    </Table>
                </Container>
            </>   
}         
        </>
    )
}
