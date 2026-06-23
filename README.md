# HouseAI 

An A.I chatbot inspired by Dr. Gregory House from *House, M.D.*
HouseAI recreates the sarcastic, brutally honest, witty diagnostic style of Gregory House using Gemini models and a custom personality system prompt. The goal is not to build another generic chatbot, but to create a character-driven AI experience that feels like you're actually talking to House himself.

![HouseAI Banner](https://v0-drhouse.vercel.app/)

## ✨ Features

* 🩺 Dr. House personality simulation
* 💬 Real-time conversational interface
* ⌨️ Typewriter-style response animation
* 🌑 Cinematic House M.D. inspired UI
* ⚡ Powered by Google Gemini
* 📱 Responsive design
* 🎭 Sarcasm, wit, medical references, and House-style humor

---

## 🖼️ Preview

HouseAI places users inside a virtual version of House's office, creating an immersive conversational experience rather than a standard chatbot interface.

Typical interactions include:

> User: "Why are you so rude?"

> HouseAI: "Because sugarcoating reality is for birthday cakes, not diagnostics."

---

## 🛠️ Tech Stack

### Frontend

* React
* TypeScript
* Vite
* Tailwind CSS

### Backend

* Node.js
* Express.js

### AI

* Google Gemini 2.5 Flash

### Deployment

* Vercel

---

## 🚀 Getting Started

### Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/Dr.-House-AI.git
cd Dr.-House-AI
```

### Install dependencies

```bash
npm install
```

### Create environment variables

Create a `.env.local` file:

```env
GEMINI_API_KEY=your_api_key_here
```

### Run locally

```bash
npm run dev
```

Open:

```txt
http://localhost:3000
```

---

## 📂 Project Structure

```txt
HouseAI/
│
├── api/
│   └── chat.js
│
├── public/
│
├── server/
│   ├── house.txt
│   └── server.js
│
├── src/
│   ├── components/
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
│
└── README.md
```

---

## 🎯 Why This Project?

Most AI chatbots focus on being helpful.

HouseAI focuses on being memorable.

The challenge was creating an AI that consistently maintains a strong character identity while still responding naturally to users. The project explores prompt engineering, personality simulation, conversational UX, and AI-powered web applications.

---

## ⚠️ Disclaimer

HouseAI is a fan-made educational project inspired by the fictional character Dr. Gregory House from *House M.D.*

This project is not affiliated with, endorsed by, or connected to NBCUniversal, FOX, or the creators of House M.D.

---

## 👨‍💻 Author

**Shivam**

Computer Science Engineering Student

Built with caffeine, stubbornness, and far too many Git errors.
