import React, {useState , useEffect} from 'react'
import { useHistory } from 'react-router-dom'

import { Container} from 'react-bootstrap'
import { Table, Pane, Spinner } from 'evergreen-ui'
import axios from 'axios'
export default function AnneesList() {

    const history = useHistory()
    const [GroupList, setGroupes] = useState([])
    const [Annees, setAnnees] = useState([])
    const [filieres, setfilieres] = useState([])
    const [globaleList, setGL] = useState([])
    const [isLoading, setLoading] = useState(true)

    function Navigation(annee_id){
        history.push({
            pathname: `/annees/${annee_id}`,
            state: { 
              id: annee_id,
            },
          });
    }

    useEffect(async () => {
        /* await axios.get('/api/get/groupes/')
        .then(res => {    
            setGroupes(res.data)
            console.log(res.data)
        }) */
        await axios.get('http://127.0.0.1:8000/api/annees')
       .then(res => {  
           setAnnees(res.data)
        })
        /* await axios.get('/api/filieres/alias')
       .then(res => {  
            setfilieres(res.data)
            //console.log(filieres)
           
           
        }) */
        
    }, [])
    
    useEffect(() => {
          
        setTimeout(() => {
            setLoading(false)
        }, 2000)
    })

    /* useEffect(() => {
        const resultList = GroupList.map(grp => {
            const annee = Annees.find(a => a.id === grp.annee) || {};
            const filiere = filieres.find(f => f.id === grp.filiere) || {};
            return { ...grp, ...annee, ...filiere };
          });
          setGL(resultList)
          console.log(globaleList)
  }, []) */
    return (
        <>
        {isLoading? 
            <>
                <Pane>
                    <Spinner marginX="auto" marginY={120} />
                </Pane>
            </>
            : 
            <>
        <Container className="py-5">
            <Table>
                <Table.Head>
                    <Table.TextHeaderCell>Années</Table.TextHeaderCell>
                </Table.Head>
                <Table.Body >
                    {Annees.map(annee => (
                        <Table.Row isSelectable onSelect={() => {Navigation(annee.id)}} key={annee.id}>
                            <Table.TextCell> {annee.nom_annee}</Table.TextCell>
                        </Table.Row>
                    ))} 
                </Table.Body>
            </Table>
        </Container>
        </>
        }
            
        </>
    )
}
