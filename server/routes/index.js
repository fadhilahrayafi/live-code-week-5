const route = require('express').Router()
const UserController = require('../controllers/user')
const ComicController = require('../controllers/comic')
const authorisation = require('../middlewares/authorisation')
const auhthentication = require('../middlewares/authentication')


route.post('/login', UserController.login)
route.post('/register', UserController.register)

route.get('/comics', auhthentication, ComicController.getComic)
route.put('/comics/:id', auhthentication, authorisation, ComicController.updateComic)

module.exports = route