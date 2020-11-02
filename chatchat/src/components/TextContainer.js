import React from 'react';

import AcitveItem from './ActiveItem';
import './TextContainer.css';

const TextContainer = ({ users }) => {

  const this_users = users;

  return (
    <div className="textContainer">
      {
        this_users
          ? (
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
          : null
      }
    </div>
  )
};



export default TextContainer;