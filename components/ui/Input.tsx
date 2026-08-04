import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, id, className = "", ...props }, ref) => {
    return (
      <div className="mb-5">
        {label && (
          <label htmlFor={id} className="mb-2 block text-sm font-medium text-current">
            {label}
          </label>
        )}
        <input
          id={id}
          ref={ref}
          className={`w-full rounded-md border border-hairline bg-primary-white py-3 px-5 text-base text-accent-black outline-none transition-colors focus:border-accent-black ${className}`}
          {...props}
        />
        {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
      </div>
    );
  },
);
Input.displayName = "Input";

export default Input;
