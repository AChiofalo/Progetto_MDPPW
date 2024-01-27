exports.isVendor = (req, res, next) => {
    if(req.isAuthenticated() && req.user.role == 'VENDOR'){ //req.user è impostato da Passport
        return next();
    }
    return res.status(401).json({"code" : 401, "msg" : "not authenticated"});
  }
  
exports.isCustomer = (req, res, next) => {
    if(req.isAuthenticated() && req.user.role == 'CUSTOMER'){
        return next();
    }
    return res.status(401).json({"code" : 401, "msg" : "not authenticated"});
}