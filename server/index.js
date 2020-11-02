const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 5000;
const cors = require('cors');
const cookieParser = require('cookie-parser');

const { addUser, removeUser, getUser, getAllUsers, checkCommand } = require('./utilities');


app.use(cors());
app.use(cookieParser());

app.get('/', (req, res) => {
    res.send({ response: "Server is up and running." }).status(200);
});
const messages = [];
io.on('connect', (socket) => {

    socket.on('join', ({ }, callback) => {
        console.log('\n\nA new user is trying to join');
        const { user } = addUser({ id: socket.id });

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
            time: `${new Date()}`, type: 'join1'
        });
        socket.emit('messages', { messages });
        socket.broadcast.emit('message', {
            user: admin, text: `${user.name} has joined!`,
            time: `${new Date()}`, type: 'join2'
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

    socket.on('sendMessage', (message, callback) => {
        let admin = { id: '0', name: 'admin', color: '828282' }
        const user = getUser(socket.id);
        let temp_user = user;
        console.log('dfjaiuodshjfuiasdf' + temp_user);

        let timestamp = new Date();
        let newmessage = {
            user: user, text: message,
            time: `${timestamp}`, type: 'sendm4'
        };
        console.log('\n\n newmessage:');
        console.log(newmessage);

        let switch_case = checkCommand(user, message);
        console.log('switch case is: ' + switch_case);
        let users = getAllUsers();
        switch (switch_case) {
            case 0:
                sendMessage(user, message, timestamp, newmessage);
                break;
            case 1:
                users = getAllUsers();
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
        callback();
    });

    socket.on('disconnect', () => {
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

