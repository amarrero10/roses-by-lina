import React from "react";

type ButtonVariant = "primary" | "outline" | "ghost";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: ButtonVariant;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-accent-black text-primary-white hover:bg-accent-text-purple hover:text-accent-black",
  outline:
    "bg-transparent border border-current text-accent-black hover:bg-accent-black hover:text-primary-white",
  ghost: "bg-transparent text-accent-black hover:bg-warm-surface",
};

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  className = "",
  variant = "primary",
  ...props
}) => {
  return (
    <button
      className={`px-4 py-2 rounded-md font-semibold transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-accent-text-purple focus:ring-opacity-50 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${variantStyles[variant]} ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
