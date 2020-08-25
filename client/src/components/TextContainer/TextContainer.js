import React from 'react';

import onlineIcon from '../../Icons/onlineIcon.png';

import './TextContainer.css';


const TextContainer = ({ users }) => (
  <div className="textContainer">
    <div>
      <h1>Chat Room <span role="img" aria-label="emoji">💬</span></h1>
      {/* <h2>Created with React, Express, Node and Socket.IO <span role="img" aria-label="emoji"></span></h2> */}
      <h2>Chatting Simplified - Enter the room & say it all. <span role="img" aria-label="emoji"></span></h2>
    </div>
    {
      users
        ? (
          <div>
            <h1>People currently chatting:</h1>
            <div className="activeContainer">
              <h2>
                {/* Users is a an array of user, user is (socket id + name + room), so pick name from it. */}
                {users.map(({name}) => (
                  <div key={name} className="activeItem">
                    {name.toUpperCase()}
                    <img alt="Online Icon" src={onlineIcon}/>
                  </div>
                ))}
              </h2>
            </div>
          </div>
        )
        : null
    }
  </div>
);

export default TextContainer;