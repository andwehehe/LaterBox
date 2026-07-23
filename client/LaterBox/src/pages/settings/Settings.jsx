import { useState } from "react";
import {
  Search,
  Sun,
  Moon,
  Monitor,
  Palette,
  Bell,
  ShieldCheck,
  Eye,
  UserCircle,
  ChevronRight,
  LogOut,
} from "lucide-react";
import { MobileMenuButton, ToggleSwitch } from "../../components/components.jsx";
import { currentUser } from "../dashboard/mockData.js";

const themes = [
  { key: "light", label: "Light", icon: Sun },
  { key: "dark", label: "Dark", icon: Moon },
  { key: "system", label: "System", icon: Monitor },
];

function SectionCard({ icon: Icon, title, children }) {
  return (
    <section>
      <h2 className="mb-3 flex items-center gap-2 text-base font-semibold text-white">
        <Icon size={16} className="text-accent-light" />
        {title}
      </h2>
      <div className="divide-y divide-panel-border rounded-xl2 border border-panel-border bg-panel">
        {children}
      </div>
    </section>
  );
}

function SettingRow({ title, description, control }) {
  return (
    <div className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="text-sm font-medium text-white">{title}</p>
        {description && <p className="mt-0.5 text-xs text-muted">{description}</p>}
      </div>
      <div className="shrink-0">{control}</div>
    </div>
  );
}

function Settings() {
  const [theme, setTheme] = useState("dark");
  const [toggles, setToggles] = useState({
    compactView: false,
    emailNotifications: true,
    desktopPush: false,
    productUpdates: true,
    twoFactor: true,
    privateProfile: false,
    dataCollection: true,
  });

  const setToggle = (key) => (value) => setToggles((prev) => ({ ...prev, [key]: value }));

  return (
    <div>
      {/* Top bar */}
      <header className="flex items-center gap-3 border-b border-panel-border px-4 py-4 sm:px-6">
        <MobileMenuButton />

        <p className="hidden text-sm text-muted sm:block">
          LaterBox / <span className="font-medium text-white">Settings</span>
        </p>

        <div className="relative ml-auto hidden max-w-xs flex-1 md:block">
          <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted" size={16} />
          <input
            type="text"
            placeholder="Search settings..."
            className="w-full rounded-lg border border-panel-border bg-panel py-2 pl-10 pr-3 text-sm text-white placeholder:text-muted focus:border-accent focus:outline-none"
          />
        </div>

        <button className="ml-auto rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-white transition hover:bg-accent-light md:ml-0">
          Save Changes
        </button>
      </header>

      <main className="mx-auto max-w-3xl space-y-8 p-4 sm:p-6">
        <div>
          <h1 className="text-2xl font-bold text-white sm:text-3xl">Settings</h1>
          <p className="mt-1 text-sm text-muted">
            Manage your account preferences, appearance, and security settings.
          </p>
        </div>

        {/* Appearance */}
        <SectionCard icon={Palette} title="Appearance">
          <div className="p-5">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-muted">Interface Theme</p>
            <div className="grid grid-cols-3 gap-3">
              {themes.map(({ key, label, icon: Icon }) => (
                <button
                  key={key}
                  onClick={() => setTheme(key)}
                  className={`flex flex-col items-center gap-2 rounded-lg border py-4 text-sm font-medium transition ${
                    theme === key
                      ? "border-accent text-white"
                      : "border-panel-border text-muted hover:text-white"
                  }`}
                >
                  <Icon size={20} />
                  {label}
                </button>
              ))}
            </div>
          </div>
          <SettingRow
            title="Compact View"
            description="Reduces whitespace and padding for link cards to show more content at once."
            control={<ToggleSwitch checked={toggles.compactView} onChange={setToggle("compactView")} label="Compact View" />}
          />
        </SectionCard>

        {/* Notifications */}
        <SectionCard icon={Bell} title="Notifications">
          <SettingRow
            title="Email Notifications"
            description="Receive weekly summaries and important account updates via email."
            control={
              <ToggleSwitch
                checked={toggles.emailNotifications}
                onChange={setToggle("emailNotifications")}
                label="Email Notifications"
              />
            }
          />
          <SettingRow
            title="Desktop Push"
            description="Allow browser push notifications for quick alerts on shared collections."
            control={<ToggleSwitch checked={toggles.desktopPush} onChange={setToggle("desktopPush")} label="Desktop Push" />}
          />
          <SettingRow
            title="Product Updates"
            description="Stay informed about new features and improvements to LaterBox."
            control={
              <ToggleSwitch checked={toggles.productUpdates} onChange={setToggle("productUpdates")} label="Product Updates" />
            }
          />
        </SectionCard>

        {/* Security */}
        <SectionCard icon={ShieldCheck} title="Security">
          <SettingRow
            title="Two-Factor Authentication"
            description="Add an extra layer of security to your account with a secondary verification step."
            control={
              <ToggleSwitch checked={toggles.twoFactor} onChange={setToggle("twoFactor")} label="Two-Factor Authentication" />
            }
          />
          <SettingRow
            title="Change Password"
            description="Last changed 3 months ago. We recommend changing it every 6 months."
            control={
              <button className="rounded-lg border border-panel-border px-4 py-2 text-sm font-medium text-white hover:border-muted">
                Update Password
              </button>
            }
          />
          <SettingRow
            title="Session Management"
            description="View and manage all active devices currently logged into your account."
            control={
              <button className="flex items-center gap-1 text-sm font-medium text-accent-light hover:underline">
                Manage Sessions
                <ChevronRight size={14} />
              </button>
            }
          />
        </SectionCard>

        {/* Privacy */}
        <SectionCard icon={Eye} title="Privacy">
          <SettingRow
            title="Private Profile"
            description="Only people you follow can see your public collections and stats."
            control={
              <ToggleSwitch checked={toggles.privateProfile} onChange={setToggle("privateProfile")} label="Private Profile" />
            }
          />
          <SettingRow
            title="Data Collection"
            description="Allow LaterBox to collect anonymous usage data to improve the application experience."
            control={
              <ToggleSwitch checked={toggles.dataCollection} onChange={setToggle("dataCollection")} label="Data Collection" />
            }
          />
        </SectionCard>

        {/* Account */}
        <SectionCard icon={UserCircle} title="Account">
          <SettingRow
            title="Export Data"
            description="Download all your saved links and notes in a JSON or CSV format."
            control={
              <button className="rounded-lg border border-panel-border px-4 py-2 text-sm font-medium text-white hover:border-muted">
                Export All
              </button>
            }
          />
          <SettingRow
            title="Delete Account"
            description="Permanently delete your account and all associated data. This action is irreversible."
            control={
              <button className="text-sm font-semibold text-red-400 hover:text-red-300">
                Delete Permanently
              </button>
            }
          />
        </SectionCard>

        {/* Log out */}
        <div className="pt-2 text-center">
          <button className="mx-auto flex items-center justify-center gap-2 rounded-lg bg-red-500/90 px-6 py-3 text-sm font-semibold text-white transition hover:bg-red-500">
            <LogOut size={16} />
            Log Out of LaterBox
          </button>
          <p className="mt-3 text-xs text-muted">
            Logged in as <span className="text-white">{currentUser.email}</span>
          </p>
        </div>
      </main>
    </div>
  );
}

export default Settings;