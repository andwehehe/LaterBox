import { Monitor, Smartphone } from "lucide-react";

const platforms = [
  { name: "Chrome", icon: Monitor },
  { name: "Safari", icon: Monitor },
  { name: "iOS App", icon: Smartphone },
  { name: "macOS", icon: Monitor },
  { name: "Android", icon: Smartphone },
];

function LogosBar() {
  return (
    <section className="border-y border-panel-border py-12 sm:py-14">
      <div className="page-container text-center">
        <p className="mb-8 text-xs font-semibold tracking-widest text-muted">
          WORKS WHERE YOU DO
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-6 sm:gap-x-12">
          {platforms.map((p) => {
            const Icon = p.icon;
            return (
              <div
              key={p.name}
              className="flex items-center gap-2 text-sm font-medium text-muted"
            >
              <span aria-hidden><Icon size={16} /></span>
              {p.name}
            </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default LogosBar