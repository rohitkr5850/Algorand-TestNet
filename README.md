Algorand MERN – TestNet Transaction System

A complete MERN + Algorand TestNet project using:

Backend: Node.js, Express, TypeScript, MongoDB, algosdk

Frontend: Vite + React + TypeScript + TailwindCSS 

Blockchain: Algorand TestNet (AlgoNode / Nodely)

Database: MongoDB (Local or Atlas)

Real functionality:
 Create and sign TestNet transactions
 Broadcast to Algorand blockchain
 Poll for confirmation
 Store transaction history
 Display dashboard & history table

🧠 Project Overview

This project implements a complete blockchain workflow:

User enters mnemonic + amount + recipient address

Backend uses algosdk to sign + send Tx

Stores record in MongoDB

Polls Algorand network for confirmation

Frontend displays live status + full transaction history

📁 Project Structure
algorand-mern/
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   ├── db.ts
│   │   │   └── algodClient.ts
│   │   ├── controllers/
│   │   │   └── algorandController.ts
│   │   ├── models/
│   │   │   └── transactionModel.ts
│   │   ├── routes/
│   │   │   └── algorandRoutes.ts
│   │   ├── validators/
│   │   │   └── transactionValidator.ts
│   │   ├── middleware/
│   │   │   ├── errorHandler.ts
│   │   │   └── validateRequest.ts
│   │   ├── utils/
│   │   │   ├── logger.ts
│   │   │   └── formatResponse.ts
│   │   ├── app.ts
│   │   └── server.ts
│   ├── package.json
│   ├── tsconfig.json
│   └── .env.example
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ui/
│   │   │   │   ├── Button.tsx
│   │   │   │   ├── Input.tsx
│   │   │   │   ├── Card.tsx
│   │   │   │   └── Spinner.tsx
│   │   │   ├── TransactionForm.tsx
│   │   │   └── TransactionTable.tsx
│   │   ├── pages/
│   │   │   ├── Home.tsx
│   │   │   └── History.tsx
│   │   ├── hooks/
│   │   │   └── useTransactions.ts
│   │   ├── services/
│   │   │   └── api.ts
│   │   ├── styles/
│   │   │   └── globals.css
│   │   ├── types/
│   │   │   └── transaction.d.ts
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── vite-env.d.ts
│   ├── vite.config.ts
│   ├── package.json
│   ├── tsconfig.json
│   ├── tailwind.config.js
│   └── .env.example
│
├── docker-compose.yml  (optional)
├── README.md
└── .gitignore

⚙️ Backend Setup (Node.js + TypeScript)
1️⃣ Install dependencies
cd backend
npm install

2️⃣ Create .env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/algorand_demo

# Algorand Node
ALGOD_SERVER=https://testnet-api.algonode.cloud
ALGOD_PORT=
ALGOD_TOKEN=


Use AlgoNode or Nodely — both work.

3️⃣ Start the server
npm run dev


The backend runs at:

http://localhost:5000

🛢 Database (MongoDB)

You may use:

Local MongoDB

MongoDB Atlas (cloud)

Start local DB:

sudo systemctl start mongod

🔗 Algorand Integration
Libraries used:

algosdk

TestNet endpoints (free, no token required)

Validates:

Mnemonic

Address

Tx fields

Workflow:

Build unsigned transaction

Sign with mnemonic

Send to network

Save txId to MongoDB

Poll for confirmation

Update DB when confirmed

📡 API Endpoints (Backend)
✅ POST /api/algorand/send

Send TestNet ALGO.

Request:

{
  "mnemonic": "25 word phrase...",
  "to": "RECIPIENT_ADDRESS",
  "amount": 0.1,
  "note": "hello algo"
}


Response:

{
  "success": true,
  "data": {
    "txId": "XYZ..."
  }
}

✅ GET /api/algorand/status/:txId

Returns:

PENDING | CONFIRMED | FAILED

✅ GET /api/algorand/transactions

Returns full MongoDB history.

🎨 Frontend Setup (Vite + React + TS)
1️⃣ Install
cd frontend
npm install

2️⃣ Create frontend .env
VITE_BACKEND_URL=http://localhost:5000/api

3️⃣ Start frontend
npm run dev


Frontend opens at:

http://localhost:5173