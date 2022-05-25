import React, { Component } from 'react';
import customStyle from '../../../Assets/CSS/stylesheet_UHS.js';
import Grid from '@material-ui/core/Grid';
import AgentTable from '../../CommonScreens/AgentTable';
import styles from "../../../Assets/CSS/stylesheet_UHS";
import {createMuiTheme,withStyles,MuiThemeProvider} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import {Modal} from "react-bootstrap";
import Loader from "../../loader";
import { BrowserRouter, Link, Route } from 'react-router-dom';
import Sample from '../../CommonScreens/sampleTextField';
import Fab from "@material-ui/core/Fab";
import axios from 'axios';
import AccordonCommon from '../../CommonScreens/AccordonCommon';
import Footer from '../../CommonScreens/Footer'
import configurations from "../../../configurations";
import AgentCard from '../../CommonScreens/agent-card';  
import { embedDashboard ,QuickSightEmbedding } from 'amazon-quicksight-embedding-sdk';



const GenBtn1 = withStyles(
    customStyle.genrateBtn1
)(Button);

const NextButton = withStyles(
    styles.doneBtn
)(Button);

const CustomButton = withStyles(
    customStyle.viewBtn
)(Button);
const CrudButton = withStyles(
    styles.crudBtnAgent,
)(Fab);
const NextButton1 = withStyles(
    styles.doneBtnAgent
)(Button);


class Agent extends Component{
    constructor(props) {
        super(props);
        this.state = {
            refresh : false,
            cardData : [],
            countData : [],
            loaderShow : false
        };
    }

    componentDidMount() {
        
        this.setState({
            loaderShow : true
        })
        let card=[]
        // [
            if(this.props.clientId.toString() === '1001' || this.props.clientId.toString() === '1002' ){
                card.push( { name: 'Work with Households', linkTo: 'manage-prospects', details: '', isEnabled: false, logo: 'work_with_households_icon.svg', hoverLogo: 'work_with_households_icon_active.svg', tag : 'household' },);

            }else if(this.props.clientId.toString() === '1004' || this.props.clientId.toString() === '1004'){
            card.push( { name: 'Work with Employers', linkTo: 'manage-employers', details: '', isEnabled: false,  logo: 'work_with_employers_icon.svg', hoverLogo: 'work_with_employers_icon_active.svg', tag : 'emplopyer' });

            }
            
            // { name: 'Work with Employers', linkTo: 'manage-employers', details: '', isEnabled: false,  logo: 'work_with_employers_icon.svg', hoverLogo: 'work_with_employers_icon_active.svg', tag : 'emplopyer' }
        // ];
        // if(this.props.clientId.toString() === '6548' || this.props.clientId.toString() === '4367' || this.props.clientId.toString() === '4364' || this.props.clientId.toString() === '5503' || this.props.clientId.toString() === '5540' || this.props.clientId.toString() === '4376' || this.props.clientId.toString() === '5541' || this.props.clientId.toString() === '4377' || this.props.clientId.toString() === '5450' || this.props.clientId.toString() === '4359'){
        //     card.push( { name: 'Work with Employers', linkTo: 'manage-employers', details: '', isEnabled: false,  logo: 'work_with_employers_icon.svg', hoverLogo: 'work_with_employers_icon_active.svg', tag : 'emplopyer' });
        // }
       
        axios.get(process.env.REACT_APP_BASE_URL + '/enrollment/getTotalOfMemberByAgentId/' + this.props.agentId)
            .then(response =>{
                this.setState({
                    countData : response.data.response,
                    cardData : card,
                    loaderShow : false
                })
            });

       /* let options = {
            url: "https://us-east-1.quicksight.aws.amazon.com/sn/dashboards/dashboardId?isauthcode=true&identityprovider=quicksight&code=authcode",
            container: document.getElementById("embeddingContainer"),
            parameters: {
                country: "United States",
                states: [
                    "California",
                    "Washington"
                ]
            },
            scrolling: "no",
            height: "150px",
            width: "150px",
            locale: "en-US",
            footerPaddingEnabled: true,
            sheetTabsDisabled: false, // use this option to enable or disable sheet tab controls in dashboard embedding
            printEnabled: false, // use this option to enable or disable print option for dashboard embedding
            defaultEmbeddingVisualType: "TABLE" // this option only applies to experience embedding and will not be used for dashboard embedding
        };
        const dashboard = embedDashboard(options);*/
    }

    openPage = (page) => {
        console.log(this.props.history)
        window.location.replace(window.location.href + page);
    }

    render() {/*,paddingLeft:'10px'*/

        return (
            <div style={{flexGrow:1, padding : '10px'}}>
                {
                    this.state.loaderShow ? <Loader></Loader> : ''
                }
                 <Grid container spacing={2} style={{height: '100vh'}}>
                     <Grid xs={12} sm={8}>
                         <Grid xs={12} sm={12} item style={{fontSize : '16px', fontWeight : 'bold', marginLeft : '20px' }}>
                             Hello {sessionStorage.getItem('USER_NAME')}
                         </Grid>
                         <Grid xs={12} sm={12} item={true} style={{ textAlign : 'center'}}>
                             {
                                 /*this.state.countData.length > 0 &&*/
                                     this.state.cardData.map((card) => {
                                         return (
                                             <AgentCard key={card.name} title={card.name} linkTo={card.linkTo} details={card.details} openPage={this.openPage}  card={card} countData={this.state.countData}/>
                                         )
                                     })
                             }
                         </Grid>
                         {/*<Grid xs={12} sm={12} item >
                             <div id="embeddingContainer"></div>
                         </Grid>*/}
                     </Grid>
                    <Grid xs={12} sm={4} item={true}>
                        <AccordonCommon clientId={this.props.clientId} clientName={this.props.clientName} agentId={this.props.agentId} disable={true}/>
                    </Grid>
                 </Grid>
                <div style={{fontSize:'11px', marginTop:'15px', fontFamily: "Roboto, Arial, Helvetica, sans-serif"}}>
                <Footer/>
                {/* <span style={{float : 'right'}}>Version 3.1.0</span> */}
                </div>



            </div>
        );
    }
}

export default Agent;