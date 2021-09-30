import React, { useState, useEffect} from 'react'

import { Container } from 'react-bootstrap'
import axios from 'axios'
import { useLocation } from 'react-router-dom';
import {  Pane, SideSheet, Card, Button, Heading } from 'evergreen-ui'


export default function EtudiantDetails({ match }) {
    
    
    const [userDetails, setUserDetails] = useState({})
    const [Groupe, setGroupe] = useState({})
    const [Annee, setAnnee] = useState({})
    const [PresenceList, setPresenceList] = useState({})
    const [isShown, setIsShown] = React.useState(false)
    const location = useLocation()
    let id_etudiant
    
    useEffect(async () => {
        await axios.get(`http://127.0.0.1:8000/api/get/etudiant/${location.state.id_user}`)
        .then(res => {
            setUserDetails(res.data)
            id_etudiant = res.data.id
            //console.log(res.data)
            return res.data.groupe
        }).then(id => {
            return axios.get(`http://127.0.0.1:8000/api/get/onegroupe/${id}`)
        }).then(res => {
            setGroupe(res.data)
            //console.log(res.data)
            return res.data.annee
        }).then(id => {
            return axios.get(`http://127.0.0.1:8000/api/get/oneannee/${id}`)
        })
        .then(res => {
            setAnnee(res.data)
            return id_etudiant
        }).then(id => {
            return axios.get(`http://127.0.0.1:8000/api/presence/etudiant/${id}`)
        }).then(res => {
            setPresenceList(res.data)
            console.log(res.data)
        })
            }, [])
    return (
        <>
            <Container className="py-5">
            {/* <Card>
                <Card.Content>
                    <Card.Header content={userDetails.nom + ' ' + userDetails.prenom} />
                    <Card.Meta content={Annee.nom_annee + ' ' + Groupe.nom_grp} />
                    <Card.Description content='Jake is a drummer living in New York.' />
                </Card.Content>
            </Card> */}
            <SideSheet
                isShown={isShown}
                onCloseComplete={() => setIsShown(false)}
                containerProps={{
                display: 'flex',
                flex: '1',
                flexDirection: 'column'
                }}
            >
                <Pane zIndex={1} flexShrink={0} elevation={0} backgroundColor="white">
          <Pane padding={16}>
            <Heading size={600}>Title</Heading>
          </Pane>
        </Pane>
        <Pane flex="1" overflowY="scroll" background="tint1" padding={16}>
          <Card
            backgroundColor="white"
            elevation={0}
            height={240}
            display="flex"
            
          >
            <Heading>Some content</Heading>
          </Card>
        </Pane>
      </SideSheet>
      <Button onClick={() => setIsShown(true)}>Show Basic Side Sheet</Button>
            </Container>
        </>
        
    )
}
