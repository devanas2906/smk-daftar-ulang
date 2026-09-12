const { redis } = require('../config/redis.js');

const maxAttempts = 5;

const setRatelimit = async (purposeRatelimit, ipAddress, email) => {
    const ratelimitCachedData = await redis.get(`ratelimit:${purposeRatelimit}:${ipAddress}:${email}`);
    const ratelimitConfig = ratelimitCachedData ? { keepTtl: true } : { ex: 900 };

    let { attempts = 1 } = ratelimitCachedData || {};
    if (ratelimitCachedData) attempts++;

    await redis.set(`ratelimit:${purposeRatelimit}:${ipAddress}:${email}`, { attempts }, ratelimitConfig);
};

const checkRatelimit = async (purposeRatelimit, ipAddress, email) => {
    const ratelimitCachedData = await redis.get(`ratelimit:${purposeRatelimit}:${ipAddress}:${email}`);
    const { attempts } = ratelimitCachedData || {};

    if (attempts >= maxAttempts) return { success: false, statusCode: 429, message: 'Terlalu banyak percobaan login, coba lagi nanti.' };

    return { success: true };
};

const removeRatelimit = async (purposeRatelimit, ipAddress, email) => await redis.del(`ratelimit:${purposeRatelimit}:${ipAddress}:${email}`);

module.exports = { setRatelimit, checkRatelimit, removeRatelimit };