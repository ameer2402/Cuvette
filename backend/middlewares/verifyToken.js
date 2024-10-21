const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET; // Use environment variable for production

function generateToken(user) {
    const payload = {
        id: user._id,
        email: user.companyEmail,
        employeeName: user.EmployeeName,
    };
    console.log(payload);
    return jwt.sign(payload, secret, { expiresIn: "1h" }); // Optionally set expiration time
}

function validateToken(token) {
    return jwt.verify(token, secret);
}

module.exports = {
    generateToken,
    validateToken,
};
