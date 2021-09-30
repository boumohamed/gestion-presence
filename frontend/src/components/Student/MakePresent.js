import React, { useState, useEffect} from 'react'
import { useHistory } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import { Spinner, Button, } from 'evergreen-ui'
import axios from 'axios'

export default function MakePresent({ match }) {
    return (
        <>
            <Container>
                <Button marginRight={16} appearance="primary" intent="success">
                    Success
                </Button>
                
            </Container>
        </>
    )
}
