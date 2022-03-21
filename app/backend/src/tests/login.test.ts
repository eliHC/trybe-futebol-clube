import * as sinon from 'sinon';
import * as chai from 'chai';
import * as bcryptJS from 'bcryptjs';

import chaiHttp = require('chai-http');

import { app } from '../app';

import User from '../database/models/User';

chai.use(chaiHttp);

const { expect } = chai;

describe('test app', () => {
  describe('About route /login...', () => {
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

    before(() => {
      
      sinon.stub(User, 'findOne').resolves(outputPayload.user as User);
      sinon.stub(bcryptJS, 'compareSync').returns(true);
    });
    
    after(() => {
      (User.findOne as sinon.SinonStub).restore();
      (bcryptJS.compareSync as sinon.SinonStub).restore();
    });
    
    
    it('When the login occurs correctly:', async () => {
      const response = await chai
        .request(app)
        .post('/login')
        .send(inputPayload);

      expect(response.status).to.be.equal(200);
    });
  });
});
