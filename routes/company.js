const express = require('express');
const router = express.Router();
const Company = require('../models/company');
const Project = require('../models/project');

// Create (POST request to add a new company)
router.post('/', async (req, res) => {
  try {
    const newCompany = new Company(req.body);
    await newCompany.save();
    res.status(201).json(newCompany);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Read All (GET request to get all companies)
router.get('/', async (req, res) => {
  try {
    const companies = await Company.find().populate('projects').populate('files');
    res.status(200).json(companies);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Read Single (GET request to get a single company by ID)
router.get('/:id', async (req, res) => {
  try {
    const company = await Company.findById(req.params.id).populate('projects').populate('files');
    if (!company) {
      return res.status(404).json({ error: 'Company not found' });
    }
    res.status(200).json(company);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update (PUT request to update a company by ID)
router.put('/:id', async (req, res) => {
  try {
    const updatedCompany = await Company.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedCompany) {
      return res.status(404).json({ error: 'Company not found' });
    }
    res.status(200).json(updatedCompany);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete (DELETE request to delete a company by ID)
router.delete('/:id', async (req, res) => {
  try {
    const deletedCompany = await Company.findByIdAndDelete(req.params.id);
    if (!deletedCompany) {
      return res.status(404).json({ error: 'Company not found' });
    }
    res.status(200).json({ message: 'Company deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add Project to Company (POST request to add a project to a company)
router.post('/:companyId/projects', async (req, res) => {
  try {
    const company = await Company.findById(req.params.companyId);
    if (!company) {
      return res.status(404).json({ error: 'Company not found' });
    }

    const newProject = new Project(req.body);
    await newProject.save();

    company.projects.push(newProject._id);
    await company.save();

    res.status(201).json(company);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Add User Experience to Project (POST request to add user experience to a project)
router.post('/:companyId/projects/:projectId/user-experiences', async (req, res) => {
  try {
    const project = await Project.findById(req.params.projectId);
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    project.userExperience.push(req.body);
    await project.save();

    res.status(201).json(project);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
