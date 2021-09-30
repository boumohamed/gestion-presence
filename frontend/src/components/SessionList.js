import React from 'react'
import { useHistory } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import { Table } from 'evergreen-ui'

export default function SessionList() {

    const history = useHistory()

    function Navigation(){
        history.push({
            pathname: '/etudiantlist',
            state: { 
              update: true, 
            },
          });
    }
    return (
        <>
            <Container className="py-5">
                <Table >
                    <Table.Head>
                        <Table.TextHeaderCell>Date</Table.TextHeaderCell>
                        <Table.TextHeaderCell>De</Table.TextHeaderCell>
                        <Table.TextHeaderCell>à</Table.TextHeaderCell>
                        <Table.TextHeaderCell>Matiére</Table.TextHeaderCell>
                    </Table.Head>
                    <Table.Body  >
                        <Table.Row isSelectable onSelect={Navigation}>
                            <Table.TextCell>12/01/2021</Table.TextCell>
                            <Table.TextCell>08:30</Table.TextCell>
                            <Table.TextCell>10:00</Table.TextCell>
                            <Table.TextCell>POO</Table.TextCell>
                        </Table.Row>
                        
   
                    </Table.Body>
                </Table>
            </Container>                     
        </>
    )
}
