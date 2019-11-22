const User = require('../models/User');
const jwt = require('jsonwebtoken');

module.exports = {
    isAuthenticated(req, res) {
        const { token } = req.headers;

        if (!token) {
            return res.status(401).json({ isAuthenticated: false });
        }

        jwt.verify(token, process.env.SECRET, (err, decoded) => {
            if (err) {
                return res.json({ isAuthenticated: false });
            }
            else {
                return res.status(200).json({ isAuthenticated: true });
            }

        });
    },

    async authenticate(req, res) {
        const { username, password } = req.body;

        console.log({ username, password });

        const user = await User.findOne({
            where: { username }
        });

        if (!user) {
            return res.status(200).json({ error: 'user not found' });
        }

        if (password !== user.password) {
            return res.status(200).json({ error: 'invalid password' });
        }

        const token = await jwt.sign({ username, password }, process.env.SECRET);

        return res.status(200).json({ user, auth: token });
    }
}