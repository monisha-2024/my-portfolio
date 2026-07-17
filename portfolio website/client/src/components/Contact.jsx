import React, { useState } from 'react';
import { useInView } from '../utils';

export default function Contact() {
  const [ref, inView] = useInView();
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      setStatus({ type: 'error', msg: 'Please fill in Name, Email, and Message.' });
      return;
    }
    setLoading(true);
    setStatus(null);
    try {
      const res = await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error('Server error');
      setStatus({ type: 'success', msg: '✅ Message sent successfully! I will get back to you soon.' });
      setForm({ name: '', email: '', subject: '', message: '' });
    } catch {
      setStatus({ type: 'error', msg: '❌ Failed to send. Please try again or email directly.' });
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    width: '100%', padding: '0.85rem 1rem', borderRadius: '10px',
    background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(124,58,237,0.25)',
    color: '#e2e8f0', fontFamily: 'Inter,sans-serif', fontSize: '0.9rem',
    outline: 'none', transition: 'all 0.2s',
  };

  const contactInfo = [
    { icon: '📧', label: 'Email', value: 'monisha.lt@example.com', href: 'mailto:monisha.lt@example.com', color: '#7C3AED' },
    { icon: '💼', label: 'LinkedIn', value: 'Monisha L.T.', href: 'https://linkedin.com', color: '#0A66C2' },
    { icon: '⬛', label: 'GitHub', value: '@monisha-lt', href: 'https://github.com', color: '#e2e8f0' },
    { icon: '📱', label: 'Phone', value: '+91 XXXXX XXXXX', href: 'tel:+91XXXXXXXXXX', color: '#06B6D4' },
  ];

  return (
    <section id="contact" style={{ padding: '6rem 2rem', background: '#080820' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div ref={ref} style={{ textAlign: 'center', marginBottom: '3.5rem', opacity: inView ? 1 : 0, transition: 'opacity 0.7s' }}>
          <p className="section-tag">GET IN TOUCH</p>
          <h2 className="section-title">Contact <span className="gradient-text">Me</span></h2>
          <div className="divider"></div>
          <p style={{ fontFamily: 'Inter,sans-serif', fontSize: '1rem', color: 'rgba(200,200,255,0.65)', marginTop: '1rem', maxWidth: '500px', margin: '1rem auto 0' }}>
            I'm open to internship opportunities, collaborations, and project discussions. Drop me a message!
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: '3rem' }}>
          {/* Info */}
          <div>
            <h3 style={{ fontFamily: 'Poppins,sans-serif', fontWeight: 700, fontSize: '1.25rem', color: '#fff', marginBottom: '1.75rem' }}>Let's work together! 🤝</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
              {contactInfo.map(c => (
                <a key={c.label} href={c.href} target="_blank" rel="noopener noreferrer" className="glass-card" style={{ display: 'flex', alignItems: 'center', gap: '0.875rem', padding: '1rem 1.25rem', textDecoration: 'none', color: 'inherit' }}>
                  <div style={{ width: 44, height: 44, borderRadius: '12px', background: `${c.color}15`, border: `1px solid ${c.color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', flexShrink: 0 }}>{c.icon}</div>
                  <div>
                    <p style={{ fontFamily: 'Inter,sans-serif', fontSize: '0.72rem', color: 'rgba(200,200,255,0.5)', fontWeight: 500, marginBottom: '0.15rem' }}>{c.label}</p>
                    <p style={{ fontFamily: 'Inter,sans-serif', fontSize: '0.9rem', color: '#e2e8f0', fontWeight: 600 }}>{c.value}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Form */}
          <div className="glass-card" style={{ padding: '2rem' }}>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ fontFamily: 'Inter,sans-serif', fontSize: '0.8rem', fontWeight: 600, color: 'rgba(200,200,255,0.6)', display: 'block', marginBottom: '0.4rem' }}>Full Name *</label>
                  <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="Monisha L.T." style={inputStyle}
                    onFocus={e => e.target.style.borderColor='#7C3AED'}
                    onBlur={e => e.target.style.borderColor='rgba(124,58,237,0.25)'} />
                </div>
                <div>
                  <label style={{ fontFamily: 'Inter,sans-serif', fontSize: '0.8rem', fontWeight: 600, color: 'rgba(200,200,255,0.6)', display: 'block', marginBottom: '0.4rem' }}>Email Address *</label>
                  <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="you@example.com" style={inputStyle}
                    onFocus={e => e.target.style.borderColor='#7C3AED'}
                    onBlur={e => e.target.style.borderColor='rgba(124,58,237,0.25)'} />
                </div>
              </div>

              <div>
                <label style={{ fontFamily: 'Inter,sans-serif', fontSize: '0.8rem', fontWeight: 600, color: 'rgba(200,200,255,0.6)', display: 'block', marginBottom: '0.4rem' }}>Subject</label>
                <input type="text" name="subject" value={form.subject} onChange={handleChange} placeholder="Internship Opportunity / Collaboration" style={inputStyle}
                  onFocus={e => e.target.style.borderColor='#7C3AED'}
                  onBlur={e => e.target.style.borderColor='rgba(124,58,237,0.25)'} />
              </div>

              <div>
                <label style={{ fontFamily: 'Inter,sans-serif', fontSize: '0.8rem', fontWeight: 600, color: 'rgba(200,200,255,0.6)', display: 'block', marginBottom: '0.4rem' }}>Message *</label>
                <textarea name="message" value={form.message} onChange={handleChange} placeholder="Write your message here..." rows={5} style={{ ...inputStyle, resize: 'vertical', minHeight: '120px' }}
                  onFocus={e => e.target.style.borderColor='#7C3AED'}
                  onBlur={e => e.target.style.borderColor='rgba(124,58,237,0.25)'} />
              </div>

              {status && (
                <div style={{ padding: '0.75rem 1rem', borderRadius: '8px', fontFamily: 'Inter,sans-serif', fontSize: '0.88rem', fontWeight: 500, background: status.type === 'success' ? 'rgba(16,185,129,0.1)' : 'rgba(239,68,68,0.1)', border: `1px solid ${status.type === 'success' ? 'rgba(16,185,129,0.3)' : 'rgba(239,68,68,0.3)'}`, color: status.type === 'success' ? '#6ee7b7' : '#fca5a5' }}>
                  {status.msg}
                </div>
              )}

              <button type="submit" disabled={loading} className="btn-glow" style={{ padding: '0.9rem', fontSize: '0.95rem', fontFamily: 'Poppins,sans-serif', borderRadius: '10px', justifyContent: 'center', display: 'flex', alignItems: 'center', gap: '0.5rem', opacity: loading ? 0.7 : 1 }}>
                {loading ? '⏳ Sending...' : '🚀 Send Message'}
              </button>
            </form>
          </div>
        </div>
      </div>

      <style>{`
        @media(max-width:768px){
          #contact > div > div:last-child { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
