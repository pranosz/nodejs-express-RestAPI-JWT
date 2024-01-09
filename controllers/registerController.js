const usersDB = {
    users: require('../data/users.json'),
    setUser: function(users) { this.users = users }
}

const fsPromises = require('fs').promises;
const path = require('path');
const bcrypt = require('bcrypt');

const handleNewUser = async (req, res) => {
    const { user, pwd } = req.body;

    if (!user || !pwd) {
        return res.status(400).json({'message': 'Username and password are empty.'});
    }
    const duplicate = usersDB.users.find(u => u.username === user);

    if(duplicate) {
        return res.sendStatus(409);
    }

    try {
        // encrypt the password
        const hashedPwd = await bcrypt.hash(pwd, 10);
        // store new user
        const newUser = {
            "username": user, 
            "password": hashedPwd,
            "roles": {"Read": 2222}
        };
        usersDB.setUser([...usersDB.users, newUser]);

        await fsPromises.writeFile(
            path.join(__dirname, '..', 'data', 'users.json'),
            JSON.stringify(usersDB.users)
        );
        res.status(201).json({'success': `New user ${user} created!`});
    } catch (err) {
        res.status(500).json({'message': err.message});
    }
}

module.exports = {handleNewUser};