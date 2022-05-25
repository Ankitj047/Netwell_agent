import React, {Component} from 'react';
import TextField from '@material-ui/core/TextField';
import { withStyles} from '@material-ui/core/styles';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from "@material-ui/core/MenuItem";
import styles from '../../Assets/CSS/stylesheet_UHS'
import {Select} from "@material-ui/core";

const CustomTextField = withStyles(
    styles.textField
)(TextField);

class CommonDropDwn extends Component{
    constructor(props) {
        super(props);
        this.state={value : '', errorText:this.props.helperMsg, isValid : false}

    }
    setValue=(event)=>{
        let txtVal = event.target.value;
        txtVal = txtVal.trimLeft();
        this.setState({errorText:'', value : txtVal, isValid : false});
        this.props.setChild(txtVal, true, this.props.parentDetails);
    }


    render() {
        return (
            <CustomTextField
                select
                required={this.props.reqFlag}
                label={this.props.label}
                name={this.props.name}
                value={this.props.value}
                onChange={this.setValue}
                style={styles.dropDown}
                helperText= {(this.props.value === '' || this.state.isValid) ? this.state.errorText:''}
                error={this.state.isValid}
                variant="filled"
                disabled={this.props.disable}>
                {this.props.List.map((option, index) => (
                    <MenuItem key={index} value={option.value} selected>
                        {option.key}
                    </MenuItem>
                ))}
            </CustomTextField>

        );
    }
}

export default CommonDropDwn;


