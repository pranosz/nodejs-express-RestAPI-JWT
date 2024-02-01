const User = require('../data/User');
const bcrypt = require('bcrypt');

const handleNewUser = async (req, res) => {
    const { user, pwd } = req.body;

    if (!user || !pwd) {
        return res.status(400).json({'message': 'Username and password are empty.'});
    }
    const duplicate = await User.findOne({username: user}).exec();

    if(duplicate) {
        return res.sendStatus(409);
    }

    try {
        // encrypt the password
        const hashedPwd = await bcrypt.hash(pwd, 10);
        // store new user
        const result = await User.create({
            "username": user, 
            "password": hashedPwd
        });

        console.log('new user (result) ', result);

        res.status(201).json({'success': `New user ${user} created!`});
    } catch (err) {
        res.status(500).json({'message': err.message});
    }
}

module.exports = {handleNewUser};