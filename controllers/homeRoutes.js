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

router.get('/product/:id', async (req, res) => {
    if(!req.session.logged_in) {
        res.redirect('/');
        return;
    } else {
        try {
            const furnitureId = await Furniture.findByPk(req.params.id, {
                attributes: [
                    'color',
                    'name',
                    'description',
                    'price',
                    'image',
                    'category',
                    'brand',
                    'material',
                ],
            });
            let furniture = furnitureId.get({ plain: true });
            res.render('product', {furniture});
        } catch (err) {
            console.error(err);
            res.status(500).json(err);
        }
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

router.get('/brand', async (req, res) => {
    if(!req.session.logged_in) {
        res.redirect('/');
        return;
    } else {
        try {
            const furnitureBrand = await Furniture.findAll({
                attributes: [
                    'id',
                    'color',
                    'name',
                    'description',
                    'price',
                    'image',
                    'category',
                    'brand',
                    'material',
                ],
            });
            let furniture = furnitureBrand.map(furniture => furniture.get({ plain: true }));
            res.render('brand', {furniture});
        } catch (err) {
            console.error(err);
            res.status(500).json(err);
        }
    }
});

router.get('/color', async (req, res) => {
    if(!req.session.logged_in) {
        res.redirect('/');
        return;
    } else {
        try {
            const furnitureColor = await Furniture.findAll({
                attributes: [
                    'id',
                    'color',
                    'name',
                    'description',
                    'price',
                    'image',
                    'category',
                    'brand',
                    'material',
                ],
            });
            let furniture = furnitureColor.map(furniture => furniture.get({ plain: true }));
            res.render('color', {furniture});
        } catch (err) {
            console.error(err);
            res.status(500).json(err);
        }
    }
});

router.get('/category', async (req, res) => {
    if(!req.session.logged_in) {
        res.redirect('/');
        return;
    } else {
        try {
            const furnitureCategory = await Furniture.findAll({
                attributes: [
                    'id',
                    'color',
                    'name',
                    'description',
                    'price',
                    'image',
                    'category',
                    'brand',
                    'material',
                ],
            });
            let furniture = furnitureCategory.map(furniture => furniture.get({ plain: true }));
            res.render('category', {furniture});
        } catch (err) {
            console.error(err);
            res.status(500).json(err);
        }
    }
});


router.get('/material', async (req, res) => {
    if(!req.session.logged_in) {
        res.redirect('/');
        return;
    } else {
        try {
            const furnitureMaterial = await Furniture.findAll({
                attributes: [
                    'id',
                    'color',
                    'name',
                    'description',
                    'price',
                    'image',
                    'category',
                    'brand',
                    'material',
                ],
            });
            let furniture = furnitureMaterial.map(furniture => furniture.get({ plain: true }));
            res.render('material', {furniture});
        } catch (err) {
            console.error(err);
            res.status(500).json(err);
        }
    }
});

router.get('/brand/:id', async (req, res) => {
    if(!req.session.logged_in) {
        res.redirect('/');
        return;
    } else {
        try {
            const furnitureBrand = await Furniture.findByPk(req.params.id, {
                include: [
                    {
                        model: Furniture,
                            attributes: [
                            'color',
                            'name',
                            'description',
                            'price',
                            'image',
                            'category',
                            'brand',
                            'material',
                        ],
                    },
                ],
            });
            let furniture = furnitureBrand.get({ plain: true });
            res.render('brand', furniture);
        } catch (err) {
            console.error(err);
            res.status(500).json(err);
        }
    }
});

router.get('/color/:id', async (req, res) => {
    if(!req.session.logged_in) {
        res.redirect('/');
        return;
    } else {
        try {
            const furnitureColor = await Furniture.findAll({
                attributes: [
                    'color',
                    'name',
                    'description',
                    'price',
                    'image',
                    'category',
                    'brand',
                    'material',
                ],
            });
            let furniture = furnitureColor.map(furniture => furniture.get({ plain: true }));
            res.render('color', {furniture});
        } catch (err) {
            console.error(err);
            res.status(500).json(err);
        }
    }

});

router.get('/category/:id', async (req, res) => {
    if(!req.session.logged_in) {
        res.redirect('/');
        return;
    } else {
        try {
            const furnitureCategory = await Furniture.findByPk(req.params.id, {
                include: [
                    {
                        model: Furniture,
                            attributes: [
                            'color',
                            'name',
                            'description',
                            'price',
                            'image',
                            'category',
                            'brand',
                            'material',
                        ],
                    },
                ],
            });
            let furniture = furnitureCategory.get({ plain: true });
            res.render('category', furniture);
        } catch (err) {
            console.error(err);
            res.status(500).json(err);
        }
    }
});


router.get('/material/:id', async (req, res) => {
    if(!req.session.logged_in) {
        res.redirect('/');
        return;
    } else {
        try {
            const furnitureMaterial = await Furniture.findByPk(req.params.id, {
                include: [
                    {
                        model: Furniture,
                            attributes: [
                            'color',
                            'name',
                            'description',
                            'price',
                            'image',
                            'category',
                            'brand',
                            'material',
                        ],
                    },
                ],
            });
            let furniture = furnitureMaterial.get({ plain: true });
            res.render('material', furniture);
        } catch (err) {
            console.error(err);
            res.status(500).json(err);
        }
    }
});


module.exports = router;