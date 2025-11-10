import { FormEvent, useState } from "react";
import Button from "./ui/Button";
import { Input, Textarea } from "./ui/Input";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/Card";
import Spinner from "./ui/Spinner";
import { useTransactions } from "@/hooks/useTransactions";

export default function TransactionForm() {
  const { sending, error, txId, status, isPending, send } = useTransactions();
  const [mnemonic, setMnemonic] = useState("");
  const [to, setTo] = useState("");
  const [amount, setAmount] = useState<number>(0.1);
  const [note, setNote] = useState("");

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await send({ mnemonic, to, amount: Number(amount), note: note || undefined });
  };

  return (
    <Card>
      <CardHeader>
        <h2 className="text-lg font-semibold">Send ALGO (TestNet)</h2>
        <p className="text-sm text-white/60">Enter a valid 25-word mnemonic, recipient address and amount (ALGO).</p>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm text-white/80">Sender Mnemonic (25 words)</label>
            <Textarea
              required
              rows={3}
              placeholder="twenty five words ..."
              value={mnemonic}
              onChange={(e) => setMnemonic(e.target.value)}
            />
            <p className="mt-1 text-xs text-white/60">Use TestNet only. Never paste a real/mainnet mnemonic.</p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm text-white/80">Recipient Address</label>
              <Input
                required
                placeholder="TW3A3ZK4HP..."
                value={to}
                onChange={(e) => setTo(e.target.value.trim())}
              />
            </div>

            <div>
              <label className="mb-1 block text-sm text-white/80">Amount (ALGO)</label>
              <Input
                required
                type="number"
                min={0.000001}
                step="0.000001"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
              />
            </div>
          </div>

          <div>
            <label className="mb-1 block text-sm text-white/80">Note (optional)</label>
            <Input
              placeholder="hello algo"
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
          </div>

          {error && (
            <div className="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-200">
              {error}
            </div>
          )}

          <div className="flex items-center gap-3">
            <Button disabled={sending} type="submit">
              {sending ? <><Spinner /> <span className="ml-2">Submitting…</span></> : "Send Transaction"}
            </Button>
            {txId && (
              <span className="text-sm text-white/80">
                txId: <code className="text-white">{txId}</code> — status:{" "}
                <span className={`font-semibold ${isPending ? "text-yellow-300" : status === "CONFIRMED" ? "text-green-300" : "text-red-300"}`}>
                  {status}
                </span>
              </span>
            )}
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <p className="text-xs text-white/60">
          Backend: <code>{import.meta.env.VITE_BACKEND_URL || "http://localhost:5000/api"}</code>
        </p>
      </CardFooter>
    </Card>
  );
}
