const db = require('../data/dbConfig.js');

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
})