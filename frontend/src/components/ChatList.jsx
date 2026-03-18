import { users, chats } from "../data/chatsData";

export default function ChatList({ selectedUser, setSelectedUser }) {
  return (
    <div className="chatlist-wrapper">
      <h2 className="chatlist-title">Messages</h2>

      <input
        className="search-box"
        placeholder="Search conversation..."
      />

      {users.map((user) => {
        const lastMessage =
          chats[user.id]?.[chats[user.id].length - 1];

        return (
          <div
            key={user.id}
            onClick={() => setSelectedUser(user.id)}
            className={`chat-item ${
              selectedUser === user.id ? "active" : ""
            }`}
          >
            <div className="chat-name">{user.name}</div>

            <div className="chat-preview">
              {lastMessage?.message}
            </div>
          </div>
        );
      })}
    </div>
  );
}