var hexColorRegex = require('hex-color-regex')

const users = [];
let usersCount = 0;

const addUser = ({ id }) => {
    console.log('addUser');
    let name = 'Dude' + usersCount;
    usersCount++;
    // let color = '828282';
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
        if (users[i].name === name && users[i].id !== id) {

            console.log('User name has been stolen');
            return true;
        }
    }
    return false;
}

const addExistUser = (arg_id, arg_name, arg_color, current_socket_id ) => {
    console.log('addExistUser');
    if (checkStolenName(arg_name,arg_id)) {
        arg_name = 'Dude' + usersCount;
    }
    usersCount++;
    console.log('addExistUser '+arg_id);
    console.log('addExistUser '+arg_name);
    console.log('addExistUser '+arg_color);
    let user = { id: current_socket_id, name: arg_name, color: arg_color };

    users.push(user);
    console.log('finish adding exisitng user');
    console.log(user);
    return user;
}

const removeUser = (id) => {
    const index = users.findIndex((user) => user.id === id);

    if (index !== -1) return users.splice(index, 1)[0];
}

const getUser = (id) => users.find((user) => user.id === id);

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


module.exports = { addUser, removeUser, getUser, getAllUsers, checkCommand, checkStolenName, addExistUser };