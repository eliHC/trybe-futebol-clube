import * as sinon from 'sinon';
import * as chai from 'chai';
import * as bcryptJS from 'bcryptjs';

// import { Response } from 'superagent';
import { app } from '../app';

import chaiHttp = require('chai-http');


import User from '../database/models/User';
import authentication from '../database/middlewares/auth';
import validateInputs from '../database/middlewares/validateInputs';

chai.use(chaiHttp);

const { expect } = chai;

describe('On /login route, ', () => {
  describe('with POST method, ', () => {
    const inputPayload = {
      email: "admin@admin.com",
      password: "secret_admin"
    };

    const outputPayload = {
      user: {
        id: 1,
        username: 'Admin',
        role: 'admin',
        email: 'admin@admin.com'
      },
      token: 'dvsaadsv'
    };

    before(() => {
      sinon.stub(User, 'findOne').resolves(outputPayload.user as User);
      sinon.stub(bcryptJS, 'compareSync').returns(true);
      sinon.stub(validateInputs);
      sinon.stub(authentication);
    });
    after(() => {
      sinon.restore();
    });

    it('Returns the correct data', async () => {
      const response = await chai.request(app).post('/login').send(inputPayload);

      expect(response.status).to.be.equal(200);
      expect(response.body).to.have.property('user');
      expect(response.body).to.have.property('token');
    });
  });

  describe('With GET method, ', () => {
    it('Does not break the app', async () => {
      const res = await chai.request(app).get('/login');

      expect(res.status).to.be.equal(404);
    })
  });
});

describe('On /login/validate route, ', () => {
  describe('with GET method: ', () => {
    const badtoken = 'bad_token';
    const goodtoken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJ1c2VybmFtZSI6IkFkbWluIiwicm9sZSI6ImFkbWluIiwiZW1haWwiOiJhZG1pbkBhZG1pbi5jb20iLCJwYXNzd29yZCI6IiQyYSQwOCR4aS5IeGsxY3pBTzBuWlIuLkIzOTN1MTBhRUQwUlExTjNQQUVYUTdIeHRMaktQRVpCdS5QVyJ9LCJpYXQiOjE2NDgxNDU5Mjl9.mWBlhRbye_cI9YmB_B-oZ2ebmKmkc4f_4mghLuN4FIs';

    const mockUser = {
      id: 1,
      username: "Admin",
      role: "admin",
      password: "secret_admin",
      email: "admin@admin.com",
    };

    before(() => {
      sinon.stub(User, 'findOne').resolves(mockUser as User);
    });
    after(() => {
      sinon.restore();
    });

    it('OK', async () => {
      const response = await chai.request(app).get('/login/validate').set('Authorization', goodtoken);
      expect(response.status).to.be.equal(200);
      expect(response.body).to.be.equal('admin');
    });

    it('Fails when has bad token', async () => {
      const response = await chai.request(app).get('/login/validate').set('Authorization', badtoken);
      expect(response.status).to.be.equal(401);
    });
    it('Fails when has no token', async () => {
      const response = await chai.request(app).get('/login/validate').set('Authorization', '');
      expect(response.body.message).to.be.equal('Token not found');
    });
  });
});
