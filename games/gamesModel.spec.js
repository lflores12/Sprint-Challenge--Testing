const db = require('../data/dbConfig.js');
const supertest = require('supertest');
const server = require('../api/server.js');


const { insert, remove, getAll } = require('./gamesModel.js');

describe('games model', () => {
    beforeEach(async () => {
        await db('games').truncate();
    })

    describe('insert()', () => {
        it('should insert game', async () => {
            await insert({ title: "fortnite", genre: "battle royale", releaseYear: "2017"})

            const games = await db('games');

            expect(games).toHaveLength(1);
        })

        it('should insert the provided game', async () => {
            let game = { title: "fortnite", genre: "battle royale", releaseYear: "2017"};
            let inserted = await insert(game);

            expect(inserted.title).toBe(game.title);
        })

    });

    describe('get()', () => {
        it('should retrieve list of games', async () => {
            await insert({ title: "fortnite", genre: "battle royale", releaseYear: "2017"})

            const games = await getAll('games');

            expect(games).toHaveLength(1)

        })
    })

    describe('/get', () => {
        it('should return status code 200 from /get', () => {
            return supertest(server)
            .get('/games')
            .expect(200)
        })
    })

    describe('/post',() => {
        beforeEach(async () => {
            await db('games').truncate();
        })
        it('should return status code 201 when game is added', async () => {
            let game = { title: "fortnite", genre: "battle royale", releaseYear: "2017"};

            await supertest(server)
            .post('/games')
            .send(game);

            expect(201)
        })
    })
})