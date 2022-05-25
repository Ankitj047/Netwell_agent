import React, { Component } from "react";
import { Auth } from "aws-amplify";
import Card from '@material-ui/core/Card';
import Login from './LoginForm'
import LoginOTPForm from './LoginOTPForm'
import ForgotPassword from './ForgotPassword';
import Loader from './loader'
import './style.css';
import FirstTimePasswordChange from './FirstTimePasswordChange';
import {saveLogin, getPublicIP} from './utils';

export class SignIn extends Component {
  constructor(props) {
    super(props);
    let emailToReset = sessionStorage.getItem('emailToReset');

    this.state = {
      username: "",
      password: "",

      signedin: false,
      confirmationCode: "",
      forgotPass: emailToReset ? true : false,
      firstTimepwdRest: false,
      sendVerification: false,
      verificationCode: '',
      sendMFA: false,
      user: {},
      errorMesssage: '',
      showLoader: false,
      agreeModal: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleForgot = this.handleForgot.bind(this);
    this.handleSendVerification = this.handleSendVerification.bind(this);

    this.confirmSignIn = this.confirmSignIn.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    getPublicIP();
  }

  componentDidMount() {
    this.toggleLoader(true);
    Auth.currentSession().then((session) => {
      let token = this.parseJwt(session.idToken.jwtToken);
      localStorage.setItem('isLogged', 'true');
      this.toggleLoader(false);
      saveLogin(token.email);
      this.props.history.push('/');
    }).catch((error) => {
      console.log('inside get current user')
      this.toggleLoader(false);
      localStorage.setItem('isLogged', 'false');
      document.body.classList.add('bodyColor');
    });
  }

  parseJwt = (id_token) => {

    let base64Url = id_token.split('.')[1];

    let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');

    let jsonPayload = decodeURIComponent(

        atob(base64)

            .split('')

            .map(function (c) {

              return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)

            })

            .join('')

    );

    let token = JSON.parse(jsonPayload);
    return token;
  };

  componentWillUnmount() {
    document.body.classList.remove('bodyColor');
  }
  handleChange(e) {
    console.log('change')
    this.setState({
      [e.target.name]: e.target.value
    });

  }

  async handleSubmit(e) {
    console.log('submit')
    e.preventDefault();
    this.toggleLoader(true)
    const { signedin, username, password, user } = this.state;
    this.setState({
      errorMesssage:''
    })
    /*let email = await getProperEmailId(username);
*/
    console.log('username:::', username);
    //method will signin the user and return current user with session
    const authUser = await Auth.signIn({
      username: username,
      password: password,
    }).catch(err => {
      // console.log(err);
      // alert(err.message)
      this.setState({
        errorMesssage: 'Incorrect username or password.',
        disableSiginBtn: false
      })
      this.toggleLoader(false)

    });
    this.toggleLoader(false)
    if (authUser) {
      console.log('======================= authUser ==================');
      console.log(authUser);

      if (authUser.challengeName === 'SMS_MFA' ||
          authUser.challengeName === 'SOFTWARE_TOKEN_MFA') {
        this.setState({
          user: authUser,
          sendMFA: true,
          disableSiginBtn: false
        })
      } else if (authUser.challengeName === "NEW_PASSWORD_REQUIRED") {
        this.setState({
          user: authUser,
          disableSiginBtn: false,
          firstTimepwdRest: true,
        })
      } else {
        // window.location.reload()
        this.setState({
          disableSiginBtn: false
        });
        //window.location.reload()
        saveLogin(username)
        sessionStorage.setItem('isLogged', false);
        this.setState({agreeModal:true})
      //  this.props.history.push('/')
      }
    }
  }


  handleForgot(e) {
    e.preventDefault();
    // const {forgotPass } = this.state;
    this.setState({
      forgotPass: true
    })

  };




  handleSendVerification(e) {
    e.preventDefault();
    const { username } = this.state;
    Auth.forgotPassword(username)
      .then(data => console.log(data))
      .catch(err => console.log(err));
    this.setState({
      sendVerification: true
    })
  }







  async confirmSignIn(e) {
    e.preventDefault();
    const { verificationCode, sendMFA, signedin, user } = this.state;
    this.toggleLoader(true);

    const loggedUser = await Auth.confirmSignIn(
      user,   // Return object from Auth.signIn()
      verificationCode,   // Confirmation code  
      "SMS_MFA"
      // MFA Type e.g. SMS_MFA, SOFTWARE_TOKEN_MFA
    ).then(() => {
      console.log('sign in confirm success')
      this.toggleLoader(false);
      this.props.history.push('/')


    }).catch(err => {
      console.log(err);
      this.toggleLoader(false);
      this.setState({
        errorMesssage: err.message
      })

      // alert(err.message)
    });



  }





  // btnclick() {
  //   console.log(Auth.currentAuthenticatedUser());
  //   window.open("GET https://localhost:3000/logout?client_id=3uu8mib69gappsn13lv62ims2l&logout_uri=http://localhost:3000/");
  //   console.log(Auth.currentAuthenticatedUser());
  // }



  async handleLogout() {
    console.log('trying to logout')
    let curUser = await Auth.currentAuthenticatedUser();
    console.log(curUser)
    await Auth.signOut();
    localStorage.clear();
    sessionStorage.clear();
    curUser = await Auth.currentAuthenticatedUser();
    console.log(curUser)
    this.setState({agreeModal: false})
  }

  toggleLoader = (value) => {
    this.setState({
      showLoader: value
    })
  }
  getVIew() {
    /*const { signedin, forgotPass, sendVerification, verificationCode, sendMFA, user, firstTimepwdRest} = this.state;
      if (forgotPass) {
        return (
            <ForgotPassword confirmSignIn={this.confirmSignIn} toggleLoader={this.toggleLoader}/>
        )
      }
      else if (sendMFA) {

        return (
            <LoginOTPForm user={user} handleChange={this.handleChange} confirmSignIn={this.confirmSignIn} errorMesssage={this.state.errorMesssage} />
        )
        // return (
        //   <Card style={{ padding: "20px", marginTop: "50px" }}>
        //     <form >
        //       <div class="container">
        //         <h1>Confirm Login</h1>
        //         <p>Please fill in this form to confirm login.</p>
        //         <hr />
        //         <TableContainer component={Paper}>
        //           <Table aria-label="simple table">

        //             <TableRow>
        //               <TableCell>
        //                 <label for="verification code">
        //                   <b>verificationCode</b>
        //                 </label></TableCell>
        //               <TableCell> <input
        //                 type="text"
        //                 placeholder="Enter verificationCode"
        //                 name="verificationCode"
        //                 required
        //                 onChange={this.handleChange}
        //               /></TableCell>
        //               <TableCell>
        //                 <button type="submit" class="signupbtn" onClick={this.confirmSignIn} >
        //                   confirm signIn
        //           </button></TableCell>
        //             </TableRow>
        //           </Table>
        //         </TableContainer>
        //       </div>
        //     </form>


        //   </Card>

        //)

      }
      else if (signedin) {
        return (
            <Card style={{ padding: "20px", marginTop: "50px" }}>
              welcome you are signed in
              <button onClick={this.handleLogout}>logout</button>
            </Card>
        )

      } else {
        return (

            <Login handleSubmit={this.handleSubmit} handleChange={this.handleChange} handleForgot={this.handleForgot} handleToggle={this.props.handleToggle} errorMsg={this.state.errorMesssage} disableSiginBtn={this.state.disableSiginBtn} />

        );
      }*/
    const { signedin, forgotPass, sendVerification, verificationCode, sendMFA, user, firstTimepwdRest } = this.state;
    if (forgotPass) {
      return (
          <ForgotPassword confirmSignIn={this.confirmSignIn} toggleLoader={this.toggleLoader} gotoLoginScreen={this.gotoLoginScreen} />
      )
    }
    else if (sendMFA) {

      return (
          <LoginOTPForm user={user} handleChange={this.handleChange} confirmSignIn={this.confirmSignIn} errorMesssage={this.state.errorMesssage} handleSubmit={this.handleSubmit} />
      )
    }
    else if (signedin) {
      return (
          <Card style={{ padding: "20px", marginTop: "50px" }}>
            welcome you are signed in
            <button onClick={this.handleLogout}>logout</button>
          </Card>
      )

    } else if (firstTimepwdRest) {
      return (
          <FirstTimePasswordChange user={user} confirmSignIn={this.confirmSignIn} toggleLoader={this.toggleLoader} />
      )
    } else {
      return (

          <Login handleSubmit={this.handleSubmit} handleChange={this.handleChange} handleForgot={this.handleForgot} handleToggle={this.props.handleToggle} errorMsg={this.state.errorMesssage} disableSiginBtn={this.state.disableSiginBtn} agreeModal={this.state.agreeModal} closeModal={()=>this.closeModal()}/>

      );
    }

  }

  gotoLoginScreen = () => {
    this.setState({
      forgotPass: false,
      firstTimepwdRest: false,
      signedin: false,
      sendMFA: false
    })
  }
  closeModal(){
    this.setState({agreeModal: false})
    let curUser =  Auth.currentAuthenticatedUser();
    console.log(curUser)
     Auth.signOut();
    localStorage.clear();
    sessionStorage.clear();
    curUser =  Auth.currentAuthenticatedUser();
    console.log(curUser)
  }
  render() {
    return (
      <>
        {this.getVIew()}
        <Loader showLoader={this.state.showLoader} />

      </>
    )

  }
}

export default SignIn;
