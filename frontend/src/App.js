
import './App.css';
import { Route, BrowserRouter, Switch } from 'react-router-dom'

import SignUp from './components/SignUp'
import SignIn from './components/SignIn'
import NavBar from './components/NavBar'
import AddSession from './components/AddSession';
import GroupList from './components/GroupList';
import EtudiantList from './components/EtudiantList'
import SessionList from './components/SessionList'
import Createdsessions from './components/Createdsessions'
import StudentSignUp from './components/Signing up/StudentSignUp'
import ProfSignUp from './components/Signing up/ProfSignUp'
import HomePage from './components/HomePage'
import AnneesList from './components/AnneesList';
import ProfSession from './components/Screens/ProfSession';
import Makepresent from './components/Student/MakePresent'
import NotFound from './components/redirections/NotFound';
import PrivateRouter from './components/Routers/PrivateRouter'
import EtudiantRouter from './components/Routers/EtudiantRouter';
import ProfRouter from './components/Routers/ProfRouter';
import Sessions from './components/Student/Sessions';
import EtudiantDetails from './components/Student/EtudiantDetails';
import Settings from './components/Student/Settings'
import ProfSettings from './components/Prof/ProfSettings';
import ProfSDownload from './components/Screens/ProfSDownload'



function App() {
  return (
    <>
      <BrowserRouter>
        <main >
              <NavBar />
              <Switch>
                <Route path="/SignUp" component={SignUp} exact/>
                <Route path="/SignUp/prof" component={ProfSignUp} exact/>
                <Route path="/SignUp/etudiant" component={StudentSignUp} exact/>
                <Route path="/signin" component={SignIn} exact/>
                <EtudiantRouter path="/sessions/:id" component={Makepresent} exact/>
                <EtudiantRouter path="/etudiant/settings" component={Settings} exact/>
                {/* <EtudiantRouter path="/sessions" component={Sessions} exact/> */}
                <PrivateRouter path="/" component={HomePage} exact/>
                <ProfRouter path="/addsession" component={AddSession} exact/>
                {/* <ProfRouter path="/annees" component={AnneesList} exact/> */}
                <ProfRouter path="/prof/settings" component={ProfSettings} exact/>
                <ProfRouter path="/grouplist" component={GroupList} exact/>
                <ProfRouter path="/grouplist/:id" component={EtudiantList} exact/>
                <ProfRouter path="/grouplist/:id/etudiants/:id" component={EtudiantDetails} exact/>
                <ProfRouter path="/sessionlist" component={SessionList} exact/>
                <ProfRouter path="/createdsessions" component={Createdsessions} exact/>
                <ProfRouter path="/createdsessions/:id" component={ProfSession} exact/>
                <Route path="**" component={NotFound} exact/>
                
              </Switch>     
        </main>
        </BrowserRouter>

    </>
  );
}

export default App;
