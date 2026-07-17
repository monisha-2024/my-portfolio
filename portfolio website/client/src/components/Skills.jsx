import React from 'react';
import { useInView } from '../utils';

const skillCategories = [
  {
    icon: '🐍',
    title: 'Programming',
    color: '#7C3AED',
    skills: [
      { name: 'Python', level: 85 },
      { name: 'C', level: 70 },
      { name: 'JavaScript', level: 75 },
    ],
  },
  {
    icon: '🌐',
    title: 'Web Development',
    color: '#2563EB',
    skills: [
      { name: 'HTML5', level: 90 },
      { name: 'CSS3', level: 85 },
      { name: 'Bootstrap', level: 80 },
      { name: 'Flask', level: 75 },
    ],
  },
  {
    icon: '🗄️',
    title: 'Database',
    color: '#06B6D4',
    skills: [
      { name: 'MySQL', level: 78 },
      { name: 'SQLite', level: 80 },
    ],
  },
  {
    icon: '🤖',
    title: 'AI & Data Science',
    color: '#10B981',
    skills: [
      { name: 'Machine Learning', level: 80 },
      { name: 'Artificial Intelligence', level: 78 },
      { name: 'Data Analysis', level: 82 },
      { name: 'NLP', level: 70 },
    ],
  },
  {
    icon: '☁️',
    title: 'Cloud & DevOps',
    color: '#F59E0B',
    skills: [
      { name: 'Cloud Computing', level: 72 },
      { name: 'Git', level: 85 },
      { name: 'GitHub', level: 88 },
    ],
  },
];

function SkillBar({ name, level, color, inView }) {
  return (
    <div style={{ marginBottom: '1rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
        <span style={{ fontFamily: 'Inter,sans-serif', fontSize: '0.88rem', fontWeight: 500, color: '#e2e8f0' }}>{name}</span>
        <span style={{ fontFamily: 'Inter,sans-serif', fontSize: '0.8rem', fontWeight: 600, color }}>{level}%</span>
      </div>
      <div className="skill-bar-outer">
        <div
          className="skill-bar-inner"
          style={{
            width: inView ? `${level}%` : '0%',
            background: `linear-gradient(90deg, ${color}, ${color}aa)`,
          }}
        />
      </div>
    </div>
  );
}

function SkillCard({ category }) {
  const [ref, inView] = useInView();
  return (
    <div ref={ref} className="glass-card tilt-card" style={{ padding: '1.75rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
        <div style={{ width: 44, height: 44, borderRadius: '12px', background: `${category.color}20`, border: `1px solid ${category.color}40`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem' }}>
          {category.icon}
        </div>
        <h3 style={{ fontFamily: 'Poppins,sans-serif', fontWeight: 700, fontSize: '1rem', color: '#fff' }}>{category.title}</h3>
      </div>
      {category.skills.map(skill => (
        <SkillBar key={skill.name} {...skill} color={category.color} inView={inView} />
      ))}
    </div>
  );
}

export default function Skills() {
  const [ref, inView] = useInView();
  return (
    <section id="skills" style={{ padding: '6rem 2rem', background: '#080820' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <div ref={ref} style={{ textAlign: 'center', marginBottom: '3.5rem', opacity: inView ? 1 : 0, transition: 'opacity 0.7s' }}>
          <p className="section-tag">TECHNICAL EXPERTISE</p>
          <h2 className="section-title">My <span className="gradient-text">Skills</span></h2>
          <div className="divider"></div>
        </div>

        {/* Skills Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
          {skillCategories.map(cat => (
            <SkillCard key={cat.title} category={cat} />
          ))}
        </div>
      </div>
    </section>
  );
}
