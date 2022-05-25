import React, {Component} from 'react';
import TextField from '@material-ui/core/TextField';
import { withStyles} from '@material-ui/core/styles';
import customStyle from '../../Assets/CSS/stylesheet_UHS'
import MenuItem from "@material-ui/core/MenuItem";

const CustomTextField = withStyles(
    customStyle.textField
)(TextField);

class CommonDropDwn extends Component{
    x= {};
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.state = {value : '', errorText:this.props.helperMsg}
    }

    componentDidMount(){
        window.addEventListener('month',this.expiryDate);
        window.addEventListener('relationship', this.relationshipCodeChange);
    }

   expiryDate=(e)=>{
        if(this.props.label === 'Expiration Month'){
            if(e.detail.flag) {
                this.setState({errorText :this.props.errMsg,isValid : true});
            } else {
                this.setState({errorText:'', isValid : false});
            }
        }

   }

    relationshipCodeChange = (e) => {
        if(this.props.label === 'Relationship'){
            if(e.detail.flag) {
                this.setState({errorText :'Spouse is already exist', isValid : true});
            } else {
                this.setState({errorText:'', isValid : false});
            }
        }
    }

    handleChange = (event) => {
        let txtVal = event.target.value;
        let date = new Date ();
        let month = date.getMonth();
        let year = date.getFullYear();

        if(txtVal !== ""){

            if(this.props.parentDetails.label === 'expiryYear' && this.props.parentDetails.val){
                this.setState({ errorText:'',value : txtVal, isValid : false});
                this.props.setChild(txtVal, true,this.props.parentDetails);
            } else if(this.props.parentDetails.label === 'expiryMonth' && this.props.parentDetails.val){
                if(year === this.props.parentDetails.val && month >= event.target.value) {
                    this.setState({errorText : this.props.errMsg, value : txtVal, isValid : true});
                    this.props.setChild(txtVal, false, this.props.parentDetails);
                } else {
                    this.setState({errorText:'', value : txtVal, isValid : false});
                    this.props.setChild(txtVal, true,this.props.parentDetails);
                }
            } else {
                this.setState({ value : txtVal, isValid : false});
                this.props.setChild(txtVal, true,this.props.parentDetails);
            }
        }
        else{
            this.setState({errorText:this.props.helperMsg, value : txtVal, isValid : true});
            this.props.setChild(txtVal,false, this.props.parentDetails);
        }       
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.helperMsg !== this.props.helperMsg){
            this.setState({errorText:this.props.helperMsg})
        }
    }


    render() {
        /*|| this.props.helperMsg === 'Spouse is already exist'*/
        return (
            <CustomTextField
                select
                label={this.props.label}
                name={this.props.name}
                helperText= {(this.props.value === '' || this.state.isValid) ? this.state.errorText:''}
                variant="filled"
                required
                value={this.props.value===''&& this.state.isValid ? this.state.value:this.props.value}
                error={this.state.isValid}
                style={customStyle.dropDownNew}
                onChange={this.handleChange}
                InputLabelProps={{ style: { color: this.state.isValid ?'red':'grey'}}}
                disabled={this.props.disable}>
                {this.props.List.map((option, index) => (
                    <MenuItem key={index} value={option}>
                        {option}
                    </MenuItem>
                ))}
            </CustomTextField>
        );
    }
}

export default CommonDropDwn;


