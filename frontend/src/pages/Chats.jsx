import { useState } from "react";
import ChatList from "../components/ChatList";
import ChatWindow from "../components/ChatWindow";
import "../styles/chats.css";

export default function Chats() {
  const [selectedUser, setSelectedUser] = useState("sameer");

  return (
    <div className="chat-container">
      <div className="sidebar">
        <ChatList
          selectedUser={selectedUser}
          setSelectedUser={setSelectedUser}
        />
      </div>

      <div className="chat-main">
        <ChatWindow selectedUser={selectedUser} />
      </div>
    </div>
  );
}