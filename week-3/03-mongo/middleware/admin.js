const { Admin } = require("../db");

// Middleware for handling auth
async function adminMiddleware(req, res, next) {
    // Implement admin auth logic
    // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected

    try {
        const username = req.headers["username"];
        const password = req.headers["password"];

        if (!username || !password) throw new Error("Unauthorized request");

        const admin = await Admin.findOne({
            $and: [{ username }, { password }]
        }).select("-password");

        if (!admin) throw new Error("Authorization failed");

        req.admin = admin;
        next();
    } catch (error) {
        throw new Error("Authorization failed")
    }
}

module.exports = adminMiddleware;