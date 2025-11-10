import { PropsWithChildren } from "react";

export function Card({ children }: PropsWithChildren) {
  return (
    <div className="rounded-2xl border border-white/10 bg-[var(--card)] shadow-xl">
      {children}
    </div>
  );
}
export function CardHeader({ children }: PropsWithChildren) {
  return <div className="px-5 py-4 border-b border-white/10">{children}</div>;
}
export function CardContent({ children }: PropsWithChildren) {
  return <div className="px-5 py-5">{children}</div>;
}
export function CardFooter({ children }: PropsWithChildren) {
  return <div className="px-5 py-4 border-t border-white/10">{children}</div>;
}
