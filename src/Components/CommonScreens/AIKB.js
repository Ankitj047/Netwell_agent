import React from 'react';
import {Form, Modal} from "react-bootstrap";
import { Fab } from '@material-ui/core';
import FullscreenIcon from '@material-ui/icons/Fullscreen';
import FullscreenExitIcon from '@material-ui/icons/FullscreenExit';
import CloseIcon from '@material-ui/icons/Close';
// import AskCaryn from '../../Assets/Images/ask_caryn_beta_logo_desktop.png';
import AskCaryn from '../../Assets/Images/ask_caryn icon.svg';
import CryptoJS from "crypto-js";
import {Auth} from "aws-amplify";
import configurations from "../../configurations";
import axios from "axios";
import IconButton from '@material-ui/core/IconButton';
export default class AIKB extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            documentmessage:"",
            ModalpopUp:false,
            url:"",
            enlarge:false,
            USERDATA: JSON.parse(sessionStorage.getItem('USER_DATA')),
            agentId:null,
            clientid: Number(localStorage.getItem('clientId')),
            programName:"",
        }
    }
    componentDidMount() {

      Auth.currentAuthenticatedUser()
      .then((user) => {
          let data = this.parseJwt(user.signInUserSession.idToken.jwtToken)
            let clientid = parseInt(data["custom:ChannelId"])
            this.getProgramName(clientid);
            this.setState({agentId:data["custom:agentid"]})
        })
    }
    openAskCaryn=(e)=> {
       e && e.preventDefault();
        let urlData={
          "memberId": this.state.agentId,
          "query": this.state.documentmessage,
          "ChannelUId":"agentportal",
          contextkeywords: [
            {
              programName: this.state.programName,
              planName: ""
            }
          ]
        }
        console.log(urlData)
        let key = CryptoJS.enc.Utf8.parse("000102030405060708090a0b0c0d0e0f");
        let iv = CryptoJS.enc.Utf8.parse("4t7w9z$C&F)J@NcR");
        let input = CryptoJS.enc.Utf8.parse(JSON.stringify(urlData));
        var dataEncrypt = CryptoJS.AES.encrypt(input, key, { keySize: 256 / 32, iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 }).toString();
        this.setState({url:`https://inf-labs.com/?isnav=false&data=${encodeURIComponent(dataEncrypt)}`},()=>{
          this.setState({ModalpopUp:true})
        })
     }
    render(){
        return (<div>
          <form onSubmit={this.openAskCaryn}>
             <div style={{ justifyContent:'space-between', display:'flex'}}>
                    <Form.Control value={this.state.documentmessage} required placeholder="Do you have a question?"  style={stylesheet.searchInputBox} onChange={e=>this.setState({documentmessage: e.target.value})}/>
                    {/* <Fab style={{backgroundColor:"#4782c4", width:38, height:38, right:14, position: "relative", marginTop:5}} type="submit" onClick={()=>this.openAskCaryn(false)}> */}
                                {/* <img width="37" src={require('../../Assets/Images/carynIcon.jpg')} /> */}
                                <IconButton style={{backgroundColor:"#4782c4",width:38, height:38, right:20, position: "relative", marginTop:5}} type="submit" onClick={()=>this.openAskCaryn(false)}>
                                <img width="37" style={{width:'20px'}} src={require('../../Assets/Images/ask_caryn icon.svg')} />
                                </IconButton>
                    {/* </Fab> */}
            </div>
            </form>
            <Modal size={this.state.enlarge?"xl":"lg"} show={this.state.ModalpopUp} onHide={() => this.setState({ModalpopUp: false, documentmessage:""})} backdrop="static" >
                        <Modal.Header className="header-container">
                              <div className="logo"> 
                                  <img src={AskCaryn} width="95%"/>
                              </div>
                              <div className="caption">Your AI-Powered Assistant</div>
                              <div className="icons-header">
                                {this.state.enlarge?<FullscreenExitIcon style={{color:'white', cursor:'pointer'}} onClick={()=>this.setState({enlarge:false})}/>:<FullscreenIcon style={{color:'white', cursor:'pointer'}} onClick={()=>this.setState({enlarge:true})}/>}
                                <CloseIcon style={{color:'white', marginLeft:10, cursor:'pointer'}} onClick={() => this.setState({ModalpopUp: false, documentmessage:""})}/>
                              </div>
                        </Modal.Header>     
                                 <iframe height={this.state.enlarge?"550px":"500px"} width="100%" src={this.state.url}></iframe>
                            
                </Modal>
        </div>)
    }
    getProgramName=(clientid) => {
      axios.post(configurations.baseUrl + '/enrollment/getClient',  {"clientId" : clientid })
      .then(response=>{
          if(response.data.response){
              this.setState({
                programName : response.data.response.programName
              })  
          }
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
}
const stylesheet={
    searchInputBox:{
        borderRadius:40, 
        paddingRight:32, 
        paddingLeft:12,
        width:'100vw', 
        // borderColor:'#420045', 
        borderColor:'#7e7e7e', 

        borderWidth:'revert',
        marginBottom:10,
        marginTop:5,
        marginRight:-9
    }
  }