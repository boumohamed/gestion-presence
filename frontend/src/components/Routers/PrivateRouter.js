import React, { useState } from 'react'
import { Redirect, Route } from 'react-router-dom'

export default function PrivateRouter({component : Component , ...rest}) {

    const [user, setUser] = useState(JSON.parse(sessionStorage.getItem('currentUser')))

    return (
        <Route
            {...rest}
            render={props => {
                return user && user.email !== "" ? <Component {...props} /> : <Redirect to='/signin' />
            }}
        >          
        </Route>
    )
}
