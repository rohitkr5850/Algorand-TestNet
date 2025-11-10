import { ButtonHTMLAttributes } from "react";

export default function Button(props: ButtonHTMLAttributes<HTMLButtonElement>) {
  const { className = "", ...rest } = props;
  return (
    <button
      className={[
        "inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-medium",
        "bg-indigo-500 hover:bg-indigo-600 active:bg-indigo-700 text-white",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        className
      ].join(" ")}
      {...rest}
    />
  );
}
