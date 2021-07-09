const multer = require('multer')
const fs = require('fs')
const router = require('express').Router()
const artist = require('../controller/Artist')

var storage = multer.diskStorage({
  filename: function (req, file, cb) {
    let ext = file.originalname.substring(
      file.originalname.lastIndexOf("."),
      file.originalname.length
    )
    cb(null, Date.now() + ext);
  },
  destination: function (req, file, cb) {
    cb(null, './image')
  }
})

var upload = multer({storage: storage}).single("image")

router.post("/input", upload, (req, res) => {
  artist.inputDataArtist(req.body, req.file.filename)
    .then((result) => res.json(result))
    .catch((err) => res.json(err))
})

router.get("/artistdata", (req, res) => {
  artist.getArtistData()
    .then((result) => res.json(result))
    .catch((err) => res.json(err))
})

router.get("/artistdata/:id", (req, res) => {
  artist.getArtistDataOne(req.params.id)
    .then((result) => res.json(result))
    .catch((err) => res.json(err))
})

router.put("/editdata/:id", upload, (req, res) => {
  let fileName;
  if (req.body.image) {
    fileName = req.body.image;
  } else {
    fileName = req.file.filename
  }
  artist.updateData(req.params.id, req.body, fileName)
    .then((result) => res.json(result))
    .catch((err) => res.json(err))
})

router.delete("/delete/:id", (req, res) => {
  artist.delete(req.params.id)
    .then(result => res.json(result))
    .catch(err => res.json(err))
})

module.exports = router