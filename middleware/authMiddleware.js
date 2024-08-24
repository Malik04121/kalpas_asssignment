
const jwt = require('jsonwebtoken');
const { User } = require('../model/userModel');

const verifyToken = (req, res, next) => {
    const token = req.header('Authorization').replace('Bearer ', '');
    if (!token) {
        return res.status(401).json({ message: 'Access Denied: No Token Provided!' });
    }

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = verified;
        console.log(req.user,"user")
        next();
    } catch (error) {
        res.status(400).json({ message: 'Invalid Token!' });
    }
};

const isAuthor = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.userId);
        if (user.role !== 'author') {
            return res.status(403).json({ message: 'Access Denied: Only authors can perform this action.' });
        }
        req.userDetails = user;
        next();
    } catch (error) {
        res.status(500).json({ message: 'Server Error!' });
    }
};

module.exports = { verifyToken, isAuthor };