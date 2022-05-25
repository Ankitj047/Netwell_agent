import React from 'react';
import { useState, useEffect } from 'react';
import { passwordCheck } from './utils';

const PasswordValidations = (props) => {
    const [isPwdLowercase, setPwdLowercase] = useState(false)
    const [pwdHasSymbol, setPwdHasSymbol] = useState(false)
    const [pwdHasNumbers, setPwdHasNumbers] = useState(false)
    const [isPwdUppercase, setPwdUppercase] = useState(false)
    const [pwdLengthReq, setPwdLengthReq] = useState(false);

    useEffect(() => {
        console.log(props.password)
        let isLowercase = passwordCheck.checkForLowerCase(props.password);
        let hasSymbol = passwordCheck.checkForSymbols(props.password);
        let hasNmbr = passwordCheck.chechForNumbers(props.password);
        let isUpercase = passwordCheck.checkForUpperCase(props.password);
        let pwdLngth = passwordCheck.checkPwdLength(props.password);

        let allPassed = (isLowercase && hasSymbol && hasNmbr && isUpercase && pwdLngth);

        setPwdLowercase(isLowercase);
        setPwdHasSymbol(hasSymbol);
        setPwdHasNumbers(hasNmbr);
        setPwdUppercase(isUpercase);
        setPwdLengthReq(pwdLngth);
        props.allPassed(allPassed)
    }, [props.password]);


    return (
        <div className="pwd-validations" hidden={props.password.length <= 0}>

            <div className={isPwdLowercase ? "valid" : "invalid"}>
                <span aria-hidden="true">{isPwdLowercase ? '✓' : '✖'} </span>
                <span className="pwd-validation-txt">Password must contain a lower case letter</span>
            </div>
            <div className={isPwdUppercase ? "valid" : "invalid"}>
                <span aria-hidden="true">{isPwdUppercase ? '✓' : '✖'} </span>
                <span className="pwd-validation-txt">Password must contain an upper case letter</span>
            </div>
            <div className={pwdHasSymbol ? "valid" : "invalid"}>
                <span aria-hidden="true">{pwdHasSymbol ? '✓' : '✖'} </span>
                <span className="pwd-validation-txt">Password must contain a special character</span>
            </div>
            <div className={pwdHasNumbers ? "valid" : "invalid"}>
                <span aria-hidden="true">{pwdHasNumbers ? '✓' : '✖'} </span>
                <span className="pwd-validation-txt">Password must contain a number</span>
            </div>
            <div className={pwdLengthReq ? "valid" : "invalid"}>
                <span aria-hidden="true">{pwdLengthReq ? '✓' : '✖'} </span>
                <span className="pwd-validation-txt">Password must contain at least 8 characters</span>
            </div>

        </div>
    )

}
export default PasswordValidations;