// I took this concept from a online tutorial found here: https://www.youtube.com/watch?v=ZwFA3YMfkoc&ab_channel=JavaScriptMastery
// Although I would argue that I made significant changes compare to the original.
// There are ~50 line of code from the source, now there are around 160
// ALthough functions name are the same, such as join, connect, disconnect
// But they are literally completely different code now as I re-write all of them!

const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 5000;
const cors = require('cors');
const cookieParser = require('cookie-parser');

const { addUser, removeUser, getAllUsers, checkCommand, addExistUser, updateMessagesColor } = require('./utilities');


app.use(cors());
app.use(cookieParser());

app.get('/', (req, res) => {
    res.send({ response: "Server is up and running." }).status(200);
});
let messages = [];
io.on('connect', (socket) => {

    socket.on('join', ({ id, name, color }, callback) => {
        console.log('\n\nSocket Join!!!!!!!!!!!!!!!!!!!!!!!!');
        console.log('id is ' + id)
        console.log('name is ' + name)
        console.log('color is ' + color)
        console.log('id is ' + typeof (id))
        console.log('name is ' + typeof (name))
        console.log('color is ' + typeof (color))
        let user;
        if (id === null || name === null || color === null) {
            console.log('A new user is trying to join1');
            isNewUser = true;
            user = addUser({ id: socket.id });
        }
        else if (typeof (id) === 'undefined' || typeof (name) === 'undefined' || typeof (color) === 'undefined') {
            console.log('A new user is trying to join2');
            isNewUser = true;
            user = addUser({ id: socket.id });
        }
        else if (id == 'undefined' || name == 'undefined' || color == 'undefined') {
            console.log('A new user is trying to join3');
            isNewUser = true;
            user = addUser({ id: socket.id });
        }
        else if (id == '' || name == '' || color == '') {
            console.log('A new user is trying to join3');
            isNewUser = true;
            user = addUser({ id: socket.id });
        }
        else {
            console.log('A existing user is trying to rejoin');
            user = addExistUser(id, name, color, socket.id);
        }
        console.log('The new user will be called: ' + user.name);
        const users = getAllUsers();
        console.log('All current users:')
        console.log(users);
        callback(user, users);

        let timestamp = new Date();
        let admin = { id: '0', name: 'admin', color: '828282' }
        console.log('Now Writting message')
        socket.emit('message', {
            user: admin, text: `${user.name}, welcome to Chat Chat.`,
            time: `${timestamp}`, type: 'join1'
        });
        socket.emit('messages', { messages });
        socket.broadcast.emit('message', {
            user: admin, text: `${user.name} has joined!`,
            time: `${timestamp}`, type: 'join2'
        });
        socket.broadcast.emit('usersList', { users });

    });

    const sendMessage = (user, message, timestamp, newmessage) => {
        socket.broadcast.emit('message',
            newmessage
        );
        socket.emit('message',
            newmessage
        );
        messages.push(newmessage);
        console.log('\n\n Someone send a new message')
        console.log('The message is: ')
        console.log(newmessage)
    }

    socket.on('sendMessage', ({ user, arg_message }) => {
        console.log('\n\n on sendMessage')
        let admin = { id: '0', name: 'admin', color: '828282' };
        let temp_user = user;
        console.log('sendMessage message:' + user);
        console.log('sendMessage message:' + arg_message);

        let timestamp = new Date();
        let newmessage = {
            user: user, text: arg_message,
            time: `${timestamp}`, type: 'sendm4'
        };
        console.log('\n\n newmessage:');
        console.log(newmessage);

        let switch_case = checkCommand(user, arg_message);
        console.log('switch case is: ' + switch_case);
        let users = getAllUsers();
        switch (switch_case) {
            case 0:
                sendMessage(user, arg_message, timestamp, newmessage);
                break;
            case 1:
                users = getAllUsers();
                let temp_messages = updateMessagesColor(messages, user);
                messages = temp_messages;
                socket.broadcast.emit('changeColor', { user, users });
                socket.emit('changeColor', { user, users });
                break;
            case 2:
                socket.emit('message', {
                    user: admin, text: `${user.name}, Color is not valid.`,
                    time: `${new Date()}`, type: 'changeColorFail'
                });
                break;
            case 3:
                users = getAllUsers();
                console.log('hahahha ' + temp_user.name);
                console.log('hahahha ' + users);
                socket.broadcast.emit('changeUserName', { user, users });
                socket.emit('changeUserName', { user, users });
                break;
            case 4:
                socket.emit('message', {
                    user: admin, text: `${user.name}, Name is taken.`,
                    time: `${new Date()}`, type: 'changeUserNameFail'
                });
                break;
        }
        // sendMessage();
        // callback();
    });

    socket.on('disconnect', () => {
        console.log('disconneciton!!!!!!!!!!!!!!!!!!!!')
        const user = removeUser(socket.id);
        let timestamp = new Date();
        if (user) {
            console.log('\n\nA user is leaving');
            const users = getAllUsers();
            console.log('All current users:')
            console.log(users);
            let admin = { id: '0', name: 'admin', color: '828282' }
            io.emit('message', {
                user: admin, text: `${user.name} has left.`,
                time: `${timestamp}`, type: 'disconnect5'
            });
            socket.broadcast.emit('usersList', { users });
        }
    })
});

http.listen(process.env.PORT || 5000, () => console.log(`Server has started.`));

