const express = require('express');
const ReRegistration = require('../../models/reregistration.js');

const router = express.Router();

router.get('/rejected/:id', async (req, res, next) => {
    const userDocumentId = req.params.id;

    try {
        const registrationDocuments = await ReRegistration.find({ status: "rejected" }).populate({ path: "student", match: { user: userDocumentId } });
        const filteredRegistrationDocument = registrationDocuments.filter(registrationDocument => registrationDocument.student !== null)[0];

        res.json({ success: true, rejectedReRegistration: filteredRegistrationDocument });
    } catch (error) {
        next(error);
    };
});

module.exports = router;