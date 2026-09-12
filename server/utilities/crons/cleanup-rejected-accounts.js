const User = require('../../models/user.js');
const Student = require('../../models/student.js');

const ReRegistration = require('../../models/reregistration.js');
const Notification = require('../../models/notification.js');
const DeleteRequest = require('../../models/delete-request.js');

const { deleteAsset } = require('../../config/cloudinary.js');

const MongooseTransaction = require('../../utilities/mongoose-transaction.js');

let isCleanupRejectedAccountsJobRunning = false;

const taskCleanupRejectedAccounts = async () => {
    if (isCleanupRejectedAccountsJobRunning) return;
    isCleanupRejectedAccountsJobRunning = true;

    try {
        const currentDate = new Date();
        const userDocuments = await User.find({ accountStatus: "rejected", scheduledDeletionAt: { $lte: currentDate } });

        for (const userDocument of userDocuments) {
            const { _id: userDocumentId } = userDocument;
            const mongooseTransaction = new MongooseTransaction();
            const session = await mongooseTransaction.startTransaction();

            try {
                const { _id: studentDocumentId } = await Student.findOne({ user: userDocumentId });
                const reRegistrationDocuments = await ReRegistration.find({ student: studentDocumentId });
                const documentPublicIds = reRegistrationDocuments.flatMap((reRegistrationDocument) => [reRegistrationDocument.kartuTandaPendudukPublicId, reRegistrationDocument.kartuKeluargaPublicId, reRegistrationDocument.ijazahSmpPublicId, reRegistrationDocument.buktiPembayaranPublicId]);

                await ReRegistration.deleteMany({ student: studentDocumentId }, { session });
                await Notification.deleteMany({ user: userDocumentId }, { session });
                await DeleteRequest.deleteMany({ user: userDocumentId }, { session });
                await Student.deleteMany({ user: userDocumentId }, { session });
                await User.deleteOne({ _id: userDocumentId }, { session });

                await mongooseTransaction.successTransaction();

                await Promise.all(documentPublicIds.map((documentPublicId) => deleteAsset(documentPublicId)));
            } catch {
                await mongooseTransaction.failedTransaction();
            };
        };

    } finally {
        isCleanupRejectedAccountsJobRunning = false;
    };
};

module.exports = { taskCleanupRejectedAccounts };