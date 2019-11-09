const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

router.get('/', (req, res) => {
    const queryText = `SELECT "movies"."title", "movies"."id", "movies"."poster", "movies"."description" FROM "movies";`;
    pool.query(queryText)
      .then((result) => { res.send(result.rows); })
      .catch((err) => {
        console.log('Error completing SELECT movie query', err);
        res.sendStatus(500);
      });
})

router.get('/details/:id', (req, res) => {
    const queryText = `SELECT * FROM "movies" WHERE "movies"."id" = $1;`;
    pool.query(queryText, [req.params.id])
      .then((result) => { 
        console.log(result);
          
        res.send(result.rows[0]); })
      .catch((err) => {
        console.log('Error completing movie info query', err);
        res.sendStatus(500);
      });
})

router.get('/genres/:id', (req, res) => {
    const queryText = `SELECT "genres"."name" FROM "genres"
    JOIN "movie_genre" ON "genres"."id"="movie_genre"."genre_id"
    JOIN "movies" ON "movie_genre"."movie_id"="movies"."id"
    WHERE "movies"."id"=$1;`;
    pool.query(queryText, [req.params.id])
      .then((result) => { 
        console.log(result);
        res.send(result.rows); })
      .catch((err) => {
        console.log('Error completing movie genre query', err);
        res.sendStatus(500);
      });
})

module.exports = router;