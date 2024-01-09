const verifyRoles = (...allowedRoles) => {
    return (req, res, next) => {
        if(!req?.roles) {
            return res.sendStatus(401);
        }

        const allowedRolesArr = [...allowedRoles];
        console.log("allowedRolesArr ", allowedRolesArr);
        console.log("req.roles ", req.roles);

        const result = req.roles.find(role => allowedRolesArr.includes(role));

        if(!result){
            return res.sendStatus(401); 
        }
        next();
    }
}

module.exports = verifyRoles;