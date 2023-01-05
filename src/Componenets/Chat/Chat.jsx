import React, { useState, useEffect, useRef } from "react";
import "./Chat.css";
import { io } from "socket.io-client";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import HomeIcon from "@mui/icons-material/Home";
import Divider from "@mui/material/Divider";
import {v4 as uuidv4} from 'uuid';
import Message from "../Message/Message";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  allUserRoute,
  sendMessageRoute,
  getAllMessageRoute,
  host,
} from "../../utils/APIRoutes";

import Contact from "../Contacts/Contact";
import Welcome from "../Welcome";
import ChatSend from "../ChatSend/ChatSend";
import ProfileIcon from "../ProfileIcon/ProfileIcon";



const Chat = () => {
  const socket = useRef();
  const navigate = useNavigate();
  const scrollRef = useRef();

  // To the Users
  const [contacts, setContacts] = useState([]);
  const [currentUser, setcurrentUser] = useState(undefined);
  const [currentChat, setcurrentChat] = useState(undefined);
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    async function getUser() {
      if (!localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
        navigate("/");
      }
      setcurrentUser(await JSON.parse(localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)));
    }

    getUser().catch(console.error);
  }, []);

  useEffect(() => {
    if (currentUser) {
      socket.current = io(host);

      socket.current.emit("add-user", currentUser._id);
    }
  }, [currentUser]);

  // // If current user dont set the avatar image
  useEffect(() => {
    async function getCurrentUser() {
        const data = await axios.get(`${allUserRoute}/${currentUser._id}`);
        setContacts(data.data.allUsers);
        navigate("/chats");
    }
    if (currentUser) {
      getCurrentUser();
    }
  }, [currentUser, navigate]);

  // When The Current-Chat(people-Changed) the message-box need tobe Changed
  useEffect(() => {
    async function getAllChats() {
      if (currentChat) {
        const response = await axios.post(getAllMessageRoute, {
          from: currentUser._id,
          to: currentChat._id,
        });
        setMessages(response.data);
      }
    }
    getAllChats();
  }, [currentChat]);

  // When use Change the Peoples the conversation need to change
  const handleChatChange = (chat) => {
    setcurrentChat(chat);
  };

  // TO get the User-Message Input From ChatSend
  const handleSendMsg = async (msg) => {
    await axios.post(sendMessageRoute, {
      from: currentUser._id,
      to: currentChat._id,
      message: msg,
    });

    socket.current.emit("send-msg", {
      to: currentChat._id,
      from: currentUser._id,
      message: msg,
    });

    const msgs = [...messages];
    msgs.push({ fromSelf: true, message: msg });
    setMessages(msgs);
  };

  // Arrival Message this run only Once
  const [arrivalMessage, setArrivalMessage] = useState(null);
  useEffect(() => {
    if(!socket.current) return;
      socket.current.on("msg-receive", (msg) => {
        setArrivalMessage({ fromSelf: false, message: msg });
      }); 
  }, [socket.current]);

  // This useEffect run when new Messages are received
  useEffect(() => {
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);

  // For Scroll Effect
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);



  // LogOut
  const handleLogout = async () => {
    localStorage.clear();
    navigate("/");
  };
  // Render Component
  return (
    <>
      <div className="--dark-theme" id="chat">
        <div className="chat__conversation-board">
          <div className="navbar">
            <Tooltip
              title="Home"
              sx={{ fontSize: "10px" }}
              placement="top"
              arrow
            >
              <Link to="/">
                <IconButton>
                  <HomeIcon
                    sx={{
                      color: "white",
                      marginLeft: "10px",
                      fontSize: "25px",
                    }}
                  />
                </IconButton>
              </Link>
            </Tooltip>

            {/* People List */}
            <Contact
              contacts={contacts}
              currentUser={currentUser}
              chahgeChat={handleChatChange}
            />

            {/* My Profile  need to fix the tooltip*/}
            <ProfileIcon currentUser={currentUser} logout={handleLogout} />
          </div>
          <Divider sx={{ marginBottom: "8px", backgroundColor: "#8147fc" }} />
          {currentChat === undefined ? (
            <Welcome currentUser={currentUser} />
          ) : (
            <div>
              {messages.map((data) => (
                <div key={uuidv4()} ref={scrollRef}>
                  <Message
                    data={data.message}
                    currentChat={currentChat}
                    user={data.fromSelf}
                    currentUser={currentUser}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
        {/* Send-Chat Button */}
        <ChatSend handleSendMsg={handleSendMsg} />
      </div>
    </>
  );
};

export default Chat;
