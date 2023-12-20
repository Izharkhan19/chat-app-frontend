import "./App.css";
import { useState } from "react";
import ChatScreen from "./Chat_App/ChatScreen";
import { io } from "socket.io-client";
import Share from "./Components/Share/Share";

// const socket = io.connect("http://localhost:3001");
const socket = io.connect("https://chat-backend-f083.onrender.com");

function App() {
  const [userName, setUserName] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);

  const joinRoom = () => {
    if (userName !== "" && room !== "") {
      socket.emit("join_room", room);
      setShowChat(true);
    }
  };
  return (
    <>
      {/* <Share /> */}
      <div className="App">
        {!showChat ? (
          <>
            <h4>Join Chats</h4>
            <input
              type="text"
              placeholder="User name"
              onChange={(e) => {
                setUserName(e.target.value);
              }}
            />
            <input
              type="text"
              placeholder="Enter Room ID"
              onChange={(e) => {
                setRoom(e.target.value);
              }}
            />
            <button type="submit" onClick={joinRoom}>
              Join a room
            </button>
          </>
        ) : (
          <ChatScreen socket={socket} userName={userName} room={room} />
        )}
      </div>
    </>
  );
}

export default App;
