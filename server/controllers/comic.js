const Comic = require('../models').Comic

class ComicController {
  static getComic(req, res, next) {
    Comic.findAll()
    .then(comics => {
      res.status(200).json(comics)
    })
    .catch(err => {
      next(err)
    })
  }

  static updateComic(req, res, next) {
    let objComic = {
      title: req.body.title,
      author : req.body.author,
      imageURL : req.body.imageURL
    }
    let comic
    Comic.findOne({where:{id:req.params.id}})
    .then(result => {
      if(!result) {
        next({code: 404, message: "comic not found"})
      } else {
        comic = result
        return Comic.update(objComic, {where:{id:req.params.id}, returning:true})
      }
    })
    .then(result => {
      res.status(200).json(result)
    })
    .catch(err => {
      next(err)
    })
  }

}

module.exports = ComicController