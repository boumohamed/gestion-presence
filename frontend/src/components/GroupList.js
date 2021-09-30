import React, {useState , useEffect} from 'react'
import { useHistory } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import { Table, Pane, Spinner } from 'evergreen-ui'
import axios from 'axios'
export default function GroupList({ match }) {

    const history = useHistory()
    const [user, setUser] = useState(JSON.parse(sessionStorage.getItem('currentUser')))
    const [GroupList, setGroupes] = useState([])
    const [isLoading, setLoading] = useState(true)

    function Navigation(grp_id){
        history.push({
            pathname: `/grouplist/${grp_id}`,
            state: { 
              id: grp_id, 
            },
          });
    }

    useEffect(async () => {
        //<str:idprof>/<str:idGrp>
        await axios.get(`http://127.0.0.1:8000/api/get/prof/${user.id}`)
        .then(res => {
            return res.data.id
        })
        .then(id => {
            return axios.get(`http://127.0.0.1:8000/api/prof/get/groupes/${id}`)
        })
       .then(res => {  
            setGroupes(res.data)
            //console.log(res.data)
        })
            }, [])
    
    useEffect(() => {
          
        setTimeout(() => {
            setLoading(false)
        }, 2000)
    })

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
                    <Table.TextHeaderCell>Groupe</Table.TextHeaderCell>
                </Table.Head>
                <Table.Body >
                    {GroupList.map(grp => (
                        
                        <Table.Row isSelectable onSelect={() => {Navigation(grp.groupe)}} key={grp.id}>
                            <Table.TextCell> {grp.nom_annee} {grp.nom_grp}</Table.TextCell>
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
