const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const Games = require('../games/gamesModel.js');


const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

server.get('/', (req, res) => {
    res.status(200).json({ message: "Its working!"})
})

server.get("/games", (req, res) => {
    Games.getAll().then(games => {
      res.status(200).json(games);
    });
  });

  server.post("/games", (req, res) => {
    let { title, genre, releaseYear } = req.body;
    if (!title || !genre) {
      return res.status(422).json({ message: "title/genre fields required" });
    } else {
      Games.insert(req.body)
        .then(newGame => {
          res.status(201).json(newGame);
        })
        .catch(err => {
          res.status(500).json(err);
        });
    }
});

module.exports = server;