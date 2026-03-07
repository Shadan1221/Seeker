# Seeker

**Career guidance for Indian students — built around paths, not lists.**

Seeker is a full-stack web application that helps Indian students after Class 10 explore careers, choose streams, and plan their education — without the bias, stereotypes, or vague advice that plague every existing tool.

> _"See your options as paths, not a list."_

---

## Features

### 1. The Path Map

Every other career tool gives you a ranked list or a PDF report. Seeker gives you a **living, interactive map of branching roads**. You see every career as a destination you can walk toward — not a sorted spreadsheet. The visual makes exploration feel like a decision, not homework.

> _"See your options as paths, not a list."_

---

### 2. A Quiz With Zero Leading Questions

Every existing Indian career quiz eventually asks _"Do you like Maths or Biology?"_ — and then tells you something you already suspected. Seeker's questions **never mention a subject, stream, or career by name** until the very end. They ask about your Saturdays, your relationship to risk, what satisfaction actually feels like to you. The scoring is invisible and bias-free.

> _"Zero leading questions."_

---

### 3. The Myth-Busting Stream Guide

For every stream — Science PCM, PCB, Commerce, Arts, Vocational — Seeker shows the **exact stereotype Indian families believe, and then the data that disproves it**. Not as a disclaimer. As a feature. It is the first thing students see when they say _"I need to choose my stream."_

> _"Arts has no scope. Commerce is for failures. We looked up the data."_

---

### 4. Full Education Roadmaps, Not Just Job Titles

Other tools say _"consider Psychology."_ Seeker tells you the **entrance exams, the degree duration, what licensing is required, what the salary looks like at each stage**, and how in-demand that career actually is in India right now. The difference between a vague suggestion and knowing exactly what choice to make after Class 10.

> _"Not 'consider law.' Here's exactly what to do after Class 10."_

---

### 5. Ask Seeker — An AI Counsellor Built for India

Not a generic chatbot. Ask Seeker is specifically calibrated for **Indian English, the pressure of Indian family expectations**, and the distinctions that actually matter here — the difference between government and private sector paths, regional salary realities, and which entrance exams lead where. It will not tell a student pursuing dance that they should _"reconsider for stability."_

> _"An AI counsellor built for the Indian student, not the global average."_

---

### 6. The Animated Path Background

The branching path lines run on **every screen**. They are not decoration — they are the metaphor made visible. Every screen is a step along a path, and the roads in the background remind you that other routes still exist.

> _"Every screen. Every choice. The paths are always there."_

---

### 7. No Stream Shaming

Every career cluster is colour-coded and positioned equally on the path map. A civil servant and a chef and a software engineer **start from the same node**. No career is hidden, minimised, or presented as a fallback. The UI makes equality structural — not a policy statement.

> _"Every career. Same starting point. No hierarchy."_

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React 18, Vite, Tailwind CSS, Framer Motion, Zustand, React Query |
| Backend | Node.js, Express, OpenAI (via OpenRouter) |
| Validation | Zod |
| Security | Helmet, CORS, express-rate-limit |

---

## Getting Started

### Prerequisites

- **Node.js** ≥ 18
- **npm** ≥ 9

### Installation

```bash
# Clone the repository
git clone https://github.com/Shadan1221/Seeker.git
cd Seeker

# Install all dependencies (root, client, and server)
npm run install:all
```

### Environment Variables

Create a `.env` file in the project root with the required API keys (see `.env.example` if available).

### Running Locally

```bash
# Start both client and server in development mode
npm run dev
```

The client runs on `http://localhost:5173` and the server on `http://localhost:3000` by default.

### Production Build

```bash
# Build the client
npm run build

# Start the server (serves the built client)
npm start
```

---

## Project Structure

```
Seeker/
├── client/               # React + Vite frontend
│   └── src/
│       ├── api/          # API client & endpoint modules
│       ├── components/   # UI, layout, and career components
│       ├── data/         # Static career & quiz data
│       ├── hooks/        # Custom React hooks
│       ├── screens/      # Page-level screen components
│       ├── store/        # Zustand global state
│       └── utils/        # Helpers (scoring, classnames)
├── server/               # Express backend
│   └── src/
│       ├── config/       # Environment config
│       ├── controllers/  # Route handlers
│       ├── data/         # Career, college, quiz & stream data
│       ├── middleware/    # Error handling, logging, validation
│       ├── routes/       # Express route definitions
│       └── services/     # AI integration & scoring logic
└── package.json          # Workspace root (npm workspaces)
```

---

## License

This project is proprietary. All rights reserved.
