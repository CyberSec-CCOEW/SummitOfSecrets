import { useState, useEffect, useRef } from "react";
import { chats, users } from "../data/chatsData";

export default function ChatWindow({ selectedUser }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const fileInputRef = useRef(null);
  const bottomRef = useRef(null);

  useEffect(() => {
    setMessages(chats[selectedUser] || []);
  }, [selectedUser]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (!input.trim()) return;

    const newMsg = {
      id: Date.now(),
      sender: "You",
      message: input,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      edited: false,
    };

    setMessages((prev) => [...prev, newMsg]);
    setInput("");
  };

  const handleFileClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const newMsg = {
      id: Date.now(),
      sender: "You",
      message: `📎 ${file.name}`,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      edited: false,
    };

    setMessages((prev) => [...prev, newMsg]);
  };

  const selectedUserName =
    users.find((u) => u.id === selectedUser)?.name;

  return (
    <div className="chatwindow-wrapper">

      {/* Header */}
      <div className="chat-header">
        {selectedUserName}
      </div>

      {/* Messages */}
      <div className="messages-area">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`message ${
              msg.sender === "You" ? "sent" : "received"
            }`}
          >
            <div className="bubble">
              <div className="message-text">
                {msg.message}
              </div>

              <div className="message-meta">
                <span className="time">{msg.timestamp}</span>
                {msg.edited && (
                  <span className="edited">(edited)</span>
                )}
              </div>
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="input-area">

        {/* Attachment Icon */}
        <button
          className="attach-btn"
          onClick={handleFileClick}
        >
          📎
        </button>

        <input
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleFileChange}
        />

        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
        />

        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}