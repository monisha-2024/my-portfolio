import React, { useState, useEffect } from 'react';

const navLinks = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'certifications', label: 'Certifications' },
  { id: 'achievements', label: 'Achievements' },
  { id: 'coding', label: 'Coding Profiles' },
  { id: 'contact', label: 'Contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('home');
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      const sections = navLinks.map(l => document.getElementById(l.id)).filter(Boolean);
      const scrollPos = window.scrollY + 120;
      for (let i = sections.length - 1; i >= 0; i--) {
        if (scrollPos >= sections[i].offsetTop) {
          setActive(navLinks[i].id);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
      background: scrolled ? 'rgba(5,5,20,0.92)' : 'transparent',
      backdropFilter: scrolled ? 'blur(20px)' : 'none',
      borderBottom: scrolled ? '1px solid rgba(99,102,241,0.15)' : 'none',
      transition: 'all 0.4s ease',
      padding: '0 1rem',
    }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem 1.5rem' }}>
        {/* Logo */}
        <div onClick={() => scrollTo('home')} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div style={{ width: 36, height: 36, borderRadius: '10px', background: 'linear-gradient(135deg,#7C3AED,#2563EB)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem', fontWeight: 800, color: '#fff', fontFamily: 'Poppins,sans-serif' }}>M</div>
          <span style={{ fontFamily: 'Poppins,sans-serif', fontWeight: 700, fontSize: '1.1rem', background: 'linear-gradient(135deg,#7C3AED,#06B6D4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Monisha L.T.</span>
        </div>

        {/* Desktop Links */}
        <ul style={{ display: 'flex', gap: '0.25rem', listStyle: 'none', margin: 0, padding: 0, flexWrap: 'wrap', justifyContent: 'center' }} className="desktop-nav">
          {navLinks.map(link => (
            <li key={link.id}>
              <button onClick={() => scrollTo(link.id)} style={{
                background: 'none', border: 'none', cursor: 'pointer',
                fontFamily: 'Inter,sans-serif', fontSize: '0.82rem', fontWeight: 500,
                color: active === link.id ? '#fff' : 'rgba(200,200,255,0.7)',
                padding: '0.4rem 0.65rem', borderRadius: '6px',
                background: active === link.id ? 'linear-gradient(135deg,rgba(124,58,237,0.3),rgba(37,99,235,0.3))' : 'transparent',
                borderBottom: active === link.id ? '2px solid #7C3AED' : '2px solid transparent',
                transition: 'all 0.2s',
              }}>
                {link.label}
              </button>
            </li>
          ))}
        </ul>

        {/* Mobile Toggle */}
        <button onClick={() => setMenuOpen(!menuOpen)} style={{ display: 'none', background: 'none', border: '1px solid rgba(124,58,237,0.5)', color: '#fff', borderRadius: '8px', padding: '0.4rem 0.75rem', cursor: 'pointer', fontFamily: 'Poppins,sans-serif' }} className="mobile-toggle">
          {menuOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div style={{ background: 'rgba(5,5,20,0.98)', backdropFilter: 'blur(20px)', borderTop: '1px solid rgba(124,58,237,0.3)', padding: '1rem' }}>
          {navLinks.map(link => (
            <button key={link.id} onClick={() => scrollTo(link.id)} style={{ display: 'block', width: '100%', textAlign: 'left', background: 'none', border: 'none', color: active === link.id ? '#7C3AED' : 'rgba(200,200,255,0.8)', fontFamily: 'Inter,sans-serif', fontSize: '1rem', padding: '0.75rem 1rem', cursor: 'pointer', borderRadius: '8px' }}>
              {link.label}
            </button>
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 900px) {
          .desktop-nav { display: none !important; }
          .mobile-toggle { display: flex !important; }
        }
      `}</style>
    </nav>
  );
}
