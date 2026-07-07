function FormField({
  id,
  label,
  icon,
  type = "text",
  placeholder,
  value,
  onChange,
  rightSlot,
  autoComplete,
  required = true,
}) {
  return (
    <div>
      {label && (
        <label htmlFor={id} className="mb-1.5 block text-xs font-medium text-white sm:text-sm">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted">
            {icon}
          </span>
        )}
        <input
          id={id}
          name={id}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          autoComplete={autoComplete}
          required={required}
          className={`w-full rounded-lg border border-panel-border bg-dark/60 py-2.5 text-sm text-white placeholder:text-muted/70 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent ${
            icon ? "pl-10" : "pl-3"
          } ${rightSlot ? "pr-10" : "pr-3"}`}
        />
        {rightSlot && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2">{rightSlot}</span>
        )}
      </div>
    </div>
  );
}

export default FormField;