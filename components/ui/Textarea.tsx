import React from "react";

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, id, className = "", rows = 5, ...props }, ref) => {
    return (
      <div className="mb-5">
        {label && (
          <label htmlFor={id} className="mb-2 block text-sm font-medium text-current">
            {label}
          </label>
        )}
        <textarea
          id={id}
          ref={ref}
          rows={rows}
          className={`w-full resize-none rounded-md border border-hairline bg-primary-white py-3 px-5 text-base text-accent-black outline-none transition-colors focus:border-accent-black ${className}`}
          {...props}
        />
        {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
      </div>
    );
  },
);
Textarea.displayName = "Textarea";

export default Textarea;
