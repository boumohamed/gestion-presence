
import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import { Table, Spinner, Button, toaster } from 'evergreen-ui'
import axios from 'axios'

export default function Sessions() {

    const [user, setUser] = useState(JSON.parse(sessionStorage.getItem('currentUser')))
    const [Etudiant, setEtudiant] = useState({})
    const [Sessions, setSessions] = useState({})
    const [isPresent, setPresent] = useState({})
    const [isLoading, setLoading] = useState(true)
    const history = useHistory()
    const today = new Date()
    
    
    /* function Navigation(id_session){
        history.push({
            pathname: `/sessions/${id_session}`,
            state: { 
              id : id_session
            },
          });
    } */

    useEffect(async () => {

        await axios.get(`http://127.0.0.1:8000/api/get/etudiant/${user.id}`)
        .then(res => {
            setEtudiant(res.data)
            //console.log(res.data)
            return res.data.groupe
        })
        .then(id => {
           return axios.get(`http://127.0.0.1:8000/api/get/session/${id}`)
        }).then(res => {
            setSessions(res.data.reverse())
            //console.log(res.data)
        })
   }, []
   )

   function Present(id){
       let form_data = new FormData();
       let today = new Date()
       var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
       /* let day = date.getDate()
       let month = date.getMonth()
       let year = date.getFullYear()
       let houre = date.getHours()
       let minut = date.getMinutes()
       let time = day + '-' + month + '-' + year + ' à ' + houre + ':' + minut */
       form_data.append("present", true)
       form_data.append("presence_heure", today.toLocaleTimeString())
       
       axios.get(`http://127.0.0.1:8000/api/present/test/${id}/${Etudiant.id}`)
       .then(res => {
           setPresent(res.data)
           //console.log(res.data)
            let date1 = new Date(res.data[0].date)

            if(date1.toLocaleDateString('fr-FR', options) === today.toLocaleDateString('fr-FR', options))
            {
                if(today.toLocaleTimeString() >= res.data[0].heureD && today.toLocaleTimeString() <= res.data[0].heureF){

                    if(res.data && res.data[0].present){
                    
                        toaster.notify('votre présence est déjà marquée ',{
                            duration: 4,
                            description : `date de présence est ${res.data[0].presence_heure}`
                        },)
                    }
                    else if(res.data && !res.data[0].present){
                        
                        axios.put(`http://127.0.0.1:8000/api/present/confirm/${id}/${Etudiant.id}`, form_data)
                        .then(res => {
                            toaster.success('votre présence est marquée ',{
                                duration: 4,
                                description : `date de présence est ${today.toLocaleTimeString()}`
                            },)
                        });
                    }       
                }
                else{

                    if(res.data && res.data[0].present){
                    
                        toaster.notify('votre présence est déjà marquée ',{
                            duration: 4,
                            description : `Heure de présence est ${res.data[0].presence_heure}`
                        },)
                    }
                    else if(res.data && !res.data[0].present){
                        toaster.warning('Impossible de marquer la présence ',{
                            duration: 4,
                            description : `vous avez le droit entre ${res.data[0].heureD} et ${res.data[0].heureF}`
                        },)
                    }       
                    
                }
            }
            else{

                if(res.data && res.data[0].present){
                
                    toaster.notify('présence déjà marquée ',{
                        duration: 4,
                        description : `Vous étiez present(e) le ${res.data[0].date} à ${res.data[0].presence_heure}`
                    },)
                }
                else if(res.data && !res.data[0].present){
                    toaster.danger('Trop tard pour marquer votre présence',{
                        duration: 4,
                        description: `séance passée en ${res.data[0].date}`,
                    },)
                }       
            }
        })
        
        
       
   }
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
                        <Table.TextHeaderCell>Matiére</Table.TextHeaderCell>
                        <Table.TextHeaderCell></Table.TextHeaderCell>
                    </Table.Head>
                    <Table.Body>
                        {Sessions && Sessions.length > 0? 
                            
                            Sessions.map(session => (
                                
                                <Table.Row isSelectable key={session.id}>
                                    <Table.TextCell>{session.date}</Table.TextCell>
                                    <Table.TextCell>{session.heureD}</Table.TextCell>
                                    <Table.TextCell>{session.heureF}</Table.TextCell>
                                    <Table.TextCell>{session.nom_matiere}</Table.TextCell>
                                    <Table.TextCell>
                                        <Button marginRight={20} appearance="primary" intent="success" onClick={() => {Present(session.id)}}>
                                            Présent(e)
                                        </Button>
                                    </Table.TextCell>                     
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
