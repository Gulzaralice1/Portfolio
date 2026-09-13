import { useEffect, useRef, useState } from 'react'
import './App.css'

const links = {
  github: 'https://github.com/gulzaralice1',
  linkedin: 'https://linkedin.com/in/mdgulzar',
  leetcode: 'https://leetcode.com/u/Md_Gulzar/',
  reuzo: 'https://reuzo.netlify.app/',
  email: 'mailto:mdgulzar5172@gmail.com',
  resume: '/Md-Gulzar-Resume.pdf',
}

function Icon({ name }) {
  const paths = {
    arrow: <><path d="M5 19 19 5" /><path d="M8 5h11v11" /></>,
    download: <><path d="M12 3v12" /><path d="m7 10 5 5 5-5" /><path d="M5 21h14" /></>,
  }
  return <svg className="ui-icon" viewBox="0 0 24 24" aria-hidden="true">{paths[name]}</svg>
}

function Cursor() {
  const [cursor, setCursor] = useState({ label: '', state: 'normal' })
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return undefined
    let frame
    let target = { x: -100, y: -100 }
    let ringPosition = { x: -100, y: -100 }
    const move = (event) => {
      target = { x: event.clientX, y: event.clientY }
      const element = event.target.closest?.('[data-cursor]')
      const architectureNode = event.target.closest?.('.arch-node')
      const project = event.target.closest?.('.project')
      setCursor((current) => ({ ...current, label: element?.dataset.cursor || (architectureNode ? 'INSPECT' : project ? 'EXPLORE' : ''), state: element?.dataset.cursorState || (architectureNode ? 'architecture' : project ? 'project' : 'link') }))
    }
    const leave = () => setCursor((current) => ({ ...current, label: '', state: 'normal' }))
    const tick = () => {
      ringPosition.x += (target.x - ringPosition.x) * 0.24
      ringPosition.y += (target.y - ringPosition.y) * 0.24
      dotRef.current?.style.setProperty('transform', `translate3d(${target.x}px, ${target.y}px, 0)`)
      ringRef.current?.style.setProperty('transform', `translate3d(${ringPosition.x}px, ${ringPosition.y}px, 0)`)
      frame = requestAnimationFrame(tick)
    }
    document.addEventListener('pointermove', move)
    document.addEventListener('pointerout', leave)
    frame = requestAnimationFrame(tick)
    return () => { document.removeEventListener('pointermove', move); document.removeEventListener('pointerout', leave); cancelAnimationFrame(frame) }
  }, [])
  return <><div ref={dotRef} className="context-cursor-dot" aria-hidden="true" /><div ref={ringRef} className={`context-cursor-ring cursor-${cursor.state}`} aria-hidden="true"><span>{cursor.label}</span></div></>
}

const skillGroups = {
  LANGUAGES: { tone: 'coral', items: [['C++', 'hands-on'], ['Python', 'hands-on'], ['JavaScript', 'hands-on']] },
  BUILD: { tone: 'mint', items: [['React.js', 'hands-on'], ['Node.js', 'hands-on'], ['Express.js', 'hands-on'], ['Tailwind CSS', 'hands-on'], ['HTML', 'hands-on'], ['CSS', 'hands-on']] },
  DATA: { tone: 'gold', items: [['MongoDB', 'hands-on'], ['MySQL', 'hands-on']] },
  CLOUD: { tone: 'blue', items: [['Amazon S3', 'hands-on'], ['CloudFront', 'hands-on'], ['Route 53', 'hands-on'], ['EC2', 'studied'], ['IAM', 'studied'], ['VPC', 'studied'], ['Lambda', 'studied']] },
  SYSTEM: { tone: 'violet', items: [['Linux', 'hands-on'], ['Docker', 'hands-on'], ['Git', 'hands-on'], ['GitHub', 'hands-on']] },
  FOUNDATION: { tone: 'coral', items: [['Data Structures & Algorithms', 'hands-on']] },
}

const awsNodes = [
  { id: 'user', label: 'USER', detail: 'A request begins here: someone enters the custom domain in a browser.' },
  { id: 'domain', label: 'DOMAIN', detail: 'The custom domain is the human-friendly entry point to the deployed site.' },
  { id: 'route53', label: 'ROUTE 53', detail: 'DNS records point the custom domain toward the CloudFront distribution.' },
  { id: 'cloudfront', label: 'CLOUDFRONT', detail: 'The CDN delivers cached content closer to the visitor.' },
  { id: 's3', label: 'S3', detail: 'S3 hosts the static website files at the origin.' },
  { id: 'website', label: 'WEBSITE', detail: 'The final HTML, CSS and JavaScript arrive in the browser.' },
]

const reuzoNodes = [
  { id: 'frontend', label: 'REACT + VITE', detail: 'The interface handles listings, search, categories, profiles, favorites and sharing.' },
  { id: 'api', label: 'REST API', detail: 'A clear API boundary carries product and account actions between client and server.' },
  { id: 'server', label: 'EXPRESS / NODE', detail: 'The backend owns routes, permissions and marketplace logic.' },
  { id: 'data', label: 'MONGOOSE', detail: 'Schemas and models keep MongoDB data structured and queryable.' },
  { id: 'mongo', label: 'MONGODB', detail: 'The marketplace data layer stores products, users and related records.' },
]

function Arrow() {
  return <span className="flow-arrow" aria-hidden="true">↓</span>
}

function Architecture({ kind, nodes }) {
  const [active, setActive] = useState(nodes[0].id)
  const selected = nodes.find((node) => node.id === active)

  return (
    <div className={`architecture architecture-${kind}`}>
      <div className="architecture-stack" role="list" aria-label={`${kind} architecture flow`}>
        {nodes.map((node, index) => (
          <div key={node.id} role="listitem">
            <button className={`arch-node ${active === node.id ? 'is-active' : ''}`} type="button" onClick={() => setActive(node.id)} aria-pressed={active === node.id}>
              <span className="node-index">0{index + 1}</span><span>{node.label}</span><span className="node-pulse" aria-hidden="true" />
            </button>
            {index < nodes.length - 1 && <Arrow />}
          </div>
        ))}
      </div>
      <div className="architecture-note" aria-live="polite"><span className="eyebrow">Selected layer</span><strong>{selected.label}</strong><p>{selected.detail}</p></div>
    </div>
  )
}

const journeyMilestones = [
  { year: '2024', label: 'STARTED THE BUILD', text: 'B.Tech Computer Science & Engineering at Lovely Professional University.', icon: 'EDUCATION', note: 'learning' },
  { year: '2025', label: 'FOUNDATIONS', text: 'React and Node.js learning. Community Development Volunteer. CODEQUEST participant.', icon: 'LEARNING', note: 'building' },
  { year: '2026', label: 'SYSTEMS IN MOTION', text: 'Built Reuzo, a student marketplace. Deployed a static website on AWS.', icon: 'SYSTEM', note: 'ideas -> impact', tags: ['REUZO', 'AWS'] },
  { year: '2028', label: 'NEXT CHECKPOINT', text: 'Expected graduation. The build continues.', icon: 'FUTURE', note: 'growing' },
]

function Journey({ progress }) {
  const activeIndex = Math.min(journeyMilestones.length - 1, Math.floor(progress * journeyMilestones.length))
  return (
    <section className="journey-section" id="journey" style={{ '--thread-progress': progress }}>
      <div className="section-pad journey-intro"><div><span className="eyebrow">04 / THE JOURNEY</span><h2>A Thread<br /><em>of Growth</em></h2></div><p>Different years. Same curiosity.<br />A continuous thread of learning,<br />building and becoming.</p></div>
      <div className="thread-stage section-pad">
        <div className="thread-annotation annotation-one">learning</div><div className="thread-annotation annotation-two">ideas -&gt; impact</div><div className="thread-annotation annotation-three">building</div>
        <svg className="growth-thread" viewBox="0 0 620 1160" preserveAspectRatio="none" aria-hidden="true"><defs><filter id="thread-glow"><feGaussianBlur stdDeviation="7" result="blur" /><feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge></filter></defs><path className="thread-halo" d="M310 0 C190 115 470 210 340 330 S150 535 300 650 S505 830 335 950 S275 1080 390 1160" pathLength="1" /><path className="thread-path" d="M310 0 C190 115 470 210 340 330 S150 535 300 650 S505 830 335 950 S275 1080 390 1160" pathLength="1" /></svg>
        <div className="thread-milestones">{journeyMilestones.map((milestone, index) => <article className={`thread-milestone milestone-${index + 1} ${index <= activeIndex ? 'is-active' : ''} ${index === 2 ? 'is-featured' : ''}`} key={milestone.year} data-cursor={index === 2 ? '2026 · SYSTEMS' : 'EXPLORE'} data-cursor-state="architecture"><div className="milestone-node"><span>{milestone.icon}</span></div><div className="milestone-card"><span className="milestone-year">{milestone.year}</span><span className="eyebrow">{milestone.label}</span><p>{milestone.text}</p>{milestone.tags && <div className="milestone-tags">{milestone.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>}<small>{milestone.note}</small></div></article>)}</div>
        <div className="thread-continuation"><span>···</span><strong>THE BUILD CONTINUES</strong><small>next layer loading</small></div>
      </div>
    </section>
  )
}

function App() {
  const [activeSkill, setActiveSkill] = useState('LANGUAGES')
  const [menuOpen, setMenuOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const [terminalInput, setTerminalInput] = useState('')
  const [terminalOutput, setTerminalOutput] = useState('Try `whoami`, `skills`, `projects`, `aws`, or `contact`.')
  const [journeyProgress, setJourneyProgress] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      document.documentElement.style.setProperty('--scroll', `${(window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100}%`)
      const section = document.querySelector('.journey-section')
      if (section) setJourneyProgress(Math.max(0, Math.min(1, (window.innerHeight * 0.7 - section.getBoundingClientRect().top) / section.offsetHeight)))
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const copyEmail = async () => {
    await navigator.clipboard?.writeText('mdgulzar5172@gmail.com')
    setCopied(true)
    window.setTimeout(() => setCopied(false), 2200)
  }

  const runCommand = (event) => {
    event.preventDefault()
    const command = terminalInput.trim().toLowerCase().replace('$ ', '')
    const responses = { whoami: 'Md Gulzar / CSE student / builder in progress', skills: 'C++  Python  JavaScript  React  Node  AWS  Docker  DSA', projects: '01 AWS static deployment\n02 Reuzo student marketplace', aws: 'S3  →  CloudFront  →  Route 53  →  custom domain', github: 'github.com/gulzaralice1', contact: 'mdgulzar5172@gmail.com  /  +91 7070245172' }
    setTerminalOutput(responses[command] || 'Command not found. Try whoami, skills, projects, aws, github, or contact.')
    setTerminalInput('')
  }

  return (
    <div className="site-shell">
      <Cursor />
      <div className="scroll-line" aria-hidden="true" />
      <header className="topbar"><a className="brand" href="#home" aria-label="Md Gulzar home" data-cursor="HOME"><span className="brand-mark">MG</span><span>MD GULZAR</span></a><button className="menu-toggle" type="button" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-controls="primary-nav"><span /> <span /> <span /></button><nav id="primary-nav" className={menuOpen ? 'nav-open' : ''} aria-label="Primary navigation">{['About', 'Projects', 'Skills', 'Journey', 'Contact'].map((item) => <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setMenuOpen(false)} data-cursor="GO">{item}</a>)}<a className="nav-cta" href={links.resume} target="_blank" rel="noreferrer" data-cursor="VIEW">Resume <span>↗</span></a></nav></header>
      <main>
        <section className="hero section-pad" id="home"><div className="hero-copy reveal"><p className="eyebrow"><span className="status-dot" /> CSE student · LPU · India</p><h1>Small systems.<br /><em>Big intent.</em></h1><p className="hero-lede">I’m Md Gulzar, a computer science student turning curiosity into working products, one layer at a time.</p><div className="hero-actions"><a className="button button-primary" href="#projects">Explore the work <span>↘</span></a><a className="text-link" href={links.email}>mdgulzar5172@gmail.com <span>↗</span></a></div></div><div className="hero-orbit" aria-label="Technologies in Md Gulzar's working system"><div className="orbit orbit-one" /><div className="orbit orbit-two" /><div className="orbit orbit-three" /><div className="orbit-core"><span>BUILD<br /><b>/ /</b><br />REPEAT</span></div>{['C++', 'REACT', 'AWS', 'NODE', 'PYTHON', 'MONGO', 'GIT', 'DSA'].map((label, index) => <span key={label} className={`orbit-tag tag-${index + 1}`}>{label}</span>)}<span className="orbit-caption">active stack / 2026</span></div><div className="hero-meta"><span>SCROLL TO EXPLORE</span><span className="meta-rule" /><span>01—09</span></div></section>
        <section className="intro-band" id="about"><div className="section-kicker">01 / IDENTITY</div><p>I’m not here to pretend I’ve already arrived. I’m here to show the systems I’m building, the things I’m learning, and where I’m going next.</p><span className="band-stamp">CURIOUS BY DEFAULT</span></section>
        <section className="section-pad story-section"><div className="section-heading"><div><span className="eyebrow">A work in progress</span><h2>Learning by<br /><em>shipping.</em></h2></div><p>From a first degree year to full-stack builds and cloud experiments, my path has been practical: learn a layer, use it, understand what breaks.</p></div><div className="story-grid"><div className="story-stat"><strong>7.2</strong><span>current CGPA<br />B.Tech CSE</span></div><div className="story-stat"><strong>2028</strong><span>expected graduation<br />LPU · Punjab</span></div><div className="story-statement">The best way I know to learn a system is to make it answer a real request.</div></div></section>
        <section className="section-pad skills-section" id="skills"><div className="section-heading compact"><div><span className="eyebrow">02 / TOOLBOX</span><h2>The stack, <em>honestly.</em></h2></div><p>Hands-on work and studied concepts stay clearly separated. The list grows with the work.</p></div><div className="skills-layout"><div className="skill-tabs" role="tablist" aria-label="Skill categories">{Object.keys(skillGroups).map((group) => <button key={group} className={activeSkill === group ? 'is-active' : ''} onClick={() => setActiveSkill(group)} type="button" role="tab" aria-selected={activeSkill === group}>{group}<span>↗</span></button>)}</div><div className={`skill-detail tone-${skillGroups[activeSkill].tone}`}><div className="skill-detail-top"><span className="eyebrow">{activeSkill} / 0{Object.keys(skillGroups).indexOf(activeSkill) + 1}</span><span className="skill-orb" /></div><h3>{activeSkill === 'CLOUD' ? 'Shipping beyond localhost.' : activeSkill === 'FOUNDATION' ? 'The layer underneath.' : 'Tools I reach for.'}</h3><div className="skill-list">{skillGroups[activeSkill].items.map(([name, level]) => <div key={name} className="skill-item"><span>{name}</span><small className={level}>{level}</small></div>)}</div></div></div></section>
        <section className="projects-section" id="projects"><div className="section-pad"><div className="section-heading compact"><div><span className="eyebrow">03 / SELECTED BUILDS</span><h2>Proof, not<br /><em>promises.</em></h2></div><p>Two projects that taught me what happens when an idea meets infrastructure, edge cases and an actual user.</p></div><article className="project project-aws"><div className="project-header"><div><span className="project-number">01</span><span className="eyebrow">CLOUD DEPLOYMENT · JUL 2026</span><h3>Static, but<br /><em>not simple.</em></h3></div><p>My first end-to-end cloud hosting architecture. A custom domain, a CDN, and a static site connected all the way through.</p></div><div className="project-body"><Architecture kind="aws" nodes={awsNodes} /><div className="project-aside"><span className="eyebrow">The brief</span><p>Architect and deploy a publicly accessible website using S3, CloudFront and Route 53.</p><div className="tag-row"><span>S3</span><span>CLOUDFRONT</span><span>ROUTE 53</span></div><span className="project-note">request path / visualized</span></div></div></article><article className="project project-reuzo"><div className="project-header"><div><span className="project-number">02</span><span className="eyebrow">FULL-STACK PRODUCT · MAR 2026</span><h3>A marketplace<br /><em>with a pulse.</em></h3></div><p>Reuzo gives students a place to list, discover and share products. I built the app across frontend, backend, data and admin flows.</p></div><div className="project-body"><Architecture kind="reuzo" nodes={reuzoNodes} /><div className="project-aside"><span className="eyebrow">The system</span><p>React and Vite at the front. REST APIs and Express in the middle. MongoDB and Mongoose underneath.</p><div className="security-list"><span>JWT authentication</span><span>bcrypt.js hashing</span><span>Admin dashboard</span></div><a className="button button-outline" href={links.reuzo} target="_blank" rel="noreferrer">Visit Reuzo <span>↗</span></a></div></div></article></div></section>
        <Journey progress={journeyProgress} />
        <section className="archive-section"><div className="section-pad"><div className="section-heading compact"><div><span className="eyebrow">05 / ARCHIVE</span><h2>Milestones,<br /><em>kept real.</em></h2></div><p>A small record of the courses, simulations and communities that have shaped the work.</p></div><div className="archive-grid">{[['07.26', 'Cloud Craft Skill Development Course', 'LPU Centre for Professional Enhancement', 'Grade A'], ['01.26', 'AWS Solutions Architecture Job Simulation', 'Forage', ''], ['07.25', 'ReactJS', 'Infosys Springboard', ''], ['05.25', 'Getting Started with Node.js', 'Simplilearn SkillUp', '']].map(([date, name, org, grade]) => <div className="archive-item" key={name}><span>{date}</span><div><h3>{name}</h3><p>{org}</p>{grade && <small>{grade}</small>}</div><b>↗</b></div>)}</div><div className="side-archive"><span className="eyebrow">OUTSIDE THE EDITOR</span><div><strong>LeetCode</strong><span>gulzar_alice · ongoing</span><a href={links.leetcode} target="_blank" rel="noreferrer">Open profile ↗</a></div><div><strong>Community Development Volunteer</strong><span>NGO · Aug 2025</span></div><div><strong>CODEQUEST</strong><span>Optimyzr for Success · Mar 2025</span></div></div></div></section>
        <section className="terminal-section section-pad"><div className="terminal-intro"><span className="eyebrow">06 / A LITTLE EXTRA</span><h2>Ask the<br /><em>machine.</em></h2><p>A tiny command line for the curious. The normal navigation works too.</p></div><div className="terminal"><div className="terminal-bar"><span /><span /><span /><small>gulzar@world:~</small></div><div className="terminal-body"><div className="terminal-prompt">$ whoami</div><div className="terminal-result">Md Gulzar / CSE student / builder in progress</div><div className="terminal-prompt">$ {terminalOutput.includes('Try') ? '' : terminalInput || '...'}</div><div className="terminal-result output">{terminalOutput}</div><form onSubmit={runCommand}><label htmlFor="terminal-command">$</label><input id="terminal-command" value={terminalInput} onChange={(event) => setTerminalInput(event.target.value)} placeholder="type a command" autoComplete="off" /></form></div></div></section>
        <section className="contact-section" id="contact"><div className="contact-orbit" /><div className="section-pad contact-inner"><span className="eyebrow">07 / OPEN CHANNEL</span><h2>What should we<br /><em>build next?</em></h2><p>Have a question, an idea, or a problem worth taking apart? My inbox is open.</p><div className="contact-actions"><a className="button button-primary" href={links.email}>Start a conversation <span>↗</span></a><button className="button button-ghost" type="button" onClick={copyEmail}>{copied ? 'Email copied' : 'Copy email'} <span>{copied ? '✓' : '□'}</span></button></div><div className="contact-links"><a href={links.github} target="_blank" rel="noreferrer">GitHub ↗</a><a href={links.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a><a href={links.leetcode} target="_blank" rel="noreferrer">LeetCode ↗</a><a href="tel:+917070245172" className='hover:text-white transition-colors duration-300'>+91 7070245172</a></div></div></section>
        <section className="resume-strip section-pad" id="resume"><div><span className="eyebrow">08 / THE SHORT VERSION</span><h2>One page.<br /><em>Full context.</em></h2></div><p>See the education, projects, skills and certifications together in a format built for a quick read.</p><div className="resume-actions"><a className="button button-primary" href={links.resume} download="Md-Gulzar-Resume.pdf" data-cursor="DOWNLOAD" data-cursor-state="button">Download Resume <Icon name="download" /></a><a className="button button-outline" href={links.resume} target="_blank" rel="noreferrer" data-cursor="VIEW">View Resume <Icon name="arrow" /></a></div></section>
      </main>
      <footer><a className="brand" href="#home"><span className="brand-mark">MG</span><span>MD GULZAR</span></a><span>B.Tech CSE · LPU · 2024—2028</span><span>Made while learning how systems connect.</span></footer>
    </div>
  )
}

export default App
