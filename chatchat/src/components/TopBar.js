import React from 'react';

import './TopBar.css';
// I took this concept from a online tutorial found here: https://www.youtube.com/watch?v=ZwFA3YMfkoc&ab_channel=JavaScriptMastery
// Although... Like this thing is so generic. 
// I Modify a bit so add functionality like color and my taste my coding
const TopBar = ({ name, color }) => {
  console.log('TopBar: ' + name + " " + color);
  const style = {
    color: '#' + color
  }
  return (
    <div className="TopBar rounded text-white">
      <h3 style={style}>Welcome, Your Majesty: {name}</h3>
    </div>
  )
};

export default TopBar;