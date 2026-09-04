import { Search, Tag, Star, Link, Shield, FileText } from "lucide-react";

const features = [
  {
    icon: Search,
    title: "Universal Search",
    body: "Find any saved link instantly. Search across titles, notes, and tags with fast indexing.",
  },
  {
    icon: Tag,
    title: "Organize with Tags",
    body: "Flexible tagging to group, filter, and surface content across projects and topics.",
  },
  {
    icon: Star,
    title: "Favorites & Prioritization",
    body: "Mark important resources and surface them where they matter most.",
  },
  {
    icon: Link,
    title: "Quick Save Anywhere",
    body: "Browser extension and mobile share integration let you save links with one click.",
  },
  {
    icon: Shield,
    title: "Privacy Controls",
    body: "Keep your library private — controls for public sharing and access settings.",
  },
  {
    icon: FileText,
    title: "Optional Page Archive",
    body: "Snapshot pages at save time so you can reference content even if the original changes.",
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
            <div className=" flex items-center gap-4">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-accent/15 text-accent-light">
                <f.icon size={18} />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-white">
                {f.title}
              </h3>
            </div>
            <p className="text-sm leading-relaxed text-muted">{f.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Features