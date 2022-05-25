import React from 'react'
import { Auth } from "aws-amplify";

import Card from '@material-ui/core/Card';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Link } from 'react-router-dom';
// import './style.css'
import { useState, useEffect } from 'react';
import InputPassword from './InputPasswordBox';
import PasswordValidations from './PwdValidations';
import { getQueryParams } from './utils';

function ResetPasswordForm(props) {

  const [verificationCode, setVerification] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [disableSendBtn, setDisableSendBtn] = useState(true)

  const handleConfirmVerification = (e) => {
    e.preventDefault();
    console.log('calling reset')
    console.log(props.email)
    console.log(verificationCode)
    console.log(password)
    if (password === confirmPassword) {
      props.toggleLoader(true);
      Auth.completeNewPassword(
        props.user,               // the Cognito User Object
        password,       // the new password
      ).then(user => {
        // at this time the user is logged in if no MFA required
        let queryParams = getQueryParams()
        if (queryParams.username) {
          let userName = decodeURI(queryParams.username);
          let url = window.location.href.split('?')[0] + '?username=' + userName + '&password=' + password;
          window.location.replace(url);
        } else {
          window.location.reload();
        }
      }).catch(err => {
        props.toggleLoader(false)
        console.log(err.message)
        setErrorMessage(err.message)
      });



    }
    else {
      setErrorMessage('Please enter same password')
      // setbuttonStatus(true)
    }
  }



  const handleChange = (e) => {
    // console.log(e.target.value)
    if (e.target.name == 'password') {
      setPassword(e.target.value)
    }
    else if (e.target.name == 'confirmPassword') {
      setConfirmPassword(e.target.value)
    }
    // if(password==confirmPassword){
    //   setbuttonStatus(false)
    // }
    // else{
    //   console.log(password)
    //   console.log(confirmPassword)
    // }

  };
  const toggleResetBtn = (allPassed) => {
    setDisableSendBtn(!allPassed);
  }


  return (


    <div className="login">
      <CssBaseline />
      <Container maxWidth="xs">
        <Card className="login-card" style={{ marginTop: "50px" }}>

          <div className="logo">
            <img alt="logo" className="logo-custom" src={require('./images/NetWell_Logo_Color.png')} />
          </div>
          <form className="main-form">

            <h3>Change Password</h3>
            <p className="">Please enter your new password below.</p>

            <div className="a-form-ctrl">
              <p className="">New Password</p>
              <InputPassword handleChange={handleChange} name={'password'} />
            </div>
            <div className="a-form-ctrl">
              <p className="">Enter New Password Again</p>
              <InputPassword handleChange={handleChange} name={'confirmPassword'} />
              {/* <input
                className="a-input"
                type="password"
                name="confirmPassword"
                required
                onChange={handleChange}
              />
              <span onClick={toggleShow.bind(this)} className="a-pwd-visibility">
                {
                  hidePassword ? <VisibilityOffIcon style={{ height: '20px' }} /> : <VisibilityIcon style={{ height: '20px' }} />
                }
              </span> */}
            </div>
            <p className="a-errorMessage" hidden={errorMessage.length <= 0} style={{ marginTop: '10px' }}>
              {errorMessage}
            </p>

            <div>
              <button type="submit" disabled={disableSendBtn} className="a-btn" onClick={handleConfirmVerification}>
                Send
                </button>
              {/* <p style={{ textAlign: 'center' }}><span>Go back to</span>&nbsp;
                <span className="forgot-pawd"><Link to="/login">Sign In</Link></span></p> */}
            </div>
            <PasswordValidations password={password} allPassed={toggleResetBtn} />
          </form>

        </Card>
      </Container>
    </div>



    // {/* <form onSubmit={props.handleSubmit}>
    //         <div className="container">
    //           <h1>reset password</h1>
    //           <p>Please fill in this form to login.</p>
    //           <hr />
    //           <label >
    //             <b>verificationCode</b>
    //           </label>
    //           <input
    //             type="text"
    //             placeholder="Enter verificationCode"
    //             name="verificationCode"
    //             required
    //             onChange={props.handleChange}
    //           />
    //     <br/>
    //     <label >
    //                     <b>new Password</b>
    //                   </label>
    //                   <input
    //                     type="password"
    //                     placeholder="Enter new Password"
    //                     name="password"
    //                     required
    //                     onChange={props.handleChange}
    //                   />
    //           <div className="clearfix">

    //             <button type="submit" className="signupbtn" onClick={props.handleConfirmVerification}>
    //               send verification code
    //             </button>
    //           </div>
    //         </div>
    //       </form> */}


  )
}

export default ResetPasswordForm
