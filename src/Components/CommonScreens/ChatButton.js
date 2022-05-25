import React,{Component} from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import style from '../../Assets/CSS/stylesheet_UHS';
import Fab from "@material-ui/core/Fab";
import ForumIcon from "@material-ui/icons/Forum";
import Grid from "@material-ui/core/Grid";
// import i18n from "../../i18next";


const CrudButton = withStyles(
    style.crudBtn,
)(Fab);



export default  class ChatButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chatState:0,
            customerServiceNo : ''
        }
    }

    componentDidMount(){
        window.addEventListener('Chat',this.setChat);
    }

    setChat=(e)=>{
        //this.setState({chatState:e.detail.flag})
    }

    componentWillUnmount() {
        window.removeEventListener('Chat',this.setChat);
    }


    render() {
        return (
            <div>
                <div style={style.FooterChildWrp1}>
                    <div style={{marginLeft:'auto',marginRight:'9.5%'}}>
                        {/* <CrudButton className={'purechat-button-expand'} onClick={()=>window.pureChat()} color="primary" aria-label="add"  style={style.CommonChatBtnNetwell}> */}
                        <CrudButton className={'purechat-button-expand'} color="primary" aria-label="add"  style={style.CommonChatBtnNetwell}>
                            <ForumIcon />
                        </CrudButton>
                    </div>
                </div>
                <div style={style.FooterChildWrp2}>
                    <Grid xs={12} style={style.QuickQtHelpWrp} item={true}>
                        <div style={{display:'flex',flexDirection:'column',color: '#304d63', fontSize: '14px', lineHeight: '16px',textAlign:'right', paddingRight:'0.9vw'}}>
                            <div style={{display:'flex',justifyContent:'flex-end',marginBottom:'2px'}}>
                                <span style={style.QuickQtHelpTxt1}>Need Help?</span>
                            </div>
                            <span style={style.QuickQtHelpTxt2}> Chat with netWell Agent Support.</span>
                        </div>
                    </Grid>
                </div>
            </div>
        )
    }

}


