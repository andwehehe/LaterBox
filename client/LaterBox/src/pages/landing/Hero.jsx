import "./Hero.css";
import { Link } from "react-router-dom";
import image1 from '../../assets/images/random-tech-img-1.jpg';
import image2 from '../../assets/images/random-tech-img-2.jpg';
import image3 from '../../assets/images/random-tech-img-3.jpg';
import user1 from '../../assets/images/user-1.jpg';
import user2 from '../../assets/images/user-2.jpg';
import user3 from '../../assets/images/user-3.jpg';

function Hero() {
  const avatarImages = [user1, user2, user3];

  const cards = [
    {
      id: "back",
      className: "mock-card--back",
      title: "Server Components Guide",
      url: "yourblog.dev/react",
      badge: "New",
      image: image1,
      showTags: false,
    },
    {
      id: "mid",
      className: "mock-card--mid",
      title: "Server Components Guide",
      url: "yourblog.dev/react",
      badge: "New",
      image: image2,
      showTags: false,
    },
    {
      id: "front",
      className: "mock-card--front",
      title: "The Future of Developer Tools",
      url: "laterbox.app/dev",
      badge: null,
      image: image3,
      showTags: true,
      tags: ["#dev", "#future"],
    },
  ];

  return (
    <section className="page-container grid min-h-[70vh] grid-cols-1 items-center gap-12 py-20 sm:py-24 md:min-h-[78vh] md:grid-cols-[1.05fr_0.95fr] md:gap-16 md:py-20 lg:min-h-[82vh] lg:py-22 xl:gap-20">
      {/* Left: copy */}
      <div className="max-w-2xl">
        <span className="inline-flex items-center gap-2 rounded-full border border-panel-border bg-panel px-3 py-1 text-xs font-medium text-muted">
          MVP Version
        </span>

        <h1 className="mt-6 text-5xl font-extrabold leading-[0.95] tracking-tight sm:text-6xl lg:text-7xl xl:text-[5rem]">
          Save now.
          <br />
          <span className="gradient-text italic">Find later.</span>
        </h1>

        <p className="mt-6 max-w-xl text-lg leading-8 text-muted sm:text-xl">
          Lightweight bookmark manager for developers and researchers: save links, attach notes, and tag content.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
          <Link
            to="/signup"
            className="rounded-lg bg-accent px-7 py-3.5 text-center text-base font-semibold text-white transition hover:bg-accent-light"
          >
            Get Started
          </Link>
          <Link
            to="/login"
            className="rounded-lg border border-panel-border px-7 py-3.5 text-center text-base font-semibold text-white transition hover:border-muted"
          >
            Log In
          </Link>
        </div>

        <div className="mt-8 flex items-center gap-3">
          <div className="flex -space-x-2">
            {avatarImages.map((image, index) => (
              <img
                key={`${image}-${index}`}
                src={image}
                alt="users avatars" 
                className="h-8 w-8 rounded-full border-2 border-dark object-cover"
              />
            ))}
          </div>
          <p className="text-base text-muted">
            <span className="font-semibold text-white">Engineers & researchers</span> using LaterBox to track documentation and references
          </p>
        </div>
      </div>

      {/* Right: layered bookmark card mockup */}
      <div className="hero-mockup">
        {cards.map((card) => (
          <div key={card.id} className={`mock-card ${card.className}`}>
            <div className="mock-card__thumb">
              {card.badge ? <span className="mock-card__badge">{card.badge}</span> : null}
              <img src={card.image} alt="random tech image" className="mock-card__image" />
            </div>
            <div className="mock-card__body">
              <div className="mock-card__title">
                <span className="font-medium">{card.title}</span>
              </div>
              <p className="mock-card__url">{card.url}</p>
              {card.showTags ? (
                <div className="mock-card__tags">
                  {card.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              ) : null}
              <div className="mock-card__footer">
                <span className="avatar" />
                <span className="text-xs text-muted">Saved recently</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Hero