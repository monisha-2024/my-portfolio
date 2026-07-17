import React from 'react';
import { useInView, AnimatedNumber } from '../utils';

const counters = [
  { emoji: '⚡', label: 'Hackathons Participated', value: 8, suffix: '+', color: '#7C3AED' },
  { emoji: '💻', label: 'Coding Challenges Completed', value: 150, suffix: '+', color: '#2563EB' },
  { emoji: '🎓', label: 'Technical Workshops', value: 12, suffix: '+', color: '#06B6D4' },
  { emoji: '📜', label: 'Certifications Earned', value: 6, suffix: '', color: '#10B981' },
  { emoji: '🚀', label: 'Projects Built', value: 5, suffix: '+', color: '#F59E0B' },
];

const achievements = [
  { emoji: '🏆', title: 'Smart India Hackathon Finalist', desc: 'Reached the national-level finals of SIH 2024 with KarshaAI, the smart agriculture project.', color: '#F59E0B' },
  { emoji: '🥈', title: 'District-Level Hackathon Runner-Up', desc: 'Won 2nd place at the district-level inter-college AI innovation hackathon.', color: '#7C3AED' },
  { emoji: '🎯', title: 'Best Project Award – College Tech Fest', desc: 'Received Best Project recognition for the AI Medical Billing System at the annual college technical symposium.', color: '#06B6D4' },
  { emoji: '⭐', title: 'NPTEL Star Performer', desc: 'Achieved Elite + Gold distinction in NPTEL Python and Data Science certification courses.', color: '#10B981' },
];

function AchievementCard({ ach, index }) {
  const [ref, inView] = useInView();
  return (
    <div ref={ref} className="glass-card" style={{ padding: '1.5rem', display: 'flex', gap: '1rem', opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(25px)', transition: `all 0.6s ease ${index * 0.12}s` }}>
      <div style={{ width: 50, height: 50, borderRadius: '12px', background: `${ach.color}15`, border: `1px solid ${ach.color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', flexShrink: 0 }}>{ach.emoji}</div>
      <div>
        <h3 style={{ fontFamily: 'Poppins,sans-serif', fontWeight: 700, fontSize: '0.95rem', color: '#fff', marginBottom: '0.35rem' }}>{ach.title}</h3>
        <p style={{ fontFamily: 'Inter,sans-serif', fontSize: '0.84rem', color: 'rgba(200,200,255,0.65)', lineHeight: 1.65 }}>{ach.desc}</p>
      </div>
    </div>
  );
}

export default function Achievements() {
  const [headerRef, headerInView] = useInView();
  return (
    <section id="achievements" style={{ padding: '6rem 2rem', background: '#080820' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div ref={headerRef} style={{ textAlign: 'center', marginBottom: '3.5rem', opacity: headerInView ? 1 : 0, transition: 'opacity 0.7s' }}>
          <p className="section-tag">MILESTONES</p>
          <h2 className="section-title">Achievements & <span className="gradient-text">Recognition</span></h2>
          <div className="divider"></div>
        </div>

        {/* Animated Counters */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(150px,1fr))', gap: '1rem', marginBottom: '3rem' }}>
          {counters.map((c, i) => (
            <div key={i} className="glass-card" style={{ padding: '1.5rem', textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{c.emoji}</div>
              <div style={{ fontFamily: 'Poppins,sans-serif', fontWeight: 800, fontSize: '2rem', color: c.color, marginBottom: '0.3rem' }}>
                <AnimatedNumber target={c.value} />{c.suffix}
              </div>
              <p style={{ fontFamily: 'Inter,sans-serif', fontSize: '0.78rem', color: 'rgba(200,200,255,0.6)', lineHeight: 1.4 }}>{c.label}</p>
            </div>
          ))}
        </div>

        {/* Achievement Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: '1.25rem' }}>
          {achievements.map((ach, i) => <AchievementCard key={i} ach={ach} index={i} />)}
        </div>
      </div>
    </section>
  );
}
