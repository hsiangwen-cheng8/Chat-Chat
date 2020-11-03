import React, { useState, useEffect } from 'react';
import io from "socket.io-client";

import './Chat.css';

import TopBar from './TopBar';
import OnlineUserContainer from './OnlineUserContainer';
import Messages from './Messages';
import TextInputBox from './TextInputBox';
import crownIcon from '../icons/crown.png';
// I took this concept from a online tutorial found here: https://www.youtube.com/watch?v=ZwFA3YMfkoc&ab_channel=JavaScriptMastery
// Although I would argue that I made significant changes compare to the original. 
// Majority of functionalities are by myself or recoded
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

        // localStorage.removeItem("id");
        // localStorage.removeItem("name");
        // localStorage.removeItem("color");

        socket.emit('join', {
            id: localStorage.getItem("id"), name: localStorage.getItem("name")
            , color: localStorage.getItem("color")
        }, (user, users) => {
            console.log('useEffect join');
            console.log('useEffect join: ' + user);
            console.log('useEffect join: ' + user.id);
            console.log('useEffect join: ' + user.name);
            console.log('useEffect join: ' + user.color);
            // setOwner(user);
            owner_glob = user;
            setName(user.name);
            owner_name_glob = user.name;
            setUserColor(user.color);
            console.log('useEffect join: ' + users);
            setUsers(users);
            localStorage.setItem("id", user.id);
            localStorage.setItem("name", user.name);
            localStorage.setItem("color", user.color);
            console.log('useEffect join: ' + localStorage.getItem('color'));
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
            console.log(localStorage.getItem("name"))
            if (user.name === localStorage.getItem("name")) {
                localStorage.setItem("color", new_userColor);
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
            console.log(localStorage.getItem("id"))
            console.log(user.id)
            user.name = new_name;
            if (localStorage.getItem("id") === user.id) {
                console.log('useEffect changeUserName is user')
                setOwner(user);
                setName(new_name);
                owner_glob = user;
                owner_name_glob = new_name;
                localStorage.setItem("name", new_name);
            }
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
        console.log('changeMessageColor: ' + user.color)
        let old_messages = messages_history;
        messages_history = [];
        let newmessages = [];
        for (let i = 0; i < old_messages.length; i++) {
            if (old_messages[i].user.name === user.name) {
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

            const temp_message = message.toString();
            console.log(temp_message);
            const temp_user = {
                id: localStorage.getItem("id"),
                name: localStorage.getItem("name"),
                color: localStorage.getItem("color")
            };
            socket.emit('sendMessage', { user: temp_user, arg_message: temp_message }, () => setMessage(''));
            setMessage('');
        }
    }

    const scrollToBottom = () => {
        var objDiv = document.getElementById("messages_scroll");
        objDiv.scrollTop = objDiv.scrollHeight;
    }

    const headingCrownIcon = () => {
        return (<img alt="Crown Icon" src={crownIcon} />)
    }

    return (
        <div className="full-container">
            <div className="container">
                <div className="Heading d-flex flex-row bd-highlight">
                    <h1 className="text-center">Chat</h1>
                    <img className="HeadingImg" alt="Crown Icon" src={crownIcon} />
                    <h1 className="text-center">Chat</h1>
                </div>
                <TopBar name={name} color={localStorage.getItem("color")} />
                <Messages messages={messages} name={name} />
                <TextInputBox message={message} setMessage={setMessage} sendMessage={sendMessage} />
            </div>
            <OnlineUserContainer users={users} name={name} />
        </div>
    )
};

export default Chat;