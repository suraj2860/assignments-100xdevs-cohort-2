const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { User, Course } = require("../db/index");
const jwt = require("jsonwebtoken");

// User Routes
router.post('/signup', async (req, res) => {
    // Implement user signup logic
    const { username, password } = req.body;

    try {
        if (!username || !password) {
            throw new Error("username and password are required fields")
        }

        const existedUser = await User.findOne({
            $or: [{ username }]
        })
        if (existedUser) throw new Error("user already Exists");

        const user = await User.create({
            username,
            password
        });

        if (!user) throw new Error("DB :: something went wrong while signing up");

        return res.status(200).json("user created successully");
    } catch (error) {
        return res.status(400).json({ error: error.message })
    }
});

router.post('/signin', async (req, res) => {
    // Implement admin signup logic
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            throw new Error("username and password are required");
        }

        const user = await User.findOne({ username });

        if (!user) {
            throw new Error("admin not found");
        }
        const isPasswordValid = await user.isPasswordCorrect(password);

        if (!isPasswordValid) {
            throw new Error("invalid admin credentials");
        }

        try {
            const accessToken = jwt.sign(
                {
                    _id: user._id,
                    username: user.username
                },
                "my-access-token-secret",
                {
                    expiresIn: "1d"
                }
            );

            return res.status(200).json({ accessToken: accessToken });
            
        } catch (error) {
            throw new Error("something went wrong while generating accessToken :: " + error.message);
        }
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
});

router.get('/courses', async (req, res) => {
    // Implement listing all courses logic
    try {
        const courses = await Course.find({});

        return res.status(200).json(courses);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
});

router.post('/courses/:courseId', userMiddleware, async (req, res) => {
    // Implement course purchase logic
    try {
        const course = await Course.findOne({ _id: req.params.courseId });
        if(!course) {
            throw new Error("course not found");
        }
        const user = await User.findById(req.user._id);
        
        if(!user) throw new Error("DB :: something went wrong while fetching user");
        
        if(user.purchasedCourses.includes(req.params.courseId)) throw new Error("course already purchased");
        
        user.purchasedCourses.push(req.params.courseId);
        await user.save();

        return res.status(200).json(course);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
});

router.get('/purchasedCourses', userMiddleware, async (req, res) => {
    // Implement fetching purchased courses logic
    try {
        const courses = await Course.find({_id: req.user.purchasedCourses});

        return res.status(200).json(courses);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
});

module.exports = router