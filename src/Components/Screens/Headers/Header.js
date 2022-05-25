import React, { Component } from 'react';
import styles from '../../../Assets/CSS/stylesheet_UHS';
import Grid from '@material-ui/core/Grid';
import {AppBar, Tabs, Tab} from '@material-ui/core';
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircle from '@material-ui/icons/AccountCircle';
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { Auth } from 'aws-amplify';
import axios from "axios";
import './window.css';
import Configuration from "../../../configurations";
import Loader from "../../loader";
import {Modal,Row,Col,Form} from "react-bootstrap";
import customStyle from "../../../Assets/CSS/stylesheet_UHS"
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import {withStyles} from "@material-ui/core/styles";
import {CopyToClipboard} from 'react-copy-to-clipboard';
import Button from "@material-ui/core/Button";
import Sample from "../../CommonScreens/sampleTextField";
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import configurations from "../../../configurations";
import CommonMultilineText from '../../CommonScreens/commonMultilineText';

const CustomButton = withStyles(
    customStyle.viewBtn
)(Button);

const NextButton = withStyles(
    customStyle.doneBtn
)(Button);


class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLogged: false,
            loaderShow : false,
            association_logo : '',
            anchorEl:null,
            open:false,
            userName : '',
            profileModal : false,
            fname:'',
            lname:'',
            email:'',
            phone:'',
            countryCode : '',
            desc : '',
            imageName : '',
            imagePath : '',
            agentValid : false,
            agentURL: '',
            defaultCountryCode : "",
            imageErr : ''
        };
    }

    componentDidMount() {
        this.setState({
            userName : sessionStorage.getItem('username')
        });
        this.state.isLogged = sessionStorage.getItem('isLogged');

        let data = {
            "clientId" : this.props.clientId
        }
        axios.post(configurations.baseUrl + '/enrollment/getClient', data)
            .then(response=>{
                if(response.data.response){
                    this.setState({
                        agentURL : configurations.AGENT_BASE_URL + response.data.response.clientName + '/' + this.props.agentId
                    })  
                }
            });

        axios.get('https://ipapi.co/json/').then((response) => {
            if (response && response.data) {
                let data = response.data;
                this.setState({
                    defaultCountryCode : data.country_calling_code
                });
            }
        }).catch((error) => {
            console.log(error);
        });

    }
    handleClose = () => {
        this.setState({open:false,anchorEl:null})
    };

    logoutHandler = (event) => {
        this.setState({
            loaderShow : true
        });
        Auth.signOut();
        localStorage.clear();
        sessionStorage.clear();
        localStorage.setItem('isLogged', false);
        sessionStorage.setItem('isLogged', false);
        window.location.href = '/login';
    }


    handleOption = (option) => {
        this.setState({
            loaderShow : true
        });
        if(option === "Sign Out"){
            Auth.signOut();
            localStorage.clear();
            sessionStorage.clear();
            localStorage.setItem('isLogged', false);
            sessionStorage.setItem('isLogged', false);
            window.location.href = '/login';
        } else if(option === 'Profile'){
            this.clearData();    
            let email = sessionStorage.getItem('email');
            axios.get(Configuration.baseUrl + '/agentlogin/getAgent/' + email )
                .then(response => {

                    if(response.data.response){
                        let countyCode = '';
                        let phone = '';
                        if(response.data.response.phone){
                            if(response.data.response.phone.length === 13){
                                countyCode = response.data.response.phone.substr(0,3);
                                phone = response.data.response.phone.substr(3);
                            } else {
                                countyCode = response.data.response.phone.substr(0,2);
                                phone = response.data.response.phone.substr(2);
                            }
                        } else {
                            countyCode = this.state.defaultCountryCode;
                            phone = '';
                        }


                        let filePath = response.data.response.image ? response.data.response.image.split('/') : [];
                        let fileName = '';

                        if(filePath.length > 0){
                            fileName = filePath[filePath.length - 1];
                        }

                        this.setState({
                            fname : response.data.response.firstName,
                            lname : response.data.response.lastName,
                            email : response.data.response.email,
                            phone : phone,
                            desc : response.data.response.description ? response.data.response.description : '',
                            imagePath : response.data.response.image,
                            imageName : fileName,
                            countryCode : countyCode,
                            imageErr : '',
                            loaderShow : false,
                            profileModal : true,
                            open:false,
                            anchorEl:null
                        }, () => this.checkValidation());
                    }
                });
        }
    }

    handleMenuClick = (event) => {       
        this.setState({open:true,anchorEl:event.currentTarget})
      };

    setUserValue = (value, isValid, parentDetails) => {
        if(parentDetails.name === 'email'){
            if(isValid){
                this.state.email = value;
            } else {
                this.state.email = "";
            }
        }else if(parentDetails.name === 'firstname'){
            if(isValid){
                this.state.fname = value;
            } else {
                this.state.fname = "";
            }
        } else if(parentDetails.name === 'lastname'){
            if(isValid){
                this.state.lname = value;
            } else {
                this.state.lname = "";
            }
        } else if(parentDetails.name === 'phone'){
            if(isValid){
                this.state.phone = value;
            } else {
                this.state.phone = "";
            }
        } else if(parentDetails.name === 'desc'){
            if(isValid){
                this.state.desc = value;
            } else {
                this.state.desc = "";
            }
        }

        this.setState({
            refresh : true
        }, () => this.checkValidation());

    }

    checkValidation = () => {
        if(this.state.fname !== '' && this.state.lname !== '' &&  this.state.phone !== "" && this.state.email !== "" && this.state.desc !== ''){
            this.setState({
                agentValid : false
            });
        } else {
            this.setState({
                agentValid : true
            });
        }
    }

    handleFileChange = (event) =>{
        if(event.currentTarget.files.length > 0) {
            this.setState({
                loaderShow: true,
                imageErr : ''
            });

            const file = event.target.files[0];  
            if (file.size > 1048576){
                this.setState({
                    imageErr : "File size cannot exceed more than 1MB",
                    loaderShow : false
                })
            } else {
                let bodyFormData = new FormData();
                bodyFormData.append('file', event.currentTarget.files[0]);
                this.state.imageName = event.currentTarget.files[0].name;

                axios(configurations.baseUrl + '/agentlogin/uploadImage', {
                    method: 'post',
                    data: bodyFormData,
                    headers: {'Content-Type': 'multipart/form-data' }
                }).then(response =>{
                    if(response.data.code === 200){
                        this.setState({
                            imagePath : response.data.response,
                            loaderShow : false
                        },() => this.checkValidation());
                    }
                })

            }
        }
    }

    updateAgentAndView=()=>{
        this.updateAgent();
        if(this.state.agentURL !== ''){
            // this.state.agentURL.select();
             document.execCommand("copy",);
            window.open(this.state.agentURL, '_blank');
         }
    }

    updateAgent = () =>{
        this.setState({
            loaderShow : true
        });

        let obj = {
            "firstName" : this.state.fname,
            "lastName": this.state.lname,
            "description": this.state.desc,
            "email":this.state.email,
            "phone": this.state.countryCode + this.state.phone,
            image : this.state.imagePath
        }

        axios.post(configurations.baseUrl + '/agentlogin/updateAgent', obj)
            .then(response => {
                if(response.data.code === 200){
                    this.setState({  
                        loaderShow : false,
                        profileModal : false    
                    }, () => this.clearData());
                }

            })
    }

    clearData = () =>{
        this.setState({
            fname:'',
            lname:'',
            email:'',
            phone:'',
            countryCode : '',
            desc : '',
            imageName : '',
            imageErr : ''
        });
    }
      

    render() {
        const options=["Profile","Sign Out"]
        let currentScreen = '';
        this.state.isLogged = sessionStorage.getItem('isLogged');

        if (this.state.isLogged === 'true' || this.state.isLogged === true) {
            currentScreen = <div style={styles.LoginWrp}>
                <div style={styles.HeaderWrp}>
                    <Grid xs={6} style={styles.HeaderRightWrp} item={true}>
                        <span style={styles.LoginRight}>Member Enrollment</span>
                    </Grid>
                    <Grid xs={6} style={styles.HeaderLeftWrp} item={true}>

                        <span style={styles.LoginLeft} onClick={this.logoutHandler}>LOGOUT</span>
                    </Grid>
                </div>
            </div>
        } else {
            currentScreen = <div  >
                     <AppBar title="Agent Portal" position='static' style={{backgroundColor:'#ffffff',marginBottom: this.props.bottomMargin, display : '-webkit-inline-box'}}>
                         <Toolbar style={{ width:'50%',padding : '5px'}}>
                                 {/* <IconButton color="inherit" aria-label="Menu" style={{marginTop:'6px',marginRight:'6px', cursor : 'pointer'}} onClick={() => {window.location.replace('/')}} >
                                     <MenuIcon />
                                 </IconButton> 
                                 <Typography color="inherit" className="appTitle" onClick={() => {window.location.replace('/')}} style={{cursor : 'pointer'}}>
                                     Agent Portal
                                 </Typography>
                                 */}
                                 {/* <Grid container direction="row" style={{textAlign : 'center'}}> */}
                        {/* <Grid xs={12} sm={12} item={true}> */}
                            <div style={{ cursor : 'pointer', width : '7%'}} onClick={()=> window.location.replace(  sessionStorage.getItem('EMPLOYER_FLOW') === 'YES' ? window.location.origin +'/manage-employers'  : '/')}>
                                <ArrowBackIcon  style={{ color : '#162242',fontSize:'28px'}}/>
                            </div>

                        {/* </Grid> */}
                    {/* </Grid> */}
                                 <img style={{width:'110px',height:'40px'}} src={require('../../../Assets/Images/netwell-logo.png')} />
                         </Toolbar>
                         <Toolbar style={{width : '50%'}}>
                             <div className="spacer"/>
                                 {this.state.userName}
                                 <AccountCircle style={{color : '#4782c4',padding:'0 0.5rem',height:'45px',width:'45px',cursor:'pointer'}} onClick={this.handleMenuClick}/>
                                 <Menu keepMounted open={this.state.open} anchorEl={this.state.anchorEl} onClose={this.handleClose}
                                     // style={{left: '85%', top: '-55%'}}
                                       getContentAnchorEl={null}
                                       anchorOrigin={{
                                           vertical: 110,
                                           horizontal: 60,
                                       }}
                                       transformOrigin={{
                                           vertical: 80,
                                           horizontal: "right",
                                       }}>
                                     {options.map((op,i)=>{
                                         return <MenuItem key={i} value={op} onClick={this.handleOption.bind(this, op)}>
                                             {op}
                                         </MenuItem>
                                     })}

                                 </Menu>
                         </Toolbar>
                     </AppBar>
            </div>
        }


        return (
            <div>
                {
                    this.state.loaderShow ? <Loader></Loader> : ''
                }
                {
                    currentScreen
                }

                {/*=================================== Profile Model ======================================*/}
                <Modal size="lg" show={this.state.profileModal} onHide={() => this.setState({profileModal:false, loaderShow : false}, () => this.clearData())} centered backdrop="static">
                    <Modal.Header style={styles.modal_header} closeButton>
                        <Modal.Title>Agent Profile</Modal.Title>
                    </Modal.Header>
                    <Modal.Body  style={{  width : '100%' }}>
                        {
                            this.state.loaderShow ? <Loader></Loader> : ''
                        }
                        
                        <Grid container spacing={2} justify='center'>
                        <Grid item xs={12} sm={5} >
                        <Sample setChild={this.setUserValue.bind(this)} reqFlag={true} name={'firstname'} label={'First Name'} value={this.state.fname} disable={false} style={customStyle.textFieldWrpAgent} length={25}  fieldType={'text'} errMsg={'Enter valid first name'} helperMsg={'First name required'}  parentDetails={{name:'firstname'}}></Sample>
                        </Grid>
                        <Grid item xs={12} sm={5}>
                        <Sample setChild={this.setUserValue.bind(this)} reqFlag={true} name={'lastname'} label={'Last Name'} value={this.state.lname} disable={false} style={customStyle.textFieldWrpAgent} length={25}  fieldType={'text'} errMsg={'Enter valid last name'} helperMsg={'Last name required'}  parentDetails={{name:'lastname'}}></Sample>
                        </Grid>
                        <Grid item xs={12} sm={5} >
                        <Sample setChild={this.setUserValue.bind(this)} reqFlag={true} name={'email'} label={'Email ID'} value={this.state.email} disable={true} style={customStyle.textFieldWrpAgent} length={50}  fieldType={'email'} errMsg={'Enter valid email Id'} helperMsg={'Email Id required'}  parentDetails={{name:'email'}}></Sample>
                        </Grid>
                        <Grid item xs={12} sm={5}>
                        <Sample setChild={this.setUserValue.bind(this)} reqFlag={true} name={'phone'} label={'Mobile No.'} value={this.state.phone} disable={false} style={customStyle.textFieldWrpAgent} length={10}  fieldType={'phone'} errMsg={'Enter valid mobile no.'} helperMsg={'Mobile no. required'}  parentDetails={{name:'phone'}}></Sample>
                        </Grid>
                        <Grid item xs={12} sm={10} >
                        <CommonMultilineText setChild={this.setUserValue.bind(this)} req={true} name={'desc'} label={'Message'} value={this.state.desc} disable={false} style={customStyle.textFieldWrpAgent} length={200}  fieldType={'text'} errMsg={'Enter valid message'} helperMsg={'Message required'}  parentDetails={{name:'desc'}}></CommonMultilineText>
                        </Grid>
                        
                        </Grid>
                        <Grid container spacing={2} style={{marginLeft:'5%'}}>
                        <Grid item xs={12} sm={12} >
                                <input accept="image/*" style={{display : 'none'}} id="icon-button-file" type="file" onChange={this.handleFileChange.bind(this)} />
                                    <label htmlFor="icon-button-file" style={{fontSize : 'small', color : 'rgba(0, 0, 0, 0.54)'}}>
                                        <IconButton color="primary" aria-label="upload picture" component="span">
                                            <PhotoCamera />
                                        </IconButton>Upload Profile Picture
                                    </label>
                                    <span style={{marginLeft : '5px'}}>{this.state.imageName} </span>
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <span style={{ color : '#f44336'}}>{this.state.imageErr} </span>
                        </Grid>
                        </Grid>
                        <hr/>
                        <Grid                        
                        spacing={1}
                        container
                        direction="row"
                        style={{marginLeft:'30%'}}
                        >
                            <Grid item xs={12} sm={2} >
                        
                        <NextButton style={{margin: '0', marginRight : '10px', width: '95px', height: '40px', color:'#fff', backgroundColor:'#4782c4' }} disabled={this.state.agentValid} onClick={() => this.updateAgent()}>UPDATE</NextButton>
                        </Grid>
                        <Grid item xs={12} sm={4} >
                        <NextButton style={{margin: '0', marginRight : '10px', width: '225px', height: '40px', color:'#fff', backgroundColor:'#4782c4'}} disabled={this.state.agentValid} onClick={() => this.updateAgentAndView()} >UPDATE AND VIEW MY PAGE</NextButton>
                        </Grid>
                        <Grid item xs={12} sm={4} >
                        <CustomButton style={{height : '40px', color:'#fff', backgroundColor:'#4782c4'}} onClick={() => this.setState({profileModal:false, loaderShow : false}, () => this.clearData())}>CANCEL</CustomButton>
                        </Grid>
                        </Grid>

                    </Modal.Body>
                </Modal>
                {/*=================================== Profile Model ======================================*/}
            </div>

        )
    }
}

export default Header;