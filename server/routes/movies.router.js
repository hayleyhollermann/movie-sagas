const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

// ------- GET's -------------
// GET all movies
router.get('/', (req, res) => {
    const queryText = `SELECT * FROM "movies" ORDER BY "title";`;
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
// GET all genres list
router.get('/genres/', (req, res) => {
    const queryText = `SELECT * FROM "genres" ORDER BY "name"`;
    pool.query(queryText)
      .then((result) => { 
        console.log(result);
        res.send(result.rows); })
      .catch((err) => {
        console.log('Error completing movie genre query', err);
        res.sendStatus(500);
      });
})
// GET genres for selected movie
router.get('/genres/:id', (req, res) => {
    // selects, genre name, id and genre_id in movie_genre table,
    const queryText = `SELECT "genres"."name", "movie_genre"."id", "movie_genre"."genre_id" FROM "genres"
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
// -------END GET's--------

// ------- PUT's ---------
// update movie description / title
router.put('/details/:id', (req, res) => {
    const queryText = `UPDATE "movies" SET "description" = $1, "title" = $2
    WHERE "id" = $3;`;
    pool.query(queryText, [req.body.description, req.body.title, req.params.id])
      .then(() => {
        res.sendStatus(200); })
      .catch((err) => {
        console.log('Error completing change details query', err);
        res.sendStatus(500); })
})
// change movie genres
router.put('/genres/', (req, res) => {
    console.log('in change genre query req');
    // loop through array of genre changes
    for (change of req.body){
        const genreIdQuery = `SELECT "genres"."id" FROM "genres" WHERE "genres"."name"=$1;`;
        // query to retrieve genre id by genre name
        pool.query(genreIdQuery, [change.name])
          .then((result) => {
            const queryText = `UPDATE "movie_genre" SET "genre_id" = $1 
            WHERE "id"= $2;`;
              // implements genre change
              pool.query(queryText, [result.rows[0].id, change.id])
              .then(() => {
                res.sendStatus(200); })
              .catch((err) => {
                console.log('Error completing change details query', err);
                res.sendStatus(500); })
          }) .catch((error) => {
              console.log('error in getting id for genre', error);
              res.sendStatus(500);
          })
    }
})
// -------- END PUT's--------

// --------POST's---------
// add POST query req to add new genre
router.post('/genres', (req, res) => {
    console.log('in post query', req.body);
    const genreIdQuery = `SELECT "genres"."id" FROM "genres" WHERE "genres"."name"=$1;`;
    pool.query(genreIdQuery, [req.body.genre])
      .then((result) =>{
        console.log(result);
        const queryText = `INSERT INTO "movie_genre" ("movie_id", "genre_id")
        VALUES ($1, $2);`;
        pool.query(queryText, [req.body.movie.id, result.rows[0].id])
      })
      .catch((error) => {
        console.log('error in post query to add new genre', error);
        res.sendStatus(500)
      })
    .catch((error) => {
        console.log('error in post. error with selecting genre id', error);
    })
})

module.exports = router; 