function errhandler(err, req, res, next) {
  if(err.code) {
    res.status(err.code).json({err, msg: err.message})
  } else if(err.errors) {
    let msgErrs = []
    err.errors.forEach(el => {
      msgErrs.push(el.message)      
    });
    res.status(400).json({msgErrs})
  } else {
    res.status(500).json({err, msg: "server error"})
  }
}

module.exports = errhandler