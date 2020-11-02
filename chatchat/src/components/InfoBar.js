import React from 'react';

import onlineIcon from '../icons/onlineIcon.png';

import './InfoBar.css';

const InfoBar = ({ name, color }) => {
  console.log(name+" "+color);
  const style = {
    color: '#' + color
  }
  return (
    <div className="infoBar rounded text-white">
      <h3 style={style}>User: {name}</h3>
    </div>
  )
};

export default InfoBar;