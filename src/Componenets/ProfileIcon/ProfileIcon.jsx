import React, { Fragment } from "react";
import "./ProfileIcon.css";
import Avatar from "@mui/material/Avatar";

export default function ProfileIcon({ currentUser, logout }) {

  
  if(currentUser === undefined) {
    return <Fragment />
  }
  function stringToColor(string) {
    let hash = 0;
    let i;
  
    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }
  
    let color = '#';
  
    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */
  
    return color;
  }
  
  function stringAvatar(name) {
    return {
      sx: {
        bgcolor: stringToColor(name),
        height: '35px',
        width: '35px',
        fontSize: '18px',
        textAlign: 'center',

      },
      children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
    };
  }

  
  return (
    <div className="wrapper">
      <Avatar 
        {...stringAvatar(currentUser.name)}
        alt="User"/>
      <ul>
        {/* <li>Profile</li> */}
        <li onClick={logout}>Logout</li>
      </ul>
    </div>
  );
}
