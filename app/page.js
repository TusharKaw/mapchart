import Link from "next/link"
import { Globe, Palette, Download } from "lucide-react"

export default function HomePage() {
  return (
    <div className="main-bg">
      {/* Header */}
      <header className="header-bar">
        <div className="header-container">
          <nav className="header-nav">
            <div className="header-logo">
              <Globe className="logo-icon" />
              <span className="logo-text">MapChart</span>
            </div>
            <div className="header-links">
              <Link href="/world" className="nav-link">World</Link>
              <Link href="/europe" className="nav-link">Europe</Link>
              <Link href="/asia" className="nav-link">Asia</Link>
              <Link href="/americas" className="nav-link">The Americas</Link>
              <Link href="/africa" className="nav-link">Africa</Link>
              <Link href="/usa" className="nav-link">United States</Link>
              <Link href="/more" className="nav-link">More maps...</Link>
            </div>
            <div className="header-actions">
              <Link href="/account" className="nav-link">Account</Link>
              <Link href="/contact" className="nav-link">Contact</Link>
            </div>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-grid">
          <div className="hero-content">
            <div>
              <h1 className="hero-title">Create your own</h1>
              <h1 className="hero-title highlight">custom map</h1>
            </div>
            <ul className="hero-list">
              <li className="hero-list-item">
                <div className="list-dot"></div>
                <span>Make a map of the World, Europe, United States, and more</span>
              </li>
              <li className="hero-list-item">
                <div className="list-dot"></div>
                <span>Color code countries or states on the map</span>
              </li>
              <li className="hero-list-item">
                <div className="list-dot"></div>
                <span>Add a legend and download as an image file</span>
              </li>
              <li className="hero-list-item">
                <div className="list-dot"></div>
                <span>Use the map in your project or share it with your friends</span>
              </li>
              <li className="hero-list-item">
                <div className="list-dot"></div>
                <span>Free and easy to use</span>
              </li>
              <li className="hero-list-item">
                <div className="list-dot"></div>
                <span>Plus version for advanced features</span>
              </li>
            </ul>
            <div className="hero-buttons">
              <Link href="/editor">
                <button className="primary-btn">Start Creating</button>
              </Link>
              <Link href="/gallery">
                <button className="secondary-btn">View Examples</button>
              </Link>
            </div>
          </div>
          <div className="hero-preview">
            <div className="preview-card">
              <div className="preview-window">
                <div className="preview-bar">
                  <div className="bar-dot red"></div>
                  <div className="bar-dot yellow"></div>
                  <div className="bar-dot green"></div>
                  <span className="preview-title">MapChart Editor</span>
                </div>
                <div className="preview-img-wrap">
                  <img
                    src="/placeholder.svg?height=400&width=600"
                    alt="Map Editor Preview"
                    className="preview-img"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="features-container">
          <div className="features-header">
            <h2 className="features-title">Color an editable map</h2>
            <div className="features-underline"></div>
          </div>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon-bg">
                <Globe className="feature-icon" />
              </div>
              <h3 className="feature-title">Multiple Map Types</h3>
              <p className="feature-desc">
                Choose from World, Europe, Asia, Americas, Africa, and more detailed regional maps.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon-bg">
                <Palette className="feature-icon" />
              </div>
              <h3 className="feature-title">Custom Colors</h3>
              <p className="feature-desc">
                Use our color picker or enter custom hex codes to create your perfect color scheme.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon-bg">
                <Download className="feature-icon" />
              </div>
              <h3 className="feature-title">Export & Share</h3>
              <p className="feature-desc">
                Download your maps as high-quality images or share them directly with others.
              </p>
            </div>
          </div>
          <div className="features-maps">
            <p className="features-maps-desc">Choose from a variety of map types, including:</p>
            <div className="features-maps-list">
              {["World Map","Europe","North America","South America","Asia","Africa","Oceania","United States"].map((mapType) => (
                <span key={mapType} className="map-type-badge">{mapType}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-container">
          <h2 className="cta-title">Ready to create your map?</h2>
          <p className="cta-desc">
            Join thousands of users who create beautiful, custom maps for presentations, education, and projects.
          </p>
          <Link href="/editor">
            <button className="primary-btn large">Get Started Now</button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer-bar">
        <div className="footer-container">
          <div className="footer-flex">
            <div className="footer-logo">
              <Globe className="footer-logo-icon" />
              <span className="footer-logo-text">MapChart</span>
            </div>
            <div className="footer-links">
              <Link href="/privacy" className="footer-link">Privacy Policy</Link>
              <Link href="/terms" className="footer-link">Terms of Service</Link>
              <Link href="/support" className="footer-link">Support</Link>
            </div>
          </div>
          <div className="footer-bottom">
            <p className="footer-copyright">© 2024 MapChart. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <style>{`
        .main-bg { min-height: 100vh; background: #1e293b; }
        .header-bar { background: #0f172a; border-bottom: 1px solid #334155; }
        .header-container { max-width: 1200px; margin: 0 auto; padding: 0 1rem; }
        .header-nav { display: flex; align-items: center; justify-content: space-between; height: 64px; }
        .header-logo { display: flex; align-items: center; gap: 0.5rem; }
        .logo-icon { width: 32px; height: 32px; color: #f97316; }
        .logo-text { color: #fff; font-size: 1.25rem; font-weight: bold; }
        .header-links { display: flex; align-items: center; gap: 1.5rem; }
        .nav-link { color: #fff; text-decoration: none; font-size: 1rem; transition: color 0.2s; }
        .nav-link:hover { color: #f97316; }
        .header-actions { display: flex; align-items: center; gap: 1rem; }
        .hero-section { max-width: 1200px; margin: 0 auto; padding: 4rem 1rem; }
        .hero-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 3rem; align-items: center; }
        @media (max-width: 1024px) { .hero-grid { grid-template-columns: 1fr; } }
        .hero-content { display: flex; flex-direction: column; gap: 2rem; }
        .hero-title { font-size: 3rem; font-weight: bold; color: #fff; margin-bottom: 0.5rem; }
        .hero-title.highlight { color: #f97316; margin-bottom: 2rem; }
        .hero-list { display: flex; flex-direction: column; gap: 1rem; color: #fff; font-size: 1.125rem; }
        .hero-list-item { display: flex; align-items: flex-start; gap: 0.75rem; }
        .list-dot { width: 8px; height: 8px; background: #f97316; border-radius: 50%; margin-top: 0.75rem; flex-shrink: 0; }
        .hero-buttons { display: flex; flex-direction: column; gap: 1rem; }
        @media (min-width: 640px) { .hero-buttons { flex-direction: row; } }
        .primary-btn { background: #f97316; color: #fff; border: none; border-radius: 4px; padding: 0.75rem 2rem; font-size: 1.125rem; font-weight: 600; cursor: pointer; transition: background 0.2s; }
        .primary-btn:hover { background: #ea580c; }
        .secondary-btn { background: transparent; color: #fff; border: 2px solid #fff; border-radius: 4px; padding: 0.75rem 2rem; font-size: 1.125rem; font-weight: 600; cursor: pointer; transition: background 0.2s, color 0.2s; }
        .secondary-btn:hover { background: #fff; color: #1e293b; }
        .hero-preview { position: relative; }
        .preview-card { background: #334155; border-radius: 12px; padding: 1rem; box-shadow: 0 8px 32px rgba(0,0,0,0.18); }
        .preview-window { background: #fff; border-radius: 12px; overflow: hidden; }
        .preview-bar { background: #1e293b; padding: 0.5rem; display: flex; align-items: center; gap: 0.5rem; }
        .bar-dot { width: 12px; height: 12px; border-radius: 50%; }
        .bar-dot.red { background: #ef4444; }
        .bar-dot.yellow { background: #facc15; }
        .bar-dot.green { background: #22c55e; }
        .preview-title { color: #fff; font-size: 0.95rem; margin-left: 1rem; }
        .preview-img-wrap { padding: 1rem; }
        .preview-img { width: 100%; height: auto; border-radius: 8px; }
        .features-section { background: #334155; padding: 4rem 0; }
        .features-container { max-width: 1200px; margin: 0 auto; padding: 0 1rem; }
        .features-header { text-align: center; margin-bottom: 3rem; }
        .features-title { font-size: 2.25rem; font-weight: bold; color: #fff; margin-bottom: 1rem; }
        .features-underline { width: 96px; height: 4px; background: #f97316; margin: 0 auto; border-radius: 2px; }
        .features-grid { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 2rem; }
        @media (max-width: 1024px) { .features-grid { grid-template-columns: 1fr 1fr; } }
        @media (max-width: 768px) { .features-grid { grid-template-columns: 1fr; } }
        .feature-card { text-align: center; }
        .feature-icon-bg { background: #475569; width: 64px; height: 64px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 1rem auto; }
        .feature-icon { width: 32px; height: 32px; color: #f97316; }
        .feature-title { font-size: 1.25rem; font-weight: 600; color: #fff; margin-bottom: 0.5rem; }
        .feature-desc { color: #cbd5e1; }
        .features-maps { text-align: center; margin-top: 3rem; }
        .features-maps-desc { color: #cbd5e1; font-size: 1.125rem; margin-bottom: 2rem; }
        .features-maps-list { display: flex; flex-wrap: wrap; justify-content: center; gap: 1rem; }
        .map-type-badge { background: #475569; color: #fff; padding: 0.5rem 1.25rem; border-radius: 999px; font-size: 0.95rem; }
        .cta-section { background: #1e293b; padding: 4rem 0; }
        .cta-container { max-width: 800px; margin: 0 auto; text-align: center; }
        .cta-title { font-size: 2.25rem; font-weight: bold; color: #fff; margin-bottom: 1rem; }
        .cta-desc { color: #cbd5e1; font-size: 1.25rem; margin-bottom: 2rem; max-width: 600px; margin-left: auto; margin-right: auto; }
        .primary-btn.large { font-size: 1.25rem; padding: 1rem 3rem; }
        .footer-bar { background: #0f172a; border-top: 1px solid #334155; padding: 2rem 0; }
        .footer-container { max-width: 1200px; margin: 0 auto; padding: 0 1rem; }
        .footer-flex { display: flex; flex-direction: column; gap: 2rem; align-items: center; justify-content: space-between; }
        @media (min-width: 768px) { .footer-flex { flex-direction: row; } }
        .footer-logo { display: flex; align-items: center; gap: 0.5rem; margin-bottom: 1rem; }
        .footer-logo-icon { width: 24px; height: 24px; color: #f97316; }
        .footer-logo-text { color: #fff; font-weight: bold; font-size: 1.1rem; }
        .footer-links { display: flex; gap: 2rem; }
        .footer-link { color: #cbd5e1; text-decoration: none; font-size: 1rem; transition: color 0.2s; }
        .footer-link:hover { color: #fff; }
        .footer-bottom { margin-top: 2rem; padding-top: 2rem; border-top: 1px solid #334155; text-align: center; }
        .footer-copyright { color: #cbd5e1; }
      `}</style>
    </div>
  )
}
