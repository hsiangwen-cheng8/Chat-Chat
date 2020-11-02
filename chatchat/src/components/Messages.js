import React from 'react';

import Message from './Message';

import './Messages.css';
// I took this concept from a online tutorial found here: https://www.youtube.com/watch?v=ZwFA3YMfkoc&ab_channel=JavaScriptMastery
// Although I would argue that I made significant changes compare to the original.
// My version actually did what the prof ask which align from the bottom
const Messages = ({ messages, name }) => {

  return (
    <div className="messages" id="messages_scroll">
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