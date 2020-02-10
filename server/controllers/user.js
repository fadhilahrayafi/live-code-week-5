const User = require('../models').User
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const axios = require('axios')

class UserController {

  static register(req, res, next) {
    let objuser = {
      name:req.body.name,
      email:req.body.email,
      password:req.body.password
    }
    User.create(objuser) 
    .then(user => {
      res.status(200).json(user)
    })
    .catch(err => {
      next(err)
    })

  }

  static login(req, res, next) {
    User.findOne({where: {email: req.body.email}})
    .then(user => {
      if(!user) {
        next({code: 404, message: "invalid user"})
      } else {
        if(!bcrypt.compareSync(req.body.password, user.password)) {
          next({code: 404, message: "invalid user"})
        } else {
          req.headers.access_token = jwt.sign(req.body.email, process.env.JWT_SECRET)
          console.log(req.headers)
          res.status(200).json(user)
        }
      }
    })
    .catch(err => {
      next(err)
    })
  }

  // static apirandom(req, res, next) {
  //   axios({
  //     method: "GET",

  //   })
  // }

}

module.exports = UserController