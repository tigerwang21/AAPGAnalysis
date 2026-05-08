import { useState } from 'react';
import {
  Leaf, Monitor, BookOpen, Network, Layers, Users, Globe,
  User, Library, PenTool, Briefcase, Landmark,
} from 'lucide-react';

/* ─── Data ─────────────────────────────────────────────────────────── */

const themes = [
  { id: 'climate',      name: 'Climate & Ecology',              icon: Leaf,     color: 'text-emerald-700', barColor: 'bg-emerald-600', subthemes: ['Environmental Performance', 'Resilience', 'Carbon', 'Ecosystems'],                    desc: 'Focuses on the environment, reducing carbon, ecosystems, and building resilience against climate change.' },
  { id: 'systems',      name: 'Systems & Urban Scale',          icon: Network,  color: 'text-cyan-700',    barColor: 'bg-cyan-600',    subthemes: ['Infrastructure', 'Urban Science', 'Regional Thinking', 'Circularity'],               desc: 'Explores infrastructure, urban science, and circular regional thinking.' },
  { id: 'materials',    name: 'Material & Fabrication Futures', icon: Layers,   color: 'text-amber-700',   barColor: 'bg-amber-600',   subthemes: ['Biomaterials', 'Digital Fabrication'],                                                desc: 'Examines new biomaterials and advanced digital fabrication techniques.' },
  { id: 'digital',      name: 'Computation & Data',             icon: Monitor,  color: 'text-blue-700',    barColor: 'bg-blue-600',    subthemes: ['AI', 'Simulation', 'Parametric Design', 'Geospatial Analysis'],                      desc: 'Uses software, AI, simulation, and parametric design to solve architectural problems.' },
  { id: 'society',      name: 'Society, Ethics & Politics',     icon: Users,    color: 'text-rose-700',    barColor: 'bg-rose-600',    subthemes: ['Justice', 'Participation', 'Governance', 'Housing'],                                 desc: 'Focuses on social justice, participation, governance, and housing dynamics.' },
  { id: 'globalization',name: 'Globalization & Cultural Context',icon: Globe,   color: 'text-indigo-700',  barColor: 'bg-indigo-600',  subthemes: ['Identity', 'Regionalism', 'Migration', 'Indigenous Knowledge'],                      desc: 'Looks at identity, regionalism, migration, and indigenous knowledge systems.' },
  { id: 'human',        name: 'Human Experience',               icon: User,     color: 'text-pink-700',    barColor: 'bg-pink-600',    subthemes: ['Perception', 'Wellbeing', 'Spatial Experience', 'Ergonomics'],                       desc: 'Studies perception, wellbeing, spatial experience, and ergonomics.' },
  { id: 'history',      name: 'History, Theory & Criticism',    icon: Library,  color: 'text-stone-700',   barColor: 'bg-stone-600',   subthemes: ['Architectural History', 'Critical Theory', 'Discourse'],                             desc: 'Explores architectural history, critical theory, and academic discourse.' },
  { id: 'media',        name: 'Representation & Media',         icon: PenTool,  color: 'text-violet-700',  barColor: 'bg-violet-600',  subthemes: ['Drawing', 'Visualization', 'Narrative', 'Aesthetics'],                               desc: 'Focuses on drawing, visualization, narrative, and aesthetics.' },
  { id: 'practice',     name: 'Practice, Economics & Delivery', icon: Briefcase,color: 'text-orange-700',  barColor: 'bg-orange-600',  subthemes: ['Procurement', 'Development', 'Professional Practice'],                               desc: 'Covers procurement, development, and the realities of professional practice.' },
  { id: 'heritage',     name: 'Heritage & Transformation',      icon: Landmark, color: 'text-teal-700',    barColor: 'bg-teal-600',    subthemes: ['Conservation', 'Adaptive Reuse', 'Cultural Continuity'],                             desc: 'Addresses conservation, adaptive reuse, and cultural continuity.' },
  { id: 'pedagogy',     name: 'Pedagogy & Research Methods',    icon: BookOpen, color: 'text-purple-700',  barColor: 'bg-purple-600',  subthemes: ['Design Research', 'Interdisciplinary Methods', 'Knowledge Production'],              desc: 'Explores new ways to study, working in diverse teams, and creating alternative forms of knowledge.' },
];

const programmes = [
  { id: 'sed',  name: 'Sustainable Environmental Design',  awards: 'MSc / MArch',  scores: { climate: 5, digital: 4, pedagogy: 2 }, subthemes: ['Environmental Performance', 'Carbon', 'Simulation'],                               desc: 'Looks at how buildings perform environmentally, aiming to lower carbon emissions using simulation tools.' },
  { id: 'etd',  name: 'Emergent Technologies and Design',  awards: 'MSc / MArch',  scores: { climate: 4, digital: 5, pedagogy: 4 }, subthemes: ['Environmental Performance', 'Resilience', 'Ecosystems', 'Parametric Design', 'Design Research'], desc: 'Combines local ecosystems with digital parametric models and practice-led research.' },
  { id: 'lu',   name: 'Landscape Urbanism',                awards: 'MSc / MArch',  scores: { climate: 4, digital: 5, pedagogy: 2 }, subthemes: ['Ecosystems', 'Simulation', 'Geospatial Analysis'],                                 desc: 'Explores ecosystems and landscapes using computer simulations and geographic mapping (GIS).' },
  { id: 'hu',   name: 'Housing and Urbanism',              awards: 'MA / MArch',   scores: { climate: 4, digital: 1, pedagogy: 3 }, subthemes: ['Resilience'],                                                                        desc: 'Investigates how cities are built and how to make them resilient.' },
  { id: 'cr',   name: 'Conservation and Reuse',            awards: 'MA / PGDip',   scores: { climate: 5, digital: 2, pedagogy: 2 }, subthemes: ['Carbon'],                                                                           desc: 'Focuses on measuring and reducing the carbon footprint of existing buildings.' },
  { id: 'drl',  name: 'Architecture and Urbanism (DRL)',   awards: 'MArch',        scores: { climate: 1, digital: 5, pedagogy: 2 }, subthemes: ['Parametric Design'],                                                                desc: 'Explores rule-based digital modeling and advanced fabrication techniques.' },
  { id: 'pc',   name: 'Projective Cities',                 awards: 'Taught MPhil', scores: { climate: 2, digital: 1, pedagogy: 5 }, subthemes: ['Design Research'],                                                                  desc: 'Aims to foster hands-on, practice-led design research.' },
  { id: 'spd',  name: 'Spatial Performance and Design',    awards: 'MA / MFA',     scores: { climate: 1, digital: 2, pedagogy: 5 }, subthemes: ['Interdisciplinary Methods'],                                                         desc: 'Focuses on working collaboratively in professional, multi-disciplinary teams.' },
  { id: 'hct',  name: 'History and Critical Thinking',     awards: 'MA',           scores: { climate: 1, digital: 1, pedagogy: 5 }, subthemes: ['Interdisciplinary Methods', 'Knowledge Production'],                               desc: 'Looks at alternative ways to create and share architectural knowledge.' },
];

const benchmarkData = [
  { region: 'United States', institutions: 'Harvard GSD · MIT · Columbia GSAPP', aaAdvantage: 'The AA offers a more extreme, specialized focus. AA programmes like DRL and Emergent Tech act like highly focused research labs. The AA is more practice-led, while US schools are deeply tied to traditional university academia.', sharedFocus: ['Computation & Data', 'History, Theory & Criticism', 'Systems & Urban Scale'] },
  { region: 'Europe (EU)',   institutions: 'ETH Zurich · TU Delft · Politecnico di Milano', aaAdvantage: 'EU schools excel heavily in large-scale engineering (ETH) and broad urban planning (TU Delft). The AA stands out by combining this technical rigor with radical design theory and highly experimental aesthetics.', sharedFocus: ['Material & Fabrication Futures', 'Climate & Ecology', 'Heritage & Transformation'] },
  { region: 'United Kingdom',institutions: 'UCL Bartlett · Cambridge · RCA', aaAdvantage: 'The AA operates outside the standard UK university system, giving it unmatched freedom to update its curriculum quickly. The AA pushes harder on independent, agenda-driven studio culture than any peer institution.', sharedFocus: ['Pedagogy & Research Methods', 'Representation & Media', 'Society, Ethics & Politics'] },
];

const navItems = [
  { id: 'themes',       label: 'By Theme' },
  { id: 'programmes',   label: 'By Programme' },
  { id: 'gaps',         label: 'Gap Analysis' },
  { id: 'trends',       label: 'Trends' },
  { id: 'benchmarking', label: 'Benchmarking' },
];

/* ─── Shared primitives ─────────────────────────────────────────────── */

const ScoreBar = ({ score }) => (
  <div className="flex items-center gap-2">
    <div className="flex gap-px">
      {[1, 2, 3, 4, 5].map(v => (
        <div key={v} style={{ width: 18, height: 3, backgroundColor: v <= score ? '#1a1d14' : '#e2e4d5' }} />
      ))}
    </div>
    <span className="font-label tabular-nums" style={{ fontSize: 10, color: '#446277' }}>{score}/5</span>
  </div>
);

const Tag = ({ active, children }) => (
  <span
    className="font-label font-medium"
    style={{
      fontSize: 10,
      padding: '2px 8px',
      backgroundColor: active ? '#c7e6ff' : '#e2e4d5',
      color: active ? '#1a1d14' : '#446277',
      display: 'inline-flex',
      alignItems: 'center',
    }}
  >
    {active ? `✓ ${children}` : `✕ ${children}`}
  </span>
);

const SectionLabel = ({ children, light = false }) => (
  <p
    className="font-label font-bold uppercase"
    style={{ fontSize: 9, letterSpacing: '0.18em', color: light ? 'rgba(26,29,20,0.35)' : '#446277', marginBottom: 20 }}
  >
    {children}
  </p>
);

/* ─── App ───────────────────────────────────────────────────────────── */

export default function App() {
  const [viewMode, setViewMode] = useState('benchmarking');
  const [selectedTheme, setSelectedTheme] = useState(themes[0]);
  const [selectedProgramme, setSelectedProgramme] = useState(programmes[0]);

  const themeStats = themes.map(theme => {
    const scored = programmes.filter(p => p.scores[theme.id]);
    const avg = scored.length ? scored.reduce((s, p) => s + p.scores[theme.id], 0) / programmes.length : 0;
    return { ...theme, avgScore: avg, hasData: scored.length > 0 };
  }).sort((a, b) => b.avgScore - a.avgScore);

  const evaluatedStats   = themeStats.filter(t => t.hasData);
  const unevaluatedStats = themeStats.filter(t => !t.hasData);

  const subthemeCounts = {};
  programmes.forEach(p => p.subthemes.forEach(st => { subthemeCounts[st] = (subthemeCounts[st] || 0) + 1; }));
  const topSubthemes = Object.entries(subthemeCounts).sort((a, b) => b[1] - a[1]).slice(0, 10);

  return (
    <div className="blueprint-grid min-h-screen">

      {/* ── Header ── */}
      <header style={{ backgroundColor: '#000000', position: 'sticky', top: 0, zIndex: 10 }}>
        <div style={{ maxWidth: 1024, margin: '0 auto', padding: '20px 24px 0' }}>

          {/* Brand row */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <div style={{ width: 36, height: 36, backgroundColor: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, overflow: 'hidden' }}>
                <img src={`${import.meta.env.BASE_URL}AA.png`} alt="AA" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
              </div>
              <div>
                <h1 style={{ color: '#ffffff', fontWeight: 700, fontSize: 15, lineHeight: 1.2, letterSpacing: '-0.02em', margin: 0 }}>
                  Postgraduate Programme Analysis
                </h1>
                <p className="font-label" style={{ color: 'rgba(255,255,255,0.3)', fontSize: 9, letterSpacing: '0.18em', textTransform: 'uppercase', marginTop: 4 }}>
                  Architectural Association School of Architecture
                </p>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
              <div style={{ textAlign: 'right' }}>
                <div style={{ color: '#ffffff', fontWeight: 700, fontSize: 22, lineHeight: 1, fontVariantNumeric: 'tabular-nums' }}>{programmes.length}</div>
                <div className="font-label" style={{ color: 'rgba(255,255,255,0.3)', fontSize: 9, letterSpacing: '0.18em', textTransform: 'uppercase', marginTop: 3 }}>Programmes</div>
              </div>
              <div style={{ width: 1, height: 28, backgroundColor: 'rgba(255,255,255,0.1)' }} />
              <div style={{ textAlign: 'right' }}>
                <div style={{ color: '#ffffff', fontWeight: 700, fontSize: 22, lineHeight: 1, fontVariantNumeric: 'tabular-nums' }}>{themes.length}</div>
                <div className="font-label" style={{ color: 'rgba(255,255,255,0.3)', fontSize: 9, letterSpacing: '0.18em', textTransform: 'uppercase', marginTop: 3 }}>Themes</div>
              </div>
            </div>
          </div>

          {/* Nav tabs */}
          <div style={{ display: 'flex', gap: 2 }}>
            {navItems.map(({ id, label }) => {
              const active = viewMode === id;
              return (
                <button
                  key={id}
                  onClick={() => setViewMode(id)}
                  className="font-label"
                  style={{
                    padding: '9px 16px',
                    fontSize: 11,
                    fontWeight: active ? 700 : 500,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    cursor: 'pointer',
                    border: 'none',
                    transition: 'background 0.1s, color 0.1s',
                    backgroundColor: active ? '#ffffff' : 'transparent',
                    color: active ? '#000000' : 'rgba(255,255,255,0.38)',
                  }}
                  onMouseEnter={e => { if (!active) { e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.color = 'rgba(255,255,255,0.75)'; } }}
                  onMouseLeave={e => { if (!active) { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = 'rgba(255,255,255,0.38)'; } }}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>
        {/* Blueprint cyan rule */}
        <div style={{ height: 2, backgroundColor: '#c7e6ff', marginTop: 0 }} />
      </header>

      {/* ── Main ── */}
      <main style={{ maxWidth: 1024, margin: '0 auto', padding: '32px 24px' }}>

        {/* ── Benchmarking ── */}
        {viewMode === 'benchmarking' && (
          <div>
            {/* Global Positioning card */}
            <div style={{ backgroundColor: '#ffffff', padding: '48px', boxShadow: '0 30px 60px rgba(26,29,20,0.05)', marginBottom: 0 }}>
              <SectionLabel>Global Positioning</SectionLabel>
              <h2 style={{ fontSize: 28, fontWeight: 700, color: '#1a1d14', letterSpacing: '-0.03em', margin: '0 0 10px' }}>
                How the AA Compares Globally
              </h2>
              <p style={{ fontSize: 14, color: 'rgba(26,29,20,0.55)', lineHeight: 1.7, marginBottom: 40, maxWidth: 560 }}>
                A comparative analysis of the AA's postgraduate programmes against world-leading architecture schools, by region.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
                {benchmarkData.map((data, i) => {
                  const topColors = ['#000000', '#446277', '#c7e6ff'];
                  return (
                    <div key={data.region} style={{ backgroundColor: '#f9fbec', borderTop: `4px solid ${topColors[i]}`, padding: 20, display: 'flex', flexDirection: 'column' }}>
                      <div className="font-label" style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#1a1d14', marginBottom: 4 }}>
                        {data.region}
                      </div>
                      <div className="font-label" style={{ fontSize: 11, color: 'rgba(26,29,20,0.4)', marginBottom: 20 }}>
                        {data.institutions}
                      </div>
                      <div style={{ flex: 1, marginBottom: 20 }}>
                        <div className="font-label" style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(26,29,20,0.3)', marginBottom: 8 }}>
                          AA Advantage
                        </div>
                        <p style={{ fontSize: 13, color: 'rgba(26,29,20,0.75)', lineHeight: 1.7 }}>{data.aaAdvantage}</p>
                      </div>
                      <div>
                        <div className="font-label" style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(26,29,20,0.3)', marginBottom: 8 }}>
                          Shared Focus
                        </div>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                          {data.sharedFocus.map(focus => {
                            const t = themes.find(th => th.name === focus);
                            return (
                              <span key={focus} className={`font-label font-medium ${t ? t.color : ''}`}
                                style={{ fontSize: 10, padding: '3px 8px', backgroundColor: '#ffffff', display: 'inline-block' }}>
                                {focus}
                              </span>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Key Takeaways — background shift, no border */}
            <div style={{ backgroundColor: '#e2e4d5', padding: '48px' }}>
              <SectionLabel light>Key Takeaways</SectionLabel>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 40 }}>
                {[
                  { n: '01', title: 'World-Class Computation', body: 'DRL and Emergent Technologies match or exceed MIT and ETH Zurich in digital fabrication and parametric design output.' },
                  { n: '02', title: 'Applied Sustainability',  body: 'Where EU schools treat it as large-scale engineering, the AA (via SED) focuses on simulation-led practice tools for direct real-world impact.' },
                  { n: '03', title: 'Independent Pedagogy',   body: "Free from traditional university structures, the AA's curriculum adapts far faster to emerging technologies such as AI." },
                ].map(({ n, title, body }) => (
                  <div key={n}>
                    <div className="font-label" style={{ fontSize: 36, fontWeight: 700, color: 'rgba(26,29,20,0.12)', lineHeight: 1, marginBottom: 12, fontVariantNumeric: 'tabular-nums' }}>{n}</div>
                    <p style={{ fontSize: 14, fontWeight: 700, color: '#1a1d14', marginBottom: 8 }}>{title}</p>
                    <p style={{ fontSize: 13, color: 'rgba(26,29,20,0.55)', lineHeight: 1.7 }}>{body}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── Gap Analysis ── */}
        {viewMode === 'gaps' && (
          <div style={{ backgroundColor: '#ffffff', boxShadow: '0 30px 60px rgba(26,29,20,0.05)', overflow: 'hidden' }}>
            <div style={{ backgroundColor: '#e2e4d5', padding: '24px 32px' }}>
              <SectionLabel light>Curriculum Coverage</SectionLabel>
              <h2 style={{ fontSize: 22, fontWeight: 700, color: '#1a1d14', letterSpacing: '-0.02em', margin: 0 }}>Gap Analysis Matrix</h2>
              <p style={{ fontSize: 13, color: 'rgba(26,29,20,0.5)', marginTop: 6, lineHeight: 1.6 }}>Subthemes not covered by each programme are flagged below.</p>
            </div>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', minWidth: 900, borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ backgroundColor: '#f9fbec' }}>
                    <th style={{ padding: '14px 20px', textAlign: 'left' }}>
                      <span className="font-label" style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#446277' }}>Programme</span>
                    </th>
                    {themes.map(theme => (
                      <th key={theme.id} style={{ padding: '14px 10px', textAlign: 'left' }}>
                        <span className={`font-label ${theme.color}`} style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>{theme.name}</span>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {programmes.map((prog, i) => (
                    <tr key={prog.id} style={{ backgroundColor: i % 2 === 0 ? '#ffffff' : '#f9fbec' }}>
                      <td style={{ padding: '14px 20px', verticalAlign: 'top' }}>
                        <div style={{ fontWeight: 700, fontSize: 13, color: '#1a1d14', whiteSpace: 'nowrap' }}>{prog.name}</div>
                        <div className="font-label" style={{ fontSize: 10, color: '#446277', marginTop: 2 }}>{prog.awards}</div>
                      </td>
                      {themes.map(theme => {
                        const missing = theme.subthemes.filter(st => !prog.subthemes.includes(st));
                        return (
                          <td key={theme.id} style={{ padding: '12px 10px', verticalAlign: 'top' }}>
                            {missing.length === 0 ? (
                              <span className="font-label" style={{ fontSize: 10, fontWeight: 600, color: '#1a1d14', backgroundColor: '#c7e6ff', padding: '2px 8px', display: 'inline-block' }}>✓ Full</span>
                            ) : (
                              <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                                {missing.map(st => (
                                  <span key={st} className="font-label" style={{ fontSize: 10, fontWeight: 500, color: '#446277', backgroundColor: '#e2e4d5', padding: '2px 8px', whiteSpace: 'nowrap', display: 'inline-block' }}>
                                    ✕ {st}
                                  </span>
                                ))}
                              </div>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ── Trends ── */}
        {viewMode === 'trends' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>

            {/* Theme Strength */}
            <div style={{ backgroundColor: '#ffffff', padding: '40px', boxShadow: '0 30px 60px rgba(26,29,20,0.05)' }}>
              <SectionLabel>Theme Strength</SectionLabel>
              <h2 style={{ fontSize: 22, fontWeight: 700, color: '#1a1d14', letterSpacing: '-0.02em', margin: '0 0 6px' }}>Dominant Themes</h2>
              <p style={{ fontSize: 13, color: 'rgba(26,29,20,0.45)', lineHeight: 1.6, marginBottom: 32 }}>Average programme score, 0–5 scale.</p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                {evaluatedStats.map(stat => {
                  const Icon = stat.icon;
                  const pct = (stat.avgScore / 5) * 100;
                  return (
                    <div key={stat.id}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, fontWeight: 500, color: '#1a1d14' }}>
                          <Icon size={13} className={stat.color} />
                          {stat.name}
                        </span>
                        <span style={{ fontSize: 13, fontWeight: 700, color: '#1a1d14', fontVariantNumeric: 'tabular-nums' }}>{stat.avgScore.toFixed(1)}</span>
                      </div>
                      <div style={{ height: 3, backgroundColor: '#e2e4d5', position: 'relative' }}>
                        <div className={stat.barColor} style={{ position: 'absolute', inset: 0, right: `${100 - pct}%` }} />
                      </div>
                    </div>
                  );
                })}
              </div>

              {unevaluatedStats.length > 0 && (
                <div style={{ marginTop: 32, paddingTop: 24, borderTop: '1px solid #e2e4d5' }}>
                  <div className="font-label" style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(26,29,20,0.25)', marginBottom: 10 }}>
                    Not Evaluated in Current Dataset
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                    {unevaluatedStats.map(t => {
                      const Icon = t.icon;
                      return (
                        <span key={t.id} className="font-label" style={{ fontSize: 10, padding: '3px 8px', backgroundColor: '#f9fbec', color: 'rgba(26,29,20,0.35)', display: 'inline-flex', alignItems: 'center', gap: 5 }}>
                          <Icon size={10} />
                          {t.name}
                        </span>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Top Subthemes */}
            <div style={{ backgroundColor: '#ffffff', padding: '40px', boxShadow: '0 30px 60px rgba(26,29,20,0.05)' }}>
              <SectionLabel>Subtheme Frequency</SectionLabel>
              <h2 style={{ fontSize: 22, fontWeight: 700, color: '#1a1d14', letterSpacing: '-0.02em', margin: '0 0 6px' }}>Top Subthemes</h2>
              <p style={{ fontSize: 13, color: 'rgba(26,29,20,0.45)', lineHeight: 1.6, marginBottom: 32 }}>Programmes that explicitly cover each focus area.</p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {topSubthemes.map(([name, count], i) => {
                  const pct = (count / programmes.length) * 100;
                  return (
                    <div key={name} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <span className="font-label" style={{ width: 20, fontSize: 10, fontWeight: 700, color: 'rgba(26,29,20,0.2)', textAlign: 'right', flexShrink: 0, fontVariantNumeric: 'tabular-nums' }}>{i + 1}</span>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 5 }}>
                          <span style={{ fontSize: 13, fontWeight: 500, color: '#1a1d14', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{name}</span>
                          <span className="font-label" style={{ fontSize: 10, color: '#446277', marginLeft: 8, flexShrink: 0 }}>{count}/{programmes.length}</span>
                        </div>
                        <div style={{ height: 2, backgroundColor: '#e2e4d5', position: 'relative' }}>
                          <div style={{ position: 'absolute', inset: 0, right: `${100 - pct}%`, backgroundColor: '#446277' }} />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* ── Browse: Theme / Programme ── */}
        {(viewMode === 'themes' || viewMode === 'programmes') && (
          <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: 16 }}>

            {/* Sidebar — recessed (surface-container-highest) */}
            <div style={{ backgroundColor: '#e2e4d5', height: 660, display: 'flex', overflow: 'hidden' }}>
              {/* Vertical editorial label */}
              <div style={{ width: 32, backgroundColor: '#1a1d14', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <span className="font-label text-vertical" style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)' }}>
                  {viewMode === 'themes' ? 'Themes' : 'Programmes'}
                </span>
              </div>
              {/* List */}
              <div style={{ flex: 1, overflowY: 'auto', padding: '8px 6px' }}>
                {viewMode === 'themes' ? themes.map(theme => {
                  const Icon = theme.icon;
                  const active = selectedTheme.id === theme.id;
                  return (
                    <button
                      key={theme.id}
                      onClick={() => setSelectedTheme(theme)}
                      style={{
                        width: '100%', textAlign: 'left', padding: '10px 12px',
                        display: 'flex', alignItems: 'center', gap: 10,
                        backgroundColor: active ? '#ffffff' : 'transparent',
                        border: 'none', cursor: 'pointer',
                        marginBottom: 2, transition: 'background 0.1s',
                      }}
                      onMouseEnter={e => { if (!active) e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.4)'; }}
                      onMouseLeave={e => { if (!active) e.currentTarget.style.backgroundColor = 'transparent'; }}
                    >
                      <Icon size={13} className={active ? theme.color : 'text-[#446277] opacity-60'} style={{ flexShrink: 0 }} />
                      <span style={{ fontSize: 12, fontWeight: active ? 700 : 500, color: active ? '#1a1d14' : 'rgba(26,29,20,0.6)', lineHeight: 1.3 }}>
                        {theme.name}
                      </span>
                    </button>
                  );
                }) : programmes.map(prog => {
                  const active = selectedProgramme.id === prog.id;
                  return (
                    <button
                      key={prog.id}
                      onClick={() => setSelectedProgramme(prog)}
                      style={{
                        width: '100%', textAlign: 'left', padding: '10px 12px',
                        backgroundColor: active ? '#000000' : 'transparent',
                        border: 'none', cursor: 'pointer',
                        marginBottom: 2, transition: 'background 0.1s',
                      }}
                      onMouseEnter={e => { if (!active) e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.4)'; }}
                      onMouseLeave={e => { if (!active) e.currentTarget.style.backgroundColor = 'transparent'; }}
                    >
                      <span style={{ display: 'block', fontSize: 12, fontWeight: active ? 700 : 500, color: active ? '#ffffff' : 'rgba(26,29,20,0.65)', lineHeight: 1.3 }}>
                        {prog.name}
                      </span>
                      <span className="font-label" style={{ display: 'block', fontSize: 10, color: active ? 'rgba(255,255,255,0.45)' : '#446277', marginTop: 2 }}>
                        {prog.awards}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Detail panel — highlighted (surface-container-lowest) */}
            <div style={{ backgroundColor: '#ffffff', height: 660, overflowY: 'auto', padding: '40px 40px', boxShadow: '0 30px 60px rgba(26,29,20,0.05)' }}>

              {viewMode === 'themes' ? (
                <div>
                  {/* Theme header */}
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 20, paddingBottom: 28, marginBottom: 32, borderBottom: '1px solid #e2e4d5' }}>
                    <div style={{ padding: 14, backgroundColor: '#f9fbec', flexShrink: 0 }}>
                      <selectedTheme.icon size={28} className={selectedTheme.color} />
                    </div>
                    <div>
                      <h2 style={{ fontSize: 22, fontWeight: 700, color: '#1a1d14', letterSpacing: '-0.02em', margin: '0 0 8px' }}>
                        {selectedTheme.name}
                      </h2>
                      <p style={{ fontSize: 13, color: 'rgba(26,29,20,0.55)', lineHeight: 1.7, margin: '0 0 14px' }}>
                        {selectedTheme.desc}
                      </p>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                        {selectedTheme.subthemes.map(st => (
                          <span key={st} className="font-label font-medium" style={{ fontSize: 10, padding: '3px 8px', backgroundColor: '#c7e6ff', color: '#1a1d14' }}>{st}</span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <SectionLabel>Programme Relevance</SectionLabel>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {[...programmes]
                      .sort((a, b) => (b.scores[selectedTheme.id] || 0) - (a.scores[selectedTheme.id] || 0))
                      .map(prog => {
                        const score = prog.scores[selectedTheme.id] || 0;
                        const prominent = score >= 3;
                        return (
                          <div key={prog.id} style={{ padding: 16, backgroundColor: prominent ? '#f9fbec' : '#ffffff', opacity: prominent ? 1 : 0.5 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
                              <div style={{ marginRight: 12 }}>
                                <h4 style={{ fontWeight: 700, fontSize: 13, color: '#1a1d14', margin: '0 0 4px' }}>{prog.name}</h4>
                                {prominent && <p style={{ fontSize: 12, color: 'rgba(26,29,20,0.5)', lineHeight: 1.6, margin: 0 }}>{prog.desc}</p>}
                              </div>
                              <span className="font-label" style={{ fontSize: 10, color: '#446277', backgroundColor: '#e2e4d5', padding: '3px 8px', flexShrink: 0 }}>{prog.awards}</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
                              <ScoreBar score={score} />
                              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
                                {selectedTheme.subthemes.map(st => (
                                  <Tag key={st} active={prog.subthemes.includes(st)}>{st}</Tag>
                                ))}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </div>
              ) : (
                <div>
                  {/* Programme header */}
                  <div style={{ paddingBottom: 28, marginBottom: 32, borderBottom: '1px solid #e2e4d5' }}>
                    <span className="font-label font-bold" style={{ fontSize: 9, letterSpacing: '0.18em', textTransform: 'uppercase', backgroundColor: '#e2e4d5', color: '#446277', padding: '4px 10px', display: 'inline-block', marginBottom: 16 }}>
                      {selectedProgramme.awards}
                    </span>
                    <h2 style={{ fontSize: 26, fontWeight: 700, color: '#1a1d14', letterSpacing: '-0.03em', margin: '0 0 10px' }}>
                      {selectedProgramme.name}
                    </h2>
                    <p style={{ fontSize: 14, color: 'rgba(26,29,20,0.55)', lineHeight: 1.7, margin: 0 }}>{selectedProgramme.desc}</p>
                  </div>

                  <SectionLabel>Theme Coverage</SectionLabel>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {themes.map(theme => {
                      const score = selectedProgramme.scores[theme.id] || 0;
                      const Icon = theme.icon;
                      const prominent = score >= 3;
                      return (
                        <div key={theme.id} style={{ padding: '14px 16px', backgroundColor: prominent ? '#f9fbec' : '#ffffff', display: 'flex', alignItems: 'flex-start', gap: 14, opacity: prominent ? 1 : 0.45 }}>
                          <div style={{ width: 30, height: 30, backgroundColor: prominent ? '#e2e4d5' : '#f9fbec', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                            <Icon size={14} className={prominent ? theme.color : ''} style={{ color: prominent ? undefined : 'rgba(26,29,20,0.3)' }} />
                          </div>
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                              <h4 className={prominent ? theme.color : ''} style={{ fontWeight: 700, fontSize: 13, margin: 0, color: prominent ? undefined : 'rgba(26,29,20,0.4)' }}>{theme.name}</h4>
                              <ScoreBar score={score} />
                            </div>
                            {prominent && <p style={{ fontSize: 12, color: 'rgba(26,29,20,0.5)', lineHeight: 1.6, margin: '0 0 10px' }}>{theme.desc}</p>}
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
                              {theme.subthemes.map(st => (
                                <Tag key={st} active={selectedProgramme.subthemes.includes(st)}>{st}</Tag>
                              ))}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
