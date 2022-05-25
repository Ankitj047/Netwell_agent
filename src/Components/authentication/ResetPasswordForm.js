import React from 'react'
import { Auth } from "aws-amplify";

import Card from '@material-ui/core/Card';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import './style.css'
import { useState, useEffect } from 'react'

function ResetPasswordForm(props) {

  const [verificationCode, setVerification] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [buttonStatus, setbuttonStatus] = useState(false)

  const handleConfirmVerification = (e) => {
    e.preventDefault();
    console.log('calling reset')
    console.log(props.email)
    console.log(verificationCode)
    console.log(password)
    if (password == confirmPassword) {
      props.toggleLoader(true)
      Auth.forgotPasswordSubmit(props.email, verificationCode, password)
        .then(data => {
          props.toggleLoader(false)
          console.log('password reset success')
          console.log(data)
          window.location.reload()
        }
        )
        .catch(err => {
          props.toggleLoader(false)
          console.log(err.message)
          setErrorMessage(err.message)
        }
        );
    }
    else {
      setErrorMessage('Please enter same password')
      setbuttonStatus(true)
    }
  }



  const handleChange = (e) => {
    // console.log(e.target.value)
    // console.log(e.target.name)
    if (e.target.name == 'verificationCode') {
      setVerification(e.target.value)
    }
    else if (e.target.name == 'password') {
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

  return (


    <div className="login">
      <CssBaseline />
      <Container maxWidth="xs">
        <Card className="login-card" style={{ marginTop: "50px" }}>

          <div className="logo">
            <img alt="logo" className="logo-custom" src={require('./images/NetWell_Logo_Color.png')} />
          </div>
          <form className="main-form">

            <p>We have sent a password reset code by email to {props.destination}. Enter it below to reset your password.</p>
            <div className="a-form-ctrl">
              <p className="">Code</p>
              <input
                className="a-input"
                type="text"

                name="verificationCode"
                required
                onChange={handleChange}
              />
            </div>
            <div className="a-form-ctrl">
              <p className="">New Password</p>
              <input
                className="a-input"
                type="password"

                name="password"
                required
                onChange={handleChange}
              />
            </div>
            <div className="a-form-ctrl">
              <p className="">Enter New Password Again</p>
              <input
                className="a-input"
                type="password"

                name="confirmPassword"
                required
                onChange={handleChange}
              />
            </div>
            <p className="a-errorMessage" hidden={errorMessage.length <= 0} style={{ marginTop: '10px' }}>
              {errorMessage}
            </p>

            <div>
              <button type="submit" className="a-btn" style={{marginTop: '5px',}}onClick={handleConfirmVerification}>
                Change password
                </button>
                <p style={{ margin :'10px 10px 10px 0px' }}>Go back to <span className="forgot-pawd1" onClick={() => props.gotoLoginScreen()}>Sign In</span></p>

            </div>
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
