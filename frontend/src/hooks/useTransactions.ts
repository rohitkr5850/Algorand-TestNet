import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ApiFail, ApiOk, TxRecord } from "@/types/transaction";
import { listTx, sendAlgo, txStatus } from "@/services/api";

type SendPayload = { mnemonic: string; to: string; amount: number; note?: string };

export function useTransactions() {
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [txId, setTxId] = useState<string | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const [history, setHistory] = useState<TxRecord[]>([]);
  const pollRef = useRef<number | null>(null);

  const clearPoll = () => {
    if (pollRef.current) {
      window.clearInterval(pollRef.current);
      pollRef.current = null;
    }
  };

  const fetchHistory = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const res: ApiOk<TxRecord[]> | ApiFail = await listTx();
      if ("success" in res && res.success) {
        setHistory(res.data);
      } else {
        setError((res as ApiFail).message || "Failed to fetch history");
      }
    } catch (e: any) {
      setError(e?.response?.data?.message || e?.message || "Failed to fetch history");
    } finally {
      setLoading(false);
    }
  }, []);

  const pollStatus = useCallback((id: string) => {
    clearPoll();
    pollRef.current = window.setInterval(async () => {
      try {
        const res = await txStatus(id);
        if (res?.success) {
          setStatus(res.data.status);
          if (res.data.status === "CONFIRMED" || res.data.status === "FAILED") {
            clearPoll();
            fetchHistory(); // refresh list
          }
        } else {
          setError(res?.message || "Failed to get status");
        }
      } catch (e: any) {
        setError(e?.response?.data?.message || e?.message || "Failed to get status");
      }
    }, 3000);
  }, [fetchHistory]);

  const send = useCallback(async (payload: SendPayload) => {
    try {
      setSending(true);
      setError(null);
      setStatus(null);
      setTxId(null);
      const res = await sendAlgo(payload);
      if (res?.success) {
        setTxId(res.data.txId);
        setStatus("PENDING");
        pollStatus(res.data.txId);
      } else {
        setError(res?.message || "Failed to send");
      }
    } catch (e: any) {
      setError(e?.response?.data?.message || e?.message || "Failed to send");
    } finally {
      setSending(false);
    }
  }, [pollStatus]);

  useEffect(() => {
    fetchHistory();
    return () => clearPoll();
  }, [fetchHistory]);

  const isPending = useMemo(() => status === "PENDING", [status]);

  return { loading, sending, error, txId, status, isPending, history, fetchHistory, send };
}
