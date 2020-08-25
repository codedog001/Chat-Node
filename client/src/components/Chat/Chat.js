//useEffect is a hook that lets you use life cycle methods or side effects in function components.
import React, {useState, useEffect} from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';

// Dir for Current online Stats - In Uodated Chat.js from Github
import TextContainer from '../TextContainer/TextContainer';

import './Chat.css';
import InfoBar from '../InfoBar/InfoBar';
import Input from '../Input/Input';
import Messages from '../Messages/Messages';


let socket;


const Chat = ({location}) => {
    const[name, setName] = useState('');
    const[room, setRoom] = useState('');
    //In Updated Chat.js from Github
    const [users, setUsers] = useState('');
    //Keeping track of all messages, using state 'messages' for setMessages, inside of messages we'll have array that will store all messages.
    const[messages, setMessages] = useState([]);

    //Also we have to specify every single message, so we'll have a state for setMessage, and msg that will be an empty string.
    const[message, setMessage] = useState('');

    const ENDPOINT = 'https://express-chat-node.herokuapp.com/';
    
    //Location.search returns name, room parameter of url
    useEffect(() =>{
        const {name, room} = queryString.parse(location.search);

        //When we get our first connection, we are going to set socket=io (which is coming from import io statement) and we need to pass an endpoint to the server, our endpoint is located at localhost:5000 
        socket = io(ENDPOINT);

        setName(name);
        setRoom(room);
        
         
        //Emitting events from client side socket, we pass strings that backend could recognize, like chat message, then sometihing happens at backend
        //For E.g: (Now Commented) Taking the parameter 'error' from index.js (server) 
        socket.emit('join', {name, room}, (error) => {
           if(error){
                do{
                    alert(error + " Go back, & please take another Username");
                }while(error);
           }
           });
           
           return () => {
               socket.emit('disconnect');
               socket.off();
            }


        }, [ENDPOINT, location.search]);  //This tells to run this useEffect only when any parameter inside [] changes

        //Unmounting - Used for Disconnect Effect
        // return () => {
        //     socket.emit('disconnect');
        //     socket.off();
        // }



    //For Handling Messages
    useEffect(()=> {
        //socket.on is to listen 
        //socket.emit is to emit i.e. send
        socket.on('message', message => {
            //Pushing this messages to our messages array
            //Spread all other messages and add one message on it.
            setMessages(messages => [ ...messages, message ]);
        });

        
        socket.on("roomData", ({ users }) => {
            setUsers(users);
          });
      }, []);
    

    
    //Function for sending Messages
    const sendMessage = (event) => {

        // event.preventDefault() - Prevent browser's default behaviout of refreshing
        event.preventDefault();
        if(message) {
            socket.emit('sendMessage', message, () => setMessage(''));


        }
    }

    //console.log(message, messages);



    return (
        <div className="outerContainer">
            {/* <div className="imageContainer">
                <img alt="Hill" src={Hill}/>
            </div> */}
            <div className="container">
                {/* room property makes it dynamic heading in infobar.js - h3 */}
                <InfoBar room={room}/>

                {/* These are just old lines which are now commented Out down below */}

                {/* This input does all the messaging */}
                {/* <input value={message} onChange={(event) => setMessage(event.target.value)}
                onKeyPress={event => event.key === 'Enter' ? sendMessage(event) : null} */}

                {/* Old Lines Of Code Above This */}
                <Messages messages={messages} name={name}/>
                <Input message={message} setMessage={setMessage} sendMessage={sendMessage}/>
            
            </div>
            <TextContainer users={users}/>
        </div>
    );
}

export default Chat;