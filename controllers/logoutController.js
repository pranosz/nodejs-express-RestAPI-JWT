const usersDB = {
    users: require('../data/users.json'),
    setUser: function(users) { this.users = users }
}
const fsPromises = require('fs').promises;
const path = require('path');

const handleLogout = async (req, res) => {
    // On client also delete the accessToken

    const cookies = req.cookies;

    if (!cookies?.jwt) {
        return res.sendStatus(204); // success - no content
    }

    const refreshToken = cookies.jwt;

    const fUser = usersDB.users.find(u => u.refreshToken === refreshToken);

    if(!fUser) {
        console.log('logout ', fUser);
        res.clearCookie('jwt', refreshToken, {httpOnly: true, sameSite: 'None', secure: true});
        return res.sendStatus(204);
    }

   // Delete refreshToken in db
   const otherUsers = usersDB.users.filter(u => u.refreshToken !== fUser.refreshToken);
   const currentUser = {...fUser, refreshToken: ''};
   usersDB.setUser([...otherUsers, currentUser]);

   await fsPromises.writeFile(
        path.join(__dirname, '..', 'data', 'users.json'),
        JSON.stringify(usersDB.users)
    );

    res.clearCookie('jwt', refreshToken, {httpOnly: true, sameSite: 'None', secure: true});
    res.sendStatus(204);
}

module.exports = { handleLogout };