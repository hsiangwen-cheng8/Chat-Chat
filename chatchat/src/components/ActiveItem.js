import React from 'react';
// import { removeUser } from '../../../server/utilities';

import onlineIcon from '../icons/onlineIcon.png';

import './TextContainer.css';

const ActiveItem = ({ user }) => {

    const style = {
        color: '#' + user.color
    }

    return (
        <div key={user.name} className="activeItem" style={style}>
            {user.name}
            <img alt="Online Icon" src={onlineIcon} />
        </div>
    )
};



export default ActiveItem;