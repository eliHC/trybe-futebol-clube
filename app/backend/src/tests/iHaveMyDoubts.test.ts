import * as sinon from 'sinon';
import * as chai from 'chai';
import * as bcryptJS from 'bcryptjs';

import chaiHttp = require('chai-http');

import { app } from '../app';

import User from '../database/models/User';
import authentication from '../database/middlewares/auth';
import validateInputs from '../database/middlewares/validateInputs';

chai.use(chaiHttp);

const { expect } = chai;

describe('on /login:', () => {
  describe('With POST method, ', () => {
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
