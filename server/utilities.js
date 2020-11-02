var hexColorRegex = require('hex-color-regex')

const users = [];
let usersCount = 0;

const addUser = ({ id }) => {
    let name = 'Dude' + usersCount;
    usersCount++;
    // let color = '828282';
    let color = '7FFFD4';
    const user = { id, name, color };

    users.push(user);
    console.log('finish adding user');
    console.log(user);
    return { user };
}

const checkStolenName = (name) => {
    for (let i = 0; i < users.length; i++) {
        if (users[i].name === name) {

            console.log('User name has been stolen');
            return true;
        }
    }
    return false;
}

const addExistUser = ({ id, name, color }) => {
    if (name === '') {
        name = 'Dude' + usersCount;
    }
    usersCount++;
    const user = { id, name, color };

    users.push(user);
    console.log('finish adding exisitng user');
    console.log(user);
    return { user };
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
    console.log(message);
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
            console.log('user found: ' + user.name);
            users[i].name = new_name;
            console.log(users);
            break;
        }
    }
}

const chagneUserColor = (user, color) => {
    for (let i = 0; i < users.length; i++) {
        if (users[i].id === user.id) {
            console.log('user found: ' + user.name);
            users[i].color = color;
            console.log(users);
            break;
        }
    }
}


module.exports = { addUser, removeUser, getUser, getAllUsers, checkCommand, checkStolenName, addExistUser };