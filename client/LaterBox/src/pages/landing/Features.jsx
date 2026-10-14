import { Search, Tag, Star, Link, FileText, CheckCircle2 } from "lucide-react";

const features = [
  {
    icon: Search,
    title: "Search your library",
    body: "Find saved bookmarks by title, note, tag, or saved context without digging through your history.",
  },
  {
    icon: Tag,
    title: "Tag for context",
    body: "Group links by project, topic, or learning goal so the right reference is easy to find later.",
  },
  {
    icon: FileText,
    title: "Add notes to each link",
    body: "Capture why you saved a page, what stood out, or which idea to revisit after reading it.",
  },
  {
    icon: Star,
    title: "Favorite what matters",
    body: "Mark important links as favorites and keep high-priority references easy to spot in your dashboard.",
  },
  {
    icon: CheckCircle2,
    title: "Track what you have visited",
    body: "Mark links as visited or unvisited to stay on top of what you have reviewed and what still needs attention.",
  },
  {
    icon: Link,
    title: "Save the links you need",
    body: "Capture documentation, articles, tutorials, and references from the web and keep them organized in one place.",
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
            className="rounded-xl2 border border-panel-border bg-panel p-6"
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