import React, { useState } from 'react'
import { Redirect, Route } from 'react-router-dom'

export default function EtudiantRouter({component : Component , ...rest}) {


    const [user, setUser] = useState(JSON.parse(sessionStorage.getItem('currentUser')))
       
    return (
        <Route
            {...rest}
            render={props => {
                return user && user.is_Etudiant? <Component {...props} /> : <Redirect to='/' />
            }}
        >          
        </Route>
    )
}
