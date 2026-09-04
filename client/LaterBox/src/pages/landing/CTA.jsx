import { Link } from "react-router-dom";

function CTA() {
  return (
    <section className="page-container pb-16 sm:pb-20 lg:pb-24" id="changelog">
      <div className="mx-auto max-w-5xl rounded-2xl bg-gradient-to-br from-accent to-[#241f6b] px-6 py-12 text-center sm:px-8 sm:py-16">
        <h2 className="text-2xl font-extrabold sm:text-3xl md:text-4xl">
          Start organizing your research and docs
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-sm text-white/80 sm:text-base">
          Save links, attach notes, and archive reference pages — deploy self-hosted or use our cloud. Integrates with browser extensions and mobile sharesheets.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
          <Link
            to="/signup"
            className="w-full rounded-lg bg-white px-6 py-3 text-sm font-semibold text-dark transition hover:bg-white/90 sm:w-auto"
          >
            Get Started for Free
          </Link>
          <a
            href="#sales"
            className="w-full rounded-lg border border-white/30 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10 sm:w-auto"
          >
            Talk to Sales
          </a>
        </div>

        <p className="mt-6 text-xs text-white/60">
          No credit card required. Cancel anytime.
        </p>
      </div>
    </section>
  );
}

export default CTA