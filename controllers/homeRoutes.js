const router = require('express').Router();
const { User, Furniture } = require('../models');
const withAuth = require('../utils/auth');




router.get('/', withAuth, async (req, res) => {
    try {
        const userData = await User.findAll({
            attributes: { exclude: ['password']},
            order: [['name', 'ASC']],
        });

        const users = userData.map((project) => project.get({ plain: true }));

        res.render('homepage', {
            users,
            logged_in: req.session.logged_in,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});



router.get('/login', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/');
        return;
    }

    res.render('login');
});

router.get('/register', (req, res) => {
    if(req.session.logged_in) {
        res.redirect('/');
        return;
    }

    res.render('register');
});

router.get('/brand', (req, res) => {
    if(!req.session.logged_in) {
        res.redirect('/');
        return;
    }

    res.render('brand');
});

router.get('/color', async (req, res) => {
    if(!req.session.logged_in) {
        res.redirect('/');
        return;
    }
    const furnColor = await Furniture.findByPk(req.params.id);
    const furniture = furnColor.get({ plain: true });

    res.render('color', furniture);
});

router.get('/category', (req, res) => {
    if(!req.session.logged_in) {
        res.redirect('/');
        return;
    }

    res.render('category');
});


router.get('/material', (req, res) => {
    if(!req.session.logged_in) {
        res.redirect('/');
        return;
    }

    res.render('material');
});


module.exports = router;