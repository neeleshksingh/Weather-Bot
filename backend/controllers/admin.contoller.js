const User = require('../models/user.model');
const blockUser = async (req, res) => {
    try {
        const user = await User.findOneAndUpdate(
            { telegramId: req.params.telegramId },
            { isBlocked: true },
            { new: true }
        );
        if (!user) return res.status(404).json({ status: 'failed', message: 'User not found' });
        res.status(200).json({ status: 'success', data: user });
    } catch (error) {
        res.status(500).json({ status: 'failed', message: error.message });
    }
};
const updateSettings = async (req, res) => {
    res.status(200).json({ status: 'success', message: 'Settings updated' });
};
module.exports = { blockUser, updateSettings };