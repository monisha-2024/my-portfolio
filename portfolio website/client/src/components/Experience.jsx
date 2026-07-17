import React from 'react';
import { useInView } from '../utils';

const experiences = [
  {
    icon: '🤖',
    title: 'AI/ML Internship',
    org: 'Technology Company (Virtual)',
    period: '2024',
    type: 'Internship',
    color: '#7C3AED',
    points: [
      'Developed ML models for classification and prediction tasks',
      'Worked with Python, Scikit-Learn, Pandas, and Matplotlib',
      'Built and deployed a sentiment analysis NLP pipeline',
    ],
  },
  {
    icon: '🏛️',
    title: 'Government Digital Initiative Internship',
    org: 'Tamil Nadu e-Governance Agency',
    period: '2024',
    type: 'Government Internship',
    color: '#2563EB',
    points: [
      'Participated in digital literacy and e-governance projects',
      'Assisted in data collection and analysis for public welfare schemes',
      'Documented workflows for digital platform modules',
    ],
  },
  {
    icon: '🎓',
    title: 'AI & Cloud Workshop',
    org: 'Erode Sengunthar Engineering College',
    period: '2023 – 2024',
    type: 'Technical Training',
    color: '#06B6D4',
    points: [
      'Attended national-level workshops on AI, ML, and Cloud Computing',
      'Completed hands-on labs on Google Cloud Platform (GCP)',
      'Participated in hackathons and ideathons with cross-functional teams',
    ],
  },
  {
    icon: '💻',
    title: 'Full Stack Web Development Training',
    org: 'Online Learning Platform',
    period: '2023',
    type: 'Technical Training',
    color: '#10B981',
    points: [
      'Mastered HTML, CSS, Bootstrap, JavaScript, and Flask',
      'Built multiple end-to-end web applications',
      'Integrated SQLite databases with dynamic Python backends',
    ],
  },
];

function TimelineItem({ exp, index }) {
  const [ref, inView] = useInView();
  return (
    <div ref={ref} style={{ position: 'relative', paddingLeft: '3.5rem', marginBottom: '2.5rem', opacity: inView ? 1 : 0, transform: inView ? 'translateX(0)' : 'translateX(-30px)', transition: `all 0.6s ease ${index * 0.15}s` }}>
      {/* Timeline dot */}
      <div style={{ position: 'absolute', left: 0, top: 4, width: 40, height: 40, borderRadius: '12px', background: `${exp.color}20`, border: `2px solid ${exp.color}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', zIndex: 1 }}>
        {exp.icon}
      </div>

      {/* Card */}
      <div className="glass-card" style={{ padding: '1.5rem' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.5rem', marginBottom: '0.75rem' }}>
          <div>
            <h3 style={{ fontFamily: 'Poppins,sans-serif', fontWeight: 700, fontSize: '1rem', color: '#fff', marginBottom: '0.2rem' }}>{exp.title}</h3>
            <p style={{ fontFamily: 'Inter,sans-serif', fontSize: '0.85rem', color: 'rgba(200,200,255,0.6)' }}>{exp.org}</p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.3rem' }}>
            <span style={{ fontFamily: 'Inter,sans-serif', fontSize: '0.78rem', fontWeight: 600, color: exp.color }}>{exp.period}</span>
            <span style={{ fontFamily: 'Inter,sans-serif', fontSize: '0.72rem', padding: '0.15rem 0.6rem', background: `${exp.color}15`, border: `1px solid ${exp.color}30`, borderRadius: '6px', color: exp.color }}>{exp.type}</span>
          </div>
        </div>
        <ul style={{ paddingLeft: '1.2rem' }}>
          {exp.points.map((pt, i) => (
            <li key={i} style={{ fontFamily: 'Inter,sans-serif', fontSize: '0.88rem', color: 'rgba(200,200,255,0.7)', lineHeight: 1.7, marginBottom: '0.3rem' }}>{pt}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function Experience() {
  const [ref, inView] = useInView();
  return (
    <section id="experience" style={{ padding: '6rem 2rem', background: '#080820' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <div ref={ref} style={{ textAlign: 'center', marginBottom: '3.5rem', opacity: inView ? 1 : 0, transition: 'opacity 0.7s' }}>
          <p className="section-tag">MY JOURNEY</p>
          <h2 className="section-title">Experience & <span className="gradient-text">Training</span></h2>
          <div className="divider"></div>
        </div>

        {/* Timeline wrapper */}
        <div style={{ position: 'relative' }}>
          <div className="timeline-line"></div>
          {experiences.map((exp, i) => <TimelineItem key={i} exp={exp} index={i} />)}
        </div>
      </div>
    </section>
  );
}
