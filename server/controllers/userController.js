import User from '../models/User';

export async function getProfile(req, res) {
  try {
    const user = await User.findById(req.user._id).select('-password');
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function updateProfile(req, res) {
  try {
    const { name, bio, interests, avatar } = req.body;
    const user = await User.findById(req.user._id);
    user.name = name || user.name;
    user.bio = bio || user.bio;
    user.interests = interests || user.interests;
    user.avatar = avatar || user.avatar;
    await user.save();
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

export async function getUsers(req, res) {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function getUser(req, res) {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}