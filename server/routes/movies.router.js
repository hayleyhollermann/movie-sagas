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

// ------- PUT's ---------
router.put('/details/:id', (req, res) => {
    const queryText = `UPDATE "movies" SET "description" = $1
    WHERE "id" = $2;`;
    pool.query(queryText, [req.body.description, req.params.id])
      .then(() => {
        res.sendStatus(200); })
      .catch((err) => {
        console.log('Error completing change details query', err);
        res.sendStatus(500); })
})
router.put('/genres/', (req, res) => {
    // target each genre by movie_genre.id
    console.log('in change genre query req');
    for (change of req.body){
        const genreIdQuery = `SELECT "genres"."id" FROM "genres" WHERE "genres"."name"=$1;`;
        pool.query(genreIdQuery, [change.name])
          .then((result) => {
              console.log('result in query:', result.rows[0].id);
              
            const queryText = `UPDATE "movie_genre" SET "genre_id" = $1 
            WHERE "id"= $2;`;
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
        
        // const queryText = `UPDATE "movie_genre" SET "genre_name" = $1 
        // WHERE "id"= $2;`;
        // pool.query(queryText, [change.name, change.id])
        // .then(() => {
        //   res.sendStatus(200); })
        // .catch((err) => {
        //   console.log('Error completing change details query', err);
        //   res.sendStatus(500); })
    }
})

module.exports = router;