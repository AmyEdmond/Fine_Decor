const router = require('express').Router();
const { User, Role } = require('../../models');

router.post('/login', async (req,res) => {
    try {
        const userData = await User.findOne({ 
            where: { email: req.body.email },
            include: [{ model: Role }],
        });

        if(!userData) {
            res.status(400).json({ message: 'Incorrect email or password, please try again' });
            return;
        }

        const validPassword = await userData.checkPassword(req.body.password);

        if (!validPassword) {
            res.status(400).json({ message: 'Incorrect email or password, pelase try again' });
            return;
        }

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;

            res.json({ user: userData, message: 'You have logged in!' });
        });
    } catch (err) {
        res.status(400).json(err);
    }
});

router.post('/logout', (req, res) => {
    if (req.session.logged_in) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

router.post('/register', async (req, res) => {
    try {
        // check if user already exists with the same email address
        const existingUser = await User.findOne({ where: { email: req.body.email } });

        console.log(existingUser);

        if (existingUser) {
            res.status(400).json({ message: 'A user with that email address already exists.' });
            return;
        }
        
        // create new user
        const newUser = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        });

        req.session.save(() => {
            req.session.user_id = newUser.id;
            req.session.logged_in = true;

            res.json({ user: newUser, message: 'Registration successful!' });
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;