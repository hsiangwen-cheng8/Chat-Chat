import React from 'react';
import Time from 'react-time';

import './Message.css';

import ReactEmoji from 'react-emoji';
// I took this from a online tutorial found here: https://www.youtube.com/watch?v=ZwFA3YMfkoc&ab_channel=JavaScriptMastery
// Although I would say that I made some effort to change it.
// Now there are timestamp and color coded and response to color change
const Message = ({ message: { text, user, time, type }, name }) => {
  let received_time = new Date(time);
  let isSentByCurrentUser = false;
  if (user.name === name) {
    isSentByCurrentUser = true;
  }

  const style = {
    color: '#'+user.color
  }

  const messageContainerContent = () => {
    if (user.name === name) {
      return (
        <div className="messageContainer justifyEnd">
          <p className="sentText padding-right"><Time value={received_time} format="YYYY/MM/DD HH:mm" /></p>
          <p className="sentText padding-right" style={style}> {user.name}</p>
          <div className="messageBox backgroundBlue">
            <p className="messageText white ">{ReactEmoji.emojify(text)}</p>
          </div>
        </div>
      )
    }
    else{
      return (
        <div className="messageContainer justifyStart">
          <div className="messageBox backgroundLight">
            <p className="messageText black">{ReactEmoji.emojify(text)}</p>
          </div>
          <p className="sentText padding-left" style={style}>{user.name}</p>
          <p className="sentText padding-left "><Time value={received_time} format="YYYY/MM/DD HH:mm" /></p>
        </div>
      )
    }
  }

  return (
    messageContainerContent()
  )
};

export default Message;