const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

router.get('/:id', (req, res) => {
    const queryText = `SELECT * FROM "movies"
    LEFT OUTER JOIN "movie_genre" ON "movie_genre"."movie_id"="movies"."id"
    LEFT OUTER JOIN "genres" ON "genres"."id"="movie_genre"."genre_id"
    WHERE "movies"."id" = $1;`;
    console.log(req.params.id);
    pool.query(queryText, [req.params.id])
      .then((result) => { res.send(result.rows); })
      .catch((err) => {
        console.log('Error completing movie info query', err);
        res.sendStatus(500);
      });
})

module.exports = router;