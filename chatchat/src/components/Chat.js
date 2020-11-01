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

    const [name, setName] = useState('');
    const [userColor, setUserColor] = useState('');
    const [users, setUsers] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    let messages_history = [];

    const setMultipleMessages = (new_messages) => {
        console.log(new_messages);
        console.log('setMultipleMessages');
        console.log(new_messages.messages.length);
        console.log(new_messages.messages);
        for (var i = 0; i < new_messages.messages.length; i++) {
            setMessages(messages => [...messages, new_messages.messages[i]]);
            messages_history.push(new_messages.messages[i]);
        }
    }

    useEffect(() => {
        socket = io(ENDPOINT);

        socket.emit('join', {}, (user, users) => {
            console.log(user);
            setName(user.name);
            setUserColor(user.color);
            console.log(users);
            setUsers(users);
        });
    }, [ENDPOINT]);

    useEffect(() => {
        socket.on('messages', new_messages => {
            window.scrollTo(0, document.querySelector(".messages").scrollHeight);
            setMultipleMessages(new_messages);
            scrollToBottom();
        });

        socket.on('message', message => {
            setMessages(messages => [...messages, message]);
            messages_history.push(message);
            console.log(messages_history);
            scrollToBottom();
        });

        socket.on("usersList", ({ users }) => {
            console.log(users);
            setUsers(users);
        });

        socket.on("changeColor", ({ user, users }) => {
            console.log(messages);
            console.log('changeColor')
            let new_userColor = findNewUserColor(user, users);
            console.log('setUsers(users)')
            setUsers(users);
            console.log('setUserColor(new_userColor)')
            setUserColor(new_userColor);
            user.color = new_userColor;
            console.log('changeMessageColor(user)')
            changeMessageColor(user);
            console.log(messages);
        });
    }, []);

    const findNewUserColor = (user, users) => {
        for (let i = 0; i < users.length; i++) {
            if (users[i].id === user.id) {
                console.log('user found: ' + user.name);
                return users[i].color
            }
        }
    }

    const changeMessageColor = (user) => {
        let old_messages = messages_history;
        console.log(messages_history);
        messages_history = [];
        let newmessages = [];
        for (let i = 0; i < old_messages.length; i++) {
            console.log(old_messages[i]);
            if (old_messages[i].user.id === user.id) {
                old_messages[i].user.color = user.color;
            }
            newmessages.push(old_messages[i]);
        }
        console.log(newmessages);
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