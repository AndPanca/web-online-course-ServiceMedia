const express = require('express');
const router = express.Router();
const isBase64 = require('is-base64'); //Check format image submit isBase64?
const base64Img = require('base64-img');
const { Media } = require('../models');//Call model Media in /models/Media.js
const fs = require('fs');

//API GET ALL IMAGE FILEPATH
router.get('/', async(req, res) => {
  const media = await Media.findAll({
    attributes: ['id', 'image']
  });

  //Add host in media.image from filepath database
  const mappedMedia = media.map((m) => {
    m.image = `${req.get('host')}/${m.image}`;
    return m;
  });

  return res.json({
    status: 'success',
    data: mappedMedia
  });
});

//API POST IMAGE TO FILE MANAGEMENT AND DATABASE FILEPATH
router.post('/', (req, res) => {
  const image = req.body.image;

  if (!isBase64(image, { mimeRequired: true})) {
    return res.status(400).json({ status: 'error', message: 'invalid base64'});
  }

  base64Img.img(image, './public/images', Date.now(), async (err, filepath) => {
    if (err) {
      return res.status(400).json({ status: 'error', message: err.message });
    }

    // SLICE img123.png => '/public/images/img123.png'
    const filename = filepath.split("\\").pop().split("/").pop();

    //Upload filepath location to DB
    const media = await Media.create({ image: `images/${filename}` });

    return res.json({
      status: 'success',
      data: {
        id: media.id,
        image: `${req.get('host')}/images/${filename}`
      }
    });
  })
});

//API DELETE IMAGE BY ID 
router.delete('/:id', async (req, res) => {
  const id = req.params.id;

  const media = await Media.findByPk(id);

  if (!media) {
    return res.status(404).json({ status: 'error', message: 'media not found'});
  }

  fs.unlink(`./public/${media.image}`, async (err) => {
    if (err) {
      return res.status(400).json({ status: 'error', message: err.message });
    }
    await media.destroy();

    return res.json({
      status: 'success',
      message: 'image deleted'
    });
  });
});


module.exports = router;
