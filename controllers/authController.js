const usersDB = {
    users: require('../data/users.json'),
    setUser: function(users) { this.users = users }
}
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const fsPromises = require('fs').promises;
const path = require('path');

const handleLogin = async (req, res) => {
    const { user, pwd } = req.body;

    if (!user || !pwd) {
        return res.status(400).json({'message': 'Username and password are empty.'});
    }

    const fUser = usersDB.users.find(u => u.username === user);

    if(!fUser) {
        return res.sendStatus(401);
    }

    const match = await bcrypt.compare(pwd, fUser.password);

    if(match) {
        // JWT
        const accessToken = jwt.sign(
            {"username": fUser.username},
            process.env.ACCESS_TOKEN_SECRET,
            {expiresIn: '40s'}
        );

        const refreshToken = jwt.sign(
            {"username": fUser.username},
            process.env.REFRESH_TOKEN_SECRET,
            {expiresIn: '150s'}
        );

        // Saving refreshToken with current user
        const otherUsers = usersDB.users.filter(u => u.username !== fUser.username);
        const currentUser = {...fUser, refreshToken};
        usersDB.setUser([...otherUsers, currentUser]);

        await fsPromises.writeFile(
            path.join(__dirname, '..', 'data', 'users.json'),
            JSON.stringify(usersDB.users)
        );
        res.cookie('jwt', refreshToken, {httpOnly: true, sameSite: 'None', secure: true, maxAge: 24* 60 * 60 * 1000});
        res.json({accessToken});
    } else {
        res.sendStatus(401);
    }
}

module.exports = {handleLogin};