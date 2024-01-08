const usersDB = {
    users: require('../data/users.json'),
    setUser: function(users) { this.users = users }
}
const jwt = require('jsonwebtoken');
require('dotenv').config();


const handleRefreshToken = (req, res) => {
    const cookies = req.cookies;

    if (!cookies?.jwt) {
        return res.sendStatus(401);
    }

    console.log("cookies jwt ", cookies.jwt);
    const refreshToken = cookies.jwt;

    const fUser = usersDB.users.find(u => u.refreshToken === refreshToken);

    if(!fUser) {
        return res.sendStatus(403);
    }

    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
            if(err || fUser.username != decoded.username) {
                return res.sendStatus(403);
            }

            const accessToken = jwt.sign(
                {"username": decoded.username},
                process.env.ACCESS_TOKEN_SECRET,
                {expiresIn: '40s'}
            );

            res.json({ accessToken });
        }
    )
}

module.exports = { handleRefreshToken };