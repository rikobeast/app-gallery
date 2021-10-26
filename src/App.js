import "./App.css";
import { Provider } from "react-supabase";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  HashRouter,
} from "react-router-dom";
import NavBar from "./components/NavBar";
import HomePage from "./components/HomePage";
import AuthLogin from "./components/AuthLogin";
import AuthRegister from "./components/AuthRegister";
import Games from "./components/Games";
import { supabase } from "./supabase";
import AuthProvider from "./auth/AuthProvider";
import Dashboard from "./components/Dashboard";
import Upload from "./components/Upload";

function App() {
  return (
    <>
      <HashRouter>
        <AuthProvider>
          <Provider value={supabase}>
            <Switch>
              <NavBar />
            </Switch>
            <Route exact path="/" component={HomePage} />
            <Route path="/login" component={AuthLogin} />
            <Route path="/register" component={AuthRegister} />
            <Route exact path="/games" component={Games} />
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/upload" component={Upload} />
          </Provider>
        </AuthProvider>
      </HashRouter>
    </>
  );
}

export default App;
