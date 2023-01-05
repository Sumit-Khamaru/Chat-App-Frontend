import "./App.css";
import { Outlet, Route } from "react-router-dom";
import { io } from "socket.io-client";
import { useEffect, useState } from "react";
import Room from "./Componenets/Room/Room";
import JoinPage from "./Pages/JoinPage";
import ChatPage from "./Pages/ChatPage";

function App() {
  const [socket, setSocket] = useState(null);
  useEffect(() => {
    const newSocket = io('http://localhost:4000');
    setSocket(newSocket);
  }, []);
  return (
    <div>
      <JoinPage />
      <ChatPage />
      <Room />
    </div>

  );
}

export default App;
