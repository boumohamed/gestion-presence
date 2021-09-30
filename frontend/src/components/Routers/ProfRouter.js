import React, { useState } from 'react'
import { Redirect, Route } from 'react-router-dom'

export default function ProfRouter({component : Component , ...rest}) {

    const [user, setUser] = useState(JSON.parse(sessionStorage.getItem('currentUser')))
       
    return (
        <Route
            {...rest}
            render={props => {
                return user && user.is_Prof? <Component {...props} /> : <Redirect to='/signin' />
            }}
        >          
        </Route>
    )
}
