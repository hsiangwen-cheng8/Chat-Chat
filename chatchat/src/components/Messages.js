import React, { useState, useEffect } from 'react';

import Message from './Message';

import './Messages.css';

const Messages = ({ messages, name }) => {

  return (
    <div className="messages" id="messages_scroll">
      {/* {messages.map((message, i) => <div className="message-wrapper" key={i}><Message message={message} name={name} /></div>)} */}
      <div className="wrapper">
        <div className="content" id="MessagesContent">
          {messages.map((message, key) => {
            return (
              <div className="message-wrapper" key={key}>
                <Message message={message} name={name} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  )
};

export default Messages;