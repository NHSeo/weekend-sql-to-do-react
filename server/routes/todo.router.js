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
    let {id} = req.params;
    let sqlText = `UPDATE "tasks" SET "completed" = NOT "completed" WHERE "id" = $1;`;
    pool.query(sqlText, [id])
    .then((result) => {
        console.log('Database', result);
        res.sendStatus(201);
    })
    .catch((error) => {
        console.log(`Put Error ${sqlText}`, error);
        res.sendStatus(500);
    });
});


// DELETE
router.delete('/:id', (req, res) => {
    console.log('req.params', req.params);

    let idToDelete = req.params.id;

    console.log('idToDelete', idToDelete);
    console.log('typeof idToDelete', typeof idToDelete);

    let queryText = `DELETE FROM tasks WHERE id = $1;`;

    pool.query(queryText, [idToDelete])
        .then(dbResult => {
            console.log(dbResult);
            res.sendStatus(200);
        })
        .catch(dbError => {
            console.log('DELET Error', dbError);
            res.sendStatus(500);
        });
});

module.exports = router;
