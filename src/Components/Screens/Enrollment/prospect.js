import React, { Component } from 'react'
import Grid from "@material-ui/core/Grid";
import AccordonCommon from "../../CommonScreens/AccordonCommon";
import {Modal} from "react-bootstrap";
import styles from "../../../Assets/CSS/stylesheet_UHS";
import Loader from "../../loader";
import customStyle from "../../../Assets/CSS/stylesheet_UHS";
import Sample from "../../CommonScreens/sampleTextField";
import axios from "axios";
import configurations from "../../../configurations";
import AgentTable from '../../CommonScreens/AgentTable';
import {withStyles} from "@material-ui/core/styles"
import Button from "@material-ui/core/Button";
import Fab from "@material-ui/core/Fab";
import Header from "../Headers/Header";
import Footer from "../../CommonScreens/Footer";
import {connect} from "react-redux";
import {getQueryParams} from '../../authentication/utils';
import Tooltip from '@material-ui/core/Tooltip';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import moment from "moment";
import CommonDropDwn from "../../CommonScreens/CommonDropDwn_1";

/* For edit employer modal */
import { KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import Checkbox from '@material-ui/core/Checkbox';
import { FormControl, InputLabel, Select, TextField, Typography } from "@material-ui/core";
// import EditEmployer from './EditEmployer'
var convert = require('xml-js');

const CssTextField = withStyles(theme => ({
    root: {
        '& .MuiInput-root': {
            "&:hover:not($disabled):not($focused):not($error):before": {
                borderBottom: '2px solid #533278'
            },

            '&.MuiInput-underline.Mui-focused:after': {
                borderBottom: '2px solid #533278',
            },

        }
    },
}))(TextField);

/* end */



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


class Prospect extends Component{
    constructor(props) {
        super(props);
		
		/* Edit employer  */
		 let USER_DATA = JSON.parse(sessionStorage.getItem('USER_DATA'));
        const today = new Date();
        const tomorrow = new Date(today);
        if (USER_DATA.clientId.toString() === '6548' || USER_DATA.clientId.toString() === '4367' || 
        USER_DATA.clientId.toString() === '5540' || USER_DATA.clientId.toString() === '4376'|| 
        USER_DATA.clientId.toString() === '5541' || USER_DATA.clientId.toString() === '4377'
        
        ) {
            if (new Date() < new Date("05/01/2021")) {
                tomorrow.setDate(1);
                tomorrow.setMonth(4);
            } else if (new Date().getDate() === 1 || new Date().getDate() > 1) {
                tomorrow.setDate(1);
                tomorrow.setMonth(today.getMonth() + 1);
            }
        } else {
            tomorrow.setDate(tomorrow.getDate() + 1);
        }
		/* end  */
		
        this.state = {
			USER_DATA: USER_DATA, 
            userList : [],
            headerList : ["User Id", "User Name", "Email Id", "Status"],
            modalShow : false,
            loaderShow : false,
            mailModal : false,
            bid:'',
            cid:'',
            aid:'',
            url:'',
            fname:'',
            lname:'',
            email:'',
            phone:'',
            genrate : false,
            openMailModal : false,
            countryCode : '',
            userValid : false,
            openMenu:null,
            msgModal : false,
            msgModal1:false,
            errMsg : "",
            USER_DATA : {},
            empid : '',
            countData : {},
            viewEmployerModal : false,
            employerDetailsObj : [],
            emp_email_id : null,
            confirmationModal : false,
            selectedEmail : '',
			
			 editEmp:false,




            compName: '',
            zipCode: '',
            state: '',
            city: '',
            street: '',
            division: '',
            industry: '',
            codeTitle:'',
            code: '',
            firstName: '',
            lastName: '',
            workEmail: '',
            jobTitle: '',
            phone: '',
            divisionList: [],
            industryList: [],
            codeTitleList: [],
            codeList: [],
            countryCode: '',
            effectiveDate: new Date(tomorrow),
            dateErr: false,
            birthDtFocus: false,
            birthDt: false,
            adminPhone: '',
            adminFirstName: '',
            adminLastName: '',
            adminEmail: '',
            adminCountryCode: '',
            // empid: '',
            page: 0,
            copyEmpCheck: false,
            sendQuoteFlag:false,
            sendQuoteError:[]
        }
    }

    componentDidMount() {
        this.setState({
            loaderShow : true
        })
		
		/* Edit employer */
		let obj = {
            "searchKey": "division",
            "searchValue": ""
        }
        axios.post(process.env.REACT_APP_BASE_URL + '/employer/getSIC', obj)
            .then(response => {
                let divisionList = [];
                for (let i = 0; i < response.data.response.length; i++) {
                    divisionList.push({
                        key: response.data.response[i].division,
                        value: response.data.response[i].division
                    });

                }
                this.setState({
                    divisionList: divisionList
                })
            })
			
			/* end */
		
		
        window.addEventListener('REFRESH', this.refreshCount);
        let queryParams = getQueryParams();
        if(queryParams && queryParams.empid){
            this.setState({empid : queryParams.empid}, () => this.handleEmpDetails('didM'));
        console.log("Refresh---",queryParams.empid)

            this.getTotalEmpInfo(queryParams.empid);
            sessionStorage.setItem('EMPLOYER_FLOW', 'YES')
        } else {

            let userdata = JSON.parse(sessionStorage.getItem('USER_DATA'));
        console.log("userdata---",userdata)

            this.setState({
                USER_DATA : userdata,
                loaderShow : false,
                empid : userdata.defaultEmpid
            });
            sessionStorage.setItem('EMPLOYER_FLOW', 'NO');
        }
    }
    refreshCount = (e) =>{
        console.log("count refresh---",e.detail)
        this.getTotalEmpInfo(e.detail)
    }
	
	
	//update employer details namita

    addEmployer = () => {
        this.setState({
            loaderShow: true
        })
        // let URL = process.env.REACT_APP_BASE_URL + '/employer/addEmployer';


        let obj = {
            "companyName": this.state.compName,
            "firstName": this.state.firstName,
            "lastName": this.state.lastName,
            "jobTitle": this.state.jobTitle,
            "phone": this.state.countryCode + this.state.phone,
            "zip": this.state.zipCode,
            "state": this.state.state,
            "city": this.state.city,
            "street": this.state.street,
            "effective_date": moment(this.state.effectiveDate).format('YYYY-MM-DD'),
            "brokerId": this.state.USER_DATA.agentId,
            "division": this.state.division,
            "industry": this.state.industry,
            "codeTitle": this.state.codeTitle,
            "code": this.state.code,
            adminFirstName: this.state.adminFirstName,
            adminLastName: this.state.adminLastName,
            adminPhone: this.state.adminCountryCode + this.state.adminPhone,
            adminEmail: this.state.adminEmail,
            email: this.state.workEmail
        }

        // if (this.state.employerEdit) {
            URL = process.env.REACT_APP_BASE_URL + '/employer/updateEmployer';
            obj.empid = this.state.empid
        // }

        axios.post(URL, obj)
            .then(response => {
                let errMsg = '';
                if (response.data.code === 200) {                    
                    errMsg = 'Employer Updated Successfully !'
                } else {
                    errMsg = response.data.message
                }
                let today = new Date();
                let tomorrow = new Date(today);
                if (this.state.USER_DATA.clientId.toString() === '6548' || this.state.USER_DATA.clientId.toString() === '4367' || 
                this.state.USER_DATA.clientId.toString() === '5540' || 
                this.state.USER_DATA.clientId.toString() === '4376' || 
                this.state.USER_DATA.clientId.toString() === '5541'|| 
                this.state.USER_DATA.clientId.toString() === '4377'
                
                ) {
                    if (new Date() < new Date("05/01/2021")) {
                        tomorrow.setDate(1);
                        tomorrow.setMonth(4);
                    } else if (new Date().getDate() === 1 || new Date().getDate() > 1) {
                        tomorrow.setDate(1);
                        tomorrow.setMonth(today.getMonth() + 1);
                    }
                } else {
                   // tomorrow.setDate(tomorrow.getDate() + 1);
                //    let efectiveDate = this.state.effectiveDate ? new Date(this.state.effectiveDate) : new Date();
                   if(this.state.USER_DATA.clientId.toString() === '1004'){
                      
                       tomorrow.setDate(1);
                       tomorrow.setMonth(today.getMonth() + 1);

                   }
                   if(this.state.USER_DATA.clientId.toString() === '1001'){
                       
                       tomorrow.setDate(today.getDate + 5);

                   }
                }
                this.state.countData.companyName=this.state.compName
                this.setState({
                    msgModal: true,
                    loaderShow : false,
                    // addEmployerModal: false,
                    viewEmployerModal:false,
                    errMsg: errMsg,
                    compName: '',
                    zipCode: '',
                    state: '',
                    city: '',
                    street: '',
                    division: '',
                    industry: '',
                    codeTitle: '',
                    code: '',
                    firstName: '',
                    lastName: '',
                    workEmail: '',
                    jobTitle: '',
                    phone: '',
                    industryList: [],
                    codeTitleList: [],
                    codeList: [],
                    countryCode: '',
                    employerEdit: false,
                    adminPhone: '',
                    adminFirstName: '',
                    adminLastName: '',
                    adminEmail: '',
                    adminCountryCode: '',
                    effectiveDate: new Date(tomorrow),
                    // empid: '',
                    copyEmpCheck: false,
                });
                // this.getEmployerData();
            })

    }
	
	
	
	

    getTotalEmpInfo = (empid) => {
        axios.get(configurations.baseUrl + '/enrollment/getCountsFormEmployer/' + empid)
            .then(response =>{
                console.log(response);
                if(response.data.code === 200){
                    this.setState({
                        countData : response.data.response,
                        USER_DATA : JSON.parse(sessionStorage.getItem('USER_DATA')),
                        loaderShow : false
                    },()=>console.log("Userdata---",this.state.countData))
                }
            })
    }

    generateUrl(val){
        this.setState({loading:true})
        var obj={
            "clientId":this.state.cid,
            "associationId":this.state.aid,
            "brokerId":this.state.bid,
            'empid' : this.state.empid
        }
        axios.post(configurations.baseUrl + '/encrypt/encryptData', obj)
            .then(res=>{
                if(res && res.response){
                    this.setState({url:this.state.baseUrl+'#state='+res.response,loading:false})
                }
            });
    }

    setValue(value,isValid,parentDetails){
        if(value !== undefined && value !== null && isValid){
            if(parentDetails.name === 'brokerid'){
                this.setState({bid:value},()=>{
                    this.checkVal('ENCODING')
                })
            }else if(parentDetails.name === 'associationid'){
                this.setState({aid:value},()=>{
                    this.checkVal('ENCODING')
                })
            }else if(parentDetails.name === 'clientid'){
                this.setState({cid:value},()=>{
                    this.checkVal('ENCODING')
                })
            }else{
                this.setState({baseUrl:value},()=>{
                    this.checkVal('ENCODING')
                })
            }
        }
    }

    setUserValue = (value,isValid,parentDetails) =>{
        if(parentDetails.name === 'firstname'){
            if(isValid){
                this.state.fname = value;
            } else {
                this.state.fname = '';
            }
        }else if(parentDetails.name === 'lastname'){
            if(isValid){
                this.state.lname = value;
            } else {
                this.state.lname = '';
            }
        }else if(parentDetails.name === 'email'){
            if(isValid){
                this.state.email = value;
            } else {
                this.state.email = "";
            }
        }else if(parentDetails.name === 'phone'){
            if(isValid ){
                this.state.phone = value;
            } else {
                this.state.phone = "";
            }
        }
        this.checkVal('USER');
    }

    checkVal(flag){
        if(flag === 'ENCODING'){
            if(this.state.cid !== '' && this.state.bid !== '' && this.state.aid !== '' && this.state.baseUrl !== ''){
                this.setState({genrate:false})
            }else{
                this.setState({genrate:true})
            }
        } else if(flag === 'USER'){
            if(this.state.fname !== '' && this.state.lname !== '' && this.state.email !== '' && this.state.phone !== ''){
                this.setState({userValid :false})
            }else{
                this.setState({userValid : true})
            }
        }

    }

    openMailModal = () => {
        this.setState({
            mailModal : true,
            genrate : false
        })
    }

    logoutPage=()=>{
        this.props.history.replace('/login');
    }

    handleMenu = (event) => {

        this.setState({
            openMenu: event.currentTarget
        })
    };
    menuClose = (event) => {

        this.setState({
            openMenu: !event.currentTarget
        })
    };

    sendMail = () => {
    }

    handleEmpDetails = (flag) =>{
        this.setState({
            loaderShow : true,
			editEmp:true
        })
        axios.get(process.env.REACT_APP_BASE_URL + '/employer/getEmployerByEmpId/' + this.state.empid)
            .then(response =>{
                console.log(response);
                if(response.data.response){
                    this.setState({
                        compName:response.data.response.companyName,
                        firstName:response.data.response.firstName,
                        lastName:response.data.response.lastName,
                        email:response.data.response.email,
                        phone:response.data.response.phone,
                        zipCode:response.data.response.zip,
                        state:response.data.response.state,
                        city:response.data.response.city,
                        jobTitle:response.data.response.jobTitle,
                        workEmail:response.data.response.email,
                        street:response.data.response.street,
                        division:response.data.response.division,
                        industry:response.data.response.industry,
                        codeTitle:response.data.response.codeTitle,
                        code:response.data.response.code,
                        effectiveDate:response.data.response.effective_date ? moment(response.data.response.effective_date).format('MMMM DD, YYYY') : null,
                        adminFirstName:response.data.response.adminFirstName,
                        adminLastName:response.data.response.adminLastName,
                        adminEmail:response.data.response.adminEmail,
                        adminPhone:response.data.response.adminPhone
                    })
                    let arr = [];
                    // if(response.data.response.email == response.data.response.adminEmail){
                    //     arr.push({key : response.data.response.email, value : response.data.response.email});
                    // }else{
                    //     arr.push({key : response.data.response.email, value : response.data.response.email});
                    //     arr.push({key : response.data.response.adminEmail, value : response.data.response.adminEmail});
                    // }
                    if(response.data.response.email == response.data.response.adminEmail){
                        arr.push({key :sessionStorage.getItem('email')+" "+"(Agent)", value : sessionStorage.getItem("email")});
                        arr.push({key : response.data.response.email ? response.data.response.email+" "+"(Employer/Administrator)":'', value : response.data.response.email ? response.data.response.email :''});

                    }else{
                        arr.push({key :sessionStorage.getItem('email')+" "+"(Agent)", value : sessionStorage.getItem("email")});
                        arr.push({key : response.data.response.email +' '+"(Employer)", value : response.data.response.email});
                        arr.push({key :response.data.response.adminEmail? response.data.response.adminEmail+" "+"(Administrator)":'', value : response.data.response.adminEmail ? response.data.response.adminEmail : ''});

                    }
                   
                    this.setState({
                        // employerDetailsObj : obj,
                        viewEmployerModal : flag !== 'didM' ?  true : false,
                        loaderShow : false,
                        emp_email_id : arr
                    })
                }
            })
    }

    handleQuoteMail = () => {
        this.setState({
            selectedEmail : '',
            confirmationModal : true
        })
    }

    setEmailId = (value, isValid, parentDetails) =>{
        if(isValid){
            this.state[parentDetails.name] = value;
        } else {
            this.state[parentDetails.name] = "";
        }

        this.setState({
            refresh : true
        })
    }

    sendEmpQuoteMail = () =>{
        this.setState({loaderShow : true, confirmationModal : false});
        axios.get(process.env.REACT_APP_enrollment_base_url + '/plan/sendEmployerQuoteMail/' + this.state.USER_DATA.agentId + '/' + this.state.empid + '/' + this.state.selectedEmail)
            .then(response =>{
                console.log(response);
                let errMsg = '';
                if(response.data.code === 200){
                    errMsg = 'Quote email sent successfully!'
                } else if(response.data.code === 202){
                    errMsg = 'Age or state not available for employee.'
                } else if(response.data.code === 204){
                    errMsg = 'Email could not be send due to the following errors.'
                    this.setState({
                        sendQuoteFlag:true,
                        sendQuoteError:response.data.response
                    })
                }else {
                    errMsg = 'Internal Server Error'
                }
                
                this.setState({
                    msgModal : true,
                    loaderShow : false,
                    errMsg : errMsg,
                    selectedEmail : ''
                });
            })
    }
	
	
	// update employer details modal text value change
    setEmpValue = (value, isValid, parentDetails) => {

        if (isValid) {
            this.state[parentDetails.name] = value;
            if (parentDetails.name === 'zipCode') {
                this.handleZipCode(value, parentDetails);
            }
        } else {
            this.state[parentDetails.name] = "";
        }
        this.setState({
            refresh: true
        }, () => { this.checkEnable() });
    }

    checkEnable = () => {
        // && division !== '' && industry !== '' && codeTitle !== '' && code !== ''&& jobTitle !== '' && adminPhone !== '' && phone !== ''&& street !== '' 
        const { compName, zipCode, state, city, street, division, industry, codeTitle, code, firstName, lastName, workEmail, jobTitle, phone, adminPhone, adminFirstName, adminLastName, adminEmail } = this.state;
        if (compName !== '' && zipCode !== '' && state !== '' && city !== ''  && firstName !== '' && lastName !== '' && workEmail !== ''  && adminFirstName !== '' && adminLastName !== '' && adminEmail !== '') {
            this.setState({
                disableSubmit: false
            })
        } else {
            this.setState({
                disableSubmit: true
            })
        }
    }

    setEmpDropDownValue = (value, isValid, parentDetails) => {
        this.setState({
            loaderShow: true
        })
        if (isValid) {
            this.state[parentDetails.name] = value;
        } else {
            this.state[parentDetails.name] = "";
        }

        if (parentDetails.name === 'division') {
            this.setState({
                industryList: [],
                codeTitleList: [],
                code: ''
            })
            let obj = {
                "searchKey": "industry",
                "searchValue": value
            }

            this.getSICDetails(obj);
        } else if (parentDetails.name === 'industry') {
            this.setState({
                codeTitleList: [],
                code: ''
            })
            let obj = {
                searchKey: 'codeTitle',
                searchValue: value
            }
            this.getSICDetails(obj);
        } else if (parentDetails.name === 'codeTitle') {
            let findIndex = this.state.codeTitleList.find(obj => obj.key === value);
            if (findIndex) {
                //this.state.code = findIndex.sicCode;
                this.setState({
                    code: findIndex.sicCode,
                    loaderShow: false
                });
            }
        }
        this.setState({
            refresh: true,
        }, () => { this.checkEnable() });
    }

    getSICDetails = (obj) => {
        axios.post(process.env.REACT_APP_BASE_URL + '/employer/getSIC', obj)
            .then(response => {
                let arr = [];
                let data = response.data.response;
                if (obj.searchKey === 'industry') {
                    for (let i = 0; i < data.length; i++) {
                        arr.push({ key: data[i].industry, value: data[i].industry })
                    }
                    this.setState({
                        industryList: arr,
                        loaderShow: false
                    }, () => { this.checkEnable() })
                } else if (obj.searchKey === 'codeTitle') {
                    for (let i = 0; i < data.length; i++) {
                        arr.push({ key: data[i].codeTitle, value: data[i].codeTitle, sicCode: data[i].sicCode })
                    }
                    this.setState({
                        codeTitleList: arr,
                        loaderShow: false
                    }, () => { this.checkEnable() })
                }
            });
    }
    handleDateChange = (date, didMount) => {
        this.setState({
            effectiveDate: date
        }
            , () => {
                let panel = document.getElementById("date-picker-dialog");
                panel.addEventListener("onmouseleave", function () {
                    document.getElementById("date-picker-dialog-label").style.paddingTop = "10px";
                });
            }
        );
    }


    copyEmployerDetails = () => {
        console.log("==Clicked===");
        console.log(this.state.copyEmpCheck);
        if (this.state.copyEmpCheck == false) {
            this.setState({ 
                copyEmpCheck: true,
                adminFirstName: this.state.firstName,
                adminLastName: this.state.lastName,
                adminEmail: this.state.workEmail,
                adminPhone: this.state.phone,
            }, () => this.checkEnable())
            
        } else {
            this.setState({ 
                copyEmpCheck: false,
                adminFirstName: '',
                adminLastName: '',
                adminEmail: '',
                adminPhone: '',
            }, () => this.checkEnable())

        }

    }

    closeEmployerModal = () => {
        let today = new Date();
        let tomorrow = new Date(today);
        if (this.state.USER_DATA.clientId.toString() === '6548' || this.state.USER_DATA.clientId.toString() === '4367' 
        || this.state.USER_DATA.clientId.toString() === '5540' || this.state.USER_DATA.clientId.toString() === '4376'
        || this.state.USER_DATA.clientId.toString() === '5541'|| 
        this.state.USER_DATA.clientId.toString() === '4377'
               
        ) {
            if (new Date() < new Date("05/01/2021")) {
                tomorrow.setDate(1);
                tomorrow.setMonth(4);
            } else if (new Date().getDate() === 1 || new Date().getDate() > 1) {
                tomorrow.setDate(1);
                tomorrow.setMonth(today.getMonth() + 1);
            }
        } else {
            tomorrow.setDate(tomorrow.getDate() + 1);
        }
        this.setState({
            viewEmployerModal: false,
            errMsg: '',
            // compName: '',
            // zipCode: '',
            // state: '',
            // city: '',
            // street: '',
            // division: '',
            // industry: '',
            // codeTitle: '',
            // code: '',
            // firstName: '',
            // lastName: '',
            // workEmail: '',
            // jobTitle: '',
            // phone: '',
            // industryList: [],
            // codeTitleList: [],
            // codeList: [],
            // countryCode: '',
            // adminPhone: '',
            // adminFirstName: '',
            // adminLastName: '',
            // adminEmail: '',
            // adminCountryCode: '',
            // effectiveDate: new Date(tomorrow),
            // employerEdit: false,
            // empid: '',
            // copyEmpCheck: false
        })
    }

 // update employer details modal text value change end namita
    
 disableWeekends(date, clientId) {
    // return (clientId.toString() === '6548' || clientId.toString() === '4367' || 
    // clientId.toString() === '5540' || clientId.toString() === '4376'|| clientId.toString() === '5541'|| 
    // clientId.toString() === '4377') ? (date.getDate() === 1 ? false : true) : false;
    if (clientId.toString() == '1004'){
        if(date.getDate() === 1 ||  date.getDate() === 15  ){
            return false
        }else {
            return true
        }
    }else{
        return (clientId === '6548' || clientId === '4367' || clientId === '5540' || clientId === '4376' || clientId === '5541' || clientId === '4377' ) ? (date.getDate() === 1 ? false : true) : false;
    }

}
	
handleOK=()=>{
      this.setState({msgModal:false,sendQuoteFlag:false, loaderShow : false},()=>this.handleEmpDetails('didM'))
    //   window.location.reload()
}	
	
	

    render() {
		console.log("Agent email===",this.state.USER_DATA)
		 let myDate = moment(this.state.effectiveDate).format('MM') + '/' + moment(this.state.effectiveDate).format('DD') + '/' + moment(this.state.effectiveDate).format('YYYY');
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        let futureTomarow = new Date(today);
        //const futureDate = this.state.USER_DATA.clientId.toString() === '6548' ? futureTomarow.setDate(futureTomarow.getDate() + 45) : futureTomarow.setDate(futureTomarow.getDate() + 90);
        let futureDate;
        if (this.state.USER_DATA.clientId === '6548' || this.state.USER_DATA.clientId === '4367'
        || this.state.USER_DATA.clientId === 6548 || this.state.USER_DATA.clientId === 4367
        || this.state.USER_DATA.clientId === 5540 || this.state.USER_DATA.clientId === 4376
        || this.state.USER_DATA.clientId === '5540' || this.state.USER_DATA.clientId === '4376'
        || this.state.USER_DATA.clientId === '5541' || this.state.USER_DATA.clientId === '4377'
        || this.state.USER_DATA.clientId === 5541 || this.state.USER_DATA.clientId === 4377
        
        ) {
            if (new Date() < new Date("05/01/2021")) {
                futureTomarow.setDate(1);
                futureTomarow.setMonth(4);
                tomorrow.setDate(1);
                tomorrow.setMonth(4);
            } else if (new Date().getDate() === 1 || new Date().getDate() > 1) {
                futureTomarow.setDate(1);
                futureTomarow.setMonth(today.getMonth() + 1);
            }
            futureDate = futureTomarow.setDate(futureTomarow.getDate() + 45)
        } else {
            futureDate = futureTomarow.setDate(futureTomarow.getDate() + 90);
        }
		
		
        return (
            <div>
                {
                    this.state.loaderShow ? <Loader></Loader> : ''
                }
                <Header  agentId={this.state.USER_DATA.agentId} clientId={this.state.USER_DATA.clientId} associationId={this.state.USER_DATA.associationId} clientName={this.state.USER_DATA.clientName} bottomMargin={'0px'}></Header>
                <div style={{flexGrow: 1}}>
                    <Grid container direction="row" style={{marginBottom : '30px', testAlign : 'center'}}>
                        {/* <Grid xs={12} sm={12} item={true} style={{backgroundColor:'#41b5c2', color : '#ffffff', fontWeight : 'bold', height : '40px', fontSize : '16px', padding : '10px'}}>
                            <div style={{ cursor : 'pointer', width : '7%'}} onClick={()=> window.location.replace(  sessionStorage.getItem('EMPLOYER_FLOW') === 'YES' ? window.location.origin +'/manage-employers'  : '/')}>
                                <ArrowBackIcon/> BACK
                            </div>

                        </Grid> */}
                    </Grid>
                </div>
                <div style={{flexGrow:1,paddingLeft:'10px'}}>
                   {/* <Grid container direction="row">
                        <Grid xs={12} sm={12} item={true} style={{backgroundColor:'#f8f8f8', color : 'red'}}>
                            BACK
                        </Grid>
                    </Grid>*/}
                    <Grid container spacing={2} justify='center'>
                        <Grid xs={12} sm={8} item={true} style={{}}>
                            {
                                (this.state.empid !== ''  && this.state.empid !== this.state.USER_DATA.defaultEmpid) &&
                                <Grid container style={{backgroundColor:'#f8f8f8', padding : '10px'}}>
                                    <Grid item={true} xs={4} sm={4} style={{textAlign : 'left', padding : '5px'}}>
                                        <div>
                                            <span id={"employerName"} style={customStyle.countLabel}>Employer Name</span>
                                        </div>
                                        <div>
                                            <span style={customStyle.countValue}>{this.state.countData.companyName}</span>
                                        </div>
                                    </Grid>
                                    <Grid item={true} xs={3} sm={3} style={{textAlign : 'left', padding : '5px'}}>
                                        <div>
                                            <span id={"employerName"} style={customStyle.countLabel}>Total Employees</span>
                                        </div>
                                        <div>
                                            <span style={customStyle.countValue}>{this.state.countData.total}</span>
                                        </div>
                                    </Grid>
                                    <Grid item={true} xs={3} sm={3} style={{textAlign : 'left', padding : '5px'}}>
                                        <div>
                                            <span id={"employerName"} style={customStyle.countLabel}>Enrolled Employees</span>
                                        </div>
                                        <div>
                                            <span style={customStyle.countValue}>{this.state.countData.enrolledCount}</span>
                                        </div>
                                    </Grid>
                                    <Grid item={true} xs={1} sm={1} style={{backgroundColor:'#f8f8f8'}}>
                                         {/* {  comment for automechanic group demo 
                                           
                                           this.state.countData && this.state.countData.total ?
                                                <Tooltip title="Send Quote Mail">
                                                    <CrudButton color="primary" aria-label="add" style={{width:'46px',height:'46px',boxShadow:'none',marginTop:'7px',marginLeft:'3%',backgroundColor:'#f48366'}}
                                                        disabled={ this.state.countData && this.state.countData.total ? this.state.countData.total.toString() === '0'? true : false : true } onClick={() => this.handleQuoteMail()}  >
                                                        <img src={require('../../../Assets/Images/quick_quote_icon.svg')}/>
                                                        </CrudButton>
                                                </Tooltip>
                                               :
                                               <Tooltip title="Send Quote Mail">
                                                   <CrudButton color="primary" aria-label="add" 
                                                   onClick={()=>this.setState({confirmationModal:true})}
                                                   style={{width:'46px',height:'46px',boxShadow:'none',marginTop:'7px',marginLeft:'3%',backgroundColor:'#f48366'}}
                                                    >
                                                    <img src={require('../../../Assets/Images/quick_quote_icon.svg')}/>
                                                    </CrudButton>
                                        </Tooltip>
                                       } */}

                                    </Grid>
                                    <Grid item xs={1} sm={1} style={{backgroundColor:'#f8f8f8'}}>
                                        <Tooltip title="Edit Employer Details">
                                            <CrudButton color="primary" aria-label="add" style={{width:'46px',height:'46px',boxShadow:'none',marginTop:'7px',marginLeft:'3%',backgroundColor:'#fdcf85'}} onClick={() => this.handleEmpDetails('CLICK')} >
                                                <img src={require('../../../Assets/Images/employer_details_icon.svg')}/>
                                            </CrudButton>
                                        </Tooltip>
                                    </Grid>
                                </Grid>
                            }

                            <div style={this.state.empid !== '' ? customStyle.agentTableHi_92 : customStyle.agentTableHi_100}>
                                {
                                    (this.state.USER_DATA && this.state.USER_DATA.clientId) &&
                                    <AgentTable agentId={this.state.USER_DATA.agentId} clientId={this.state.USER_DATA.clientId} associationId={this.state.USER_DATA.associationId} clientName={this.state.USER_DATA.clientName} defaultEmpid={this.state.USER_DATA.defaultEmpid} employerName={this.state.countData.companyName}></AgentTable>
                                }
                            </div>
                        </Grid>
                        <Grid xs={12} sm={4} item={true}>
                            {
                                (this.state.USER_DATA && this.state.USER_DATA.clientId) &&
                                    <AccordonCommon clientId={this.state.USER_DATA.clientId} clientName={this.state.USER_DATA.clientName} agentId={this.state.USER_DATA.agentId} disable={false} empName={(this.state.countData && this.state.countData.companyName) ? this.state.countData.companyName : ''} empid={this.state.empid} forHouseholds={true}/>
                            }
                        </Grid>
                    </Grid>


                    <Modal size="lg" show={this.state.mailModal} onHide={(event) => this.setState({mailModal:false,loaderShow : false})} centered backdrop='static'>
                        <Modal.Header style={styles.modal_header} closeButton>
                            <Modal.Title>Configure encoded URL</Modal.Title>
                        </Modal.Header>
                        <Modal.Body style={{ padding: '15px' }}>
                            {
                                this.state.loaderShow ? <Loader></Loader> : ''
                            }

                            <div style={customStyle.HomeContainer}>
                                <div style={customStyle.HomeMAinChild}>
                                    <div style={customStyle.HomeTextContiner}>
                                        <div style={{width:'224px', margin:'10px'}}>
                                            <Sample setChild={this.setValue.bind(this)} reqFlag={true} name={'brokerid'} label={'Broker Id'} value={this.state.bid} disable={false} style={customStyle.textFieldWrp} length={5}  fieldType={'treatment'} errMsg={'Enter Broker Id'} helperMsg={'Broker Id Required'}  parentDetails={{name:'brokerid'}}></Sample>
                                        </div>
                                        <div style={{width:'224px', margin:'10px'}}>
                                            <Sample setChild={this.setValue.bind(this)} reqFlag={true} name={'associationid'} label={'Association Id'} value={this.state.aid} disable={false} style={customStyle.textFieldWrp} length={5}  fieldType={'treatment'} errMsg={'Enter Association Id'} helperMsg={'Association Id Required'}  parentDetails={{name:'associationid'}}></Sample>
                                        </div>
                                        <div style={{width:'224px', margin:'10px'}}>
                                            <Sample setChild={this.setValue.bind(this)} reqFlag={true} name={'clientid'} label={'Client Id'} value={this.state.cid} disable={false} style={customStyle.textFieldWrp} length={5}  fieldType={'treatment'} errMsg={'Enter Client Id'} helperMsg={'Client Id Required'}  parentDetails={{name:'clientid'}}></Sample>
                                        </div>
                                    </div>
                                    <div style={customStyle.urlWrp}>
                                        <Sample setChild={this.setValue.bind(this)} reqFlag={true} name={'baseUrl'} label={'Enter your base url here'} value={this.state.baseUrl} disable={true} style={customStyle.textFieldWrpurl} length={5}  fieldType={'treatment'} errMsg={'Enter base url'} helperMsg={'Base url Required'}  parentDetails={{name:'burl'}}></Sample>
                                    </div>
                                    <div style={customStyle.urlWrp}>
                                        <div style={customStyle.HomeLoginUrlWrp}>{this.state.url}</div>
                                    </div>
                                    <div style={customStyle.urngenBtnwrp}>
                                        <div>
                                            <GenBtn1 variant="contained"  color="primary" onClick={()=>this.generateUrl('login')}  disabled={this.state.genrate}>Generate URL</GenBtn1>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </Modal.Body>
                        <Modal.Footer>
                            <NextButton style={{margin: '0', marginRight : '10px', width: '96px', height: '40px'}} onClick={this.sendMail()}>Send Mail</NextButton>
                            <CustomButton style={{height : '40px'}} onClick={() => this.setState({mailModal:false, loaderShow : false})}>Cancel</CustomButton>
                        </Modal.Footer>
                    </Modal>

                    {/*=================================== Message Model ======================================*/}
                    <Modal size={this.state.sendQuoteFlag?'lg':'sm'} show={this.state.msgModal} onHide={(event) => this.setState({msgModal:false,loaderShow : false})} centered backdrop='static'>
                        <Modal.Header style={styles.modal_header} closeButton>
                            <Modal.Title>Message</Modal.Title>
                        </Modal.Header>
                        
                        <Modal.Body  style={this.state.sendQuoteFlag ? customStyle.tableSendquoteErrorList : customStyle.tableSendquote}>
                            {
                                this.state.loaderShow ? <Loader></Loader> : ''
                            }

                            <div style={customStyle.HomeContainer}>
                                {
                                    this.state.sendQuoteFlag ?
                                    <>
                                    <h6>{this.state.errMsg}</h6>
                                    <table class="table table-bordered">
                                            <thead>
                                                <tr>
                                                <th style={{background:'#F2F2F2'}}>Record</th>
                                                <th style={{background:'#F2F2F2'}}>Name</th>
                                                <th style={{background:'#F2F2F2'}}>Missing fields</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    this.state.sendQuoteError.map((data)=>{
                                                    return  <tr>
                                                                <td>{data.record}</td>
                                                                <td>{data.firstName}  {data.lastName}</td>
                                                                <td>{data.missingFields.map((val)=>{
                                                                    return <span style={{textTransform:'capitalize'}}>{val} <span> , </span></span>
                                                                })}</td>
                                                            </tr>
                                                    })
                                                }         
                                            </tbody>
                                        </table> 
                                        </>
                                    :
                                    <>
                                    <div style={customStyle.HomeMAinChild}>
                                    {this.state.errMsg}
                                    </div>
                                    </>
                                }
                                


                                
                            </div>

                        </Modal.Body>
                        <Modal.Footer>
                            <CustomButton style={{height : '40px'}} onClick={this.handleOK}>Ok</CustomButton>
                        </Modal.Footer>
                    </Modal>
                    {/*=================================== Message Model ======================================*/}

                   {/*------------ update employer modal namita ------------------------------*/}

                    <Modal size="lg" show={this.state.viewEmployerModal} onHide={(event) => this.setState({viewEmployerModal:false,loaderShow : false, employerDetailsObj : []})}  centered backdrop='static'>
                        <Modal.Header style={styles.modal_header} closeButton>
                            <Modal.Title>Edit Employer</Modal.Title>
                        </Modal.Header>
                        <Modal.Body  style={{ padding: '15px',height : '330px', overflow : 'auto' }}>
                            {
                                this.state.loaderShow ? <Loader></Loader> : ''
                            }
                            
                             <div style={{ flexGrow: 1 }}>
                            <Grid container spacing={2} justify="center" >
                                <Grid item xs={12} sm={10}>
                                    <Sample setChild={this.setEmpValue.bind(this)} reqFlag={true} name={'CompanyName'} label={'Company Name'} value={this.state.compName} disable={false} style={customStyle.textFieldWrpAgent} length={50} fieldType={'street'} errMsg={'Enter valid company name'} helperMsg={'Company name required'} parentDetails={{ name: 'compName' }}></Sample>
                                </Grid>
                                <Grid item xs={12} sm={10}>
                                    <span>Address Details</span>
                                </Grid>
                                <Grid item xs={12} sm={5}>
                                    <Sample setChild={this.setEmpValue.bind(this)} reqFlag={true} name={'zipCode'} label={'Zip Code'} value={this.state.zipCode} disable={false} style={customStyle.textFieldWrpAgent} length={6} fieldType={'zip'} errMsg={'Enter valid zip code'} helperMsg={'Zip code required'} parentDetails={{ name: 'zipCode' }}></Sample>
                                </Grid>
                                <Grid item xs={12} sm={5}>
                                    <Sample setChild={this.setEmpValue.bind(this)} reqFlag={true} name={'city'} label={'City'} value={this.state.city} disable={true} style={customStyle.textFieldWrpAgent} length={5} fieldType={'city'} errMsg={'Enter valid city'} helperMsg={'City required'} parentDetails={{ name: 'city' }}></Sample>
                                </Grid>
                                <Grid item xs={12} sm={5}>
                                    <Sample setChild={this.setEmpValue.bind(this)} reqFlag={true} name={'state'} label={'State'} value={this.state.state} disable={true} style={customStyle.textFieldWrpAgent} length={25} fieldType={'city'} errMsg={'Enter valid state'} helperMsg={'State required'} parentDetails={{ name: 'state' }}></Sample>
                                </Grid>
                                <Grid item xs={12} sm={5}>
                                    <Sample setChild={this.setEmpValue.bind(this)} reqFlag={false} name={'street'} label={'Street, Suite'} value={this.state.street} disable={false} style={customStyle.textFieldWrpAgent} length={25} fieldType={'street'} errMsg={'Enter valid street'}  parentDetails={{ name: 'street' }}></Sample>
                                </Grid>
                                <Grid item xs={12} sm={10}>
                                    <span>SIC</span>
                                </Grid>
                                <Grid item xs={12} sm={5} style={{ width: '90%' }}>
                                    <CommonDropDwn setChild={this.setEmpDropDownValue.bind(this)} reqFlag={false} name={'division'} label={'Division'} value={this.state.division} fieldType={'dropDwn'} disable={false} style={customStyle.dropDown} List={this.state.divisionList} errMsg={'Select valid division'}  parentDetails={{ name: 'division' }}></CommonDropDwn>
                                </Grid>
                                <Grid item xs={12} sm={5}>
                                    <CommonDropDwn setChild={this.setEmpDropDownValue.bind(this)} reqFlag={false} name={'industry'} label={'Industry'} value={this.state.industry} disable={this.state.industryList.length === 0} style={customStyle.textFieldWrpAgent} List={this.state.industryList} errMsg={'Select valid industry'}  parentDetails={{ name: 'industry' }}></CommonDropDwn>
                                </Grid>
                                <Grid item xs={12} sm={5}>
                                    <CommonDropDwn setChild={this.setEmpDropDownValue.bind(this)} reqFlag={false} name={'codeTitle'} label={'SIC Code Title'} value={this.state.codeTitle} disable={this.state.codeTitleList.length === 0} style={customStyle.textFieldWrpAgent} List={this.state.codeTitleList} errMsg={'Select valid code title'}  parentDetails={{ name: 'codeTitle' }}></CommonDropDwn>
                                </Grid>
                                <Grid item xs={12} sm={5}>
                                    <Sample setChild={this.setEmpValue.bind(this)} reqFlag={false} name={'sicCode'} label={'SIC Code'} value={this.state.code} disable={true} style={customStyle.textFieldWrpAgent} length={10} fieldType={'num'} errMsg={'Enter valid code'}  parentDetails={{ name: 'code' }}></Sample>
                                </Grid>
                                <Grid item xs={12} sm={10}>
                                    <span>Employer Contact Details</span>
                                </Grid>
                                <Grid item xs={12} sm={5}>
                                    <Sample setChild={this.setEmpValue.bind(this)} reqFlag={true} name={'fistName'} label={'First Name'} value={this.state.firstName} disable={false} style={customStyle.textFieldWrpAgent} length={25} fieldType={'text'} errMsg={'Enter valid first name'} helperMsg={'First name required'} parentDetails={{ name: 'firstName' }}></Sample>
                                </Grid>
                                <Grid item xs={12} sm={5}>
                                    <Sample setChild={this.setEmpValue.bind(this)} reqFlag={true} name={'lastName'} label={'Last Name'} value={this.state.lastName} disable={false} style={customStyle.textFieldWrpAgent} length={25} fieldType={'text'} errMsg={'Enter valid last name'} helperMsg={'Last name required'} parentDetails={{ name: 'lastName' }}></Sample>
                                </Grid>
                                <Grid item xs={12} sm={5}>
                                    <Sample setChild={this.setEmpValue.bind(this)} reqFlag={false} name={'jobTitle'} label={'Job title'} value={this.state.jobTitle} disable={false} style={customStyle.textFieldWrpAgent} length={50} fieldType={'text'} errMsg={'Enter valid job title'}  parentDetails={{ name: 'jobTitle' }}></Sample>
                                </Grid>
                                <Grid item xs={12} sm={5}>
                                    <Sample setChild={this.setEmpValue.bind(this)} reqFlag={true} name={'workEmail'} label={'Work Email'} value={this.state.workEmail} style={customStyle.textFieldWrpAgent} length={50} fieldType={'email'} errMsg={'Enter valid work email'} helperMsg={'Work email required'} parentDetails={{ name: 'workEmail' }}></Sample>
                                </Grid>
                                <Grid item xs={12} sm={5}>
                                    <Sample setChild={this.setEmpValue.bind(this)} reqFlag={false} name={'phoenNumber'} label={'Phone Number'} value={this.state.phone} disable={false} style={customStyle.textFieldWrpAgent} length={10} fieldType={'phone'} errMsg={'Enter valid phone number'} parentDetails={{ name: 'phone' }}></Sample>
                                </Grid>
                                <Grid item xs={12} sm={5}>
                                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                        <KeyboardDatePicker
                                            required
                                            onBlur={() => this.setState({ birthDtFocus: true })}
                                            onMouseOver={() => this.setState({ birthDt: true })}
                                            onMouseLeave={() => this.setState({ birthDt: false })}
                                            autoComplete='off'
                                            margin="none"
                                            id="date-picker-dialog"
                                            label="Select Program Effective Date"
                                            format="MM/dd/yyyy"
                                            error={this.state.dateErr} //&&!this.state.todayDateValid
                                            helperText={this.state.dateErr ? 'Enter valid date' : ''} //this.state.todayDateValid?'Date Required':
                                            value={myDate} //this.state.todayDateValid?null:
                                            onFocus={e => e.target.blur()}
                                            onCopy={this.handlerCopy}
                                            onPaste={this.handlerCopy}
                                            inputProps={{ style: { fontSize: '18px', fontFamily: 'Roboto, Arial, Helvetica, sans-serif', paddingLeft: '11px', paddingRight: '10px', marginTop: '11px', '&:focus': { outline: 'none' }, color: !this.state.birthDt ? 'grey' : '#533278' } }}
                                            InputLabelProps={{ style: { paddingLeft: 10, paddingRight: 10, paddingTop: 12, color: !this.state.birthDtFocus ? 'grey' : this.state.birthDt ? '#533278' : 'grey' } }}//|| !this.state.todayDateValid
                                            onChange={this.handleDateChange.bind(this)}
                                            variant="filled"
                                            // onMouseEnter={this.handleHover}
                                            TextFieldComponent={CssTextField}
                                            KeyboardButtonProps={{
                                                'aria-label': 'change date',
                                            }}
                                            style={{ width: '100%' }}
                                            shouldDisableDate={(e) => this.disableWeekends(e, this.state.USER_DATA.clientId)}
                                            minDate={new Date(tomorrow)}
                                            maxDate={new Date(futureDate)}
                                        />
                                        <span id='bd' style={customStyle.EnrollNew2Span}></span>

                                    </MuiPickersUtilsProvider>
                                </Grid>
                                <Grid item xs={12} sm={10}>
                                    <span style={{marginRight:'20px'}}>Health Administrator Contact Details</span>
                                    <Checkbox
                                        checked={this.state.copyEmpCheck}
                                        inputProps={{
                                            'aria-label': 'secondary checkbox',
                                        }}
                                        style={{ color: '#533278' }}
                                        onClick={this.copyEmployerDetails}
                                    />
                                    <span>Same as above</span>
                                </Grid>
                                <Grid item xs={12} sm={5}>
                                    <Sample setChild={this.setEmpValue.bind(this)} reqFlag={true} name={'adminFistName'} label={'First Name'} value={this.state.adminFirstName} disable={false} style={customStyle.textFieldWrpAgent} length={25} fieldType={'text'} errMsg={'Enter valid first name'} helperMsg={'First name required'} parentDetails={{ name: 'adminFirstName' }}></Sample>
                                </Grid>
                                <Grid item xs={12} sm={5}>
                                    <Sample setChild={this.setEmpValue.bind(this)} reqFlag={true} name={'adminLastName'} label={'Last Name'} value={this.state.adminLastName} disable={false} style={customStyle.textFieldWrpAgent} length={25} fieldType={'text'} errMsg={'Enter valid last name'} helperMsg={'Last name required'} parentDetails={{ name: 'adminLastName' }}></Sample>
                                </Grid>
                                <Grid item xs={12} sm={5}>
                                    <Sample setChild={this.setEmpValue.bind(this)} reqFlag={true} name={'eeail'} label={'Email'} value={this.state.adminEmail} style={customStyle.textFieldWrpAgent} length={50} fieldType={'email'} errMsg={'Enter valid email'} helperMsg={'Email required'} parentDetails={{ name: 'adminEmail' }}></Sample>
                                </Grid>
                                <Grid item xs={12} sm={5}>
                                    <Sample setChild={this.setEmpValue.bind(this)} reqFlag={false} name={'phoneNumber'} label={'Phone Number'} value={this.state.adminPhone} disable={false} style={customStyle.textFieldWrpAgent} length={10} fieldType={'phone'} errMsg={'Enter valid phone number'} parentDetails={{ name: 'adminPhone' }}></Sample>
                                </Grid>
                            </Grid>

                        </div>



                        </Modal.Body>
                        <Modal.Footer>
                        <NextButton style={{ margin: '0', marginRight: '10px', width: '95px', height: '40px', backgroundColor:'#4782c4' }} disabled={this.state.disableSubmit} onClick={() => this.addEmployer()}>UPDATE</NextButton>
                        <CustomButton style={{ height: '40px', backgroundColor:'#4782c4', color: "#fff" }} onClick={() => this.closeEmployerModal()}>Cancel</CustomButton>
                        </Modal.Footer>
                    </Modal>


                 {/*------------ update employer modal end------------------------------*/}

                    <Modal size="xs" show={this.state.confirmationModal} backdrop="static" centered>
                        <Modal.Header style={customStyle.modal_header}>
                            <Modal.Title>Send Quote</Modal.Title>
                        </Modal.Header>
                        <Modal.Body style={{ margin: '10px',textAlign:'left',fontFamily : 'Roboto, Arial, Helvetica, sans-serif' }}>

                           
                            {
                                this.state.countData && this.state.countData.total ?
                                <CommonDropDwn setChild={this.setEmailId.bind(this)} reqFlag={true} name={'Email'} label={"Please select recipient's email address"} value={this.state.selectedEmail} fieldType={'dropDwn'} disable={false} style={customStyle.dropDown}  List={this.state.emp_email_id} errMsg={'Select valid email'} helperMsg={'Email required'}  parentDetails={{name:'selectedEmail'}}></CommonDropDwn>

                               
                                :
                                <h6>No census data available!</h6>
                            }
                        </Modal.Body>
                        <Modal.Footer style={{alignItems:'right'}}>
                            {
                                this.state.countData && this.state.countData.total ?
                            <CustomButton style={{width: '90px', height: '40px'}} disabled={this.state.selectedEmail === ''} onClick={()=>this.sendEmpQuoteMail()}>Confirm</CustomButton>
                                :
                                null
                            }
                            <CustomButton style={{marginLeft: '10px', width: '70px', height: '40px'}} onClick={()=>{this.setState({ confirmationModal : false,loaderShow : false, selectedEmail : ''})}}>Cancel</CustomButton>
                        </Modal.Footer>
                    </Modal>
                </div>
                <div style={{fontSize:'11px', marginTop:'15px', fontFamily: "Roboto, Arial, Helvetica, sans-serif"}}>
                    <Footer/>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state =>{
    return {
        agentId: state.agentId,
        clientId: state.clientId,
        associationId: state.associationId,
        clientName : state.clientName
    }
}

export default connect(mapStateToProps) (Prospect);