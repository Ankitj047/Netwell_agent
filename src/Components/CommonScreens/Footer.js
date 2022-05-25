import React, { Component } from 'react';
import ChatButton from './ChatButton';
export default class Footer extends Component {
    render() {
        return (
            <div style={{flexDirection:'row'}}>
                <div style={{float:'right',}}><ChatButton/></div>
                <div style={{position:'relative', top:65, left:10}}>
                    <div style={{fontStyle: "normal", fontStretch: "normal", fontSize: "12px",  fontFamily: "Lato", color: "#7e7e7e"}} >Copyright © 2022 netWell. All rights reserved.  |  Powered by CarynHealth</div>
                    <span style={{fontStyle: "normal", fontStretch: "normal", fontSize: "12px",  fontFamily: "Lato", color: "#7e7e7e"}} >Version 1.0</span>
                </div>  
            </div>
        )
    }
}

