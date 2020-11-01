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
    const [users, setUsers] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    const setMultipleMessages = (new_messages) => {
        console.log('setMultipleMessages');
        console.log(new_messages.messages.length);
        console.log(new_messages.messages);
        for (var i = 0; i < new_messages.messages.length; i++) {
            setMessages(messages => [...messages, new_messages.messages[i]]);
        }
    }

    useEffect(() => {
        socket = io(ENDPOINT);

        socket.emit('join', {}, (username, users) => {
            console.log(username);
            setName(username);
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
            scrollToBottom();
        });

        socket.on("usersList", ({ users }) => {
            console.log(users);
          setUsers(users);
        });
    }, []);

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
                <InfoBar name={name} />
                <Messages messages={messages} name={name} />
                <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
            </div>
            <TextContainer users={users}/>
        </div>
    )
};

export default Chat;