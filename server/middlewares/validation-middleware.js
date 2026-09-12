const Joi = require('joi');
const validator = require('validator');

const validateBody = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body, { abortEarly: false, stripUnknown: true });
  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details.map((detail) => detail.message).join(', ')
    });
  }
  next();
};

const schemas = {
  otpStatus: Joi.object({
    email: Joi.string().allow("").email().required()
  }),
  sendOtp: Joi.object({
    email: Joi.string().email().required()
  }),
  otpVerify: Joi.object({
    email: Joi.string().email().required(),
    otpCode: Joi.string().min(6).max(6).required(),
  }),
  register: Joi.object({
    registrationToken: Joi.string().required(),
    nisn: Joi.string().min(10).max(10).trim().required(),
    name: Joi.string().min(3).max(20).trim(),
    parentName: Joi.string().trim().min(3).max(20).required(),
    address: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).max(12).required(),
    paymentAmount: Joi.number().positive().required(),
    batch: Joi.string().required(),
    major: Joi.string().required()
  }),
  login: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).max(12).required()
  }),
  forgotChangePassword: Joi.object({
    forgotPasswordToken: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).max(12).required()
  }),
  updateUser: Joi.object({
    email: Joi.string().email(),
    currentPassword: Joi.string().min(8).max(12).allow(""),
    password: Joi.string().min(8).max(12).allow("")
  }),
  changePassword: Joi.object({
    newPassword: Joi.string().min(8).max(12).required()
  }),
  createStudent: Joi.object({
    email: Joi.string().email().required(),
    nisn: Joi.string().trim().min(10).max(10).required(),
    name: Joi.string().trim().min(3).max(20).required(),
    batch: Joi.string().required(),
    major: Joi.string().required(),
    class: Joi.string().required(),
    parentName: Joi.string().trim().min(3).max(20).required(),
    address: Joi.string().required(),
  }),
  updateStudent: Joi.object({
    email: Joi.string().email().required(),
    nisn: Joi.string().trim().min(10).max(10).required(),
    name: Joi.string().min(3).max(20).trim().required(),
    batch: Joi.string().required(),
    major: Joi.string().required(),
    class: Joi.string(),
    parentName: Joi.string().trim().min(3).max(20).required(),
    address: Joi.string().required(),
    accountStatus: Joi.string().valid('active', 'non_active')
  }),
  masterData: Joi.object({
    majorName: Joi.string().trim(),
    majorCode: Joi.string().trim(),
    entryYear: Joi.string().trim(),
    className: Joi.string().trim()
  }),
  reRegistration: Joi.object({
    paymentAmount: Joi.number().positive().required(),
    modeDraft: Joi.string().valid("draft"),
    files: Joi.string().custom((files, helpers) => {
      try {
        const parseFiles = JSON.parse(files);

        if (!Array.isArray(parseFiles)) return helpers.message("Format dokumen tidak valid");
        if (parseFiles.length > 4) return helpers.message("Jumlah dokumen melebihi batas");

        const isValidFileValues = parseFiles.every(file => {
          return typeof file === "string" && (file.startsWith("http://") || file.startsWith("https://"));
        });

        if (!isValidFileValues) return helpers.message("Format dokumen tidak valid");

        return files;
      } catch {
        return helpers.message("Format dokumen tidak valid");
      };
    })
  }),
  noteReRegistration: Joi.object({
    note: Joi.string().trim().min(3).required()
  }),
  updateSchool: Joi.object({
    schoolName: Joi.string().trim().required(),
    schoolAddress: Joi.string().trim().required(),
    schoolEmail: Joi.string().trim().email().required(),
    schoolNumberPhone: Joi.string().trim().custom((phone, helpers) => {
      const isPhoneValid = validator.isMobilePhone(phone, "id-ID");
      if (!isPhoneValid) return helpers.message("Format nomor telepon sekolah tidak valid.");

      return phone;
    }).required(),

    principalName: Joi.string().min(3).max(20).trim(),
    treasurerName: Joi.string().min(3).max(20).trim()
  }),
};

module.exports = { validateBody, schemas };
