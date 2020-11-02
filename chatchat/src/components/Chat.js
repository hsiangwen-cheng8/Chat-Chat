import React, { useState, useEffect } from 'react';
import io from "socket.io-client";

import './Chat.css';

import InfoBar from './InfoBar';
import TextContainer from './TextContainer';
import Messages from './Messages';
import Input from './Input';

const ENDPOINT = 'localhost:5000';
let socket;

const Chat = () => {

    const [owner, setOwner] = useState('');
    const [name, setName] = useState('');
    const [userColor, setUserColor] = useState('');
    const [users, setUsers] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    let messages_history = [];
    let owner_name_glob = '';
    let owner_glob;

    const setMultipleMessages = (new_messages) => {
        console.log('setMultipleMessages');
        console.log(new_messages);
        console.log(new_messages.messages.length);
        console.log(new_messages.messages);
        for (var i = 0; i < new_messages.messages.length; i++) {
            setMessages(messages => [...messages, new_messages.messages[i]]);
            messages_history.push(new_messages.messages[i]);
        }
    }

    useEffect(() => {
        socket = io(ENDPOINT);
        // localStorage.setItem('myCat', 'Tom');
        socket.emit('join', {}, (user, users) => {
            console.log('useEffect join');
            console.log('useEffect join: ' + user);
            setOwner(user);
            owner_glob=user;
            setName(user.name);
            owner_name_glob =user.name;
            setUserColor(user.color);
            console.log('useEffect join: ' + users);
            setUsers(users);
        });
    }, [ENDPOINT]);

    useEffect(() => {
        socket.on('messages', new_messages => {
            console.log('useEffect messages')
            window.scrollTo(0, document.querySelector(".messages").scrollHeight);
            setMultipleMessages(new_messages);
            scrollToBottom();
        });

        socket.on('message', message => {
            console.log('useEffect message')
            setMessages(messages => [...messages, message]);
            messages_history.push(message);
            console.log(messages_history);
            scrollToBottom();
        });

        socket.on("usersList", ({ users }) => {
            console.log('useEffect usersList')
            console.log(users);
            setUsers(users);
        });

        socket.on("changeColor", ({ user, users }) => {
            console.log('useEffect changeColor')
            let new_userColor = findNewUserColor(user, users);
            setUsers(users);
            console.log(user.name)
            console.log(owner_name_glob)
            if (user.name === owner_name_glob) {
                setUserColor(new_userColor);
            }
            user.color = new_userColor;
            changeMessageColor(user);
            console.log(messages);
        });

        socket.on("changeUserName", ({ user, users }) => {
            console.log('useEffect changeUserName')
            let new_name = findNewUserName(user, users);
            setUsers(users);
            console.log(owner_glob.id)
            console.log(user.id)
            if (owner_glob.id === user.id) {
                setOwner(user);
                setName(new_name);
                owner_glob = user;
                owner_name_glob = user.name
            }
            user.name = new_name;
            changeMessageName(user);
            console.log(messages);
        });
    }, []);

    const findNewUserName = (user, users) => {
        for (let i = 0; i < users.length; i++) {
            if (users[i].id === user.id) {
                console.log('user found: ' + user.name);
                return users[i].name;
            }
        }
    }

    const changeMessageName = (user) => {
        console.log('changeMessageName')
        let old_messages = messages_history;
        messages_history = [];
        let newmessages = [];
        for (let i = 0; i < old_messages.length; i++) {
            if (old_messages[i].user.id === user.id) {
                old_messages[i].user.name = user.name;
            }
            newmessages.push(old_messages[i]);
        }
        let wrapper_obj = { messages: newmessages };
        const myNode = document.getElementById("MessagesContent");
        while (myNode.firstChild) {
            myNode.removeChild(myNode.lastChild);
        }
        setMultipleMessages(wrapper_obj);
    }

    const findNewUserColor = (user, users) => {
        console.log('findNewUserColor')
        for (let i = 0; i < users.length; i++) {
            if (users[i].id === user.id) {
                console.log('user found: ' + user.name);
                return users[i].color
            }
        }
    }

    const changeMessageColor = (user) => {
        console.log('changeMessageColor')
        let old_messages = messages_history;
        messages_history = [];
        let newmessages = [];
        for (let i = 0; i < old_messages.length; i++) {
            if (old_messages[i].user.id === user.id) {
                old_messages[i].user.color = user.color;
            }
            newmessages.push(old_messages[i]);
        }
        let wrapper_obj = { messages: newmessages };
        const myNode = document.getElementById("MessagesContent");
        while (myNode.firstChild) {
            myNode.removeChild(myNode.lastChild);
        }
        setMultipleMessages(wrapper_obj);
    }

    const sendMessage = (event) => {
        event.preventDefault();

        if (message) {
            socket.emit('sendMessage', message, () => setMessage(''));
        }
    }

    const scrollToBottom = () => {
        var objDiv = document.getElementById("messages_scroll");
        objDiv.scrollTop = objDiv.scrollHeight;
    }

    return (
        <div className="full-container">
            <div className="container">
                <h1 className="text-center">Chat Chat</h1>
                <InfoBar name={name} color={userColor} />
                <Messages messages={messages} name={name} />
                <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
            </div>
            <TextContainer users={users} />
        </div>
    )
};

export default Chat;