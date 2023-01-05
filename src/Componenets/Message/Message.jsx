import { Avatar } from "@mui/material";
import React from "react";
import "./Message.css";
const Message = ({ data, currentChat, user, currentUser }) => {

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
    <>
      <div className={`chat__conversation-board__message-container ${user ? "reversed" : ""}`} >
        <div className="chat__conversation-board__message__person">
          <div className="chat__conversation-board__message__person__avatar">
            {
              user ? (<Avatar 
                {...stringAvatar(currentUser.name)}
                alt="User"/>) : (<Avatar 
                  {...stringAvatar(currentChat.name)}
                  alt="User"/>)
            }
          </div>
          <span className="chat__conversation-board__message__person__nickname">
            {currentChat.name}
          </span>
        </div>
        <div className="chat__conversation-board__message__context">
          <div className="chat__conversation-board__message__bubble">
            <span>{data}</span>
          </div>
        </div>
        <div className="chat__conversation-board__message__options">
          <button className="btn-icon chat__conversation-board__message__option-button option-item emoji-button">
            <svg
              className="feather feather-smile sc-dnqmqq jxshSx"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
              <line x1="9" y1="9" x2="9.01" y2="9"></line>
              <line x1="15" y1="9" x2="15.01" y2="9"></line>
            </svg>
          </button>
          <button className="btn-icon chat__conversation-board__message__option-button option-item more-button">
            <svg
              className="feather feather-more-horizontal sc-dnqmqq jxshSx"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <circle cx="12" cy="12" r="1"></circle>
              <circle cx="19" cy="12" r="1"></circle>
              <circle cx="5" cy="12" r="1"></circle>
            </svg>
          </button>
        </div>
      </div>
    </>
  );
};

export default Message;
