import React from 'react';
import { useInView } from '../utils';

const profiles = [
  {
    name: 'GitHub',
    emoji: '⬛',
    handle: '@monisha-lt',
    url: 'https://github.com',
    color: '#e2e8f0',
    bgColor: '#161b22',
    border: 'rgba(255,255,255,0.12)',
    stats: [
      { label: 'Repositories', value: '12+' },
      { label: 'Contributions', value: '200+' },
      { label: 'Stars Earned', value: '18' },
    ],
    desc: 'Explore my open-source projects, code contributions, and technical repositories.',
  },
  {
    name: 'LinkedIn',
    emoji: '💼',
    handle: 'Monisha L.T.',
    url: 'https://linkedin.com',
    color: '#0A66C2',
    bgColor: '#0a1628',
    border: 'rgba(10,102,194,0.3)',
    stats: [
      { label: 'Connections', value: '300+' },
      { label: 'Posts', value: '25+' },
      { label: 'Endorsements', value: '40+' },
    ],
    desc: 'Connect professionally, view work experience, and endorsements.',
  },
  {
    name: 'LeetCode',
    emoji: '🏆',
    handle: '@monisha_lt',
    url: 'https://leetcode.com',
    color: '#FFA116',
    bgColor: '#1a120a',
    border: 'rgba(255,161,22,0.3)',
    stats: [
      { label: 'Problems Solved', value: '80+' },
      { label: 'Contest Rating', value: '1200+' },
      { label: 'Acceptance Rate', value: '68%' },
    ],
    desc: 'Data structures, algorithms, and competitive programming challenges.',
  },
  {
    name: 'HackerRank',
    emoji: '✅',
    handle: '@monisha_lt',
    url: 'https://hackerrank.com',
    color: '#00EA64',
    bgColor: '#0a1a0f',
    border: 'rgba(0,234,100,0.3)',
    stats: [
      { label: 'Stars Earned', value: '5★ Python' },
      { label: 'Badges', value: '8' },
      { label: 'Rank', value: 'Top 10%' },
    ],
    desc: 'Python 5-star coder with badges in problem-solving and AI.',
  },
];

function ProfileCard({ profile, index }) {
  const [ref, inView] = useInView();
  return (
    <div ref={ref} className="glass-card tilt-card" style={{ padding: '1.75rem', opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(30px)', transition: `all 0.6s ease ${index * 0.12}s`, background: profile.bgColor, borderColor: profile.border, position: 'relative', overflow: 'hidden' }}>
      {/* Glow blob */}
      <div style={{ position: 'absolute', top: -30, right: -30, width: 120, height: 120, borderRadius: '50%', background: `radial-gradient(circle, ${profile.color}20, transparent 70%)`, pointerEvents: 'none' }} />

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.25rem' }}>
        <div style={{ width: 52, height: 52, borderRadius: '14px', background: `${profile.color}15`, border: `2px solid ${profile.color}40`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.6rem' }}>
          {profile.emoji}
        </div>
        <div>
          <h3 style={{ fontFamily: 'Poppins,sans-serif', fontWeight: 700, fontSize: '1.1rem', color: '#fff' }}>{profile.name}</h3>
          <span style={{ fontFamily: 'Inter,sans-serif', fontSize: '0.8rem', color: profile.color }}>{profile.handle}</span>
        </div>
      </div>

      <p style={{ fontFamily: 'Inter,sans-serif', fontSize: '0.85rem', color: 'rgba(200,200,255,0.65)', lineHeight: 1.65, marginBottom: '1.25rem' }}>{profile.desc}</p>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '0.5rem', marginBottom: '1.5rem' }}>
        {profile.stats.map(s => (
          <div key={s.label} style={{ textAlign: 'center', padding: '0.6rem 0.3rem', background: `${profile.color}08`, border: `1px solid ${profile.color}20`, borderRadius: '8px' }}>
            <div style={{ fontFamily: 'Poppins,sans-serif', fontWeight: 700, fontSize: '0.85rem', color: profile.color }}>{s.value}</div>
            <div style={{ fontFamily: 'Inter,sans-serif', fontSize: '0.65rem', color: 'rgba(200,200,255,0.5)', lineHeight: 1.3, marginTop: '0.15rem' }}>{s.label}</div>
          </div>
        ))}
      </div>

      <a href={profile.url} target="_blank" rel="noopener noreferrer" style={{ display: 'block', textAlign: 'center', padding: '0.65rem', borderRadius: '8px', background: `linear-gradient(135deg,${profile.color}30,${profile.color}15)`, border: `1px solid ${profile.color}40`, color: profile.color, fontFamily: 'Poppins,sans-serif', fontWeight: 600, fontSize: '0.85rem', textDecoration: 'none', transition: 'all 0.2s' }}
        onMouseEnter={e => { e.currentTarget.style.background=`${profile.color}25`; e.currentTarget.style.boxShadow=`0 4px 20px ${profile.color}30`; }}
        onMouseLeave={e => { e.currentTarget.style.background=`linear-gradient(135deg,${profile.color}30,${profile.color}15)`; e.currentTarget.style.boxShadow='none'; }}>
        Visit Profile →
      </a>
    </div>
  );
}

export default function CodingProfiles() {
  const [ref, inView] = useInView();
  return (
    <section id="coding" style={{ padding: '6rem 2rem', background: 'linear-gradient(180deg,#050514,#080820)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div ref={ref} style={{ textAlign: 'center', marginBottom: '3.5rem', opacity: inView ? 1 : 0, transition: 'opacity 0.7s' }}>
          <p className="section-tag">WHERE I CODE</p>
          <h2 className="section-title">Coding <span className="gradient-text">Profiles</span></h2>
          <div className="divider"></div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: '1.5rem' }}>
          {profiles.map((p, i) => <ProfileCard key={p.name} profile={p} index={i} />)}
        </div>

        {/* GitHub contribution graph placeholder */}
        <div className="glass-card" style={{ marginTop: '2rem', padding: '2rem', textAlign: 'center' }}>
          <p style={{ fontFamily: 'Poppins,sans-serif', fontWeight: 700, fontSize: '1.1rem', color: '#fff', marginBottom: '0.5rem' }}>📈 GitHub Contribution Activity</p>
          <p style={{ fontFamily: 'Inter,sans-serif', fontSize: '0.85rem', color: 'rgba(200,200,255,0.6)', marginBottom: '1rem' }}>Consistent contributor building projects and sharing knowledge</p>
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', padding: '0.65rem 2rem', borderRadius: '8px', background: 'linear-gradient(135deg,#7C3AED,#2563EB)', color: '#fff', fontFamily: 'Poppins,sans-serif', fontWeight: 600, fontSize: '0.85rem', textDecoration: 'none' }}>
            View Full GitHub Profile →
          </a>
        </div>
      </div>
    </section>
  );
}
