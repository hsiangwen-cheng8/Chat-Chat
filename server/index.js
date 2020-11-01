const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 5000;
const cors = require('cors');

const { addUser, removeUser, getUser, getAllUsers } = require('./user');


app.use(cors());

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


        let timestamp = new Date();
        socket.emit('message', {
            user: 'admin', text: `${user.name}, welcome to Chat Chat.`,
            time: `${new Date()}`
        });
        socket.emit('messages', { messages });
        socket.broadcast.emit('message', {
            user: 'admin', text: `${user.name} has joined!`,
            time: `${new Date()}`
        });
        socket.broadcast.emit('usersList', { users });

        // io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });

        callback(user.name, users);
    });

    socket.on('sendMessage', (message, callback) => {
        const user = getUser(socket.id);
        console.log(user);

        let timestamp = new Date();
        let newmessage = {
            user: user.name, text: message,
            time: `${timestamp}`
        };
        console.log('\n\n newmessage:');
        console.log(newmessage);
        messages.push(newmessage);
        console.log(messages);

        socket.broadcast.emit('message', {
            user: user.name, text: message,
            time: `${timestamp}`
        });
        socket.emit('message', {
            user: user.name, text: message,
            time: `${timestamp}`
        });
        console.log('\n\n Someone send a new message')
        console.log('The message is: ')
        console.log(message)
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
            io.emit('message', {
                user: 'Admin', text: `${user.name} has left.`,
                time: `${timestamp}`
            });
            socket.broadcast.emit('usersList', { users });
        }
    })
});

http.listen(process.env.PORT || 5000, () => console.log(`Server has started.`));

