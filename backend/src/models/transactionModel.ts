import { Schema, model, Document } from "mongoose";

export interface ITransaction extends Document {
  txId: string;
  from: string;
  to: string;
  amount: number; // microAlgos or Algos? -> I have stored in ALGOs for readability
  status: "PENDING" | "CONFIRMED" | "FAILED";
  note?: string;
  confirmedRound?: number;
  createdAt: Date;
}

const TransactionSchema = new Schema<ITransaction>(
  {
    txId: { type: String, required: true, index: true, unique: true },
    from: { type: String, required: true, index: true },
    to: { type: String, required: true, index: true },
    amount: { type: Number, required: true }, 
    status: { type: String, enum: ["PENDING", "CONFIRMED", "FAILED"], default: "PENDING" },
    note: { type: String },
    confirmedRound: { type: Number },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

export const Transaction = model<ITransaction>("Transaction", TransactionSchema);
