import React from 'react';
import { useInView } from '../utils';

const certifications = [
  { emoji: '🤖', title: 'Introduction to Artificial Intelligence', issuer: 'IBM / Coursera', year: '2024', color: '#7C3AED' },
  { emoji: '🐍', title: 'Python for Data Science & AI', issuer: 'IBM Skills Network', year: '2024', color: '#2563EB' },
  { emoji: '☁️', title: 'Google Cloud Computing Fundamentals', issuer: 'Google Cloud', year: '2024', color: '#06B6D4' },
  { emoji: '📊', title: 'Data Science Professional Certificate', issuer: 'Coursera / IBM', year: '2023', color: '#10B981' },
  { emoji: '🧠', title: 'Machine Learning Foundations', issuer: 'Andrew Ng / Coursera', year: '2023', color: '#F59E0B' },
  { emoji: '🔗', title: 'Natural Language Processing with Python', issuer: 'NPTEL / Swayam', year: '2024', color: '#EF4444' },
];

function CertCard({ cert, index }) {
  const [ref, inView] = useInView();
  return (
    <div
      ref={ref}
      className="glass-card tilt-card"
      style={{
        padding: '1.5rem',
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(30px)',
        transition: `all 0.6s ease ${index * 0.1}s`,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Top accent bar */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: `linear-gradient(90deg,${cert.color},transparent)`, borderRadius: '16px 16px 0 0' }} />

      <div style={{ width: 50, height: 50, borderRadius: '14px', background: `${cert.color}15`, border: `1px solid ${cert.color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', marginBottom: '1rem' }}>
        {cert.emoji}
      </div>

      <h3 style={{ fontFamily: 'Poppins,sans-serif', fontWeight: 700, fontSize: '0.92rem', color: '#fff', lineHeight: 1.4, marginBottom: '0.5rem' }}>{cert.title}</h3>

      <p style={{ fontFamily: 'Inter,sans-serif', fontSize: '0.8rem', color: cert.color, fontWeight: 600, marginBottom: '0.3rem' }}>{cert.issuer}</p>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontFamily: 'Inter,sans-serif', fontSize: '0.75rem', color: 'rgba(200,200,255,0.5)' }}>📅 {cert.year}</span>
        <span style={{ fontFamily: 'Inter,sans-serif', fontSize: '0.7rem', padding: '0.15rem 0.5rem', background: `${cert.color}15`, border: `1px solid ${cert.color}30`, borderRadius: '5px', color: cert.color }}>✓ Certified</span>
      </div>
    </div>
  );
}

export default function Certifications() {
  const [ref, inView] = useInView();
  return (
    <section id="certifications" style={{ padding: '6rem 2rem', background: 'linear-gradient(180deg,#050514,#080820)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div ref={ref} style={{ textAlign: 'center', marginBottom: '3.5rem', opacity: inView ? 1 : 0, transition: 'opacity 0.7s' }}>
          <p className="section-tag">CREDENTIALS</p>
          <h2 className="section-title">My <span className="gradient-text">Certifications</span></h2>
          <div className="divider"></div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(270px,1fr))', gap: '1.5rem' }}>
          {certifications.map((cert, i) => <CertCard key={i} cert={cert} index={i} />)}
        </div>
      </div>
    </section>
  );
}
