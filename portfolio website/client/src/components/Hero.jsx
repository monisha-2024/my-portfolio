import React, { useEffect, useRef } from 'react';
import { useTypewriter } from '../utils';

const roles = [
  'AI Developer',
  'Data Science Enthusiast',
  'Cloud Computing Learner',
  'Full Stack Developer',
  'Machine Learning Explorer',
];

// Particle background
function ParticleCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const particles = Array.from({ length: 80 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 2 + 0.5,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      alpha: Math.random() * 0.5 + 0.2,
      color: ['#7C3AED', '#2563EB', '#06B6D4'][Math.floor(Math.random() * 3)],
    }));

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.fill();
        ctx.globalAlpha = 1;
      });

      // Draw connecting lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = '#7C3AED';
            ctx.globalAlpha = (1 - dist / 120) * 0.15;
            ctx.lineWidth = 0.5;
            ctx.stroke();
            ctx.globalAlpha = 1;
          }
        }
      }

      animId = requestAnimationFrame(animate);
    };

    animate();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }} />;
}

const FloatingIcon = ({ emoji, style }) => (
  <div style={{
    position: 'absolute',
    fontSize: '2rem',
    opacity: 0.2,
    animation: 'float 6s ease-in-out infinite',
    animationDelay: style.delay || '0s',
    ...style,
  }}>
    {emoji}
  </div>
);

export default function Hero() {
  const typedText = useTypewriter(roles);

  return (
    <section id="home" style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', overflow: 'hidden', background: 'radial-gradient(ellipse at 20% 50%, rgba(124,58,237,0.08) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(37,99,235,0.08) 0%, transparent 60%), radial-gradient(ellipse at 60% 80%, rgba(6,182,212,0.05) 0%, transparent 60%), #050514' }}>
      <ParticleCanvas />

      {/* Floating AI icons */}
      <FloatingIcon emoji="🤖" style={{ top: '15%', right: '15%', delay: '0s' }} />
      <FloatingIcon emoji="🧠" style={{ top: '65%', right: '8%', delay: '2s' }} />
      <FloatingIcon emoji="💡" style={{ top: '25%', right: '35%', delay: '1s' }} />
      <FloatingIcon emoji="📊" style={{ bottom: '20%', right: '25%', delay: '3s' }} />
      <FloatingIcon emoji="☁️" style={{ top: '10%', left: '8%', delay: '1.5s' }} />
      <FloatingIcon emoji="⚡" style={{ bottom: '30%', left: '5%', delay: '2.5s' }} />

      <div style={{ position: 'relative', zIndex: 1, maxWidth: '1200px', margin: '0 auto', padding: '6rem 2rem 4rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center', width: '100%' }}>
        {/* Left Content */}
        <div style={{ animation: 'fadeInLeft 0.8s ease' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(124,58,237,0.15)', border: '1px solid rgba(124,58,237,0.4)', borderRadius: '50px', padding: '0.4rem 1rem', marginBottom: '1.5rem', color: '#a78bfa', fontSize: '0.85rem', fontFamily: 'Inter,sans-serif', fontWeight: 500 }}>
            <span style={{ width: 8, height: 8, background: '#7C3AED', borderRadius: '50%', boxShadow: '0 0 8px #7C3AED' }}></span>
            Available for Opportunities
          </div>

          <h1 style={{ fontFamily: 'Poppins,sans-serif', fontSize: 'clamp(2.2rem,4vw,3.5rem)', fontWeight: 800, lineHeight: 1.15, marginBottom: '1.25rem', color: '#fff' }}>
            Hi, I'm{' '}
            <span style={{ background: 'linear-gradient(135deg,#7C3AED,#2563EB,#06B6D4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', display: 'block' }}>
              Monisha L.T.
            </span>
          </h1>

          <div style={{ height: '2.5rem', marginBottom: '1.25rem' }}>
            <p style={{ fontFamily: 'Inter,sans-serif', fontSize: 'clamp(1rem,2vw,1.25rem)', fontWeight: 600, color: '#06B6D4' }}>
              {typedText}<span style={{ animation: 'blink 1s infinite', borderRight: '2px solid #06B6D4', paddingRight: '2px' }}></span>
            </p>
          </div>

          <p style={{ fontFamily: 'Inter,sans-serif', fontSize: '1rem', color: 'rgba(200,200,255,0.7)', lineHeight: 1.8, marginBottom: '2.5rem', maxWidth: '520px' }}>
            I build intelligent AI-powered applications, develop modern web solutions, and enjoy solving real-world problems using technology.
          </p>

          {/* Buttons */}
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
            <button onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })} style={{ fontFamily: 'Poppins,sans-serif', fontWeight: 600, fontSize: '0.9rem', padding: '0.8rem 1.75rem', borderRadius: '10px', background: 'linear-gradient(135deg,#7C3AED,#2563EB)', border: 'none', color: '#fff', cursor: 'pointer', boxShadow: '0 4px 20px rgba(124,58,237,0.4)', transition: 'all 0.3s' }}
              onMouseEnter={e => e.target.style.transform='translateY(-2px)'}
              onMouseLeave={e => e.target.style.transform='translateY(0)'}>
              🚀 View Projects
            </button>
            <a href="/resume.pdf" download style={{ fontFamily: 'Poppins,sans-serif', fontWeight: 600, fontSize: '0.9rem', padding: '0.8rem 1.75rem', borderRadius: '10px', background: 'transparent', border: '1.5px solid rgba(124,58,237,0.6)', color: '#a78bfa', cursor: 'pointer', textDecoration: 'none', display: 'inline-block', transition: 'all 0.3s' }}>
              📄 Download Resume
            </a>
            <button onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })} style={{ fontFamily: 'Poppins,sans-serif', fontWeight: 600, fontSize: '0.9rem', padding: '0.8rem 1.75rem', borderRadius: '10px', background: 'rgba(6,182,212,0.15)', border: '1.5px solid rgba(6,182,212,0.5)', color: '#06B6D4', cursor: 'pointer', transition: 'all 0.3s' }}>
              💬 Contact Me
            </button>
          </div>

          {/* Social icons */}
          <div style={{ display: 'flex', gap: '1rem' }}>
            {[
              { href: 'https://github.com', label: 'GitHub', icon: '⬛' },
              { href: 'https://linkedin.com', label: 'LinkedIn', icon: '🔗' },
              { href: 'https://leetcode.com', label: 'LeetCode', icon: '🏆' },
              { href: 'https://hackerrank.com', label: 'HackerRank', icon: '✅' },
            ].map(s => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" title={s.label} style={{ width: 40, height: 40, borderRadius: '10px', background: 'rgba(124,58,237,0.1)', border: '1px solid rgba(124,58,237,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem', transition: 'all 0.2s', textDecoration: 'none' }}
                onMouseEnter={e => { e.currentTarget.style.background='rgba(124,58,237,0.3)'; e.currentTarget.style.borderColor='#7C3AED'; }}
                onMouseLeave={e => { e.currentTarget.style.background='rgba(124,58,237,0.1)'; e.currentTarget.style.borderColor='rgba(124,58,237,0.3)'; }}>
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Right – Profile Image */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', animation: 'fadeInRight 0.8s ease' }}>
          <div style={{ position: 'relative' }}>
            {/* Glowing rings */}
            <div style={{ position: 'absolute', inset: -20, borderRadius: '50%', background: 'conic-gradient(from 0deg,#7C3AED,#2563EB,#06B6D4,#7C3AED)', animation: 'spin 6s linear infinite', zIndex: 0 }}></div>
            <div style={{ position: 'absolute', inset: -16, borderRadius: '50%', background: '#050514', zIndex: 1 }}></div>
            <div style={{ position: 'relative', zIndex: 2, width: '280px', height: '280px', borderRadius: '50%', overflow: 'hidden', border: '3px solid rgba(124,58,237,0.4)' }}>
              <img
                src="https://ui-avatars.com/api/?name=Monisha+LT&size=280&background=7C3AED&color=fff&bold=true&font-size=0.4"
                alt="Monisha L.T."
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
            {/* Floating badge */}
            <div style={{ position: 'absolute', bottom: 20, right: -30, background: 'rgba(5,5,20,0.9)', border: '1px solid rgba(6,182,212,0.4)', borderRadius: '12px', padding: '0.5rem 0.875rem', fontSize: '0.8rem', color: '#06B6D4', fontFamily: 'Inter,sans-serif', fontWeight: 600, zIndex: 3, whiteSpace: 'nowrap' }}>
              🎓 B.Tech AI & DS
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div style={{ position: 'absolute', bottom: '2rem', left: '50%', transform: 'translateX(-50%)', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', opacity: 0.6 }}>
        <span style={{ fontFamily: 'Inter,sans-serif', fontSize: '0.75rem', color: 'rgba(200,200,255,0.6)' }}>Scroll Down</span>
        <div style={{ width: 24, height: 36, border: '2px solid rgba(124,58,237,0.5)', borderRadius: '12px', display: 'flex', justifyContent: 'center', paddingTop: '6px' }}>
          <div style={{ width: 4, height: 8, background: '#7C3AED', borderRadius: '2px', animation: 'scrollBounce 1.5s ease infinite' }}></div>
        </div>
      </div>

      <style>{`
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-18px)} }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes fadeInLeft { from{opacity:0;transform:translateX(-40px)} to{opacity:1;transform:translateX(0)} }
        @keyframes fadeInRight { from{opacity:0;transform:translateX(40px)} to{opacity:1;transform:translateX(0)} }
        @keyframes scrollBounce { 0%,100%{transform:translateY(0)} 50%{transform:translateY(10px)} }
        @media (max-width:768px) {
          #home > div > div { grid-template-columns:1fr !important; }
          #home > div > div > div:last-child { display:none !important; }
        }
      `}</style>
    </section>
  );
}
