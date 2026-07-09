import { Menu } from "lucide-react";
import { useMobileMenu } from "../pages/layout/AppShell";

// Hamburger button every page header drops in on the left, hidden on
// desktop where the sidebar is always visible.
export function MobileMenuButton() {
  const openMenu = useMobileMenu();
  return (
    <button
      type="button"
      onClick={openMenu}
      aria-label="Open menu"
      className="flex h-9 w-9 items-center justify-center rounded-lg border border-panel-border text-white lg:hidden"
    >
      <Menu size={18} />
    </button>
  );
}

export function StatCard({ label, value, delta, icon: Icon }) {
  return (
    <div className="rounded-xl2 border border-panel-border bg-panel p-5">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted">{label}</p>
        {Icon && (
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/15 text-accent-light">
            <Icon size={16} />
          </span>
        )}
      </div>
      <p className="mt-2 text-2xl font-bold text-white sm:text-3xl">{value}</p>
      {delta && <p className="mt-1 text-xs text-accent-light">{delta}</p>}
    </div>
  );
}

// Simple controlled on/off switch used throughout Settings.
export function ToggleSwitch({ checked, onChange, label }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className={`relative h-6 w-11 shrink-0 rounded-full transition ${
        checked ? "bg-accent" : "bg-panel-border"
      }`}
    >
      <span
        className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition-transform ${
          checked ? "translate-x-5" : "translate-x-0.5"
        }`}
      />
    </button>
  );
}

export function TagChip({ children, onRemove }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-accent/15 px-3 py-1 text-xs font-medium text-accent-light">
      {children}
      {onRemove && (
        <button type="button" onClick={onRemove} aria-label={`Remove ${children} tag`} className="hover:text-white">
          ×
        </button>
      )}
    </span>
  );
}
