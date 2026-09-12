const User = require('../models/user.js');
const { validateToken } = require('../utilities/auth.js');

const verifyToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) return res.status(401).json({ success: false, message: 'Token tidak ditemukan.' });

  const token = authHeader.split(' ')[1];

  try {
    const decoded = validateToken(token);
    const userDocument = await User.findById(decoded.id).select('-password');
    if (!userDocument) return res.status(401).json({ success: false, message: 'Pengguna tidak ditemukan.' });

    req.user = userDocument;
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: 'Sesi tidak valid atau telah kedaluwarsa.' });
  }
};

const requireRole = (...roles) => (req, res, next) => {
  if (!roles.includes(req.user.role)) {
    return res.status(403).json({ success: false, message: 'Anda tidak memiliki izin untuk mengakses halaman ini.' });
  }
  next();
};

const requirePasswordChange = (req, res, next) => {
  if (req.user.role === 'student' && req.user.isDefaultPassword) {
    return res.status(423).json({
      success: false,
      forceChangePassword: true,
      message: 'Anda wajib mengganti password default sebelum melanjutkan.'
    });
  }
  next();
};

const requireActiveAccount = (req, res, next) => {
  const { accountStatus } = req.user;
  const restrictedStatuses = ["pending_verification", "non_active", "rejected"];

  if (restrictedStatuses.includes(accountStatus)) return res.status(400).json({ success: false, message: "Status akun Anda saat ini tidak mengizinkan tindakan ini." });

  next();
};

const restrictStudentReRegistration = (req, res, next) => {
  const { accountStatus } = req.user;

  const requestMethod = req.method;
  const restrictedUpdateAccountStatuses = ["non_active", "rejected"];

  if (requestMethod === "POST") restrictedUpdateAccountStatuses.unshift("pending_verification")
  if (restrictedUpdateAccountStatuses.includes(accountStatus)) return res.status(400).json({ success: false, message: "Status akun Anda saat ini tidak mengizinkan untuk menambah atau mengubah data." });

  next();
};

module.exports = { verifyToken, requireRole, requirePasswordChange, requireActiveAccount, restrictStudentReRegistration };