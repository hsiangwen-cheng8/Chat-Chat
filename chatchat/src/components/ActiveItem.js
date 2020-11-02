import React from 'react';

import greenOnlineIcon from '../icons/greenOnlineIcon.png';

import './OnlineUserContainer.css';

const ActiveItem = ({ user }) => {

    const style = {
        color: '#' + user.color
    }

    return (
        <div key={user.name} className="activeItem" style={style}>
            {user.name}
            <img alt="Online Icon" src={greenOnlineIcon} />
        </div>
    )
};



export default ActiveItem;