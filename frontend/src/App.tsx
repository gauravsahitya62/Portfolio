import { useEffect, useState } from 'react'
import './App.css'

type Project = {
  id: string
  title: string
  description?: string
  githubUrl?: string
  liveUrl?: string
  tags?: string[]
}

type SocialLink = {
  id: string
  label: string
  url: string
  icon?: string
}

type About = {
  id: string
  headline: string
  summary: string
  location: string
  avatarUrl?: string
}

const API_BASE = 'http://localhost:8080/api'

function App() {
  const [about, setAbout] = useState<About | null>(null)
  const [projects, setProjects] = useState<Project[]>([])
  const [links, setLinks] = useState<SocialLink[]>([])
  const [isEditingAbout, setIsEditingAbout] = useState(false)
  const [aboutDraft, setAboutDraft] = useState<About | null>(null)
  const [activeTab, setActiveTab] = useState<'home' | 'about' | 'experience' | 'login' | 'admin'>(
    'home',
  )
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [authToken, setAuthToken] = useState<string | null>(() => {
    return window.localStorage.getItem('portfolio_admin_token')
  })
  const [loginUsername, setLoginUsername] = useState('admin')
  const [loginPassword, setLoginPassword] = useState('')
  const [loginError, setLoginError] = useState<string | null>(null)

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true)
        const [aboutRes, projRes, linkRes] = await Promise.all([
          fetch(`${API_BASE}/about`),
          fetch(`${API_BASE}/projects`),
          fetch(`${API_BASE}/links`),
        ])
        if (!aboutRes.ok || !projRes.ok || !linkRes.ok) {
          throw new Error('Failed to load portfolio data')
        }
        const aboutData = await aboutRes.json()
        const projData = await projRes.json()
        const linkData = await linkRes.json()
        setAbout(aboutData)
        setProjects(projData)
        setLinks(linkData)
      } catch (e: any) {
        console.error(e)
        setError(e.message ?? 'Error loading data')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  const startEditAbout = () => {
    if (!about || !authToken) return
    setIsEditingAbout(true)
    setAboutDraft({ ...about })
  }

  const saveAbout = async () => {
    if (!aboutDraft || !authToken) {
      setError('You must be logged in to edit content.')
      return
    }
    try {
      setError(null)
      const res = await fetch(`${API_BASE}/about`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'X-ADMIN-TOKEN': authToken,
        },
        body: JSON.stringify(aboutDraft),
      })
      if (!res.ok) throw new Error('Failed to save About section')
      const saved = await res.json()
      setAbout(saved)
      setIsEditingAbout(false)
    } catch (e: any) {
      console.error(e)
      setError(e.message ?? 'Error saving About')
    }
  }

  const isLoading = loading && !about

  const renderTag = (tag: string) => (
    <span key={tag} className="tag-pill">
      {tag}
    </span>
  )

  return (
    <div className="app-root">
      <div className="shell">
        <header className="navbar">
          <div className="nav-left">
            <span className="nav-logo">GS</span>
            <div className="nav-title">
              <span className="nav-name">Gaurav Sahitya</span>
              <span className="nav-role">Software Developer</span>
            </div>
          </div>
          <nav className="nav-links">
            <button
              className={`nav-link ${activeTab === 'home' ? 'active' : ''}`}
              onClick={() => setActiveTab('home')}
            >
              Home
            </button>
            <button
              className={`nav-link ${activeTab === 'about' ? 'active' : ''}`}
              onClick={() => setActiveTab('about')}
            >
              About
            </button>
            <button
              className={`nav-link ${activeTab === 'experience' ? 'active' : ''}`}
              onClick={() => setActiveTab('experience')}
            >
              Experience
            </button>
            <a
              className="nav-link"
              href="https://linkedin.com/in/gaurav-sahitya/"
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn
            </a>
            {authToken ? (
              <>
                <button
                  className={`nav-link ${activeTab === 'admin' ? 'active' : ''}`}
                  onClick={() => setActiveTab('admin')}
                >
                  Admin
                </button>
                <button
                  className="nav-link"
                  onClick={() => {
                    setAuthToken(null)
                    window.localStorage.removeItem('portfolio_admin_token')
                    setActiveTab('home')
                  }}
                >
                  Logout
                </button>
              </>
            ) : (
              <button
                className={`nav-link ${activeTab === 'login' ? 'active' : ''}`}
                onClick={() => setActiveTab('login')}
              >
                Login
              </button>
            )}
          </nav>
        </header>

        {isLoading ? (
          <main className="content">
            <div className="loading-card glass">
              <div className="spinner" />
              <p>Loading your portfolio…</p>
            </div>
          </main>
        ) : (
          <main className="content">
            {error && <div className="error-banner">{error}</div>}

            {activeTab === 'login' && (
              <section className="section">
                <div className="section-header">
                  <h2>Admin Login</h2>
                  <p className="muted">
                    Sign in to manage your About content, projects, and social links.
                  </p>
                </div>
                <div className="card glass admin-card">
                  <form
                    className="form"
                    onSubmit={async (e) => {
                      e.preventDefault()
                      setLoginError(null)
                      try {
                        const res = await fetch(`${API_BASE}/auth/login`, {
                          method: 'POST',
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify({
                            username: loginUsername,
                            password: loginPassword,
                          }),
                        })
                        if (!res.ok) {
                          throw new Error('Invalid username or password')
                        }
                        const data: { token: string } = await res.json()
                        setAuthToken(data.token)
                        window.localStorage.setItem('portfolio_admin_token', data.token)
                        setLoginPassword('')
                        setActiveTab('admin')
                      } catch (err: any) {
                        console.error(err)
                        setLoginError(err.message ?? 'Login failed')
                      }
                    }}
                  >
                    <label className="field">
                      <span>Username</span>
                      <input
                        value={loginUsername}
                        onChange={(e) => setLoginUsername(e.target.value)}
                        autoComplete="username"
                      />
                    </label>
                    <label className="field">
                      <span>Password</span>
                      <input
                        type="password"
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                        autoComplete="current-password"
                      />
                    </label>
                    {loginError && <div className="error-banner">{loginError}</div>}
                    <div className="form-actions">
                      <button type="submit" className="btn primary">
                        Sign in
                      </button>
                    </div>
                  </form>
                  <p className="muted" style={{ marginTop: 10, fontSize: 12 }}>
                    Default credentials are <span className="code">admin / admin123</span>. You can
                    change them in the Spring Boot `application.yml`.
                  </p>
                </div>
              </section>
            )}

            {activeTab === 'home' && (
              <>
                {/* Hero / About */}
                {about && (
                  <section className="section hero">
                    <div className="hero-main">
                      <div className="hero-card glass">
                        <div className="hero-top">
                          <div className="hero-photo">
                            {about.avatarUrl ? (
                              <img src={about.avatarUrl} alt={about.headline} />
                            ) : (
                              <span className="hero-initials">GS</span>
                            )}
                          </div>
                          <div className="hero-text">
                            <p className="badge">Creative Web Developer</p>
                            <h1>Turning complex ideas into clean, usable products.</h1>
                            <p className="hero-role">Software Developer · Java · Spring Boot · React</p>
                          </div>
                        </div>
                        <p className="hero-summary">{about.summary}</p>
                        <div className="hero-strip">
                          <div className="hero-strip-left">
                            <span className="hero-strip-title">Based in</span>
                            <span className="hero-strip-value">{about.location}</span>
                          </div>
                          <div className="hero-strip-center">
                            <span className="hero-strip-title">Experience</span>
                            <span className="hero-strip-value">3+ years</span>
                          </div>
                          <div className="hero-strip-actions">
                            <a href="#projects" className="btn primary">
                              View Portfolio
                            </a>
                            <a href="#contact" className="btn ghost">
                              Hire Me
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="hero-side">
                      <div className="gradient-card">
                        <p className="metric-label">Tech Stack</p>
                        <p className="metric-value">Java · Spring Boot · React · REST APIs</p>
                      </div>
                      <div className="links-list">
                        {links.map((l) => (
                          <a
                            key={l.id}
                            href={l.url}
                            target="_blank"
                            rel="noreferrer"
                            className="link-pill"
                          >
                            <span className="link-icon">{l.icon?.[0]?.toUpperCase()}</span>
                            <span>{l.label}</span>
                          </a>
                        ))}
                      </div>
                    </div>
                  </section>
                )}

                {/* Contact */}
                <section id="contact" className="section">
                  <div className="section-header">
                    <h2>Contact</h2>
                    <p className="muted">
                      I’m open to full-time roles and interesting freelance projects.
                    </p>
                  </div>
                  <div className="card glass contact-card">
                    <p>
                      Phone: <span className="code">+91 63771 89746</span>
                    </p>
                    <p>
                      Email: <span className="code">gauravsahitya62@gmail.com</span>
                    </p>
                    <p>
                      LinkedIn:{' '}
                      <a
                        href="https://linkedin.com/in/gaurav-sahitya/"
                        target="_blank"
                        rel="noreferrer"
                        className="text-link"
                      >
                        /gaurav-sahitya
                      </a>
                    </p>
                  </div>
                </section>
              </>
            )}

            {activeTab === 'about' && (
              <section className="section">
                <div className="section-header">
                  <h2>About</h2>
                  <p className="muted">
                    A quick overview of who I am, what I do, and how I work.
                  </p>
                </div>
                <div className="about-layout">
                  <div className="card glass about-main">
                    <h3>Profile</h3>
                    <p>{about?.summary}</p>
                  </div>
                  <div className="card glass about-side">
                    <h3>Highlights</h3>
                    <ul className="about-list">
                      <li>Strong focus on clean, maintainable Java and Spring Boot backends.</li>
                      <li>Comfortable owning features end-to-end, from API design to React UI.</li>
                      <li>Experience integrating AI services and third-party APIs (Google Maps, AWS).</li>
                    </ul>
                  </div>
                </div>
              </section>
            )}

            {activeTab === 'experience' && (
              <section className="section">
                <div className="section-header">
                  <h2>Experience</h2>
                  <p className="muted">
                    A snapshot of my professional journey building real-world products.
                  </p>
                </div>
                <div className="timeline">
                  <article className="timeline-item glass">
                    <header className="timeline-header">
                      <div>
                        <h3>KadelLabs · Software Developer</h3>
                        <p className="muted">Bengaluru · 06/2025 – Present</p>
                      </div>
                    </header>
                    <ul>
                      <li>
                        Architected an AI-based ticketing system with brand-wise segregation and automated
                        email-to-ticket conversion.
                      </li>
                      <li>
                        Integrated OpenAI and AWS Textract to power intelligent chat support and invoice
                        classification.
                      </li>
                      <li>Improved admin workflows for reviewing and managing invoices and tickets.</li>
                    </ul>
                  </article>
                  <article className="timeline-item glass">
                    <header className="timeline-header">
                      <div>
                        <h3>AppCrave · Software Developer</h3>
                        <p className="muted">Udaipur · 07/2023 – 06/2025</p>
                      </div>
                    </header>
                    <ul>
                      <li>
                        Built and optimized high-performance Java + Spring Boot services for production systems.
                      </li>
                      <li>
                        Integrated Google Maps and MLS feeds to deliver accurate, map-driven user experiences.
                      </li>
                      <li>Acted as Tech Lead enforcing clean coding practices and design patterns.</li>
                    </ul>
                  </article>
                  <article className="timeline-item glass">
                    <header className="timeline-header">
                      <div>
                        <h3>Taldar Tech Consultancy · Software Developer</h3>
                        <p className="muted">Udaipur · 01/2023 – 06/2023</p>
                      </div>
                    </header>
                    <ul>
                      <li>Delivered a logistics package delivery system with real-time tracking.</li>
                      <li>
                        Integrated multiple third-party delivery APIs for live status updates and reporting.
                      </li>
                      <li>Built secure REST APIs ensuring data integrity and cross-device sync.</li>
                    </ul>
                  </article>
                  <div className="resume-row">
                    <a href="/Gaurav_Sahitya_Resume.pdf" download className="btn primary">
                      Download Resume (PDF)
                    </a>
                  </div>
                </div>
              </section>
            )}

            {activeTab === 'home' && projects.length > 0 && (
              <section id="projects" className="section">
                <div className="section-header">
                  <h2>Featured Projects</h2>
                  <p className="muted">
                    A selection of work that highlights my skills and experience.
                  </p>
                </div>
                <div className="grid">
                  {projects.map((p) => (
                    <article key={p.id} className="card glass project-card">
                      <h3>{p.title}</h3>
                      {p.description && <p className="muted">{p.description}</p>}
                      {p.tags && p.tags.length > 0 && (
                        <div className="tags-row">
                          {p.tags.map((t) => renderTag(t))}
                        </div>
                      )}
                      <div className="card-footer">
                        {p.githubUrl && (
                          <a
                            href={p.githubUrl}
                            className="text-link"
                            target="_blank"
                            rel="noreferrer"
                          >
                            GitHub
                          </a>
                        )}
                        {p.liveUrl && (
                          <a href={p.liveUrl} className="text-link" target="_blank" rel="noreferrer">
                            Live
                          </a>
                        )}
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            )}

            {activeTab === 'admin' && (
              <section className="section">
                <div className="section-header">
                  <h2>Edit Content</h2>
                  <p className="muted">
                    Update your About section, manage projects, and edit social links.
                  </p>
                </div>

                <div className="admin-grid">
                  {/* Edit About */}
                  <div className="card glass admin-card">
                    <div className="admin-card-header">
                      <h3>About</h3>
                      {!isEditingAbout && (
                        <button className="btn small" onClick={startEditAbout}>
                          Edit
                        </button>
                      )}
                    </div>
                    {isEditingAbout && aboutDraft && (
                      <form
                        className="form"
                        onSubmit={(e) => {
                          e.preventDefault()
                          saveAbout()
                        }}
                      >
                        <label className="field">
                          <span>Headline</span>
                          <input
                            value={aboutDraft.headline}
                            onChange={(e) =>
                              setAboutDraft({ ...aboutDraft, headline: e.target.value })
                            }
                          />
                        </label>
                        <label className="field">
                          <span>Summary</span>
                          <textarea
                            rows={4}
                            value={aboutDraft.summary}
                            onChange={(e) =>
                              setAboutDraft({ ...aboutDraft, summary: e.target.value })
                            }
                          />
                        </label>
                        <label className="field">
                          <span>Location</span>
                          <input
                            value={aboutDraft.location}
                            onChange={(e) =>
                              setAboutDraft({ ...aboutDraft, location: e.target.value })
                            }
                          />
                        </label>
                        <label className="field">
                          <span>Avatar URL (optional)</span>
                          <input
                            value={aboutDraft.avatarUrl ?? ''}
                            onChange={(e) =>
                              setAboutDraft({ ...aboutDraft, avatarUrl: e.target.value })
                            }
                          />
                        </label>
                        <div className="form-actions">
                          <button
                            type="button"
                            className="btn ghost"
                            onClick={() => setIsEditingAbout(false)}
                          >
                            Cancel
                          </button>
                          <button type="submit" className="btn primary">
                            Save
                          </button>
                        </div>
                      </form>
                    )}
                    {!isEditingAbout && about && (
                      <div className="preview">
                        <p className="muted">{about.headline}</p>
                        <p>{about.summary}</p>
                        <p className="muted">{about.location}</p>
                      </div>
                    )}
                  </div>

                  {/* Note: for brevity, project/link CRUD UIs can be added similarly */}
                  <div className="card glass admin-card">
                    <h3>Projects & Links</h3>
                    <p className="muted">
                      Basic display is implemented. You can extend this card with full create /
                      update / delete forms for projects and social links as needed.
                    </p>
                  </div>
                </div>
              </section>
            )}
          </main>
        )}
      </div>
    </div>
  )
}

export default App
