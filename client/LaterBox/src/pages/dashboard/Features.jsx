const features = [
  {
    icon: "🔍",
    title: "Universal Search",
    body: "Find any link you've ever saved in milliseconds. Our lightning-fast search indexing covers titles, notes, and tags.",
  },
  {
    icon: "▦",
    title: "Collections & Tags",
    body: "Organize your way. Use nested collections for deep projects or flexible tagging for cross-cutting interests.",
  },
  {
    icon: "☆",
    title: "Smart Favorites",
    body: "Never lose your most important resources. AI-suggested favorites help bubble up the most relevant content.",
  },
  {
    icon: "🔗",
    title: "Quick Add Anywhere",
    body: "With our browser extensions and mobile sharesheet, saving a link is never more than a single click away.",
  },
  {
    icon: "🛡️",
    title: "Privacy Focused",
    body: "Your bookmarks are yours. End-to-end encryption options ensure your digital library stays completely private.",
  },
  {
    icon: "🌐",
    title: "Full Page Archive",
    body: "We take a snapshot of every page you save. Even if the original site goes down, your content stays safe.",
  },
];

function Features() {
  return (
    <section id="features" className="page-container py-16 sm:py-20 lg:py-24">
      <div className="mx-auto mb-12 max-w-2xl text-center sm:mb-16">
        <h2 className="text-3xl font-extrabold leading-tight sm:text-4xl lg:text-5xl">
          Everything you need to master your digital library
        </h2>
        <p className="mt-5 text-muted">
          Powerful tools wrapped in a minimal interface. LaterBox is designed
          for thinkers, builders, and learners.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((f) => (
          <div
            key={f.title}
            className="rounded-xl2 border border-panel-border bg-panel p-6 transition hover:border-accent/50"
          >
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-accent/15 text-accent-light">
              {f.icon}
            </div>
            <h3 className="mb-2 text-lg font-semibold text-white">
              {f.title}
            </h3>
            <p className="text-sm leading-relaxed text-muted">{f.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Features