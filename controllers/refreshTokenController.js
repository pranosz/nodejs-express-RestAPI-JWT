const User = require('../data/User');
const jwt = require('jsonwebtoken');
const accessTokenOpt = require('../config/accessTokenOptions');

const handleRefreshToken = async (req, res) => {
    const cookies = req.cookies;

    if (!cookies?.jwt) {
        return res.sendStatus(401);
    }

    const refreshToken = cookies.jwt;
    const fUser = await User.findOne({refreshToken}).exec();

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
            const roles = Object.values(fUser.roles);

            const accessToken = jwt.sign(
                { 
                    "UserInfo": {
                        "username": fUser.username,
                        "roles": roles
                    }
                },
                process.env.ACCESS_TOKEN_SECRET,
                {expiresIn: accessTokenOpt.expiredTime}
            );

            res.json({ accessToken });
        }
    )
}

module.exports = { handleRefreshToken };