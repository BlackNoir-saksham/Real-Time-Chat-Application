import io from "socket.io-client";
import "./App.css";
import { useState } from "react";
import Chat from "./Chat";

const socket = io.connect("http://localhost:3001");

function App() {
  const [username, setUsername] = useState("");
  const [roomId, setRoomId] = useState("");
  const [showChat, setShowChat] = useState(false);

  const joinRoom = () => {
    if (username !== "" && roomId !== "") {
      socket.emit("join_room", roomId);
      setShowChat(true)
    }
  };

  return (<>
    <div className="App">
      <h1>Chat App</h1>
      <>
      <div className="joinChatContainer">
        <div>
        {showChat === false ? (
        <><h3>Join the Chat</h3><input
                type="text"
                placeholder="John..."
                onChange={(event) => {
                  setUsername(event.target.value);
                } } /><input
                  type="text"
                  placeholder="Room ID..."
                  onChange={(event) => {
                    setRoomId(event.target.value);
                  } } /><button onClick={joinRoom}>Join a Room</button></>
        ) : (
        <Chat socket={socket} username={username} roomId={roomId} />
        )}
        </div>
      </div>
      </>
    </div>
    </>
  );
}

export default App;


//chat.js

// import React, { useEffect, useState } from "react";

// function Chat({ socket, username, roomId }) {
//   const [currentMessage, setCurrentMessage] = useState("");
//   const [messageList, setMessageList] = useState([]);
//   //   console.log(currentMessage)

//   const sendMessage = async () => {
//     if (currentMessage !== "") {
//       const messageData = {
//         roomId: roomId,
//         author: username,
//         message: currentMessage,
//         time:
//           new Date(Date.now()).getHours() +
//           ":" +
//           new Date(Date.now()).getMinutes(),
//       };

//       await socket.emit("send_message", messageData)
//       setMessageList((list) => [...list, messageData]);
//       setCurrentMessage("")// new
        
      
//     }
//   };

//   useEffect(() => {
//     socket.on("received_message", (data) => {
//     //   console.log(data);
//       setMessageList((list) => [...list, data]);
//     });
//   }, [socket]);

//   return (
//     <div className="chat-window">
//       <div className="chat-header">
//         <p>LIVE CHAT</p>
//       </div>
//       <div className="chat-body">
//         {messageList.map((messageContent) => {
//             return <h1>{messageContent.message}</h1>
//         })}
//       </div>
//       <div className="chat-footer">
//         <input
//           type="text"
//           placeholder="Type your message"
//           onChange={(event) => {
//             setCurrentMessage(event.target.value);
//           }}
//         />
//         <button onClick={sendMessage}>📧</button>
//       </div>
//     </div>
//   );
// }

// export default Chat;