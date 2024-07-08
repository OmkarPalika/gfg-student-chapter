import User from '../models/User.js';

async function getUsers(req, res) {
  try {
    const filter = req.query;
    const users = await User.find(filter).select('-password');
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Error fetching users' });
  }
}

async function getUser(id) {
  return User.findById(id).select('-password');
}

async function approveUser(req, res) {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['approved', 'rejected'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    user.approvalStatus = status;
    await user.save();

    res.status(200).json({ message: `User ${status}` });
  } catch (error) {
    console.error('Error approving user:', error);
    res.status(500).json({ error: 'Error approving user' });
  }
}

async function getProfile(req, res) {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error('Error fetching profile:', error);
    res.status(500).json({ error: 'Error fetching profile' });
  }
}

async function updateProfile(req, res) {
  try {
    const { name, email, bio, interests, location } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { name, email, bio, interests, location },
      { new: true, runValidators: true }
    );

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(400).json({ error: 'Error updating profile' });
  }
}

export {
  getUsers,
  getUser,
  approveUser,
  getProfile,
  updateProfile,
};
