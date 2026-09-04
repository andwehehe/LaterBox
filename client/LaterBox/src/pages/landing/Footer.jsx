import { FaGithub, FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa';

function Footer() {
  const contacts = [
    { label: 'Facebook', href: 'https://www.facebook.com/andrei.gobres.5', icon: FaFacebook },
    { label: 'GitHub', href: 'https://github.com/andwehehe', icon: FaGithub },
    { label: 'Instagram', href: 'https://www.instagram.com/andwehehe/', icon: FaInstagram },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/andrei-gobres-7b5704325/', icon: FaLinkedin },
  ];

  return (
    <footer className="border-t border-panel-border">
      <div className="page-container py-8">
        <div className="max-w-3xl mx-auto text-center">
          <div className="text-sm font-semibold text-white mb-1">How to Reach Me</div>
          <p className="text-sm text-muted mb-4">External links open in a new tab.</p>

          <div className="flex items-center justify-center flex-wrap gap-4">
            {contacts.map((c) => {
              const Icon = c.icon;
              return (
                <a
                  key={c.label}
                  href={c.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={c.label}
                  className="flex items-center gap-2 px-3 py-2 rounded-md text-sm text-muted hover:text-white transition"
                >
                  <Icon size={18} />
                  <span>{c.label}</span>
                </a>
              );
            })}
          </div>
        </div>
      </div>

      <div className="w-full border-t border-panel-border">
        <div className="page-container py-4 text-xs text-muted flex items-center justify-between">
          <span>© 2026 — Personal project</span>
          <span>Built for personal use</span>
        </div>
      </div>
    </footer>
  );
}

export default Footer