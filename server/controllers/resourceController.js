import Resource from '../models/Resource';

export async function createResource(req, res) {
  try {
    const { title, description, content, category, attachments } = req.body;
    const resource = new Resource({
      title,
      description,
      content,
      category,
      attachments,
      author: req.user._id
    });
    await resource.save();
    res.status(201).json(resource);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

export async function getResources(req, res) {
  try {
    const resources = await Resource.find().populate('author', 'name email');
    res.json(resources);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function getResource(req, res) {
  try {
    const resource = await Resource.findById(req.params.id).populate('author', 'name email');
    if (!resource) {
      return res.status(404).json({ error: 'Resource not found' });
    }
    res.json(resource);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function updateResource(req, res) {
  try {
    const resource = await Resource.findById(req.params.id);
    if (!resource) {
      return res.status(404).json({ error: 'Resource not found' });
    }
    if (resource.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: 'Not authorized to update this resource' });
    }
    const { title, description, content, category, attachments } = req.body;
    resource.title = title || resource.title;
    resource.description = description || resource.description;
    resource.content = content || resource.content;
    resource.category = category || resource.category;
    resource.attachments = attachments || resource.attachments;
    resource.updatedAt = Date.now();
    await resource.save();
    res.json(resource);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

export async function deleteResource(req, res) {
  try {
    const resource = await Resource.findById(req.params.id);
    if (!resource) {
      return res.status(404).json({ error: 'Resource not found' });
    }
    if (resource.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: 'Not authorized to delete this resource' });
    }
    await resource.remove();
    res.json({ message: 'Resource deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}