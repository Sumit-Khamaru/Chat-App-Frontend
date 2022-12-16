import React from "react";
import "./Join.css";
import logo from "../../Images/logo1.jpg";
import { Link } from "react-router-dom";
import { useState } from "react";
let user;
const Join = () => {
  
  const [userName, setUserName] = useState('');

  const joinHandler = () => {
    user = userName;
    setUserName("");
    // console.log(userName);
  }
  return (
    <div className="joinPage">
      <div className="joinContainer">
        <img src={logo} alt="logo" />
        <h1>Chat App</h1>
        <input  type="text" id="joinInput" placeholder="Enter Your Name" value={userName} onChange={(e)=> setUserName(e.target.value)} />
        <Link onClick={(e) => !userName ? e.preventDefault(): null} to="/chat"><button className="joinBtn" onClick={joinHandler}>Log In</button></Link>
      </div>
    </div>
  );
};

export default Join;
export {user};