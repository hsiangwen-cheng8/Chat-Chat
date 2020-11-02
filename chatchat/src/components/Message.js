import React from 'react';
import Time from 'react-time';

import './Message.css';

import ReactEmoji from 'react-emoji';

const Message = ({ message: { text, user, time, type }, name }) => {
  let received_time = new Date(time);
  let isSentByCurrentUser = false;
  if (user.name === name) {
    isSentByCurrentUser = true;
  }

  const style = {
    color: '#'+user.color
  }

  return (
    isSentByCurrentUser
      ? (
        <div className="messageContainer justifyEnd">
          <p className="sentText pr-10"><Time value={received_time} format="YYYY/MM/DD HH:mm" /></p>
          <p className="sentText pr-10" style={style}> {user.name}</p>
          <div className="messageBox backgroundBlue">
            <p className="messageText colorWhite ">{ReactEmoji.emojify(text)}</p>
          </div>
        </div>
      )
      : (
        <div className="messageContainer justifyStart">
          <div className="messageBox backgroundLight">
            <p className="messageText colorDark">{ReactEmoji.emojify(text)}</p>
          </div>
          <p className="sentText pl-10" style={style}>{user.name}</p>
          <p className="sentText pl-10 "><Time value={received_time} format="YYYY/MM/DD HH:mm" /></p>
        </div>
      )
  );
}

export default Message;