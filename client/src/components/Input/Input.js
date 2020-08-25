import React from 'react';
import './Input.css';


const Input = ({message, setMessage, sendMessage}) => (
    <form className="form">
        <input
        className="input"
        type="text"
        placeholder="Type a message..."
        value={message}
        onChange={(event) => setMessage(event.target.value)}
        // If expression 1 is true, then expression 2 is performed, otherwise expression 3 is performed.
        onKeyPress={event => event.key === 'Enter' ? sendMessage(event) : null}
        />
        <button className="sendButton" onClick={(event) => sendMessage(event)}>Send</button>
    </form>
)

export default Input;