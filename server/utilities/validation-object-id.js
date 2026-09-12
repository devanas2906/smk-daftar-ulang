const mongoose = require('mongoose');

const validateObjectId = (id) => {
    return { isValidObjectId: mongoose.Types.ObjectId.isValid(id) };
};

module.exports = { validateObjectId };