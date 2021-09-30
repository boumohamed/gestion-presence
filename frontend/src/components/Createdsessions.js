import React, { useState, useEffect} from 'react'
import { useHistory } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import { Table, Spinner } from 'evergreen-ui'

import axios from 'axios'

export default function Createdsessions() {

    const history = useHistory()
    const [user, setUser] = useState(JSON.parse(sessionStorage.getItem('currentUser')))
    const [userDetails, setUserDetails] = useState({})
    const [Sessions, setSessions] = useState({})
    const [isLoading, setLoading] = useState(true)
    var date = new Date()
    var today = date.getDate() + '-' + date.getMonth()+1 + '-' + date.getFullYear()
    
    function Navigation(session_id){
        history.push({
            pathname: `/createdsessions/${session_id}`,
            state: { 
              id: session_id,
            },
          });
    }
    useEffect(async () => {
      
        await axios.get(`http://127.0.0.1:8000/api/get/prof/${user.id}`)
            .then(res => {
                setUserDetails(res.data)
                return res.data.id
            })
            .then(id => {
                return axios.get(`http://127.0.0.1:8000/api/prof/session/${id}`)
            })
            .then(res => {
                setSessions(res.data.reverse())
                //console.log(res.data)
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
        {isLoading?

            <Spinner marginX="auto" marginY={120} />
        :
            <Table >
                <Table.Head>
                    <Table.TextHeaderCell>Date</Table.TextHeaderCell>
                    <Table.TextHeaderCell>De</Table.TextHeaderCell>
                    <Table.TextHeaderCell>à</Table.TextHeaderCell>
                    <Table.TextHeaderCell>Année</Table.TextHeaderCell>
                    <Table.TextHeaderCell>Groupe</Table.TextHeaderCell>
                    <Table.TextHeaderCell>Matiére</Table.TextHeaderCell>
                </Table.Head>
                <Table.Body>
                    {Sessions && Sessions.length > 0? 
                        
                        Sessions.map(seance => (
                            
                            <Table.Row isSelectable onSelect={() => {Navigation(seance.id)}} key={seance.id}>
                                <Table.TextCell>{seance.date}</Table.TextCell>
                                <Table.TextCell>{seance.heureD}</Table.TextCell>
                                <Table.TextCell>{seance.heureF}</Table.TextCell>
                                <Table.TextCell>{seance.nom_annee}</Table.TextCell>
                                <Table.TextCell>{seance.nom_grp}</Table.TextCell>
                                <Table.TextCell>{seance.nom_matiere}</Table.TextCell>
                            </Table.Row>
                        ))
                    : null
                }
                    
                </Table.Body>
            </Table>    
        } 
        </Container> 
        </>
    )
}
