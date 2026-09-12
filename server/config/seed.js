require("dotenv").config();
const { connectDatabase, closeConnectionDatabase } = require('./db.js');

const User = require('../models/user.js');
const School = require('../models/school.js');

const Major = require('../models/major.js');
const Batch = require('../models/batch.js');
const Class = require('../models/class.js');

const { hashPassword } = require('../utilities/auth.js');

const createAdminData = async () => {
    try {
        const existingAdminData = await User.findOne({ role: "admin" });
        if (existingAdminData) return console.info("Admin data has been created");

        const hashedPassword = await hashPassword(process.env.DEFAULT_ADMIN_PASSWORD);

        await User.create({
            email: "admin@example.com",
            password: hashedPassword,
            isDefaultPassword: false,
            role: 'admin'
        });

        console.info("Success create admin data");
    } catch (error) {
        console.error("Error create admin data", error);
    };
};

const createSchoolData = async () => {
    try {
        const existingSchoolDocument = await School.findOne({});
        if (existingSchoolDocument) return console.info("School data has been created");

        await School.create(
            {
                schoolName: "SMK Indonesia Jaya 1",
                schoolAddress: "Jl. Sukma No. 12, RT 02/05, Desa Cigombong, Bogor 16740",
                schoolEmail: "smkindonesiajaya1@example.com",
                schoolNumberPhone: "08123456789",
                principalName: "Aditya Guntur",
                treasurerName: "Budi Hidayat"
            }
        );

        console.info("Success create school data");
    } catch (error) {
        console.error("Error create school data", error);
    };
};

const createMasterData = async () => {
    try {
        const existingMajorDocument = await Major.findOne({});
        const existingBatchDocument = await Batch.findOne({});
        const existingClassDocument = await Class.findOne({});

        if (existingMajorDocument) {
            console.info("Major data has been created");
        } else {
            const majorData = [{ majorName: "Rekayasa Perangkat Lunak", majorCode: "RPL" }, { majorName: "Teknik Komputer Jaringan", majorCode: "TKJ" }, { majorName: "MultiMedia", majorCode: "MM" }];
            await Major.create(majorData);

            console.info("Success create major data");
        };

        if (existingBatchDocument) {
            console.info("Batch data has been created");
        } else {
            const currentYear = new Date().getFullYear();
            const batchData = [{ entryYear: currentYear }, { entryYear: currentYear + 1 }, { entryYear: currentYear + 2 }];
            await Batch.create(batchData);

            console.info("Success create batch data");
        };

        if (existingClassDocument) {
            console.info("Class data has been created");

        } else {
            const classData = [{ className: "X" }, { className: "XI" }, { className: "XII" }];
            await Class.create(classData);

            console.info("Success create class data");
        };

    } catch (error) {
        console.error("Error create master data", error);
    };
};

const runSeedData = async () => {
    await connectDatabase();
    await createAdminData();
    await createSchoolData();
    await createMasterData();
    await closeConnectionDatabase();
};

runSeedData();