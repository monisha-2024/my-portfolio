import React from 'react';
import { useInView } from '../utils';

const InfoCard = ({ icon, label, value }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem 1rem', background: 'rgba(124,58,237,0.08)', border: '1px solid rgba(124,58,237,0.2)', borderRadius: '10px' }}>
    <span style={{ fontSize: '1.2rem' }}>{icon}</span>
    <div>
      <p style={{ fontFamily: 'Inter,sans-serif', fontSize: '0.72rem', color: 'rgba(200,200,255,0.5)', fontWeight: 500, marginBottom: '0.1rem' }}>{label}</p>
      <p style={{ fontFamily: 'Inter,sans-serif', fontSize: '0.9rem', color: '#e2e8f0', fontWeight: 600 }}>{value}</p>
    </div>
  </div>
);

export default function About() {
  const [ref, inView] = useInView();
  return (
    <section id="about" style={{ padding: '6rem 2rem', background: 'linear-gradient(180deg,#050514 0%,#080820 100%)' }}>
      <div ref={ref} style={{ maxWidth: '1200px', margin: '0 auto', opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateY(40px)', transition: 'all 0.7s ease' }}>
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <p style={{ fontFamily: 'Inter,sans-serif', fontSize: '0.85rem', color: '#7C3AED', fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '0.75rem' }}>GET TO KNOW ME</p>
          <h2 style={{ fontFamily: 'Poppins,sans-serif', fontSize: 'clamp(2rem,4vw,2.8rem)', fontWeight: 800, color: '#fff', marginBottom: '1rem' }}>
            About <span style={{ background: 'linear-gradient(135deg,#7C3AED,#06B6D4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Me</span>
          </h2>
          <div style={{ width: '60px', height: '4px', background: 'linear-gradient(90deg,#7C3AED,#06B6D4)', borderRadius: '2px', margin: '0 auto' }}></div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.3fr', gap: '4rem', alignItems: 'start' }}>
          {/* Left – Decorative visual */}
          <div style={{ position: 'relative' }}>
            <div style={{ width: '100%', aspectRatio: '1', borderRadius: '20px', background: 'linear-gradient(135deg,rgba(124,58,237,0.2),rgba(37,99,235,0.2),rgba(6,182,212,0.1))', border: '1px solid rgba(124,58,237,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '7rem', boxShadow: '0 20px 60px rgba(124,58,237,0.15)' }}>
              🎓
            </div>
            <div style={{ position: 'absolute', top: '-1rem', right: '-1rem', width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(6,182,212,0.1)', border: '1px solid rgba(6,182,212,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem' }}>🤖</div>
            <div style={{ position: 'absolute', bottom: '-1rem', left: '-1rem', width: '60px', height: '60px', borderRadius: '50%', background: 'rgba(124,58,237,0.1)', border: '1px solid rgba(124,58,237,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem' }}>💡</div>
          </div>

          {/* Right – Content */}
          <div>
            <p style={{ fontFamily: 'Inter,sans-serif', fontSize: '1rem', color: 'rgba(200,200,255,0.75)', lineHeight: 1.85, marginBottom: '2rem' }}>
              I'm a passionate <strong style={{ color: '#a78bfa' }}>Artificial Intelligence & Data Science</strong> student who enjoys building intelligent applications that solve real-world problems. My interests include AI, Machine Learning, Cloud Computing, Full Stack Development, and Data Science.
            </p>
            <p style={{ fontFamily: 'Inter,sans-serif', fontSize: '1rem', color: 'rgba(200,200,255,0.75)', lineHeight: 1.85, marginBottom: '2.5rem' }}>
              I continuously improve my skills through coding challenges, hackathons, certifications, and innovative projects. My goal is to become an <strong style={{ color: '#06B6D4' }}>AI Engineer</strong> who creates impactful and scalable technology.
            </p>

            {/* Info Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
              <InfoCard icon="🎓" label="Degree" value="B.Tech AI & DS" />
              <InfoCard icon="🏫" label="College" value="Erode Sengunthar EC" />
              <InfoCard icon="📍" label="Location" value="Tamil Nadu, India" />
              <InfoCard icon="🎯" label="Career Goal" value="AI Engineer" />
              <InfoCard icon="💬" label="Languages" value="Tamil, English" />
              <InfoCard icon="✉️" label="Status" value="Open to Internships" />
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width:768px) {
          #about > div > div:last-child { grid-template-columns:1fr !important; }
          #about > div > div:last-child > div:first-child { display:none !important; }
        }
      `}</style>
    </section>
  );
}
