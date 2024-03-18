const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const router = Router();
const { Admin, User, Course } = require("../db/index");

// Admin Routes
router.post('/signup', async (req, res) => {
    // Implement admin signup logic
    const { username, password } = req.body;

    try {
        if (!username || !password) {
            throw new Error("username and password are required fields")
        }

        const existedAdmin = await Admin.findOne({
            $or: [{ username }]
        })
        if (existedAdmin) throw new Error("user already Exists");

        const admin = await Admin.create({
            username,
            password
        });

        if (!admin) throw new Error("DB :: something went wrong while signing up");

        return res.status(200).json("user created successully");
    } catch (error) {
        return res.status(400).json({ error: error.message })
    }
});

router.post('/courses', adminMiddleware, async (req, res) => {
    // Implement course creation logic
    const { title, description, price, imageLink = "", published = true } = req.body;

    try {
        if (!title || !price || !description) throw new Error("title, description and price are required");

        const existedCourse = await Course.findOne({ title, owner: req.admin._id });
        if (existedCourse) throw new Error("course with this title already exists");

        const course = await Course.create({
            title,
            owner: req.admin._id,
            description,
            price,
            imageLink,
            published
        });
        if (!course) throw new Error("DB :: something went wrong while adding course");

        return res.status(201).json(course);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
});

router.get('/courses', adminMiddleware, async (req, res) => {
    // Implement fetching all courses logic
    try {
        const courses = await Course.find({ owner: req.admin._id }).exec();

        return res.status(200).json(courses);
    } catch (error) {
        return res.status(400).json({error: error.message});
    }
});

module.exports = router;