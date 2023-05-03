const express = require('express');
const router = express.Router();
const sequelize = require('./connection'); // Import the Sequelize instance
const { QueryTypes } = require('sequelize');
const { User } = require('../models'); // Import the User model

//to check if user is an admin
const isAdmin = async (req, res, next) => {
    if (req.userLoggedIn) {
        try {
            const user = await User.findOne({ where: { id: req.session.userId } });
            if (user && user.role_id === 1) {
                next();
            } else {
                res.status(403).json({ success: false, message: 'Access denied' });
            }
        } catch (err) {
            console.error('Error checking user role:', err.stack);
            res.status(500).json({ success: false, message: 'Error checking user role' });
        }
    } else {
        res.status(401).json({ success: false, message: 'Unauthorized' });
    }
};

// POST: Add a new furniture item
router.post('/furniture', isAdmin, async function(req, res) {
    const furnitureData = req.body;

    try {
        const result = await sequelize.query(
            'INSERT INTO furniture SET :furnitureData',
            {
                replacements: { furnitureData },
                type: QueryTypes.INSERT
            }
        );
        console.log('Furniture item added with ID:', result[0]);
        res.json({ success: true, message: 'Furniture item added successfully' });
    } catch (err) {
        console.error('Error inserting data:', err.stack);
        res.json({ success: false, message: 'Error inserting data' });
    }
});

// Route for rendering the datapost view
router.get('/datapost', function(req, res) {
    // Only logged-in users have access to the datapost form, but to secure it, double check if the user is logged in
    if (req.userLoggedIn) {
        res.render('datapost');
    } else {
        res.redirect('/login');
    }
});

module.exports = router;
