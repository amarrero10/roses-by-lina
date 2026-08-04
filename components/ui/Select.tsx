import React from "react";

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, id, className = "", children, ...props }, ref) => {
    return (
      <div className="mb-5">
        {label && (
          <label htmlFor={id} className="mb-2 block text-sm font-medium text-current">
            {label}
          </label>
        )}
        <select
          id={id}
          ref={ref}
          className={`w-full rounded-md border border-hairline bg-primary-white py-3 px-5 text-base text-accent-black outline-none transition-colors focus:border-accent-black ${className}`}
          {...props}
        >
          {children}
        </select>
        {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
      </div>
    );
  },
);
Select.displayName = "Select";

export default Select;
