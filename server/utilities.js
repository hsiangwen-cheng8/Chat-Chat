// I took this concept from a online tutorial found here: https://www.youtube.com/watch?v=ZwFA3YMfkoc&ab_channel=JavaScriptMastery
// Although I would argue that I made significant changes compare to the original.
// I only re-use one out of 4 functions from the tutorial
// And I implement 10 additional functions

var hexColorRegex = require('hex-color-regex')

const users = [];
let usersCount = 0;

const addUser = ({ id }) => {
    console.log('addUser');
    let name = 'Dude' + Math.floor(Math.random() * 1000) + usersCount * 2;
    while (checkStolenName(name, id)) {
        name = 'Dude' + Math.floor(Math.random() * 1000) + usersCount * 2;
    }
    usersCount++;
    let color = '7FFFD4';
    const user = { id, name, color };

    users.push(user);
    console.log('finish adding user');
    console.log(user);
    return user;
}

const checkStolenName = (name, id) => {
    console.log('checkStolenName');
    for (let i = 0; i < users.length; i++) {
        if (users[i].name === name) {

            console.log('User name has been stolen');
            return true;
        }
    }
    return false;
}

const checkExistingUser = (arg_id, arg_name) => {
    for (let i = 0; i < users.length; i++) {
        if (users[i].id === arg_id && users[i].name === arg_name) {
            return true;
        }
    }
    return false;
}

const addExistUser = (arg_id, arg_name, arg_color, current_socket_id) => {
    console.log('addExistUser');
    let user = { id: current_socket_id, name: arg_name, color: arg_color };
    if (!checkExistingUser(arg_id, arg_name)) {
        while (checkStolenName(arg_name, arg_id)) {
            arg_name = 'Dude' + Math.floor(Math.random() * 1000) + usersCount * 2;
        }
        usersCount++;
        console.log('addExistUser ' + arg_id);
        console.log('addExistUser ' + arg_name);
        console.log('addExistUser ' + arg_color);
        users.push(user);
        console.log('finish adding exisitng user');
        console.log(user);
    }
    else{
        user.id = arg_id;
    }

    return user;
}

// I took this from the tutorial 
const removeUser = (id) => {
    const index = users.findIndex((user) => user.id === id);

    if (index !== -1) return users.splice(index, 1)[0];
}

const getAllUsers = () => {
    return users;
}

const checkCommand = (user, message) => {
    console.log('\n\nChecking new message for command');
    let trim_message = message.trim();
    string = trim_message.split(" ", 2);
    if (string[0] === '/color') {
        if (isColor(string[1])) {
            console.log('color is valid');
            chagneUserColor(user, string[1]);
            return 1;
        }
        else {
            console.log('color is not valid');
            return 2;
        }
    }
    else if (string[0] === '/name') {
        console.log('Changing name for: ' + user.id);
        if (checkUserName(string[1])) {
            // User name is not taken
            console.log('Name will change to : ' + string[1]);
            chagneUserName(user, string[1]);
            return 3;
        }
        // User name is taken already
        return 4;

    }
    return 0;
}

const updateMessagesColor = (messages, user) => {
    console.log('updateMessagesColor');
    // Find new color 
    for (let i = 0; i < users.length; i++) {
        if (users[i].id === user.id) {
            console.log('user found: ' + user.name);
            user.color = users[i].color;
        }
    }
    for (let i = 0; i < messages.length; i++) {
        if (messages[i].user.name == user.name) {
            console.log('updateMessagesColor change');
            messages[i].user.color = user.color;
        }
    }
    return messages;
}

const isColor = (strColor) => {
    let fixes_color = '#' + strColor;
    return hexColorRegex().test(fixes_color);
}

const checkUserName = (new_name) => {
    for (let i = 0; i < users.length; i++) {
        if (users[i].name === new_name) {
            return false;
        }
    }
    return true;
}

const chagneUserName = (user, new_name) => {
    for (let i = 0; i < users.length; i++) {
        if (users[i].id === user.id) {
            users[i].name = new_name;
            break;
        }
    }
}

const chagneUserColor = (user, color) => {
    for (let i = 0; i < users.length; i++) {
        if (users[i].id === user.id) {
            users[i].color = color;
            break;
        }
    }
}


module.exports = { addUser, removeUser, getAllUsers, checkCommand, checkStolenName, addExistUser, updateMessagesColor };