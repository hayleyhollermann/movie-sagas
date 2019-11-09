const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

// ------- GET's -------------
router.get('/', (req, res) => {
    const queryText = `SELECT "movies"."title", "movies"."id", "movies"."poster", "movies"."description" FROM "movies";`;
    pool.query(queryText)
      .then((result) => { res.send(result.rows); })
      .catch((err) => {
        console.log('Error completing SELECT movie query', err);
        res.sendStatus(500);
      });
})
// GET details for selected movie
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
// GET genres for selected movie
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

// ------- PUT's ---------
router.put('/details/:id', (req, res) => {
    const queryText = `UPDATE "movies" SET "description" = $1
    WHERE "id" = $2;`;
    pool.query(queryText, [req.body, req.params.id])
      .then(() => {
        res.sendStatus(200); })
      .catch((err) => {
        console.log('Error completing change details query', err);
        res.sendStatus(500); })
})
router.put('/genres/:id', (req, res) => {
    // target each genre by movie_genre.id
    const queryText = `UPDATE "movie_genre" SET "genre_id" = $1 
    WHERE "id"= $2;`;
    pool.query(queryText, [req.body, req.params.id])
    .then(() => {
      res.sendStatus(200); })
    .catch((err) => {
      console.log('Error completing change details query', err);
      res.sendStatus(500); })
})

module.exports = router;