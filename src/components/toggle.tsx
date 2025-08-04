import { type FC, memo, useCallback } from "react";

export interface ToggleProps {
  /** Current toggle state */
  checked: boolean;
  /** Callback when toggle state changes */
  onChange: (checked: boolean) => void;
  /** Label text for the toggle */
  label: string;
  /** Optional description text */
  description?: string;
  /** Size variant of the toggle */
  size?: "sm" | "md" | "lg";
  /** Whether the toggle is disabled */
  disabled?: boolean;
  /** Additional CSS classes */
  className?: string;
}

const Toggle: FC<ToggleProps> = memo(({
  checked,
  onChange,
  label,
  description,
  size = "md",
  disabled = false,
  className = "",
}) => {
  const handleToggle = useCallback(() => {
    if (!disabled) {
      onChange(!checked);
    }
  }, [checked, onChange, disabled]);

  const handleKeyDown = useCallback((event: React.KeyboardEvent) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleToggle();
    }
  }, [handleToggle]);

  // Size-based styling
  const sizeClasses = {
    sm: {
      switch: "h-5 w-9",
      thumb: "h-4 w-4",
      translate: "translate-x-4",
    },
    md: {
      switch: "h-6 w-11",
      thumb: "h-5 w-5",
      translate: "translate-x-5",
    },
    lg: {
      switch: "h-7 w-14",
      thumb: "h-6 w-6",
      translate: "translate-x-7",
    },
  };

  const currentSize = sizeClasses[size];

  return (
    <div className={`flex items-center ${className}`}>
      <div className="flex flex-col">
        <label
          htmlFor={`toggle-${label}`}
          className="text-sm font-medium text-white cursor-pointer select-none"
        >
          {label}
        </label>
        {description && (
          <span className="text-xs text-gray-300 mt-1">
            {description}
          </span>
        )}
      </div>
      
      <div className="ml-3">
        <button
          id={`toggle-${label}`}
          type="button"
          role="switch"
          aria-checked={checked}
          aria-labelledby={`toggle-${label}`}
          disabled={disabled}
          onClick={handleToggle}
          onKeyDown={handleKeyDown}
          className={`
            relative inline-flex items-center rounded-full transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 focus:ring-offset-gray-800
            ${currentSize.switch}
            ${checked 
              ? "bg-yellow-500" 
              : "bg-gray-600"
            }
            ${disabled 
              ? "opacity-50 cursor-not-allowed" 
              : "cursor-pointer"
            }
          `}
        >
          <span className="sr-only">
            {checked ? "Disable" : "Enable"} {label}
          </span>
          <span
            className={`
              inline-block rounded-full bg-white shadow-lg transform transition-transform duration-200 ease-in-out
              ${currentSize.thumb}
              ${checked ? currentSize.translate : "translate-x-0.5"}
            `}
          />
        </button>
      </div>
    </div>
  );
});

Toggle.displayName = 'Toggle';

export default Toggle;