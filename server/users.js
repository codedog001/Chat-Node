//This file will have helper functions that will manage users signing in and signing out.
//Everything about users even what users are in what room.

const users = [];

const addUser = ({ id, name, room }) => {
    //Room Name - roomname #Lowercase and single word
    name = name.trim().toLowerCase();
    room = room.trim().toLowerCase();

    //If a user trying to enter a room, where someone with same username is already present, then forbid that
    const existingUser = users.find((user) => user.room === room && user.name === name);
    
    if(existingUser){ 

        return {error: 'Username is already taken.'};
    }

    if(!name || !room) return { error: 'Username and room are required.' };
        


    //If username is not taken for that room, then create that user
    const user = { id, name, room };

    users.push(user);

    return { user }

}

const removeUser = (id) => {
    //Try to index/find the user in that room
    const index = users.findIndex((user) =>  user.id === id);

    if(index !== -1) return users.splice(index, 1)[0];
}

const getUser = (id) => users.find((user) => user.id === id);


const getUsersInRoom = (room) => users.filter((user) => user.room === room );

module.exports = {addUser, removeUser, getUser, getUsersInRoom};