router.get('/:userId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId)
      .populate('vehicles')
      .select('-password');

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({
      name: user.username,
      email: user.email,
      vehicles: user.vehicles
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch profile' });
  }
});
