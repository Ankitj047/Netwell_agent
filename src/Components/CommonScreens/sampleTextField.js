import React, {Component} from 'react';
import TextField from '@material-ui/core/TextField';
import { withStyles} from '@material-ui/core/styles';
import InputAdornment from '@material-ui/core/InputAdornment';
import AccountCircle from '@material-ui/icons/AccountCircle';
import customStyle from '../../Assets/CSS/stylesheet_UHS'

const CustomTextField = withStyles(
    customStyle.textField,
)(TextField);

class sampleTextField extends Component{
    x= {};
    constructor(props) {
        super(props);
        this.state = {value:'', errorText : this.props.helperMsg, isValid:false, requiredFlag : this.props.reqFlag}
    }

    componentDidMount() {
        window.addEventListener('zip',this.handleZip);
        window.addEventListener('feet',this.setHeight.bind(this));
        window.addEventListener('feet_eligibility',this.setHeightInEligibility.bind(this));
        window.addEventListener('ageValid',this.validAge);
        window.addEventListener('SecurityNumber',this.checkSSN);
        window.addEventListener('payment',this.checkPamentDetails);
    }

    setHeight=(e)=>{
        if(e.detail.flag){
            if(this.props.label === 'Height (feet)' || this.props.label === 'Height (inches)' ) {
                this.setState({errorText : this.props.errMsg, isValid : true});
            }
        } else {
            if(this.props.label === 'Height (feet)' || this.props.label === 'Height (inches)' ) {
                this.setState({errorText : '', isValid : false});
            }
        }
    }

    checkPamentDetails = (e) =>{
        if(e.detail.type === 'CARD_NO'){
            if(this.props.label === 'Card Number' ){
                this.setState({errorText : e.detail.errMsg, isValid : true});
            }
        } else if(e.detail.type === 'ROUTING_NO'){
            if(this.props.label === 'Routing Number' ){
                this.setState({errorText : e.detail.errMsg, isValid : true});
            }
        }
    };

    setHeightInEligibility = (e) =>{

        if(e.detail.flag){
            if( (this.props.name === 'Height_Feet' + e.detail.index  && e.detail.index === e.detail.parentData.index ) || (this.props.name === 'Height_Inch' + e.detail.index && e.detail.index === e.detail.parentData.index)) {
                this.setState({errorText : this.props.errMsg, isValid : true});
            }
        } else {
            if((this.props.name === 'Height_Feet'+ e.detail.index && e.detail.index === e.detail.parentData.index) || (this.props.name === 'Height_Inch' + e.detail.index && e.detail.index === e.detail.parentData.index)) {
                this.setState({errorText : '', isValid : false});
            }
        }
    }

    validAge=(e)=>{
        if(this.props.label === 'Age' && this.props.parentDetails.index === e.detail.index){
            this.setState({errorText:this.props.errMsg,isValid :e.detail.flag});
        }
    }

    handleZip = (e) =>{
        if(this.props.label === 'Zip Code' && e.detail.flag){
            let errMsg = this.props.errMsg;
            this.setState({errorText:e.detail.errMsg,isValid : true,value:e.detail.zipcode});
            this.props.setChild(e.detail.zipcode,false, e.detail.parentDetails);
        }else{
            this.setState({errorText:this.props.errMsg,isValid : false});
        }
    }

    checkSSN = (e) => {
        if(this.props.label === 'Social Security Number' && e.detail.ssnExist){
            this.setState({errorText : 'This SSN is already registered in our system', isValid : true});
            this.props.setChild(e.detail.memberSsnno, false, {name:'memberSsnno'});
        }
    }

    componentWillUnmount() {
        this.state.value='';
    }


    onChange=(event)=>{
        event.preventDefault();
        let txtVal = event.target.value;
        txtVal=event.target.value.trimLeft();
        if(txtVal !== ""){
            switch (this.props.fieldType) {
                case 'text' :
                {
                    if (txtVal.match(/^([a-zA-Z])[a-zA-Z-_]*$/)) {
                        this.setState({isValid : false,value:txtVal});
                        this.props.setChild(txtVal,true,this.props.parentDetails);
                        break;
                    } else {
                        this.setState({errorText:this.props.errMsg,isValid : true,value:txtVal});
                        this.props.setChild(txtVal,false,this.props.parentDetails);
                        break;
                    }
                }
                case 'num' :
                {
                    if (txtVal.match(/^[0-9]*$/)) {
                        if(this.props.parentDetails.label === 'Age' || this.props.parentDetails.name === 'ERInPast' || this.props.parentDetails.name === 'hospitalizedPast'){
                            this.setState({isValid : false,value:txtVal});
                            this.props.setChild(txtVal,true,this.props.parentDetails);
                            break;
                        } else {
                            if (txtVal > 0) {
                                this.setState({errorText: '', isValid: false, value: txtVal});
                                this.props.setChild(txtVal, true, this.props.parentDetails);
                                break;
                            } else {
                                this.setState({errorText: this.props.errMsg, isValid: true, value: txtVal});
                                this.props.setChild(txtVal, false, this.props.parentDetails);
                                break;
                            }
                        }
                    } else {
                        this.setState({errorText:this.props.errMsg,isValid : true,value:txtVal});
                        this.props.setChild(txtVal,false,this.props.parentDetails);
                        break;
                    }   
                }
                case 'bank_name' : {
                    if (txtVal.match(/^[a-zA-Z ]{1,120}$/)) {
                        this.setState({ errorText: '', isValid : false,value:txtVal});
                        this.props.setChild(txtVal,true,this.props.parentDetails);
                        break;
                    } else {
                        this.setState({errorText:this.props.errMsg,isValid : true,value:txtVal});
                        this.props.setChild(txtVal,false,this.props.parentDetails);
                        break;
                    }
                }

                case 'accountName' : {
                    if(txtVal.match(/^[a-zA-Z ]{1,120}$/)) {
                        this.setState({ errorText: '', isValid : false,value:txtVal});
                        this.props.setChild(txtVal,true,this.props.parentDetails);
                        break;
                    } else {
                        this.setState({errorText:this.props.errMsg,isValid : true,value:txtVal});
                        this.props.setChild(txtVal,false,this.props.parentDetails);
                        break;
                    }
                }

                case 'accountNumber' : {
                    if(txtVal.match(/^[0-9]{8,17}$/)) {
                        if(txtVal > 0){
                            this.setState({ errorText: '', isValid : false,value:txtVal});
                            this.props.setChild(txtVal,true,this.props.parentDetails);
                            break;
                        } else {
                            this.setState({errorText:this.props.errMsg,isValid : true,value:txtVal});
                            this.props.setChild(txtVal,false,this.props.parentDetails);
                            break;
                        }
                    } else {
                        this.setState({errorText:this.props.errMsg,isValid : true,value:txtVal});
                        this.props.setChild(txtVal,false,this.props.parentDetails);
                        break;
                    }
                }

                case 'routingNo' : {
                    if(txtVal.match(/^[0-9]{9}$/)) {
                        if(txtVal > 0){
                            this.setState({ errorText: '', isValid : false,value:txtVal});
                            this.props.setChild(txtVal,true,this.props.parentDetails);
                            break;
                        } else {
                            this.setState({errorText:this.props.errMsg,isValid : true,value:txtVal});
                            this.props.setChild(txtVal,false,this.props.parentDetails);
                            break;
                        }

                    } else {
                        this.setState({errorText:this.props.errMsg,isValid : true,value:txtVal});
                        this.props.setChild(txtVal,false,this.props.parentDetails);
                        break;
                    }
                }
                case 'phone' : {
                    if(txtVal.match(/^[0-9]{10}$/)) {
                        let value = txtVal !== '' ? Number(txtVal) : '';
                        if(value > 1111111111 && value <= 9999999999){
                            this.setState({ errorText: '', isValid : false,value:txtVal});
                            this.props.setChild(txtVal,true,this.props.parentDetails);
                            break;
                        } else {
                            this.setState({errorText:this.props.errMsg,isValid : true,value:txtVal});
                            this.props.setChild(txtVal,false,this.props.parentDetails);
                            break;
                        }

                    } else {
                        this.setState({errorText:this.props.errMsg,isValid : true,value:txtVal});
                        this.props.setChild(txtVal,false,this.props.parentDetails);
                        break;
                    }
                }
                case 'cardNumber' : {
                    if(txtVal.match(/^[0-9]{16}$/)) {
                        if(txtVal > 0){
                            this.setState({ errorText: '', isValid : false,value:txtVal});
                            this.props.setChild(txtVal,true,this.props.parentDetails);
                            break;
                        } else {
                            this.setState({errorText:this.props.errMsg,isValid : true,value:txtVal});
                            this.props.setChild(txtVal,false,this.props.parentDetails);
                            break;
                        }
                    } else {
                        this.setState({errorText:this.props.errMsg,isValid : true,value:txtVal});
                        this.props.setChild(txtVal,false,this.props.parentDetails);
                        break;
                    }
                }

                case 'holderName' : {
                    if(txtVal.match(/^[a-zA-Z ]{1,120}$/)) {
                        this.setState({ errorText: '', isValid : false,value:txtVal});
                        this.props.setChild(txtVal,true,this.props.parentDetails);
                        break;
                    } else {
                        this.setState({errorText:this.props.errMsg,isValid : true,value:txtVal});
                        this.props.setChild(txtVal,false,this.props.parentDetails);
                        break;
                    }
                }

                case 'cvv' : {
                    if(txtVal.match(/^[0-9]{3,4}$/)) {
                        if(txtVal > 0){
                            this.setState({ errorText: '', isValid : false,value:txtVal});
                            this.props.setChild(txtVal,true,this.props.parentDetails);
                            break;
                        } else {
                            this.setState({errorText:this.props.errMsg,isValid : true,value:txtVal});
                            this.props.setChild(txtVal,false,this.props.parentDetails);
                            break;
                        }
                    } else {
                        this.setState({errorText:this.props.errMsg,isValid : true,value:txtVal});
                        this.props.setChild(txtVal,false,this.props.parentDetails);
                        break;
                    }
                }

                case 'email':{
                    if(txtVal.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,3}))$/)){
                        // var text="namita.com@yopmail.com.com";
                        var txt = txtVal.split("@")[1]
                        //console.log(txt.split(".com").length - 1)
                        var value = txt.split(".com").length - 1 
                        if(value > 1 && value !== ".com.co"){
                        
                        this.setState({errorText:this.props.errMsg,isValid : true,value:txtVal});
                            this.props.setChild(txtVal,false,this.props.parentDetails);
                            break;
                        }else{
                            this.setState({ errorText: '', isValid : false,value:txtVal});
                        this.props.setChild(txtVal,true,this.props.parentDetails);
                        break;
                        }
                        
                    }else {
                        this.setState({errorText:this.props.errMsg,isValid : true,value:txtVal});
                        this.props.setChild(txtVal,false,this.props.parentDetails);
                        break;
                    }
                }

                case 'memberSsnno':{
                    var textval = txtVal.replace(/\D/g, '');
                    var startWith = textval.substr(0,1)
                    var newVal = '';
                    if(textval.length > 5) {
                        this.state.ssnval = textval;
                    }
                    if((textval.length > 3) && (textval.length < 7)) {
                        newVal += textval.substr(0, 3) + '-';
                        textval = textval.substr(3);
                    }
                    if (textval.length > 5) {
                        newVal += textval.substr(0, 3) + '-';
                        newVal += textval.substr(3, 2) + '-';
                        textval = textval.substr(5);
                    }
                    newVal += textval;
                    if(newVal.length === 11){
                        this.setState({ errorText: '', isValid : false,value:newVal});
                        this.props.setChild(newVal,true,this.props.parentDetails);
                    }else{
                        this.setState({ errorText:this.props.errMsg, isValid : true,value:newVal});
                        this.props.setChild(newVal,false,this.props.parentDetails);
                    }
                    break;
                }
                case 'zip':{
                    if(txtVal.match(/^[-+]?[0-9]+$/) && txtVal.length===5){
                        this.setState({ errorText: '', isValid : false,value:txtVal});
                        this.props.setChild(txtVal,true,this.props.parentDetails);
                        break;
                    }else {
                        this.setState({errorText:this.props.errMsg,isValid : true,value:txtVal});
                        this.props.setChild(txtVal,false,this.props.parentDetails);
                        break;
                    }
                }

                case 'street':{
                    if(!txtVal.match(/[!@#$%^&*()_+=\[\]{};':"\\|.<>\/?]/)){
                        this.setState({ errorText: '', isValid : false,value:txtVal});
                        this.props.setChild(txtVal,true,this.props.parentDetails);
                        break;
                    }else {
                        this.setState({errorText:this.props.errMsg,isValid : true,value:txtVal});
                        this.props.setChild(txtVal,false,this.props.parentDetails);
                        break;
                    }
                }
                case 'city' :
                {
                    if (txtVal.match(/^[a-zA-Z ]*$/)) {
                        this.setState({ errorText: '', isValid : false,value:txtVal});
                        this.props.setChild(txtVal,true,this.props.parentDetails);
                        break;
                    } else {
                        this.setState({errorText:this.props.errMsg,isValid : true,value:txtVal});
                        this.props.setChild(txtVal,false,this.props.parentDetails);
                        break;
                    }
                }
                case 'EmpAge' :
                {
                    if (txtVal.match(/^[0-9]*$/)) {
                        if(txtVal > 17 && txtVal < 86){
                            this.setState({ errorText: '', isValid : false,value:txtVal});
                            this.props.setChild(txtVal,true,this.props.parentDetails);
                            break;
                        } else {
                            this.setState({ errorText: this.props.errMsg, isValid : true,value:txtVal});
                            this.props.setChild(txtVal,false,this.props.parentDetails);
                            break;
                        }

                    } else {
                        this.setState({errorText:this.props.errMsg,isValid : true,value:txtVal});
                        this.props.setChild(txtVal,false,this.props.parentDetails);
                        break;
                    }
                }

                case 'feet' : {
                    if (txtVal.match(/^[0-9]*$/)) {
                        if(txtVal >= 0 && txtVal < 11){
                            this.setState({ errorText: '', isValid : false,value:txtVal});
                            this.props.setChild(txtVal,true,this.props.parentDetails);
                            break;
                        } else {
                            this.setState({ errorText: this.props.errMsg, isValid : true,value:txtVal});
                            this.props.setChild(txtVal,false,this.props.parentDetails);
                            break;
                        }

                    } else {
                        this.setState({errorText:this.props.errMsg,isValid : true,value:txtVal});
                        this.props.setChild(txtVal,false,this.props.parentDetails);
                        break;
                    }
                }

                case 'inch' : {
                    if (txtVal.match(/^[0-9]*$/)) {
                        if(txtVal >= 0 && txtVal < 12){
                            this.setState({ errorText: '', isValid : false,value:txtVal});
                            this.props.setChild(txtVal,true,this.props.parentDetails);
                            break;
                        } else {
                            this.setState({ errorText: this.props.errMsg, isValid : true,value:txtVal});
                            this.props.setChild(txtVal,false,this.props.parentDetails);
                            break;
                        }

                    } else {
                        this.setState({errorText:this.props.errMsg,isValid : true,value:txtVal});
                        this.props.setChild(txtVal,false,this.props.parentDetails);
                        break;
                    }
                }

                case 'treatment' : {
                    if (txtVal.match(/^[0-9a-zA-Z \n\-,]+$/)) {
                        this.setState({ errorText: '', isValid : false,value:txtVal});
                        this.props.setChild(txtVal,true,this.props.parentDetails);
                        break;
                    } else {
                        this.setState({errorText:this.props.errMsg,isValid : true,value:txtVal});
                        this.props.setChild(txtVal,false,this.props.parentDetails);
                        break;
                    }
                }

                case 'quick_quote_age' : {
                    if (txtVal.match(/^[0-9]*$/)) {
                        if(txtVal >= 0 && txtVal < 19){
                            this.setState({ errorText: '', isValid : false,value:txtVal});
                            this.props.setChild(txtVal,true,this.props.parentDetails);
                            break;
                        } else {
                            this.setState({ errorText: this.props.errMsg, isValid : true,value:txtVal});
                            this.props.setChild(txtVal,false,this.props.parentDetails);
                            break;
                        }

                    } else {
                        this.setState({errorText:this.props.errMsg,isValid : true,value:txtVal});
                        this.props.setChild(txtVal,false,this.props.parentDetails);
                        break;
                    }
                }
            }
        }else{
            if(this.state.requiredFlag){
                this.setState({errorText:this.props.helperMsg,isValid : true,value:txtVal});
                this.props.setChild(txtVal,false,this.props.parentDetails);
            } else {
                this.setState({ errorText: '', isValid : false,value:txtVal});
                this.props.setChild(txtVal,true,this.props.parentDetails);
            }
        }
    }

    handlerCopy(e) {
        e.preventDefault();
    }

    render() {
        if(this.props.label === 'First Name'){
            this.x= {
                endAdornment: (
                    <InputAdornment position="end">
                        <AccountCircle />
                    </InputAdornment>
                ),
            }
        }
        return (
            <CustomTextField
                       error={this.props.value === '' && this.state.isValid}
                       label={this.props.label}
                       name={this.props.name}
                       variant="filled"
                       autoComplete='off'
                       value={this.props.value===''&&this.state.isValid?this.state.value:this.props.value}
                       style={this.props.style}
                       helperText= {(this.props.value === '' && this.state.isValid )||this.props.value === '' ? this.state.errorText:''}
                       onChange={this.onChange.bind(this)}
                       disabled={this.props.disable}
                       required={this.props.reqFlag}
                        InputLabelProps={{style: {color:(this.props.value === ''&& this.state.isValid)?'#FA1515':''}}}
                       inputProps={{
                           maxLength: this.props.length,
                       }}
                       InputProps={this.x}
            />
        );
    }
}

export default sampleTextField;


