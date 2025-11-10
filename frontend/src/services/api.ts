import axios from "axios";

const baseURL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000/api";

export const api = axios.create({
  baseURL,
  timeout: 20000
});

// Helpers
export const sendAlgo = (payload: {
  mnemonic: string;
  to: string;
  amount: number;
  note?: string;
}) => api.post("/algorand/send", payload).then(r => r.data);

export const txStatus = (txId: string) =>
  api.get(`/algorand/status/${encodeURIComponent(txId)}`).then(r => r.data);

export const listTx = () =>
  api.get("/algorand/transactions").then(r => r.data);
