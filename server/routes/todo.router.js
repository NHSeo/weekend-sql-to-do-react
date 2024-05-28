const express = require('express');
const router = express.Router();
const pool = require('../modules/pool.js');

// GET
router.get('/', (req, res) => {
    const queryText = 'SELECT * FROM "tasks";';
    pool.query(queryText)
      .then((dbResult) => {
        let toDoList = dbResult.rows;
        res.send(toDoList);
      })
      .catch((dbError) => {
        console.error('GET Error', dbError);
        res.sendStatus(500);
      });
  });

// POST


// PUT


// DELETE

module.exports = router;
