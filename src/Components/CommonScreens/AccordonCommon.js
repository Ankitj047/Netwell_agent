import React, { Component } from 'react';
import { createMuiTheme,
  MuiThemeProvider,withStyles } from '@material-ui/core/styles';
import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Grid from '@material-ui/core/Grid';
import Button from "@material-ui/core/Button";
import customStyle from '../../Assets/CSS/stylesheet_UHS';
import configurations from "../../configurations";
import {CopyToClipboard} from 'react-copy-to-clipboard';
import Tooltip from '@material-ui/core/Tooltip';
import styles from "../../Assets/CSS/stylesheet_UHS";
import axios from "axios";
import AIKB from './AIKB';




const StyleTooltip = withStyles({
  tooltip: {
    color: "grey",
    backgroundColor: "#ffffff",
    fontSize:'13px'
  }
})(Tooltip);


const Accordion = withStyles({
  root: {
    border: '1px solid rgba(0, 0, 0, .125)',
    boxShadow: 'none',
    padding:'0px',
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&:before': {
      display: 'none',
    },
    '&$expanded': {
      margin: 'auto',
    },
  },
  expanded: {},
})(MuiAccordion);

const NextButton = withStyles(
    // customStyle.doneBtn
    customStyle.doneNetwellBtn
)(Button);

const AccordionSummary = withStyles({
  root: {
    backgroundColor: 'rgba(0, 0, 0, .03)',
    borderBottom: '1px solid rgba(0, 0, 0, .125)',
    marginBottom: -1,
    minHeight: 56,
    paddingLeft:'16px',
    paddingRight:'0px',
    '&$expanded': {
      minHeight: 56,
    },
  },
  content: {
    '&$expanded': {
      margin: '12px 0',
    },
  },
  expanded: {},
})(MuiAccordionSummary);

const AccordionDetails = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiAccordionDetails);

// export default function CustomizedAccordions() {
//   const [expanded, setExpanded] = React.useState('panel1');

//   const handleChange = (panel) => (event, newExpanded) => {
//     setExpanded(newExpanded ? panel : false);
//   };
class CustomizedAccordions extends Component{
    constructor(props){
        super(props)
        this.state = {
            expanded: 'panel2',
            accordionData:[],
            agentURL: '',
            tooltipShow:false
        }
    }

    componentDidMount(){

        let data = {
            "clientId" : this.props.clientId
        }
        axios.post(configurations.baseUrl + '/enrollment/getClient', data)
            .then(response=>{
                if(response.data.response){
                    let clientName = response.data.response.clientName.replaceAll(' ', '');
                    let url = configurations.AGENT_BASE_URL + clientName + '/' + this.props.agentId
                        if(this.props.empid){
                            url  = url + '/' + this.props.empid
                        }
                    this.setState({
                        agentURL :  url
                    })

                }
            });


      fetch(configurations.baseUrl + '/agentlogin/organizationDocList/' + this.props.clientId +'/Netwell')
      .then(response => response.json())
      .then(data => {
              this.setState({accordionData:data.response})
      });
    }
    handleChange =  panel => (event, expanded) =>{
        this.setState({expanded:expanded ? panel : false})
    }

    copy = (e) => {
        if(this.state.agentURL !== ''){
           // this.state.agentURL.select();
            document.execCommand("copy");
            e.target.focus();
            this.setState({ tooltipShow:true});
            this.hideTooltip()
        }
    }

    hideTooltip=()=>{
      setInterval(() => { 
        this.setState({
          tooltipShow:false
        })
        }, 5000);
    }


    render(){

        /*let dataarray=this.state.accordionData.map((value,i)=>{
            return <div style={{boxSizing:'content-box'}} key={i}>
                <div style={{display : 'inline-flex', width : '100%'}}>
                    {/!*{
                        i === 6 ?
                            <div style={{width : '13%'}}>
                                <svg width="40px" height="40px" viewBox="0 0 16 16" className="bi bi-box-arrow-up-right" fill="#33afb0" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" d="M1.5 13A1.5 1.5 0 0 0 3 14.5h8a1.5 1.5 0 0 0 1.5-1.5V9a.5.5 0 0 0-1 0v4a.5.5 0 0 1-.5.5H3a.5.5 0 0 1-.5-.5V5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 0 0-1H3A1.5 1.5 0 0 0 1.5 5v8zm7-11a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 .5.5v5a.5.5 0 0 1-1 0V2.5H9a.5.5 0 0 1-.5-.5z"/>
                                    <path fillRule="evenodd" d="M14.354 1.646a.5.5 0 0 1 0 .708l-8 8a.5.5 0 0 1-.708-.708l8-8a.5.5 0 0 1 .708 0z"/></svg>
                            </div>

                            :
                            <div style={{width : '13%'}}>
                                <a href={value.docLink} style={{textDecoration:'none',color:'rgba(0, 0, 0, 0.87)',cursor:'pointer'}} target='_blank' download>
                                    <svg width="40px" height="40px" viewBox="0 0 16 16" className="bi bi-download" fill="#eb5757" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" d="M.5 8a.5.5 0 0 1 .5.5V12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V8.5a.5.5 0 0 1 1 0V12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V8.5A.5.5 0 0 1 .5 8z"/>
                                        <path fillRule="evenodd" d="M5 7.5a.5.5 0 0 1 .707 0L8 9.793 10.293 7.5a.5.5 0 1 1 .707.707l-2.646 2.647a.5.5 0 0 1-.708 0L5 8.207A.5.5 0 0 1 5 7.5z"/>
                                        <path fillRule="evenodd" d="M8 1a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-1 0v-8A.5.5 0 0 1 8 1z"/>
                                    </svg></a>
                            </div>
                    }*!/}
                    <div style={{width : '80%', marginTop : '5px'}}>
                        <span style={customStyle.marketingAgent}>{value.title}</span>
                    </div>
                </div>

              {/!*{i === 0
                  ?
                  <span style={customStyle.marketingValue}>{value.description}</span>:<span style={customStyle.marketingValue}>{value.description}</span>}*!/}
            </div>
        })*/
      return (
        <div style={{fontFamily: "Roboto, Arial, Helvetica, sans-serif"}}>
            <StyleTooltip title="Copied to clipboard !" open={this.state.tooltipShow} onClose={this.hideTooltip} placement='top' disableHoverListener>
                  <CopyToClipboard text={this.state.agentURL}>
                    <NextButton style={{width:'100%',fontWeight:'bold', height : 'auto',marginBottom:'8px', marginTop : '0', fontSize : '16px'}} disabled={this.state.agentURL !== '' && this.props.disable}  onClick={(e) => this.copy(e)}>{this.props.empName ? "COPY MY PAGE LINK FOR " + this.props.empName : "COPY MY PAGE LINK"} </NextButton>
                 </CopyToClipboard>
              </StyleTooltip>
              {/* <AIKB/> */}
            <Accordion expanded={this.state.expanded === 'panel3'}  onChange={this.handleChange('panel3')}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel3d-content" id="panel3d-header" style={{backgroundColor:'#ffffff', minHeight: "45px"}}>
                    <Typography style={customStyle.accordioanLabel}>Learning Resources</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Grid item xs={6} sm={6} lg={12}>
                        { (this.state.accordionData && this.state.accordionData.Learning) &&
                        this.state.accordionData.Learning.map((op,index) => (
                            <Typography key={index + 'ul'} component={'ul'} style={{paddingLeft : '10px', margin : '5px'}} >
                                <a href={op.docLink} style={{textDecoration:'none',color:'rgba(0, 0, 0, 0.87)',cursor:'pointer', marginRight : '7px', fontFamily: "Roboto, Arial, Helvetica, sans-serif", fontSize : '14px'}} target='_blank'>
                                    {op.title}
                                </a>
                            </Typography>
                        ))
                        }
                    </Grid>
                </AccordionDetails>
            </Accordion>
            <Accordion expanded={this.state.expanded === 'panel1'}  onChange={this.handleChange('panel1')} >{/*style={{height:'30px'}}*/}
                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1d-content" id="panel1d-header" style={{backgroundColor:'#ffffff', minHeight: "45px"}}>
                    <Typography style={customStyle.accordioanLabel}>Agent Resources</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Grid item xs={6} sm={6} lg={12}>
                        { (this.state.accordionData && this.state.accordionData.Sales) &&
                        this.state.accordionData.Sales.map((op,index) => (
                            <Typography component={'ul'} style={{paddingLeft : '10px', margin : '5px'}}>
                                <a href={op.docLink} style={{textDecoration:'none',color:'rgba(0, 0, 0, 0.87)',cursor:'pointer', marginRight : '7px', fontFamily: "Roboto, Arial, Helvetica, sans-serif", fontSize : '14px'}} target='_blank'>
                                    {op.title}
                                </a>
                            </Typography>
                        ))}
                    </Grid>
                </AccordionDetails>
            </Accordion>
            <Accordion square expanded={this.state.expanded === 'panel2'} onChange={this.handleChange('panel2')} >
            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel2d-content" id="panel2d-header" style={{backgroundColor:'#ffffff', minHeight: "45px"}}>
              <Typography component={'span'} style={customStyle.accordioanLabel}>Member & Prospect Resources</Typography>
            </AccordionSummary>
            <AccordionDetails style={{maxHeight : '500px', overflowX : 'hidden', overflowY : 'auto'}}>
                <Grid item xs={6} sm={6} lg={12}>
                    { (this.state.accordionData && this.state.accordionData.MarketingList) &&
                    this.state.accordionData.MarketingList.map((op,index) => (
                        <Typography key={'newL' + index} component={'ul'} style={{ listStyleType: "none", paddingLeft : '5px', fontFamily: "Roboto, Arial, Helvetica, sans-serif", fontSize : '14px', marginBottom :"9px"}}>
                            <span key={index} style={customStyle.accordioanLabel}>{op.Header}</span>
                            {
                                op.data.map((key, index) => (
                                    <Typography component={'li'} style={{paddingLeft : '10px', margin : '5px'}}>
                                       <a href={key.docLink} style={{textDecoration:'none',color:'rgba(0, 0, 0, 0.87)',cursor:'pointer', marginRight : '7px', fontFamily: "Roboto, Arial, Helvetica, sans-serif", fontSize : '14px'}} target='_blank'>
                                        {key.title}
                                       </a>
                                       
                                    </Typography>
                                ))
                            }
                        </Typography>
                        
                    ))}
                </Grid>                

            </AccordionDetails>
          </Accordion>


        </div>
      );
    }
    }

export default CustomizedAccordions;