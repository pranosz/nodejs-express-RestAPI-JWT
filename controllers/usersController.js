const User = require('../data/User');

const getUserNames = async (req, res) => {
    const users = await User.find().exec();
    const userNames = users.map(user => user.username);
    res.json(userNames.sort());
}

const isUserExists = async (req, res) => {
    let exists = null;

    if(req.body.name) {
        exists = await User.findOne({username: req.body.name.toLocaleLowerCase()}).exec();
        console.log("exists ", exists);
    }
    
    res.json({'exists': !!exists});
}

module.exports = {
    getUserNames,
    isUserExists
}