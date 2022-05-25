import React, { Component } from "react";
import { Auth } from "aws-amplify";
import './style.css'

import Card from '@material-ui/core/Card';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Link } from 'react-router-dom';
//import PhoneInput from 'react-phone-number-input';
export class SignUpForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mobileNumber: ''
    }


  }
  handleSubmit = (event) => {
    this.props.handleSubmit(event)


  }

  handleChange = (event, type) => {
    if (type) {
      this.props.handleChange(event, type)
    } else {
      this.props.handleChange(event)

    }
  }

  handleChange1 = (event, type) => {

    if (type) {
      this.props.handleChange1(event, type)
    } else {
      this.props.handleChange1(event)

    }
  }
  handleChangePhone = (event) => {
    let value = event.target.value.trim();
    console.log(value)
    value = value != '' ? Number(value) : '';
    if (!isNaN(value) && value <= 9999999999) {
      this.setState({
        mobileNumber: value
      })

      this.handleChange1(event)
    }

  }

  render() {
    let { passwordLength, containsNumbers, isUppercase, containsSymbols, isLowercase, password, errorMessage } = this.props;
    let btnStatus = passwordLength && containsNumbers && isUppercase && containsSymbols && isLowercase ? false : true;
    return (
      <div className="login">
        <CssBaseline />
        <Container maxWidth="xs">
          <Card className="login-card" style={{ marginTop: "50px" }}>

            <div className="logo">
              <img alt="logo" className="logo-custom" src={require('./images/auth-logo.jpg')} />
            </div>
            <form onSubmit={this.handleSubmit.bind(this)} className="main-form">
              <p className="a-errorMessage" hidden={errorMessage.length <= 0}>
                {errorMessage}
              </p>
              <h4 className="label-head">Sign up with a new account</h4>
              <div className="a-form-ctrl">
                <p className="">Email</p>
                <input
                  className="a-input"
                  type="email"
                  placeholder=" Email"
                  name="email"
                  pattern="^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+$"
                  required
                  onChange={this.handleChange1}
                />
              </div>
              <div className="a-form-ctrl">
                <p className="">Mobile Number</p>
                <input
                  className="a-input"
                  type="text"
                  placeholder="Enter your 10 digit mobile number"
                  name="phone"
                  value={this.state.mobileNumber}
                  required
                  onChange={this.handleChangePhone}

                />
              </div>
              <div className="a-form-ctrl">
                <p className="">First Name</p>
                <input
                  className="a-input"
                  type="text"
                  name="firstname"
                  required
                  onChange={this.handleChange1}
                />
              </div>
              <div className="a-form-ctrl">
                <p className="">Last Name</p>
                <input
                  className="a-input"
                  type="text"
                  name="lastname"
                  required
                  onChange={this.handleChange1.bind(this)}
                />
              </div>

              <div className="a-form-ctrl">
                <p className="">Password</p>
                <input
                  className="a-input"
                  type="password"
                  placeholder="Enter Password"
                  name="password"
                  required
                  onChange={this.handleChange.bind(this)}
                />
              </div>
              {/* ✖ */}
              <div className="pwd-validations">

                <div className={isLowercase ? "valid" : "invalid"}>
                  <span aria-hidden="true">{isLowercase ? '✓' : '✖'} </span>
                  <span className="pwd-validation-txt">Password must contain a lower case letter</span>
                </div>
                <div className={isUppercase ? "valid" : "invalid"}>
                  <span aria-hidden="true">{isUppercase ? '✓' : '✖'} </span>
                  <span className="pwd-validation-txt">Password must contain an upper case letter</span>
                </div>
                <div className={containsSymbols ? "valid" : "invalid"}>
                  <span aria-hidden="true">{containsSymbols ? '✓' : '✖'} </span>
                  <span className="pwd-validation-txt">Password must contain a special character</span>
                </div>
                <div className={containsNumbers ? "valid" : "invalid"}>
                  <span aria-hidden="true">{containsNumbers ? '✓' : '✖'} </span>
                  <span className="pwd-validation-txt">Password must contain a number</span>
                </div>
                <div className={passwordLength ? "valid" : "invalid"}>
                  <span aria-hidden="true">{passwordLength ? '✓' : '✖'} </span>
                  <span className="pwd-validation-txt">Password must contain at least 8 characters</span>
                </div>

              </div>
              <div>
                <button type="submit" className="a-btn" disabled={btnStatus}>
                  Sign Up
                </button>
                <p style={{ textAlign: 'center' }}><span>Already have an account?</span>&nbsp;
                <span className="forgot-pawd"><Link to="/login">Sign In</Link></span></p>
              </div>


              {/* 

              <TableContainer component={Paper}>
                <Table aria-label="simple table">

                  <TableRow>
                    <TableCell>
                      <label for="email">
                        <b>Username</b>
                      </label></TableCell>
                    <TableCell>
                      <input
                        type="text"
                        placeholder="Enter Email"
                        name="username"
                        required
                        onChange={this.handleChange}
                      /></TableCell></TableRow>
                  <TableRow>
                    <TableCell>

                      <label for="psw">
                        <b>Password</b>
                      </label></TableCell>
                    <TableCell>
                      <input
                        type="text"
                        placeholder="Enter Password"
                        name="password"
                        required
                        onChange={this.handleChange}
                      /></TableCell></TableRow>
                  <TableRow>
                    <TableCell>


                      <button type="button" className="forgot" onClick={this.handleForgot} name="forgot">
                        forgot password
                </button></TableCell><TableCell>
                      <button type="submit" className="signupbtn">
                        Sign In
                </button></TableCell>
                  </TableRow>
                </Table>
              </TableContainer> */}



            </form>

          </Card>

        </Container>
      </div>

    )

  }
}
export default SignUpForm;
