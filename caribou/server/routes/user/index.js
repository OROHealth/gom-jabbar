const express = require('express');
const { User, validate } = require('../../models/User');
const bcrypt = require('bcrypt');

const router = express.Router();

router.post('/create', async (req, res) => {
    let { email, password } = req.body;
    const { error } = validate(req.body);

    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    
    try {
        let user = await User.findOne({ email });

        if (user) {
            return res.status(400).send({
                'success': false
            });
        }

        const salt = await bcrypt.genSalt(10);
        password = await bcrypt.hash(password, salt);

        user = new User({
            email,
            password
        });

        await user.save();

        res.status(200).json({
            'success': true
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post('/auth', async (req, res) => {
    let { email, password } = req.body;
    const { error } = validate(req.body);

    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    try {
        let user = await User.findOne({ email });

        if (!user) {
            return res.status(400).send({
                'success': false,
                'message': 'Username/Password doesn\'t match'
            });
        }

        const validPassword = await bcrypt.compare(password, user.password);

        if (!validPassword) {
            return res.status(400).json({
                'success': false
            });
        }

        res.status(200).json({
            'success': true
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;