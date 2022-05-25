import React from 'react';
import {withStyles} from "@material-ui/core/styles";
import {connect} from "react-redux";
import {Auth} from "aws-amplify";
import Header from "../Headers/Header";
import AgentHome from "./agentHome";
import axios from "axios";
import configurations from "../../../configurations";
import Loader from "../../loader";


class RootComponent extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            loaderShow : false,
            userLoggedIn : false,
            agentId : "",
            clientId : "",
            associationId : "",
            clientName : "",
            defaultEmpid : ''
        }
    }
    componentWillUnmount() {
        this.setState = (state,callback)=>{
            return;
        };
    }

    componentDidMount() {   
        this.setState({
            loaderShow: true
        });
    if(localStorage.getItem('IAgree') === "true"){
        Auth.currentAuthenticatedUser()
        .then((user) => {
            let data = this.parseJwt(user.signInUserSession.idToken.jwtToken);
            let name = data.name.split(' ');
            let obj = {
                firstName : name[0],
                lastName : name[1],
                "phone": data.phone_number,
                "email": data.email,
                "clientId" : parseInt(data["custom:ChannelId"]),
                "associationId": data["custom:associationId"],
                "brokerId": data["custom:agentid"]
            };
            sessionStorage.setItem('username', data.name);
            sessionStorage.setItem('email', data.email);
            sessionStorage.setItem('phone', data.phone_number);
            this.props.setUserData(obj.brokerId, obj.clientId, obj.associationId);
            sessionStorage.setItem('USER_NAME', name[0] + ' ' +name[1] )
console.log("data----",Auth.currentAuthenticatedUser())
        /*axios.post(configurations.baseUrl + '/agentlogin/addAgent', obj)*/
        axios.get(configurations.baseUrl + '/employer/getClientInfo/' +  parseInt(data["custom:ChannelId"]))
            .then(response => {
                let userData = JSON.parse(JSON.stringify(response.data.response));
                axios.get(configurations.baseUrl + "/agentlogin/getAgentById/" + obj.brokerId)
                    .then((response) => {
                        console.log("desc===", response)
                        if (response.data.response) {
                            this.setState({
                                associationId : response.data.response.associationId,
                                defaultEmpid : response.data.response.defaultEmpid ? response.data.response.defaultEmpid : '',
                                agentId : response.data.response.brokerId,
                                loaderShow : false,
                                userLoggedIn : true,
                                clientId : userData.clientId,
                                clientName : userData.clientName
                            });
                            sessionStorage.setItem('USER_DATA',JSON.stringify({agentId : response.data.response.brokerId, clientId : userData.clientId, associationId : response.data.response.associationId, clientName : userData.clientName, defaultEmpid : response.data.response.defaultEmpid ? response.data.response.defaultEmpid : ''}))
                        }
                        });
                    sessionStorage.setItem('clientName', userData.clientName);
                })
        }).catch((err)=>{
        sessionStorage.setItem('isLogged', false);
        localStorage.setItem('isLogged', false);
        this.props.history.push("/login");
        this.setState({
            loaderShow: false,
            userLoggedIn: false
        })
    });
 }else{
     let curUser =  Auth.currentAuthenticatedUser();
     console.log(curUser)
     Auth.signOut();
     localStorage.clear();
     sessionStorage.clear();
     curUser =  Auth.currentAuthenticatedUser();
     this.props.history.push("/login");
     console.log(curUser)
 }

     
}

    parseJwt = (id_token) => {

        let base64Url = id_token.split('.')[1];

        let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');

        let jsonPayload = decodeURIComponent(

            atob(base64)

                .split('')

                .map(function (c) {

                    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)

                })

                .join('')

        );

        let token = JSON.parse(jsonPayload);
        return token;
    };

    render() {
        
        return(
            <div>
                {
                    this.state.userLoggedIn ?
                    <div>
                        {
                            this.state.loaderShow ? <Loader></Loader> : ''
                        }
                        <Header  agentId={this.state.agentId} clientId={this.state.clientId} associationId={this.state.associationId} clientName={this.state.clientName} bottomMargin={'30px'}></Header>
                        <AgentHome agentId={this.state.agentId} clientId={this.state.clientId} associationId={this.state.associationId} clientName={this.state.clientName} defaultEmpid={this.state.defaultEmpid}></AgentHome>
                    </div> :null
                }

            </div>
        )

    }
}
const mapStateToProps = state => {
    return {
        agentId: state.agentId,
        clientId: state.clientId,
        associationId: state.associationId,
        clientName : state.clientName
    };
}

const mapDispatchToProps = dispatch => {
    return {
        setUserData: (agentId, clientId, associationId, clientName) => dispatch({ type: 'SET_USER_DATA', agentId: agentId, clientId: clientId, associationId: associationId, clientName : sessionStorage.getItem('clientName') })
    }
}


export default (connect(mapStateToProps, mapDispatchToProps)(RootComponent));