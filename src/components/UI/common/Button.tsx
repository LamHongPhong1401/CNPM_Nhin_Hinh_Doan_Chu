import React from "react";

interface ButtonProps {
    className: string;
    onClick: () => void;
    disabled: boolean;
    children: React.ReactNode;
}
export default function Button(props: ButtonProps) {
  return (
    <button
      className={`button ${props.className}`}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
}