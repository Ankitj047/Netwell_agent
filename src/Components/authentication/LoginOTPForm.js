import React, { Component } from 'react'




import { Auth } from "aws-amplify";
import './style.css'

import Card from '@material-ui/core/Card';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';



export class LoginOTPForm extends Component{
  constructor(props) {
    super(props)

    console.log(props.errorMesssage)
  }

  render() {
    return (
      <div className="">

        <Container maxWidth="xs">
          <Card className="login-card" style={{ marginTop: "50px" }}>


            <form className="main-form" style={{ marginTop: 0 }}>
              <h4 className="label-head">We have delivered the authentication code by SMS to {this.props.user.challengeParam.CODE_DELIVERY_DESTINATION} . Please enter the code to complete authentication.</h4>
              <p className="a-errorMessage" hidden={this.props.errorMesssage.length <= 0}>The code entered is invalid, please try again.</p>
              <div className="a-form-ctrl">

                <input
                  className="a-input"
                  type="text"

                  name="verificationCode"
                  required
                  onChange={this.props.handleChange}
                />
              </div>

              <div>
                <button type="submit" className="a-btn" onClick={this.props.confirmSignIn}>
                  Sign In
                    </button>
              </div>

            </form>
          </Card>
        </Container>
      </div>
    )
  }
}

export default LoginOTPForm
