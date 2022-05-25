import React, { Component } from 'react';
import customeStyle from './login.css';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Auth } from "aws-amplify";
class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mobile: '',
            error: '',
            username: '',
            password: '',
            newPasswordInput: '',
            loading: false,
            newPassword: false,
            user: {},
            title: 'Login To Caryn',
            changePasswordResponse: {},
        }
    }


    signIn = async () => {

        this.setState({ loading: true, error: '' });

        if (this.state.username === '' || this.state.password === '') {

            this.setState({ loading: false, error: 'Please enter required fields' });

        } else {

            await Auth.signIn(this.state.username, this.state.password)
                .then(success => {

                    const name = this.state.username
                    this.setState({ user: success, error: '', username: '', password: '', loading: false });
                    //to visible change password component
                    if (this.state.user.challengeName === 'NEW_PASSWORD_REQUIRED') {
                        this.setState({ title: 'Change Password', newPassword: true });
                    } else {

                        localStorage.setItem("username", name)

                        localStorage.setItem("login", "true").then(() => {
                            this.props.navigation.navigate('HomeScreen')
                        })

                    }
                    console.log(this.state.user.username)
                }
                )
                .catch((error) => {
                    this.setState({ loading: false, error: error.message });
                });
        }

    }

    onChangeTextpassword(event) {
        if (event.target.value !== '') {
            this.setState({ password: event.target.value })
        } else {
            this.setState({ password: '' })
        }
        this.setState({ error: '' });
    }

    onChangeTextEmail(event) {
        if (event.target.value !== '') {
            this.setState({ username: event.target.value })
        } else {
            this.setState({ username: '' })
        }
        this.setState({ error: '' });
    }

    buttonPress(event) {
        this.signIn().then(() => {
            console.log("DONE")
        })

    }

    render() {
        return (
            <div>
                <div style={{ marginTop: '75px', width: '95.2%', marginLeft: '2.4%', marginRight: '2.4%' }}>
                    <div style={customeStyle.loginBox}>
                        <form noValidate autoComplete="off">
                            <TextField id="filled-basic" label="Username" value={this.state.username} onChange={event => this.onChangeTextEmail(event)} variant="filled" style={customeStyle.textField} />
                            <TextField id="filled-basic" label="Password" value={this.state.password} onChange={event => this.onChangeTextpassword(event)} variant="filled" style={customeStyle.textField} />
                            <Button variant="contained" color="primary" onClick={event => this.buttonPress(event)} style={customeStyle.loginButton}>
                                SignIn
                            </Button>
                        </form>

                    </div>
                </div>
            </div>);
    }
}

export default Login;