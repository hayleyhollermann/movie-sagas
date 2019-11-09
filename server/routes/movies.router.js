const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

router.get('/', (req, res) => {
    const queryText = `SELECT "movies"."title", "movies"."poster", "movies"."description", "genres"."name" FROM "movies"
    JOIN "movie_genre" ON "movie_genre"."movie_id"="movies"."id"
    JOIN "genres" ON "genres"."id"="movie_genre"."genre_id";`;
    pool.query(queryText)
      .then((result) => { res.send(result.rows); })
      .catch((err) => {
        console.log('Error completing SELECT movie query', err);
        res.sendStatus(500);
      });
})

module.exports = router;