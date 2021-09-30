import React, { useState, useEffect } from 'react'
import AddSession from './AddSession'
import Sessions from './Student/Sessions'
import { Container } from 'react-bootstrap'
import axios from 'axios'
export default function HomePage() {

    const [user, setUser] = useState(JSON.parse(sessionStorage.getItem('currentUser')))
    const [userDetails, setUserDetails] = useState({})
    const [isLoading, setLoading] = useState(true)

    useEffect(async () => {
        
        if(user && user.is_Prof){
           await axios.get(`api/get/prof/${user.id}`)
           .then(res => {
               setUserDetails(res.data)
           })
           .catch(error => console.log(error))
       }
       else if(user && user.is_Etudiant) {
           await axios.get(`api/get/etudiant/${user.id}`)
           .then(res => {
               setUserDetails(res.data)
           })
           .catch(error => console.log(error))
       } 
       
   }, []
   )

  
    return (
        <>
            
                <Container>
                    {user && user.is_Prof?

                        <AddSession />
                    : 
                        <Sessions />
                    }
                </Container>
         
        </>
    )
}
