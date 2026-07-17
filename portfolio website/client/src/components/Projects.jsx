import React, { useState } from 'react';
import { useInView } from '../utils';

const projects = [
  {
    id: 1,
    emoji: '🌾',
    title: 'KarshaAI – Smart Agriculture Dashboard',
    subtitle: 'AI-Powered Farming Intelligence',
    description: 'An intelligent agriculture dashboard that helps farmers make data-driven decisions with real-time weather forecasts, soil monitoring, AI-based crop disease detection, and government scheme updates.',
    features: ['Weather Forecast', 'Soil Monitoring', 'Crop Disease Detection (AI)', 'AI Farming Assistant', 'Government Scheme Updates'],
    tech: ['Python', 'Flask', 'HTML', 'CSS', 'JavaScript', 'SQLite'],
    color: '#10B981',
    gradient: 'linear-gradient(135deg,rgba(16,185,129,0.15),rgba(6,182,212,0.1))',
    borderColor: 'rgba(16,185,129,0.3)',
    liveUrl: '#',
    githubUrl: '#',
  },
  {
    id: 2,
    emoji: '🏥',
    title: 'AI Medical Billing & Coding System',
    subtitle: 'Healthcare Automation with AI',
    description: 'An intelligent medical billing system that automates ICD-10 coding, provides AI-driven prescription support, handles multilingual medical records, and streamlines the billing automation workflow.',
    features: ['ICD-10 Coding Automation', 'AI Prescription Support', 'Medical Billing Automation', 'Multilingual Support', 'Report Generation'],
    tech: ['Python', 'AI', 'NLP', 'Flask', 'Machine Learning'],
    color: '#7C3AED',
    gradient: 'linear-gradient(135deg,rgba(124,58,237,0.15),rgba(37,99,235,0.1))',
    borderColor: 'rgba(124,58,237,0.3)',
    liveUrl: '#',
    githubUrl: '#',
  },
];

function ProjectCard({ project }) {
  const [ref, inView] = useInView();
  const [hovered, setHovered] = useState(false);

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? project.gradient : 'rgba(255,255,255,0.02)',
        border: `1px solid ${hovered ? project.color + '60' : project.borderColor}`,
        borderRadius: '20px',
        padding: '2rem',
        transition: 'all 0.4s ease',
        transform: inView ? (hovered ? 'translateY(-8px)' : 'translateY(0)') : 'translateY(40px)',
        opacity: inView ? 1 : 0,
        cursor: 'default',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background glow */}
      <div style={{ position: 'absolute', top: 0, right: 0, width: '200px', height: '200px', borderRadius: '50%', background: `radial-gradient(circle, ${project.color}15, transparent 70%)`, pointerEvents: 'none' }} />

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', marginBottom: '1.25rem' }}>
        <div style={{ width: 56, height: 56, borderRadius: '14px', background: `${project.color}20`, border: `1px solid ${project.color}40`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.8rem', flexShrink: 0 }}>
          {project.emoji}
        </div>
        <div>
          <h3 style={{ fontFamily: 'Poppins,sans-serif', fontWeight: 700, fontSize: '1.1rem', color: '#fff', marginBottom: '0.25rem', lineHeight: 1.3 }}>{project.title}</h3>
          <span style={{ fontFamily: 'Inter,sans-serif', fontSize: '0.78rem', color: project.color, fontWeight: 600 }}>{project.subtitle}</span>
        </div>
      </div>

      <p style={{ fontFamily: 'Inter,sans-serif', fontSize: '0.9rem', color: 'rgba(200,200,255,0.7)', lineHeight: 1.75, marginBottom: '1.5rem' }}>{project.description}</p>

      {/* Features */}
      <div style={{ marginBottom: '1.5rem' }}>
        <p style={{ fontFamily: 'Poppins,sans-serif', fontSize: '0.78rem', fontWeight: 600, color: 'rgba(200,200,255,0.5)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.6rem' }}>Key Features</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
          {project.features.map(f => (
            <span key={f} style={{ fontSize: '0.75rem', padding: '0.25rem 0.6rem', background: `${project.color}15`, border: `1px solid ${project.color}30`, borderRadius: '6px', color: project.color, fontFamily: 'Inter,sans-serif', fontWeight: 500 }}>✓ {f}</span>
          ))}
        </div>
      </div>

      {/* Tech Stack */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1.75rem' }}>
        {project.tech.map(t => (
          <span key={t} style={{ fontSize: '0.75rem', padding: '0.2rem 0.6rem', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '5px', color: 'rgba(200,200,255,0.7)', fontFamily: 'Inter,sans-serif' }}>{t}</span>
        ))}
      </div>

      {/* Buttons */}
      <div style={{ display: 'flex', gap: '0.75rem' }}>
        <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" style={{ flex: 1, padding: '0.65rem', borderRadius: '8px', background: `linear-gradient(135deg,${project.color},${project.color}bb)`, color: '#fff', fontFamily: 'Poppins,sans-serif', fontWeight: 600, fontSize: '0.82rem', textAlign: 'center', textDecoration: 'none', transition: 'all 0.2s' }}>🚀 Live Demo</a>
        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" style={{ flex: 1, padding: '0.65rem', borderRadius: '8px', background: 'transparent', border: `1px solid ${project.color}50`, color: project.color, fontFamily: 'Poppins,sans-serif', fontWeight: 600, fontSize: '0.82rem', textAlign: 'center', textDecoration: 'none', transition: 'all 0.2s' }}>⬛ GitHub</a>
      </div>
    </div>
  );
}

export default function Projects() {
  const [ref, inView] = useInView();
  return (
    <section id="projects" style={{ padding: '6rem 2rem', background: 'linear-gradient(180deg,#080820 0%,#050514 100%)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div ref={ref} style={{ textAlign: 'center', marginBottom: '3.5rem', opacity: inView ? 1 : 0, transition: 'opacity 0.7s' }}>
          <p className="section-tag">PORTFOLIO SHOWCASE</p>
          <h2 className="section-title">Featured <span className="gradient-text">Projects</span></h2>
          <div className="divider"></div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(340px,1fr))', gap: '2rem' }}>
          {projects.map(p => <ProjectCard key={p.id} project={p} />)}
        </div>
      </div>
    </section>
  );
}
