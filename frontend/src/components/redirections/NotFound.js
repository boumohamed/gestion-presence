
import React from 'react'
import { Button, Container } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
export default function NotFound() {
    return (
        <>
            <Container>        
                <LinkContainer to="/">    
                    <Button className="mt-5" variant="primary" size="sm">Home</Button>
                </LinkContainer>
                <div className="d-flex justify-content-center align-items-center py-5 h-100">
                    <h1 >Not <i class="fas fa-frown text-primary"></i> Found </h1>
                </div>
            </Container>
        </>
    )
}
