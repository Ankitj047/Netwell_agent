import React from 'react'
// import './style.css'
import { useState, useEffect } from 'react'
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';

function InputPassword(props) {

  const [hidePassword, setHidePassword] = useState(true);

  const toggleShow = (e) => {
    setHidePassword(!hidePassword)
  }

  return (
    <>
      <input
        className="a-input"
        type={hidePassword ? 'password' : 'text'}
        name={props.name}
        required
        onChange={props.handleChange}
      />
      <span hidden={props.hideEyeIcon} onClick={toggleShow.bind(this)} className="a-pwd-visibility">
        {
          hidePassword ? <VisibilityOffIcon style={{ height: '20px' }} /> : <VisibilityIcon style={{ height: '20px' }} />
        }
      </span>
    </>
  )
}

export default InputPassword
