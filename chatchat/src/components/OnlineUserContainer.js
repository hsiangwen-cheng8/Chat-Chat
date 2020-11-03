import React from 'react';

import AcitveItem from './ActiveItem';
import './OnlineUserContainer.css';
// I took this concept from a online tutorial found here: https://www.youtube.com/watch?v=ZwFA3YMfkoc&ab_channel=JavaScriptMastery
// Although I would argue that I made significant changes compare to the original.
// To make it better, I made a new component called AcitveItem
const OnlineUserContainer = ({ users, name }) => {

  const this_users = users;

  const onlineUsersContainerContent = () => {
    if (this_users) {
      return (
        <div>
          <h1>Online User:</h1>
          <div className="onlineUserContainer">
            <h2>
              {this_users.map((user, key) => {
                return (
                  <AcitveItem
                    key={key}
                    user={user}
                    name={name}
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
    <div className="onlineUsersContainer">
      {onlineUsersContainerContent()}
    </div>
  )
};



export default OnlineUserContainer;