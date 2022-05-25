import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Link, Route , Redirect, Switch} from 'react-router-dom';
import Header from './Components/Screens/Headers/Header';
import Amplify, { Auth } from 'aws-amplify';
import awsConfig from './awsConfig';
import { useState, useEffect } from 'react';
import SignIn from './Components/authentication/SignIn';
import AgentHome from "./Components/Screens/Enrollment/agentHome";
import RootComponent from "./Components/Screens/Enrollment/rootComponent";
import Login from "./Components/Screens/Login/login";
import Welcome from "./Components/Screens/Enrollment/Welcome";
import Prospect from "./Components/Screens/Enrollment/prospect";
import Employer from "./Components/Screens/Enrollment/employer";
import TestComponent from "./Components/Screens/Enrollment/TestComponent";
import Configuration from './configurations'
global.load=0;

Amplify.configure(awsConfig);

const App = (props) => {
    useEffect(() => {
        if(Configuration.BRAND == 'netwell'){
            localStorage.setItem("Brand",'netwell')
        }
    })
    return (
        <div className="App">
            <BrowserRouter>
            <Switch>
                <Route exact path="/" component={RootComponent} />
                <Route path="/login" component={SignIn} />
                <Route path="/manage-employers" component={Employer} />
                <Route path="/manage-prospects" component={Prospect} />
                {/*<Route path="/agent_home" component={AgentHome} />*/}
                <Route path="/agentdir/:org/:broker" component={Welcome} />
                <Route path="/TestComponent" component={TestComponent} />
                {/* <Route path="/agentdir/tutelachannel/NIL9292" component={Welcome} /> */}
                <Redirect from="/" to="/" />
                </Switch>
            </BrowserRouter>
        </div>
    )
    
}

//export default withAuthenticator(App, true);
export default App;
