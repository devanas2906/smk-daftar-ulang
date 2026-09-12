const cron = require('node-cron');

const { taskCleanupRejectedAccounts } = require('../utilities/crons/cleanup-rejected-accounts.js');

const cleanupRejectedAccounts = () => {
    const cleanupRejectedAccountsJob = cron.schedule('0 2 * * *', async () => {
        await taskCleanupRejectedAccounts();
    });

    cleanupRejectedAccountsJob.on("execution:missed", async () => {
        await taskCleanupRejectedAccounts();
    });
};

module.exports = { cleanupRejectedAccounts };