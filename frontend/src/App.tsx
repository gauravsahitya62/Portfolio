import { useEffect, useRef, useState } from 'react'
import './App.css'

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
const API_ORIGIN = API_BASE.replace(/\/api\/?$/, '')

function getAboutPhotoUrl(about: About | null): string | undefined {
  const url = about?.avatarUrl
  if (!url) return undefined
  return url.startsWith('/') ? `${API_ORIGIN}${url}` : url
}

const DownloadIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
)

const SearchIcon = () => (
  <svg className="search-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.35-4.35" />
  </svg>
)

const ChevronDown = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="6 9 12 15 18 9" />
  </svg>
)

const EnvelopeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
)

const PhoneIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
)

const MapPinIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
)

const LinkedInIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" stroke="none">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
)

const GitHubIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" stroke="none">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
  </svg>
)

const highlightsSkills = [
  'ReactJS', 'Next.js', 'TypeScript', 'Node.js', 'Express.js', 'MongoDB', 'PostgreSQL', 'REST APIs', 'Tailwind CSS', 'Git', 'Docker', 'AWS',
]
const programmingSkills = ['Java', 'JavaScript', 'TypeScript', 'Python', 'SQL', 'HTML', 'CSS']
const developmentSkills = ['ReactJS', 'Next.js', 'Node.js', 'Spring Boot', 'REST APIs', 'GraphQL']
const toolsSkillsList = ['Git', 'Docker', 'AWS', 'VS Code', 'Postman', 'Figma']
const othersSkills = ['Agile', 'Problem Solving', 'System Design', 'API Design']

const skillTabs = [
  { id: 'highlights' as const, label: 'Highlights' },
  { id: 'programming' as const, label: 'Programming' },
  { id: 'development' as const, label: 'Development' },
  { id: 'tools' as const, label: 'Tools' },
  { id: 'others' as const, label: 'Others' },
]

const skillDataMap: Record<string, string[]> = {
  highlights: highlightsSkills,
  programming: programmingSkills,
  development: developmentSkills,
  tools: toolsSkillsList,
  others: othersSkills,
}

const education = [
  { id: '1', degree: 'MCA', institution: 'Pratap University', period: '2024', cgpa: '7.0', description: 'Master of Computer Applications.' },
  { id: '2', degree: 'BCA', institution: 'MLSU', period: '2022', cgpa: '7.2', description: 'Bachelor of Computer Applications.' },
]

function App() {
  const [about, setAbout] = useState<About | null>(null)
  const [links, setLinks] = useState<SocialLink[]>([])
  const [view, setView] = useState<'portfolio' | 'login' | 'admin'>('portfolio')
  const [skillTab, setSkillTab] = useState<'highlights' | 'programming' | 'development' | 'tools' | 'others'>('highlights')
  const [skillSearch, setSkillSearch] = useState('')
  const [expandedExp, setExpandedExp] = useState<number | null>(0)
  const [isEditingAbout, setIsEditingAbout] = useState(false)
  const [aboutDraft, setAboutDraft] = useState<About | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [authToken, setAuthToken] = useState<string | null>(() =>
    window.localStorage.getItem('portfolio_admin_token')
  )
  const [loginUsername, setLoginUsername] = useState('admin')
  const [loginPassword, setLoginPassword] = useState('')
  const [loginError, setLoginError] = useState<string | null>(null)
  const [photoUploading, setPhotoUploading] = useState(false)
  const photoInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true)
        const [aboutRes, linkRes] = await Promise.all([
          fetch(`${API_BASE}/about`),
          fetch(`${API_BASE}/links`),
        ])
        if (!aboutRes.ok || !linkRes.ok) throw new Error('Failed to load portfolio data')
        const [aboutData, linkData] = await Promise.all([
          aboutRes.json(),
          linkRes.json(),
        ])
        setAbout(aboutData)
        setLinks(linkData)
      } catch (e: unknown) {
        setError(e instanceof Error ? e.message : 'Error loading data')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  const scrollTo = (id: string) => {
    setView('portfolio')
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    }, 0)
  }

  const startEditAbout = () => {
    if (!about || !authToken) return
    setIsEditingAbout(true)
    setAboutDraft({ ...about })
  }

  const clearSession = () => {
    setAuthToken(null)
    window.localStorage.removeItem('portfolio_admin_token')
    setView('login')
  }

  const saveAbout = async () => {
    if (!aboutDraft || !authToken) return
    try {
      setError(null)
      const res = await fetch(`${API_BASE}/about`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'X-ADMIN-TOKEN': authToken },
        body: JSON.stringify(aboutDraft),
      })
      if (res.status === 401) {
        clearSession()
        setError('Session expired. Please log in again.')
        return
      }
      if (!res.ok) {
        const errText = await res.text()
        try {
          const errJson = JSON.parse(errText)
          const msg = errJson.message || errJson.error || errText
          throw new Error(msg)
        } catch {
          throw new Error(errText || 'Failed to save')
        }
      }
      const saved = await res.json()
      setAbout(saved)
      setIsEditingAbout(false)
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Error saving')
    }
  }

  const uploadPhoto = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file || !authToken) return
    if (!file.type.startsWith('image/')) {
      setError('Please select an image file (e.g. JPG, PNG).')
      return
    }
    try {
      setError(null)
      setPhotoUploading(true)
      const formData = new FormData()
      formData.append('file', file)
      const res = await fetch(`${API_BASE}/about/photo`, {
        method: 'POST',
        headers: { 'X-ADMIN-TOKEN': authToken },
        body: formData,
      })
      if (res.status === 401) {
        clearSession()
        setError('Session expired. Please log in again.')
        return
      }
      if (!res.ok) throw new Error('Upload failed')
      const updated = await res.json()
      setAbout(updated)
      if (aboutDraft) setAboutDraft({ ...aboutDraft, avatarUrl: updated.avatarUrl })
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Upload failed')
    } finally {
      setPhotoUploading(false)
      e.target.value = ''
    }
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoginError(null)
    try {
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: loginUsername, password: loginPassword }),
      })
      if (!res.ok) throw new Error('Invalid username or password')
      const data: { token: string } = await res.json()
      setAuthToken(data.token)
      window.localStorage.setItem('portfolio_admin_token', data.token)
      setLoginPassword('')
      setView('admin')
    } catch (err: unknown) {
      setLoginError(err instanceof Error ? err.message : 'Login failed')
    }
  }

  const logout = () => {
    setAuthToken(null)
    window.localStorage.removeItem('portfolio_admin_token')
    setView('portfolio')
  }

  const isLoading = loading && !about

  const experiences = [
    {
      title: 'Software Developer',
      company: 'KadelLabs',
      location: 'Bengaluru',
      period: 'Jun 2025 – Present',
      points: [
        'Designed and built an AI-powered ticketing system that automatically converts support emails into structured tickets and intelligently routes them by brand, significantly reducing manual triage effort.',
        'Implemented intelligent chat support using OpenAI, enabling faster customer responses and improving first-response resolution rates.',
        'Built automated invoice processing pipelines using AWS Textract, allowing finance teams to extract, validate, and process documents with higher accuracy and reduced turnaround time.',
        'Developed and owned admin dashboards and internal tools for reviewing tickets, invoices, and AI-generated outputs, enabling operations teams to manage volume efficiently and detect issues early.',
        'Architected scalable backend services and REST APIs, focusing on clean separation of concerns, maintainability, and future extensibility.',
        'Integrated role-based access control (RBAC) to ensure secure access for admins, support agents, and finance users across internal platforms.',
        'Optimized background jobs and asynchronous workflows to handle high-volume email ingestion and document processing reliably.',
        'Collaborated closely with product managers and frontend developers to translate business requirements into production-ready features.',
        'Took ownership of production debugging, monitoring, and issue resolution, ensuring system stability and minimal downtime.',
        'Contributed to improving code quality, API consistency, and internal development practices, helping the team ship features faster with fewer regressions.',
      ],
    },
    {
      title: 'Software Developer',
      company: 'AppCrave',
      location: 'Udaipur',
      period: 'Jul 2023 – Jun 2025',
      points: [
        'Developed and optimized Java and Spring Boot microservices handling real-time property data and map-based features, improving response times, system stability, and overall user experience.',
        'Integrated Google Maps APIs and MLS data feeds, enabling users to search, filter, and visualize property listings on interactive maps for both agents and buyers.',
        'Designed and maintained RESTful APIs supporting high-traffic property search, listing management, and geospatial queries.',
        'Led technical decisions and code reviews as Tech Lead, enforcing clean code practices, consistent architectural patterns, and long-term maintainability across the backend.',
        'Implemented role-based access control and authentication flows, ensuring secure access for agents, admins, and internal teams.',
        'Improved database performance and query efficiency for large property datasets through indexing, query optimization, and schema refinements.',
        'Collaborated closely with frontend teams, product managers, and QA to deliver end-to-end features from requirement to production release.',
        'Actively handled production issues, bug fixes, and performance tuning, ensuring minimal downtime and reliable service operation.',
        'Mentored junior developers and helped onboard new team members, accelerating team productivity and code quality.',
      ],
    },
    {
      title: 'Software Developer',
      company: 'Taldar Tech Consultancy',
      location: 'Udaipur',
      period: 'Jan 2023 – Jun 2023',
      points: [
        'Built a logistics and package delivery platform with real-time shipment tracking, allowing customers and operations teams to monitor delivery status without manual support calls.',
        'Integrated multiple third-party carrier and delivery APIs, normalizing diverse status formats into a unified tracking flow to ensure accuracy across different logistics providers.',
        'Designed and implemented RESTful APIs with strong input validation, structured error handling, and consistent response contracts for web and mobile clients.',
        'Implemented event-driven status updates to reflect real-time shipment progress and improve system responsiveness.',
        'Ensured data consistency and reliability across tracking workflows by handling retries, failures, and partial updates from external providers.',
      ],
    },
  ]

  const rawSkillData = skillDataMap[skillTab] ?? []
  const filteredSkills = skillSearch.trim()
    ? rawSkillData.filter((s) => s.toLowerCase().includes(skillSearch.toLowerCase()))
    : rawSkillData
  const activeTabLabel = skillTabs.find((t) => t.id === skillTab)?.label ?? 'Skills'

  const displayName = about?.headline || 'Gaurav Sahitya'
  const displaySubtitle = 'Software Developer · Java · Spring Boot · React'
  const navInitials = displayName.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase() || 'GS'

  return (
    <div className="app-root">
      <header className="navbar">
        <div className="nav-brand" onClick={() => scrollTo('home')}>
          {displayName}
        </div>
        <nav className="nav-links">
          <button type="button" className="nav-link" onClick={() => scrollTo('home')}>Home</button>
          <button type="button" className="nav-link" onClick={() => scrollTo('about')}>About</button>
          <button type="button" className="nav-link" onClick={() => scrollTo('skills')}>Skills</button>
          <button type="button" className="nav-link" onClick={() => scrollTo('experience')}>Experience</button>
          <button type="button" className="nav-link" onClick={() => scrollTo('contact')}>Contact</button>
          <a className="nav-resume" href="/Gaurav_Sahitya_Resume.pdf" download="Gaurav_Sahitya_Resume.pdf">
            <DownloadIcon />
            Resume
          </a>
          {authToken ? (
            <>
              <button type="button" className="nav-link" onClick={() => setView('admin')}>Admin</button>
              <button type="button" className="nav-link" onClick={logout}>Logout</button>
            </>
          ) : (
            <button type="button" className="nav-link" onClick={() => setView('login')}>Login</button>
          )}
        </nav>
      </header>

      {isLoading ? (
        <main className="main-loading">
          <div className="spinner" />
          <p>Loading…</p>
        </main>
      ) : view === 'login' ? (
        <main className="main-single">
          {error && <div className="error-banner">{error}</div>}
          <section className="section section-card">
            <h2>Admin Login</h2>
            <p className="muted">Sign in to manage your portfolio content.</p>
            <form className="form" onSubmit={handleLogin}>
              <label className="field">
                <span>Username</span>
                <input value={loginUsername} onChange={(e) => setLoginUsername(e.target.value)} autoComplete="username" />
              </label>
              <label className="field">
                <span>Password</span>
                <input type="password" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} autoComplete="current-password" />
              </label>
              {loginError && <div className="error-banner">{loginError}</div>}
              <button type="submit" className="btn btn-primary">Sign in</button>
            </form>
          </section>
        </main>
      ) : view === 'admin' ? (
        <main className="main-single">
          {error && <div className="error-banner">{error}</div>}
          <section className="section section-card">
            <h2>Edit Content</h2>
            <div className="admin-grid">
              <div className="admin-block">
                <h3>About</h3>
                {!isEditingAbout && about && (
                  <>
                    {getAboutPhotoUrl(about) && (
                      <div className="admin-photo-preview">
                        <img src={getAboutPhotoUrl(about)} alt="Current" />
                      </div>
                    )}
                    <p>{about.summary}</p>
                    <p className="muted">{about.location}</p>
                    <button type="button" className="btn btn-primary btn-small" onClick={startEditAbout}>Edit</button>
                  </>
                )}
                {isEditingAbout && aboutDraft && (
                  <form className="form" onSubmit={(e) => { e.preventDefault(); saveAbout(); }}>
                    <label className="field"><span>Headline</span><input value={aboutDraft.headline} onChange={(e) => setAboutDraft({ ...aboutDraft, headline: e.target.value })} /></label>
                    <label className="field"><span>Summary</span><textarea rows={4} value={aboutDraft.summary} onChange={(e) => setAboutDraft({ ...aboutDraft, summary: e.target.value })} /></label>
                    <label className="field"><span>Location</span><input value={aboutDraft.location} onChange={(e) => setAboutDraft({ ...aboutDraft, location: e.target.value })} /></label>
                    <label className="field">
                      <span>Photo</span>
                      <input
                        ref={photoInputRef}
                        type="file"
                        accept="image/jpeg,image/png,image/gif,image/webp"
                        onChange={uploadPhoto}
                        disabled={photoUploading}
                      />
                      {photoUploading && <span className="muted">Uploading…</span>}
                      {about?.avatarUrl && <span className="muted">Current photo is set. Upload a new image to replace.</span>}
                    </label>
                    <div className="form-actions">
                      <button type="button" className="btn btn-ghost" onClick={() => setIsEditingAbout(false)}>Cancel</button>
                      <button type="submit" className="btn btn-primary">Save</button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </section>
        </main>
      ) : (
        <main className="main-scroll">
          {error && <div className="error-banner">{error}</div>}

          <section id="home" className="hero">
            <div className="hero-inner">
              <p className="hero-pretitle">HI, I'm</p>
              <h1 className="hero-title">
                <span className="hero-name">{displayName}</span>
              </h1>
              <p className="hero-subtitle">{displaySubtitle}</p>
              <div className="hero-buttons">
                <button type="button" className="btn btn-primary" onClick={() => scrollTo('contact')}>Let's Talk</button>
                <button type="button" className="btn btn-outline" onClick={() => scrollTo('experience')}>See My Work</button>
              </div>
            </div>
            <div className="hero-scroll-wrap">
              <a href="#about" className="hero-scroll" aria-label="Scroll down">↓</a>
            </div>
          </section>

          <section id="about" className="section section-dark">
            <h2 className="section-title">About Me</h2>
            <div className="about-grid">
              <div className="about-text">
                {about?.summary &&
                  about.summary
                    .split(/\n+/)
                    .filter((block) => block.trim())
                    .map((paragraph, i) => (
                      <p key={i}>{paragraph.trim()}</p>
                    ))
                }
              </div>
              <div className="about-photo">
                {getAboutPhotoUrl(about) ? (
                  <img src={getAboutPhotoUrl(about)} alt={displayName} />
                ) : (
                  <div className="about-photo-placeholder">{navInitials}</div>
                )}
              </div>
            </div>
          </section>

          <section id="skills" className="section section-dark">
            <h2 className="section-title">Skills</h2>
            <div className="skills-tabs-wrap">
              <div className="skills-tabs">
                {skillTabs.map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    className={`skills-tab ${skillTab === tab.id ? 'active' : ''}`}
                    onClick={() => setSkillTab(tab.id)}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
              <div className="skills-search-wrap">
                <SearchIcon />
                <input
                  type="text"
                  placeholder={`Search in ${activeTabLabel}...`}
                  value={skillSearch}
                  onChange={(e) => setSkillSearch(e.target.value)}
                />
              </div>
            </div>
            <div className="skills-list-header">
              <span className="skills-list-title">{activeTabLabel}</span>
              <span className="skills-list-count">{filteredSkills.length} items</span>
            </div>
            <div className="skills-grid">
              {filteredSkills.map((name) => (
                <div key={name} className="skill-pill">
                  {name}
                </div>
              ))}
            </div>
          </section>

          <section id="experience" className="section section-dark">
            <h2 className="section-title">Experience</h2>
            <div className="experience-list">
              {experiences.map((exp, i) => (
                <div
                  key={i}
                  className={`exp-card ${expandedExp === i ? 'open' : ''}`}
                >
                  <div
                    className="exp-card-header"
                    onClick={() => setExpandedExp(expandedExp === i ? null : i)}
                    onKeyDown={(e) => e.key === 'Enter' && setExpandedExp(expandedExp === i ? null : i)}
                    role="button"
                    tabIndex={0}
                  >
                    <div>
                      <h3>{exp.title} @ {exp.company}</h3>
                      <p className="exp-meta">{exp.period}</p>
                    </div>
                    <span className="exp-card-toggle"><ChevronDown /></span>
                  </div>
                  {expandedExp === i && (
                    <div className="exp-card-body">
                      <div className="exp-card-content">
                        <ul>
                          {exp.points.map((pt, j) => <li key={j}>{pt}</li>)}
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="resume-cta">
              <a href="/Gaurav_Sahitya_Resume.pdf" download="Gaurav_Sahitya_Resume.pdf" className="btn btn-primary">Download Resume (PDF)</a>
            </div>
          </section>

          <section id="education" className="section section-dark">
            <h2 className="section-title">Education</h2>
            <div className="education-timeline">
              {education.map((edu) => (
                <div key={edu.id} className="education-card">
                  <h3>{edu.degree}</h3>
                  <p className="edu-meta">{edu.institution} · {edu.period}{edu.cgpa ? ` · ${edu.cgpa} CGPA` : ''}</p>
                  <p>{edu.description}</p>
                </div>
              ))}
            </div>
          </section>

          <section id="contact" className="section section-dark">
            <h2 className="section-title">Get In Touch</h2>
            <div className="contact-card">
              <div className="contact-cta-block">
                <h3>Looking for a skilled developer?</h3>
                <p>Let's connect and build something amazing.</p>
                <a type="button" href="tel:+916377189746" className="btn btn-contact" onClick={() => scrollTo('contact')}>Contact Me</a>
              </div>
              <div className="contact-details">
                <div className="contact-detail">
                  <EnvelopeIcon />
                  <a href="mailto:gauravsahitya62@gmail.com">gauravsahitya62@gmail.com</a>
                </div>
                <div className="contact-detail">
                  <PhoneIcon />
                  <a href="tel:+916377189746">+91 63771 89746</a>
                </div>
                <div className="contact-detail">
                  <MapPinIcon />
                  <span>{about?.location ?? 'Bengaluru, Karnataka, India'}</span>
                </div>
                <div className="contact-socials">
                  <a href="mailto:gauravsahitya62@gmail.com" aria-label="Email" className="contact-social-link">
                    <EnvelopeIcon />
                  </a>
                  <a href="tel:+916377189746" aria-label="Phone" className="contact-social-link">
                    <PhoneIcon />
                  </a>
                  <a href="https://linkedin.com/in/gaurav-sahitya/" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="contact-social-link">
                    <LinkedInIcon />
                  </a>
                  <a href="https://github.com/gauravsahitya62" target="_blank" rel="noreferrer" aria-label="GitHub" className="contact-social-link">
                    <GitHubIcon />
                  </a>
                </div>
              </div>
            </div>
          </section>

          <footer className="footer">
            <p>Copyright © {new Date().getFullYear()} Gaurav Sahitya. All rights reserved.</p>
            <div className="footer-links">
              {links.map((l) => (
                <a key={l.id} href={l.url} target="_blank" rel="noreferrer">{l.label}</a>
              ))}
            </div>
          </footer>
        </main>
      )}
    </div>
  )
}

export default App
