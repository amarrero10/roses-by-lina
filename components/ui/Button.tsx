// Button.jsx
import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ children, onClick, className = "", ...props }) => {
  return (
    <button
      className={`px-4 py-2 rounded-md font-semibold text-white bg-accent-black hover:bg-accent-text-purple hover:text-accent-black focus:outline-none focus:ring-2 focus:ring-accent-text-purple focus:ring-opacity-50 ${className} hover:cursor-pointer`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
