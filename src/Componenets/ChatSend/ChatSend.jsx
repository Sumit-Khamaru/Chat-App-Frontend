import React, { useState } from "react";
import styled from "styled-components";
// Css at Chat.css;
import Picker from "emoji-picker-react";
export default function ChatSend({ handleSendMsg }) {
  const [msg, setMsg] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const handleEmojiPickerHideShow = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const handleEmojiClick = (emojiObject, event) => {
    setMsg((pervInput) => pervInput + emojiObject.emoji);
  };

  // to send the message => we send the message to Parent-Chat
  const sendChat = (e) => {
    e.preventDefault();
    handleSendMsg(msg);
    setMsg("");
  };
  return (
    <Div style={{height: '55px'}}>
      <div className="chat__conversation-panel">
        <div className="chat__conversation-panel__container">
          <button className="chat__conversation-panel__button panel-item btn-icon add-file-button">
            <svg
              className="feather feather-plus sc-dnqmqq jxshSx"
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
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
          </button>

          <button
            className="chat__conversation-panel__button panel-item btn-icon emoji-button"
            onClick={handleEmojiPickerHideShow}
          >
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
          <input
            className="chat__conversation-panel__input panel-item"
            placeholder="Type a message..."
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
          />
          <button className="chat__conversation-panel__button panel-item btn-icon send-message-button" onClick={sendChat}>
            <svg
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
              data-reactid="1036"
            >
              <line x1="22" y1="2" x2="11" y2="13"></line>
              <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
            </svg>
          </button>

        </div>
      </div>

      {showEmojiPicker && <Picker onEmojiClick={handleEmojiClick} />}
    </Div>
  );
}

const Div = styled.div`
  .EmojiPickerReact {
    height: 350px !important;
    top: -420px;
    position: absolute;
    background-color: rgba(10, 14, 14, 0.95);
    border-color: #8147fc !important;

    .epr-search-container {
      input.epr-search {
        background-color: transparent;
      }
    }

    .epr-body::-webkit-scrollbar {
      background-color: #080420;
      width: 5px;
      &-thumb {
        background-color: #9a86f3;
      }
    }

    .epr-emoji-category-label {
      background-color: rgba(10, 14, 14, 0.95) !important;
    }
    .epr-preview {
      height: 55px;

      img {
        height: 30px !important;
        width: 30px !important;
      }
    }
  }

  .epr-catagory-nav {
    button {
      filter: contrast(0);
    }
  }
  .epr-search-container {
    background-color: transparent;
    border-color: #8147fc;
  }
`;
