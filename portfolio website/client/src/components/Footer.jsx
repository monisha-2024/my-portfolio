import React from 'react';

export default function Footer() {
  return (
    <footer style={{ background: '#030310', borderTop: '1px solid rgba(124,58,237,0.2)', padding: '2.5rem 2rem' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Top Row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1.5rem', marginBottom: '2rem', paddingBottom: '2rem', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ width: 40, height: 40, borderRadius: '12px', background: 'linear-gradient(135deg,#7C3AED,#2563EB)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.25rem', fontWeight: 800, color: '#fff', fontFamily: 'Poppins,sans-serif' }}>M</div>
            <div>
              <p style={{ fontFamily: 'Poppins,sans-serif', fontWeight: 700, fontSize: '1rem', color: '#fff' }}>Monisha L.T.</p>
              <p style={{ fontFamily: 'Inter,sans-serif', fontSize: '0.75rem', color: 'rgba(200,200,255,0.5)' }}>AI & Data Science Student</p>
            </div>
          </div>

          {/* Quick Links */}
          <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
            {['Home', 'About', 'Skills', 'Projects', 'Contact'].map(link => (
              <button key={link} onClick={() => document.getElementById(link.toLowerCase())?.scrollIntoView({ behavior: 'smooth' })} style={{ background: 'none', border: 'none', color: 'rgba(200,200,255,0.6)', fontFamily: 'Inter,sans-serif', fontSize: '0.85rem', cursor: 'pointer', transition: 'color 0.2s' }}
                onMouseEnter={e => e.target.style.color='#7C3AED'}
                onMouseLeave={e => e.target.style.color='rgba(200,200,255,0.6)'}>
                {link}
              </button>
            ))}
          </div>

          {/* Social Icons */}
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            {[
              { label: 'GitHub', icon: '⬛', href: 'https://github.com' },
              { label: 'LinkedIn', icon: '💼', href: 'https://linkedin.com' },
              { label: 'LeetCode', icon: '🏆', href: 'https://leetcode.com' },
              { label: 'HackerRank', icon: '✅', href: 'https://hackerrank.com' },
            ].map(s => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" title={s.label} style={{ width: 38, height: 38, borderRadius: '10px', background: 'rgba(124,58,237,0.1)', border: '1px solid rgba(124,58,237,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem', textDecoration: 'none', transition: 'all 0.2s' }}
                onMouseEnter={e => { e.currentTarget.style.background='rgba(124,58,237,0.3)'; e.currentTarget.style.transform='translateY(-2px)'; }}
                onMouseLeave={e => { e.currentTarget.style.background='rgba(124,58,237,0.1)'; e.currentTarget.style.transform='translateY(0)'; }}>
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Bottom */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem' }}>
          <p style={{ fontFamily: 'Inter,sans-serif', fontSize: '0.82rem', color: 'rgba(200,200,255,0.45)' }}>
            🎨 Designed & Developed by{' '}
            <span style={{ color: '#7C3AED', fontWeight: 600 }}>Monisha L.T.</span>
          </p>
          <p style={{ fontFamily: 'Inter,sans-serif', fontSize: '0.82rem', color: 'rgba(200,200,255,0.45)' }}>
            © {new Date().getFullYear()} Monisha L.T. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
