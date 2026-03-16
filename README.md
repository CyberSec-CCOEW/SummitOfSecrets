# 🍎 Arjun's MacBook Pro — Desktop Simulation

A realistic macOS-style homepage with frontend + backend.

## 📁 Project Structure

```
arjun-macbook/
├── frontend/
│   └── index.html          # macOS desktop UI
├── backend/
│   ├── server.js           # Express API server
│   └── package.json
├── package.json
└── README.md
```

## 🚀 How to Run in VS Code

### Step 1 — Install dependencies
```bash
cd backend
npm install
```

### Step 2 — Start the server
```bash
node server.js
```
> Server runs at: **http://localhost:3001**

### Step 3 — Open the desktop
Open your browser and go to:
```
http://localhost:3001
```

Or simply open `frontend/index.html` directly in a browser (works without backend too — has fallback data).

---

## 🌐 API Endpoints

| Endpoint | Description |
|---|---|
| `GET /api/desktop` | Full desktop data (user, battery, notifications, files) |
| `GET /api/time` | Current server time |
| `GET /api/notifications` | Notification list |
| `GET /api/files` | Recent files |

---

## ✨ Features

- 🕐 Live clock with greeting (Good Morning/Afternoon/Evening, Arjun)
- ⛅ Weather widget (Pune, MH)
- 🔋 Battery indicator
- 🔔 Notifications panel
- 🗂️ Finder window (draggable!)
- 🔍 Spotlight search (Cmd+Space or Ctrl+Space)
- 🖥️ Animated macOS Dock with hover effects
- 🌅 Sonoma-style gradient wallpaper
- 📡 Backend API with Express.js



<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/b51b7d20-704e-4c20-9469-335ca45bd6d2" />

<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/bcfdf7b6-4760-48c9-9d16-aa1068f0e88f" />



