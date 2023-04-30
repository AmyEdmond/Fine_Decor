const express = require('express');
const router = express.Router();
const sequelize = require('./connection'); // Import the Sequelize instance
const { QueryTypes } = require('sequelize');

// POST: Add a new furniture item
router.post('/furniture', async function(req, res) {
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
