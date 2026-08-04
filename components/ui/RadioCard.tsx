import React from "react";

interface RadioCardProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  description?: string;
  icon?: React.ReactNode;
}

const RadioCard = React.forwardRef<HTMLInputElement, RadioCardProps>(
  ({ label, description, icon, id, className = "", disabled, ...props }, ref) => {
    return (
      <label
        htmlFor={id}
        className={`flex cursor-pointer items-start gap-3 rounded-md border border-hairline p-4 transition-colors has-checked:border-accent-black has-checked:bg-warm-surface ${
          disabled ? "cursor-not-allowed opacity-50" : ""
        } ${className}`}
      >
        <input
          id={id}
          ref={ref}
          type="radio"
          disabled={disabled}
          className="mt-1 accent-accent-black"
          {...props}
        />
        <span className="flex flex-1 items-start justify-between gap-3">
          <span>
            <span className="block text-sm font-medium text-accent-black">{label}</span>
            {description && (
              <span className="mt-1 block text-sm text-muted-ink">{description}</span>
            )}
          </span>
          {icon && <span className="shrink-0 text-accent-black">{icon}</span>}
        </span>
      </label>
    );
  },
);
RadioCard.displayName = "RadioCard";

export default RadioCard;
