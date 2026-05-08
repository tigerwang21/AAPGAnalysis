import React, { useState } from 'react';
import { Leaf, Monitor, BookOpen, LayoutGrid, Network, Layers, Users, Globe, User, Library, PenTool, Briefcase, Landmark, TrendingUp, Trophy, MapPin, ChevronRight } from 'lucide-react';

const themes = [
  { id: 'climate', name: 'Climate & Ecology', icon: Leaf, color: 'text-emerald-600', bg: 'bg-emerald-50', barColor: 'bg-emerald-500', desc: 'Focuses on the environment, reducing carbon, ecosystems, and building resilience against climate change.', subthemes: ['Environmental Performance', 'Resilience', 'Carbon', 'Ecosystems'] },
  { id: 'systems', name: 'Systems & Urban Scale', icon: Network, color: 'text-cyan-600', bg: 'bg-cyan-50', barColor: 'bg-cyan-500', desc: 'Explores infrastructure, urban science, and circular regional thinking.', subthemes: ['Infrastructure', 'Urban Science', 'Regional Thinking', 'Circularity'] },
  { id: 'materials', name: 'Material & Fabrication Futures', icon: Layers, color: 'text-amber-600', bg: 'bg-amber-50', barColor: 'bg-amber-500', desc: 'Examines new biomaterials and advanced digital fabrication techniques.', subthemes: ['Biomaterials', 'Digital Fabrication'] },
  { id: 'digital', name: 'Computation & Data', icon: Monitor, color: 'text-blue-600', bg: 'bg-blue-50', barColor: 'bg-blue-500', desc: 'Uses software, AI, simulation, and parametric design to solve architectural problems.', subthemes: ['AI', 'Simulation', 'Parametric Design', 'Geospatial Analysis'] },
  { id: 'society', name: 'Society, Ethics & Politics', icon: Users, color: 'text-rose-600', bg: 'bg-rose-50', barColor: 'bg-rose-500', desc: 'Focuses on social justice, participation, governance, and housing dynamics.', subthemes: ['Justice', 'Participation', 'Governance', 'Housing'] },
  { id: 'globalization', name: 'Globalization & Cultural Context', icon: Globe, color: 'text-indigo-600', bg: 'bg-indigo-50', barColor: 'bg-indigo-500', desc: 'Looks at identity, regionalism, migration, and indigenous knowledge systems.', subthemes: ['Identity', 'Regionalism', 'Migration', 'Indigenous Knowledge'] },
  { id: 'human', name: 'Human Experience', icon: User, color: 'text-pink-600', bg: 'bg-pink-50', barColor: 'bg-pink-500', desc: 'Studies perception, wellbeing, spatial experience, and ergonomics.', subthemes: ['Perception', 'Wellbeing', 'Spatial Experience', 'Ergonomics'] },
  { id: 'history', name: 'History, Theory & Criticism', icon: Library, color: 'text-stone-600', bg: 'bg-stone-50', barColor: 'bg-stone-500', desc: 'Explores architectural history, critical theory, and academic discourse.', subthemes: ['Architectural History', 'Critical Theory', 'Discourse'] },
  { id: 'media', name: 'Representation & Media', icon: PenTool, color: 'text-violet-600', bg: 'bg-violet-50', barColor: 'bg-violet-500', desc: 'Focuses on drawing, visualization, narrative, and aesthetics.', subthemes: ['Drawing', 'Visualization', 'Narrative', 'Aesthetics'] },
  { id: 'practice', name: 'Practice, Economics & Delivery', icon: Briefcase, color: 'text-orange-600', bg: 'bg-orange-50', barColor: 'bg-orange-500', desc: 'Covers procurement, development, and the realities of professional practice.', subthemes: ['Procurement', 'Development', 'Professional Practice'] },
  { id: 'heritage', name: 'Heritage & Transformation', icon: Landmark, color: 'text-teal-600', bg: 'bg-teal-50', barColor: 'bg-teal-500', desc: 'Addresses conservation, adaptive reuse, and cultural continuity.', subthemes: ['Conservation', 'Adaptive Reuse', 'Cultural Continuity'] },
  { id: 'pedagogy', name: 'Pedagogy & Research Methods', icon: BookOpen, color: 'text-purple-600', bg: 'bg-purple-50', barColor: 'bg-purple-500', desc: 'Explores new ways to study, working in diverse teams, and creating alternative forms of knowledge.', subthemes: ['Design Research', 'Interdisciplinary Methods', 'Knowledge Production'] },
];

const programmes = [
  { id: 'sed', name: 'Sustainable Environmental Design', awards: 'MSc / MArch', scores: { climate: 5, digital: 4, pedagogy: 2 }, themes: ['climate', 'digital'], subthemes: ['Environmental Performance', 'Carbon', 'Simulation'], desc: 'Looks at how buildings perform environmentally, aiming to lower carbon emissions using simulation tools.' },
  { id: 'etd', name: 'Emergent Technologies and Design', awards: 'MSc / MArch', scores: { climate: 4, digital: 5, pedagogy: 4 }, themes: ['climate', 'digital', 'pedagogy'], subthemes: ['Environmental Performance', 'Resilience', 'Ecosystems', 'Parametric Design', 'Design Research'], desc: 'Combines local ecosystems with digital parametric models and practice-led research.' },
  { id: 'lu', name: 'Landscape Urbanism', awards: 'MSc / MArch', scores: { climate: 4, digital: 5, pedagogy: 2 }, themes: ['climate', 'digital'], subthemes: ['Ecosystems', 'Simulation', 'Geospatial Analysis'], desc: 'Explores ecosystems and landscapes using computer simulations and geographic mapping (GIS).' },
  { id: 'hu', name: 'Housing and Urbanism', awards: 'MA / MArch', scores: { climate: 4, digital: 1, pedagogy: 3 }, themes: ['climate'], subthemes: ['Resilience'], desc: 'Investigates how cities are built and how to make them resilient.' },
  { id: 'cr', name: 'Conservation and Reuse', awards: 'MA / PGDip', scores: { climate: 5, digital: 2, pedagogy: 2 }, themes: ['climate'], subthemes: ['Carbon'], desc: 'Focuses on measuring and reducing the carbon footprint of existing buildings.' },
  { id: 'drl', name: 'Architecture and Urbanism (DRL)', awards: 'MArch', scores: { climate: 1, digital: 5, pedagogy: 2 }, themes: ['digital'], subthemes: ['Parametric Design'], desc: 'Explores rule-based digital modeling and advanced fabrication techniques.' },
  { id: 'pc', name: 'Projective Cities', awards: 'Taught MPhil', scores: { climate: 2, digital: 1, pedagogy: 5 }, themes: ['pedagogy'], subthemes: ['Design Research'], desc: 'Aims to foster hands-on, practice-led design research.' },
  { id: 'spd', name: 'Spatial Performance and Design', awards: 'MA / MFA', scores: { climate: 1, digital: 2, pedagogy: 5 }, themes: ['pedagogy'], subthemes: ['Interdisciplinary Methods'], desc: 'Focuses on working collaboratively in professional, multi-disciplinary teams.' },
  { id: 'hct', name: 'History and Critical Thinking', awards: 'MA', scores: { climate: 1, digital: 1, pedagogy: 5 }, themes: ['pedagogy'], subthemes: ['Interdisciplinary Methods', 'Knowledge Production'], desc: 'Looks at alternative ways to create and share architectural knowledge.' },
];

const benchmarkData = [
  { region: 'United States', institutions: 'Harvard GSD · MIT · Columbia GSAPP', accentClass: 'border-t-amber-400', aaAdvantage: 'The AA offers a more extreme, specialized focus. While US schools offer broad choices, AA programmes like DRL and Emergent Tech act like highly focused research labs. The AA is more practice-led, while US schools are deeply tied to traditional university academia.', sharedFocus: ['Computation & Data', 'History, Theory & Criticism', 'Systems & Urban Scale'] },
  { region: 'Europe (EU)', institutions: 'ETH Zurich · TU Delft · Politecnico di Milano', accentClass: 'border-t-indigo-400', aaAdvantage: 'EU schools excel heavily in large-scale engineering (ETH) and broad urban planning (TU Delft). The AA stands out by combining this technical rigor with radical design theory and highly experimental aesthetics.', sharedFocus: ['Material & Fabrication Futures', 'Climate & Ecology', 'Heritage & Transformation'] },
  { region: 'United Kingdom', institutions: 'UCL Bartlett · Cambridge · RCA', accentClass: 'border-t-rose-400', aaAdvantage: 'The AA operates outside the standard UK university system, giving it unmatched freedom to update its curriculum quickly. While the Bartlett shares a strong focus on digital tools, the AA pushes harder on independent, agenda-driven studio culture.', sharedFocus: ['Pedagogy & Research Methods', 'Representation & Media', 'Society, Ethics & Politics'] },
];

const navItems = [
  { id: 'themes', label: 'By Theme' },
  { id: 'programmes', label: 'By Programme' },
  { id: 'gaps', label: 'Gap Analysis', Icon: LayoutGrid },
  { id: 'trends', label: 'Trends', Icon: TrendingUp },
  { id: 'benchmarking', label: 'Benchmarking', Icon: Globe },
];

const ScoreBar = ({ score }) => (
  <div className="flex items-center gap-2">
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map(v => (
        <div key={v} className={`w-4 h-1.5 rounded-full ${v <= score ? 'bg-zinc-700' : 'bg-zinc-200'}`} />
      ))}
    </div>
    <span className="text-[11px] tabular-nums text-zinc-400 font-medium">{score}/5</span>
  </div>
);

const Tag = ({ active, children }) => (
  <span className={`inline-flex items-center text-[10px] px-2 py-0.5 rounded-full font-medium border ${
    active
      ? 'bg-emerald-50 text-emerald-700 border-emerald-100'
      : 'bg-rose-50 text-rose-500 border-rose-100'
  }`}>
    {active ? `✓ ${children}` : `✕ ${children}`}
  </span>
);

export default function App() {
  const [viewMode, setViewMode] = useState('benchmarking');
  const [selectedTheme, setSelectedTheme] = useState(themes[0]);
  const [selectedProgramme, setSelectedProgramme] = useState(programmes[0]);

  const themeStats = themes.map(theme => {
    const scores = programmes.map(p => p.scores[theme.id] || 0).filter(s => s > 0);
    const avgScore = scores.length ? scores.reduce((a, b) => a + b, 0) / programmes.length : 0;
    return { ...theme, avgScore, hasData: scores.length > 0 };
  }).sort((a, b) => b.avgScore - a.avgScore);

  const evaluatedStats = themeStats.filter(t => t.hasData);
  const unevaluatedStats = themeStats.filter(t => !t.hasData);

  const subthemeCounts = {};
  programmes.forEach(p => p.subthemes.forEach(st => { subthemeCounts[st] = (subthemeCounts[st] || 0) + 1; }));
  const topSubthemes = Object.entries(subthemeCounts).sort((a, b) => b[1] - a[1]).slice(0, 10);

  return (
    <div className="min-h-screen bg-[#F5F4F0] p-4 md:p-8 font-sans">
      <div className="max-w-5xl mx-auto space-y-4">

        {/* ── Header ── */}
        <header className="bg-zinc-950 rounded-2xl overflow-hidden shadow-xl">
          <div className="px-6 pt-6 pb-5">

            {/* Brand row */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shrink-0 shadow-sm">
                  <span className="text-zinc-950 font-black text-base tracking-tighter select-none">AA</span>
                </div>
                <div>
                  <h1 className="text-white font-semibold text-base leading-snug tracking-tight">
                    Postgraduate Programme Analysis
                  </h1>
                  <p className="text-zinc-500 text-xs mt-0.5">Architectural Association School of Architecture</p>
                </div>
              </div>
              <div className="hidden md:flex items-center gap-5">
                <div className="text-center">
                  <div className="text-white font-bold text-lg leading-none">{programmes.length}</div>
                  <div className="text-zinc-500 text-[10px] uppercase tracking-wider mt-0.5">Programmes</div>
                </div>
                <div className="w-px h-8 bg-zinc-800" />
                <div className="text-center">
                  <div className="text-white font-bold text-lg leading-none">{themes.length}</div>
                  <div className="text-zinc-500 text-[10px] uppercase tracking-wider mt-0.5">Themes</div>
                </div>
              </div>
            </div>

            {/* Nav tabs */}
            <div className="flex flex-wrap gap-1">
              {navItems.map(({ id, label, Icon }) => {
                const active = viewMode === id;
                return (
                  <button
                    key={id}
                    onClick={() => setViewMode(id)}
                    className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-150 ${
                      active
                        ? 'bg-white text-zinc-950 shadow-sm'
                        : 'text-zinc-400 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {Icon && <Icon size={13} />}
                    {label}
                  </button>
                );
              })}
            </div>
          </div>
        </header>

        {/* ── Benchmarking ── */}
        {viewMode === 'benchmarking' && (
          <div className="space-y-4">
            <div className="bg-white rounded-2xl shadow-sm ring-1 ring-black/[0.06] p-6 md:p-8">
              <div className="flex items-start gap-4 mb-8">
                <div className="w-11 h-11 rounded-xl bg-amber-50 flex items-center justify-center shrink-0">
                  <Trophy size={20} className="text-amber-500" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-zinc-900">Global Positioning</h2>
                  <p className="text-zinc-500 text-sm mt-1 leading-relaxed max-w-2xl">
                    How the AA's postgraduate programmes compare against world-leading architecture schools, broken down by region.
                  </p>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                {benchmarkData.map((data) => (
                  <div key={data.region} className={`bg-zinc-50 border border-zinc-200 border-t-[3px] ${data.accentClass} rounded-xl p-5 flex flex-col`}>
                    <div className="flex items-center gap-2 font-bold text-zinc-900 text-[15px] mb-0.5">
                      <MapPin size={14} className="text-zinc-400 shrink-0" />
                      {data.region}
                    </div>
                    <p className="text-[11px] text-zinc-400 mb-5 pl-5">{data.institutions}</p>

                    <div className="flex-1 mb-5">
                      <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-2">AA Advantage</p>
                      <p className="text-[13px] text-zinc-700 leading-relaxed">{data.aaAdvantage}</p>
                    </div>

                    <div>
                      <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-2">Shared Focus</p>
                      <div className="flex flex-wrap gap-1.5">
                        {data.sharedFocus.map(focus => {
                          const t = themes.find(th => th.name === focus);
                          return (
                            <span key={focus} className={`text-[10px] px-2.5 py-1 rounded-full bg-white border border-zinc-200 font-medium shadow-sm ${t ? t.color : 'text-zinc-600'}`}>
                              {focus}
                            </span>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Key Takeaways */}
            <div className="bg-white rounded-2xl shadow-sm ring-1 ring-black/[0.06] p-6 md:p-8">
              <p className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest mb-5">Key Takeaways</p>
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  { Icon: Monitor, bg: 'bg-blue-50', color: 'text-blue-600', title: 'World-Class Computation', body: 'DRL and Emergent Technologies match or exceed MIT and ETH Zurich in digital fabrication and parametric design output.' },
                  { Icon: Leaf, bg: 'bg-emerald-50', color: 'text-emerald-600', title: 'Applied Sustainability', body: 'Where EU schools approach it as large-scale engineering, the AA (via SED) focuses on simulation-led tools for immediate real-world impact.' },
                  { Icon: BookOpen, bg: 'bg-purple-50', color: 'text-purple-600', title: 'Independent Pedagogy', body: "Free from traditional university structures, the AA's curriculum adapts far faster to emerging technologies such as AI." },
                ].map(({ Icon, bg, color, title, body }) => (
                  <div key={title} className="flex gap-3.5">
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${bg}`}>
                      <Icon size={16} className={color} />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-zinc-900">{title}</p>
                      <p className="text-[13px] text-zinc-500 mt-1.5 leading-relaxed">{body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── Gap Analysis ── */}
        {viewMode === 'gaps' && (
          <div className="bg-white rounded-2xl shadow-sm ring-1 ring-black/[0.06] overflow-hidden">
            <div className="px-6 py-5 border-b border-zinc-100">
              <h2 className="text-lg font-bold text-zinc-900 flex items-center gap-2">
                <LayoutGrid size={17} className="text-rose-500" />
                Gap Analysis Matrix
              </h2>
              <p className="text-zinc-400 text-sm mt-1">Subthemes not covered by each programme are flagged below.</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[900px] text-left">
                <thead>
                  <tr className="bg-zinc-50 border-b border-zinc-100">
                    <th className="px-5 py-3.5 text-xs font-semibold text-zinc-500 whitespace-nowrap">Programme</th>
                    {themes.map(theme => (
                      <th key={theme.id} className={`px-3 py-3.5 text-[11px] font-semibold ${theme.color} whitespace-nowrap`}>{theme.name}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {programmes.map((prog, i) => (
                    <tr key={prog.id} className={`border-b border-zinc-50 transition-colors hover:bg-zinc-50/70 ${i % 2 === 0 ? '' : 'bg-zinc-50/30'}`}>
                      <td className="px-5 py-4 align-top">
                        <div className="font-semibold text-zinc-900 text-sm whitespace-nowrap">{prog.name}</div>
                        <div className="text-[11px] text-zinc-400 mt-0.5">{prog.awards}</div>
                      </td>
                      {themes.map(theme => {
                        const missing = theme.subthemes.filter(st => !prog.subthemes.includes(st));
                        return (
                          <td key={theme.id} className="px-3 py-4 align-top">
                            {missing.length === 0 ? (
                              <span className="text-[10px] font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100 whitespace-nowrap">
                                ✓ Full
                              </span>
                            ) : (
                              <div className="space-y-1">
                                {missing.map(st => (
                                  <div key={st} className="text-[10px] font-medium text-rose-500 bg-rose-50 px-2 py-1 rounded-md border border-rose-100 whitespace-nowrap">
                                    ✕ {st}
                                  </div>
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
          <div className="grid md:grid-cols-2 gap-4">

            {/* Theme strength chart */}
            <div className="bg-white rounded-2xl shadow-sm ring-1 ring-black/[0.06] p-6 md:p-8">
              <h2 className="text-lg font-bold text-zinc-900">Theme Strength</h2>
              <p className="text-zinc-400 text-sm mt-1 mb-7">Average programme score (0–5 scale)</p>

              <div className="space-y-4 mb-7">
                {evaluatedStats.map(stat => {
                  const Icon = stat.icon;
                  const pct = (stat.avgScore / 5) * 100;
                  return (
                    <div key={stat.id}>
                      <div className="flex justify-between items-center mb-1.5">
                        <span className="flex items-center gap-2 text-sm font-medium text-zinc-700">
                          <Icon size={13} className={stat.color} />
                          {stat.name}
                        </span>
                        <span className="text-sm font-bold text-zinc-900 tabular-nums">{stat.avgScore.toFixed(1)}</span>
                      </div>
                      <div className="relative h-2 bg-zinc-100 rounded-full overflow-hidden">
                        <div className={`absolute inset-y-0 left-0 ${stat.barColor} rounded-full transition-all duration-500`} style={{ width: `${pct}%` }} />
                      </div>
                    </div>
                  );
                })}
              </div>

              {unevaluatedStats.length > 0 && (
                <div className="pt-5 border-t border-zinc-100">
                  <p className="text-[10px] font-bold text-zinc-300 uppercase tracking-widest mb-2.5">Not scored in current data</p>
                  <div className="flex flex-wrap gap-1.5">
                    {unevaluatedStats.map(t => {
                      const Icon = t.icon;
                      return (
                        <span key={t.id} className="inline-flex items-center gap-1.5 text-[11px] px-2.5 py-1 rounded-full bg-zinc-50 border border-zinc-100 text-zinc-400">
                          <Icon size={11} />
                          {t.name}
                        </span>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Top subthemes */}
            <div className="bg-white rounded-2xl shadow-sm ring-1 ring-black/[0.06] p-6 md:p-8">
              <h2 className="text-lg font-bold text-zinc-900">Top Subthemes</h2>
              <p className="text-zinc-400 text-sm mt-1 mb-7">Programmes that explicitly cover each area.</p>

              <div className="space-y-3">
                {topSubthemes.map(([name, count], index) => {
                  const pct = (count / programmes.length) * 100;
                  return (
                    <div key={name} className="flex items-center gap-3">
                      <span className="w-5 text-[11px] font-bold text-zinc-300 tabular-nums text-right shrink-0">{index + 1}</span>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-baseline mb-1">
                          <span className="text-sm font-medium text-zinc-800 truncate">{name}</span>
                          <span className="text-[11px] text-zinc-400 ml-3 shrink-0 tabular-nums">{count}/{programmes.length}</span>
                        </div>
                        <div className="relative h-1.5 bg-zinc-100 rounded-full overflow-hidden">
                          <div className="absolute inset-y-0 left-0 bg-blue-400 rounded-full" style={{ width: `${pct}%` }} />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* ── Browse by Theme / Programme ── */}
        {(viewMode === 'themes' || viewMode === 'programmes') && (
          <div className="grid md:grid-cols-[280px_1fr] gap-4">

            {/* Sidebar */}
            <div className="bg-white rounded-2xl shadow-sm ring-1 ring-black/[0.06] p-2.5 h-[640px] overflow-y-auto">
              {viewMode === 'themes' ? themes.map(theme => {
                const Icon = theme.icon;
                const active = selectedTheme.id === theme.id;
                return (
                  <button
                    key={theme.id}
                    onClick={() => setSelectedTheme(theme)}
                    className={`w-full text-left px-3 py-2.5 rounded-xl flex items-center gap-3 transition-all mb-0.5 ${
                      active ? `${theme.bg} ${theme.color}` : 'hover:bg-zinc-50 text-zinc-600'
                    }`}
                  >
                    <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${active ? 'bg-white/60' : 'bg-zinc-100'}`}>
                      <Icon size={14} className={active ? theme.color : 'text-zinc-400'} />
                    </div>
                    <span className="text-[13px] font-medium leading-snug flex-1">{theme.name}</span>
                    {active && <ChevronRight size={14} className={`shrink-0 ${theme.color}`} />}
                  </button>
                );
              }) : programmes.map(prog => {
                const active = selectedProgramme.id === prog.id;
                return (
                  <button
                    key={prog.id}
                    onClick={() => setSelectedProgramme(prog)}
                    className={`w-full text-left px-3 py-3 rounded-xl transition-all mb-0.5 ${
                      active ? 'bg-zinc-900' : 'hover:bg-zinc-50'
                    }`}
                  >
                    <span className={`block text-[13px] font-medium leading-snug ${active ? 'text-white' : 'text-zinc-800'}`}>{prog.name}</span>
                    <span className={`text-[11px] mt-0.5 block ${active ? 'text-zinc-500' : 'text-zinc-400'}`}>{prog.awards}</span>
                  </button>
                );
              })}
            </div>

            {/* Detail panel */}
            <div className="bg-white rounded-2xl shadow-sm ring-1 ring-black/[0.06] p-6 md:p-8 h-[640px] overflow-y-auto">

              {viewMode === 'themes' ? (
                <div className="space-y-7">
                  {/* Theme header */}
                  <div className="flex items-start gap-5 pb-6 border-b border-zinc-100">
                    <div className={`p-4 rounded-2xl ${selectedTheme.bg} shrink-0`}>
                      <selectedTheme.icon size={28} className={selectedTheme.color} />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-zinc-900">{selectedTheme.name}</h2>
                      <p className="text-zinc-500 text-sm mt-1.5 leading-relaxed">{selectedTheme.desc}</p>
                      <div className="flex flex-wrap gap-1.5 mt-3">
                        {selectedTheme.subthemes.map(st => (
                          <span key={st} className={`text-[11px] px-2.5 py-1 rounded-full ${selectedTheme.bg} ${selectedTheme.color} font-medium`}>{st}</span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div>
                    <p className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest mb-4">Programme Relevance</p>
                    <div className="space-y-3">
                      {[...programmes]
                        .sort((a, b) => (b.scores[selectedTheme.id] || 0) - (a.scores[selectedTheme.id] || 0))
                        .map(prog => {
                          const score = prog.scores[selectedTheme.id] || 0;
                          const prominent = score >= 3;
                          return (
                            <div key={prog.id} className={`p-4 rounded-xl border transition-all ${prominent ? 'border-zinc-200 bg-zinc-50/60' : 'border-zinc-100 bg-white opacity-50'}`}>
                              <div className="flex justify-between items-start mb-3">
                                <div className="mr-3">
                                  <h4 className={`font-semibold text-sm ${prominent ? 'text-zinc-900' : 'text-zinc-500'}`}>{prog.name}</h4>
                                  {prominent && <p className="text-[12px] text-zinc-500 mt-1 leading-relaxed">{prog.desc}</p>}
                                </div>
                                <span className="text-[11px] font-medium text-zinc-400 bg-white px-2.5 py-0.5 rounded-lg border border-zinc-200 shrink-0">{prog.awards}</span>
                              </div>
                              <div className="flex items-center justify-between gap-3 flex-wrap">
                                <ScoreBar score={score} />
                                <div className="flex flex-wrap gap-1">
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
                </div>
              ) : (
                <div className="space-y-7">
                  {/* Programme header */}
                  <div className="pb-6 border-b border-zinc-100">
                    <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider bg-zinc-100 px-2.5 py-1 rounded-full">
                      {selectedProgramme.awards}
                    </span>
                    <h2 className="text-2xl font-bold text-zinc-900 mt-3">{selectedProgramme.name}</h2>
                    <p className="text-zinc-500 mt-2 text-[15px] leading-relaxed">{selectedProgramme.desc}</p>
                  </div>

                  <div>
                    <p className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest mb-4">Theme Coverage</p>
                    <div className="space-y-2">
                      {themes.map(theme => {
                        const score = selectedProgramme.scores[theme.id] || 0;
                        const Icon = theme.icon;
                        const prominent = score >= 3;
                        return (
                          <div key={theme.id} className={`px-4 py-3.5 rounded-xl flex items-start gap-3.5 transition-all ${prominent ? theme.bg : 'bg-zinc-50/60 opacity-55'}`}>
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${prominent ? 'bg-white/50' : 'bg-zinc-100'}`}>
                              <Icon size={15} className={prominent ? theme.color : 'text-zinc-400'} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between gap-2 mb-2">
                                <h4 className={`font-semibold text-sm ${prominent ? theme.color : 'text-zinc-500'}`}>{theme.name}</h4>
                                <ScoreBar score={score} />
                              </div>
                              {prominent && <p className="text-[12px] text-zinc-600 mb-2.5 leading-relaxed">{theme.desc}</p>}
                              <div className="flex flex-wrap gap-1">
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
                </div>
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
