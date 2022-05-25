import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import { createMuiTheme, withStyles, MuiThemeProvider } from "@material-ui/core/styles";
import { FormControl, InputLabel, Select, TextField, Typography } from "@material-ui/core";
import customStyle from "../../Assets/CSS/stylesheet_UHS";
import MenuItem from "@material-ui/core/MenuItem";
import { KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import Button from "@material-ui/core/Button";
import styles from "../../Assets/CSS/stylesheet_UHS";
import Fab from "@material-ui/core/Fab";
import { Modal } from "react-bootstrap";
import { Auth } from "aws-amplify";
var convert = require('xml-js');

const CustomButton = withStyles(
    customStyle.viewBtnNetwell
)(Button);
const CrudButton = withStyles(
    styles.crudBtnAgent,
)(Fab);

const NextButton = withStyles(
    customStyle.doneBtn
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

export default class AgreeModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            agreeModal:this.props.agreeModal,
        }
    }

    render(){

        return(
    <Modal size="lg" show={this.props.agreeModal}  centered backdrop='static'>
                    <Modal.Header style={customStyle.modal_header} >
                        <Modal.Title>Acknowledgements</Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={{ height: '330px', overflow: 'auto' }}>
                    <div style={{ flexGrow: 1 }}>
                    <Grid container spacing={1} justify="center" >
                        <Grid item xs={12} sm={11}>
                        {/* <center><h5>UHS Representative Acknowledgements</h5></center> */}
                          <p>Successfully promoting and offering health care cost sharing programs requires a complete understanding of what health care cost sharing is and how to properly explain and represent sharing programs to prospective members. The training material you have access to describes what sharing is along with terminology that can and cannot be used while discussing and selling sharing programs. It is critical you use 
                            the correct terminology to avoid confusion and ensure members understand what they are purchasing.</p>
                            <p>netWell requires agents to become certified by attending training sessions, reading provided material, and passing a test on general sharing program knowledge. When agents do not adhere to the rules regarding how sharing should be presented and described they can be de-certified. Within your portal you will find a document called “Becoming Certified for netWell” that describes how certification and
                             de-certification is applied. Once de-certified, a representative can no longer offer netWell’s sharing programs.</p>
                             <p>To be able login to your agent portal you must agree to these statements:</p>
                             <ol>
                                 <li>I agree to never represent sharing as insurance or a type of insurance, or as analogous to insurance.</li>
                                 <li>I agree to always refer to netWell as a not-for-profit ministry and not an insurer, insurance company, or carrier.</li>
                                 <li>I agree to always make it clear that netWell sharing programs do not share prescription medication costs unless it is purchased or included.</li>
                                 <li>I agree to use approved terminology when discussing or describing netWell sharing programs with or to prospective members so the programs will not be confused with insurance.</li>
                             </ol>
                        </Grid>
                         
                    </Grid>
                    </div>
                    </Modal.Body>
                    <Modal.Footer>
                        {/* <NextButton style={{ margin: '0', marginRight: '10px', width: '95px', height: '40px' }} disabled={this.props.disableSubmit} onClick={() => this.accept()}>I AGREE</NextButton> */}
                        <CustomButton style={{ height: '40px' }} onClick={() => this.accept()}>I AGREE</CustomButton>
                    </Modal.Footer>
    </Modal>
        )
    }
    accept =()=>{
        localStorage.setItem("IAgree", "true")
         window.location.reload()
    }
    async closeModal(){
        this.props.closeModal();
        localStorage.setItem("IAgree", "false")
    }

}
