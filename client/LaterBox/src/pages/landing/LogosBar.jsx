const platforms = [
  { name: "Chrome", icon: "🌀" },
  { name: "Safari", icon: "🧭" },
  { name: "iOS App", icon: "📱" },
  { name: "macOS", icon: "🖥️" },
  { name: "Raycast", icon: "⚡" },
  { name: "Android", icon: "➡️" },
];

function LogosBar() {
  return (
    <section className="border-y border-panel-border py-12 sm:py-14">
      <div className="page-container text-center">
        <p className="mb-8 text-xs font-semibold tracking-widest text-muted">
          WORKS WHERE YOU DO
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-6 sm:gap-x-12">
          {platforms.map((p) => (
            <div
              key={p.name}
              className="flex items-center gap-2 text-sm font-medium text-muted"
            >
              <span aria-hidden>{p.icon}</span>
              {p.name}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default LogosBar