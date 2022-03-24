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
      token: 'eyJhbGciOiJIUzI1NiJ9.MQ.dQmeXYvGEvAIr4s20zDCeYcI0HxMZhp26RK-4zvGrhQ'
    };

    beforeEach(() => {
      sinon.stub(User, 'findOne').resolves(outputPayload.user as User);
      sinon.stub(bcryptJS, 'compareSync').returns(true);
      sinon.stub(validateInputs);
      sinon.stub(authentication);
    });

    it('When the login occurs correctly:', async () => {
      const response = await chai.request(app).post('/login').send(inputPayload);

      expect(response.status).to.be.equal(200);
    });

    afterEach(() => {
      sinon.restore();
    });

    it('When the authentication works properly', () => {
      expect(validateInputs).to.have.been.called();
    });
  });
});
