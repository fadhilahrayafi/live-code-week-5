const Comic = require('../models').Comic
function authorisation (req, res, next) {
  Comic.findOne({where: {id:req.params.id}})
  .then(comic => {
    if(comic.Userid == req.user.id) {
      next()
    } else {
      next({code:401, message: "you are not allowed"})
    }
  })
  .catch(err => {
    next({code: 401, message: "invalid user"})
  })
}

module.exports = authorisation