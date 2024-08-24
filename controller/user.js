const { User } = require("../model/userModel");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const i18n = require('../config/i18nconfig');

const createUser = async (req, res) => {
    const { username, email, password, role, language } = req.body;
    try {
        if (!username || !password || !role || !email) {
            return res.status(400).json({ message: i18n.__({ phrase: "ALL_FIELDS_REQUIRED", locale: language || 'en' }) });
        }

        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: i18n.__({ phrase: "USER_ALREADY_EXISTS", locale: language || 'en' }) });
        }

        const encryptedPassword = await bcrypt.hash(password, 10);
        user = new User({ username, password: encryptedPassword, role, email ,language});
        await user.save();

        const payload = { user: { _id: user._id } };
        const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });

        res.setHeader('Authorization', `Bearer ${token}`);
        res.status(201).json({ msg: i18n.__({ phrase: "REGISTER_SUCCESS", locale: language || 'en' }) });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: 500,
            data: [],
            message: i18n.__({ phrase: "SERVER_ERROR", locale: language || 'en' }),
        });
    }
};

const loginUser = async (req, res) => {
    const { email, password, language } = req.body;
    try {
        if (!email || !password) {
            return res.status(400).json({ message: i18n.__({ phrase: "EMAIL_PASSWORD_REQUIRED", locale: language || 'en' }) });
        }

        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            return res.status(404).json({ message: i18n.__({ phrase: "USER_NOT_FOUND", locale: existingUser.language || 'en' }) });
        }

        const isMatch = await bcrypt.compare(password, existingUser.password);
        if (!isMatch) {
            return res.status(400).json({ message: i18n.__({ phrase: "INVALID_CREDENTIALS", locale: existingUser.language || 'en' }) });
        }

        const token = jwt.sign(
            { userId: existingUser._id, email: existingUser.email,language:existingUser.language },
            process.env.JWT_SECRET_KEY,
            { expiresIn: '1h' }
        );

        res.setHeader('Authorization', `Bearer ${token}`);
        res.status(200).json({ message: i18n.__({ phrase: "LOGIN_SUCCESS", locale: existingUser.language || 'en' }),token:token });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: 500,
            data: [],
            message: i18n.__({ phrase: "SERVER_ERROR", locale: language || 'en' }),
        });
    }
};

module.exports = { createUser, loginUser };