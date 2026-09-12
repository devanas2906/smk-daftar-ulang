const mongoose = require('mongoose');

class MongooseTransaction {
    #session = null;

    startTransaction = async () => {
        this.#session = await mongoose.startSession();
        await this.#session.startTransaction();
        return this.#session;
    };

    successTransaction = async () => {
        if (!this.#session) return;

        try {
            await this.#session.commitTransaction();
        } finally {
            await this.#session.endSession();
            this.#session = null;
        };
    };

    failedTransaction = async () => {
        if (!this.#session) return;

        try {
            await this.#session.abortTransaction();
        } finally {
            await this.#session.endSession();
            this.#session = null;
        };
    };
};

module.exports = MongooseTransaction;