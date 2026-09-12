const express = require('express');
const router = express.Router();

const User = require('../../models/user.js');

const { validateBody, schemas } = require('../../middlewares/validation-middleware.js');
const { setRatelimit, checkRatelimit, removeRatelimit } = require('../../utilities/ratelimit.js');
const { verifyPassword, generateToken } = require('../../utilities/auth.js');

const purposeRatelimit = "login";

router.post('/login', validateBody(schemas.login), async (req, res, next) => {
    const { email, password } = req.body;
    const ipAddress = req.ip;

    try {
        const { success, statusCode, message } = await checkRatelimit(purposeRatelimit, ipAddress, email);
        if (!success) return res.status(statusCode).json({ success, message });

        const userDocument = await User.findOne({ email });
        if (!userDocument) {
            await setRatelimit(purposeRatelimit, ipAddress, email);
            return res.status(400).json({ success: false, message: 'Email atau password salah.' });
        };

        const { password: currentHashPassword, accountStatus, isDefaultPassword, role } = userDocument;

        if (accountStatus === 'non_active') return res.status(400).json({ success: false, message: 'Akun Anda telah dinonaktifkan. Hubungi admin.' });

        const isValidPassword = await verifyPassword(currentHashPassword, password);
        if (!isValidPassword) {
            await setRatelimit(purposeRatelimit, ipAddress, email);
            return res.status(400).json({ success: false, message: 'Email atau password salah.' });
        };

        await removeRatelimit(purposeRatelimit, ipAddress, email);

        const token = generateToken(userDocument);
        const forceChangePassword = role === 'student' && isDefaultPassword;

        res.json({ success: true, token, forceChangePassword, role });
    } catch (error) {
        next(error);
    };
});

module.exports = router;