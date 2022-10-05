import "./App.css";

import { useState, useEffect } from "react";
// import { nanoid } from "nanoid";
import io from "socket.io-client";

const socket = io.connect("http://localhost:5000");

function App() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [username, setUsername] = useState("");

  // Main thing just handling with the socket. 
  const sendChat = (e) => {    
    e.preventDefault();
    socket.emit("chat", { message, username });
    setMessage("");
  };

  useEffect(() => {
    socket.on("chat", (payload) => {
      setChat([...chat, payload]);
    });
  });

  useEffect(() => {
    const promptValue = prompt(`Enter Username ${username}`);
    setUsername(promptValue);
  },[]);

  return (
    <div className="App">
      <header className="App-header">
        <h1>E2E Chat app</h1>
        {chat.map((payload, index) => {
          return (
            <p key={index}>
              {payload.message} <span> User: {payload.username}</span>
            </p>
          );
        })}

        <form onSubmit={sendChat}>
          <input
            type="text"
            name="chat"
            placeholder="send text"
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
            }}
          />
          <button type="submit">Send</button>
        </form>
      </header>
    </div>
  );
}

export default App;
