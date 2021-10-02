import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import NavBar from './components/NavBar';
import PageContent from './components/PageContent';
import AuthLogin from './components/AuthLogin';
import AuthRegister from './components/AuthRegister';
import GameCardDisplay from './components/GameCardDisplay';

function App() {
  return (
  <>
  <Router>
    <NavBar/>
    <Route exact path="/" component={PageContent}/>
    <Route path="/login" component={AuthLogin}/>
    <Route path="/register" component={AuthRegister}/>
    <Route path="/games" component={GameCardDisplay}/>
  </Router>
    
  </>
  );
}

export default App;
