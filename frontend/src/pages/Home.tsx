import TransactionForm from "@/components/TransactionForm";
import TransactionTable from "@/components/TransactionTable";

export default function Home() {
  return (
    <div className="space-y-6">
      <TransactionForm />
      <TransactionTable />
    </div>
  );
}
