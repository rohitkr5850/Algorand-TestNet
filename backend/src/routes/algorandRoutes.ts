import { Router } from "express";
import { sendTransaction, getStatus, listTransactions } from "../controllers/algorandController";
import { validateBody, validateParams } from "../middleware/validateRequest";
import { sendTxnSchema, statusParamSchema } from "../validators/transactionValidator";

const router = Router();

// POST /api/algorand/send
router.post("/send", validateBody(sendTxnSchema), sendTransaction);

// GET /api/algorand/status/:txId
router.get("/status/:txId", validateParams(statusParamSchema), getStatus);

// GET /api/algorand/transactions
router.get("/transactions", listTransactions);

export default router;
