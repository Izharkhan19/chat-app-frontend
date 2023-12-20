import React, { useState, useEffect } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:5000"); // Replace with your server URL

const ChatPage = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");

  useEffect(() => {
    // Listen for incoming messages
    socket.on("message", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    // Clean up on component unmount
    return () => {
      socket.disconnect();
    };
  }, []);

  const sendMessage = () => {
    if (inputMessage.trim() !== "") {
      // Emit the message to the server
      socket.emit("message", inputMessage);

      // Update local state
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: inputMessage, type: "sent" },
      ]);
      setInputMessage("");
    }
  };
  return (
    <div>
      <div>
        <div
          style={{
            height: "300px",
            border: "1px solid #ccc",
            padding: "10px",
            overflowY: "scroll",
          }}
        >
          {messages.map((message, index) => (
            <div
              key={index}
              style={{
                marginBottom: "10px",
                color: message.type === "received" ? "green" : "blue",
              }}
            >
              {message.text}
            </div>
          ))}
        </div>
      </div>
      <div>
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder="Type your message..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatPage;
