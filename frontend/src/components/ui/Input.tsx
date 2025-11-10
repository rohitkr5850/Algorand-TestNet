import { InputHTMLAttributes, TextareaHTMLAttributes } from "react";

export function Input(props: InputHTMLAttributes<HTMLInputElement>) {
  const { className = "", ...rest } = props;
  return (
    <input
      className={[
        "w-full rounded-lg border border-white/10 bg-white/90 px-3 py-2 text-sm",
        "focus:outline-none focus:ring-2 focus:ring-indigo-400",
        className
      ].join(" ")}
      {...rest}
    />
  );
}

export function Textarea(props: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const { className = "", ...rest } = props;
  return (
    <textarea
      className={[
        "w-full rounded-lg border border-white/10 bg-white/90 px-3 py-2 text-sm",
        "focus:outline-none focus:ring-2 focus:ring-indigo-400",
        className
      ].join(" ")}
      {...rest}
    />
  );
}
