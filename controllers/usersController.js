const data = {
    users: require('../data/users.json'),
    setUserss: function(data) {this.users = data}
};

const getUserNames = (req, res) => {
    const userNames = data.users.map(user => user.username);
    res.json(userNames.sort());
}

const isUserExists = (req, res) => {
    let exists = false;

    if(req.body.name) {
        exists = data.users.some(user => user.username.toLocaleLowerCase() === req.body.name.toLocaleLowerCase());
    }
    
    res.json({'exists': exists});
}

module.exports = {
    getUserNames,
    isUserExists
}