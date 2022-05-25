import React, { Component } from "react";
import { Auth } from "aws-amplify";
import './style.css'
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
// import Table from '@material-ui/core/Table';
// import TableBody from '@material-ui/core/TableBody';
// import TableCell from '@material-ui/core/TableCell';
// import TableContainer from '@material-ui/core/TableContainer';
// import TableRow from '@material-ui/core/TableRow';
// import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import { getQueryParams } from './utils';
import { Link } from 'react-router-dom';
import AgreeModal from './AgreeModal';

export class SignIn extends Component {
  constructor(props) {
    super(props);
    this.emailInput = React.createRef();
    this.passwordInput = React.createRef();
    this.state={
      agreeModal: this.props.agreeModal
    }

  }
  componentDidMount() {
    this.loadQueryParams();
  }
  handleSubmit = (event) => {
    this.props.handleSubmit(event)
  }

  loadQueryParams = () => {
    let queryParams = getQueryParams()
    if (queryParams.username && queryParams.password) {
      let userName = decodeURI(queryParams.username);
      let password = decodeURI(queryParams.password);
      this.emailInput.current.value = userName;
      this.passwordInput.current.value = password;

      let usernameObj = {
        target: {
          name: 'username',
          value: userName
        }
      }
      this.props.handleChange(usernameObj);

      let passwordObj = {
        target: {
          name: 'password',
          value: password
        }
      }
      this.props.handleChange(passwordObj)
    }
  }

  handleChange = (event) => {
    this.props.handleChange(event)
  }
  handleForgot = (event) => {
    console.log('inside handle logout')
    this.props.handleForgot(event)
  }

  render() {
    return (
      <div className="NetWellPortalLoginDesktop">
        {/* <CssBaseline/> */}
        {/* <Container> */}
          <Card className="login-card">
          <Grid container>
          <Grid item xs={2} md={2}>
            <div className="logo">
              <img alt="logo" className="logo-custom" src={require('./images/NetWell_Logo_Color.png')} />
            </div>
            </Grid>
            </Grid>
            <div className="familylogo-custom">
              {/* <img  alt="logo" className="familylogo-custom" src={require('./images/family-looking-at-tablet.jpeg')} /> */}
            </div>

            <form onSubmit={this.handleSubmit.bind(this)} className="main-form">
              {/* <h4 className="label-head">Sign in with your email and password</h4> */}
              <p className="a-errorMessage" hidden={this.props.errorMsg.length <= 0}>{this.props.errorMsg}</p>
              <Grid container  style={{justifyContent:"center"}} >
              <div className="a-form-ctrl">
                {/* <p className="">Email</p> */}
                <input ref={this.emailInput}
                  className="a-input"
                  type="text"
                  placeholder="Enter your email"
                  name="username"
                  required
                  onChange={this.handleChange.bind(this)}
                />
              </div>

              <div className="a-form-ctrl">
                {/* <p className="">Password</p> */}
                <input ref={this.passwordInput}
                  className="a-input"
                  type="password"
                  placeholder="Enter your password"
                  name="password"
                  required
                  onChange={this.handleChange.bind(this)}
                />
              </div>

              <div>
                <button type="submit" className="a-btn2" disabled={this.props.disableSiginBtn}>Sign In</button>
                {/*<p style={{ textAlign: 'center' }}><span>Need an account?</span>&nbsp;
                <span className="forgot-pawd"><Link to="/signup">Sign Up</Link></span></p>*/}
              </div>
              </Grid>
              </form>

              <div className="forgot-pawd" style={{display:"flex", justifyContent: "center"}} onClick={this.handleForgot.bind(this)}>Forgot your password?</div> <br></br>
              {/* <div className="havingtrouble" style={{display:"flex", justifyContent: "center"}} >Having trouble logging in?</div>
              <div className="havingtrouble1" style={{display:"flex", justifyContent: "center"}}> Please check if your email has been registered on the portal.</div> */}

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


                      <button type="button" class="forgot" onClick={this.handleForgot} name="forgot">
                        forgot password
                </button></TableCell><TableCell>
                      <button type="submit" class="signupbtn">
                        Sign In
                </button></TableCell>
                  </TableRow>
                </Table>
              </TableContainer> */}
           
          </Card>
        {/* </Container> */}
        <AgreeModal agreeModal={this.props.agreeModal} closeModal={()=>this.closeModal()}/>
      </div>

    )

  }
  closeModal(){
    this.props.closeModal()
    console.log("close modal")
  }
}
export default SignIn;
