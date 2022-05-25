import React, { Component } from "react";
import Header from "../Headers/Header";
import Grid from "@material-ui/core/Grid";
import AccordonCommon from "../../CommonScreens/AccordonCommon";
import Loader from "../../loader";
import { createMuiTheme, withStyles, MuiThemeProvider } from "@material-ui/core/styles";
import MUIDataTable from "mui-datatables";
import { FormControl, InputLabel, Select, TextField, Typography } from "@material-ui/core";
import customStyle from "../../../Assets/CSS/stylesheet_UHS";
import MenuItem from "@material-ui/core/MenuItem";
import { KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import SearchIcon from "@material-ui/icons/Search";
import AddIcon from "@material-ui/icons/Add";
import RefreshIcon from "@material-ui/icons/Refresh";
import moment from "moment";
import axios from 'axios';
import configurations from "../../../configurations";
import Button from "@material-ui/core/Button";
import styles from "../../../Assets/CSS/stylesheet_UHS";
import Fab from "@material-ui/core/Fab";
import { Modal } from "react-bootstrap";
import Sample from "../../CommonScreens/sampleTextField";
import CommonDropDwn from "../../CommonScreens/CommonDropDwn_1.js";
import { getMuiTheme } from '../../CommonScreens/AgentTable';
import PopupState, { bindMenu, bindTrigger } from "material-ui-popup-state";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Menu from "@material-ui/core/Menu";
import Footer from "../../CommonScreens/Footer";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import Checkbox from '@material-ui/core/Checkbox';
import Tooltip from "@material-ui/core/Tooltip";

var convert = require('xml-js');

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

formData.append("columns[3].data", "companyName");
formData.append("columns[3].name", "");
formData.append("columns[3].searchable", "true");
formData.append("columns[3].orderable", "true");
formData.append("columns[3].search.regex", "false");
formData.append("columns[3].search.value", "");


formData.append("order[0].column", "0");
formData.append("order[0].dir", "desc");
formData.append("search.regex", "false");
formData.append("search.value", "");

let requestOptions = {
    method: 'POST',
    body: formData,
};

const CustomButton = withStyles(
    customStyle.viewBtn
)(Button);
const CrudButton = withStyles(
    // styles.crudBtnAgent,
    styles.crudBtnAgentNetwell,

)(Fab);

const NextButton = withStyles(
    customStyle.doneNetwellBtn
)(Button);

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


class Employer extends Component {

    constructor(props) {
        super(props);

        let USER_DATA = JSON.parse(sessionStorage.getItem('USER_DATA'));
        const today = new Date();
        const tomorrow = new Date(today);
        if (USER_DATA.clientId.toString() === '6548' || USER_DATA.clientId.toString() === '4367' || USER_DATA.clientId.toString() === '5540' || USER_DATA.clientId.toString() === '4376'|| USER_DATA.clientId.toString() === '5541' || USER_DATA.clientId.toString() === '4377' ) {
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

        this.state = {
            employerList: [],
            count: 0,
            USER_DATA: USER_DATA,
            loaderShow: false,
            targetDate: null,
            rowIndex: 0,
            addEmployerModal: false,
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
            divisionList: [],
            industryList: [],
            codeTitleList: [],
            codeList: [],
            countryCode: '',
            msgModal: false,
            errMsg: '',
            employerDetailsObj: [],
            disableSubmit: true,
            employerEdit: false,
            searchTypeValue: '',
            searchShow: false,
            searchText: '',
            rowsPerPage: 10,
            effectiveDate: new Date(tomorrow),
            dateErr: false,
            birthDtFocus: false,
            birthDt: false,
            adminPhone: '',
            adminFirstName: '',
            adminLastName: '',
            adminEmail: '',
            adminCountryCode: '',
            empid: '',
            page: 0,
            copyEmpCheck: false,
        }
    }

    componentDidMount() {
        this.setState({
            loaderShow: true
        });
        this.getEmployerData();
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
    }

    getEmployerData = () => {
        fetch(process.env.REACT_APP_BASE_URL + '/employer/getEmployerByBrokerId/' + this.state.USER_DATA.agentId, requestOptions)
            .then(response => response.json())
            .then(response => {
                if (response.response && response.response.data) {
                    this.setState({
                        employerList: response.response.data,
                        count: response.response.recordsFiltered,
                        loaderShow: false
                    })
                } else {
                    this.setState({ loaderShow: false })
                }
            }).catch((err) => {

            })
    }

    changePage = (page, rows) => {
        this.setState({
            loaderShow: true
        });
        if (page !== undefined && rows) {
            let nextPage = (page * rows)
            formData.set("start", nextPage.toString());
            formData.set("length", rows.toString());
            fetch(process.env.REACT_APP_BASE_URL + '/employer/getEmployerByBrokerId/' + this.state.USER_DATA.agentId, requestOptions)
                .then(response => response.json())
                .then(data => {
                    if (data.response && data.response.data) {
                        this.setState({ employerList: data.response.data, rowsPerPage: rows, loaderShow: false, page: page })
                    } else {
                        this.setState({ loaderShow: false })
                    }
                });
        }
    }
    /* ========================== server side sorting logic================= */
    sort = (changedColumn, order) => {

        formData.set("start", "0");
        formData.set("order[0].column", changedColumn);
        formData.set("order[0].dir", order);
        fetch(configurations.baseUrl + '/employer/getEmployerByBrokerId/' + this.state.USER_DATA.agentId, requestOptions)
            .then(response => response.json())
            .then(data => {
                if (data.response && data.response.data) {
                    this.setState({ employerList: data.response.data, count: data.response.recordsFiltered, loaderShow: false })
                } else {
                    this.setState({ loaderShow: false })
                }
            });
    }

    addEmployerModal = () => {
        this.setState({
            loaderShow: true
        });
        axios.get('https://ipapi.co/json/').then((response) => {
            if (response && response.data) {
                let data = response.data;
                this.setState({
                    countryCode: data.country_calling_code,
                    adminCountryCode: data.country_calling_code
                });
            }
        }).catch((error) => {
            console.log(error);
        });
        const today = new Date();
        const tomorrow = new Date(today);
        if (this.state.USER_DATA.clientId.toString() === '6548' || this.state.USER_DATA.clientId.toString() === '4367' || this.state.USER_DATA.clientId.toString() === '5540' || this.state.USER_DATA.clientId.toString() === '4376' || this.state.USER_DATA.clientId.toString() === '5541' || this.state.USER_DATA.clientId.toString() === '4377') {
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

            addEmployerModal: true,
            loaderShow: false,
            errMsg: '',
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
            adminPhone: '',
            adminFirstName: '',
            adminLastName: '',
            adminEmail: '',
            empid: '',
            effectiveDate: new Date(tomorrow)
        });
        /*let obj = {
            "searchKey":"division",
            "searchValue": ""
        }
        axios.post(process.env.REACT_APP_BASE_URL + '/employer/getSIC', obj )
            .then(response => {
                let divisionList =[];
                for(let i=0; i<response.data.response.length; i++){
                    divisionList.push({key : response.data.response[i].division, value : response.data.response[i].division});
                }


            });*/
    }

    addEmployer = () => {
        this.setState({
            loaderShow: true
        })
        let URL = process.env.REACT_APP_BASE_URL + '/employer/addEmployer';


        let obj = {
            "companyName": this.state.compName,
            "firstName": this.state.firstName,
            "lastName": this.state.lastName,
            "jobTitle": this.state.jobTitle,
            "phone":this.state.phone?this.state.countryCode + this.state.phone:'',
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
            adminPhone: this.state.adminPhone?this.state.adminCountryCode + this.state.adminPhone:'',
            adminEmail: this.state.adminEmail,
            email: this.state.workEmail
        }

        if (this.state.employerEdit) {
            URL = process.env.REACT_APP_BASE_URL + '/employer/updateEmployer';
            obj.empid = this.state.empid
        }

        axios.post(URL, obj)
            .then(response => {
                let errMsg = '';
                if (response.data.code === 200) {
                    errMsg = this.state.employerEdit ? 'Employer Updated Successfully !' : 'Employer Added Successfully !'
                } else {
                    errMsg = response.data.message
                }
                let today = new Date();
                let tomorrow = new Date(today);
                if (this.state.USER_DATA.clientId.toString() === '6548' || this.state.USER_DATA.clientId.toString() === '4367' || this.state.USER_DATA.clientId.toString() === '5540' || this.state.USER_DATA.clientId.toString() === '4376'|| this.state.USER_DATA.clientId.toString() === '5541' || this.state.USER_DATA.clientId.toString() === '4377') {
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
                    msgModal: true,
                    addEmployerModal: false,
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
                    empid: '',
                    copyEmpCheck: false,
                });
                this.getEmployerData();
            })

    }

    checkEnable = () => {
        const { compName, zipCode, state, city, street, division, industry, codeTitle, code, firstName, lastName, workEmail, jobTitle, phone, adminPhone, adminFirstName, adminLastName, adminEmail } = this.state;
        if (compName !== '' && zipCode !== '' && state !== '' && city !== '' && firstName !== '' && lastName !== '' && workEmail !== ''  && adminFirstName !== '' && adminLastName !== '' && adminEmail !== '') {
            this.setState({
                disableSubmit: false
            })
        } else {
            this.setState({
                disableSubmit: true
            })
        }
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
        if (this.state.USER_DATA.clientId.toString() === '6548' || this.state.USER_DATA.clientId.toString() === '4367' || this.state.USER_DATA.clientId.toString() === '5540' || this.state.USER_DATA.clientId.toString() === '4376') {
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
            addEmployerModal: false,
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
            employerEdit: false,
            // empid: '',
            // copyEmpCheck: false
        }, () => this.checkEnable())
    }

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

    handleZipCode = (zipcode, parent) => {
        this.setState({
            loaderShow: true
        });
        let url = `https://secure.shippingapis.com/ShippingAPI.dll?API=CityStateLookup&XML=<CityStateLookupRequest USERID="935USTGL7449"><ZipCode ID="0"><Zip5>${zipcode}</Zip5></ZipCode></CityStateLookupRequest>`

        axios.get(url)
            .then(response => {
                var result2 = convert.xml2json(response.data, { compact: false, spaces: 4 });
                if (JSON.parse(result2).elements[0].elements[0].elements[0].elements[2]) {
                    var evt = new CustomEvent('zip', { detail: { zipcode: zipcode, flag: true, errMsg: "Enter valid zip code", parentDetails: parent } });
                    window.dispatchEvent(evt);
                    this.state.city = '';
                    this.state.state = '';
                    this.state.country = '';
                    this.setState({
                        refresh: true,
                        loaderShow: false
                    }, () => { this.checkEnable() });

                } else {
                    axios.get(process.env.REACT_APP_enrollment_base_url + '/plan/validateBlackListState/' + JSON.parse(result2).elements[0].elements[0].elements[2].elements[0].text)
                        .then(response => {
                            this.setState({
                                loaderShow: false
                            });

                            if (!response.data.response) {
                                this.state.zipCode = JSON.parse(result2).elements[0].elements[0].elements[0].elements[0].text;
                                this.state.state = JSON.parse(result2).elements[0].elements[0].elements[2].elements[0].text;
                                this.state.city = JSON.parse(result2).elements[0].elements[0].elements[1].elements[0].text;
                                this.state.country = 'US';
                                this.setState({
                                    refresh: true,
                                    loaderShow: false
                                }, () => { this.checkEnable() });
                            } else {
                                this.state.state = '';
                                this.state.city = '';
                                this.state.country = '';
                                var evt = new CustomEvent('zip', { detail: { zipcode: zipcode, flag: true, errMsg: 'We’re sorry. At this time, we are not offering the Universal HealthShare program in this zip code', parentDetails: parent } });
                                window.dispatchEvent(evt);
                                this.setState({
                                    refresh: true,
                                    loaderShow: false
                                }, () => { this.checkEnable() });
                            }
                        });
                }
            })
            .catch(error => {
                var evt = new CustomEvent('zip', { detail: { zipcode: zipcode, flag: true, errMsg: "An unexpected error occurred. Please try again later.", parentDetails: parent } });
                window.dispatchEvent(evt);
                this.state.city = '';
                this.state.state = '';
                this.state.country = '';
                this.setState({
                    refresh: true,
                    loaderShow: false
                }, () => { this.checkEnable() });
            })
    };

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

    menuOptions = [
        "Open",
        "View Employer",
        "Edit Employer"
    ];

    columns = [
        // { label: "User Id", name: "id" },
        {
            label: "Date Added", name: "createdDate", options: {
                sort: true,
                customBodyRenderLite: (index) => {
                    // this.state.dateAdded= (this.state.data[index].createdDate).format('yy-mm-dd');
                    if (this.state.employerList && this.state.employerList[index] && this.state.employerList[index].createdDate) {
                        return moment(this.state.employerList[index].createdDate).format('MMMM DD, YYYY');
                    } else {
                        return "NA";
                    }
                }
            }
        },
        {
            label: "Company Name", name: "companyName", options: {
                sort: true,
                customBodyRenderLite: (index) => {
                    if (this.state.employerList && this.state.employerList[index] && this.state.employerList[index].companyName) {
                        return this.state.employerList[index].companyName;
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
                                        <IconButton {...bindTrigger(popupState)}>
                                            <MoreVertIcon />
                                        </IconButton>
                                        <Menu {...bindMenu(popupState)} onClick={popupState.close}
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
                                                this.state.employerList && this.state.employerList[dataIndex] &&
                                                <div>
                                                    {
                                                        this.menuOptions.map((option, index) => {
                                                            return <MenuItem key={index} value='view' onClick={(e) => this.selectOption(index, dataIndex)}  >{option}</MenuItem>
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

    selectOption = (index, dataIndex) => {
        if (index === 0) {  //open employee
            console.log(window.location);
                window.location.replace(window.location.origin + '/manage-prospects?empid=' + this.state.employerList[dataIndex].empid)
            
        }
        if (index === 1) {
            let obj = [
                {
                    key: 'Company Name',
                    value: this.state.employerList[dataIndex].companyName
                },
                {
                    key: 'Name',
                    value: this.state.employerList[dataIndex].firstName + ' ' + this.state.employerList[dataIndex].lastName
                },
                {
                    key: 'Email id',
                    value: this.state.employerList[dataIndex].email
                },
                {
                    key: 'Phone Number',
                    value: this.state.employerList[dataIndex].phone?this.state.employerList[dataIndex].phone:'NA'
                },
                {
                    key: 'Zip Code',
                    value: this.state.employerList[dataIndex].zip
                },
                {
                    key: 'State',
                    value: this.state.employerList[dataIndex].state
                },
                {
                    key: 'Street, Suit',
                    value: this.state.employerList[dataIndex].street
                },
                {
                    key: 'Division',
                    value: this.state.employerList[dataIndex].division
                },
                {
                    key: 'Industry',
                    value: this.state.employerList[dataIndex].industry
                },
                {
                    key: 'SIC Code Title',
                    value: this.state.employerList[dataIndex].codeTitle
                },
                {
                    key: 'SIC Code',
                    value: this.state.employerList[dataIndex].code
                },
                {
                    key: "Effective Date",
                    value: this.state.employerList[dataIndex].effective_date ? moment(this.state.employerList[dataIndex].effective_date).format('MMMM DD, YYYY') : null
                },
                {
                    key: 'Administrator Name',
                    value: this.state.employerList[dataIndex].adminFirstName ? this.state.employerList[dataIndex].adminFirstName + ' ' + this.state.employerList[dataIndex].adminLastName : 'NA'
                },
                {
                    key: 'Administrator Email Id',
                    value: this.state.employerList[dataIndex].adminEmail ? this.state.employerList[dataIndex].adminEmail : 'NA'
                },
                {
                    key: 'Administrator Phone Number',
                    value: this.state.employerList[dataIndex].adminPhone ? this.state.employerList[dataIndex].adminPhone : 'NA'
                }
            ]



            this.setState({
                employerDetailsObj: obj,
                viewEmployerModal: true
            })
        } 
        if (index === 2) {
            const { companyName, zip, state, city, street, division, industry, codeTitle, code, firstName, lastName, email, jobTitle, phone, effective_date, adminPhone, adminFirstName, adminLastName, adminEmail, empid } = this.state.employerList[dataIndex];
            let obj = {
                "searchKey": "industry",
                "searchValue": division
            }
            this.getSICDetails(obj);
            let newObj = {
                "searchKey": "codeTitle",
                "searchValue": industry
            }
            this.getSICDetails(newObj);
            let phoneNumber = '';
            let countryCode = '';

            if (phone && phone.length>0){
                if (phone.length === 13) {
                    countryCode = phone.substr(0, 3);
                    phoneNumber = phone.substr(3);
                } else {
                    countryCode = phone.substr(0, 2);
                    phoneNumber = phone.substr(2);
                }
            }else{
                axios.get('https://ipapi.co/json/').then((response) => {
                    if (response && response.data) {
                        let data = response.data;
                        countryCode = data.country_calling_code;
                        phoneNumber = phone;
                    }
                }).catch((error) => {
                    console.log(error);
                });
            }


            let adminPhoneNumber = '';
            let adminCountryCode = '';
            if (adminPhone) {
                if (adminPhone.length === 13) {
                    adminCountryCode = adminPhone.substr(0, 3);
                    adminPhoneNumber = adminPhone.substr(3);
                } else {
                    adminCountryCode = adminPhone.substr(0, 2);
                    adminPhoneNumber = adminPhone.substr(2);
                }
                this.setState({
                    compName: companyName,
                    zipCode: zip,
                    state: state,
                    city: city,
                    street: street,
                    division: division,
                    industry: industry,
                    codeTitle: codeTitle,
                    code: code,
                    firstName: firstName,
                    lastName: lastName,
                    workEmail: email,
                    jobTitle: jobTitle,
                    phone: phoneNumber,
                    countryCode: countryCode,
                    effectiveDate: effective_date ? new Date(effective_date) : effective_date,
                    employerEdit: true,
                    addEmployerModal: true,
                    adminPhone: adminPhoneNumber,
                    adminFirstName: adminFirstName,
                    adminLastName: adminLastName,
                    adminEmail: adminEmail,
                    adminCountryCode: adminCountryCode,
                    empid: empid
                })
            } else {
                axios.get('https://ipapi.co/json/').then((response) => {
                    if (response && response.data) {
                        let data = response.data;
                        this.setState({
                            compName: companyName,
                            zipCode: zip,
                            state: state,
                            city: city,
                            street: street,
                            division: division,
                            industry: industry,
                            codeTitle: codeTitle,
                            code: code,
                            firstName: firstName,
                            lastName: lastName,
                            workEmail: email,
                            jobTitle: jobTitle,
                            phone: phoneNumber,
                            countryCode: countryCode,
                            effectiveDate: effective_date ? new Date(effective_date) : effective_date,
                            employerEdit: true,
                            addEmployerModal: true,
                            adminPhone: adminPhoneNumber,
                            adminFirstName: adminFirstName,
                            adminLastName: adminLastName,
                            adminEmail: adminEmail,
                            adminCountryCode: data.country_calling_code,
                            empid: empid
                        })
                    }
                }).catch((error) => {
                    console.log(error);
                });
            }
        }
    }

    handleChangeSearchType(event) {
        let value = event.target.value
        if (value === '' || value === null) {
            this.setState({ searchShow: true, searchText: '', page: 0 }, () => {
                this.searchRecord();
            });
        } else {
            if (this.state.searchTypeValue === '0') {
                formData.set("columns[1].search.value", "");
            } else if (this.state.searchTypeValue === '1') {
                formData.set("columns[3].search.value", "");
            }
            this.setState({ searchTypeValue: value, searchShow: false, searchText: '', page: 0 }, () => {
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

    searchRecord = () => {
        this.setState({
            loaderShow: true
        });

        if (this.state.searchTypeValue === '0') { //Date search
            formData.set("start", "0");
            formData.set("columns[1].search.value", this.state.searchText);

            fetch(configurations.baseUrl + '/employer/getEmployerByBrokerId/' + this.state.USER_DATA.agentId, requestOptions)
                .then(response => response.json())
                .then(data => {
                    if (data.response && data.response.data) {
                        this.setState({ employerList: data.response.data, count: data.response.recordsFiltered, statusValue: '', loaderShow: false })
                    } else {
                        this.setState({ loaderShow: false });
                    }

                });
        } else if (this.state.searchTypeValue === '1') { //Company name search
            formData.set("start", "0");
            formData.set("length", this.state.rowsPerPage.toString());
            formData.set("columns[3].search.value", this.state.searchText);

            fetch(configurations.baseUrl + '/employer/getEmployerByBrokerId/' + this.state.USER_DATA.agentId, requestOptions)
                .then(response => response.json())
                .then(data => {
                    if (data.response && data.response.data) {
                        this.setState({ employerList: data.response.data, count: data.response.recordsFiltered, targetDate: null, statusValue: '', loaderShow: false })
                    } else {
                        this.setState({ loaderShow: false });
                    }

                });
        }
    }

    handleDate(event) {
        this.setState({
            targetDate: moment(event).format('YYYY') + '-' + moment(event).format('MM') + '-' + moment(event).format('DD'),
            searchText: moment(event).format('YYYY') + '-' + moment(event).format('MM') + '-' + moment(event).format('DD'),
        });
    }

    refreshEmployer = () => {
        this.setState({
            loaderShow: true
        });
        this.getEmployerData();
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

    disableWeekends(date, clientId) {
        // return (clientId.toString() === '6548' || clientId.toString() === '4367' || clientId.toString() === '5540' || clientId.toString() === '4376'|| clientId.toString() === '5541' || clientId.toString() === '4377') ? (date.getDate() === 1 ? false : true) : false;
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

    render() {

        const options = {
            selectableRows: false,
            filter: false,
            selectableRowsHeader: false,
            count: this.state.count,
            rowsPerPage: this.state.rowsPerPage,
            search: false,
            serverSide: true,
            download: false,
            viewColumns: false,
            print: false,
            fixedHeader: true,
            page: this.state.page,
            onTableChange: (action, tableState) => {
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
                }
                this.sort(columnIndex, order);
            },
            onRowSelectionChange: (currentRowsSelected, allRowsSelected, rowsSelected) => {
                this.state.rowIndex = rowsSelected;
            },
            onCellClick: (cellIndex, rowIndex, rowMeta) => {
                console.log('cellIndex======', cellIndex);
                console.log('rowIndex======', rowIndex.colIndex);

                if (rowIndex.colIndex !== 3) {

                    this.setState({
                        loaderShow: true
                    });
                    console.log(window.location);
                    window.location.replace(window.location.origin + '/manage-prospects?empid=' + this.state.employerList[rowIndex.dataIndex].empid)
                }
            },

            // onRowClick: (rowData, rowMeta) => {
            //     console.log('========== onRowClick ============');
            //     console.log(rowData);
            //     console.log(rowMeta.dataIndex);
            //     console.log(this.state.employerList[rowMeta.dataIndex].empid);
            //     if(this.state.cellFlag==false || this.state.cellFlag=='false'){
            //     this.setState({
            //         loaderShow : true
            //     });
            //     console.log(window.location);
            //     window.location.replace( window.location.origin  + '/manage-prospects?empid=' + this.state.employerList[rowMeta.dataIndex].empid)
            // }
            // }

        };

        let myDate = moment(this.state.effectiveDate).format('MM') + '/' + moment(this.state.effectiveDate).format('DD') + '/' + moment(this.state.effectiveDate).format('YYYY');
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        let futureTomarow = new Date(today);
        //const futureDate = this.state.USER_DATA.clientId.toString() === '6548' ? futureTomarow.setDate(futureTomarow.getDate() + 45) : futureTomarow.setDate(futureTomarow.getDate() + 90);
        let futureDate;
        if (this.state.USER_DATA.clientId.toString() === '6548' || this.state.USER_DATA.clientId.toString() === '4367' || this.state.USER_DATA.clientId.toString() === '5540' || this.state.USER_DATA.clientId.toString() === '4376' || this.state.USER_DATA.clientId.toString() === '5541' || this.state.USER_DATA.clientId.toString() === '4377')  {
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
                <Header agentId={this.state.USER_DATA.agentId} clientId={this.state.USER_DATA.clientId} associationId={this.state.USER_DATA.associationId} clientName={this.state.USER_DATA.clientName} bottomMargin={'0px'}></Header>
                <div style={{ flexGrow: 1 }}>
                    <Grid container direction="row" style={{ marginBottom: '30px', testAlign: 'center' }}>
                        {/* <Grid xs={12} sm={12} item={true} style={{ backgroundColor: '#41b5c2', color: '#ffffff', fontWeight: 'bold', height: '40px', fontSize: '16px', padding: '10px' }}>
                            <div style={{ cursor: 'pointer', width: '7%' }} onClick={() => window.location.replace('/')}>
                                <ArrowBackIcon /> BACK
                            </div>
                        </Grid> */}
                    </Grid>
                </div>
                <div style={{ flexGrow: 1, paddingLeft: '10px' }}>
                    <Grid container spacing={2} justify='center'>
                        <Grid xs={12} sm={8} item={true} style={{}}>
                            <div style={{ height: '100%', backgroundColor: '#ffffff' }}>
                                <div>
                                    {
                                        this.state.loaderShow ? <Loader></Loader> : ''
                                    }
                                    <div style={{ flexGrow: 1 }}>
                                        <Grid container style={{ padding: '10px' }}>
                                            <Grid item xs={3} sm={3}>
                                                <Typography style={{ fontSize: '21px', fontWeight: 'bold', padding: '10px' }}> Active Employers</Typography>
                                            </Grid>
                                            <Grid item xs={3} sm={3}>
                                                <FormControl style={customStyle.formControlStyle}>
                                                    <InputLabel style={{ textAlign: 'left' }}
                                                    >Search By</InputLabel>
                                                    <Select
                                                        label="Search By"
                                                        name="name"
                                                        /*style={customStyle.searchByStyle}*/
                                                        value={this.state.searchTypeValue}
                                                        onChange={(event) => this.handleChangeSearchType(event)}
                                                    >
                                                        <MenuItem value='0'>Date Added</MenuItem>
                                                        <MenuItem value='1'>Company Name</MenuItem>
                                                    </Select>
                                                </FormControl>
                                            </Grid>
                                            <Grid item xs={3} sm={3} > {/*style={{marginLeft:'-10px'}}*/}

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
                                                                /* style={{width:'100%',marginTop:'-9px',marginLeft:'9%',marginRight:'2%',padding:'0px'}}*/
                                                                inputProps={{
                                                                    style: {
                                                                        fontSize: '12.8px', fontFamily: "Roboto, Arial, Helvetica, sans-serif", marginTop: '3px',
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
                                                        <TextField style={{ marginTop: '15px' }}
                                                            value={this.state.searchText}
                                                            disabled={this.state.searchShow}
                                                            onChange={(event) => this.setSearch(event)}></TextField>

                                                }

                                            </Grid>
                                            <Grid item xs={1} sm={1}>
                                            <Tooltip
                                                    title="Search"
                                                    placement="bottom"
                                                >
                                                <CrudButton color="secondary" style={{ marginTop: '7px', boxShadow: 'none', width: '46px', height: '46px' }} aria-label="search" disabled={this.state.searchText == '' || this.state.targetDate == ''} onClick={() => this.searchRecord()} >
                                                    <SearchIcon />
                                                </CrudButton>
                                                </Tooltip>
                                            </Grid>
                                            <Grid item xs={1} sm={1}>
                                            <Tooltip
                                                    title="Add Employer"
                                                    placement="bottom"
                                                >
                                                <CrudButton color="primary" aria-label="add" style={{ width: '46px', height: '46px', boxShadow: 'none', marginTop: '7px', marginLeft: '3%', backgroundColor: '#4782c4' }} onClick={() => this.addEmployerModal()} >
                                                    <AddIcon />
                                                </CrudButton>
                                                </Tooltip>
                                            </Grid>
                                            <Grid item xs={1} sm={1}>
                                            <Tooltip
                                                title="Refresh"
                                                placement="bottom"
                                                >
                                                <CrudButton style={{ boxShadow: 'none', width: '46px', height: '46px', marginTop: '7px', backgroundColor: '#4782c4' }} onClick={() => { this.refreshEmployer() }}><RefreshIcon /></CrudButton>
                                                </Tooltip>
                                            </Grid>
                                            {/*</Grid>*/}

                                        </Grid>
                                    </div>
                                    <MuiThemeProvider theme={getMuiTheme()}>
                                        <MUIDataTable
                                            /*title={' Active Employers'}*/
                                            data={this.state.employerList}
                                            columns={this.columns}
                                            options={options}
                                        />
                                    </MuiThemeProvider>
                                </div>
                            </div>
                        </Grid>
                        <Grid xs={12} sm={4} item={true}>
                            <AccordonCommon clientId={this.state.USER_DATA.clientId} clientName={this.state.USER_DATA.clientName} agentId={this.state.USER_DATA.agentId} disable={true} forHouseholds={false} />
                        </Grid>
                    </Grid>
                </div>

                <Modal size="lg" show={this.state.addEmployerModal} onHide={(event) => this.closeEmployerModal()} centered backdrop='static'>
                    <Modal.Header style={customStyle.modal_header} closeButton>
                        <Modal.Title>{this.state.employerEdit ? "Edit Employer" : "Add Employer"}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={{ height: '330px', overflow: 'auto' }}>
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
                                    <Sample setChild={this.setEmpValue.bind(this)} reqFlag={false} name={'phoenNumber'} label={'Phone Number'} value={this.state.phone} disable={false} style={customStyle.textFieldWrpAgent} length={10} fieldType={'phone'} errMsg={'Enter valid phone number'}  parentDetails={{ name: 'phone' }}></Sample>
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
                                    <Sample setChild={this.setEmpValue.bind(this)} reqFlag={false} name={'phoneNumber'} label={'Phone Number'} value={this.state.adminPhone} disable={false} style={customStyle.textFieldWrpAgent} length={10} fieldType={'phone'} errMsg={'Enter valid phone number'}  parentDetails={{ name: 'adminPhone' }}></Sample>
                                </Grid>
                            </Grid>

                        </div>

                    </Modal.Body>
                    <Modal.Footer>
                        <NextButton style={{ margin: '0',backgroundColor: '#4782c4', marginRight: '10px', width: '95px', height: '40px' }} disabled={this.state.disableSubmit} onClick={() => this.addEmployer()}>{this.state.employerEdit ? "UPDATE" : "ADD"}</NextButton>
                        <CustomButton style={{ height: '40px',backgroundColor: '#4782c4',color:'ffffff' }} onClick={() => this.closeEmployerModal()}>Cancel</CustomButton>
                    </Modal.Footer>
                </Modal>

                <Modal size="sm" show={this.state.msgModal} onHide={(event) => this.setState({ msgModal: false, loaderShow: false })} centered backdrop='static'>
                    <Modal.Header style={styles.modal_header} closeButton>
                        <Modal.Title>Message</Modal.Title>
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
                        <CustomButton style={{ height: '40px',backgroundColor: '#4782c4' }} onClick={() => this.setState({ msgModal: false, loaderShow: false })}>Ok</CustomButton>
                    </Modal.Footer>
                </Modal>

                <Modal size="lg" show={this.state.viewEmployerModal} onHide={(event) => this.setState({ viewEmployerModal: false, loaderShow: false, employerDetailsObj: [] })} centered backdrop='static'>
                    <Modal.Header style={styles.modal_header} closeButton>
                        <Modal.Title>View Details</Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={{ padding: '15px', height: '330px', overflow: 'auto' }}>
                        {
                            this.state.loaderShow ? <Loader></Loader> : ''
                        }
                        <div style={{ flexGrow: 1 }}>
                            <Grid container spacing={2} justify="center">
                                <Grid item xs={12} sm={12}>
                                    {
                                        this.state.employerDetailsObj.map((row, index, key) => (

                                            <div key={index} style={{ display: 'flex', borderBottom: '1px solid rgba(0, 0, 0, 0.12)', padding: '10px' }}>
                                                <Grid item xs={4} key={index} sm={4} md={4} lg={3}>
                                                    {row.key}
                                                </Grid>
                                                <Grid item xs={7} sm={7} md={7} lg={7} key={index + 'gd'} style={{ fontWeight: 'bold' }}>
                                                    {row.value}
                                                </Grid>
                                            </div>
                                        ))
                                    }
                                </Grid>
                            </Grid>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <CustomButton style={{ height: '40px',backgroundColor: '#4782c4' }} onClick={() => this.setState({ viewEmployerModal: false, loaderShow: false, employerDetailsObj: [] })}>Ok</CustomButton>
                    </Modal.Footer>
                </Modal>

                <div style={{ fontSize: '11px', marginTop: '15px', fontFamily: "Roboto, Arial, Helvetica, sans-serif" }}>
                    <Footer />
                </div>
            </div>
        )
    }
}

export default Employer;