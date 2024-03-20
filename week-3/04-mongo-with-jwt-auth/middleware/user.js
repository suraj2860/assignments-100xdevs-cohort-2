const { User } = require("../db");
const jwt = require("jsonwebtoken");

async function userMiddleware(req, res, next) {
    // Implement user auth logic
    // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected

    try {
        const accessToken = req.header("Authorization")?.replace("Bearer ","");
        
        if(!accessToken) {
            throw new Error("Unauthorized Request");
        }

        const decodedToken= jwt.verify(accessToken, "my-access-token-secret");
        
        const user = await User.findById(decodedToken?._id).select("-password");

        if (!user) throw new Error("invalid accessToken");

        req.user = user;
        next();

    } catch (error) {
        res.status(400).json("invalid accessToken");
    }
}

module.exports = userMiddleware;