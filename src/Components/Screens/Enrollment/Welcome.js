import React, { Component } from "react";
import "./WelcomeNew.css";
import configurations from "../../../configurations";
import axios from "axios";
import Loader from "../../loader";
import AccountCircle from '@material-ui/icons/AccountCircle';

import { Modal } from "react-bootstrap";
import { Button } from "react-bootstrap";

import PrivacyStatement from "./PrivacyStatement";
import Grid from "@material-ui/core/Grid";
export default class Welcome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      agent: {},
      loaderShow: false,
      visible: false,
      quick_quote_url: '',
      enrollment_url: '',
      employerDetails: {},
      STATE_PARAM: {}
    };
  }

  componentDidMount() {
    this.setState({
      loaderShow: true,
    });
    let pathname = window.location.pathname;
    let val = pathname.split("/");
    let agentID, empid = '';
    if (val.length === 5) {
      agentID = val[val.length - 2];
      empid = val[val.length - 1];
    } else {
      agentID = val[val.length - 1];
    }

    axios.get(configurations.baseUrl + "/agentlogin/getAgentById/" + agentID)
      .then((response) => {
        console.log("desc===", response)
        if (response.data.response) {
          this.setState({
            agent: response.data.response,
            loaderShow: false,
          },()=>{
            this.state.agentEmail=this.state.agent.email
            this.state.agentPhone=this.state.agent.phone
          });

          if (empid) {
            axios.get(process.env.REACT_APP_BASE_URL + '/employer/getEmployerByEmpId/' + empid)
              .then(response => {
                console.log(response);
                if (response.data.response) {
                  this.setState({
                    employerDetails: response.data.response
                  })
                }
              });
          }
          let obj = {
            clientId: response.data.response.clientName,
            associationId: response.data.response.associationId,
            brokerId: response.data.response.brokerId,            
            empid: empid,
            agentName:this.state.agent.firstName + " " + this.state.agent.lastName,
            agentEmail:this.state.agentEmail,
            agentPhone:this.state.agentPhone,
            channelName:response.data.response.clientName,
            fromAgent:true

          };
          


          this.setState({
            STATE_PARAM: {
              clientId: response.data.response.clientName,
              associationId: response.data.response.associationId,
              brokerId: response.data.response.brokerId,
              empid: empid
            }
          })
          axios.post(configurations.baseUrl + "/encrypt/encryptData", obj)
            .then((response) => {
              // let quick_quote_url =
              //   configurations.enrollmentURL +
              //   "/quick_quote" +
              //   "#state=" +
              //   response.data.response;

              let quick_quote_url =
                configurations.enrollmentURL +
                "/quick_estimate"+
                "#state=" +
                response.data.response;

              let enrollment_url = configurations.enrollmentURL +
                "/signup" +
                "#state=" +
                response.data.response;
              this.setState({
                loaderShow: false,
                quick_quote_url: quick_quote_url,
                enrollment_url: enrollment_url
              });
            });
        }
      });
  }

  launchEnrollment = (flag) => {
    /*if(flag === 'quick_quote'){
      //window.location.assign(this.state.quick_quote_url);
      window.open(this.state.quick_quote_url, '_blank');
    } else {
      window.location.assign(this.state.enrollment_url);
    }*/
  };

  launchBrouchure(url) {
    window.open(url);
  }

  closeModal() {
    this.setState({
      visible: false,
    });
  }

  render() {
    return (
      <div class="welcome">
        {this.state.loaderShow ? <Loader></Loader> : ""}
        <div class="welcome_topcontainer">
          <div class="welcome_firstcontainer">
            <div style={{ display: 'flex' }}>
              <div style={{ width: '50%' }}>
                <img
                  src={require("../../../Assets/Images/netwell-logo.png")}
                  className="welcome_main_logo"
                />
              </div>
              {/* <div style={{ width: '50%', textAlign: 'end', paddingTop: '30px' }}>
                <div className="welcome_empname">
                  {
                    this.state.employerDetails && this.state.employerDetails.companyName ?
                      this.state.employerDetails.companyName :
                      ''
                  }
                </div>
              </div> */}
            </div>
            <img
              src={require("../../../Assets/Images/family-in-park.jpg")}
              class="welcome_headline_logo"
            />

          </div>

          <div class="new_secondcontainer">
            <div class="welcome_association_conatiner">
              <div>

              </div>
              {this.state.agent.associationImage ? (
                <div class="welcome_association">
                  <img
                    src={this.state.agent.associationImage}
                    class="welcome_association_image"
                  />
                </div>
              ) : null
              }
            </div>
            <div>
              {
                this.state.employerDetails && this.state.employerDetails.companyName ?
                  <div class="createdBg">
                    <h4>Created for:</h4>
                    <h2>{this.state.employerDetails.companyName}</h2>
                  </div> :
                  ''
              }
            </div>


            <div class="infoWrapper">

              {/* {this.state.agent.image ? (
                <img src={this.state.agent.image} style={{marginTop : '10px', width : '60px', height : '60px', borderRadius : '30px'}} />
              ) : null} */}

              {this.state.agent.image ? (
                <img src={this.state.agent.image} style={{ width: '80px', height: '80px', borderRadius: '50%', padding:'5px' }} />
              ) : <AccountCircle style={{ height: '80px', width: '80px' }} />}

              <div class="welcome_username">
                {this.state.agent.firstName + " " + this.state.agent.lastName}
              </div>
              <div class="welcome_number">{this.state.agent.phone}</div>
              <div class="welcome_email">{this.state.agent.email}</div>

              {this.state.agent.description &&
                <div class="welcome_description">{this.state.agent.description}</div>
              }

            </div>
            <div class="new_bottom_center ">
              {/* <div>
                <img
                  src={require("../../../Assets/Images/Floral_Motif.png")}
                  class="welcome_floral"
                />
              </div> */}

            {/* Enroll today */}

              <div>
                <div class="welcome_button_container">
                  <button type="button" class="btn welcome_enroll_button">
                    <a 
                      // href={this.state.enrollment_url} 
                      style={{ textDecoration: 'none', color: "#fff" }} target="_blank">ENROLL TODAY!</a>
                  </button>
                </div>
              </div>

              <div>
                <div class="welcome_button_container2">
                  <button
                    type="button"
                    class="btn2 welcome_quick_button"
                    // disabled={true}
                    style={{ border: 'solid 2px #bdc3cb',color:'#4782c4'}}
                  > {/*onClick={() => this.launchEnrollment("quick_quote")}*/}
                    {/* <a href={this.state.quick_quote_url} style={{ textDecoration: 'none', color: "#e9716f" }} target="_blank">GET A QUICK QUOTE</a> */}

                    <a 
                      // href={this.state.quick_quote_url} 
                      style={{textDecoration: 'none',color:'#bdc3cb' }} target="_blank">QUICK ESTIMATE</a>
                      {/* QUICK ESTIMATE */}


                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="welcome_header_netwell">Enjoy Wellness Now</div>

        {/* =============================Midddle Container================== */}
        <div class="welcome_middlecontainer">
          <div class="welcome_floral_containerdiv">
            {/* <img
              src={require("../../../Assets/Images/netwell-logo.png")}
              class="welcome_floral01_img"
            /> */}

            <div class="welcome_floral_middle_div">
              <div class="welcome_middle_firstcontainer">
                <div class="welcome_paragraph">
                netWell is a Health Care Sharing Ministry (HCSM) that cares for its members as a family. 
                netWell members share a common set of religious and ethical beliefs. The members contribute 
                and share in each other’s eligible medical requests based on those same beliefs. We invite 
                anyone who shares in our Statement of Religious and Ethical Beliefs to join our membership.
                </div>

                <div class="welcome_paragraph">
                We have membership options that provide a variety of care to fit your needs. 
                Many people shift to a healthcare sharing ministry for help with increased healthcare 
                costs and uncertainty around insurance, that’s exactly why we created the netWell membership. 
                We’re proud to provide options to suit your healthcare needs to protect you and your family 
                at reasonable rates. Discover the details of each membership options by reaching out to us.
                </div>

                {/* <div class="welcome_paragraph">
                  Universal Health Fellowship was founded to support neighbors
                  helping neighbors through our health and wellness cost-sharing
                  programs. Our Universal HealthShare programs offer a more
                  affordable way for many to achieve better health and wellness.
                </div> */}
              </div>

              
              {
                (this.state.agent.clientId == '6548' || this.state.agent.clientId == '4367'|| this.state.agent.clientId == '5540' || this.state.agent.clientId == '4376' || this.state.agent.clientId == '5558' || this.state.agent.clientId == '4386') ?
                  <div className="welcome_middle_secondcontainer">
                  {/* <img src={require("../../../Assets/Images/Brochure.png")} className="welcome_brochure_logo" />
                  <div className="welcome_bookname text-center">
                          Sharing Program Brochure for Households
                          </div>
                          <img src={require("../../../Assets/Images/Download.png")} className="welcome_download_logo"
                          onClick={() => this.launchBrouchure('https://carynhealth-memberportal-prod-documents.s3.us-east-2.amazonaws.com/UHF-Agent/UHS-Healthy-Life-Program-Household-Brochure.pdf')} />
                         */}
                              
                  </div> :
                  this.state.agent.clientId == '5541' || this.state.agent.clientId == '4377' ?
                  <div className="welcome_middle_secondcontainer">
                  {/* <img src={require("../../../Assets/Images/Brochure.png")} className="welcome_brochure_logo" />
                  <div className="welcome_bookname text-center">
                          Sharing Program Brochure for Households
                          </div>
                          <img src={require("../../../Assets/Images/Download.png")} className="welcome_download_logo"
                          onClick={() => this.launchBrouchure('https://carynhealth-memberportal-prod-documents.s3.us-east-2.amazonaws.com/UHF-Agent/UHS-Community-HealthShare-Program-Brochure.pdf')} /> */}
                          </div>
                  :
                  <div className="welcome_middle_secondcontainer">
                    {/* <img src={require("../../../Assets/Images/Brochure.png")} className="welcome_brochure_logo" />
                    <div className="welcome_bookname text-center">
                    Sharing Program Brochure
                    </div>
                    <img src={require("../../../Assets/Images/Download.png")} className="welcome_download_logo"
                      onClick={() => this.launchBrouchure("https://carynhealth-memberportal-prod-documents.s3.us-east-2.amazonaws.com/UHF-Agent/UHS-Sharing-Program-Brochure.pdf")} /> */}
                  </div>
                  
              }
              {/* {
                (this.state.agent.clientId !== '6548' || this.state.agent.clientid !== '4367') ?
                  <div className="welcome_middle_secondcontainer">
                    <img src={require("../../../Assets/Images/Brochure.png")} className="welcome_brochure_logo" />
                    <div className="welcome_bookname text-center">
                      Health Care Cost Sharing Programs
                      </div>
                    <img src={require("../../../Assets/Images/Download.png")} className="welcome_download_logo"
                      onClick={() => this.launchBrouchure("https://carynhealth-memberportal-prod-documents.s3.us-east-2.amazonaws.com/UHF-Agent/UHS-Sharing-Program-Brochure.pdf")} />
                  </div>
                  :
                  <>
                    <div className="welcome_middle_secondcontainer">
                      <img src={require("../../../Assets/Images/Brochure.png")} className="welcome_brochure_logo" />
                      <div className="welcome_bookname text-center">
                        Healthy Life Programs
                        </div>
                      <img src={require("../../../Assets/Images/Download.png")} className="welcome_download_logo"
                        onClick={() => this.launchBrouchure('https://carynhealth-memberportal-prod-documents.s3.us-east-2.amazonaws.com/UHF-Agent/UHS-Healthy-Life-Program-Grid.pdf')} />
                    </div>
                    <div className="welcome_middle_secondcontainer">
                      <img src={require("../../../Assets/Images/Brochure.png")} className="welcome_brochure_logo" />
                      <div className="welcome_bookname text-center">
                        EasyShare Programs
                        </div>
                      <img src={require("../../../Assets/Images/Download.png")} className="welcome_download_logo"
                        onClick={() => this.launchBrouchure('https://carynhealth-memberportal-prod-documents.s3.us-east-2.amazonaws.com/UHF-Agent/UHS-Healthy-Life-EasyShare-Program-Grid.pdf')} />
                    </div>
                  </>
              } */}


            </div>

            {/* <img
              src={require("../../../Assets/Images/floral_02.png")}
              class="welcome_floral02_img"
            /> */}
          </div>
          {/* <div class="welcome_middle_firstcontainer">
        
            <div class="welcome_paragraph">
              Health care prices and deductibles are rising faster than our
              income, and traditional health insurance products are offered by
              huge business interests under a complex web of rules and
              regulations. The results are clear: many traditional health
              insurance programs are too expensive for many Americans, leaving
              them either uninsured or underinsured.
            </div>

            <div class="welcome_paragraph">
              Sharing programs from religious ministries have been around for
              more than 30 years. Today, sharing has evolved through the growth
              of health care cost-sharing ministries. Over two million American
              families and individuals are sharing each other’s medical expenses
              through such ministry programs.
            </div>

            <div class="welcome_paragraph">
              Universal Health Fellowship was founded to support neighbors
              helping neighbors through our health and wellness cost-sharing
              programs. Our Universal HealthShare programs offer a more
              affordable way for many to achieve better health and wellness.
            </div>
          </div> */}

          {/* <div class="welcome_middle_secondcontainer">
            <img
              src={require("../../../Assets/Images/Brochure.png")}
              class="welcome_brochure_logo"
            />
            <div class="welcome_bookname text-center">
              Health Care Cost Sharing Programs
            </div>

            <img
              src={require("../../../Assets/Images/Download.png")}
              class="welcome_download_logo"
              onClick={() => this.launchBrouchure()}
            />
          </div> */}
        </div>

        {/* <img
          src={require("../../../Assets/Images/Illustration.png")}
          class="welcome_illustration"
        /> */}

        <div style={{ flexGrow: 1 }} className="welcome_footer_container">
          <Grid container direction="row" justify="space-evenly" alignItems="center">
            <Grid xs={12} sm={12} item={true} style={{ display: 'flex' }}>
              <Grid item={true} xs={10} sm={10}>
                <div className="welcome_copyright">
                Copyright © 2022 netWell. All Rights Reserved
                </div>
              </Grid>
              {/* onClick={() => this.setState({ visible: true })} */}
              <Grid item={true} xs={2} sm={2}>
                <div className="welcome_privacypolicy" >
                  Privacy Policy
                </div>
              </Grid>
            </Grid>
            {/*<Grid xs={12} sm={12} item={true} style={{display : 'flex'}}>

            </Grid>*/}
          </Grid>
        </div>

        <div style={{ width: '100%', textAlign: 'end', fontSize: '12px', backgroundColor: '#e3e3e3' }}>
          CID : {this.state.STATE_PARAM.clientId} OID: {this.state.STATE_PARAM.associationId}, BID
          : {this.state.STATE_PARAM.brokerId}, EID : {this.state.employerDetails.companyName ? this.state.employerDetails.companyName :"NA"}
        </div>


        {/* ============================Modal Pop Up Privacy policy=================== */}

        <Modal
          show={this.state.visible}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          // style={{maxWidth:'450px',marginLeft:'25%',}}
          // dialogClassName="modal_welcome_container"
          onHide={(event) => this.setState({ visible: false })}
        >
          <Modal.Header closeButton style={{ backgroundColor: "#33afb0" }}>
            <Modal.Title id="contained-modal-title-vcenter">
              Privacy Policy
            </Modal.Title>
          </Modal.Header>
          <Modal.Body
            style={{
              "max-height": "calc(100vh - 220px)",
              // "max-width": "calc(50vh - 300px)",
              "overflow-y": "auto",
            }}
          >
            <PrivacyStatement />

            <div class="text-right ">
              <button
                class="launch"
                onClick={() => this.setState({ visible: false })}
              >
                CANCEL
              </button>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

const policytext1 =
  "Privacy is not a new concept.This data is critical to the person it belongs to. Data privacy and security binds individuals and industries together and runs complex systems in our society. From credit card numbers and social security numbers to email addresses and phone numbers, our sensitive, personally identifiable information is important. This sort of information in unreliable hands can potentially have far-reaching consequences.Companies or websites that handle customer information are required to publish their Privacy Policies on their business websites. If you own a website, web app, mobile app or desktop app that collects or processes user data, you most certainly will have to post a Privacy Policy on your website (or give in-app access to the full Privacy Policy agreement).";
