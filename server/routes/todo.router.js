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
router.post('/', (req, res) => {
    console.log('request.body', req.body);

    let newTask = req.body;
    let title = newTask.title;

    let queryText = `INSERT INTO tasks (title, completed) VALUES ($1, $2);`;
    pool.query(queryText, [title, false])
        .then(dbResult => {
            console.log('dbResult.rows', dbResult.rows);
            res.sendStatus(201);
        })
        .catch(dbError => {
            console.log('POST Error:', dbError);
            res.sendStatus(500);
        });
});

// PUT
router.put('/:id', (req, res) => {
    console.log('req.params', req.params);
    console.log('req.body', req.body);

    let idToUpdate = req.params.id;
    let updatedTitle = req.body.title;

    let queryText = `UPDATE tasks SET title = $1 WHERE id = $2;`;
    pool.query(queryText, [updatedTitle, idToUpdate])
        .then(dbResult => {
            console.log(dbResult);
            res.sendStatus(200);
        })
        .catch(dbError => {
            console.log('PUT Error:', dbError);
            res.sendStatus(500);
        });
});

// DELETE

module.exports = router;
