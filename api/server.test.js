const db = require('../data/dbConfig.js');
const server = require('./server.js');
const request = require('supertest');

beforeAll(async () => {
  await db.migrate.rollback();
  await db.migrate.latest();
});

beforeEach(async () => {
  await db('users').truncate();
});

afterAll(async () => {
  await db.destroy();
});


describe('sanity tet for server js', () => {

  // test checks env var 
  test('tests running in test env', () => {
    expect(process.env.NODE_ENV).toBe('testing');
  });

  // tests root endpoint of API
  describe('GET /', () => {

    // declare variable
    let res;

    beforeEach(async () => {
      res = await request(server).get('/');
    });

    test('returns 200 OK', () => {
      return request(server)
        .get('/').then( (res) => {
          expect(res.status).toBe(200)
        });
    });

    test('returns {"message":"Welcome to Auth API"}', async () => {
      expect(res.body).toEqual({ message:"Welcome to Auth API" });
    });

  });
})