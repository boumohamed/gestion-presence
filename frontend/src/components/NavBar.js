import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { Navbar, Container, Nav } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { Avatar, Menu, Popover, Position, toaster, Spinner } from 'evergreen-ui'
import axios from 'axios'


export default function NavBar() {

    const [user, setUser] = useState(JSON.parse(sessionStorage.getItem('currentUser')))
    const [userDetails, setUserDetails] = useState({})
    const [isLoading, setLoading] = useState(true)
    const history = useHistory()

    async function Logout(){
        
        sessionStorage.removeItem('currentUser')

         toaster.success('Logged Out',{
             duration: 2,
             description: 'Rendez-vous la seance suivante',
         },
         )
         
         window.location.reload(false);
    }
     useEffect(async () => {
    
         if(user && user.is_Prof){
            await axios.get(`http://127.0.0.1:8000/api/get/prof/${user.id}`)
            .then(res => {
                setUserDetails(res.data)
                //console.log(res.data)
            })
            .catch(error => console.log(error)) 
            

        }
        else if(user && user.is_Etudiant) {
             await axios.get(`http://127.0.0.1:8000/api/get/etudiant/${user.id}`)
            .then(res => {
                setUserDetails(res.data)
                //console.log(res.data)
            })
            .catch(error => console.log(error))
        } 
        
    }, []
    ) 

    function Navigation(){

    }
    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 2000)
    })
    
    return (
        <>
        <Navbar bg="light" variant="light">
            <Container>
            <LinkContainer to="/">
                <Navbar.Brand className="text-secondary" >Todos <i class="fas fa-hand-paper text-primary"></i> Present </Navbar.Brand>
            </LinkContainer>
            
            
                <Nav className="me-auto">
                    {user?
                        <>
                        <LinkContainer to="/">
                                <Nav.Link>Home</Nav.Link>
                        </LinkContainer>
                        {user.is_Prof?
                            <>
                                
                                <LinkContainer to="/createdsessions">
                                    <Nav.Link >Mes Séances</Nav.Link>
                                </LinkContainer>
                                <LinkContainer to="/grouplist">
                                    <Nav.Link >Groupes</Nav.Link>
                                </LinkContainer>
                            </>
                        : null
                        }
                        </>
                    : null 
                    }
                </Nav>
            {user? 
            <Nav>
                <Popover
                    position={Position.BOTTOM_LEFT}
                    content={
                        <Menu>
                        <Menu.Group>
                            <Menu.Item onSelect={Logout}>Déconnexion</Menu.Item>
                            {user.is_Prof? 
                                <Menu.Item onSelect={() => {history.push({
                                                            pathname: '/prof/settings'
                                                        })}}>
                                                Settings
                                </Menu.Item>
                            : 
                                null
                            }
                        </Menu.Group>
                        <Menu.Divider />
                        </Menu>
                    }
                    >
                    {isLoading?

                        <Spinner />
                    :
                        <Avatar name={userDetails.nom + ' ' + userDetails.prenom } size={40} />
                    }
                </Popover>
                
                
            </Nav>
            : null
            }
        </Container>
      </Navbar>
        </>
    )
}
