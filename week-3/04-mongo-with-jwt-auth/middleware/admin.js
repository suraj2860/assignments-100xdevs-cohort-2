const { Admin } = require("../db");
const jwt = require("jsonwebtoken");

// Middleware for handling auth
async function adminMiddleware(req, res, next) {
    // Implement admin auth logic
    // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected

    try {
        const accessToken = req.header("Authorization")?.replace("Bearer ","");
        
        if(!accessToken) {
            throw new Error("Unauthorized Request");
        }

        const decodedToken= jwt.verify(accessToken, "my-access-token-secret");
        
        const admin = await Admin.findById(decodedToken?._id).select("-password");

        if (!admin) throw new Error("invalid accessToken");

        req.admin = admin;
        next();

    } catch (error) {
        res.status(400).json("invalid accessToken");
    }
}

module.exports = adminMiddleware;