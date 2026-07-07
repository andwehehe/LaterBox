const columns = [
  {
    title: "Product",
    links: ["Dashboard", "Browser Extension", "Mobile Apps", "AI Summarizer"],
  },
  {
    title: "Company",
    links: ["About Us", "Blog", "Careers", "Privacy Policy"],
  },
];

function Footer() {
  return (
    <footer className="border-t border-panel-border pt-12 sm:pt-16">
      <div className="page-container grid grid-cols-1 gap-10 pb-12 sm:grid-cols-2 md:grid-cols-4">
        {/* Brand + blurb */}
        <div className="sm:col-span-2 md:col-span-1">
          <a href="#landing-page" className="flex items-center gap-2 font-semibold text-white">
            <span className="flex h-7 w-7 items-center justify-center rounded-md bg-accent text-sm">
              ⚡
            </span>
            LaterBox
          </a>
          <p className="mt-4 max-w-xs text-sm text-muted">
            The intelligent way to organize the web. Save everything, find
            anything, instantly.
          </p>
          <div className="mt-4 flex gap-3 text-muted">
            <span>𝕏</span>
            <span>📷</span>
            <span>💬</span>
          </div>
        </div>

        {columns.map((col) => (
          <div key={col.title}>
            <h4 className="mb-4 text-sm font-semibold text-white">
              {col.title}
            </h4>
            <ul className="space-y-3 text-sm text-muted">
              {col.links.map((link) => (
                <li key={link}>
                  <a href="#landing-page" className="transition hover:text-white">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* Newsletter */}
        <div className="sm:col-span-2 md:col-span-1">
          <h4 className="mb-4 text-sm font-semibold text-white">
            Stay Updated
          </h4>
          <p className="mb-4 text-sm text-muted">
            Join 3+ users getting our regular updates.
          </p>
          <form
            className="flex flex-col gap-2 sm:flex-row"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="email"
              placeholder="Enter email"
              className="w-full min-w-0 rounded-lg border border-panel-border bg-panel px-3 py-2 text-sm text-white placeholder:text-muted focus:border-accent focus:outline-none"
            />
            <button
              type="submit"
              className="shrink-0 rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-white transition hover:bg-accent-light"
            >
              Join
            </button>
          </form>
        </div>
      </div>

      <div className="page-container flex flex-col items-center justify-between gap-4 border-t border-panel-border py-6 text-xs text-muted md:flex-row">
        <p>© 2026 LaterBox Inc. All rights reserved.</p>
        <div className="flex gap-6">
          <a href="#top" className="hover:text-white">
            Terms of Service
          </a>
          <a href="#top" className="hover:text-white">
            Cookies
          </a>
          <a href="#top" className="hover:text-white">
            Security
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer