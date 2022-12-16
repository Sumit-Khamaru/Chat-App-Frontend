import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Join from "./Componenets/Join/Join";
import Chat from "./Componenets/Chat/Chat";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
        <Route exact path="/" element={<Join/>} />
        <Route path="/chat"  element={<Chat />}/>
        </Routes>
        
      </Router>
    </div>
  );
}

export default App;
