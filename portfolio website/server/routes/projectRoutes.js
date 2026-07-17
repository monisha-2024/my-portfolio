const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const { dbAPI } = require('../config/db');

// @route   GET api/projects
// @desc    Get all projects
// @access  Public
router.get('/', async (req, res) => {
  try {
    const projects = await dbAPI.getProjects();
    res.json(projects);
  } catch (err) {
    console.error('Error fetching projects:', err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/projects/:id
// @desc    Get project by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const project = await dbAPI.getProjectById(req.params.id);
    if (!project) {
      return res.status(404).json({ msg: 'Project not found' });
    }
    res.json(project);
  } catch (err) {
    console.error('Error fetching project:', err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/projects
// @desc    Create a project
// @access  Private (Admin)
router.post('/', auth, async (req, res) => {
  const { title, description, technologies, githubLink, liveLink, imageUrl, category } = req.body;

  if (!title || !description) {
    return res.status(400).json({ msg: 'Please include title and description' });
  }

  try {
    const project = await dbAPI.createProject({
      title,
      description,
      technologies: Array.isArray(technologies) ? technologies : [],
      githubLink,
      liveLink,
      imageUrl,
      category
    });
    res.json(project);
  } catch (err) {
    console.error('Error creating project:', err.message);
    res.status(500).send('Server Error');
  }
});

// @route   PUT api/projects/:id
// @desc    Update a project
// @access  Private (Admin)
router.put('/:id', auth, async (req, res) => {
  const { title, description, technologies, githubLink, liveLink, imageUrl, category } = req.body;

  try {
    // Check if project exists
    const existing = await dbAPI.getProjectById(req.params.id);
    if (!existing) {
      return res.status(404).json({ msg: 'Project not found' });
    }

    const updated = await dbAPI.updateProject(req.params.id, {
      title: title || existing.title,
      description: description || existing.description,
      technologies: Array.isArray(technologies) ? technologies : existing.technologies,
      githubLink: githubLink !== undefined ? githubLink : existing.githubLink,
      liveLink: liveLink !== undefined ? liveLink : existing.liveLink,
      imageUrl: imageUrl !== undefined ? imageUrl : existing.imageUrl,
      category: category !== undefined ? category : existing.category
    });

    res.json(updated);
  } catch (err) {
    console.error('Error updating project:', err.message);
    res.status(500).send('Server Error');
  }
});

// @route   DELETE api/projects/:id
// @desc    Delete a project
// @access  Private (Admin)
router.delete('/:id', auth, async (req, res) => {
  try {
    const existing = await dbAPI.getProjectById(req.params.id);
    if (!existing) {
      return res.status(404).json({ msg: 'Project not found' });
    }

    await dbAPI.deleteProject(req.params.id);
    res.json({ msg: 'Project removed' });
  } catch (err) {
    console.error('Error deleting project:', err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
