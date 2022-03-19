import * as sinon from 'sinon';
import * as chai from 'chai';

import chaiHttp = require('chai-http');
// import { Response } from 'superagent';
// import { app } from '../app';

// import User from '../database/models/User';

chai.use(chaiHttp);

const { expect } = chai;

class UserMock { };

describe('Test /login route:', () => {
  let chaiHttpResponse: Response;
  const Usr = new UserMock();

  it('To create user in DB with success', () => {
    expect(Usr).to.be.an('object');
  });
});
