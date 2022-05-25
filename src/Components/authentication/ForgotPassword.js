import React, { Component } from 'react'
import { useState, useEffect } from 'react'


import { Auth } from "aws-amplify";

// import Card from '@material-ui/core/Card';
// import Table from '@material-ui/core/Table';
// import TableBody from '@material-ui/core/TableBody';
// import TableCell from '@material-ui/core/TableCell';
// import TableContainer from '@material-ui/core/TableContainer';
// import TableRow from '@material-ui/core/TableRow';
// import Paper from '@material-ui/core/Paper';


import ForgotPasswordForm from './ForgotPasswordForm'
import ResetPasswordForm from './ResetPasswordForm'

const ForgotPassword = (props) => {

  const [sendVerification, setSendVerification] = useState(false);
  const [userName, seUserName] = useState('')
  const [codeDestination, setCodeDestination] = useState('')

  useEffect(() => {
    console.log('forgot password')

  }, [])

  const handleChange = (e) => {
    console.log(e.target.value)
    seUserName(e.target.value);
  };

  const handleSendVerification = (destination) => {
    setSendVerification(true)
    setCodeDestination(destination)
  };




  if (!sendVerification) {
    return (
      <ForgotPasswordForm handleChange={handleChange} handleSendVerification={handleSendVerification} email={userName} toggleLoader={props.toggleLoader} gotoLoginScreen={props.gotoLoginScreen}/>
    )
  }
  else {
    return (
      <ResetPasswordForm destination={codeDestination} email={userName} toggleLoader={props.toggleLoader} gotoLoginScreen={props.gotoLoginScreen}/>
    )
  }

}
export default ForgotPassword;