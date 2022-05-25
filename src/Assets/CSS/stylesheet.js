export default{
    textField:{
        root: {
            '& .MuiFilledInput-root': {
                backgroundColor: '#f8f8f8',
                color: '#19191d',
                fontSize: '16px',
                lineHeight: '24px',
                height: '56px',
                borderColor: '#533278',
                '&:hover': {                   
                    backgroundColor: '#f4f4f4',
                  color: '#533278',
            },
            // "& input::-webkit-clear-button, & input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
            //     display: "none"
            // },
            '::-ms-clear': {
                display: 'none'
              },







                  "&:hover:not($disabled):not($focused):not($error):before": {
                    // hover
                    borderBottom: '2px solid #533278'
                  },
                '&.MuiFilledInput-underline:after':{
                    borderBottom: '2px solid #533278'
                },
                '&.MuiFilledInput-underline.Mui-error:after':{
                    //borderBottomColor: '#f44336'
                    borderBottom: '2px solid #f44336',
                    
                },
            },
            '&.MuiInputBase-formControl': {
                height: '56px',
            },
             '& .Mui-focused': {
                
                 
             },
            '& .MuiInputLabel-filled': {
                wordBreak: 'normal',
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis',
                width: '98%',
                overflow: 'hidden'
            },

            '& label.Mui-focused': {
                color: '#533278',
                wordBreak: 'normal',
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis',
                width: '98%',
                overflow: 'hidden'
            },

            '& p.MuiFormHelperText-contained' : {
                margin : 0,
                fontSize: "12px",
                marginTop : '6px'
            }
        }
    },
    paperStyle:{
        padding:'15px',margin:'25px',
        height:'300px'
    },
    phonetextField:{
        root: {
            '& .MuiFilledInput-root':  {
                position: 'relative',
                transition: 'background-color 200ms cubic-bezier(0.0, 0, 0.2, 1) 0ms',
                /* background-color: rgba(0, 0, 0, 0.09); */
                borderTopLeftRadius: '4px',
                borderTopRightRadius: '4px',
            },
            '&.Mui-focused fieldset': {
                borderColor: '1px solid green',
            },
                '&.MuiInput-underline-24:after':{
                    borderBottomColor: '2px solid #533278'
                },
                '&.MuiFilledInput-underline.Mui-error:after':{
                    borderBottomColor: '#f44336'
                },
            //     "&:hover:not($disabled):not($focused):not($error):before": {
            //         // hover
            //         borderBottomColor: '2px solid #533278'
            //       },
            // '& .Mui-focused': {
            //     borderBottomColor: '2px solid #533278'
            // },
            '& label.Mui-focused': {
                color: '#533278',
               
            },

            '& p.MuiFormHelperText-contained' : {
                margin : 0,
                fontSize: "12px",
                marginTop : '6px'
            }
        }
    },
    multiLineTextField:{
        root: {
            '& .MuiFilledInput-root': {
                backgroundColor: '#f8f8f8',
                color: '#19191d',
                fontSize: '16px',
                lineHeight: '24px',
                //height: '56px',
                borderColor: '#533278',
                '&:hover': {
                    backgroundColor: '#f4f4f4',
                    color: '#533278'
                },
              
                '&.MuiFilledInput-underline:after':{
                    borderBottom: '2px solid #533278'
                },
                '&.MuiFilledInput-underline.Mui-error:after':{
                    borderBottomColor: '#f44336'
                }
               

            },

            '& .MuiInputLabel-filled': {
                /*wordBreak: 'normal',
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis',
                width: '90%',
                overflow: 'hidden'*/
            },

            '& label.Mui-focused': {
                color: '#533278',
                /*wordBreak: 'normal',
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis',
                width: '95%',
                overflow: 'hidden'*/
            },

            '& .Mui-focused': {

            },

            '& p.MuiFormHelperText-contained' : {
                margin : 0,
                fontSize: "12px",
                marginTop : '6px'
            }
        }
    },
    textFieldWrp: {
        width: '100%',
        marginTop: '0',
        marginBottom: '0',
        marginLeft: '0',
        borderRadius: '4px',
        
    },

    tableCell : {
        root: {
            padding: '10px',
           
        },
        head: {
            backgroundColor: '#4a4b57',
            color: '#d2d2d6',
            fontSize: '14px',
            lineHeight: '22px'
        },
        body: {
            fontSize: '16px',
            lineHeight: '24px',
            color: '#ffffff',
           
        },
        
    },

    tableRow : {
        root: {
            backgroundColor: '#9696a0',
            height: '38px',
            padding: '10px'
        },
    },

    lastRow : {
        backgroundColor : '#4a4b57',
        //borderBottom : '2px solid #420045'
    },
    otherRow : {
        backgroundColor : '#9696a0'
        //borderBottom : '2px solid #420045'
    },

    cellOverflow : {
        wordBreak: 'normal',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        overflow: 'hidden',
        maxWidth: '90px'
    },

    dropDown : {
        width: '100%',
        marginTop: '0',
        marginBottom: '0',
        marginLeft: '0',
        borderRadius: '4px',
        height: '56px'
    },
    multiSelect:{
        backgroundColor: '#ffffff',
        padding: '10px',
        fontSize: '14px',
        lineHeight: '16px',
    },
    //============================Eligibility=======================================
    physicianTxtWrp:{
        width:'35%',
        //height:'56px',
        //backgroundColor:'#f1f1f1',
        Color:'#19191d',
        //borderRadius:'4px',
        marginTop:'30px',
        fontSize:'14px'
    },
    NextButton:{
        root: {
            width: '120px',
            height: '40px',
            backgroundColor: '#533278',
            color: '#ffffff',
            '&:hover': {
                backgroundColor: '#663a98',
                boxShadow: '0 4px 8px 0 #cdaccf, 0 2px 4px 0 #cdaccf',
            },
            '&:focus':{
                outline:'none'
            },
            '&:disabled': {
                backgroundColor: '#c4c4c4',
                color: '#f2f2f2'
            },
        },
    },

    areaField: {
        width: '100%',
        marginTop: '0',
        marginBottom: '0',
        marginLeft: '0',
        borderRadius: '4px'
    },

    datePicker:{
        width: '23%',
        height: '56px',
        color: '#19191d',
        borderRadius: '4px', 
        padding: '8px'
    },
    datePickerr:{
        width: '35%',
        height : '60px',
        backgroundColor: '#f1f1f1',
        color: '#19191d',
        borderRadius: '4px',
        marginTop:'30px'
    },
    elginputStyle:{
        fontSize: 18,
        color: '#19191d',
        fontFamily: "Roboto, Arial, Helvetica, sans-serif",
        backgroundColor:'#f1f1f1',
        paddingRight:'14px',
        paddingLeft:'14px',
        marginTop:'10px',
        outline:'0px'
    },
    elginputLabelStyle:{
        fontSize: 16,
        paddingLeft:16,
        paddingRight:16,
        paddingTop:4
    },
    elganswerCheck:{
        fontSize: '14px',
        lineHeight: '16px',
        marginBottom: '5px'
    },
    disqualifiedWrp:{
        width:'100%',
        maxHeight: '400px',
        overflowX: 'hidden',
        overflowY: 'auto' ,
        display:'flex',
    },
    disqfTextWrp:{
        width:'40%',
        display: "flex",
       flexDirection: "column",
        fontSize: '14px',
        lineHeight: '16px',
    },
    disqfTableWrp:{
        width:'55%',
        fontSize: '14px',
        lineHeight: '16px',
        marginLeft:'5%',
    },
    // =========================================EnrollFamily================================================
    w60:{
        width:'60%'
    },
    w40:{
        width:'40%'
    },
   w28:{
    width:'28%'
   },
    w90px:{
        width: '90px'
    },
    w90:{
        width: '90%'
    },
    w23 : {
        width : '23%'
    },
    w35p:{
        width: '35%'
    },
    w290px:{
        width: '290px'
    },
    w370px:{
        width: '370px'
    },
    w380px:{
        width: '380%'
    },
    w375px:{
        width: '375px',
       
    },
    w100px:{
        width: '100px'
    },
    w55:{
        width:'55%'
    },
    w224:{
        width : '224px'
    },

    w100 : {
        width : '100%'
    },
    w49:{
        width:'49%'
    },
    w50 : {
        width : '50%'
    },
    w51:{
        width:'51%'
    },
    w30 : {
        width : '30%'
    },
    w31 : {
        width : '31%'
    },
    w26 : {
        width : '26%'
    },
    w71 : {
        width : '71%'
    },
    w69:{
        width : '69%'
    },
    w74:{
        width : '74%'
    },
    w70 : {
        width : '70%'
    },
    w10 : {
        width : '10%'
    },
    p10 : {
        padding : '10px'
    },
    p20 : {
        padding : '20px'
    },
    p5 : {
        padding : '5px'
    },
    pt9:{
        paddingTop:'9px'
    },
    m10 : {
        margin : '10px'
    },
    m20:{
        marginTop : '20px'
    },
    m5 : {
        margin : '5px'
    },
    mt10 : {
        marginTop : '10px'
    },
    mt5 : {
        marginTop : '5px'
    },
    mb10 : {
        marginBottom : '10px'
    },
    mb5 : {
        marginBottom : '5px'
    },

    /*==========================  button class ========================================*/
    btn : {
        root: {
            backgroundColor: '#ffffff',
            color: '#533278',
            '&:hover': {
                backgroundColor: '#f4f4f4',
                boxShadow: '0 4px 8px 0 #cdaccf, 0 2px 4px 0 #cdaccf'
            },
            '&:disabled': {
                backgroundColor: '#f0f0f1',
                color: '#b4b4bb'
            },
            '&:focus':{
                outline:'none'
            }
        },
    },

    crudBtn : {
        root: {
            backgroundColor: '#533278',
            color: '#ffffff',
            '&:hover': {
                backgroundColor: '#663a98',
                boxShadow: '0 4px 8px 0 #cdaccf, 0 2px 4px 0 #cdaccf',
            },
            '&:focus':{
                outline:'none'
            },
            '&:disabled': {
                backgroundColor: '#cdaccf',
                color: '#f2f2f2'
            },
        },
    },

    delBtn : {
        root: {
            backgroundColor: '#f44336',
            color: '#ffffff',
            '&:hover': {
                backgroundColor: '#F6675E',
                boxShadow: '0 4px 8px 0 #cdaccf, 0 2px 4px 0 #cdaccf',
            },
            '&:focus':{
                outline:'none'
            },
            '&:disabled': {
                backgroundColor: '#cdaccf',
                color: '#f2f2f2'
            },
        },
    },

    doneBtn : {
        root: {
            width: '120px',
            height: '40px',
            marginTop: '53px',
            paddingTop: '9px',
            backgroundColor: '#533278',
            color: '#ffffff',
            '&:hover': {
                backgroundColor: '#663a98',
                boxShadow: '0 4px 8px 0 #cdaccf, 0 2px 4px 0 #cdaccf',
            },
            '&:focus':{
                outline:'none'
            },
            '&:disabled': {
                backgroundColor: '#c4c4c4',
                color: '#f2f2f2'
            },
        },
    },
    ViewButton : {
        root: {
            backgroundColor: '#ffffff',
            color: '#533278',
            width: '100%',
            height: '40px',
            fontSize: '14px',
            fontWeight: '500',
            fontStretch: 'normal',
            fontStyle: 'normal',
            lineHeight: 'normal',
            letterSpacing: '0.75px',
            borderRdius: '4px',
            '&:hover': {
                backgroundColor: '#f4f4f4',
                boxShadow: '0 4px 8px 0 #cdaccf, 0 2px 4px 0 #cdaccf'
            },
            '&:disabled': {
                backgroundColor: '#f0f0f1',
                color: '#b4b4bb'
            },
            '&:focus':{
                outline:'none'
            },
        },
    },


    popUpDoneBtn : {
        root: {
            backgroundColor: '#ffffff',
            color: '#533278',
            width: '90px',
            height: '30px',
            fontSize: '14px',
            fontWeight: '500',
            fontStretch: 'normal',
            fontStyle: 'normal',
            lineHeight: 'normal',
            letterSpacing: '0.75px',
            borderRdius: '4px',
            '&:hover': {
                backgroundColor: '#f4f4f4',
                boxShadow: '0 4px 8px 0 #cdaccf, 0 2px 4px 0 #cdaccf'
            },
            '&:disabled': {
                backgroundColor: '#f0f0f1',
                color: '#b4b4bb'
            },
            '&:focus':{
                outline:'none'
            },
        },
    },

    proceedBtn : {
        root: {
            backgroundColor: '#533278',
            color: '#ffffff',
            '&:hover': {
                backgroundColor: '#663a98',
                boxShadow: '0 2px 4px 0 rgba(79, 79, 79, 0.5)',
            },
            '&:focus':{
                outline:'none'
            },
            '&:disabled': {
                backgroundColor: '#cdaccf',
                color: '#f2f2f2'
            },
        },
    },

    viewBtn : {
        root: {
            backgroundColor: '#ffffff',
            color: '#533278',
            '&:hover': {
                backgroundColor: '#f4f4f4',
                boxShadow: '0 4px 8px 0 #cdaccf, 0 2px 4px 0 #cdaccf'
            },
            '&:disabled': {
                backgroundColor: '#f0f0f1',
                color: '#b4b4bb'
            },
            '&:focus':{
                outline:'none'
            },
        },
    },
    /*==========================  button class ========================================*/

    /*==========================  radio button ========================================*/
    radioBtn : {
        root: {
            color: '#533278',
            '&$checked': {
                color: '#533278',
            },
        },
        checked: {},
    },
    /*==========================  radio button ========================================*/

    //----class for setupfamily--------

    setupfamilyFname:{
        float:'left',
        display:'flex',
        width:'100%',
        marginTop : '15px'
    },
    setupfamilyfnameAfter:{
        display: 'inline-block', 
        width: '23%', 
        marginRight: '2.5%', 
        borderColor: '#533278',

    },
    setupfamilyLname:{
        display: 'inline-block', 
        width: '23%',
         marginRight: '2.5%',


    },
    setupfamilyGender:{
        display: 'inline-block',
         width: '14.4%',
         marginRight: '2.5%'
    },  
    setupfamilyAge:{
        display: 'inline-block',
         width: '8.2%', 
        marginRight: '2.5%'
    }, 
   
    setupfamilyUrDetails:{
        float: 'left', 
        display: 'flex',
         width: '100%',
          marginTop : "5px"
    } ,
    setupfamilyUrdetailsAge:{
        display: 'inline-block', 
        width: '8.2%', 
        marginRight: '24.1%' 
    },
    setupfamilyUrHeading:{
        display: 'inline-block',
         width: '100%' 
    },
    setupfamilyDurationbody:{
        /*float: 'left',*/
        width: '100%',
        maxHeight: '200px',
        overflowX: 'hidden',
        overflowY: 'auto' ,
        
    },
    setupfamilyDurationBodyBefore:{
        float: 'left',
        display: 'flex',
        width: '100%',
        marginBottom: '9px',
         marginTop : "5px"
    },

 // =========================================EnrollFamily================================================
//------EnrollNew1-----
    EnrollNew1:{
        display: 'flex',
         width: '100%',
         marginBottom: '20px'
    },
    enrollFamilyDisplay:{
       
        display: 'flex',
        height: '30px',
        marginBottom:'10px'
       
    },
    EnrollNew1Display:{
         display: 'flex'
    },
    enrollFamilySpan:{
        marginBottom : '10px',
        display : 'flex'
    },
    enrollFamilyNotification:{
        fontSize: '14px',
        lineHeight: '16px'
    },
    enrollFamilyEnrollStyle:{
         fontSize: '14px',
         lineHeight: '16px',
         fontWeight: 'bold'
    },
    EnrollNew1Zip:{
        width: '224px',
         marginRight: '24px',
          marginTop: '24px'
    },
    EnrollNew1City:{
        width: '224px',
        marginTop: '24px'
    },
    EnrollNew1State:{
         display: 'flex',
          marginRight: '24px',
         marginTop: '24px'
    },
    EnrollNew1Country:{
        width: '224px',
        marginTop: '0px',
        marginLeft: '24px'
    },
    EnrollNew1Instruction:{
        fontSize: '14px',
         lineHeight: '16px',
         width: '300px'
    },


//-----------EnrollNew2-----------------
        EnrollNew2Date:{
            width: '273px', 
            height: '56px',
            borderRadius: '4px',
            marginRight: '24px',
            fontSize: '14px' ,
            backgroundColor: '#f8f8f8',
            //paddingTop : '8px'
        },
        EnrollNew2Gender:{
            width: '224px' , 
            height: '62px'
        },
        EnrollNew2Height:{
            width: '137px', 
            marginTop: '20px' 
        },
        EnrollNew2Span:{
            color: '#656262', 
            fontSize: '12px'
        },
        EnrollNew2HeightInch:{
            width: '137px',
            marginRight: '24px', 
            marginTop: '20px'
        },
        EnrollNew2Weight:{
            width: '224px', 
            marginTop: '20px'
        },
        EnrollNew2Description:{
            fontSize: '15px', 
            lineHeight: '16px',
             width: '101%',
             textAlign:'justify'
           
        },
//-----------EnrollNew4-------------
        EnrollNew4SubtitleAfter1:{
            width : '100%', 
            display : 'inline-flex'
        },
        EnrollNew4SubtitleAfter2:{
            width: '50%',
            display: 'flex',
            marginTop: '15px' 
        },
        EnrollNew4TitleBefore:{
            width: '72%',
            paddingTop: '13px'
        },
        EnrollNew4No1:{
            width: '50%', 
            height: '56px'
        },
        EnrollNew4BeforeGender:{
            width : '100%', 
            display : 'inline-flex', 
            paddingTop : '20px'
        },
        EnrollNew4Disply:{
            display:'block'
        },

// =============EnrollNew3=================

enrollNew3DivStyle:{
    width: '300px', 
    marginRight: '24px', 
    padding: '1px' 
},
enrollNew3DivvStyle:{
    width: '224px', 
    marginRight: '24px', 
    padding: '1px' 
},
enrollNew3Display:{
     display:'block',
},
enrollNew3Style:{
    width: '300px', 
    marginRight: '24px', 
    padding: '1px', 
    marginTop: '20px' 
},
enrollNew3DivnewStyle:{
      width: '224px',
      marginRight: '24px', 
      marginTop: '20px' 
},
enrollNew3Description:{
      fontSize: '15px',
      lineHeight: '16px', 
      width: '101',
      textAlign:'justify' 
// =============EnrollNew5=================
},
 enrollNew5DisplayStyle:{
     width: '100%', 
     display: 'flex' 
 },
 enrollNew5NewDisplayStyle:{
     width: '70%',
     paddingLeft: '35px' 

 },
 enrollNew5pCarePhy:{
    width: '48%',
    marginRight: '24px',
    paddingBottom : '10px'
 },
 enrollNew5phone:{
    width: '48%',
    //marginRight: '24px',
    marginTop: '24px',
    paddingBottom : '10px' ,
    height: '56px' ,
    backgroundColor:'#ffffff',
    marginBottom:'15px',
    borderRadius:'4px'
 },
 enrollNew5radioDiv:{
     width: '100%', 
     display: 'flex', 
     marginTop: '15px' 
  },
  enrollNew5SelectDiv:{
     width: '70%', 
     paddingLeft: '35px' 
  },
  enrollNew5SelectDiv1:{
    width: '70%', 
  //  paddingLeft: '45px' 
 },
  enrollNew5SelectMul:{
     width: '50%', 
     marginBottom: '5px', 
     fontSize: '14px', 
     lineHeight: '16px' 
  },
  enrollNew5FormCntrl:{
     height: '140px', 
     width: '55%' 
  },
  enrollNew5selectStyle:{
     backgroundColor: '#ffffff', 
     padding: '10px', 
     fontSize: '14px', 
     lineHeight: '16px', 
  },


//-----------EnrollNew2-----------------
    EnrollNew2DateInputProps:{
        paddingLeft:'12px',
        paddingRight:'12',
        paddingTop:'10',
        color: '#787885',
        '&:hover': {
            color: '#533278',
    },
    EnrollNew2Gender:{
         width: '224px' ,
         height: '62px'
    },
    EnrollNew2Height:{
        width: '137px',
        marginTop: '20px'
    },
    EnrollNew2Span:{
        color: '#656262',
        fontSize: '12px'
    },
    EnrollNew2HeightInch:{
        width: '137px',
         marginRight: '24px',
         marginTop: '20px'
    },
    EnrollNew2Weight:{
        width: '224px',
        marginTop: '20px'
    },
    EnrollNew2Description:{
        fontSize: '14px',
        lineHeight: '16px',
         width: '300px'
    }
    },

    chkEligiScreen : {
        colorPrimary: {
            backgroundColor: '#f2f2f2',
            width: '100%',
            marginTop: '24px',
            height: '10px',
            marginBottom: '34px'
        },
        barColorPrimary: {
            backgroundColor: '#533278',
        },
        root: {
            backgroundColor: '#ffffff',
            '&:hover': {
                backgroundColor: '#f4f4f4',
                color: '#533278'
            }
        },

        multi:{
            color:'purple',
            '&:focused': {
                color: 'purple'
            }
        },

        multi1:{
            paddingLeft:'12px',
            paddingRight:'12px',
            fontSize:'16px',
        },

        selectMenu: {
            backgroundColor:'#ffffff',
            '&:hover': {
                backgroundColor: '#f4f4f4',
                color: '#533278'
            },
            "&:focus": {
                backgroundColor: "#ffffff",
                color: '#533278'
            }
        }
    },

    enrollScreen : {
        root: {
            width: '100%',
            overflowX: 'auto',
        },
        table: {
            minWidth: 650,
        },
        colorPrimary: {
            backgroundColor: '#f2f2f2',
            width: '300px',
            height: '10px'
        },
        barColorPrimary: {
            backgroundColor: '#533278',
            borderRadius: 0,
            width: '100%'
        },
        barColorPrimaryComplete: {
            backgroundColor: '#27ae60',
            borderRadius: 0,
            width: '100%'
        },
        progresscolorPrimary: {
            backgroundColor: '#f2f2f2',
            width: '100%',
            marginTop: '24px',
            height: '10px',
            marginBottom: '34px'
        },
        progressbarColorPrimary: {
            backgroundColor: '#533278',
        },
        button: {
            width: '90px',
            height: '30px'
        }
    },

    phone_number_input : {
     
        root: {
            '&.MuiInput-root': {
                backgroundColor: '#f8f8f8',
                color: '#19191d',
                fontSize: '16px',
                lineHeight: '24px',
                height: '56px',
                borderColor: '#533278',
                // '&:hover': {
                //     backgroundColor: '#f4f4f4',
                //     color: '#533278'
                // },
                '&& .MuiInput-underline:hover:before': {
                    borderBottom: '2px solid #533278'
                  }
                // '.MuiInput-underline:hover:not(.Mui-disabled):before':{
                //           borderBottom:'2px solid #533278 '
                //       },

                // '&.MuiInput-underline:before':{
                //     borderBottom: 'grey'
                // },
                // '&.MuiInput-underline.Mui-focused:after':{
                //     borderBottomColor: '#533278'
                // }
                //     '.MuiInput-underline:hover:not(.Mui-disabled):before':{
                //     //   borderBottom:'2px solid #533278 '
                //   },
                //  '.MuiInput-underline.Mui-focused:after': {
                //   borderBottom: '2px solid #533278'
                //  }
                

            },

            '& .Mui-focused': {
                color: '#533278'
            },
            '& label.Mui-focused': {
                color: '#533278',

            },

            '& p.MuiFormHelperText-contained' : {
                margin : 0,
                fontSize: "12px",
                marginTop : '6px'
            }

        },
    },

    planText: { width: '70%', fontSize: '14px', lineHeight: '24px', letterSpacing: '0.44px' },
    planPrice: {
        width: '30%',
        fontSize: '16px',
        lineHeight: '24px',
        letterSpacing: '0.44px',
        fontWeight: 'bold',
        color: '#19191d'
    },
    planBox: {
        display: 'flex',
        width: '100%',
        height: '40px',
        borderBottom: '1px solid #e1e1e3',
        paddingTop:'12px'
    },

    headingTxt : {
        fontSize: '14px',
        fontWeight: 'bold',
        fontStretch: 'normal',
        fontStyle: 'normal',
        lineHeight: '1.14',
        letterSpacing: 'normal',
        color: 'rgba(0, 0, 0, 0.87)'
    },
    
/*----------------Finance Authorize-----------------*/

    financePopup:{
        textAlign : 'justify',
        height:'325px',
        overflowX:'hidden',
        overflowY:'auto'
    },

    defaultStyle : {
        completed: {
            color: "#fdcf85 !important"
        },
        active: {
            color: "#f5887f !important"
        },
        paper: {
            width: '58%',
            height: '50',
            position: 'absolute',
            //backgroundColor: theme.palette.background.paper,
            borderRadius: '4px',
            border: 'none',
            padding: '28px 27px 9px 23px',
        },
        formControl: {
            width: '223px',
            height: '56px',
            marginRight: '21px'
        },
        colorPrimary: {
            backgroundColor: '#f2f2f2',
            width: '100%',
            marginTop: '24px',
            height: '10px',
            marginBottom: '34px'
        },
        barColorPrimary: {
            backgroundColor: '#533278',
        },

        MuiPaperRoot : {
            backgroundColor: '#ffffff'
        }
    },

    modal_header: {
        backgroundColor : '#ffffff'
    },

    tabs : {
        root: {
            borderBottom: '1px solid #999999'
        },
        indicator: {
            color: '#533278',
            backgroundColor: '#533278',
        },
    },

    tab : {
        root: {
            textTransform: 'none',
            width: '180px',
            fontSize: '14px',
            fontWeight: 500,
            letterSpacing: '0.75px',
            borderBottom: '1px solid #999999',
            backgroundColor: '#cccccc',
            borderRadius: '4px',
            '&:hover': {
                backgroundColor: 'rgba(205, 172, 207, 0.5)',
                color: '#533278'
            },
            '&$selected': {
                color: '#533278',
                backgroundColor: '#cccccc'
            },
            '&:focus': {
                color: '#533278',
                outline:'none'
            },
        },
        selected: {},
    },

    preferredCheckbox : {
        float: 'right',
        borderBottom: '1px solid gray',
        marginTop: '6px'
    },

    checkBoxStyle : {
        width:'100%',
        backgroundColor:'#ffffff',
        overflowY: 'auto',
        overflowX: 'hidden',
        height:'125px',
        padding:'6px'
    },

    phoneDiv : {
        width: '224px',
        marginTop: '24px',
        height: '56px' ,
        backgroundColor:'#ffffff'
    },

    //==================================QuickQuote1=========================================

    QuickQt1TopWrp:{
        padding:'25px',
        display:'flex',
        flexDirection:'column'
    },
    QuickQtTopRightText1:{
        width: "302px",
        height: "40px",
        fontFamily: "Roboto, Arial, Helvetica, sans-serif",
        fontWeight: "bold",
        fontStretch: "normal",
        fontStyle: "normal",
        lineHeight: "1.67",
        letterSpacing: "0.15px",
        color: "#f6356a",
        fontSize: "24px",
    },
    QuickQtTopRightText2:{
        fontFamily: "Roboto, Arial, Helvetica, sans-serif",
        fontWeight: "normal",
        fontStretch: "normal",
        fontStyle: "normal",
        lineHeight: "1.07",
        letterSpacing: "normal",
        color: "rgba(0, 0, 0, 0.87)",
        fontSize: "15px",
    },
    QuickQtZipWrp:{
        width:'23%',
        display:'flex',
        flexDirection:'column',
    },
    QuickQtZipTitle:{
        fontFamily: "Roboto, Arial, Helvetica, sans-serif",
        fontWeight: "bold",
        fontStretch: "normal",
        fontStyle: "normal",
        lineHeight: "1.14",
        letterSpacing: "normal",
        color: "rgba(0, 0, 0, 0.87)",
        fontSize: "14px",
        marginBottom:'10px'
    },
    QuickQtDtlsWrp:{
        width:'100%',
        display:'flex',
        flexDirection:'row',
    },
    QuickQtgenderWrp:{
        width:'55%',
    },
    QuickQtAgeWrp:{
        width:'35%',
        marginLeft:'10%'
    },
    QuickQtChildWrp:{paddingLeft:'25px',display:'flex',flexDirection:'row',marginTop:'25px'},
    QuickQtChildWrp1:{paddingLeft:'25px',display:'flex',flexDirection:'coumn',marginTop:'25px'},
    QuickAddBtn:{
        width: '56px',
        height: '56px',
        marginTop:'25px'
    },
    QuickChatBtn:{
        width: '56px',
        height: '56px',
    },
    QuickQtDepedentTxt:{
        width: '20px',
        fontFamily: "Roboto, Arial, Helvetica, sans-serif",
        fontWeight: "bold",
        fontStretch: "normal",
        fontStyle: "normal",
        lineHeight: "1.14",
        letterSpacing: "normal",
        color: "rgba(0, 0, 0, 0.87)",
        fontSize: "14px",
        marginTop:'33px',
        marginLeft:'10px'
    },
    QuickQtDoneWrp:{
        display:'flex',
        justifyContent:'flex-start',
        alignItems:'center',
        flexDirection:'row'
    },
    QuickQtChatWrp:{
        display:'flex',
        justifyContent:'flex-end',
        alignItems:'center'
    },
    QuickQtHelpWrp:{
        display:'flex',
        justifyContent:'flex-end',
    },
    QuickQtHelpTxt1:{
        fontFamily: "Roboto, Arial, Helvetica, sans-serif",
        fontWeight: "bold",
        fontStretch: "normal",
        fontStyle: "normal",
        lineHeight: "1.14",
        letterSpacing: "normal",
        //color: "#420045",
        color:'#304d63',
        fontSize: "14px",
    },
    QuickQtHelpTxt2:{
        fontFamily: "Roboto, Arial, Helvetica, sans-serif",
        fontWeight: "normal",
        fontStretch: "normal",
        fontStyle: "normal",
        lineHeight: "1.14",
        letterSpacing: "normal",
        // color: "#420045",
        color:'#304d63',
        fontSize: "14px",
    },
    text:{
        width:'100%'
    },

    //==============================QuickQuote2===========================================
    QuickQt2EnrollTxtWrp:{
        display:'flex',
        flexDirection:'row',
        paddingLeft:'25px',
        paddingRight:'25px',
        marginTop:'15px'
    },
    txt : {
        textAlign : 'justify'
    },

    QuickQt2EnrollText:{
        fontFamily: "Roboto, Arial, Helvetica, sans-serif",
        fontWeight: "normal",
        fontStretch: "normal",
        fontStyle: "normal",
        lineHeight: "1.33",
        letterSpacing: "normal",
        color: "rgba(0, 0, 0, 0.87)",
        fontSize: "15px",
    },
    QuickQt2FeesWrp:{
        display:'flex',
        flexDirection:'column'
    },
    QuickQt2FeesChild1Wrp:{
        width:'68%',
        marginLeft:'90px',
        marginBottom:'7px'
    },
    QuickQt2FeesChild1Wrp1:{
        width:'68%',
        borderBottom:'1px solid #e1e1e3',
        marginLeft:'90px',
        paddingTop:'3px',
        paddingBottom:'7px',
    },
    QuickQt2FeesTxt:{
        fontFamily: "Roboto, Arial, Helvetica, sans-serif",
        fontWeight: "bold",
        fontStretch: "normal",
        fontStyle: "normal",
        lineHeight: "1.14",
        letterSpacing: "normal",
        color: "rgba(0, 0, 0, 0.87)",
        fontSize: "14px",
    },
    QuickQt2FeesTxt1:{
        fontFamily: "Roboto, Arial, Helvetica, sans-serif",
        fontWeight: "normal",
        fontStretch: "normal",
        fontStyle: "normal",
        lineHeight: "1.71",
        letterSpacing: "0.44px",
        color: "#19191d",
        fontSize: "14px",
    },
    QuickQt2FeesTxt2:{
        fontFamily: "Roboto, Arial, Helvetica, sans-serif",
        fontWeight: "bold",
        fontStretch: "normal",
        fontStyle: "normal",
        lineHeight: "1.71",
        letterSpacing: "0.44px",
        color: "#19191d",
        fontSize: "14px",
        float:'right'
    },

    ComponentContainer:{
        /* marginLeft:'21px',
         marginRight:'21px',
         paddingTop : '40px',*/
        marginLeft:'21px',
        marginRight:'21px',
        paddingTop : '45px',
        paddingBottom: '25px',
        backgroundColor:'#ffffff',
    },

    HeaderWrp:{
        width:'98%',
        display:'flex',
        flexDirection:'row',
        marginLeft:'12px',
        //marginTop:'12px',
        //paddingBottom:'12px'

    },
    HeaderRightWrp:{
        display:'flex',
        justifyContent:'flex-start',
        alignItems:'center'
    },
    HeaderLeftWrp:{
        display:'flex',
        justifyContent:'flex-end',
        alignItems:'center'
    },
    HeaderRightLogo:{
        width: "150px",
        height: "50px",
    },
    HeaderLeftLogo:{
        width: "75px",
        height: "50px",
        marginRight:'8px'
    },
    HeaderLeftText:{
        //width: "150px",
        height: "50px",
        fontFamily: "Roboto, Arial, Helvetica, sans-serif",
        fontWeight: "normal",
        fontStretch: "normal",
        fontStyle: "normal",
        lineHeight: "2.86",
        letterSpacing: "0.15px",
        color: "#4f4f4f",
        // backgroundColor: "#eeeeee",
        fontSize: "14px",
        display:'flex',
        justifyContent:'center',
        alignItems:'center'
    },
    LoginWrp:{
        width:'100%',
        height:'47.3px',
        display:'flex',
        flexDirection:'row',
        backgroundColor: "#33afb0",
        boxShadow:'0 4px 4px 0 rgba(0, 0, 0, 0.24), 0 0 4px 0 rgba(0, 0, 0, 0.12)',
    },
    LoginRight:{
        width: "200px",
        height: "24px",
        fontFamily: "Roboto, Arial, Helvetica, sans-serif",
        fontWeight: "bold",
        fontStretch: "normal",
        fontStyle: "normal",
        lineHeight: "1.5",
        letterSpacing: "0.15px",
        color: "#ffffff",
        fontSize: "16px",
        display:'flex',
    },
    LoginLeft:{
        width: "80px",
        height: "24px",
        fontFamily: "Roboto, Arial, Helvetica, sans-serif",
        fontWeight: "bold",
        fontStretch: "normal",
        fontStyle: "normal",
        lineHeight: "1.5",
        letterSpacing: "0.15px",
        color: "#ffffff",
        fontSize: "16px",
        display:'flex',
        justifyContent:'flex-end',
        cursor:'pointer'
    },
    bottomCopyTxtWrp:{
        width:'100%',
        display:'flex',
        justifyContent:'center',
        marginTop:'15px',
    },
    bottomCopyText:{
        width: "357px",
        height: "16px",
        fontFamily: "Roboto, Arial, Helvetica, sans-serif",
        fontWeight: "normal",
        fontStretch: "normal",
        fontStyle: "normal",
        lineHeight: "1.33",
        letterSpacing: "normal",
        color: "#333333",
        fontSize: "12px",
        display:'flex',
        justifyContent:'center'
    },

    bmiName : {
        textAlign : 'center',
        padding : '40px',
        fontFamily: "Roboto, Arial, Helvetica, sans-serif",
        fontWeight: "bold",
    },

    cardContainer: {
        display: 'flex',
        flexGrow: 1,
        justifyContent: 'center'
    }

}




