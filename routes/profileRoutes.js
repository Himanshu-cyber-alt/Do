

import express from 'express';
import pool from '../config/db.js';

const router = express.Router();

router.post('/create-profile', async (req, res) => {
    const { Semester, Branch, Cgpa, Sgpa, Courses, Skills } = req.body;

    // Ensure Courses and Skills are arrays
    const coursesArray = Array.isArray(Courses) ? Courses : [];
    const skillsArray = Array.isArray(Skills) ? Skills : [];

    try {
        // Insert user data into the database
        const r1 = await pool.query(
            "INSERT INTO student_profiles (semester, branch, cgpa, sgpa, courses, skills) VALUES ($1, $2, $3, $4, $5::TEXT[], $6::TEXT[]) RETURNING *",
            [Semester, Branch, Cgpa, Sgpa, coursesArray, skillsArray]
        );

        const user = r1.rows[0]; // Retrieve the inserted user data
        console.log(user)

        res.render('profile.ejs',{user}); // Pass user data to the EJS template
    } catch (err) {
        console.error(err);
        res.status(500).send('Error creating profile');
    }
});

export default router;



