const { User } = require("../db");

async function userMiddleware(req, _, next) {
    // Implement user auth logic
    // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected

    try {
        const username = req.headers["username"];
        const password = req.headers["password"];

        if (!username || !password) throw new Error("Unauthorized request");

        const user = await User.findOne({
            $and: [{ username }, { password }]
        }).select("-password");

        if (!user) throw new Error("Authorization failed");

        req.user = user;
        next();
    } catch (error) {
        throw new Error("Authorization failed")
    }
}

module.exports = userMiddleware;