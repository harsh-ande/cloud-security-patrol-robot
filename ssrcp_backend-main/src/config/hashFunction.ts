import bcrypt = require('bcrypt');

const hashPassword = async (plainPassword) => {
    const saltRounds = 10; // Increase this for better security (but it will take longer)
    const hashedPassword = await bcrypt.hash(plainPassword, saltRounds);
    return hashedPassword;
};

const verifyPassword = async (plainPassword, hashedPassword) => {
    console.log({ plainPassword, hashedPassword });
    const isMatch = await bcrypt.compare(plainPassword, hashedPassword);
    console.log({ isMatch });
    return isMatch;
};

export { hashPassword, verifyPassword };
