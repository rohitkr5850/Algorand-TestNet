import { useEffect } from "react";
import { Card, CardContent, CardHeader } from "./ui/Card";
import Spinner from "./ui/Spinner";
import { useTransactions } from "@/hooks/useTransactions";
import { TxRecord } from "@/types/transaction";

function Row({ tx }: { tx: TxRecord }) {
  return (
    <tr className="border-b border-white/10">
      <td className="px-3 py-2 font-mono text-xs">{tx.txId}</td>
      <td className="px-3 py-2 font-mono text-xs">{tx.from}</td>
      <td className="px-3 py-2 font-mono text-xs">{tx.to}</td>
      <td className="px-3 py-2">{tx.amount}</td>
      <td className="px-3 py-2">
        <span className={
          tx.status === "CONFIRMED" ? "text-green-300" :
          tx.status === "PENDING" ? "text-yellow-300" : "text-red-300"
        }>
          {tx.status}
        </span>
      </td>
      <td className="px-3 py-2">{tx.confirmedRound ?? "-"}</td>
      <td className="px-3 py-2 text-xs text-white/70">{tx.note || "-"}</td>
      <td className="px-3 py-2 text-xs">{new Date(tx.createdAt).toLocaleString()}</td>
    </tr>
  );
}

export default function TransactionTable() {
  const { history, loading, error, fetchHistory } = useTransactions();

  useEffect(() => {
    // ensure latest fetch if mounted 
    fetchHistory().catch(() => {});
  }, [fetchHistory]);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Transaction History</h2>
          <button
            onClick={() => fetchHistory()}
            className="text-sm underline decoration-white/40 underline-offset-4 hover:text-white"
          >
            Refresh
          </button>
        </div>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex items-center gap-2"><Spinner /> <span>Loading...</span></div>
        ) : error ? (
          <div className="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-200">
            {error}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="text-white/70">
                <tr className="border-b border-white/10">
                  <th className="px-3 py-2">txId</th>
                  <th className="px-3 py-2">from</th>
                  <th className="px-3 py-2">to</th>
                  <th className="px-3 py-2">amount</th>
                  <th className="px-3 py-2">status</th>
                  <th className="px-3 py-2">round</th>
                  <th className="px-3 py-2">note</th>
                  <th className="px-3 py-2">created</th>
                </tr>
              </thead>
              <tbody>
                {history.map((tx) => <Row key={tx.txId} tx={tx} />)}
                {history.length === 0 && (
                  <tr>
                    <td className="px-3 py-5 text-white/70" colSpan={8}>No transactions yet.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
