import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import './Join.css';




const Join = () => {
    const[name, setName] = useState('');
    const[room, setRoom] = useState('');

    return (
        <div className="joinOuterContainer">
            <div className="joinInnerContainer">
                <h1 className="heading">Chat Room</h1>
                {/* We are saying that when user enters something  into name field, an event should occur that is setName, and similarly for the setRoom field.
                Event.target.value gives data for this event.*/}
                <div><input placeholder="Name" className="joinInput" type="text" onChange={(event) => setName(event.target.value)} /></div>
                <div><input placeholder="Room" className="joinInput mt-20" type="text" onChange={(event) => setRoom(event.target.value)} /></div>
                
                {/* The data of the name and chat room will be passed as URL, Using parameters, we'll be able to read the name and room from the chat component */}
                {/* We also need to prevent user from clicking this button, if he has not provided name and room */}
                {/* the ? before event.preve----t is 'then' condition, this condition will prevent default button action i.e. click if room or name is not provided  */}
                {/* If expression 1 is true, then expression 2 is performed, otherwise expression 3 is performed. */}
                <Link onClick={event=> (!name || !room ) ? event.preventDefault() : null} to={`/chat?name=${name}&room=${room}`}>
                    <button className="button mt-20" type="submit">Sign In</button>
                </Link>
            </div>
        </div>
    )
}


export default Join;