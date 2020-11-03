import React from 'react';

import crownIcon from '../icons/crownLittle.png';
import onlineIcone from '../icons/greenOnlineIcon.png';

import './OnlineUserContainer.css';

const ActiveItem = ({ user, name }) => {

    const style = {
        color: '#' + user.color
    }

    const userSpecialIcon = () => {
        if (user.name === name) {
            return (
                <span id="crownIcon">
                    <img alt="Crown Icon" src={crownIcon} />
                </span>
            )
        }
        return (
            <span id="onlineIcon">
                <img alt="Online Icon" src={onlineIcone} />
            </span>
        )
    }

    return (
        <div key={user.name} className="activeItem" style={style}>
            {userSpecialIcon()}
            <span>{user.name}</span>
        </div>
    )
};



export default ActiveItem;