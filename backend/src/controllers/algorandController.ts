import { Request, Response, NextFunction } from "express";
import algosdk from "algosdk";
import { getAlgodClient } from "../config/algodClient";
import { Transaction } from "../models/transactionModel";
import { ok } from "../utils/formatResponse";
import { ApiError } from "../middleware/errorHandler";

// Helper: ALGO
const toMicroAlgos = (algos: number) => Math.round(algos * 1_000_000);

export const sendTransaction = async (req: Request, res: Response, next: NextFunction) => {
  const { mnemonic, to, amount, note } = req.body as {
    mnemonic: string;
    to: string;
    amount: number;
    note?: string;
  };

  try {
    const client = getAlgodClient();

    // Recover sender account
    const account = algosdk.mnemonicToSecretKey(mnemonic); // throws if invalid
    const from = account.addr;

    const params = await client.getTransactionParams().do();

    // Build payment transaction
    const txn = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
      from,
      to,
      amount: toMicroAlgos(amount),
      note: note ? new Uint8Array(Buffer.from(note)) : undefined,
      suggestedParams: params,
    });

    // Sign
    const signed = txn.signTxn(account.sk);

    // Send
    const { txId } = await client.sendRawTransaction(signed).do();

    // Save as PENDING in DB
    await Transaction.create({
      txId,
      from,
      to,
      amount, 
      status: "PENDING",
      note,
    });

    return res.status(200).json(ok({ txId, from, to, amount }, "Transaction submitted"));
  } catch (err: any) {
    // Save failure if we got a txid
    return next(new ApiError(err?.message || "Failed to send transaction", 400));
  }
};

export const getStatus = async (req: Request, res: Response, next: NextFunction) => {
  const { txId } = req.params as { txId: string };

  try {
    const client = getAlgodClient();
    const info = await client.pendingTransactionInformation(txId).do();

    const confirmedRound = info["confirmed-round"] || info["confirmedRound"];
    let status: "PENDING" | "CONFIRMED" | "FAILED" = "PENDING";

    if (confirmedRound && confirmedRound > 0) status = "CONFIRMED";

    // Try updating DB if present
    await Transaction.findOneAndUpdate(
      { txId },
      {
        $set: {
          status,
          confirmedRound: confirmedRound || undefined,
        },
      },
      { new: true }
    );

    return res.status(200).json(
      ok({
        txId,
        status,
        confirmedRound: confirmedRound || null,
        poolError: info["pool-error"] || null,
      })
    );
  } catch (err: any) {
    return next(new ApiError(err?.message || "Failed to fetch status", 400));
  }
};

export const listTransactions = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const txs = await Transaction.find().sort({ createdAt: -1 }).lean();
    return res.status(200).json(ok(txs));
  } catch (err: any) {
    return next(new ApiError("Failed to list transactions", 500));
  }
};
