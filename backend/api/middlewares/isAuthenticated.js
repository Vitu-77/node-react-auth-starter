const jwt = require('jsonwebtoken');

const isAuthenticated = (req, res, next) => {
    const { token } = req.headers;

    if (!token) {
        return res.status(401).json({ isAuthenticated: false });
    }

    jwt.verify(token, process.env.SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ isAuthenticated: false });
        }
        else {
            next( );
        }
    });
}

module.exports = isAuthenticated;