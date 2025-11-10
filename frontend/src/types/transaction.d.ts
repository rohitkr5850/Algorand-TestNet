export type TxStatus = "PENDING" | "CONFIRMED" | "FAILED";

export interface TxRecord {
  _id?: string;
  txId: string;
  from: string;
  to: string;
  amount: number;  // Algos
  status: TxStatus;
  note?: string;
  confirmedRound?: number;
  createdAt: string;
}

export interface ApiOk<T> {
  success: true;
  message: string;
  data: T;
}

export interface ApiFail {
  success: false;
  message: string;
  errors?: { path: string; message: string }[];
}
