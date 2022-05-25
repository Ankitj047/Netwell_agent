import React, { Component } from 'react';
import customStyle from '../../Assets/CSS/stylesheet_UHS'
import AddIcon from '@material-ui/icons/Add';
import SearchIcon from '@material-ui/icons/Search';
import Popover from '@material-ui/core/Popover';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import { Modal,Toast  } from "react-bootstrap";
import { createMuiTheme, withStyles, MuiThemeProvider } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import MUIDataTable from "mui-datatables";
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import PublishIcon from '@material-ui/icons/Publish';
import InfoIcon from '@material-ui/icons/Info';
import TableCell from '@material-ui/core/TableCell';
import XLSX from "xlsx";
import './readExcel.css'
import TransactionTable from './TransactionTable'
import Tooltip from "@material-ui/core/Tooltip";
// import CommonErrorModal from '../Screens/Enrollment/CommonPopup/CommonErrorModal'
import {
    FormControl,
    InputLabel,
    Select,
    Typography,
    TextField, Grid
} from '@material-ui/core';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import Sample from '../CommonScreens/sampleTextField';
import Fab from "@material-ui/core/Fab";
import RefreshIcon from '@material-ui/icons/Refresh';
import axios from 'axios';
import configurations from "../../configurations";
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import IconButton from '@material-ui/core/IconButton';
import moment from "moment";
import Loader from "../loader";
import { CopyToClipboard } from "react-copy-to-clipboard";
import Tabs from "@material-ui/core/Tabs";
import Tab from '@material-ui/core/Tab';
import { getQueryParams } from "../authentication/utils";
import { TrendingUpRounded } from '@material-ui/icons';
import CommonDropDwn from "../CommonScreens/CommonDropDwn_1";
// import exportToExcel from './exportToExcel';
import { exportDefaultSpecifier } from '@babel/types';
const json2csv = require('json2csv').parse;
var convert = require('xml-js');

const AntTabs = withStyles(
    customStyle.tabs
)(Tabs);

const AntTab = withStyles(theme => (
    customStyle.tab
))(props => <Tab disableRipple {...props} />);


const CustomButton = withStyles(
    customStyle.viewBtn
)(Button);
const CrudButton = withStyles(
    customStyle.crudBtnAgent,
)(Fab);
const NextButton = withStyles(
    customStyle.doneBtn
)(Button);


const HtmlTooltip = withStyles(theme => ({
    tooltip: {
        backgroundColor: '#4a4b57',//theme.palette.common.black,
        border: '1px solid #dadde9',
        fontSize : '12px',
        maxWidth : '220px',
        marginLeft:'15px'
    },
    arrow: {
        color: '#4a4b57',
    },
}))(Tooltip);

const uploadContent = {
    color: '#000000',
    fontWeight: '500',
    ul: {
        li: {
            color: '#f30',
            fontWeight: '500'
        }
    }
};

var formData = new FormData();
formData.append("draw", "1");
formData.append("start", "0");
formData.append("length", "10");
formData.append("columns[0].data", "id");
formData.append("columns[0].name", "");
formData.append("columns[0].searchable", "true");
formData.append("columns[0].orderable", "true");
formData.append("columns[0].search.regex", "false");
formData.append("columns[0].search.value", "");

formData.append("columns[1].data", "createdDate");
formData.append("columns[1].name", "");
formData.append("columns[1].searchable", "true");
formData.append("columns[1].orderable", "true");
formData.append("columns[1].search.regex", "false");
formData.append("columns[1].search.value", "");

formData.append("columns[2].data", "email");
formData.append("columns[2].name", "");
formData.append("columns[2].searchable", "true");
formData.append("columns[2].orderable", "true");
formData.append("columns[2].search.regex", "false");
formData.append("columns[2].search.value", "");

formData.append("columns[3].data", "enrollFlag");
formData.append("columns[3].name", "");
formData.append("columns[3].searchable", "true");
formData.append("columns[3].orderable", "false");
formData.append("columns[3].search.regex", "false");
formData.append("columns[3].search.value", "");

formData.append("columns[4].data", "firstName");
formData.append("columns[4].name", "");
formData.append("columns[4].searchable", "true");
formData.append("columns[4].orderable", "true");
formData.append("columns[4].search.regex", "false");
formData.append("columns[4].search.value", "");

formData.append("columns[5].data", "lastName");
formData.append("columns[5].name", "");
formData.append("columns[5].searchable", "true");
formData.append("columns[5].orderable", "true");
formData.append("columns[5].search.regex", "false");
formData.append("columns[5].search.value", "");

formData.append("columns[6].data", "completionStatus");
formData.append("columns[6].name", "");
formData.append("columns[6].searchable", "true");
formData.append("columns[6].orderable", "false");
formData.append("columns[6].search.regex", "false");
formData.append("columns[6].search.value", "");

formData.append("columns[7].data", "empid");
formData.append("columns[7].name", "");
formData.append("columns[7].searchable", "true");
formData.append("columns[7].orderable", "false");
formData.append("columns[7].search.regex", "false");
formData.append("columns[7].search.value", "");

formData.append("columns[8].data", "record");
formData.append("columns[8].name", "");
formData.append("columns[8].searchable", "true");
formData.append("columns[8].orderable", "true");
formData.append("columns[8].search.regex", "false");
formData.append("columns[8].search.value", "");

formData.append("columns[9].data", "inviteStatus");
formData.append("columns[9].name", "");
formData.append("columns[9].searchable", "true");
formData.append("columns[9].orderable", "true");
formData.append("columns[9].search.regex", "false");
formData.append("columns[9].search.value", "");

formData.append("order[0].column", "0");
formData.append("order[0].dir", "desc");
formData.append("search.regex", "false");
formData.append("search.value", "");

let requestOptions = {
    method: 'POST',
    body: formData,
};

class AgentTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userList: [],
            userValid: false,
            headerList: ["User Id", "User Name", "Email Id", "Status"],
            loaderShow: false,
            createdDate: null,
            userData: [],
            disableProceed: true,
            anchorEl: null,
            modalShow: false,
            open: false,
            addUsermodalShow: false,
            fname: '',
            lname: '',
            email: '',
            phone: '',
            clientId: '',
            associationId: '',
            brokerId: '',
            countryCode: '+1',
            openedPopoverId: null,
            selectedIndex: null,
            selectedUSerData: {},
            errMsg: '',
            code: null,
            viewDetailsModal: false,
            editModal: false,
            searchText: '',
            searchTypeValue: '',
            searchShow: true,
            fName: '', lName: '', fl: null, dateAdded: '',
            statusValue: '',
            rowsPerPage: 10,
            count: 10,
            deleteModal: false,
            delEmail: '',
            targetDate: null,
            resendFlag: false,
            userName: '',
            activeTab: 0,
            viewUserData: [],
            transactionData: [],
            loginData: [],
            reassignHistoryData: [],
            detailsData: {},
            transCount: 0,
            loginCount: 0,
            reassignHistoryCount: 0,
            empid: '',
            page: 0,
            uploadExcelModal: false,
            validationExcelModal:false,
            duplicateEmail:false,
            excelValidation:false,
            validationArr:[],
            uploadFileName: '',
            file: {},
            recData: [],
            finalArr: [],
            showValidation:false,
            fileNameModal:false,
            //inValidData:[],
            inValidEmailData:[],
            inValidRecordData:[],
            successUpload:false,
            invalidMessage:false,
            city:'',
            state:'',
            country:'',
            tempEmail:'',
            checkZip:false,
            checkADDons:null,
            agentList : [],
            selectedAgent : '',
            selectedMemberId: '',
            reAssignAgentModal: false,
            prospectFullName:'',
            selecetedAgentName: '',
            reAssignSuccess: false,
            leadQualificationData:null,
            prospectObj:[],
            showCommonErrorModal:false,
            downloadFinalArr:[],
            exportToExcelArr :[],
            downloadDataFlag : false,
            emailID:"",
            phoneNumber:"",
            inviteStatus:"",
            userTerminated:false
        };
    }

    componentDidMount() {
        this.setState({
            loaderShow: true
        });
        let queryParams = getQueryParams();
        if (queryParams && queryParams.empid) {
            this.setState({ empid: queryParams.empid });
            this.getUserData(queryParams.empid)
        } else {
            this.setState({ empid: this.props.defaultEmpid });
            this.getUserData('NULL');
        }
        axios.get(process.env.REACT_APP_enrollment_base_url + "/addon/getAddonListByClient/"+ this.props.clientId)
                .then((response) => {
                    if(response && response.data.response.length > 0){
                        this.setState({checkADDons: true})
                    }else{
                        this.setState({checkADDons: false})
                    }                    
        });
    }

    // ------------------ Start file upload -----------------------------
    filenameModalClose=()=>{
    this.setState({fileNameModal:false})
}

    handleDrop = (e) => {
        let dt = e.dataTransfer;
        let files = dt.files;

        this.setState({ uploadFileName: files[0].name ,fileNameModal:true});
        this.handleFiles(files);
    };

    handleFiles = (files) => {
        files = [...files];
        var f = JSON.stringify(files[0].name)
        console.log("File Name===",files[0].name)

        // alert(f)
          if(files && files[0]){
            if(files[0].type == 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' || files[0].type == 'application/vnd.ms-excel'){
                this.setState({invalidMessage:false,fileNameModal:true})
            }else{
                this.setState({fileNameModal:false,invalidMessage:true})
            

            }
         }   
       
        this.previewFile(files)
       
        
    };
    previewFile = (file, e) => {

        var fileReader = new FileReader();
        fileReader.onload = (event) => {
            var getData = event.target.result;
            
            var workbook = XLSX.read(getData, {
                type: "binary"
            });
            workbook.SheetNames.forEach(sheet => {
                let rowObject = XLSX.utils.sheet_to_json(
                    workbook.Sheets[sheet]                    
                );
                console.log("fileNameModal===",this.state.fileNameModal)
                let jsonObject = JSON.stringify(rowObject);
                this.setState({ recData: this.state.fileNameModal==true?rowObject:null }, () => {
                    console.log("recData===",this.state.recData)
                    
                    this.rename()
                    // this.dataValidation()
                }
                )
            })

        }

        fileReader.readAsBinaryString(file[0])

    };

    /* handleChangefileup(files) {
        this.setState({
            upfile: files
        });
    }

    handleUploadAdd=(newFiles)=>{
        newFiles = newFiles.filter(file => !this.state.uploadFiles.find(f => f.data === file.data));
            this.setState({uploadFiles:[...this.state.uploadFiles, ...newFiles]},()=> console.log("handleUploadAdd======",this.state.uploadFiles))
    } */
    handleUploadSave = () => {
        this.setState({ uploadExcelModal: false })
    }

    // handleChangeFile=(e,fil)=> {

    //     console.log("files----", e);
    //     const files = e.target.files;
    //     console.log("files----------", files);
    //     if (files && files[0]) {
    //     this.setState({ file: files[0] });
    //     }
    //   }
    handleChangeFile = (e) => {

        const files = e.target.files;
        console.log("File Name===",files[0].name)
      
        if (files && files[0] ) {
            if(files[0].type == 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' || files[0].type == 'application/vnd.ms-excel' ){
                var fileName = e.target.files[0].name;
              
                this.setState({
                                 file: files[0],
                                //  invalidMessage:false, 
                                 uploadFileName: fileName,
                                 fileNameModal:true 
                                }, () => this.previewFile(files));
                                
                                console.log("Record data---",this.state.recData)

                                // let getData = this.state.recData;
                                // if (getData && getData.length > 0) {
                                //     this.state.finalArr = [];
                                //     for (let i = 0; i < getData.length; i++) {
                                //         if(getData[i].record && getData[i].relationship == "Employee"){
                                //             let dependentArry= [];
                                //             for (let j = i+1; j <= getData.length -1; j++) {
                                //                 if(!getData[j].record){
                                //                     getData[j].email= null;
                                //                     getData[j].record = getData[i].record;
                                                    
                                //                     if(getData[j].state == undefined || !getData[j].state){
                                //                         this.state.validationArr.push({record:getData[j].record, relationship:getData[j].relationship, msg:'Please check zipcode'})    
                                                   
                                //                     }else{
                                //                         dependentArry.push(getData[j]);
                                //                     }
                                                    
                                //                 }else{
                                //                     break;
                                //                 }
                                //             }
                                             
                                //             getData[i].email= getData[i].email ? getData[i].email : null;
                                //             getData[i].dependentList = dependentArry;
                                //             if(getData[i].state !=undefined){
                                //                 this.state.finalArr.push(getData[i]);
                                //             }else{
                                //         this.state.validationArr.push({record:getData[i].record, relationship:getData[i].relationship, msg:'Please check zipcode'})    
                                        
                                //             }
                                           
                                //         }
                                        
                                        
                                //     }
                                //     if(this.state.validationArr.length > 0){
                                //         this.setState({
                                //             validationExcelModal:true,
                                //             excelValidation: true,
                                //             fileNameModal :false,
                                //             uploadLoaderShow: false
                                //         })
                                //     }
                                // }
              

            }else{
                this.setState({ invalidMessage:true,fileNameModal:false });

            }
            }
          
    }



    renameKey = (obj, old_key, new_key) => {
        if (old_key !== new_key) {
            Object.defineProperty(obj, new_key,
                Object.getOwnPropertyDescriptor(obj, old_key));
            delete obj[old_key];
        }

    }

    rename = () => {
        this.setState({ uploadLoaderShow: true, fileNameModal:false})
        this.state.recData.forEach(obj => {
            Object.entries(obj).map(([key, value]) => {

                if (key === "Record #") {
                    this.renameKey(obj, 'Record #', 'record')
                }

                if (key === "Employee Record") {
                    this.renameKey(obj, 'Employee Record', 'employeeRecord')
                }
                if (key === "Relationship") {
                    this.renameKey(obj, 'Relationship', 'relationship')
                   
                }
                if (key === "First Name") {
                    this.renameKey(obj, 'First Name', 'firstName')
                }
                if (key === "Last Name") {
                    this.renameKey(obj, 'Last Name', 'lastName')
                }
                if (key === "Date of Birth") {
                    var serial = value;
                    this.renameKey(obj, 'Date of Birth', 'dob')

                    var utc_days = Math.floor(serial - 25569);
                    var utc_value = utc_days * 86400;
                    var date_info = new Date(utc_value * 1000);
                    var month
                    var day
                    if ((date_info.getMonth() + 1) < 10) {
                        month = '0' + (date_info.getMonth() + 1)
                    } else {
                        month = (date_info.getMonth() + 1)
                    }
                    if ((date_info.getDate()) < 10) {
                        day = '0' + (date_info.getDate())
                    } else {
                        day = (date_info.getDate())
                    }

                    var x = date_info.getFullYear() + '-' + month + '-' + day

                    obj.dob = x


                }
                if (key === "Age") {
                    this.renameKey(obj, 'Age', 'age')
                }
               
                if (key === "Birth Gender") {
                    this.renameKey(obj, 'Birth Gender', 'gender')
                    if (obj.gender.trim() == 'F' || obj.gender.trim() == 'f' || obj.gender.trim() == 'female' || obj.gender.trim() == 'FEMALE') {
                        return obj.gender = "FEMALE"
                    }
                    if (obj.gender.trim() == 'M' || obj.gender.trim() == 'm' || obj.gender.trim() == 'male' || obj.gender.trim() == 'MALE') {
                        return obj.gender = "MALE"
                    }
                    
                }
                if (key === "Zip") {
                    this.renameKey(obj, 'Zip', 'zipCode')
                }
                if (key === "Email Address") {
                    this.renameKey(obj, 'Email Address', 'email')
                }
            })
        
        });


       
        //--- Check for excelsheet validation
        
        let excelData = this.state.recData;

        console.log("excelData===",excelData)

        let recNumber;
        for (let x = 0; x < excelData.length ; x++) {
           
            if((excelData[x].record && excelData[x].relationship.trim() == "Employee") || (excelData[x].relationship.trim() == "Spouse" || excelData[x].relationship.trim() == "Child")){
                //let recNumber = excelData[x].record  && typeof(excelData[x].record) !== 'string'? excelData[x].record: excelData[x-1].record ? excelData[x-1].record : excelData[(x-1)-(x-1)].record ; 
                if(excelData[x].relationship.trim() == "Employee"){
                    recNumber = excelData[x].record && typeof(excelData[x].record) !== 'string'? excelData[x].record:'NA'; 
                }
                
                if(typeof(excelData[x].record) == 'string'){ // check for blank space
                     let recNum = excelData[x].record.toString();
                    if(!recNum?.trim()){
                    delete excelData[x].record;
                    }
                }
                if(excelData[x].record){
                    let chkRegex = this.checkRegex(excelData[x].record, 'Record' )
                    if(!chkRegex){
                        this.state.validationArr.push({record:recNumber, relationship:excelData[x].relationship, msg:'Record number is not in number format'})
                    }                
                }

               

                if(!excelData[x].age && (!excelData[x].dob || excelData[x].dob=='NaN-NaN-NaN')){
                    // if(!excelData[x].dob || excelData[x].dob=='NaN-NaN-NaN'){
                        this.state.validationArr.push({record:recNumber, relationship:excelData[x].relationship, msg:excelData[x].dob=='NaN-NaN-NaN' ? 'Birth date is invalid' : 'Age or Birth Date missing'})
                    } else{
                        if(excelData[x].age){
                            if(/^\s+$/.test(excelData[x].age)){
                                delete excelData[x].age
                            }else{
                                let chkRegex = this.checkRegex(excelData[x].age, 'Age' )
                            if(!chkRegex){
                             this.state.validationArr.push({record:recNumber, relationship:excelData[x].relationship, msg:'Age is invalid'})
                            }else{ // if age present and type age not between 18 - 86 or  0-26
                                if((excelData[x].relationship.trim() == 'Employee' || excelData[x].relationship.trim() == 'Spouse') && (excelData[x].age > 17 && excelData[x].age < 86)){
                                this.state.validationArr.push()
                                }
                                else if(excelData[x].relationship.trim() == "Child" && (excelData[x].age >= 0 && excelData[x].age < 26)){
                                    this.state.validationArr.push()
                                }else{
                                    this.state.validationArr.push({record:recNumber, relationship:excelData[x].relationship, msg:'Age is invalid'})

                                }
                            }
                            }
                            
                        }
                        if(excelData[x].dob){
                            if(/^\s+$/.test(excelData[x].dob)){
                                delete excelData[x].dob
                            }else{
                            var today = new Date();
                            var birthDate = new Date(excelData[x].dob);
                            var age_now = today.getFullYear() - birthDate.getFullYear();
                            console.log("=age_now===",age_now)
                            var m = today.getMonth() - birthDate.getMonth();
                            if(birthDate.getFullYear() < 1900){
                                delete excelData[x].dob
                            }else{
                                if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
                                    age_now--;
                                    console.log("=age_now===",age_now)
                                }
                                if(excelData[x].relationship.trim() == "Employee" || excelData[x].relationship.trim() == "Spouse"){
                                    if(age_now > 17 && age_now < 86){
                                        excelData[x].age=age_now
                                    }else{
                                this.state.validationArr.push({record:recNumber, relationship:excelData[x].relationship, msg:'The acceptable age for an adult is from 18 to 86 years '})
        
                                    }
                                }else if(excelData[x].relationship.trim() == "Child" ){
                                    if(age_now >= 0 && age_now < 26){
                                        excelData[x].age=age_now
                                    }else{
                                        this.state.validationArr.push({record:recNumber, relationship:excelData[x].relationship, msg:'The acceptable age for a child is upto 26 years'})
        
                                    }
                                }
                                }
                            }
                          
                            
                        }
                       
                        
                    }        
                
                // }
                
                // else{
                //     let chkRegex = this.checkRegex(excelData[x].age, 'Age' )
                //     if(!chkRegex){
                //         this.state.validationArr.push({record:recNumber, relationship:excelData[x].relationship, msg:'Age is not in number format'})
                //     }
                    
                // }
    
                if(!excelData[x].zipCode){
                    this.state.validationArr.push({record:recNumber, relationship:excelData[x].relationship, msg:'Zip code is missing'})
                }else{
                    let chkRegex = this.checkRegex(excelData[x].zipCode, 'Zip' )
                    if(!chkRegex){
                        this.state.validationArr.push({record:recNumber, relationship:excelData[x].relationship, msg:'Zip Code is not in correct format'})
                        console.log('if false=---', this.state.validationArr)
                    }else{
                        
                        let url = `https://secure.shippingapis.com/ShippingAPI.dll?API=CityStateLookup&XML=<CityStateLookupRequest USERID="935USTGL7449"><ZipCode ID="0"><Zip5>${excelData[x].zipCode}</Zip5></ZipCode></CityStateLookupRequest>`

                        axios.get(url)
                        .then(response => {                            
                            var result2 = convert.xml2json(response.data, { compact: false, spaces: 4 });
                            console.log("Zip json---",JSON.parse(result2).elements[0].elements[0].elements[0].elements[2])
                            if (JSON.parse(result2).elements[0].elements[0].elements[0].elements[2]) {
                                
                                this.state.city = '';
                                this.state.state = '';
                                this.state.country = '';
                                // this.state.validationArr.push({record:excelData[x].zipCode, relationship:excelData[x].firstName, msg:'Invalid zip code'})
                                
            
                            }else {
                                axios.get(process.env.REACT_APP_enrollment_base_url + '/plan/validateBlackListState/' + JSON.parse(result2).elements[0].elements[0].elements[2].elements[0].text)
                                    .then(response => {
                                        this.setState({
                                            loaderShow: false,
                                        });
            
                                        if (response.data.response) {
    
                                            this.state.state = '';
                                            this.state.city = '';
                                            this.state.country = '';
                                            this.state.validationArr.push({record:recNumber, relationship:excelData[x].relationship, msg:'We’re sorry. At this time, we are not offering the Universal HealthShare program in this zip code'})
                                            // if(this.state.validationArr && this.state.validationArr.length>0){
                                            //     this.setState({
                                            //         fileNameModal: false,
                                            //         validationExcelModal: true,
                                            //         successUpload: false,
                                            //         excelValidation: true
                                            //     })
                                            // }
                                            
                                        } else {
                                            this.state.zipCode = JSON.parse(result2).elements[0].elements[0].elements[0].elements[0].text;
                                            this.state.state = JSON.parse(result2).elements[0].elements[0].elements[2].elements[0].text;
                                            this.state.city = JSON.parse(result2).elements[0].elements[0].elements[1].elements[0].text;
                                            this.state.country = 'US';
                                            excelData[x].city=this.state.city
                                            excelData[x].state=this.state.state
                                            excelData[x].country=this.state.country
                                            console.log("excelData[x]==",excelData[x])
                                           
                                            // var evt = new CustomEvent('zip', { detail: { zipcode: zipcode, flag: true, errMsg: 'We’re sorry. At this time, we are not offering the Universal HealthShare program in this zip code', parentDetails: parent } });
                                            // window.dispatchEvent(evt);
                                          
                                        }
                                    });
                            }
                           
                        })
                        .catch(error => {
                            console.log(error);
                            console.log(error.response);
                            // if (error.response.status === 500) {                                
                                this.setState({
                                    loaderShow: false,
                                    // showCommonErrorModal: true,
                                });
                            // }
                        });
                    }

                    //namita 26 april
                    
                }
                if(!excelData[x].email){
                    excelData[x].email=null
                }else{
                    if(/^\s+$/.test(excelData[x].email)){
                        delete excelData[x].email
                    }else{
                        let chkRegex = this.checkRegex(excelData[x].email, 'email' )
                        if(!chkRegex){
                            this.state.validationArr.push({record:recNumber, relationship:excelData[x].relationship, msg:'Email is invalid'})
                        }
                    }
                   
                }
                
                if(!excelData[x].firstName){
                    excelData[x].firstName=""
                }
                if(!excelData[x].lastName){
                    excelData[x].lastName=""
                }
                if(!excelData[x].gender){
                    this.state.validationArr.push({record:recNumber, relationship:excelData[x].relationship, msg:'Birth Gender is missing'})
                }else {
                    if(excelData[x].gender == "MALE" || excelData[x].gender == "FEMALE"){
                        
                    }else{
                        this.state.validationArr.push({record:recNumber, relationship:excelData[x].relationship, msg:'Birth Gender must be either Male or Female'})    
                    }                            
                }
            }else {
                this.state.validationArr = [];
                this.state.validationArr.push({record:'', relationship:'', msg:'Record Number missing of row '+ (x+1)})    
                break
            }
            
        }


        console.log("validationArr===",this.state.validationArr)

        if(this.state.validationArr && this.state.validationArr.length>0){
            this.setState({
                fileNameModal: false,
                validationExcelModal: true,
                successUpload: false,
                excelValidation: true,
                uploadLoaderShow: false
            })
        }else{
            
            this.state.recData = excelData;    
            // this.setState({uploadLoaderShow: false, fileNameModal:true})
            setTimeout(() => {
                this.setState({uploadLoaderShow: false, fileNameModal:true});
                this.handleUploadFile();
            }, 8000);   
    
        }
        this.state.recData = excelData;    

        console.log("excelData FINAL ===",this.state.recData)
               
        
       



        

       




        // To Check duplicate email in uploaded excel sheet
        /* if(excelData && excelData.length > 0){
            for (let a = 0; a < excelData.length; a++) {
                if(excelData[a].relationship == "Employee"){
                    let findData = excelData.filter(obj => obj.email == excelData[a].email);
                    if(findData && findData.length>1){
                        this.setState({
                            fileNameModal: false,
                            validationExcelModal: true,
                            successUpload: false,
                            duplicateEmail: true
                        })
                        break;
                    }
                }
               
            }
        } */


    }


dataValidation =()=>{
    let getData = this.state.recData;
    console.log("getData==",getData)
                                if (getData && getData.length > 0) {
                                    this.state.finalArr = [];
                                    for (let i = 0; i < getData.length; i++) {
                                        if(getData[i].record && getData[i].relationship == "Employee"){
                                            let dependentArry= [];
                                            for (let j = i+1; j <= getData.length -1; j++) {
                                                if(!getData[j].record){
                                                    getData[j].email= null;
                                                    getData[j].record = getData[i].record;
                                                    
                                                    if(getData[j].zipCode != undefined || getData[j].zipCode){
                                                        // this.state.validationArr.push({record:getData[j].record, relationship:getData[j].relationship, msg:'Please check zipcode'})    

                                                        let url = `https://secure.shippingapis.com/ShippingAPI.dll?API=CityStateLookup&XML=<CityStateLookupRequest USERID="935USTGL7449"><ZipCode ID="0"><Zip5>${getData[j].zipCode}</Zip5></ZipCode></CityStateLookupRequest>`

                                                        axios.get(url)
                                                        .then(response => {                            
                                                            var result2 = convert.xml2json(response.data, { compact: false, spaces: 4 });
                                                            if (JSON.parse(result2).elements[0].elements[0].elements[0].elements[2]) {
                                                                // var evt = new CustomEvent('zip', { detail: { zipcode: excelData[x].zipCode, flag: true, errMsg: "Enter valid zip code", parentDetails: parent } });
                                                                // window.dispatchEvent(evt);
                                                                this.state.validationArr.push({record:getData[j].record, relationship:getData[j].relationship, msg:'Please check zipcode'})    
                                                                console.log("validationArr dependant==",this.state.validationArr)
                                                            }else {
                                                                axios.get(process.env.REACT_APP_enrollment_base_url + '/plan/validateBlackListState/' + JSON.parse(result2).elements[0].elements[0].elements[2].elements[0].text)
                                                                    .then(response => {
                                                                        this.setState({
                                                                            loaderShow: false,
                                                                        });
                                            
                                                                        if (response.data.response) {
                                    
                                                                            this.state.validationArr.push({record:getData[j].record, relationship:getData[j].relationship, msg:'We’re sorry. At this time, we are not offering the Universal HealthShare program in this zip code'})    
                                                                            // if(this.state.validationArr && this.state.validationArr.length>0){
                                                                            //     this.setState({
                                                                            //         fileNameModal: false,
                                                                            //         validationExcelModal: true,
                                                                            //         successUpload: false,
                                                                            //         excelValidation: true
                                                                            //     })
                                                                            // }
                                                                            console.log("Validation message--",this.state.validationArr)
                                                                        } 
                                                                    });
                                                            }
                                                           
                                                        })
                                                   
                                                    }else{
                                                        dependentArry.push(getData[j]);
                                                    }
                                                    
                                                }else{
                                                    break;
                                                }
                                            }
                                             
                                            getData[i].email= getData[i].email ? getData[i].email : null;
                                            getData[i].dependentList = dependentArry;
                                            if(getData[i].zipCode !=undefined){
                                                this.state.finalArr.push(getData[i]);

                                                let url = `https://secure.shippingapis.com/ShippingAPI.dll?API=CityStateLookup&XML=<CityStateLookupRequest USERID="935USTGL7449"><ZipCode ID="0"><Zip5>${getData[i].zipCode}</Zip5></ZipCode></CityStateLookupRequest>`

                                                        axios.get(url)
                                                        .then(response => {                            
                                                            var result2 = convert.xml2json(response.data, { compact: false, spaces: 4 });
                                                            if (JSON.parse(result2).elements[0].elements[0].elements[0].elements[2]) {
                                                                // var evt = new CustomEvent('zip', { detail: { zipcode: excelData[x].zipCode, flag: true, errMsg: "Enter valid zip code", parentDetails: parent } });
                                                                // window.dispatchEvent(evt);
                                                                this.state.validationArr.push({record:getData[i].record, relationship:getData[i].relationship, msg:'Please check zipcode'})    
                                            
                                                            }else {
                                                                axios.get(process.env.REACT_APP_enrollment_base_url + '/plan/validateBlackListState/' + JSON.parse(result2).elements[0].elements[0].elements[2].elements[0].text)
                                                                    .then(response => {
                                                                        this.setState({
                                                                            loaderShow: false,
                                                                        });
                                            
                                                                        if (response.data.response) {
                                    
                                                                            this.state.validationArr.push({record:getData[i].record, relationship:getData[i].relationship, msg:'We’re sorry. At this time, we are not offering the Universal HealthShare program in this zip code'})    
                                                                            // if(this.state.validationArr && this.state.validationArr.length>0){
                                                                            //     this.setState({
                                                                            //         fileNameModal: false,
                                                                            //         validationExcelModal: true,
                                                                            //         successUpload: false,
                                                                            //         excelValidation: true
                                                                            //     })
                                                                            // }
                                                                            console.log("Validation message--",this.state.validationArr)
                                                                        } 
                                                                    });
                                                            }
                                                           
                                                        })

                                            }
                                           
                                        }
                                        
                                        
                                    }
                                    if(this.state.validationArr.length > 0){
                                        this.setState({
                                            validationExcelModal:true,
                                            excelValidation: true,
                                            fileNameModal :false,
                                            uploadLoaderShow: false
                                        })
                                    }else{
                                        this.setState({
                                            // validationExcelModal:true,
                                            // excelValidation: true,
                                            fileNameModal :true,
                                            uploadLoaderShow: false
                                        }) 
                                    }
                                }
}

    
     checkRegex = (val, key)=>{
         
           var reg = new RegExp();

            if(key == 'Record'){

                let recVal = parseInt(val);
                reg = (/^[0-9]*$/);
                console.log(reg.test(recVal));                
                return reg.test(recVal);  // returns a boolean

            }
            if(key == 'Age'){

                let ageVal = parseInt(val);
                reg = (/^[0-9]{1,2}$/);
                console.log(reg.test(ageVal));                
                return reg.test(ageVal);  // returns a boolean

            }
            if(key == 'Zip'){
                let value = val;
                if(typeof(value) == 'string'){
                    value = value.replace(/ +/g, "");
                }
                
                let zipVal = parseInt(value);
                reg = (/^[0-9]{5}$/);
                console.log(reg.test(zipVal));                
                return reg.test(zipVal);  // returns a boolean
                
            }
            if(key == 'email'){
                let emailVal = val;
                reg = (/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,3}))$/);
                console.log(reg.test(emailVal));                
                return reg.test(emailVal);  // returns a boolean
                
            }
     }

    checkZipcodeValidation=(zipcode,recNumber,relationship)=>{
        let url = `https://secure.shippingapis.com/ShippingAPI.dll?API=CityStateLookup&XML=<CityStateLookupRequest USERID="935USTGL7449"><ZipCode ID="0"><Zip5>${zipcode}</Zip5></ZipCode></CityStateLookupRequest>`

                    axios.get(url)
                    .then(response => {
                        var result2 = convert.xml2json(response.data, { compact: false, spaces: 4 });
                        console.log("JSON.parse(result2).elements[0].elements[0].elements[0].elements[2]===",JSON.parse(result2).elements[0].elements[0].elements[0].elements[2])
                        if (JSON.parse(result2).elements[0].elements[0].elements[0].elements[2]) {
                           
                            this.state.city = '';
                            this.state.state = '';
                            this.state.country = '';
                            return true
        
                        }else {
                            axios.get(process.env.REACT_APP_enrollment_base_url + '/plan/validateBlackListState/' + JSON.parse(result2).elements[0].elements[0].elements[2].elements[0].text)
                                .then(response => {
                                    this.setState({
                                        loaderShow: false
                                    });
        
                                    if (response.data.response === true || response.data.response === 'true') {

                                        this.state.state = '';
                                        this.state.city = '';
                                        this.state.country = '';
                                        
                                        // this.state.validationArr.push({record:recNumber, relationship:relationship, msg:'We’re sorry. At this time, we are not offering the Universal HealthShare program in this zip code'})
                                        console.log("this.state.validationArr====",this.state.validationArr)
                                        return true
                                    } else {
                                        this.state.zipCode = JSON.parse(result2).elements[0].elements[0].elements[0].elements[0].text;
                                        this.state.state = JSON.parse(result2).elements[0].elements[0].elements[2].elements[0].text;
                                        this.state.city = JSON.parse(result2).elements[0].elements[0].elements[1].elements[0].text;
                                        this.state.country = 'US';
                                        // excelData[x].city=this.state.city
                                        // excelData[x].state=this.state.state
                                        // excelData[x].country=this.state.country
                                        // console.log("excelData[x]==",excelData[x])
                                       
                                        // var evt = new CustomEvent('zip', { detail: { zipcode: zipcode, flag: true, errMsg: 'We’re sorry. At this time, we are not offering the Universal HealthShare program in this zip code', parentDetails: parent } });
                                        // window.dispatchEvent(evt);
                                      return false
                                    }
                                });
                               
                        }
                    })
    }

    handleUploadFile = () => {
        this.setState({loaderShow:true,invalidMessage:false})

        let USER_DATA = JSON.parse(sessionStorage.getItem('USER_DATA'));
        let getData = this.state.recData;
        if (getData && getData.length > 0) {

            /* let prevRecVal = 0;

             for (let i = 0; i < getData.length; i++) {
                if (getData[i].record) {
                    prevRecVal = getData[i].record;
                } else {
                    getData[i].record = prevRecVal;
                }

                if(getData[i].relationship){
                    if(getData[i].relationship == "Child" || getData[i].relationship == "Spouse" || getData[i].relationship == "child" || getData[i].relationship == "spouse" || getData[i].relationship != "Employee"){
                    // if(getData[i].relationship != "Employee" || getData[i].relationship != "employee"){
                       
                    if (getData[i].email ){
                            getData[i].email=null
                        }else{
                            getData[i].email=null
                        }
                        
                    }
                }
            }  */
            
            this.state.finalArr = [];
            for (let i = 0; i < getData.length; i++) {
                if(getData[i].record && getData[i].relationship == "Employee"){
                    //let primaryRecNum = getData[i].record;
                    let dependentArry= [];
                    for (let j = i+1; j <= getData.length -1; j++) {
                        if(!getData[j].record){
                            getData[j].email= null;
                            getData[j].record = getData[i].record;
                            // dependentArry.push(getData[j]);
                            // console.log("dependant array---",dependentArry)
                            
                            if(getData[j].state == undefined || !getData[j].state){
                                this.state.validationArr.push({record:getData[j].record, relationship:getData[j].relationship, msg:'Please check zipcode'})    
                            console.log("Validation message---",this.state.validationArr)
                           
                            }else{
                                dependentArry.push(getData[j]);
                                console.log("dependant array---",dependentArry)
                            }
                            
                        }else{
                            break;
                        }
                    }
                     
                    getData[i].email= getData[i].email ? getData[i].email : null;
                    getData[i].dependentList = dependentArry;
                    if(getData[i].state !=undefined){
                        this.state.finalArr.push(getData[i]);
                    }else{
                this.state.validationArr.push({record:getData[i].record, relationship:getData[i].relationship, msg:'Please check zipcode'})    
                console.log("Validation message---",this.state.validationArr)
                
                    }
                   
                }
                
                
            }
            if(this.state.validationArr.length > 0){
                this.setState({
                    validationExcelModal:true,
                    excelValidation: true,
                    fileNameModal :false
                })
            }
            // let dataUploadObj
            // this.state.finalArr.map((val,id)=>{
              
            //   if(val.state != undefined && val.state !=''){
            //     console.log("final array maping----",val.state ,"&&", val.firstName )  
            //     if(val.dependentList.length > 0){
            //         console.log("final array depedants----",val.dependentList)
            //         val.dependentList.map((value,id)=>{
            //             if(value.state != undefined && value.state !=''){
            //             console.log("depedants----",value.state ,"&&", value.firstName )
            //             }  
            //         })
                    
            //     }
               
                 
            //   }else{
                 
            //   }
             
            // })



            let dataUploadObj = {
                "empid": this.state.empid,
                "clientId": USER_DATA.clientId,
                "brokerId": USER_DATA.agentId,
                "associationId": USER_DATA.associationId,
                "employeeDtoList": this.state.finalArr,
               
            }

            // console.log("=======dataUploadObj====");
            // console.log(dataUploadObj);
            console.log(this.state.finalArr);

            axios.post(configurations.baseUrl + '/enrollment/verifyUploadedData', dataUploadObj)
            .then(response => {
                if (response.data.code === 200) {
                    // if(response.data.response && (response.data.response.existingEmail && response.data.response.existingEmail.length > 0 || response.data.response.existingRecord && response.data.response.existingRecord.length > 0) ){
                    //         console.log("===== RESPONSE existingEmail ======", response.data.response);
                         
                    // }else{
                        axios.post(configurations.baseUrl + '/enrollment/uploadEmployee', dataUploadObj)
                           .then(response => {
                              if (response) {
                                  console.log("=====uploadEmployee RESPONSE======", response);
                                  this.setState({uploadExcelModal:false,
                                    uploadFileName:'',
                                    fileNameModal:false,
                                    validationExcelModal:true,
                                    successUpload:true,
                                    loaderShow:false},()=>this.getUserData(this.state.empid))
                              }
  
                  })
  
                 // }
                    

                }
                if(response.data.code === 202){
                    this.setState({
                        validationExcelModal:true,
                        successUpload:false,
                        inValidRecordData:response.data.response.existingRecord,
                        errMsg:"An employee with the same record number already exists",     //"Existing record number",
                        duplicateEmail:false,
                        loaderShow:false    
                    })
                }
                if(response.data.code === 204){
                    //Existing email and record number"
                    this.setState({
                        validationExcelModal:true,
                        successUpload:false,
                        inValidRecordData:response.data.response.existingRecord,
                        errMsg:"An employee with the same email address and record number already exists " ,//"Existing email and record number",
                        loaderShow:false
                    })


                }
                if(response.data.code === 206){
                    this.setState({validationExcelModal:true,
                        successUpload:false,
                        inValidRecordData:response.data.response.existingRecord,
                        duplicateEmail:true,
                        errMsg:"An employee with the same email address already exists " ,//"Existing email",
                        loaderShow:false
                    })

                }
                // uncomment before deploy 500 code
                // if(response.data.code === 500){
                //     this.setState({
                //         loaderShow: false,
                //         showCommonErrorModal: true,
                //     })

                // }


                // else {
                //     this.setState({
                //         loaderShow: false,
                //         msgModal: true,
                //         errMsg: "Internal server error",
                //         code: 500
                //     });
                // }
                
                

                


                /* if(response.data.response && response.data.response.length>0){
                    this.setState({validationExcelModal:true,successUpload:false,inValidData:response.data.response,loaderShow:false})
                }else{
                      axios.post(configurations.baseUrl + '/enrollment/uploadEmployee', dataObj)
                         .then(response => {
                            if (response) {
                                this.setState({uploadExcelModal:false,uploadFileName:'',fileNameModal:false,validationExcelModal:true,successUpload:true,loaderShow:false},()=>this.getUserData(this.state.empid))
                            }

                })

                } */


            })
            .catch(error => {
                console.log(error);
                console.log(error.response);
                // if (error.response.status === 500) {                    
                    this.setState({
                        loaderShow: false,
                        // showCommonErrorModal: true,
                    });
                // }
            });




        }

    }
    invalidOk=()=>{
        this.setState({loaderShow:true})
        let USER_DATA = JSON.parse(sessionStorage.getItem('USER_DATA'));

        let dataObj = {
            "empid": this.state.empid,
            "clientId": USER_DATA.clientId,
            "brokerId": USER_DATA.agentId,
            "associationId": USER_DATA.associationId,
            "employeeDtoList": this.state.finalArr,
        }

        axios.post(configurations.baseUrl + '/enrollment/uploadEmployee', dataObj)
                         .then(response => {
                            if (response) {
                                this.setState({
                                    //validationExcelModal: false,
                                    uploadExcelModal:false,
                                    uploadFileName:'',
                                    fileNameModal:false,
                                    successUpload:true
                                },()=>this.getUserData(this.state.empid))
                            }

                })
                .catch(error => {
                    console.log(error);
                    console.log(error.response);
                    // if (error.response.status === 500) {                    
                        this.setState({
                            loaderShow: false,
                            // showCommonErrorModal: true,
                        });
                    // }
                });

       
    }

    // ------------------ end  file upload -----------------------------

    getUserData = (empid) => {
       console.log("getUserData==",this.state.prospectObj)

        if (empid) {
            formData.set("columns[7].search.value", empid);
        } else {
            formData.set("columns[7].search.value", 'NULL');
        }
        formData.set("start", "0");
        formData.set("length", this.state.rowsPerPage.toString());
        formData.set("columns[4].search.value","");
        formData.set("columns[1].search.value", "");
        formData.set("columns[2].search.value", "");
        formData.set("columns[3].search.value", "");
        formData.set("columns[6].search.value", "");
        fetch(configurations.baseUrl + '/enrollment/getUserByAgent/' + this.props.agentId, requestOptions)
            .then(response => response.json())
            .then(data => {
                if (data.response && data.response.data) {
                    console.log("getUserData====",data.response.data)
                    this.setState({
                        data: data.response.data,
                        count: data.response.recordsFiltered,
                        createdDate: data.response.createdDate,
                        searchText:'',
                        statusValue:'',
                        targetDate:null,
                        loaderShow: false,
                        prospectObj:[]
                    },()=>this.downloadProspectData());
                   // ,()=>this.downloadProspectData()
                }

            })
            .catch(error => {
                console.log(error);
                console.log(error.response);
                // if (error.response.status === 500) {                    
                    this.setState({
                        loaderShow: false,
                        // showCommonErrorModal: true,
                    });
                // }
            });
    }




    getMuiThemeTran = () => createMuiTheme({
        overrides: {
            MUIDataTable: {
                root: {
                    backgroundColor: "#FF000"
                },
                paper: {
                    boxShadow: "none"
                }
            },

            MuiTableRow: {
                root: {
                    '&$selected': {
                        backgroundColor: '#ebf2ff'
                    }
                }
            },
        }
    })

    checkVal1(flag) {
        if (flag === 'ENCODING') {
            if (this.state.cid !== '' && this.state.bid !== '' && this.state.aid !== '' && this.state.baseUrl !== '') {
                this.setState({ genrate: false })
            } else {
                this.setState({ genrate: true })
            }
        } else if (flag === 'USER') {
            if (this.state.fname !== '' && this.state.lname !== '' && this.state.email !== '' && this.state.phone !== '' && this.state.phone.length == 10) {
                this.setState({ userValid: false })
            } else {
                this.setState({ userValid: true })
            }
        }

    }

    setUserValue = (value, isValid, parentDetails) => {
        if (parentDetails.name === 'email') {
            if (isValid) {
                this.state.email = value;
                this.checkVal();
            } else {
                this.state.email = "";
                this.checkVal();
            }
        }
        if (parentDetails.name === 'firstname') {
            if (isValid) {
                this.state.fname = value;
                this.checkVal();
            } else {
                this.state.fname = "";
                this.checkVal();
            }
        }
        if (parentDetails.name === 'lastname') {
            if (isValid) {
                this.state.lname = value;
                this.checkVal();
            } else {
                this.state.lname = "";
                this.checkVal();
            }
        }
        if (parentDetails.name === 'phone') {
            if (isValid) {
                this.state.phone = value;
                this.checkVal();
            } else {
                this.state.phone = "";
                this.checkVal();
            }
        }

    }

    checkVal() {
        // this.state.email !== '' && && this.state.phone !== ''
        if(sessionStorage.getItem('EMPLOYER_FLOW') === "YES"){
            if ( this.state.fname !== '' && this.state.lname !== '' ) {
                this.setState({ userValid: false })
            } else {
                this.setState({ userValid: true })
            }
        }else{
            if ( this.state.fname !== '' && this.state.lname !== '' && this.state.email !== ''&& this.state.phone !== '' ) {
                this.setState({ userValid: false })
            } else {
                this.setState({ userValid: true })
            }
        }
       
    }





    handleClose = () => {
        this.setState({ open: !this.state.open, anchorEl: null })
    };
    getUserStatus =(id,popupState)=>{
        this.setState({
            userTerminated :true,
            // loaderShow: true
        })
        axios.get(process.env.REACT_APP_BASE_URL + '/enrollment/getViewDetails/' + id)
            .then(response => {
                if (response.data.code === 200) {                   
                       
                        if (response.data.response.status === 'TE') {
                            
                            this.setState({
                                userTerminated :true,
                                loaderShow: false
                            })
                        } else {
                            this.setState({
                                userTerminated :false,
                                loaderShow: false
                            })
                        }
                    }else{
                        this.setState({
                            userTerminated :false,
                            loaderShow: false
                        })
                    }
                    
    })
}

    selectMenu = (index, dataIndex, popupState, e) => {
        this.setState({
            loaderShow: true
        });
      
        console.log("this.state.data===",this.state.data[dataIndex])
        let obj = {
            "clientId": this.props.clientName,
            "associationId": this.props.associationId,
            "brokerId": this.props.agentId,
            "isAgent": true,
            "user_subId": this.state.data[dataIndex].email,
            //"user_subId": null,
            "index": index,
            'empid': this.state.empid,
            "memberId": this.state.data[dataIndex].id,
            "subID":this.state.data[dataIndex].subId ,   //namita 26 april
            "reEnrolledByAgent" : false,
            
        };
       
        if (index === 3 && !this.state.data[dataIndex].enrollFlag) {  //Create Quick Quote
            let windowReference = window.open();
            axios.post(configurations.baseUrl + '/encrypt/encryptData', obj)
                .then(response => {
                    let url = configurations.enrollmentURL + '/quick_quote#state=' + response.data.response                    
                    /*window.open(url, '_blank');*/
                    windowReference.location = url;
                    this.setState({
                        loaderShow: false
                    });
                })
                .catch(error => {
                    console.log(error);
                    console.log(error.response);
                    // if (error.response.status === 500) {                    
                        this.setState({
                            loaderShow: false,
                            // showCommonErrorModal: true,
                        });
                    // }
                });
        } else if (index === 2 || (this.state.data[dataIndex].enrollFlag && index == 1) || (this.state.data[dataIndex].enrollFlag && index === 2)) {  //Edit Census
            // if (obj.user_subId == '' || obj.user_subId == null) {
            //     this.setState({
            //         loaderShow: false,
            //         missingModal: true,
            //         errMsg: "The email address and phone number of the employee must be entered before you can proceed with Enrollment."
            //     });

            // } 

            let windowReference = window.open();
            if(this.state.data[dataIndex].enrollFlag && index == 2){ // enrolled with change program
                obj.isSelectProgram = true;
                // obj.isEditCensus = false;   
                // obj.fromMember = false;
                obj.reEnrolledByAgent = true;            
            }
            else if(this.state.data[dataIndex].enrollFlag && index == 1){// enrolled with edit census
                // obj.isEditCensus = false;
                obj.isHouseholdUpdate = true;
                // obj.fromMember = false;
                obj.reEnrolledByAgent = true;
            }else{                              // only edit census without enrolled
                obj.isEditCensus = true;
                // obj.fromMember = false;
            }

                axios.post(configurations.baseUrl + '/encrypt/encryptData', obj)
                    .then(response => {
                        let url = configurations.enrollmentURL + '/login#state=' + response.data.response                       
                        /*window.open(url, '_blank');*/
                        windowReference.location = url;
                        this.setState({
                            loaderShow: false
                        });
                    })
                    .catch(error => {
                        console.log(error);
                        console.log(error.response);
                        // if (error.response.status === 500) {                    
                            this.setState({
                                loaderShow: false,
                                // showCommonErrorModal: true,
                            });
                        // }
                    });

        } else if (index === 4 ) {  //Start/Resume Enroll
            let windowReference = window.open();           
                axios.post(configurations.baseUrl + '/encrypt/encryptData', obj)
                    .then(response => {
                        let url = configurations.enrollmentURL + '/login#state=' + response.data.response                        

                        /*window.open(url, '_blank');*/
                        windowReference.location = url;
                        this.setState({
                            loaderShow: false
                        });
                    })
                    .catch(error => {
                        console.log(error);
                        console.log(error.response);
                        // if (error.response.status === 500) {                    
                            this.setState({
                                loaderShow: false,
                                // showCommonErrorModal: true,
                            });
                        // }
                    });

        } else if (index === 5) {  //Send Sign-Up Email
            if (obj.user_subId == '' || obj.user_subId == null ||
             this.state.data[dataIndex].phone == '' || 
             this.state.data[dataIndex].phone == null ||
             this.state.data[dataIndex].firstName  == '' || 
             this.state.data[dataIndex].firstName == null ||
             this.state.data[dataIndex].lastName  == '' || 
             this.state.data[dataIndex].lastName == null 

             ) {
                this.setState({
                    loaderShow: false,
                    missingModal: true,
                    errMsg: "The email address and phone number of the employee must be entered before you can proceed with Enrollment."
                });
            } else {
                if (true) {


                    axios.get(process.env.REACT_APP_enrollment_base_url + '/setupfamily/getMemberBySubID/'+this.state.data[dataIndex].subId)
                    .then(response => {
                        if(response.data.response){
                            let data = JSON.parse(JSON.stringify(response.data.response));
                            this.setState({
                                inviteStatus : data.inviteStatus!=null ? moment(data.inviteStatus).format("DD MMM YYYY hh:mm a") : null,
                            },()=>{
                                if(this.state.inviteStatus ==null){
                                    axios.get(process.env.REACT_APP_enrollment_base_url+'/enrollment/registration/' + this.state.data[dataIndex].email + '/' + this.state.data[dataIndex].phone + '/email')
                                    .then(response => {
                                        if (response && response.data.code === 200) {
                                            this.setState({
                                                loaderShow: false,
                                                msgModal: true,
                                                errMsg: "Authorization mail sent successfully!",
                                            });
                                        } else if (response.data.code === 202) {
                                            this.setState({
                                                loaderShow: false,
                                                msgModal: true,
                                                errMsg: 'The authorization email has been sent to ' +'"'+ this.state.data[dataIndex].email +'"'+'. As the prospect has signed up earlier, for security reasons, they would be required to reset their password.',
                                            });
                                        } else if (response.data.code === 204) {
                                            this.setState({
                                                loaderShow: false,
                                                msgModal: true,
                                                errMsg: "The authorization email was RESENT!",
                                            });
                                        } else if (response.data.code === 409) {
                                            this.setState({
                                                loaderShow: false,
                                                msgModal: true,
                                                errMsg: "User already exists in the given User Pool.",
                                            });
                                        }else if (response.data.code === 500) {
                                            this.setState({
                                                loaderShow: false,
                                                msgModal: true,
                                                errMsg: "Oops! Something's not right. If you're still having trouble, call us on (800) 921-4505",
                                            });
                                        }
                                    })
                                    .catch(error => {
                                        console.log(error);
                                        this.setState({
                                            loaderShow: false,
                                            msgModal: true,
                                            errMsg: "Oops! Something's not right. If you're still having trouble, call us on (800) 921-4505",
                                        });
                                    });
                                }else{
                                    this.setState({
                                        loaderShow: false,
                                        msgModal: true,
                                        emailID:this.state.data[dataIndex].email,
                                        phoneNumber:this.state.data[dataIndex].phone,
                                        errMsg:`Authorization link was already sent on ${this.state.inviteStatus}. If you
                                        proceed to resend link, the prospect will not be able to
                                        sign-up with any previously sent links. \n Are you sure you want to proceed?`
                                    })
                                }
                            })
                        }})





                    // axios.get(configurations.baseUrl + '/agentlogin/inviteEmail/' + this.state.data[dataIndex].email)
                    //     .then(response => {
                    //         this.getUserData(this.state.empid);
                    //         if (response.data.code === 204) {
                    //             this.setState({
                    //                 loaderShow: false,
                    //                 msgModal: true,
                    //                 errMsg: "Invite email sent successfully!",
                    //                 code: 204
                    //             });
                    //         } else if (response.data.code === 202) {
                    //             this.setState({
                    //                 loaderShow: false,
                    //                 msgModal: true,
                    //                 errMsg: "The prospect has already signed-up and created an account. They can login to the enrollment app using the link below. If they need to reset their password, ask them to go to the login page and click on the Forgot your password? ",
                    //                 code: 202
                    //             });
                    //         } 
                    //         // else if (response.data.code === 500) {
                    //         //     this.setState({
                    //         //         loaderShow: false,
                    //         //         showCommonErrorModal:true
                    //         //     });
                    //         // }
                    //         else {
                    //             this.setState({
                    //                 loaderShow: false,
                    //                 msgModal: true,
                    //                 errMsg: "Internal server error",
                    //                 code: 500
                    //             });
                    //         }
                    //     })
                    //     .catch(error => {
                    //         console.log(error);
                    //         console.log(error.response);
                    //         // if (error.response.status === 500) {                    
                    //             this.setState({
                    //                 loaderShow: false,
                    //                 // showCommonErrorModal: true,
                    //             });
                    //         // }
                    //     });
                }

            }

        } else if (index === 1) {  //Edit Prospect Details
            let phone = '';
            let countryCode = '';
            if (this.state.data[dataIndex].phone) {
                if (this.state.data[dataIndex].phone.length === 13) {
                    countryCode = this.state.data[dataIndex].phone.substr(0, 3);
                    phone = this.state.data[dataIndex].phone.substr(3);
                } else {
                    countryCode = this.state.data[dataIndex].phone.substr(0, 2);
                    phone = this.state.data[dataIndex].phone.substr(2);
                }


                this.setState({
                    editModal: true,
                    fname: this.state.data[dataIndex].firstName,
                    lname: this.state.data[dataIndex].lastName,
                    email: this.state.data[dataIndex].email,
                    tempEmail: this.state.data[dataIndex].email,
                    id: this.state.data[dataIndex].id,
                    phone: phone,
                    countryCode: countryCode
                });



            }else{
                //-- Safal Commented 17 Aug 2021
                // axios.get('https://ipapi.co/json/').then((response) => {
                //     if (response && response.data) {
                //         let data = response.data;
                //         countryCode = data.country_calling_code;

                //         this.setState({
                //             editModal: true,
                //             fname: this.state.data[dataIndex].firstName,
                //             lname: this.state.data[dataIndex].lastName,
                //             email: this.state.data[dataIndex].email,
                //             tempEmail: this.state.data[dataIndex].email,
                //             id: this.state.data[dataIndex].id,
                //             phone: phone,
                //             countryCode: countryCode
                //         });



                //     }
                // }).catch((error) => {
                //     console.log(error);
                // });

                this.setState({
                    editModal: true,
                    fname: this.state.data[dataIndex].firstName,
                    lname: this.state.data[dataIndex].lastName,
                    email: this.state.data[dataIndex].email,
                    tempEmail: this.state.data[dataIndex].email,
                    id: this.state.data[dataIndex].id,
                    phone: phone,
                    countryCode: "+1"
                });
            }


            /* this.setState({
                editModal: true,
                fname: this.state.data[dataIndex].firstName,
                lname: this.state.data[dataIndex].lastName,
                email: this.state.data[dataIndex].email,
                id: this.state.data[dataIndex].id,
                phone: phone,
                countryCode: countryCode
            }); */


        } else if (index === 6) {  //Delete
            this.setState({ loaderShow: true })
            this.setState({
                loaderShow: false,
                deleteModal: true,
                delEmail: this.state.data[dataIndex].email,
                delById: this.state.data[dataIndex].id,
                userName: this.state.data[dataIndex].firstName + ' ' + this.state.data[dataIndex].lastName
            })

        } else if (index === 7 || (index === 3 && this.state.data[dataIndex].enrollFlag)) {  //Re-assign
            this.setState({ 
                loaderShow: true,
                selectedMemberId: this.state.data[dataIndex].id,
                prospectFullName :  this.state.data[dataIndex].firstName +" "+ this.state.data[dataIndex].lastName, 
            })
            this.getAllAgents(this.state.data[dataIndex].id);
            

        }else if (index === 0 || this.state.data[dataIndex].enrollFlag) {   //View Details

            this.setState({ viewDetailsModal: true, loaderShow: true, activeTab: 0 })
            this.getUSerDetails(this.state.data[dataIndex].id, this.state.data[dataIndex].email, this.state.data[dataIndex].enrollFlag);

            /*axios.get('https://ipapi.co/json/').then((response) => {
            if (response && response.data) {
                let data = response.data;
                this.setState({
                    countryCode: data.country_calling_code
                });
            }
            axios.get(configurations.baseUrl + '/agentlogin/getUser/' + this.state.data[dataIndex].email)
                    .then(response => {
                        this.setState({
                            loaderShow : false,
                            fname:response.data.response.firstName,
                            lname:response.data.response.lastName,
                            email:response.data.response.email,
                            phone:response.data.response.phone,
                            clientId:response.data.response.clientId,
                            brokerId:response.data.response.brokerId,
                            associationId:response.data.response.associationId
                        })
                    })
                })*/



        }
    }
sendAuthEmail=()=>{
    this.setState({loaderShow:true, msgModal:false})
    axios.get(process.env.REACT_APP_enrollment_base_url+'/enrollment/registration/' + this.state.emailID + '/' + this.state.phoneNumber + '/email')
    .then(response => {
        if (response && response.data.code === 200) {
            this.setState({
                loaderShow: false,
                msgModal: true,
                emailID:"",
                errMsg: "Authorization mail sent successfully!",
            });
        } else if (response.data.code === 202) {
            this.setState({
                loaderShow: false,
                msgModal: true,
                emailID:"",
                errMsg: 'The authorization email has been sent to ' +'"'+  this.state.emailID +'"'+'. As the prospect has signed up earlier, for security reasons, they would be required to reset their password.',
            });
        } else if (response.data.code === 204) {
            this.setState({
                loaderShow: false,
                msgModal: true,
                emailID:"",
                errMsg: "The authorization email was RESENT!",
            });
        } else if (response.data.code === 409) {
            this.setState({
                loaderShow: false,
                msgModal: true,
                emailID:"",
                errMsg: "User already exists in the given User Pool.",
            });
        }else if (response.data.code === 500) {
            this.setState({
                loaderShow: false,
                msgModal: true,
                emailID:"",
                errMsg: "Oops! Something's not right. If you're still having trouble, call us on (800) 921-4505",
            });
        }
    })
    .catch(error => {
        console.log(error);
        this.setState({
            loaderShow: false,
            msgModal: true,
            emailID:"",
            errMsg: "Oops! Something's not right. If you're still having trouble, call us on (800) 921-4505",
        });
    });
}
    getDateInUTC = (date, getInMillisecs) => {
        if (date) {
            let newDateTime = date + new Date(date).getTimezoneOffset() * 60 * 1000;
            if (getInMillisecs) {
                return newDateTime
            }
            return new Date(newDateTime)
        }
        return date
    }

    getUSerDetails = (id, email, flag) => {
        console.log("getUSerDetails====",id,email,flag)
      
        
        axios.get(process.env.REACT_APP_BASE_URL + '/enrollment/getViewDetails/' + id)
            .then(response => {
                if (response.data.code === 200) {
                    let obj = [];
                    let findLeadData = this.state.data.find(obj => obj.id === id)
                        
                        const userInfo = findLeadData.leadQualificationData

                    if (flag && response.data.response.flag) {
                        let paidThroughDate = response.data.response.benefits[0].premiumPaidDate && this.getDateInUTC(response.data.response.benefits[0].premiumPaidDate, true);
                        let newDatePaidThroughDate = 'NA';
                        if (paidThroughDate) {
                            newDatePaidThroughDate = moment(paidThroughDate).format('MMMM DD, YYYY');
                        }

                        let _userStatus = ''
                        if (response.data.response.status === 'TE') {
                            _userStatus = 'TERMINATED';
                        } else {
                            _userStatus = response.data.response.status;
                        }
                        

                        obj = [
                            {
                                key: 'Member ID',
                                value: response.data.response.memberId !=null  ? response.data.response.memberId :'NA' ,
                                type: 'STR'
                            },
                            {
                                key: 'Name',
                                value: response.data.response.firstName + ' ' + response.data.response.lastName,
                                type: 'STR'
                            },
                            {
                                key: 'Email',
                                value: response.data.response.email,
                                type: 'STR'
                            },
                            {
                                key: 'Phone',
                                value: response.data.response.phoneNo,
                                type: 'STR'
                            }, {
                                key: 'Address',
                                value: response.data.response.addressLine1,
                                type: 'STR'
                            }, {
                                key: 'City',
                                value: response.data.response.city,
                                type: 'STR'
                            }, {
                            }, {
                                key: 'State',
                                value: response.data.response.state,
                                type: 'STR'
                            }, {
                                key: 'Plan Purchased',
                                value: response.data.response.planName,
                                type: 'STR'
                            }, {
                                key: 'Active Date',
                                value: moment(response.data.response.benefits[0].benefitBegin).format('MMMM DD, YYYY'),
                                type: 'STR'
                            }, {
                                key: 'Paid through date',
                                value: newDatePaidThroughDate,
                                type: 'STR'
                            }, {
                                key: 'Status',
                                value: _userStatus,
                                type: 'STR'
                            }/*,{
                            key : 'Cost Of Program',
                            value : response.data.response.cost_of_program,
                            type : 'STR'
                        }*/, {
                                key: 'Names of dependents and relationship',
                                value: response.data.response.dependents,
                                type: 'ARR'
                            },
                            {
                                key: 'Lead qualification data',
                                value:userInfo != null? userInfo:'NA',
                                type: 'STR'
                            }
                        ];
                        this.setState({
                            viewUserData: obj,
                            loaderShow: false,
                            detailsData: { memberIdSource: response.data.response.memberIdSource, id: id, email: email, disableFlag: false, enrollFlag: flag }
                        });
                    } else {
                        obj = [
                            {
                                key: 'Name',
                                value: response.data.response.firstName + ' ' + response.data.response.lastName,
                                type: 'STR'
                            },
                            {
                                key: 'Email',
                                value: response.data.response.email,
                                type: 'STR'
                            },
                            {
                                key: 'Phone',
                                value: response.data.response.phone,
                                type: 'STR'
                            },
                            {
                                key: 'Lead qualification data',
                                value:userInfo != null? userInfo:'NA',
                                type: 'STR'
                            }
                        ];
                        this.setState({
                            viewUserData: obj,
                            loaderShow: false,
                            detailsData: { memberIdSource: response.data.response.memberIdSource, id: id, email: email, disableFlag: true, enrollFlag: flag }
                        });
                    }
                }
                // else if(response.data.code === 500){
                //     this.setState({
                //         loaderShow: false,
                //         showCommonErrorModal: true,
                //     });
                // }
                
                else {
                    this.setState({
                        viewUserData: [],
                        loaderShow: false,
                        detailsData: { memberIdSource: null, id: id, email: email, disableFlag: true, enrollFlag: flag }
                    }, () => {
                        console.log('============ detailsData ========');
                        console.log(this.state.detailsData);
                    });
                }
            })
            .catch(error => {
                console.log(error);
                console.log(error.response);
                // if (error.response.status === 500) {
                    
                    this.setState({
                        loaderShow: false,
                        // showCommonErrorModal: true,
                    });
                // }
            });

    }

    getTransactionDetails = (memberIdSource) => {
        axios.get(process.env.REACT_APP_transaction_base_url + 'transaction/transactionHistory?searchKey=source&searchValue=' + memberIdSource + '&page=0&size=10')
            .then(response => {
                if (response.data.code === 200) {
                    this.setState({
                        transactionData: response.data.response,
                        loaderShow: false,
                        transCount: response.data.response.recordsFiltered
                    })
                }
                // if(response.data.code === 500){
                //     this.setState({
                //         loaderShow: false,
                //         showCommonErrorModal: true
                //     })
                // }
               
            })
            .catch(error => {
                console.log(error);
                console.log(error.response);
                // if (error.response.status === 500) {
                    
                    this.setState({
                        loaderShow: false,
                        // showCommonErrorModal: true,
                    });
                // }
            });
    }

    getLoginDetails = (memberIdSource) => {
        let obj = {
            "username": "maricopa",
            "password": "QPvcY0n#S1u"
        }

        axios.post(process.env.REACT_APP_csr_base_url + 'login', obj)
            .then(response => {
                let token = response.headers.authorization;
                axios.post(process.env.REACT_APP_csr_base_url + 'csrportal/loginhistory',
                    {
                        "memberIdSource": memberIdSource
                    },
                    {
                        headers: {
                            'Authorization': `${token}`
                        }
                    })
                    .then(response => {
                        if (response.status === 200) {
                            this.setState({
                                loginData: response.data.loginHistory ? response.data.loginHistory : [],
                                loaderShow: false,
                                loginCount: response.data.loginHistory ? response.data.loginHistory.length : 0
                            });
                        }
                        // if(response.status === 500){
                        //     this.setState({
                        //         loaderShow: false,
                        //         showCommonErrorModal: true,
                        //     });
                        // }
                    })
            })
            .catch(error => {
                console.log(error);
                console.log(error.response);
                // if (error.response.status === 500) {
                    
                    this.setState({
                        loaderShow: false,
                        // showCommonErrorModal: true,
                    });
                // }
            });
    }

    getReassignHistory = (memberIdSource) =>{
        axios.get(process.env.REACT_APP_BASE_URL + "/agentlogin/reassignListByMember/1/10/"+ memberIdSource)
                .then((response) => {
                    console.log("======== getReassignHistory ========");
                    console.log(response);
                    console.log(response.data.response.reasignData);
                    if(response && response.data.response.reasignData.length > 0){
                        this.setState({
                            reassignHistoryData: response.data.response.reasignData,
                            loaderShow: false,
                            reassignHistoryCount: response.data.response.reasignData ? response.data.response.reasignData.length : 0
                        })
                    }else {
                        this.setState({
                            reassignHistoryData: [],
                            loaderShow: false,
                            reassignHistoryCount: 0
                        })
                    }
                })
                .catch(error => {
                    console.log(error);
                    console.log(error.response);
                    // if (error.response.status === 500) {
                        
                        this.setState({
                            loaderShow: false,
                            // showCommonErrorModal: true,
                        });
                    // }
                });
    }


    addUserModal = () => {
        //-- Safal Commented 17 Aug 2021
        // axios.get('https://ipapi.co/json/').then((response) => {
        //     if (response && response.data) {
        //         let data = response.data;
        //         this.setState({
        //             countryCode: data.country_calling_code
        //         });
        //     }
        // }).catch((error) => {
        //     console.log(error);
        // });
        this.setState({
            addUsermodalShow: true,
            fname: '',
            lname: '',
            phone: '',
            email: '',
            refresh: false
        }, () => this.checkVal1('USER'));
    }

    setUserValue = (value, isValid, parentDetails) => {
        if (parentDetails.name === 'firstname') {
            if (isValid) {
                this.state.fname = value;
            } else {
                this.state.fname = '';
            }
        } else if (parentDetails.name === 'lastname') {
            if (isValid) {
                this.state.lname = value;
            } else {
                this.state.lname = '';
            }
        } else if (parentDetails.name === 'email') {
            if (isValid) {
                this.state.email = value;
            } else {
                this.state.email = "";
            }
        } else if (parentDetails.name === 'phone') {
            if (isValid) {
                this.state.phone = value;
            } else {
                this.state.phone = "";
            }
        }
        this.checkVal();
    }
    addUser = () => {
        this.setState({
            loaderShow: true,
            addUsermodalShow: false
        });
        let obj={}
        if(sessionStorage.getItem('EMPLOYER_FLOW') === "YES"){

            obj = {
                "firstName": this.state.fname,
                "lastName": this.state.lname,
                "phone":this.state.phone? this.state.countryCode + this.state.phone :null,
                "email": this.state.email?this.state.email:null,
                "clientId": this.props.clientId,
                "associationId": this.props.associationId,
                "brokerId": this.props.agentId,
                empid: this.state.empid
            };

            if(this.state.email !== ''){

                axios.get(configurations.baseUrl + "/agentlogin/validateEmail/" + this.state.email)
                .then((response) => {
                    console.log("validateemail===", response)
                    if (response.data.code == 200) {
                        this.addUserObj(obj);
                    } 
                    // else if(response.data.code == 500){
                    //     this.setState({
                    //         loaderShow: false,
                    //         showCommonErrorModal: true,
                    //     });
                    // }
                    else {
                        this.setState({
                            loaderShow: false,
                            msgModal: true,
                            errMsg: "Employee already registered with this Email ID!",
                            refresh: true
                        });
                    }
                })
                .catch(error => {
                    console.log(error);
                    console.log(error.response);
                    // if (error.response.status === 500) {
                        
                        this.setState({
                            loaderShow: false,
                            // showCommonErrorModal: true,
                        });
                    // }
                });
                
            }else{
                this.addUserObj(obj);
            }
            

        }else{ // For Household
            obj = {
                "firstName": this.state.fname,
                "lastName": this.state.lname,
                "phone":this.state.countryCode + this.state.phone ,
                "email": this.state.email,
                "clientId": this.props.clientId,
                "associationId": this.props.associationId,
                "brokerId": this.props.agentId,
                empid: this.state.empid
            };

            if(this.state.email !== ''){

                axios.get(configurations.baseUrl + "/agentlogin/validateEmail/" + this.state.email)
                .then((response) => {
                    console.log("validateemail===", response)
                    if (response.data.code == 200) {
                        this.addUserObj(obj);
                    }
                    // else if(response.data.code == 500){
                    //     this.setState({
                    //         loaderShow: false,
                    //         showCommonErrorModal: true,
                    //     });
                    // }                   
                    else {
                        this.setState({
                            loaderShow: false,
                            msgModal: true,
                            errMsg: "Prospect already registered!",
                            refresh: true
                        });
                    }
                })
                .catch(error => {
                    console.log(error);
                    console.log(error.response);
                    // if (error.response.status === 500) {
                        
                        this.setState({
                            loaderShow: false,
                            // showCommonErrorModal: true,
                        });
                    // }
                });
                
            }else{
                this.addUserObj(obj);
            }


        }
        
       
        
    }

    addUserObj = (obj) => {
        axios.post(configurations.baseUrl + '/agentlogin/addUser', JSON.parse(JSON.stringify(obj)))
            .then(response => {
                this.getUserData(this.state.empid);
                if (this.props.defaultEmpid !== this.state.empid) {
                    let evt = new CustomEvent('REFRESH', { detail: this.state.empid });
                    window.dispatchEvent(evt);
                }
                if (response.data.code === 200) {
                    this.setState({
                        loaderShow: false,
                        msgModal: true,
                        errMsg: sessionStorage.getItem('EMPLOYER_FLOW') === "YES"? "Employee added successfully!" :"Prospect added successfully!",
                        refresh: true
                    });
                } else if (response.data.code === 202) {
                    this.setState({
                        loaderShow: false,
                        msgModal: true,
                        errMsg: sessionStorage.getItem('EMPLOYER_FLOW') === "YES"? "Employee already registered with this Email ID!":"Prospect already registered!",
                        refresh: true
                    });
                } 
                // else if (response.data.code === 500) {
                //     this.setState({
                //         loaderShow: false,
                //         showCommonErrorModal: true,
                //     });
                // }
                else {
                    this.setState({
                        loaderShow: false,
                        msgModal: true,
                        errMsg: "Internal server error",
                        refresh: true
                    })
                }
            })
            .catch(error => {
                console.log(error);
                console.log(error.response);
                // if (error.response.status === 500) {
                    
                    this.setState({
                        loaderShow: false,
                        // showCommonErrorModal: true,
                    });
                // }
            });
    }

    // Download Prospect data------------------------
    downloadProspectData = () =>{
       console.log("downloadProspectData==",this.state.prospectObj)
        axios.get(configurations.baseUrl + '/enrollment/getMemberForDownload/' + this.props.agentId +'/' + this.state.empid )
            .then(data => {

                if (data.data && data.data.response) {
                    this.setState({
                        prospectObj: data.data.response,
                        // count: data.response.recordsFiltered,
                        // createdDate: data.response.createdDate,
                        loaderShow: false
                    },()=>{
                        for (var i = 0; i <= this.state.prospectObj.length; i++) {
                            if (this.state.prospectObj && this.state.prospectObj[i]) {
                                this.setState({ downloadDataFlag : true})
                                var result = this.state.prospectObj.map(function (el) {
                                    var o = Object.assign({}, el);
                                    
                                    o.prospectFname = '';
                                    o.prospectLname='';
                                    o.relationship = '';
                                    o.dob = '';
                                    o.birthGender = '';
                                    o.zipcode='';
                                    o.Age='';
                                    o.emailID='';
                                    o.recordNo='';
                                   
                                    return o;
                                })

                                this.state.prospectObj = result


                            }

                          
                            
                        }
                        
                        
                        this.state.prospectObj && this.state.prospectObj.map((val,index)=>{

                            if (this.state.prospectObj[index].record == '' ) {
                                this.state.prospectObj[index].recordNo =null;

                            } else {
                                this.state.prospectObj[index].recordNo = this.state.prospectObj[index].record ;

                            }

                            if (this.state.prospectObj[index].relationCode == 'SELF' ) {
                                this.state.prospectObj[index].relationship = 'Employee';

                            } else {
                                this.state.prospectObj[index].relationship = null;

                            }

                            if (this.state.prospectObj[index].firstName == '') {
                                this.state.prospectObj[index].prospectFname = 'NA';

                            } else {
                                this.state.prospectObj[index].prospectFname = this.state.prospectObj[index].firstName;

                            }

                            if (this.state.prospectObj[index].lastName == '') {
                                this.state.prospectObj[index].prospectFname = 'NA';

                            } else {
                                this.state.prospectObj[index].prospectLname = this.state.prospectObj[index].lastName;

                            }

                            if (this.state.prospectObj[index].birthDate == '' || this.state.prospectObj[index].birthDate == null) {
                                this.state.prospectObj[index].dob = 'NA';

                            } else {
                                this.state.prospectObj[index].dob = this.state.prospectObj[index].birthDate;

                            }
                            if (this.state.prospectObj[index].age == '' || this.state.prospectObj[index].age == null) {
                                this.state.prospectObj[index].Age = 'NA';

                            } else {
                                this.state.prospectObj[index].Age = this.state.prospectObj[index].age;

                            }
                            if (this.state.prospectObj[index].genderCode == 'MALE') {
                                this.state.prospectObj[index].birthGender = 'M';

                            } else if (this.state.prospectObj[index].genderCode == 'FEMALE'){
                                this.state.prospectObj[index].birthGender = 'F';

                            }else{
                                this.state.prospectObj[index].birthGender = 'NA';
                            }
                            if (this.state.prospectObj[index].postalCode == '' || this.state.prospectObj[index].postalCode == null) {
                                this.state.prospectObj[index].zipcode = 'NA';

                            } else {
                                this.state.prospectObj[index].zipcode = this.state.prospectObj[index].postalCode;

                            }
                            if (this.state.prospectObj[index].email == '') {
                                this.state.prospectObj[index].emailID = 'NA';

                            } else {
                                this.state.prospectObj[index].emailID = this.state.prospectObj[index].email;

                            }

                             this.state.downloadFinalArr.push(this.state.prospectObj[index])

                            // *****************************************************
                            //  Dependent data start here **************************

                            if(this.state.prospectObj[index].dependentDtoList && this.state.prospectObj[index].dependentDtoList.length > 0){

                              
                                let dependentArray=this.state.prospectObj[index].dependentDtoList;


                               dependentArray.map((val,index)=>{

                                    

                                val.recordNo = null ;


                                if(val.relationshipCode == 'SPOUSE'){
                                    dependentArray[index].relationship = 'Spouse';
                                    
                                        dependentArray[index].zipcode = this.state.prospectObj[index].postalCode;
        
                                    
    
                                }
                                 if(val.relationshipCode == 'CHILD'){
                                    dependentArray[index].relationship = 'Child';
                                  
                                        dependentArray[index].zipcode = index > 0 ? this.state.prospectObj[index-1].postalCode : this.state.prospectObj[index].postalCode;
        
                                    
                                }
                                
                                
                                if (val.firstName == '') {
                                    dependentArray[index].prospectFname = 'NA';
    
                                } else {
                                    dependentArray[index].prospectFname = dependentArray[index].firstName;
    
                                }
    
                                if (val.lastName == '') {
                                    dependentArray[index].prospectFname = 'NA';
    
                                } else {
                                    dependentArray[index].prospectLname = dependentArray[index].lastName;
    
                                }
    
                                if (val.birthDate == '' || val.birthDate == null) {
                                    dependentArray[index].dob = 'NA';
    
                                } else {
                                    dependentArray[index].dob = dependentArray[index].birthDate;
    
                                }
                                if (val.age == '' || val.age == null) {
                                    dependentArray[index].Age= 'NA';
    
                                } else if (val.age == 0 ) {
                                    dependentArray[index].Age = '0';
    
                                }else {
                                    dependentArray[index].Age = dependentArray[index].age;
    
                                }
                                if (val.gender == 'MALE') {
                                    dependentArray[index].birthGender = 'M';
    
                                } else if (val.gender == 'FEMALE'){
                                    dependentArray[index].birthGender = 'F';
    
                                }else{
                                    dependentArray[index].birthGender = '';
                                }

                                this.state.downloadFinalArr.push(dependentArray[index])

                                })
                                

                            }

                           })

                      
                    })
                 //*************************************************************************** */ 
                // ********************** Download template code start here************************


                    let tempData=this.state.downloadFinalArr

                    
                    for(var i=0; i<tempData.length; i++){
                        let tempObj ={
                            "Record #":tempData[i].recordNo == null || tempData[i].recordNo == '' ?  null :tempData[i].recordNo,
                            "Relationship":tempData[i].relationship !=null || tempData[i].relationship !='' ? tempData[i].relationship : "NA",
                            "First Name":tempData[i].prospectFname !=null || tempData[i].prospectFname != ''? tempData[i].prospectFname :'NA',
                            "Last Name":tempData[i].prospectLname,
                            "Date of Birth":tempData[i].dob,
                            "Age":tempData[i].Age,
                            "Birth Gender":tempData[i].birthGender,
                            "Zip":tempData[i].zipcode,
                            "Email Address":tempData[i].emailID
                        }
                        this.state.exportToExcelArr.push(tempObj)
                    }

                }

            })
            .catch(error => {
                console.log(error);
                console.log(error.response);
                // if (error.response.status === 500) {
                    
                    this.setState({
                        loaderShow: false,
                        // showCommonErrorModal: true,
                    });
                // }
            });
    }

 
 downloadProspectCensus = () =>{
    
        // array of objects to save in Excel
        let binary_univers = this.state.exportToExcelArr
       

        let binaryWS = XLSX.utils.json_to_sheet(binary_univers); 

        // Create a new Workbook
        var wb = XLSX.utils.book_new() 

        // Name your sheet
        XLSX.utils.book_append_sheet(wb, binaryWS, 'Sheet1') 

        // export your excel
        XLSX.writeFile(wb, this.props.employerName +' '+ moment().format("MMM DD, YYYY")+'.csv');

 }

  
    // Download Employee data------------------------
    downloadEmployeeData = () =>{
        
    }

    // Upload excel -------------------------------

    uploadData = () => {
        this.setState({ uploadExcelModal: true })
        this.state.finalArr = [];
        console.log("download array---",this.state.downloadFinalArr)
    }



    // ----------------update User-----------------------
    updateUser = () => {
        let obj = {};

        //console.log("=====id===", this.state.id);

        if(sessionStorage.getItem('EMPLOYER_FLOW') === "YES"){
            obj = {
                "firstName": this.state.fname,
                "lastName": this.state.lname,
                "phone":this.state.phone? this.state.countryCode + this.state.phone :null,
                "email": this.state.email?this.state.email:null,
                "clientId": this.props.clientId,
                "associationId": this.props.associationId,
                "brokerId": this.props.agentId,
                "id": this.state.id
            };
            if(this.state.email == null || this.state.email == ''){
                this.updateUserObj(obj);
            }else{
                if(this.state.tempEmail == this.state.email){
                    this.updateUserObj(obj);
                }else{
                    axios.get(configurations.baseUrl + "/agentlogin/validateEmail/" + this.state.email)
                    .then((response) => {
                        console.log("validateemail===", response)
                        if (response.data.code == 200) {
                            this.updateUserObj(obj);
                        }else {
                            this.setState({
                                loaderShow: false,
                                msgModal: true,
                                errMsg: "Employee already registered with this Email ID!",
                                refresh: true
                            });
                        }
                    })
                    .catch(error => {
                        console.log(error);
                        console.log(error.response);
                        // if (error.response.status === 500) {
                            
                            this.setState({
                                loaderShow: false,
                                // showCommonErrorModal: true,
                            });
                        // }
                    });
                    
                }
            }
           

        }else{ // Update Household
            obj = {
                "firstName": this.state.fname,
                "lastName": this.state.lname,
                "phone": this.state.countryCode + this.state.phone,
                "email": this.state.email,
                "clientId": this.props.clientId,
                "associationId": this.props.associationId,
                "brokerId": this.props.agentId,
                "id": this.state.id
            };


            if(this.state.tempEmail == this.state.email){
                this.updateUserObj(obj);
            }else{
                axios.get(configurations.baseUrl + "/agentlogin/validateEmail/" + this.state.email)
                .then((response) => {
                    console.log("validateemail===", response)
                    if (response.data.code == 200) {
                        this.updateUserObj(obj);
                    }
                    // else if(response.data.code == 500){
                    //     this.setState({
                    //         loaderShow: false,
                    //         showCommonErrorModal: true,
                    //     });
                    // }
                    
                    else {
                        this.setState({
                            loaderShow: false,
                            msgModal: true,
                            errMsg: "Prospect already registered!",
                            refresh: true
                        });
                    }
                })
                .catch(error => {
                    console.log(error);
                    console.log(error.response);
                    // if (error.response.status === 500) {
                        
                        this.setState({
                            loaderShow: false,
                            // showCommonErrorModal: true,
                        });
                    // }
                });
                
            }

        }

        

    }

    updateUserObj = (obj) => {
        axios.post(configurations.baseUrl + '/agentlogin/updateUser', JSON.parse(JSON.stringify(obj)))
            .then(response => {
                if (response.data.code === 200) {
                    this.getUserData(this.state.empid)
                    this.setState({
                        loaderShow: false,
                        editModal: false,
                        msgModal: true,
                        errMsg: sessionStorage.getItem('EMPLOYER_FLOW') === "YES" ? "Employee Updated Successfully!" : "Prospect Updated Successfully!"
                    });
                } else if (response.data.code === 206) {
                    this.setState({
                        loaderShow: false,
                        editModal: false,
                        msgModal: true,
                        errMsg: response.data.message
                    });
                }else if (response.data.code === 500) {
                    this.setState({
                        loaderShow: false,
                        // editModal: false,
                        // msgModal: true,
                        // errMsg: "INTERNAL_SERVER_ERROR"                       
                           
                        // showCommonErrorModal: true,
                        
                    });
                }

            })
            .catch(error => {
                console.log(error);
                console.log(error.response);
                // if (error.response.status === 500) {
                    
                    this.setState({
                        loaderShow: false,
                        // showCommonErrorModal: true,
                    });
                // }
            });
    }

    // ---------------Search Menu click-------------------

    handleChageSearchType(event) {
        let value = event.target.value;
        console.log('== handleChageSearchType ===============');
        console.log(value);
        if (value === '' || value === null) {
            this.setState({ searchShow: true, searchText: '', page: 0 }, () => {
                this.searchRecord();
            });
        } else {
            if (this.state.searchTypeValue === '0') {
                formData.set("columns[1].search.value", "");
            } else if (this.state.searchTypeValue === '1') {
                formData.set("columns[4].search.value", "");
            } else if (this.state.searchTypeValue === '2') {
                formData.set("columns[2].search.value", "");
            } else if (this.state.searchTypeValue === '3') {
                formData.set("columns[3].search.value", "");
                formData.set("columns[6].search.value", "");
            }
            this.setState({ searchTypeValue: value, searchShow: false, searchText: '', rowsPerPage: 10, page: 0 }, () => {
                this.searchRecord();
            });
        }

    }


    setSearch(event) {
        let value = event.target.value;
        this.setState({
            searchText: value
        }, () => {
            if (this.state.searchText === "" || this.state.searchText === null) {
                this.searchRecord();
            }
        });
    }


    statusChange = (event) => {
        this.setState({ statusValue: event.target.value, searchText: event.target.value })
    }


    changePage = (page, rows) => {
        this.setState({
            loaderShow: true
        });
        if (page !== undefined && rows) {
            let nextPage = (page * rows)
            formData.set("start", nextPage.toString());
            formData.set("length", rows.toString());

            fetch(configurations.baseUrl + '/enrollment/getUserByAgent/' + this.props.agentId, requestOptions)
                .then(response => response.json())
                .then(data => {
                    if (data.response && data.response.data) {
                        this.setState({ data: data.response.data, rowsPerPage: rows, loaderShow: false, page: page })
                    } else {
                        this.setState({ loaderShow: false })
                    }
                })
                .catch(error => {
                    console.log(error);
                    console.log(error.response);
                    // if (error.response.status === 500) {
                        
                        this.setState({
                            loaderShow: false,
                            // showCommonErrorModal: true,
                        });
                    // }
                });
        }
    }
    /* ========================== server side sorting logic================= */

    sort = (changedColumn, order) => {
        console.log(changedColumn,order)
        formData.set("start", "0");
        formData.set("order[0].column", changedColumn);
        formData.set("order[0].dir", order);
        fetch(configurations.baseUrl + '/enrollment/getUserByAgent/' + this.props.agentId, requestOptions)
            .then(response => response.json())
            .then(data => {
                if (data.response && data.response.data) {
                    this.setState({ data: data.response.data, count: data.response.recordsFiltered, loaderShow: false })
                } else {
                    this.setState({ loaderShow: false })
                }
            })
            .catch(error => {
                console.log(error);
                console.log(error.response);
                // if (error.response.status === 500) {
                    
                    this.setState({
                        loaderShow: false,
                        // showCommonErrorModal: true,
                    });
                // }
            });
    }

    /* ========================== server side sorting logic================= */

    /* ========================== server side search logic================= */
    searchRecord = () => {
        this.setState({
            loaderShow: true
        });

        console.log('============ searchRecord ===============');
        console.log(this.state.searchTypeValue);

        if (this.state.searchTypeValue === '0') { //Date search
            // this.state.statusValue=''
            formData.set("start", "0");
            formData.set("columns[1].search.value", this.state.searchText);

            fetch(configurations.baseUrl + '/enrollment/getUserByAgent/' + this.props.agentId, requestOptions)
                .then(response => response.json())
                .then(data => {
                    if (data.response && data.response.data) {
                        this.setState({ data: data.response.data, count: data.response.recordsFiltered, statusValue: '', loaderShow: false })
                    } else {
                        this.setState({ loaderShow: false });
                    }

                })
                .catch(error => {
                    console.log(error);
                    console.log(error.response);
                    // if (error.response.status === 500) {
                        
                        this.setState({
                            loaderShow: false,
                            // showCommonErrorModal: true,
                        });
                    // }
                });
        } else if (this.state.searchTypeValue === '1') { //Prospect name search
            // this.state.targetDate=null
            // this.state.statusValue=''
            formData.set("start", "0");
            formData.set("length", this.state.rowsPerPage.toString());
            formData.set("columns[4].search.value", this.state.searchText);

            fetch(configurations.baseUrl + '/enrollment/getUserByAgent/' + this.props.agentId, requestOptions)
                .then(response => response.json())
                .then(data => {
                    if (data.response && data.response.data) {
                        this.setState({ data: data.response.data, count: data.response.recordsFiltered, targetDate: null, statusValue: '', loaderShow: false })
                    } else {
                        this.setState({ loaderShow: false });
                    }

                })
                .catch(error => {
                    console.log(error);
                    console.log(error.response);
                    // if (error.response.status === 500) {
                        
                        this.setState({
                            loaderShow: false,
                            // showCommonErrorModal: true,
                        });
                    // }
                });
        } else if (this.state.searchTypeValue === '2') {
            // this.state.targetDate=null
            // this.state.statusValue=''
            formData.set("start", "0");
            formData.set("columns[2].search.value", this.state.searchText);

            fetch(configurations.baseUrl + '/enrollment/getUserByAgent/' + this.props.agentId, requestOptions)
                .then(response => response.json())
                .then(data => {
                    if (data.response && data.response.data) {
                        this.setState({ data: data.response.data, count: data.response.recordsFiltered, targetDate: null, statusValue: '', loaderShow: false })
                    } else {
                        this.setState({ loaderShow: false });
                    }

                })
                .catch(error => {
                    console.log(error);
                    console.log(error.response);
                    // if (error.response.status === 500) {
                        
                        this.setState({
                            loaderShow: false,
                            // showCommonErrorModal: true,
                        });
                    // }
                });
        } else if (this.state.searchTypeValue === '3') {
            // this.state.targetDate=null
            // this.state.statusValue=''
            formData.set("start", "0");
            formData.set("columns[3].search.value", "");
            if (this.state.searchText === 'all') {
                formData.set("columns[3].search.value", "");
                formData.set("columns[6].search.value", "");
            } else if (this.state.statusValue === 'true' || this.state.statusValue === true) {
                formData.set("columns[3].search.value", this.state.searchText);
                formData.set("columns[6].search.value", "");
            } else if (this.state.searchText === "8" || this.state.searchText === "9"){
                    formData.set("columns[6].search.value", this.state.searchText);
                    formData.set("columns[3].search.value", false);
                } else if(this.state.searchText === "0" || this.state.searchText === "1"|| this.state.searchText === "2"|| this.state.searchText === "3"
                || this.state.searchText === "4" || this.state.searchText === "5"|| this.state.searchText === "6"
                || this.state.searchText === "7"                
                ) {
                    formData.set("columns[3].search.value", false);
                    formData.set("columns[6].search.value", this.state.searchText);
                }
            
            fetch(configurations.baseUrl + '/enrollment/getUserByAgent/' + this.props.agentId, requestOptions)
                .then(response => response.json())
                .then(data => {
                    if (data.response && data.response.data) {
                        this.setState({ data: data.response.data, count: data.response.recordsFiltered, targetDate: null, loaderShow: false })
                    } else {
                        this.setState({ loaderShow: false });
                    }

                });
        }

    }
    /* ========================== server side search logic================= */


    // ==========Date Change=================

    handleDate(event) {
        this.setState({
            targetDate: moment(event).format('YYYY') + '-' + moment(event).format('MM') + '-' + moment(event).format('DD'),
            searchText: moment(event).format('YYYY') + '-' + moment(event).format('MM') + '-' + moment(event).format('DD'),
        });
    }

    // =========================================

    menuDetails = [
        "View Details",
        sessionStorage.getItem('EMPLOYER_FLOW') === "YES" ? "Edit Employee" : "Edit Prospect"
    ]
    menuOptions = [
        "View Details",
        "Edit Prospect Details",
        "Edit Census",
        "Create Quick Quote",
        "Start/Resume Enroll",
        "Send Auth Email",        
        "Delete",     
        "Re-assign Agent",   
        /*"Change Email"*/
    ];
    /* menuOptions = [
        "Create Quick Quote",
        "Edit Census",
        "Start/Resume Enroll",
        "Send Sign-up Email",
        "Edit Prospect Details",
        "Delete",
        "View Details",
        "Change Email"
    ]; */
   
    menuOptions1 = [
        "View Details",
        "Change Dependents",
        "Change Add-Ons",
        "Re-assign Agent",  
        /*"Change Email"*/
    ];


    columns = [
        // { label: "User Id", name: "id" },
        {
            label: "Record ", name: "record",
            options: {
                sort: true,
                display: sessionStorage.getItem('EMPLOYER_FLOW') === "YES" ? true : false,
            }
        },
        {
            label: "Date Added", name: "createdDate", options: {
                sort: true,
                customBodyRenderLite: (index) => {
                    // this.state.dateAdded= (this.state.data[index].createdDate).format('yy-mm-dd');
                    if (this.state.data && this.state.data[index] && this.state.data[index].createdDate) {
                        return moment(this.state.data[index].createdDate).format('MMMM DD, YYYY');
                    } else {
                        return "";
                    }
                }
            }
        },
        {
            label: sessionStorage.getItem('EMPLOYER_FLOW') === "YES" ? "Employee Name" : "Prospect Name", name: "firstName", options: {
                sort: true,
                customBodyRenderLite: (index) => {
                    if (this.state.data && this.state.data[index] && this.state.data[index].firstName && this.state.data[index].lastName) {
                        return this.state.data[index].firstName + ' ' + this.state.data[index].lastName;
                    } else {
                        return 'NA';
                    }
                }
            }
        },
        {
            label: "Email ", name: "email", options: {
                sort: true,
            }
        },
        // {
        //     label: "Dependants ", name: "Dependant_data", options: {
        //         sort: false,
        //     }
        // },
        {
            label: "Application Status", name: "status", options: {
                sort: false,
                customBodyRenderLite: (dataIndex) => {
                    if (this.state.data && this.state.data[dataIndex]) {
                        if (this.state.data && this.state.data[dataIndex] && this.state.data[dataIndex].enrollFlag === true) {
                            // return <div style={customStyle.statusBg1}><span style={customStyle.statusCaption1}>ENROLLED</span></div>
                            return <div style={customStyle.statusBg1}><span style={customStyle.statusCaption1}>App Success</span></div>

                        } else if (this.state.data && this.state.data[dataIndex] && this.state.data[dataIndex].completionStatus === 0) {
                            return <div style={customStyle.statusBg}><span style={customStyle.statusCaption}>Instructions</span></div>
                        } else if (this.state.data && this.state.data[dataIndex] && this.state.data[dataIndex].completionStatus === 1) {
                            return <div style={customStyle.statusBgTwoLine}><span style={customStyle.statusCaption}>Setup Family</span></div>
                        } else if (this.state.data && this.state.data[dataIndex] && this.state.data[dataIndex].completionStatus === 2) {
                            return <div style={customStyle.statusBg}><span style={customStyle.statusCaption}>View Quote</span></div>
                        } else if (this.state.data && this.state.data[dataIndex] && this.state.data[dataIndex].completionStatus === 3) {
                            return <div style={customStyle.statusBgTwoLine}><span style={customStyle.statusCaption}>Check Eligibility</span></div>
                        } else if (this.state.data && this.state.data[dataIndex] && this.state.data[dataIndex].completionStatus === 4) {
                            return <div style={customStyle.statusBgTwoLine}><span style={customStyle.statusCaption}>Select Program</span></div>
                        }else if (this.state.data && this.state.data[dataIndex] && this.state.data[dataIndex].completionStatus === 5 && this.state.checkADDons) {
                            return <div style={customStyle.statusBgTwoLine}><span style={customStyle.statusCaption}>Select Add-Ons</span></div>
                        }else if (this.state.data && this.state.data[dataIndex] && this.state.data[dataIndex].completionStatus === 5 && !this.state.checkADDons) {
                            return <div style={customStyle.statusBgTwoLine}><span style={customStyle.statusCaption}>Review Choices</span></div>
                        }else if (this.state.data && this.state.data[dataIndex] && this.state.data[dataIndex].completionStatus === 6 && this.state.checkADDons) {
                            return <div style={customStyle.statusBgTwoLine}><span style={customStyle.statusCaption}>Review Choices</span></div>
                        }else if (this.state.data && this.state.data[dataIndex] && this.state.data[dataIndex].completionStatus === 6 && !this.state.checkADDons) {
                            return <div style={customStyle.statusBgTwoLine}><span style={customStyle.statusCaption}>Setup Payment</span></div>
                        }else if (this.state.data && this.state.data[dataIndex] && this.state.data[dataIndex].completionStatus === 7 && this.state.checkADDons) {
                            return <div style={customStyle.statusBgTwoLine}><span style={customStyle.statusCaption}>Setup Payment</span></div>
                        }else if (this.state.data && this.state.data[dataIndex] && this.state.data[dataIndex].completionStatus === 7 || this.state.data[dataIndex].completionStatus === 8 && !this.state.checkADDons) {
                            return <div style={customStyle.statusBgTwoLine}><span style={customStyle.statusCaption}>Submit Application</span></div>
                        }else if (this.state.data && this.state.data[dataIndex] && this.state.data[dataIndex].completionStatus === 8 || this.state.data[dataIndex].completionStatus === 9 && this.state.checkADDons) {
                            return <div style={customStyle.statusBgTwoLine}><span style={customStyle.statusCaption}>Submit Application</span></div>
                        }
                    } else {
                        return "";
                    }
                },
            }
        },
        {
             name: "inviteStatus", options: {
                sort: false,
                customBodyRenderLite: (index) => {
                    if (this.state.data && this.state.data[index] && this.state.data[index].inviteStatus) {
                        return   moment(this.state.data[index].inviteStatus).format("MMM DD, YYYY hh:mm A");
                    } else {
                        return 'NA';
                    }
                },
                customHeadRender: ({index, ...column}) => {
                    return (
                        // <span style={{color:'rgba(0, 0, 0, 0.87)'}}>
                        // Last Authorization Sent
                        // <IconButton key={index}>
                        // <InfoIcon/>
                        // </IconButton>
                        // </span>
                        <TableCell key={index} style={{width:'220px',fontWeight:'bold'}}>
                            Last Authorization Sent 
                            <IconButton style={{height:'1px',width:'1px'}}>
                            <HtmlTooltip
                             title="This is the most recent authorization sent by agent or regenerated by prospect. It can be email or text."
                             placement="right"
                            
                         >
                                <InfoIcon/>
                                </HtmlTooltip>   
                            </IconButton>
                        </TableCell>
                    )
                }
            }
        },
        {
            name: "Action", options: {
                filter: false,
                sort: false,
                empty: true,
                customBodyRenderLite: (dataIndex) => {                   
                    return (
                        <span >
                            <PopupState variant="popover" popupId="demo-popup-menu" >
                                {(popupState) => (
                                    <React.Fragment>
                                        <IconButton {...bindTrigger(popupState)} >
                                            <MoreVertIcon onClick={()=>this.getUserStatus(this.state.data[dataIndex].id,popupState)}/>
                                        </IconButton>
                                        <Menu {...bindMenu(popupState)} 
                                        
                                        onClick={popupState.close}
                                            getContentAnchorEl={null}
                                            anchorOrigin={{
                                                vertical: 'top',
                                                horizontal: 'center'
                                            }}
                                            transformOrigin={{
                                                vertical: -10,
                                                horizontal: 30
                                            }}
                                        >
                                            {
                                            
                                                this.state.data && this.state.data[dataIndex] && 
                                                <div className="actionDropMenu">
                                                    {this.state.data && this.state.data[dataIndex] && this.state.data[dataIndex].enrollFlag   ? 
                                                    
                                                    this.menuOptions1.map((option, index) => {
                                                        return <MenuItem key={index} disabled={(this.props.clientId == '6548' || this.props.clientId == 6548 )||(this.props.clientId == '4367'|| this.props.clientId == 4367) ||(this.props.clientId == '5540'|| this.props.clientId == 5540) ||(this.props.clientId == '4376'|| this.props.clientId == 4376) ||(this.props.clientId == '5541'|| this.props.clientId == 5541) ||(this.props.clientId == '4377'|| this.props.clientId == 4377) ||(this.props.clientId == '5558'|| this.props.clientId == 5558) ||(this.props.clientId == '4386'|| this.props.clientId == 4386) ? index===2 : this.state.userTerminated == true ? index !==0 : null} hidden={sessionStorage.getItem('EMPLOYER_FLOW') === "YES" ? index == 3 : ''} onClick={() => this.selectMenu(index, dataIndex)} >{option}</MenuItem>
                                                    }) 
                                                   
                                                    :
                                                    this.menuOptions.map((option, index) => {
                                                        return <MenuItem key={index} value='view' hidden={sessionStorage.getItem('EMPLOYER_FLOW') === "YES" ? index == 7 :  ''} onClick={(e) => this.selectMenu(index, dataIndex)}  >{option}</MenuItem>
                                                    })
                                                    }
                                                </div>
                                            }
                                        </Menu>
                                    </React.Fragment>
                                )}
                            </PopupState>

                        </span>
                    );
                }
            }
        }
    ];

    transactionColumn = [
        {
            label: "Date", name: "createdDate", options: {
                customBodyRenderLite: (dataIndex) => {
                    if (this.state.transactionData.length > 0 && this.state.transactionData[dataIndex].createdDate) {
                        return (moment(this.state.transactionData[dataIndex].createdDate).format('MMMM DD, YYYY'));
                    } else {
                        return ('-');
                    }
                }
            }
        },
        { label: "Transaction ID", name: "transactionId" },
        { label: "Type", name: "indicatorFlag" },
        { label: "Payment Type", name: "type" },
        {
            label: "Amount", name: "transactionAmount", options: {
                customBodyRenderLite: (dataIndex) => {
                    if (this.state.transactionData.length > 0 && this.state.transactionData[dataIndex].transactionAmount) {
                        return ('$ ' + this.state.transactionData[dataIndex].transactionAmount);
                    } else {
                        return ('-');
                    }
                }
            }
        },
        { label: "Authorization", name: "authorizationMessage" },
        { label: "Payment Number", name: "paymentNumber" },
        { label: "Description", name: "reason" },
    ]

    loginColumn = [
        { label: "Email", name: "email" },
        { label: "Last Logged In", name: "lastLoggedin" },
        { label: "IP Origin", name: "ipOrigin" },
    ]

    reAssignHistoryColumn = [
        {
            label: "Date Assigned", name: "createdDate", options: {
                customBodyRenderLite: (dataIndex) => {
                    if (this.state.reassignHistoryData.length > 0 && this.state.reassignHistoryData[dataIndex].createdDate) {
                        return (moment(this.state.reassignHistoryData[dataIndex].createdDate).format('LL'));
                    } else {
                        return ('-');
                    }
                },
              

            }
        },
       
        { label: "Agent", name: "newBrokerId" },
        { label: "Agent Id", name: "newBrokerId" },
        { label: "", name: "" },
        { label: "", name: "" },
        
      
    ]



    handleOk = () => {
        axios.get(configurations.baseUrl + '/agentlogin/deleteUser/' + this.state.delById)
            .then(response => {
                if (response.status === 200) {
                    this.setState({
                        deleteModal: false,
                        msgModal: true,
                        errMsg: 'Delete Successfully !',
                        loaderShow: false,
                        userName: ""
                    }, () => this.getUserData(this.state.empid))
                }
                // if(response.status === 500){
                //     this.setState({
                //         loaderShow: false,
                //         showCommonErrorModal: true,
                //     });
                // }
            })
    }



    refreshTable = () => {
        this.setState({ loaderShow: true })
        this.setState({prospectObj : [],downloadFinalArr :[]})
       
        if (this.props.defaultEmpid !== this.state.empid) {
            let evt = new CustomEvent('REFRESH', { detail: this.state.empid });
            window.dispatchEvent(evt);
        }
        this.getUserData(this.state.empid);
    }

    handleChange = (event, newValue) => {
        this.setState({
            loaderShow: true
        });

        if (newValue === 0) {
            this.setState({ viewUserData: [], transactionData: [], loginData: [], reassignHistoryData: [], transCount: 0, loginCount: 0, reassignHistoryCount: 0 });
            this.getUSerDetails(this.state.detailsData.id, this.state.detailsData.email, this.state.detailsData.enrollFlag);
        } else if (newValue === 1) {
            this.setState({ viewUserData: [], transactionData: [], loginData: [], reassignHistoryData: [], transCount: 0, loginCount: 0, reassignHistoryCount: 0 });
            this.getTransactionDetails(this.state.detailsData.memberIdSource);
        } else if (newValue === 2) {
            this.setState({ viewUserData: [], transactionData: [], loginData: [], reassignHistoryData: [], transCount: 0, loginCount: 0, reassignHistoryCount: 0 });
            this.getLoginDetails(this.state.detailsData.memberIdSource)
        }else if (newValue === 3) {
            this.setState({ viewUserData: [], transactionData: [], loginData: [], reassignHistoryData: [], transCount: 0, loginCount: 0, reassignHistoryCount: 0 });
            this.getReassignHistory(this.state.detailsData.id)
        }
        this.setState({
            activeTab: newValue
        });
    }

    // ---------------- Re-assign Agent -----------------------
    getAllAgents =(selectedMemberId)=> {
        axios.get(process.env.REACT_APP_BASE_URL + "/agentlogin/reassignAgentList/"+ selectedMemberId)
                .then((response) => {
                    console.log("======== getAllAgents ========");
                    console.log(response);
                    if(response && response.data.response.length > 0){
                        let arr = [];
                        response.data.response.forEach(obj =>{
                            let getName = obj.firstName +" "+ obj.lastName;
                            let fullname = getName.replace(/\b\w/g, l => l.toUpperCase());
                            arr.push({key :fullname +" ("+ obj.brokerId +") ", value : obj.brokerId})
                        })
                        this.setState({
                            agentList: arr,
                            loaderShow: false,
                            reAssignAgentModal: true
                        })
                    }else {
                        this.setState({
                            msgModal: true,
                            loaderShow: false,
                            errMsg: "No Agent Available to Re-assign"
                        })
                    }   
                })
                .catch(error => {
                    console.log(error);
                    console.log(error.response);
                    // if (error.response.status === 500) {
                        // this.setState({
                        //     loaderShow: false,
                        //     successModal: true,
                        //     popUpMsg: "Oops! Something's not right. If you're still having trouble, call us on (800) 921-4505",
                        // });
                        this.setState({
                            loaderShow: false,
                            // showCommonErrorModal: true,
                        });
                    // }
                });
    }    
    setAgent = (value, isValid, parentDetails) =>{
        if(isValid){
            this.state[parentDetails.name] = value;
        } else {
            this.state[parentDetails.name] = "";
        }

        this.setState({
            refresh : true
        })
    }
    submitReAssignAgent = () => {
        console.log(this.state.selectedAgent);
        let findObj = this.state.agentList.find(obj => obj.value === this.state.selectedAgent);
        if(findObj){
            this.setState({selecetedAgentName: findObj.key.split('(')[0]});
        }
        
        let dataObj = {            
            "memberId":this.state.selectedMemberId,
            "brokerId":this.state.selectedAgent
        }

        axios.post(process.env.REACT_APP_BASE_URL + '/agentlogin/reassignProspect', dataObj)
            .then(response => {
                console.log("======== submitReAssignAgent ========");
                console.log(response);
                if (response.data.code === 200) {    
                    this.setState({
                        loaderShow: false,
                        agentList: [],
                        selectedAgent: '',
                        reAssignAgentModal: false,
                        msgModal: true,
                        reAssignSuccess: true,
                        errMsg: '',
                    });

                    this.refreshTable()

                }
                // if(response.data.code === 500){
                //     this.setState({
                //         loaderShow: false,
                //         showCommonErrorModal: true,
                //     });
                // }
            })
            .catch(error => {
                console.log(error);
                console.log(error.response);
                // if (error.response.status === 500) {
                    // this.setState({
                    //     loaderShow: false,
                    //     successModal: true,
                    //     popUpMsg: "Oops! Something's not right. If you're still having trouble, call us on (800) 921-4505",
                    // });
                    this.setState({
                        loaderShow: false,
                        // showCommonErrorModal: true,
                    });
                // }
            });
                


      
    }

     // click OK button -------------------------------

     uploadExcelOkBtn = () => {
        this.setState({ 
            validationExcelModal: false, 
            loaderShow: false,
            validationArr:[], 
            excelValidation: false,
            inValidRecordData:[]
        });
        this.refreshTable()
    }


    render() {


        const options = {
            selectableRows: false,
            filter: false,
            selectableRowsHeader: false,
            count: this.state.count,
            rowsPerPage: this.state.rowsPerPage,
            search: false,
            serverSide: true,            
            viewColumns: false,
            print: false,
            fixedHeader: true,
            page: this.state.page,
            download:sessionStorage.getItem('EMPLOYER_FLOW') === "YES" ?true :false,
            downloadOptions: {
                filename: this.props.employerName +' '+ moment().format("MMM DD, YYYY")+'.csv',

            },
            onTableChange: (action, tableState) => {
                console.log('============ onTableChange ================');
                console.log(action);
                console.log(tableState);
                switch (action) {
                    case 'changePage':
                        this.changePage(tableState.page, tableState.rowsPerPage);
                        break;
                    case 'changeRowsPerPage':
                        this.changePage(tableState.page, tableState.rowsPerPage);
                        break;
                    default:
                        break;
                }
            },
            onDownload: (buildHead, buildBody, columns, data) => {

                const fields = [{
                    label: 'Record #',
                    value: 'recordNo'
                }, {
                    label: 'Relationship',
                    value: 'relationship'
                }, {
                    label: 'First Name',
                    value: 'prospectFname'
                }, {
                    label: 'Last Name',
                    value: 'prospectLname'
                },
                {
                    label: 'Date of Birth',
                    value: 'dob'
                },
                {
                    label: 'Age',
                    value: 'Age'
                },
                {
                    label: 'Birth Gender',
                    value: 'birthGender'
                },
                {
                    label: 'Zip',
                    value: 'zipcode'
                },
                {
                    label: 'Email Address',
                    value: 'email'
                },
                ];

                const csv = json2csv(this.state.downloadFinalArr, { fields });

                return csv
            },
            onColumnSortChange: (changedColumn, direction) => {
                this.setState({
                    loaderShow: true
                });
                let order = 'desc';
                if (direction === 'asc') {
                    order = 'asc';
                }
                let columnIndex = '0';
                if (changedColumn === "createdDate") {
                    columnIndex = '1';
                } else if (changedColumn === 'email') {
                    columnIndex = '2';
                } else if (changedColumn === 'firstName') {
                    columnIndex = '4';
                }else if (changedColumn === 'record') {
                    columnIndex = '8';
                }
                this.sort(columnIndex, order);
            },

            onCellClick: (cellIndex, rowIndex, rowMeta) => {//Namita 23 april
                console.log(rowIndex.colIndex)
                if (rowIndex.colIndex !== 6 ) {
                    this.setState({ viewDetailsModal: true, loaderShow: true, activeTab: 0 })
                     this.getUSerDetails(this.state.data[rowIndex.dataIndex].id, this.state.data[rowIndex.dataIndex].email, this.state.data[rowIndex.dataIndex].enrollFlag);
                }
            },
            /*customToolbar: () => {
               return <div style={{flexGrow:1}}>
               <Grid container direction="row"
                     justify="center"
                     alignItems="center" spacing={2} >{/!*style={{marginTop:'1%',marginBottom:'1%',marginLeft:'0%'}} *!/}
               {/!*<Grid item xs={12} sm={2} >style={{marginLeft:'-18%',marginRight:'139px'}}
                  <Typography  style={{fontSize:'21px',fontWeight:'bold',width:'200px',marginTop:'13px',marginLeft:'60px',marginRight:'25px'}}> Active Employees</Typography>
               </Grid>*!/}
               <Grid item xs={3} sm={3} > {/!*style={{marginLeft:'10px'}} *!/}
               <FormControl  style={customStyle.formControlStyle}>
               <InputLabel  style={{textAlign:'left'}}>Search By</InputLabel>
                <Select
                    label="Search By"
                    name="name"
                    style={customStyle.searchByStyle}
                    value={this.state.searchTypeValue}
                    onChange={(event) =>this.handleChageSearchType(event)}
                 >
                    <MenuItem value='0' >Date Added</MenuItem>
                    <MenuItem value='1' >{ sessionStorage.getItem('EMPLOYER_FLOW') === "YES" ? "Employee Name" : "Prospect Name" }</MenuItem>
                    <MenuItem value='2' >Email</MenuItem>
                    <MenuItem value='3' >Status</MenuItem>
    
                </Select>
                </FormControl>
               </Grid>
               <Grid item xs={4} sm={4} >{/!*style={{marginLeft:'-10px'}}*!/}

{
    this.state.searchTypeValue === '0'?
    
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                   <KeyboardDatePicker
                //    required
                   autoComplete='off'
                   margin="none"
                   label="Select Date"
                   format="MMMM dd,yyyy"
                   value={this.state.targetDate}
                   onFocus={e => e.target.blur()}
                   style={{width:'100%',marginTop:'-9px',marginLeft:'9%',marginRight:'2%',padding:'0px'}}
                   inputProps={{style: {fontSize:'12.8px', fontFamily: "Roboto, Arial, Helvetica, sans-serif",marginTop:'10px',
                                //    paddingLeft:'7px'
                                }}}
                   InputLabelProps={{style:{paddingRight:10,paddingTop:12,color: 'grey'}}}
                   onChange={(event)=>this.handleDate(event)}
                   variant="filled"
                   KeyboardButtonProps={{
                       'aria-label': 'change date',
                   }}
                   views={["year", "month", "date"]}
                    openTo="year"
                   minDate={new Date('01/01/2020')}
               />
           </MuiPickersUtilsProvider>
       :

       this.state.searchTypeValue === '3'?
        <FormControl  style={customStyle.formControlStyle1}>
            <InputLabel id="demo-simple-select-label" style={{}}
            >Select status</InputLabel>
            <Select name="name" style={customStyle.searchByStyle} value={this.state.statusValue} onChange={(event) =>this.statusChange(event)}>
                <MenuItem value='all'>All Status</MenuItem>
                <MenuItem value='true'>Enrolled</MenuItem>
                <MenuItem value='0' >Instructions</MenuItem>
                <MenuItem value='1' >Set up Family</MenuItem>
                <MenuItem value='2' >View Quote</MenuItem>
                <MenuItem value='3' >Check Eligibility</MenuItem>
                <MenuItem value='4' >Select Program</MenuItem>
                <MenuItem value='5' >Select Add-Ons</MenuItem>
                <MenuItem value='6' >Set up Payment</MenuItem>
                <MenuItem value='7' >Submit Application</MenuItem>
            </Select>
        </FormControl>
        :
        <TextField style={customStyle.textFieldStyle}
            value={this.state.searchText}
            disabled={this.state.searchShow}
            onChange={(event)=>this.setSearch(event)}></TextField>        

        }

</Grid>

                   <Grid item xs={1} sm={1}>
                    <CrudButton color="secondary" style={{marginTop:'7px',boxShadow:'none',width:'46px',height:'46px'}} aria-label="search" disabled={this.state.searchText==''||this.state.targetDate==''} onClick={()=>this.searchRecord()} >
                       <SearchIcon />
                   </CrudButton>
                   </Grid>
                   <Grid item xs={1} sm={1}>
               <CrudButton color="primary" aria-label="add" style={{width:'46px',height:'46px',boxShadow:'none',marginTop:'7px',marginLeft:'3%',backgroundColor:'#e10050'}} onClick={()=>this.addUserModal()} >
               <AddIcon />
               </CrudButton>
               </Grid>
               <Grid item xs={2} sm={1}>
               <CrudButton style={{boxShadow:'none',width:'46px',height:'46px',marginTop:'7px', backgroundColor : '#41b5c2'}} onClick={this.refreshTable}><RefreshIcon /></CrudButton>
               </Grid>
               </Grid>
              </div>
            },*/
            onRowSelectionChange: (currentRowsSelected, allRowsSelected, rowsSelected) => {
                this.state.rowIndex = rowsSelected;
            }

        };
        const transactionOption = {
            selectableRows: false,
            filter: false,
            selectableRowsHeader: false,
            count: this.state.activeTab === 1 ? this.state.transCount : this.state.activeTab === 2 && this.state.loginCount,
            rowsPerPage: 10,
            search: false,
            serverSide: false,
            download: false,
            viewColumns: false,
            print: false,
            fixedHeader: true,
            textLabels: {
                body: {
                    noMatch: "Sorry, no records found",
                },
            }
        };

        const reAssignHistoryOption = {
            selectableRows: false,
            filter: false,
            selectableRowsHeader: false,
            count: this.state.reassignHistoryCount,
            rowsPerPage: 10,
            search: false,
            serverSide: false,
            download: false,
            viewColumns: false,
            print: false,
            fixedHeader: true,
            textLabels: {
                body: {
                    noMatch: "Sorry, no records found",
                },
            }
        };

        let currentScreen = '';
        if (this.state.activeTab === 0) {
            currentScreen = <div style={{ margin: '15px', borderTop: '1px solid rgba(0, 0, 0, 0.12)', borderBottom: '1px solid rgba(0, 0, 0, 0.12)', fontFamily: "Roboto, Arial, Helvetica, sans-serif" }}>
                <Grid item sm={12} xs={12} md={12} lg={12} >
                    {
                        this.state.viewUserData.length > 3 ?
                            this.state.viewUserData.map((row, index, key) => (
                                row.type === 'STR' ?
                                    <div style={{ display: 'flex', borderBottom: '1px solid rgba(0, 0, 0, 0.12)', padding: '10px' }}>
                                        <Grid item xs={3} key={index} sm={3} md={3} lg={2}>
                                            {row.key}
                                        </Grid>
                                        <Grid item xs={3} sm={6} md={6} lg={6} key={index + 'gd'} style={{ fontWeight: 'bold' }}>
                                            {row.value}
                                        </Grid>
                                    </div>
                                    :
                                    row.type === 'ARR' &&
                                    <div style={{ display: 'flex', borderBottom: '1px solid rgba(0, 0, 0, 0.12)', padding: '10px' }}>
                                        <Grid item xs={3} key={index + 'sm'} sm={3} md={3} lg={2}>
                                            {row.key}
                                        </Grid>
                                        <Grid item xs={3} sm={6} md={6} lg={6} key={index + 'li'} style={{ fontWeight: 'bold' }}>
                                            {
                                                row.value.length > 0 ?
                                                    <ul style={{ listStyleType: 'none' }}>
                                                        {
                                                            row.value.map((childRow) => (
                                                                <li style={{ width: '100%' }}>
                                                                    <span style={{ float: 'left', width: '50%' }}>{childRow.firstName + ' ' + childRow.lastName}</span>
                                                                    <span style={{ float: 'right', width: '50%' }}>{childRow.relation}</span>
                                                                </li>
                                                            ))
                                                        }
                                                    </ul>
                                                    :
                                                    <span>NA</span>

                                            }

                                        </Grid>
                                    </div>
                            ))
                            :
                            <div>
                                {
                                    this.state.viewUserData.map((row, index, key) => (
                                        <div style={{ display: 'flex', borderBottom: '1px solid rgba(0, 0, 0, 0.12)', padding: '10px' }}>
                                            <Grid item xs={3} key={index} sm={3} md={3} lg={2}>
                                                {row.key}
                                            </Grid>
                                            <Grid item xs={3} sm={6} md={6} lg={6} key={index + 'gd'} style={{ fontWeight: 'bold' }}>
                                                {row.value}
                                            </Grid>
                                        </div>
                                    ))
                                }
                                <Grid item xs={12} sm={12} md={12} style={{ textAlign: 'center', display: this.state.detailsData.enrollFlag ? 'block' : 'none' }}>
                                    <span style={{ fontWeight: 'bold' }}>Member onboarding in progress
                                       <br />
                                        If it's more than two business days since enrollment, please call agent support: 800-921-4505 option 3.
                                   </span>
                                </Grid>
                            </div>

                    }
                </Grid>
            </div>
        } else if (this.state.activeTab === 1) {
            currentScreen = <Grid item sm={6} xs={6} md={12} lg={12} style={{ fontFamily: "Roboto, Arial, Helvetica, sans-serif" }}>
                {/* <MuiThemeProvider theme={this.getMuiThemeTran()}>
                    <MUIDataTable
                        //title={"Active Prospects"}
                        data={this.state.transactionData}
                        columns={this.transactionColumn}
                        options={transactionOption}
                    />
                </MuiThemeProvider>
                 */}

<TransactionTable  tableData={this.state.transactionData}/>
            </Grid>
        } else if (this.state.activeTab === 2) {
            currentScreen = <Grid item sm={6} xs={6} md={12} lg={12} style={{ fontFamily: "Roboto, Arial, Helvetica, sans-serif" }}>
                <MuiThemeProvider theme={this.getMuiThemeTran()}>
                    <MUIDataTable
                        //title={"Active Prospects"}
                        data={this.state.loginData}
                        columns={this.loginColumn}
                        options={transactionOption}
                    />
                </MuiThemeProvider>

            </Grid>
        } else if (this.state.activeTab === 3) {
            currentScreen = <Grid item sm={6} xs={6} md={12} lg={12} style={{ fontFamily: "Roboto, Arial, Helvetica, sans-serif" }}>
                <MuiThemeProvider theme={this.getMuiThemeTran()}>
                    <MUIDataTable
                        //title={"Active Prospects"}
                        data={this.state.reassignHistoryData}
                        columns={this.reAssignHistoryColumn}
                        options={reAssignHistoryOption}
                    />
                </MuiThemeProvider>

            </Grid>
        }

        return (
            <div >
                {
                    this.state.loaderShow ? <Loader></Loader> : ''
                }
                <div style={{ flexGrow: 1, boxShadow: 'none' }}>
                    <Grid container style={{ padding: '10px' }}>
                        <Grid item xs={3} sm={3}>
                            <Typography style={{ fontSize: '21px', fontWeight: 'bold', padding: '10px' }}> {sessionStorage.getItem('EMPLOYER_FLOW') === "YES" ? "Active Employees" : "Active Prospects"}</Typography>
                        </Grid>
                        <Grid item xs={2} sm={2} > {/*style={{marginLeft:'10px'}} */}
                            <FormControl style={customStyle.formControlStyle}>
                                <InputLabel style={{ textAlign: 'left' }}>Search By</InputLabel>
                                <Select
                                    label="Search By"
                                    name="name"
                                    value={this.state.searchTypeValue}
                                    onChange={(event) => this.handleChageSearchType(event)}
                                >
                                    <MenuItem value='0' >Date Added</MenuItem>
                                    <MenuItem value='1' >{sessionStorage.getItem('EMPLOYER_FLOW') === "YES" ? "Employee Name" : "Prospect Name"}</MenuItem>
                                    <MenuItem value='2' >Email</MenuItem>
                                    <MenuItem value='3' >Status</MenuItem>

                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={2} sm={2} >{/*style={{marginLeft:'-10px'}}*/}

                            {
                                this.state.searchTypeValue === '0' ?

                                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                        <KeyboardDatePicker
                                            //    required
                                            autoComplete='off'
                                            margin="none"
                                            label="Select Date"
                                            format="MMMM dd,yyyy"
                                            value={this.state.targetDate}
                                            onFocus={e => e.target.blur()}
                                            /*style={{width:'100%',marginTop:'-9px',marginLeft:'9%',marginRight:'2%',padding:'0px'}}*/
                                            inputProps={{
                                                style: {
                                                    fontSize: '12.8px', fontFamily: "Roboto, Arial, Helvetica, sans-serif", marginTop: '3px',
                                                    //    paddingLeft:'7px'
                                                }
                                            }}
                                            InputLabelProps={{ style: { paddingRight: 10, paddingTop: 0, color: 'grey' } }}
                                            onChange={(event) => this.handleDate(event)}
                                            variant="filled"
                                            KeyboardButtonProps={{
                                                'aria-label': 'change date',
                                            }}
                                            views={["year", "month", "date"]}
                                            openTo="year"
                                            minDate={new Date('01/01/2020')}
                                        />
                                    </MuiPickersUtilsProvider>
                                    :

                                    this.state.searchTypeValue === '3' ?
                                    this.state.checkADDons ?
                                        <FormControl style={customStyle.formControlStyle1}>
                                            <InputLabel id="demo-simple-select-label" style={{}}
                                            >Select status</InputLabel>
                                            <Select name="name" style={customStyle.searchByStyle} value={this.state.statusValue} onChange={(event) => this.statusChange(event)}>
                                                <MenuItem value='all'>All Status</MenuItem>
                                                <MenuItem value='true'>App Success </MenuItem>
                                                <MenuItem value='0' >Instructions</MenuItem>
                                                <MenuItem value='1' >Set up Family</MenuItem>
                                                <MenuItem value='2' >View Quote</MenuItem>
                                                <MenuItem value='3' >Check Eligibility</MenuItem>
                                                <MenuItem value='4' >Select Program</MenuItem>
                                                <MenuItem value='5' >Select Add-Ons</MenuItem> 
                                                <MenuItem value='6' >Review Choices</MenuItem>
                                                <MenuItem value='7' >Set up Payment</MenuItem>
                                                <MenuItem value='8' >Submit Application</MenuItem>
                                            </Select>
                                        </FormControl>
                                        :
                                        <FormControl style={customStyle.formControlStyle1}>
                                            <InputLabel id="demo-simple-select-label" style={{}}
                                            >Select status</InputLabel>
                                            <Select name="name" style={customStyle.searchByStyle} value={this.state.statusValue} onChange={(event) => this.statusChange(event)}>
                                                <MenuItem value='all'>All Status</MenuItem>
                                                <MenuItem value='true'>App Success</MenuItem>
                                                <MenuItem value='0' >Instructions</MenuItem>
                                                <MenuItem value='1' >Set up Family</MenuItem>
                                                <MenuItem value='2' >View Quote</MenuItem>
                                                <MenuItem value='3' >Check Eligibility</MenuItem>
                                                <MenuItem value='4' >Select Program</MenuItem>
                                                <MenuItem value='5' >Review Choices</MenuItem>
                                                {/*<MenuItem value='5' >Select Add-Ons</MenuItem> //commented change for add-ons 30-March */}
                                                <MenuItem value='6' >Set up Payment</MenuItem>
                                                <MenuItem value='7' >Submit Application</MenuItem>
                                            </Select>
                                        </FormControl>
                                        :
                                        <TextField style={{ marginTop: '15px' }}
                                            value={this.state.searchText}
                                            disabled={this.state.searchShow}
                                            onChange={(event) => this.setSearch(event)}
                                            onKeyDown={(event)=>{
                                                if (event.keyCode == '13') { //keycode for ENTER key
                                                    this.searchRecord()
                                                } 
                                                
                                            }}
                                            
                                            ></TextField>

                            }

                        </Grid>

                        <Grid item xs={1} sm={1}>
                        <Tooltip
                                        title="Search"
                                        placement="bottom"
                                    >
                            <CrudButton color="secondary" style={{ boxShadow: 'none', width: '46px', height: '46px', marginLeft: 20 }} aria-label="search" disabled={this.state.searchText == '' || this.state.targetDate == ''} onClick={() => this.searchRecord()} >
                                <SearchIcon />
                            </CrudButton>
                            </Tooltip>
                        </Grid>
                        <Grid item xs={1} sm={1}>
                                {sessionStorage.getItem("EMPLOYER_FLOW") === "YES"?
                                    //     <Tooltip
                                    //     title="Add employee"
                                    //     placement="bottom"
                                    // >
                                    //     <CrudButton color="primary" aria-label="add" style={{ width: '46px', height: '46px', boxShadow: 'none', backgroundColor: '#e10050' }} onClick={() => this.addUserModal()} >
                                    //         <AddIcon />
                                    //     </CrudButton>
                                    //     </Tooltip>
                                    null
                                    :
                                    <Tooltip
                                     title="Add prospect"
                                    placement="bottom"
                                >
                                                <CrudButton color="primary" aria-label="add" style={{ width: '46px', height: '46px', boxShadow: 'none', backgroundColor: '#e10050', marginLeft: 20 }} onClick={() => this.addUserModal()} >
                                                    <AddIcon />
                                                </CrudButton>

                                                {/* <CrudButton color="primary" aria-label="add" style={{ width: '46px', height: '46px', boxShadow: 'none', backgroundColor: '#e10050' }} onClick={() => this.downloadProspectData()} >
                                                    <CloudDownloadIcon />
                                                </CrudButton> */}
                                </Tooltip>
                            }
                       
                        </Grid>



                        {
                            sessionStorage.getItem('EMPLOYER_FLOW') === "YES" ?
                                <Grid item xs={1} sm={1}>
                                    <Tooltip
                                        title="Upload employee census records"
                                        placement="bottom"
                                    >
                                    <CrudButton color="primary" aria-label="add" style={{ width: '46px', height: '46px', boxShadow: 'none', backgroundColor: '#e10050', marginLeft: 20 }} onClick={() => this.uploadData()} >
                                        <CloudUploadIcon />
                                    </CrudButton>
                                    </Tooltip>
                                </Grid>
                                :
                                null
                        }
                        <Grid item xs={1} sm={1}>
                        <Tooltip
                                        title="Refresh"
                                        placement="bottom"
                                    >
                            <CrudButton style={{ boxShadow: 'none', width: '46px', height: '46px', backgroundColor: '#41b5c2', marginLeft: 20 }} onClick={this.refreshTable}><RefreshIcon /></CrudButton>
                            </Tooltip>
                        </Grid>
                    </Grid>
                    <Grid container>
                        <Grid item xs={12} sm={12}>
                            <MuiThemeProvider theme={getMuiTheme()}>
                                <div className="dwnloadListTable">
                                <MUIDataTable
                                    data={this.state.data}
                                    columns={this.columns}
                                    options={options}
                                />
                                </div>
                                

                            </MuiThemeProvider>
                        </Grid>
                    </Grid>
                </div>



                {/* ----Add user----- modal */}

                <Modal size="lg" show={this.state.addUsermodalShow} onHide={(event) => this.setState({ addUsermodalShow: false, loaderShow: false })} centered backdrop='static'>
                    <Modal.Header style={customStyle.modal_header} closeButton>
                        {
                            sessionStorage.getItem('EMPLOYER_FLOW') === "YES" ?
                                <Modal.Title>Add Employee</Modal.Title>
                                :
                                <Modal.Title>Add Prospect</Modal.Title>
                        }
                    </Modal.Header>
                    <Modal.Body >
                        {
                            this.state.loaderShow ? <Loader></Loader> : ''
                        }
                        <div style={{ flexGrow: 1 }}>
                            <Grid container spacing={2} justify="center" >
                                <Grid item xs={12} sm={5} >
                                    <Sample setChild={this.setUserValue.bind(this)} reqFlag={true} name={'firstname'} label={'First Name'} value={this.state.fname} disable={false} style={customStyle.textFieldWrpAgent} length={25} fieldType={'text'} errMsg={'Enter valid first name'} helperMsg={'First name required'} parentDetails={{ name: 'firstname' }}></Sample>
                                </Grid>
                                <Grid item xs={12} sm={5} >
                                    <Sample setChild={this.setUserValue.bind(this)} reqFlag={true} name={'lastname'} label={'Last Name'} value={this.state.lname} disable={false} style={customStyle.textFieldWrpAgent} length={25} fieldType={'text'} errMsg={'Enter valid last name'} helperMsg={'Last name required'} parentDetails={{ name: 'lastname' }}></Sample>
                                </Grid>
                                {sessionStorage.getItem('EMPLOYER_FLOW') === "YES" ?
                                <>
                                <Grid item xs={12} sm={5} >
                                    <Sample setChild={this.setUserValue.bind(this)} reqFlag={false} name={'email'} label={'Email ID'} value={this.state.email} disable={false} style={customStyle.textFieldWrpAgent} length={50} fieldType={'email'} errMsg={'Enter valid email Id'} parentDetails={{ name: 'email' }}></Sample>
                                </Grid>
                                <Grid item xs={12} sm={5} >
                                    <Sample setChild={this.setUserValue.bind(this)} reqFlag={false} name={'phone'} label={'Mobile No.'} value={this.state.phone} disable={false} style={customStyle.textFieldWrpAgent} length={10} fieldType={'phone'} errMsg={'Enter valid mobile no.'}  parentDetails={{ name: 'phone' }}></Sample>
                                </Grid>
                                </>
                                :
                                <>
                                <Grid item xs={12} sm={5} >
                                    <Sample setChild={this.setUserValue.bind(this)} reqFlag={true} name={'email'} label={'Email ID'} value={this.state.email} disable={false} style={customStyle.textFieldWrpAgent} length={50} fieldType={'email'} errMsg={'Enter valid email Id'} helperMsg={"Email is required"} parentDetails={{ name: 'email' }}></Sample>
                                </Grid>
                                <Grid item xs={12} sm={5} >
                                    <Sample setChild={this.setUserValue.bind(this)} reqFlag={true} name={'phone'} label={'Mobile No.'} value={this.state.phone} disable={false} style={customStyle.textFieldWrpAgent} length={10} fieldType={'phone'} errMsg={'Enter valid mobile no.'} helperMsg={"Phone number is required"} parentDetails={{ name: 'phone' }}></Sample>
                                </Grid>
                                </>
                            }
                                
                            </Grid>

                        </div>

                    </Modal.Body>
                    <Modal.Footer>
                        <NextButton style={{ margin: '0', marginRight: '10px', width: '95px', height: '40px' }} disabled={this.state.userValid} onClick={() => this.addUser()}>ADD</NextButton>
                        <CustomButton style={{ height: '40px' }} onClick={() => this.setState({ addUsermodalShow: false, loaderShow: false })}>Cancel</CustomButton>
                    </Modal.Footer>
                </Modal>


                {/*---------------------------- View Details Modal--------------------- */}


                <Modal size="xl" show={this.state.viewDetailsModal} onHide={(event) => this.setState({ viewDetailsModal: false, loaderShow: false, viewUserData: [], transactionData: [], loginData: [], transCount: 0, loginCount: 0, reassignHistoryCount: 0 })} centered backdrop='static'>
                    {/*<Modal.Header style={customStyle.modal_header} closeButton>
                            <Modal.Title>View Details</Modal.Title>
                        </Modal.Header>
                        <Modal.Body >
                            
                            {
                                this.state.loaderShow ? <Loader></Loader> : ''
                            }
                            <div style={{flexGrow:1}}>
                            <Grid container spacing={2} justify="center" >
                            <Grid item xs={12} sm={5} >
                            <Sample setChild={this.setUserValue.bind(this)} reqFlag={true} name={'firstname'} label={'First Name'} value={this.state.fname} disable={false} style={customStyle.textFieldWrpAgent} length={25}  fieldType={'text'} errMsg={'Enter valid first name'} helperMsg={'First name required'} disable={true} parentDetails={{name:'firstname'}}></Sample>
                            </Grid>
                            <Grid item xs={12} sm={5} >
                            <Sample setChild={this.setUserValue.bind(this)} reqFlag={true} name={'lastname'} label={'Last Name'} value={this.state.lname} disable={false} style={customStyle.textFieldWrpAgent} length={25}  fieldType={'text'} errMsg={'Enter valid last name'} helperMsg={'Last name required'} disable={true} parentDetails={{name:'lastname'}}></Sample>
                            </Grid>
                            <Grid item xs={12} sm={5} >
                            <Sample setChild={this.setUserValue.bind(this)} reqFlag={true} name={'email'} label={'Email ID'} value={this.state.email} disable={false} style={customStyle.textFieldWrpAgent} length={50}  fieldType={'email'} errMsg={'Enter valid email Id'} helperMsg={'Email Id required'} disable={true} parentDetails={{name:'email'}}></Sample>
                            </Grid>
                            <Grid item xs={12} sm={5} >
                            <Sample setChild={this.setUserValue.bind(this)} reqFlag={true} name={'phone'} label={'Mobile No.'} value={this.state.phone} disable={false} style={customStyle.textFieldWrpAgent} length={10}  fieldType={'phone'} errMsg={'Enter valid mobile no.'} helperMsg={'Mobile no. required'} disable={true} parentDetails={{name:'phone'}}></Sample>
                            </Grid>
                            <Grid item xs={12} sm={5} >
                                </Grid>                     
                            </Grid>
                            </div>

                        </Modal.Body>
                        <Modal.Footer>
                            <NextButton style={{margin: '0', marginRight : '10px', width: '95px', height: '40px'}} disabled={this.state.userValid} onClick={() => this.setState({viewDetailsModal:false})}>OK</NextButton>
                            
                        </Modal.Footer>*/}
                    <Modal.Body style={{ padding: 0, maxHeight: '450px' }}>
                    {
                            this.state.activeTab ==1 ?
                            null
                            :
                            this.state.loaderShow ? <Loader></Loader> : ''
                        }
                        <div style={{ flexGrow: 1, height: '450px', overflowX: 'hidden', overflowY: 'auto' }}>
                            <Grid container>
                                <Grid item xs={11} sm={11} md={11} lg={11}>
                                    <AntTabs
                                        value={this.state.activeTab}
                                        onChange={this.handleChange}
                                        indicatorColor="primary"
                                        textColor="primary">
                                        <AntTab label="VIEW DETAILS" className='ant-col-15' style={{ paddingLeft: '0px', fontFamily: 'Roboto, Arial, Helvetica, sans-serif' }} />
                                        <AntTab label="VIEW TRANSACTION DETAILS" disabled={this.state.detailsData.disableFlag} style={{ paddingLeft: '0px', fontFamily: 'Roboto, Arial, Helvetica, sans-serif' }} />
                                        <AntTab label="VIEW ACCESS LOGS" disabled={this.state.detailsData.disableFlag} style={{ paddingLeft: '0px', fontFamily: 'Roboto, Arial, Helvetica, sans-serif' }} />
                                        <AntTab label="VIEW AGENT HISTORY" disabled = {sessionStorage.getItem('EMPLOYER_FLOW') === "YES"? true : false} style={{ paddingLeft: '0px', fontFamily: 'Roboto, Arial, Helvetica, sans-serif' }} />
                                    </AntTabs>
                                </Grid>
                                <Grid item xs={1} sm={1} md={1} lg={1} style={{ backgroundColor: '#33afb0', padding: '7px' }}>

                                    {/*<div style={{color : '#343a40'}} onClick={(event) => this.setState({viewDetailsModal:false,loaderShow : false})}>X</div>*/}
                                    <Button style={{ color: '#343a40', borderRadius: '50%', fontSize: '20px' }} onClick={(event) => this.setState({ viewDetailsModal: false, loaderShow: false, viewUserData: [], transactionData: [], loginData: [], transCount: 0, loginCount: 0, reassignHistoryCount: 0, detailsData: {} })}>X</Button>
                                </Grid>
                            </Grid>
                            {currentScreen}
                        </div>
                    </Modal.Body>
                </Modal>



                {/* -----Edit Prospect------- */}

                <Modal size="lg" show={this.state.editModal} onHide={(event) => this.setState({ editModal: false, loaderShow: false })} centered backdrop='static'>
                    <Modal.Header style={customStyle.modal_header} closeButton>
                        {
                            sessionStorage.getItem('EMPLOYER_FLOW') === "YES" ?
                                <Modal.Title>Edit Employee</Modal.Title>
                                :
                                <Modal.Title>Edit Prospect</Modal.Title>
                        }
                    </Modal.Header>
                    <Modal.Body >
                        {/* {
                                this.state.loaderShow ? <Loader></Loader> : ''
                            } */}
                        <div style={{ flexGrow: 1 }}>

                            <Grid container spacing={2} justify="center" >
                                <Grid item xs={12} sm={5} >
                                    <Sample setChild={this.setUserValue.bind(this)} reqFlag={true} name={'firstname'} label={'First Name'} value={this.state.fname} disable={false} style={customStyle.textFieldWrpAgent} length={25} fieldType={'text'} errMsg={'Enter valid first name'} helperMsg={'First name required'} parentDetails={{ name: 'firstname' }}></Sample>
                                </Grid>
                                <Grid item xs={12} sm={5} >
                                    <Sample setChild={this.setUserValue.bind(this)} reqFlag={true} name={'lastname'} label={'Last Name'} value={this.state.lname} disable={false} style={customStyle.textFieldWrpAgent} length={25} fieldType={'text'} errMsg={'Enter valid last name'} helperMsg={'Last name required'} parentDetails={{ name: 'lastname' }}></Sample>
                                </Grid>                                

                                {sessionStorage.getItem('EMPLOYER_FLOW') === "YES"?
                                    <>
                                    <Grid item xs={12} sm={5} >
                                    <Sample setChild={this.setUserValue.bind(this)} reqFlag={false} name={'email'} label={'Email ID'} value={this.state.email} disable={false} style={customStyle.textFieldWrpAgent} length={50} fieldType={'email'} errMsg={'Enter valid email Id'}  parentDetails={{ name: 'email' }}></Sample> {/* disable={true}  */}
                                    </Grid>
                                    <Grid item xs={12} sm={5} >
                                        <Sample setChild={this.setUserValue.bind(this)} reqFlag={false} name={'phone'} label={'Mobile No.'} value={this.state.phone} disable={false} style={customStyle.textFieldWrpAgent} length={10} fieldType={'phone'} errMsg={'Enter valid mobile no.'}  parentDetails={{ name: 'phone' }}></Sample>
                                    </Grid>
                                    </>
                                    :
                                    <>
                                    <Grid item xs={12} sm={5} >
                                        <Sample setChild={this.setUserValue.bind(this)} reqFlag={true} name={'email'} label={'Email ID'} value={this.state.email} disable={false} style={customStyle.textFieldWrpAgent} length={50} fieldType={'email'} errMsg={'Enter valid email Id'} helperMsg={'Email Id required'} parentDetails={{ name: 'email' }}></Sample> {/* disable={true}  */}
                                    </Grid>
                                    <Grid item xs={12} sm={5} >
                                        <Sample setChild={this.setUserValue.bind(this)} reqFlag={true} name={'phone'} label={'Mobile No.'} value={this.state.phone} disable={false} style={customStyle.textFieldWrpAgent} length={10} fieldType={'phone'} errMsg={'Enter valid mobile no.'} helperMsg={'Mobile no. required'} parentDetails={{ name: 'phone' }}></Sample>
                                    </Grid>
                                    </>
                                }

                            </Grid>
                        </div>

                    </Modal.Body>
                    <Modal.Footer>
                        <NextButton style={{ margin: '0', marginRight: '10px', width: '95px', height: '40px' }} disabled={this.state.userValid} onClick={() => this.updateUser()}>UPDATE</NextButton>
                        {/* disabled={this.state.userValid} */}
                        <CustomButton style={{ height: '40px' }} onClick={() => this.setState({ editModal: false, loaderShow: false })}>Cancel</CustomButton>
                    </Modal.Footer>
                </Modal>

                {/* ----Upload excel---- modal */}

                <Modal size="lg" show={this.state.uploadExcelModal} onHide={(event) => this.setState({ uploadExcelModal: false, uploadFileName:'',fileNameModal:false,invalidMessage:false,validationArr:[], loaderShow: false })} centered backdrop='static'>
                    <Modal.Header style={customStyle.modal_header} closeButton>

                        <Modal.Title>Upload Census</Modal.Title>

                    </Modal.Header>
                    <Modal.Body >
                        {
                            //this.state.loaderShow ? <Loader></Loader> : ''
                            this.state.uploadLoaderShow ? <Loader></Loader> : ''
                        }
                        <div style={{ flexGrow: 1 }}>
                            <Grid container spacing={2} justify="center" >
                                <Grid item xs={12} sm={8} >
                                    <div style={uploadContent}>
                                   
                                       { this.state.downloadDataFlag == true ?
                                       <>
                                        
                                            <p>To update the census, download the current employee records and follow the guidelines below:</p>
                                        
                                            <ul>
                                                <li>
                                                To maintain data integrity across multiple census updates, ensure that the record number mapped to each employee doesn’t change.
                                                </li>
                                                <li>
                                                Data of employees who have already been enrolled is locked for editing and cannot be changed.
                                                </li>
                                            </ul>
                                         </>
                                        
                                        :
                                        <>
                                                <p>To create the census, use the template provided and follow the guidelines below:</p>
                                                <ul>
                                                    <li>Birth gender, age and zip is mandatory for Quick Quote.</li>
                                                    <li>Employee email address along with name, relationship and birth
                                                        date of all household members is mandatory for Enrollment.</li>
                                                    <li> To maintain data integrity across multiple census updates, ensure
                                                        that the record number mapped to each employee doesn’t change.</li>
                                                </ul>
                                        </>
                                        }

                                    </div>




                                </Grid>

                                <Grid item xs={12} sm={4} >
                                    {
                                        this.state.downloadDataFlag == true ?
                                        <CustomButton style={{ height: '40px' }} onClick={this.downloadProspectCensus} >
                                             Download Current Census 
                                        </CustomButton>
                                        :
                                        <CustomButton style={{ height: '40px' }} >
                                         <a href={require("../CommonScreens/Employee_Census_Template.xlsx")} download="Employee_Census_Template" className="dwnldBtn">Download Template</a>
                                         </CustomButton>
                                    }
                                    
                                    {/* <CustomButton style={{ height: '40px' }} onClick={() => exportToExcel(this.state.exportToExcelArr)} > */}
                                        {/* <a href={require("../CommonScreens/Employee_Census_Template.xlsx")} download="Employee_Census_Template" className="dwnldBtn">Download Template</a> */}
                                       

                                </Grid>



                            </Grid>

                            <Grid container spacing={2} justify="center" >
                                <Grid item xs={12} sm={12} >
                                    {/* <ReadExcel /> */}


                                    <div className="uploadWrapContainer">
                                        <div className="drop-it-hot" id="drop-area" onDrop={this.handleDrop} >

                                            <form className="choose-files">
                                                <div className="button-wrapper">
                                                    
                                                    <svg fill="currentColor" height="62" viewBox="0 0 24 24" width="62" xmlns="http://www.w3.org/2000/svg" style={{ color: '#BFBFBF' }}>
                                                        <path d="M0 0h24v24H0z" fill="none" />
                                                        <path d="M9 16h6v-6h4l-7-7-7 7h4zm-4 2h14v2H5z" />
                                                    </svg>
                                                    <label className="label" for="fileElem" >Drag and drop file or</label>
                                                    <div style={{position:'relative', height:'40px',marginBottom:'15px'}}>
                                                        <button type="button" className="btn">BROWSE</button>
                                                        <input type="file" id="fileElem"  accept=".xlsx,.xls" onChange={this.handleChangeFile} onClick={e => (e.target.value = null)}/>
                                                    </div>
                                                    {/* <lable className="selectedFileLabel"> Selected File : {this.state.uploadFileName}</lable> */}
                                                    
                                                   <div style={{height:'50px'}}>
                                                       
                                                    <Toast show={this.state.fileNameModal} onClose={this.filenameModalClose} style={{maxHeight:'40px', marginBottom:'10px'}}>
                                                            <Toast.Header>
                                                                    <img
                                                                    src="holder.js/20x20?text=%20"
                                                                    alt=""
                                                                    />
                                                                    <div style={{width:'95%',overflow:'hidden',textOverflow:'ellipsis', color:'#C3C3C3'}}>Selected File : {this.state.uploadFileName}</div>
                                                            </Toast.Header>
                                                                {/* <Toast.Body></Toast.Body> */}
                                                        </Toast>
                                                   </div>                                                  


                                                </div>
                                            </form>
                                            <div id="gallery"></div>
                                        </div>
                                    </div>
                                    {
                                        this.state.invalidMessage?
                                        <p style={{color: '#a94442',fontStyle: "italic",fontSize: '14px'}}>Please upload a valid Excel (.xls or .xlsx) file.</p>
                                        :
                                        null
                                    }

                                </Grid>
                            </Grid>

                        </div>

                    </Modal.Body>

                    <Modal.Footer>
                        <CustomButton style={{ height: '40px',padding:'10px 20px',fontWeight:'bold' }} disabled={this.state.fileNameModal==false||this.state.fileNameModal=='false'} onClick={this.handleUploadFile}>UPLOAD</CustomButton>
                    </Modal.Footer>
                </Modal>

                    {/* ---------------------validation excel modal----------------------- */}
                <Modal size="md" show={this.state.validationExcelModal} onHide={(event) => this.setState({ validationExcelModal: false, loaderShow: false, validationArr:[] })} backdrop='static' centered>
                    <Modal.Header style={customStyle.modal_header} closeButton>
                        <Modal.Title>{ this.state.successUpload?"Upload Census": this.state.excelValidation || this.state.duplicateEmail ? "Errors in Census":"Warning !"}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={{ padding: '15px' }}>
                    {
                            this.state.loaderShow ? <Loader></Loader> : '' 
                        }
                           <div>
                            {
                                this.state.successUpload?
                                <h6>Census imported successfully.</h6>
                                :
                                // this.state.duplicateEmail?
                                // <h6>Uploaded census file contain duplicate email entries. Please verify the email entries again</h6>
                                // :
                                
                                this.state.excelValidation && this.state.validationArr && this.state.validationArr.length > 0 ?
                                    <div className="">
                                        <p>The census could not be imported due to the following errors.</p>
                                        <table className="table table-bordered">
                                            <thead>
                                                <tr>
                                                <th style={{background:'#F2F2F2'}}>Record</th>
                                                <th style={{background:'#F2F2F2'}}>Relationship</th>
                                                <th style={{background:'#F2F2F2'}}>Message</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    this.state.validationArr.map((data)=>{
                                                    return  <tr>
                                                                <td>{data.record}</td>
                                                                <td>{data.relationship}</td>
                                                                <td>{data.msg}</td>
                                                            </tr>
                                                    })
                                                }         
                                            </tbody>
                                        </table>                           
                                    </div>

                                :
                                <>
                                {
                                    this.state.inValidEmailData && this.state.inValidEmailData.length > 0 ?
                                    <>
                                        <h6>The employees listed below are already in the system:</h6>
                                        <ul>
                                        {
                                            this.state.inValidEmailData.map((email,i)=>{
                                                return <li>{email}</li>                                         
                                                    
                                            })
                                        }
                                        </ul>
                                    </>
                                    :
                                    null
                                }

                                {
                                    this.state.inValidRecordData && this.state.inValidRecordData.length > 0 || this.state.duplicateEmail?
                                    <>
                                    {/* {
                                        this.state.duplicateEmail?
                                        <h6>Uploaded census file contain duplicate email entries. Please verify the email entries again </h6>
                                        :
                                        <h6>{this.state.errMsg}</h6>
                                        // <h6>The record number listed below are already in the system:</h6>
                                    } */}
                                         <h6>{this.state.errMsg}</h6>
                                        <table className="table table-bordered">
                                            <thead>
                                                <tr>
                                                <th style={{background:'#F2F2F2'}}>Record</th>
                                                <th style={{background:'#F2F2F2'}}>Name</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    this.state.inValidRecordData.map((rec,i)=>{
                                                    return  <tr>
                                                                <td>{rec.record}</td>
                                                                <td>{rec.firstName} {rec.lastName}</td>
                                                            </tr>
                                                    })
                                                }         
                                            </tbody>
                                        </table>
                                        
                                    </>
                                    :
                                    null
                                } 

                                <br/>
                                {
                                    this.state.duplicateEmail ?
                                    null
                                    :
                                     <p>Click <b>CONTINUE</b> to replace existing data.</p>

                                }



                                </>
                            }

                           
                                
                           
                        </div>
                    </Modal.Body>
                    <Modal.Footer>

                        {
                             this.state.successUpload || this.state.duplicateEmail || this.state.excelValidation ?
                           // <CustomButton style={{ height: '40px',marginRight:'15px' }} onClick={() => this.setState({ validationExcelModal: false, loaderShow: false,validationArr:[], excelValidation: false,inValidRecordData:[]}, ()=>{this.refreshTable})}>Ok</CustomButton>
                            <CustomButton style={{ height: '40px',marginRight:'15px' }} onClick={this.uploadExcelOkBtn}>Ok</CustomButton>
                            :
                            <>
                            <CustomButton style={{ height: '40px',marginRight:'15px' }} onClick={this.invalidOk}>CONTINUE</CustomButton>
                            <CustomButton style={{ height: '40px' }} onClick={() => this.setState({ validationExcelModal: false,validationArr:[], excelValidation: false,inValidRecordData:[], loaderShow: false},()=>this.getUserData(this.state.empid))}>CANCEL</CustomButton>
                            </>
                        }
                       

                    </Modal.Footer>
                </Modal>




                {/*=================================== Message Model ======================================*/}
                <Modal size="md" show={this.state.msgModal} onHide={(event) => this.setState({ msgModal: false, loaderShow: false, code: null, reAssignSuccess: false,  emailID:false, inviteStatus:"", phoneNumber:"" },()=>{this.refreshTable()})} backdrop='static' centered>
                    <Modal.Header style={customStyle.modal_header} closeButton>
                        <Modal.Title>Message</Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={{ padding: '15px' }}>
                        {
                            this.state.loaderShow ? <Loader></Loader> : ''
                        }

                        {                       
                            this.state.reAssignSuccess ? 
                            <p><b>{this.state.selecetedAgentName}</b> has been now assigned to assist <b>{this.state.prospectFullName}</b></p>:
                            null
                        }

                        <div style={customStyle.HomeContainer}>
                            <div style={customStyle.HomeMAinChild}>
                                {this.state.errMsg}

                                {
                                    this.state.code === 202 &&
                                    <CopyToClipboard text={configurations.enrollmentURL + '/login'}>
                                        <NextButton style={{ width: '50%', height: '30px', marginBottom: '5px', marginTop: '18px' }} disbled={this.state.agentURL === ''} onClick={() => { document.execCommand("copy"); }}>COPY LOGIN LINK</NextButton>
                                    </CopyToClipboard>
                                }
                            </div>
                        </div>

                    </Modal.Body>
                    <Modal.Footer>
                        <CustomButton style={{ height: '40px' }} onClick={() => this.setState({ msgModal: false, loaderShow: false, code: null, reAssignSuccess: false, emailID:false, inviteStatus:"", phoneNumber:"" },()=>this.refreshTable())}>{this.state.emailID ?"Close":"Ok"}</CustomButton>
                        {this.state.emailID && <CustomButton style={{ height: '40px', marginLeft:'10px'}} onClick={() => this.sendAuthEmail()}>OK</CustomButton>}
                    </Modal.Footer>
                </Modal>
                {/*=================================== Message Model ======================================*/}


                {/*=================================== Missing Model ======================================*/}
                <Modal size="md" show={this.state.missingModal} onHide={(event) => this.setState({ missingModal: false, loaderShow: false, code: null })} backdrop='static' centered>
                    <Modal.Header style={customStyle.modal_header} closeButton>
                        <Modal.Title>Missing Data</Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={{ padding: '15px' }}>
                        {
                            this.state.loaderShow ? <Loader></Loader> : ''
                        }

                        <div style={customStyle.HomeContainer}>
                            <div style={customStyle.HomeMAinChild}>
                                {this.state.errMsg}
                            </div>
                        </div>

                    </Modal.Body>
                    <Modal.Footer>
                        <CustomButton style={{ height: '40px' }} onClick={() => this.setState({ missingModal: false, loaderShow: false, code: null })}>Ok</CustomButton>
                    </Modal.Footer>
                </Modal>
                {/*=================================== Message Model ======================================*/}




                {/* ==================================Delete Modal============================================== */}

                <Modal size="md" show={this.state.deleteModal} onHide={(event) => this.setState({ deleteModal: false, loaderShow: false, code: null })} backdrop='static' centered>
                    <Modal.Header style={customStyle.modal_header} closeButton>
                        <Modal.Title>Warning</Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={{ padding: '15px' }}>
                        {
                            this.state.loaderShow ? <Loader></Loader> : ''
                        }

                        <div style={customStyle.HomeContainer}>
                            <div style={customStyle.HomeMAinChild}>
                                This operation will delete the entry and you will not be able to create a new entry with the same email address again. Do you really want to delete? If you are unsure, please click CANCEL and call agent support: <span style={{ fontWeight: 'bold' }}>800-945-4505 option 3</span>
                            </div>
                        </div>

                    </Modal.Body>
                    <Modal.Footer>
                        <CustomButton style={{ height: '40px', marginRight: '15px' }} onClick={() => this.handleOk()}>CONTINUE WITH DELETE</CustomButton>
                        <CustomButton style={{ height: '40px' }} onClick={() => this.setState({ deleteModal: false, loaderShow: false, code: null, userName: '' })}>CANCEL</CustomButton>
                    </Modal.Footer>
                </Modal>

                {/* ==================================Re-assign Modal============================================== */}

                <Modal size="md" show={this.state.reAssignAgentModal} onHide={(event) => this.setState({ reAssignAgentModal: false, loaderShow: false, selectedAgent: '', code: null })} backdrop='static' centered>
                    <Modal.Header style={customStyle.modal_header} closeButton>
                        <Modal.Title>Re-assign Agent</Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={{ padding: '15px' }}>
                        {
                            this.state.loaderShow ? <Loader></Loader> : ''
                        }
                        <div>
                         <p>Please assign a new agent to assist <b>{this.state.prospectFullName}</b> </p>
                        </div>
                        <div>
                        <CommonDropDwn setChild={this.setAgent.bind(this)}  reqFlag={true} name={'Agent'} label={"Please select agent"} value={this.state.selectedAgent} fieldType={'dropDwn'} disable={false} style={customStyle.dropDown}  List={this.state.agentList}  errMsg={'Select Agent'} helperMsg={'Agent required'} parentDetails={{name:'selectedAgent'}} ></CommonDropDwn>
                        </div>
                       

                    </Modal.Body>
                    <Modal.Footer>
                        <NextButton style={{ margin: '0', marginRight: '10px', width: '95px', height: '40px', boxShadow: 'none' }} disabled={this.state.selectedAgent == ''} onClick={() => this.submitReAssignAgent()}>UPDATE</NextButton>
                        <CustomButton style={{ height: '40px' }} onClick={() => this.setState({ reAssignAgentModal: false, selectedAgent: '', loaderShow: false })}>Cancel</CustomButton>
                    </Modal.Footer>
                </Modal>

                {/* ==================================Re-assign Modal============================================== */}
               
                {/*<Modal size="xl" show={this.state.modalShow} onHide={(event) => this.setState({modalShow:false,loaderShow : false})} style={{maxWidth:'750px',marginLeft:'20%'}} backdrop='static'>
                        <Modal.Header style={customStyle.modal_header} >
                            <Modal.Title>Add Prospect</Modal.Title>
                        </Modal.Header>
                        <Modal.Body style={{ padding: '15px' }}>
                            {
                                this.state.loaderShow ? <Loader></Loader> : ''
                            }
                            <div style={customStyle.HomeContainer}>
                                <div style={customStyle.HomeMAinChild}>
                                    <div style={customStyle.HomeTextContiner}>
                                        <div style={{width:'320px', margin:'15px'}}>
                                            <Sample setChild={this.setUserValue.bind(this)} reqFlag={true} name={'firstname'} label={'First Name'} value={this.state.fname} disable={false} style={customStyle.textFieldWrpAgent} length={25}  fieldType={'text'} errMsg={'Enter valid first name'} helperMsg={'First name required'}  parentDetails={{name:'firstname'}}></Sample>
                                        </div>
                                        <div style={{width:'320px', margin:'15px'}}>
                                            <Sample setChild={this.setUserValue.bind(this)} reqFlag={true} name={'lastname'} label={'Last Name'} value={this.state.lname} disable={false} style={customStyle.textFieldWrpAgent} length={25}  fieldType={'text'} errMsg={'Enter valid last name'} helperMsg={'Last name required'}  parentDetails={{name:'lastname'}}></Sample>
                                        </div>
                                    </div>
                                    <div style={customStyle.HomeTextContiner}>
                                        <div style={{width:'320px', margin:'15px'}}>
                                            <Sample setChild={this.setUserValue.bind(this)} reqFlag={true} name={'email'} label={'Email ID'} value={this.state.email} disable={false} style={customStyle.textFieldWrpAgent} length={50}  fieldType={'email'} errMsg={'Enter valid email Id'} helperMsg={'Email Id required'}  parentDetails={{name:'email'}}></Sample>
                                        </div>
                                        <div style={{width:'320px', margin:'15px'}}>
                                            <Sample setChild={this.setUserValue.bind(this)} reqFlag={true} name={'phone'} label={'Mobile No.'} value={this.state.phone} disable={false} style={customStyle.textFieldWrpAgent} length={10}  fieldType={'num'} errMsg={'Enter valid mobile no.'} helperMsg={'Mobile no. required'}  parentDetails={{name:'phone'}}></Sample>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </Modal.Body>
                        <Modal.Footer><NextButton style={{margin: '0', marginRight : '10px', width: '95px', height: '40px'}} disabled={this.state.userValid} onClick={() => this.addUser()}>ADD</NextButton>
                            <CustomButton style={{height : '40px'}} onClick={() => this.setState({modalShow:false, loaderShow : false})}>Cancel</CustomButton>
                        </Modal.Footer>
                    </Modal>*/}

                    {/* {this.state.showCommonErrorModal ? <CommonErrorModal showModal={true}/> : null} */}

            </div>
        );
    }
}

export default AgentTable;

export const getMuiTheme = () => createMuiTheme({
    overrides: {
        MUIDataTableBodyCell: {
            root: {
                // backgroundColor: "#f7f7f7",

                paddingLeft: '7px ',
                // width:'68%',

                // paddingRight:'10px',
                paddingBottom: '0px',
                paddingRight: '3px',
                paddingTop: '0px',
                fontSize: '14px',
                color: '#333333',
                // width:'138px'
                // minWidth:'155px',
                //     wordBreak: 'normal',
                // whiteSpace: 'nowrap',
                // textOverflow: 'ellipsis',
                // width:'150px',
                // fontWeight:'500'
                // lineHeight:'1.5px',
                // letterSpacing:'0.44px'
            },
            responsiveBase: {
                // root:{
                padding: '25px'
                // }
            },

        },
        MUIDataTable: { responsiveBase: { padding: '23px' } },
        MuiTableRow: {
            root: {
                '&$selected': {
                    backgroundColor: '#ebf2ff',
                },
                '&$hover': {
                    cursor: 'pointer'
                }

            }
        },

        MuiTypography: { h6: { fontWeight: 'bold', marginBottom: '-28px', marginLeft: '-10px', marginRight: '50px' } },
        MuiToolbar: { gutters: { paddingLeft: '5px' }, regular: { minHeight: '0px' } },
        // MuiPaper:{root:{padding:'30px'}},
        // MuiToolbar:{},
        MuiTableCell: { root: { borderBottom: '1px solid rgb(0,0,0)', padding: '8px' }, footer: { borderBottom: 'none' } },
        MuiDataTablePagination: { borderBottom: 'none' },
        MUIDataTableHeadCell: {
            root: {
                background: 'blue',
                fontWeight: 'bold',
                // padding:'5px'
                paddingLeft: '15px'
            },

            MUIDataTable: {

                responsiveBase: {
                    // root:{
                    padding: '23px'
                    // }
                },
                // responsiveScroll: {
                //     maxHeight: '380px',

                // },


            },


        },
    }
})