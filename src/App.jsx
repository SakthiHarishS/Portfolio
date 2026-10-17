import React, { useState, useEffect, useRef } from 'react';
import { ArrowUpRight, Download, Mail, Phone, MapPin, Globe, Menu, X } from 'lucide-react';

export default function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [mousePos, setMousePos] = useState({ x: -500, y: -500 });
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const canvasRef = useRef(null);

  // Background Canvas Animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = Array.from({ length: 30 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 1.5 + 1,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      alpha: Math.random() * 0.3 + 0.1
    }));

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 85, 0, ${p.alpha})`;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Mouse Glow Spotlight Movement
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Scroll active section tracking
  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section');
      const scrollPos = window.scrollY + 100;
      const isBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 30;

      if (isBottom) {
        setActiveSection('contact');
        return;
      }

      sections.forEach((section) => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        const id = section.getAttribute('id');

        if (scrollPos >= top && scrollPos < top + height) {
          setActiveSection(id);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const skillsList = [
    { name: 'Java', category: 'BACKEND', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg' },
    { name: 'Spring Boot', category: 'BACKEND', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg' },
    { name: 'React.js', category: 'FRONTEND', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
    { name: 'MySQL', category: 'DATABASE', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg' },
    { name: 'Maven', category: 'TOOLS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/maven/maven-original.svg' },
    { name: 'JavaScript', category: 'FRONTEND', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
    { name: 'HTML5', category: 'FRONTEND', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
    { name: 'CSS3', category: 'FRONTEND', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
    { name: 'Bootstrap', category: 'FRONTEND', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg' },
    { name: 'Git & GitHub', category: 'TOOLS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
    { name: 'VS Code', category: 'TOOLS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg' },
    { name: 'IntelliJ IDEA', category: 'TOOLS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/intellij/intellij-original.svg' },
    { name: 'Postman', category: 'TOOLS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg' },
    { name: 'MS Excel', category: 'TOOLS', icon: 'https://img.icons8.com/color/96/microsoft-excel-2019.png' },
    { name: 'MS Word', category: 'TOOLS', icon: 'https://img.icons8.com/color/96/microsoft-word-2019.png' },
    { name: 'PowerPoint', category: 'TOOLS', icon: 'https://img.icons8.com/color/96/microsoft-powerpoint-2019.png' },
    { name: 'MS Outlook', category: 'TOOLS', icon: 'https://img.icons8.com/color/96/microsoft-outlook-2019.png' }
  ];

  const filteredSkills = selectedCategory === 'ALL' 
    ? skillsList 
    : skillsList.filter(item => item.category === selectedCategory);

  const handleMailtoSubmit = (e) => {
    e.preventDefault();
    const mailSubject = encodeURIComponent(formData.subject || `Portfolio Inquiry from ${formData.name}`);
    const mailBody = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    );
    window.location.href = `mailto:sakthiharish68@gmail.com?subject=${mailSubject}&body=${mailBody}`;
  };

  return (
    <div style={{ position: 'relative' }}>
      <canvas ref={canvasRef} className="particles-canvas" />

      <div 
        className="mouse-spotlight" 
        style={{ left: `${mousePos.x}px`, top: `${mousePos.y}px` }}
      ></div>

      <nav className="navbar">
        <div className="brand-logo">
          <span className="sh-box">SH</span>
          <span>/ SAKTHI HARISH S</span>
        </div>

        <button 
          className="menu-toggle-btn" 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <ul className={`nav-menu ${mobileMenuOpen ? 'mobile-open' : ''}`}>
          <li><a href="#home" onClick={() => setMobileMenuOpen(false)} className={activeSection === 'home' ? 'active' : ''}>HOME</a></li>
          <li><a href="#skills" onClick={() => setMobileMenuOpen(false)} className={activeSection === 'skills' ? 'active' : ''}>SKILLS</a></li>
          <li><a href="#experience" onClick={() => setMobileMenuOpen(false)} className={activeSection === 'experience' ? 'active' : ''}>EXPERIENCE & EDUCATION</a></li>
          <li><a href="#projects" onClick={() => setMobileMenuOpen(false)} className={activeSection === 'projects' ? 'active' : ''}>PROJECTS</a></li>
          <li><a href="#certifications" onClick={() => setMobileMenuOpen(false)} className={activeSection === 'certifications' ? 'active' : ''}>CERTIFICATIONS</a></li>
          <li><a href="#contact" onClick={() => setMobileMenuOpen(false)} className={activeSection === 'contact' ? 'active' : ''}>CONTACT</a></li>
        </ul>
      </nav>

      <section id="home" className="hero-wrapper">
        <div className="container-wrapper">
          <div className="hero-container">
            <div>
              <div className="hero-tag">
                <Globe size={14} color="var(--orange-accent)" /> OPEN TO UAE & GLOBAL OPPORTUNITIES
              </div>
              <h1 className="hero-name">SAKTHI HARISH S</h1>
              <p className="hero-desc">
                Detail-oriented Computer Science Graduate specializing in scalable Java Full Stack development, REST APIs, microservices, and React frontends. Ready for immediate deployment in UAE and global software engineering roles.
              </p>

              <div className="btn-group">
                <a href="#contact" className="btn-orange-full">
                  HIRING OPPORTUNITIES <ArrowUpRight size={14} />
                </a>
                <a href="/Sakthi_Harish_S_Resume.pdf" download className="btn-link-resume">
                  DOWNLOAD RESUME <Download size={14} />
                </a>
              </div>

              <div>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.7rem', fontWeight: '700', letterSpacing: '1px', marginBottom: '0.5rem' }}>QUICK CONTACT</p>
                <div className="social-links">
                  <a href="mailto:sakthiharish68@gmail.com" className="social-item">
                    <Mail size={14} /> sakthiharish68@gmail.com
                  </a>
                  <a href="tel:+919677807453" className="social-item">
                    <Phone size={14} /> +91 9677807453
                  </a>
                  <span className="social-item">
                    <MapPin size={14} /> Ramanathapuram, TN | Global Mobility
                  </span>
                </div>
              </div>
            </div>

            <div className="hero-image-wrapper">
              <div className="orange-stripe"></div>
              <img 
                src="/Gemini_Generated_Image_h27qr6h27qr6h27q.png" 
                alt="Sakthi Harish S" 
                className="user-img" 
              />
            </div>
          </div>
        </div>
      </section>

      <section id="skills" className="section-grid">
        <div className="container-wrapper">
          <div className="section-inner">
            <div className="left-sec-header">
              <div className="num">01</div>
              <h2>TECHNICAL<br />SKILLS</h2>
              <div className="orange-line"></div>
              <p>Filter tech stack by domain category.</p>
            </div>

            <div>
              <div className="filter-container">
                {['ALL', 'FRONTEND', 'BACKEND', 'DATABASE', 'TOOLS'].map((cat) => (
                  <button 
                    key={cat} 
                    className={`filter-btn ${selectedCategory === cat ? 'active' : ''}`}
                    onClick={() => setSelectedCategory(cat)}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <div className="tech-grid">
                {filteredSkills.map((item, idx) => (
                  <div key={idx} className="tech-card">
                    <img src={item.icon} alt={item.name} />
                    <span>{item.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="experience" className="section-grid">
        <div className="container-wrapper">
          <div className="section-inner">
            <div className="left-sec-header">
              <div className="num">02</div>
              <h2>EXPERIENCE &<br />EDUCATION</h2>
              <div className="orange-line"></div>
              <p>Combined career trajectory including internships and degree studies.</p>
            </div>

            <div>
              <div className="timeline-block">
                <div className="timeline-dot"></div>
                <div className="role-title">React.js Developer Intern</div>
                <div className="meta-info">AISTRATX Technologies • August 2026 – October 2026</div>
                <p className="role-desc">
                  Developed dynamic frontend features, component state logic, and modern responsive user interfaces using React.js.
                </p>
              </div>

              <div className="timeline-block">
                <div className="timeline-dot"></div>
                <div className="role-title">Data Analyst Intern</div>
                <div className="meta-info">IPCS Global • July 2025</div>
                <p className="role-desc">
                  Engaged in dataset analytics, structured reporting models, and analytical tools optimization.
                </p>
              </div>

              <div className="timeline-block">
                <div className="timeline-dot"></div>
                <div className="role-title">Front-end Developer Intern</div>
                <div className="meta-info">Syed Ammal Engineering College • August 2024 – September 2024</div>
                <p className="role-desc">
                  Designed dynamic web interfaces, enhanced DOM rendering logic, and ensured multi-device responsive compatibility.
                </p>
              </div>

              <div className="timeline-block" style={{ marginBottom: 0 }}>
                <div className="timeline-dot"></div>
                <div className="role-title">B.E., Computer Science and Engineering</div>
                <div className="meta-info">Syed Ammal Engineering College • 2022 – 2026</div>
                <p className="role-desc" style={{ color: 'var(--orange-accent)', fontWeight: '700' }}>
                  CGPA: 7.60
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="projects" className="section-grid">
        <div className="container-wrapper">
          <div className="section-inner">
            <div className="left-sec-header">
              <div className="num">03</div>
              <h2>FEATURED<br />PROJECTS</h2>
              <div className="orange-line"></div>
              <p>Production-ready engineering projects.</p>
            </div>

            <div>
              <div className="proj-card">
                <div className="proj-title">Amazon Clone Full-Stack E-Commerce Application</div>
                <div className="proj-tags">Java, Spring Boot, React.js, MySQL, JWT, REST APIs</div>
                <ul className="proj-bullets">
                  <li>Engineered full-stack e-commerce architecture with JWT & Spring Security.</li>
                  <li>Designed RESTful endpoints & optimized MySQL databases with JPA for cart, catalog, and wishlist systems.</li>
                  <li>Implemented dynamic UI pagination, state handling, and deployed on Vercel.</li>
                </ul>
              </div>

              <div className="proj-card" style={{ marginBottom: 0 }}>
                <div className="proj-title">Online Cafe Website</div>
                <div className="proj-tags">HTML5, CSS3, JavaScript (ES6+), LocalStorage, Git</div>
                <ul className="proj-bullets">
                  <li>Developed responsive multi-page web platform with seamless cross-device compatibility.</li>
                  <li>Integrated dynamic menu filtering and browser LocalStorage for client-side order persistence.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="certifications" className="section-grid">
        <div className="container-wrapper">
          <div className="section-inner">
            <div className="left-sec-header">
              <div className="num">04</div>
              <h2>CERTIFICATIONS</h2>
              <div className="orange-line"></div>
              <p>Validated technical skills & coursework.</p>
            </div>

            <div className="cert-grid">
              <div className="cert-card">
                <h4>Java Full Stack Certification</h4>
                <p>FITA Academy (July 2025)</p>
              </div>
              <div className="cert-card">
                <h4>Advances React</h4>
                <p>Meta</p>
              </div>
              <div className="cert-card">
                <h4>Database and SQL</h4>
                <p>Infosys Springboard</p>
              </div>
              <div className="cert-card">
                <h4>Data Analytics Job Simulation</h4>
                <p>Deloitte (Forage)</p>
              </div>
              <div className="cert-card">
                <h4>Google Analytics Certification</h4>
                <p>Google</p>
              </div>
              <div className="cert-card">
                <h4>Prompt Engineering for Developers</h4>
                <p>LinkedIn Learning</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="section-grid">
        <div className="container-wrapper">
          <div className="section-inner">
            <div className="left-sec-header">
              <div className="num">05</div>
              <h2>LET'S CONNECT</h2>
              <div className="orange-line"></div>
              <p style={{ marginTop: '0.5rem' }}>
                Actively seeking Full-Time Software Engineer / Junior Developer roles in UAE and globally.
              </p>
            </div>

            <div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.8rem', marginBottom: '1.2rem' }}>
                <a href="mailto:sakthiharish68@gmail.com" className="contact-info-card">
                  <Mail color="var(--orange-accent)" size={18} />
                  <div>
                    <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>Email</div>
                    <div style={{ fontWeight: '600', fontSize: '0.75rem' }}>sakthiharish68@gmail.com</div>
                  </div>
                </a>

                <a href="tel:+919677807453" className="contact-info-card">
                  <Phone color="var(--orange-accent)" size={18} />
                  <div>
                    <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>Phone</div>
                    <div style={{ fontWeight: '600', fontSize: '0.75rem' }}>+91 9677807453</div>
                  </div>
                </a>

                <a href="https://github.com/SakthiHarishS" target="_blank" rel="noreferrer" className="contact-info-card">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--orange-accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
                    <path d="M9 18c-4.51 2-5-2-7-2"></path>
                  </svg>
                  <div>
                    <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>GitHub</div>
                    <div style={{ fontWeight: '600', fontSize: '0.75rem' }}>SakthiHarishS</div>
                  </div>
                </a>

                <a href="https://linkedin.com/in/sakthiharishs" target="_blank" rel="noreferrer" className="contact-info-card">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--orange-accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                    <rect x="2" y="9" width="4" height="12"></rect>
                    <circle cx="4" cy="4" r="2"></circle>
                  </svg>
                  <div>
                    <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>LinkedIn</div>
                    <div style={{ fontWeight: '600', fontSize: '0.75rem' }}>sakthiharishs</div>
                  </div>
                </a>
              </div>

              <form onSubmit={handleMailtoSubmit}>
                <div className="form-grid">
                  <input 
                    type="text" 
                    placeholder="Your Name" 
                    className="form-input" 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    required 
                  />
                  <input 
                    type="email" 
                    placeholder="Your Email" 
                    className="form-input" 
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    required 
                  />
                </div>
                <div style={{ marginBottom: '0.6rem' }}>
                  <input 
                    type="text" 
                    placeholder="Subject / Organization" 
                    className="form-input" 
                    value={formData.subject}
                    onChange={(e) => setFormData({...formData, subject: e.target.value})}
                  />
                </div>
                <textarea 
                  placeholder="Your Message" 
                  className="form-textarea" 
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  required
                ></textarea>

                <button type="submit" className="btn-orange-full" style={{ width: '100%', justifyContent: 'center' }}>
                  SEND MESSAGE <ArrowUpRight size={14} />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <footer style={{ borderTop: '1px solid var(--border-color)', padding: '1.2rem 0' }}>
        <div className="container-wrapper">
          <div className="footer-bar">
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span className="sh-box">SH</span>
              <span>© 2026 Sakthi Harish S. All rights reserved.</span>
            </div>
            <div>Available for Global & UAE Opportunities</div>
          </div>
        </div>
      </footer>
    </div>
  );
}