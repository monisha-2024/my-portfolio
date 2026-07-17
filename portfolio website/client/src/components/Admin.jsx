import React, { useState, useEffect } from 'react';
import { Lock, Plus, Edit, Trash2, LogOut, Mail, FileText, CheckCircle, AlertTriangle } from 'lucide-react';

export default function Admin() {
  const [token, setToken] = useState(localStorage.getItem('adminToken') || '');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [activeTab, setActiveTab] = useState('projects'); // 'projects' | 'messages'

  // Data States
  const [projects, setProjects] = useState([]);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  // Project Form State
  const [formMode, setFormMode] = useState('create'); // 'create' | 'edit'
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [projectForm, setProjectForm] = useState({
    title: '',
    description: '',
    technologies: '',
    githubLink: '',
    liveLink: '',
    imageUrl: '',
    category: 'Full-Stack'
  });
  const [formStatus, setFormStatus] = useState(null);

  // Check and fetch data when authenticated
  useEffect(() => {
    if (token) {
      // Validate token
      const verifyToken = async () => {
        try {
          const res = await fetch('/api/auth/verify', {
            headers: { 'Authorization': `Bearer ${token}` }
          });
          if (!res.ok) {
            handleLogout();
          } else {
            fetchData();
          }
        } catch (err) {
          handleLogout();
        }
      };
      verifyToken();
    }
  }, [token]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const headers = { 'Authorization': `Bearer ${token}` };

      // Fetch Projects
      const projRes = await fetch('/api/projects');
      const projData = await projRes.json();
      setProjects(projData);

      // Fetch Messages
      const msgRes = await fetch('/api/messages', { headers });
      if (msgRes.ok) {
        const msgData = await msgRes.json();
        setMessages(msgData);
      }
    } catch (err) {
      console.error('Error fetching admin data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setAuthError('');
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.msg || 'Invalid password');
      }
      localStorage.setItem('adminToken', data.token);
      setToken(data.token);
    } catch (err) {
      setAuthError(err.message);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    setToken('');
    setProjects([]);
    setMessages([]);
  };

  // PROJECT ACTIONS
  const handleProjectFormChange = (e) => {
    setProjectForm({ ...projectForm, [e.target.name]: e.target.value });
  };

  const resetProjectForm = () => {
    setProjectForm({
      title: '',
      description: '',
      technologies: '',
      githubLink: '',
      liveLink: '',
      imageUrl: '',
      category: 'Full-Stack'
    });
    setFormMode('create');
    setSelectedProjectId(null);
    setFormStatus(null);
  };

  const handleEditProjectInit = (proj) => {
    setFormMode('edit');
    setSelectedProjectId(proj._id);
    setProjectForm({
      title: proj.title || '',
      description: proj.description || '',
      technologies: Array.isArray(proj.technologies) ? proj.technologies.join(', ') : '',
      githubLink: proj.githubLink || '',
      liveLink: proj.liveLink || '',
      imageUrl: proj.imageUrl || '',
      category: proj.category || 'Full-Stack'
    });
    setFormStatus(null);
  };

  const handleProjectSubmit = async (e) => {
    e.preventDefault();
    setFormStatus(null);

    const payload = {
      ...projectForm,
      technologies: projectForm.technologies.split(',').map(s => s.trim()).filter(Boolean)
    };

    try {
      const url = formMode === 'create' ? '/api/projects' : `/api/projects/${selectedProjectId}`;
      const method = formMode === 'create' ? 'POST' : 'PUT';

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.msg || 'Failed to save project');
      }

      setFormStatus({ type: 'success', message: `Project ${formMode === 'create' ? 'created' : 'updated'} successfully!` });
      resetProjectForm();
      fetchData();
    } catch (err) {
      setFormStatus({ type: 'error', message: err.message });
    }
  };

  const handleProjectDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return;

    try {
      const res = await fetch(`/api/projects/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (!res.ok) {
        throw new Error('Failed to delete project');
      }

      fetchData();
    } catch (err) {
      alert(err.message);
    }
  };

  // RENDER LOGIN SCREEN
  if (!token) {
    return (
      <div className="admin-login-wrapper">
        <div className="glow-bg" style={{ top: '25%', left: '25%' }}></div>
        <div className="glass-panel admin-login-card">
          <h2>Admin Dashboard</h2>
          <p>Please enter your administrator credential key to manage this website.</p>
          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div className="form-group">
              <label htmlFor="adminPassword">Password</label>
              <input
                type="password"
                id="adminPassword"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-input"
                placeholder="••••••••"
                required
              />
            </div>

            {authError && (
              <div className="form-status error" style={{ padding: '0.5rem 0.75rem', fontSize: '0.85rem' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <AlertTriangle size={16} />
                  {authError}
                </span>
              </div>
            )}

            <button type="submit" className="btn btn-primary" style={{ justifyContent: 'center' }}>
              <Lock size={16} />
              Unlock Console
            </button>
          </form>
        </div>
      </div>
    );
  }

  // RENDER ADMIN DASHBOARD
  return (
    <div className="admin-container">
      <div className="admin-header">
        <div>
          <h1 style={{ fontSize: '2.25rem' }}>Admin Control Console</h1>
          <p style={{ color: 'var(--text-secondary)' }}>Log in authorized. Manage showcase items and form responses.</p>
        </div>
        <button className="btn btn-secondary" onClick={handleLogout} style={{ display: 'flex', gap: '0.5rem' }}>
          <LogOut size={16} /> Log Out
        </button>
      </div>

      <div className="admin-tabs">
        <button
          className={`admin-tab ${activeTab === 'projects' ? 'active' : ''}`}
          onClick={() => setActiveTab('projects')}
        >
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <FileText size={18} /> Manage Projects
          </span>
        </button>
        <button
          className={`admin-tab ${activeTab === 'messages' ? 'active' : ''}`}
          onClick={() => setActiveTab('messages')}
        >
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Mail size={18} /> Inbox ({messages.length})
          </span>
        </button>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-secondary)' }}>
          <p>Fetching control board database data...</p>
        </div>
      ) : activeTab === 'projects' ? (
        /* PROJECTS TAB */
        <div className="admin-grid">
          {/* List of projects */}
          <div className="admin-list-section">
            <h3 style={{ fontSize: '1.25rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>Active Showcase Items</h3>
            {projects.length === 0 ? (
              <p style={{ color: 'var(--text-muted)' }}>No projects stored in the database.</p>
            ) : (
              projects.map((proj) => (
                <div key={proj._id} className="admin-item-card">
                  <div className="admin-item-info">
                    <h4>{proj.title}</h4>
                    <p>{proj.category} • {Array.isArray(proj.technologies) ? proj.technologies.slice(0, 3).join(', ') : ''}</p>
                  </div>
                  <div className="admin-item-actions">
                    <button className="btn btn-secondary" onClick={() => handleEditProjectInit(proj)} style={{ padding: '0.5rem' }}>
                      <Edit size={16} />
                    </button>
                    <button className="btn btn-danger" onClick={() => handleProjectDelete(proj._id)} style={{ padding: '0.5rem' }}>
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Create/Edit Form */}
          <div className="admin-form-section">
            <div className="glass-panel" style={{ padding: '1.5rem' }}>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Plus size={20} />
                {formMode === 'create' ? 'Add New Showcase Item' : 'Modify Showcase Item'}
              </h3>
              
              <form onSubmit={handleProjectSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div className="form-group">
                  <label>Project Title *</label>
                  <input
                    type="text"
                    name="title"
                    value={projectForm.title}
                    onChange={handleProjectFormChange}
                    className="form-input"
                    placeholder="e.g. Portfolio Website"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Project Description *</label>
                  <textarea
                    name="description"
                    value={projectForm.description}
                    onChange={handleProjectFormChange}
                    className="form-textarea"
                    placeholder="Provide description of the project"
                    style={{ minHeight: '80px' }}
                    required
                  ></textarea>
                </div>

                <div className="form-group">
                  <label>Technologies * (comma separated)</label>
                  <input
                    type="text"
                    name="technologies"
                    value={projectForm.technologies}
                    onChange={handleProjectFormChange}
                    className="form-input"
                    placeholder="React, Node.js, Express, SQLite"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Category</label>
                  <select
                    name="category"
                    value={projectForm.category}
                    onChange={handleProjectFormChange}
                    className="form-input"
                    style={{ background: 'var(--bg-secondary)' }}
                  >
                    <option value="Full-Stack">Full-Stack</option>
                    <option value="Frontend">Frontend</option>
                    <option value="Backend">Backend</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>GitHub Repository URL</label>
                  <input
                    type="url"
                    name="githubLink"
                    value={projectForm.githubLink}
                    onChange={handleProjectFormChange}
                    className="form-input"
                    placeholder="https://github.com/..."
                  />
                </div>

                <div className="form-group">
                  <label>Live URL link</label>
                  <input
                    type="url"
                    name="liveLink"
                    value={projectForm.liveLink}
                    onChange={handleProjectFormChange}
                    className="form-input"
                    placeholder="https://..."
                  />
                </div>

                <div className="form-group">
                  <label>Cover Image URL</label>
                  <input
                    type="url"
                    name="imageUrl"
                    value={projectForm.imageUrl}
                    onChange={handleProjectFormChange}
                    className="form-input"
                    placeholder="https://picsum.photos/600/400"
                  />
                </div>

                {formStatus && (
                  <div className={`form-status ${formStatus.type}`} style={{ padding: '0.5rem 0.75rem', fontSize: '0.85rem' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      {formStatus.type === 'success' ? <CheckCircle size={16} /> : <AlertTriangle size={16} />}
                      {formStatus.message}
                    </span>
                  </div>
                )}

                <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
                  <button type="submit" className="btn btn-primary" style={{ flex: 1, justifyContent: 'center' }}>
                    {formMode === 'create' ? 'Save Project' : 'Save Changes'}
                  </button>
                  {formMode === 'edit' && (
                    <button type="button" className="btn btn-secondary" onClick={resetProjectForm}>
                      Cancel
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      ) : (
        /* MESSAGES TAB */
        <div className="admin-messages-list">
          <h3 style={{ fontSize: '1.25rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>Submitted Contact Forms</h3>
          {messages.length === 0 ? (
            <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '2rem' }}>No messages in inbox.</p>
          ) : (
            messages.map((msg) => (
              <div key={msg._id} className="message-card-admin">
                <div className="message-card-header">
                  <div className="message-meta">
                    <h4>{msg.name}</h4>
                    <p style={{ color: 'var(--accent-secondary)' }}>{msg.email}</p>
                  </div>
                  <div className="message-date">
                    {new Date(msg.date).toLocaleString()}
                  </div>
                </div>
                <div className="message-subject">Subject: {msg.subject || '(No Subject)'}</div>
                <div className="message-body">{msg.message}</div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
