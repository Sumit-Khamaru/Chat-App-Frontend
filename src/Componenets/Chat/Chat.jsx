import React from "react";
import "./Chat.css";
import sendlogo from "../../Images/sendlogo.png";
import { user } from "../Join/Join";
import socketIo from "socket.io-client";
import { useEffect } from "react";
import { useState } from "react";
import ReactScrollToBottom from "react-scroll-to-bottom";
import Message from "../Message/Message";

let socket;
const ENDPOINT = "https://cchat-backend.onrender.com";

const Chat = () => {
  // const[chat, setChat] = useState("");
  const [id, setId] = useState("");
  const [messages, setMessages] = useState([]);

  const send = () => {
    const message = document.getElementById("chatInput").value;
    socket.emit("message", { message, id });
    document.getElementById("chatInput").value = "";
  };

  console.log(messages);

  // Using the Socket to send data to backend
  useEffect(() => {
    socket = socketIo(ENDPOINT, { transports: [`websocket`] });

    socket.on("connect", () => {
      alert("Connected");
      setId(socket.id);
    });

    socket.emit("joined", { user });

    socket.on("welcome", (data) => {
      setMessages([...messages, data]);
      console.log(data.user, data.message);
    });

    socket.on("userJoined", (data) => {
      setMessages([...messages, data]);
      console.log(data.user, data.message);
    });

    socket.on("left", (data) => {
      setMessages([...messages, data]);
      console.log(data.user, data.message);
    });
    return () => {
      socket.emit("disconnect");
      socket.off();
    };
  }, []);

  useEffect(() => {
    socket.on("sendMessage", (data) => {
      setMessages([...messages, data]);
      console.log(data.user, data.message);
    });

    return () => {
      socket.off();
    };
  }, [messages]);

  return (
    <div className="chatPage">
      <div className="chatContainer">
        <div className="header">
          <h3>Chat App</h3>
          <a href="/">
            <span className="material-symbols-rounded">close</span>
          </a>
        </div>
        <ReactScrollToBottom className="chatBox">
          {messages.map((item, i) => (
            <Message
              user={item.id === id ? "" : item.user}
              message={item.message}
              classs={item.id === id ? "right" : "left"}
            />
          ))}
        </ReactScrollToBottom>
        <div className="inputBox">
          <input
            onKeyPress={(e) => (e.key === "Enter" ? send() : null)}
            type="text"
            id="chatInput"
          />
          <button className="sendBtn" onClick={send}>
            <img src={sendlogo} alt="send" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
