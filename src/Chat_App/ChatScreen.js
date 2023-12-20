// import React, { useEffect, useState } from "react";
// import "./chatapp.css";

// const ChatScreen = ({ socket, userName, room }) => {
//   const [currentMessage, setCurrentMessage] = useState("");
//   const [chatData, setChatData] = useState([]);

//   const sendMessage = async () => {
//     if (currentMessage !== "") {
//       const messageData = {
//         room: room,
//         author: userName,
//         message: currentMessage,
//         time:
//           new Date(Date.now()).getHours() +
//           ":" +
//           new Date(Date.now()).getMinutes(),
//       };

//       await socket.emit("send_message", messageData);
//       setChatData((list) => [...list, messageData]);
//       setCurrentMessage("");
//     }
//   };

//   useEffect(() => {
//     socket.on("recieve_message", (data) => {
//       console.log(data);
//       setChatData((list) => [...list, data]);
//     });
//   }, [socket]);

//   return (
//     <>
//       <div className="chatHeader">
//         <p>Live Chat</p>
//       </div>
//       <div className="chatBody">
//         {chatData.map((chatObj, idx) => {
//           return (
//             <div
//               className="message"
//               id={userName === chatObj.author ? "you" : "other"}
//             >
//               <div className="message-content">
//                 <p>{chatObj.message}</p>
//               </div>
//               <div className="message-meta">
//                 <p>{chatObj.author}</p>
//                 <p>{chatObj.time}</p>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//       <div className="chatFooter">
//         <input
//           type="text"
//           placeholder="Type something..."
//           value={currentMessage}
//           onChange={(e) => setCurrentMessage(e.target.value)}
//         />
//         <button type="button" onClick={sendMessage}>
//           Send
//         </button>
//       </div>
//     </>
//   );
// };

// export default ChatScreen;

// ChatScreen.js

import React, { useEffect, useRef, useState } from "react";
import "./chatapp.css";
import axios from "axios";

const ChatScreen = ({ socket, userName, room }) => {
  const chatBodyRef = useRef();
  const [currentMessage, setCurrentMessage] = useState("");
  const [chatData, setChatData] = useState([]);

  // async function getMsgReq() {
  //   const reqData = {
  //     room: room,
  //     user: userName,
  //     message: currentMessage,
  //   };

  //   let resp = await axios({
  //     method: "post",
  //     url: "http://localhost:3001/myChat/chat",
  //     data: reqData,
  //   });
  //   console.log("resp", resp);
  // }

  const sendMessage = async () => {
    // await getMsgReq();
    if (currentMessage !== "") {
      const messageData = {
        room: room,
        author: userName,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };

      await socket.emit("send_message", messageData);
      setChatData((list) => [...list, messageData]);
      setCurrentMessage("");
    }
  };

  const scrollToBottom = () => {
    chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
  };

  useEffect(() => {
    socket.on("recieve_message", (data) => {
      console.log(data);
      setChatData((list) => [...list, data]);
      scrollToBottom();
    });
  }, [socket]);

  return (
    <>
      <div className="chatContainer">
        <div className="chatHeader">
          <p>Live Chat</p>
        </div>
        <div>
          <p className="px-1 char-user-name">
            <img
              src={"https://cdn-icons-png.flaticon.com/512/9131/9131529.png"}
              alt=""
              className="mb-1 mt-1"
              width={"20px"}
              height={"20px"}
            />
            <span className="px-2">{userName}</span>
          </p>
        </div>
        <div className="chatBody" ref={chatBodyRef}>
          {chatData.map((chatObj, idx) => {
            const isYou = userName === chatObj.author;
            const messageClass = isYou ? "you" : "other";
            return (
              <>
                <div className={`message ${messageClass}`} key={idx}>
                  <div className="message-content">
                    <p>{chatObj.message}</p>
                    <div className="message-meta">
                      <p>{chatObj.author}</p>
                      <p>{chatObj.time}</p>
                    </div>
                  </div>
                </div>
              </>
            );
          })}
        </div>
        <div className="chatFooter">
          <input
            type="text"
            placeholder="Type something..."
            className="chatInput"
            value={currentMessage}
            onChange={(e) => setCurrentMessage(e.target.value)}
          />
          <button type="button" className="sendButton" onClick={sendMessage}>
            Send
          </button>
        </div>
      </div>
    </>
  );
};

export default ChatScreen;
