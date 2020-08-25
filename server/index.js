//Require are like import statements

const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const cors = require('cors');

//This doesn't work when ('./users.js) is used only works with ('./users)
const {addUser, removeUser, getUser, getUsersInRoom } = require('./users');

const router = require('./router');

const PORT = process.env.PORT || 5000;

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(router); 
app.use(cors());


io.on('connect', (socket) => {
    socket.on('join', ({ name, room}, callback) => {
        //console.log(name, room);
        //addUser can only return 2 thigs, either error or user.
        
        //user variable stores for every single user (socket id, name, room)
        //saying user.name or user.room means name or room of that user.
        const { error, user } = addUser({ id: socket.id, name, room});

        if(error) return callback(error);
 

        socket.join(user.room);

        //For Admin generated Message

        socket.emit('message', {user: 'Admin', text:`${user.name}, Welcome to the room ${user.room}`});
        
        //Broadcast sends msg to all users, except that user, who joined 
        //To - To a specific room
        socket.broadcast.to(user.room).emit('message', { user: 'Admin', text: `${user.name} has joined!`});

        socket.join(user.room);

        io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room)})

        callback();
        // callback - It will trigger some respose immedeately after socket.on event is being emitted.
        //What we can actually do with callback() is some error handling.
        // const error = true;
        // if(error) {
        //     callback({error: 'Yeah it is error - server(index.js)'});
        // }
        
    });

    //For User Generated Messages
    socket.on('sendMessage', (message, callback) => {
        
        //User variable stores that specific user using his socket id 
        const user = getUser(socket.id);

        //to - To a specific room.
        //user - Is a specific user, stored in above variable.
        io.to(user.room).emit('message', {user: user.name, text: message});
        
        //Callback- So we can do something after msg is sent on front end.
        callback();
    });

    socket.on('disconnect', () => {
        const user = removeUser(socket.id);
        if(user){
            io.to(user.room).emit('message', {user: 'Admin', text: `${user.name} has left.`})
            io.to(user.room).emit('roomData', {room: user.room, users: getUsersInRoom(user.room)});
        }
    })
});



server.listen(PORT, () => console.log(`Server has started on ${PORT}`));




