const usersDB = {
    users: require('../data/users.json'),
    setUser: function(users) { this.users = users }
}
const bcrypt = require('bcrypt');

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
        res.json({'success': `User ${user} is logged in`});
    } else {
        res.sendStatus(401);
    }
}

module.exports = {handleLogin};