import * as sinon from 'sinon';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import { Response } from 'superagent';
import { app } from '../app';

import LoginService from '../database/services/LoginService';

chai.use(chaiHttp);

const { expect } = chai;

describe('test app', () => {
  describe('About route /login...', () => {
    let response: Response;//<< WHY?!!?

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
      token: 'eyJhbGciOiJIUzI1NiJ9.MQ.dQmeXYvGEvAIr4s20zDCeYcI0HxMZhp26RK-4zvGrhQ'
    };


    before(async () => {
      response = await chai
        .request(app)
        .post('/login')
        .send(inputPayload);

      sinon.stub(LoginService, 'login').resolves({
        success: true,
        status: 200,
        message: 'OK',
        data: outputPayload,
      });
    });

    after(() => {(LoginService.login as sinon.SinonStub).restore()});

    it('When the login occurs correctly:', async () => {
      expect(response.body.success).to.be.equal(true);
      expect(response.body.message).to.be.equal('OK');
      expect(response.status).to.be.equal(200);
      expect(response.body).to.deep.equal(outputPayload);
    });
  });
});
