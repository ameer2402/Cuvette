const { validateToken } = require("./verifyToken");

function cookieValidation(req, res, next) {
    const cookieValue = req.cookies["token"]; 

    if (!cookieValue) {
        console.log('No token found'); // Log for debugging
        return res.status(401).json({ message: "Unauthorized, no token" });
    }

    try {
        const payload = validateToken(cookieValue); 
        req.user = payload; 
        next(); 
    } catch (error) {
        console.error('Token validation failed:', error); 
        return res.status(401).json({ message: "Unauthorized, invalid token" });
    }
}



module.exports = {
    cookieValidation,
};
