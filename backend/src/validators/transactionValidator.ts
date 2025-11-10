import { z } from "zod";
import algosdk from "algosdk";

// address validator using algosdk
const addressSchema = z
  .string()
  .min(20, "Recipient address is required")
  .refine((val) => algosdk.isValidAddress(val), "Invalid Algorand address");

export const sendTxnSchema = z.object({
  mnemonic: z.string().min(10, "Mnemonic is required"),
  to: addressSchema,
  amount: z
    .number({ invalid_type_error: "Amount must be a number" })
    .positive("Amount must be greater than zero"),
  note: z.string().max(1024, "Note too long").optional(),
});

export const statusParamSchema = z.object({
  txId: z.string().min(10, "Invalid transaction id"),
});
