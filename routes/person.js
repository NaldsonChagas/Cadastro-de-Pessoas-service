const express = require('express');
const NeDB = require('nedb');

const db = new NeDB({
  filename: 'persons.db',
  autoload: true,
});

const router = express.Router();

router.get('/', (req, res) => {
  db.find({}).sort({ name: 1 }).exec((err, persons) => {
    if (err) res.status(400).json({ error: err });
    else res.status(200).json({ users: persons });
  });
});

router.post('/', (req, res) => {
  db.insert(req.body, (err, person) => {
    if (err) res.status(400).json({ error: err });
    else res.status(200).json({ person: person });
  });
});

router.get('/:id', (req, res) => {
  db.findOne({ _id: req.params.id }, (err, person) => {
    if (err) res.status(400).json({error: err});
    else res.status(200).json({person: person});
  });
});

router.put('/:id', (req, res) => {

});

router.delete('/:id', (req, res) => {

});

module.exports = router;