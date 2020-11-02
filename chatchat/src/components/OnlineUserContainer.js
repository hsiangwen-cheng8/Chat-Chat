import React from 'react';

import AcitveItem from './ActiveItem';
import './OnlineUserContainer.css';
// I took this concept from a online tutorial found here: https://www.youtube.com/watch?v=ZwFA3YMfkoc&ab_channel=JavaScriptMastery
// Although I would argue that I made significant changes compare to the original.
// To make it better, I made a new component called AcitveItem
const OnlineUserContainer = ({ users }) => {

  const this_users = users;

  const textContainerContent = () => {
    if (this_users) {
      return (
        <div>
          <h1>People currently chatting:</h1>
          <div className="activeContainer">
            <h2>
              {this_users.map((user, key) => {
                return (
                  <AcitveItem
                    key={key}
                    user={user}
                  />
                );
              })}
            </h2>
          </div>
        </div>
      )
    }
  }

  return (
    <div className="textContainer">
      {textContainerContent()}
    </div>
  )
};



export default OnlineUserContainer;