const request = require('supertest');
const app = require('express')();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const supertest = require('supertest');
const dbHandler = require('./db-handler');
const ContactModel = require('../models/contact.model');

app.use(require('../api-routes'));

// It's just so easy to connect to the MongoDB Memory Server
// By using mongoose.connect
supertest.beforeAll(async () => dbHandler.connect());
supertest.afterEach(async () => dbHandler.clearDatabase());
supertest.afterAll(async () => dbHandler.closeDatabase());

supertest.describe('ContactController', () => {
  supertest.it('should return empty array on empty database', async (done) => {
    const res = await request(app).get('/contacts');
    supertest.expect(res.status).toBe(200);
    supertest.expect(res.body).toHaveProperty('data');
    supertest.expect(res.body.data).toHaveLength(0);
    done();
  });

  supertest.it('should create contact', async (done) => {
    const firstName = 'henk';
    const res = await request(app)
      .post('/contacts')
      .send({ firstName, lastName: 'test', mobile: '12345566' });
    supertest.expect(res.status).toBe(201);
    supertest.expect(res.body).toHaveProperty('data');
    supertest.expect(res.body.data.firstName).toBe(firstName);

    const foundContact = await ContactModel.find({ firstName });
    supertest.expect(foundContact).toHaveLength(1);
    supertest.expect(foundContact[0].lastName).toBe('test');

    done();
  });
});
