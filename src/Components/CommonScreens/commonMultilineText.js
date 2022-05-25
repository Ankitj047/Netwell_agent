import React, {Component} from 'react';
import TextField from '@material-ui/core/TextField';
import { withStyles} from '@material-ui/core/styles';
import customStyle from '../../Assets/CSS/stylesheet_UHS'

const CustomTextField = withStyles(
    customStyle.multiLineTextField,
)(TextField);

class CommonMultilineText extends Component{
    constructor(props) {
        super(props);
        this.state = {value : '', errorText : this.props.helperMsg, isValid : false}
    }

    componentDidMount() {
    }

    componentWillUnmount() {
        this.state.value='';
    }

    handlerCopy(e) {
        e.preventDefault();
    }
    onChange = (event) =>{
        event.preventDefault();
        let txtVal = event.target.value;
        txtVal=event.target.value.trimLeft()
        if(txtVal !== ""){
                this.setState({ errorText: '', isValid : false,value:txtVal});
                this.props.setChild(txtVal,true,this.props.parentDetails);
            } 
            else {
                this.setState({errorText:this.props.errMsg,isValid : true,value:txtVal});
                this.props.setChild(txtVal,false,this.props.parentDetails);
            }
    
    };

    render() {
        const color='#76FA15';
        return (
            <CustomTextField
                error={this.state.isValid}
                label={this.props.label}
                name={this.props.name}
                variant="filled"
                autoComplete='off'
                value={this.props.value===''&&this.state.isValid?this.state.value:this.props.value}
                style={this.props.style}
                helperText= {this.props.value==''  && this.state.errorText}
                /*onCopy={this.handlerCopy}
                onPaste={this.handlerCopy}*/
                onChange={this.onChange.bind(this)}
                disabled={this.props.disable}
                required={this.props.req}
                InputLabelProps={{style: {color:this.state.isValid?'#FA1515':''}}}
                inputProps={{
                    maxLength: this.props.length,
                }}
                InputProps={this.x}
                multiline
                rows="4"
            />
        );
    }
}

export default CommonMultilineText;