const User = require('../data/User');

const handleLogout = async (req, res) => {
    // On client also delete the accessToken
    const cookies = req.cookies;

    if (!cookies?.jwt) {
        return res.sendStatus(204); // success - no content
    }

    const refreshToken = cookies.jwt;
    const fUser = await User.findOne({refreshToken}).exec();

    if(!fUser) {
        res.clearCookie('jwt', refreshToken, {httpOnly: true, sameSite: 'None', secure: true});
        return res.sendStatus(204);
    }

   // Delete refreshToken in db
    await fUser.updateOne({refreshToken: ''}).exec();
   /*
   // Alternative way of updating refreshToken

   fUser.refreshToken = '';
   const result = await fUser.save();
   */

    res.clearCookie('jwt', refreshToken, {httpOnly: true, sameSite: 'None', secure: true});
    res.sendStatus(204);
}

module.exports = { handleLogout };