import React from "react";

interface ButtonProps {
    className: string;
    onClick: () => void;
    disabled: boolean;
    children: React.ReactNode;
    type: any
}
export default function Button(props: ButtonProps) {
  return (
    <button
      className={`button ${props.className}`}
      onClick={props.onClick}
      disabled={props.disabled}
      type={props.type}
    >
      {props.children}
    </button>
  );
}