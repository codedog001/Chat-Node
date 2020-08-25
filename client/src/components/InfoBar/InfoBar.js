import React from 'react';
import './InfoBar.css';
import closeIcon from '../../Icons/closeIcon.png';
import onlineIcon from '../../Icons/onlineIcon.png';

const InfoBar = ({room}) => (
    <div className="infoBar">
        <div className="leftInnerContainer">
            <img className="onlineIcon" src={onlineIcon} alt="online image" />
            {/* roomName is dynamic see Chat.js infobar section */}
            <h3>{room.toUpperCase()}</h3>
        </div>
        <div className="rightInnerContainer">
            <a href="/"><img src={closeIcon} alt="close image" /> </a>
        </div>
    </div>
)

export default InfoBar;