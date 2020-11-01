import React from 'react';

import onlineIcon from '../icons/onlineIcon.png';

import './InfoBar.css';

const InfoBar = ({ name }) => (
  <div className="infoBar rounded text-white">
      <h3>User: {name}</h3>
  </div>
);

export default InfoBar;