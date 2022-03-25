import * as sinon from 'sinon';
import * as chai from 'chai';

import chaiHttp = require('chai-http');

import { app } from '../app';

import Club from '../database/models/Club';

chai.use(chaiHttp);
const { expect } = chai;

describe('On /clubs route, ', () => {
  describe('with GET method, ', () => {

    const outputPayload = [{
      clubName: "Avaí/Kindermann"
    },
    {
      clubName: "Bahia"
    }];

    before(() => {
      sinon.stub(Club, 'findAll').resolves(outputPayload as Club[]);
    });
    after(() => {
      sinon.restore();
    });

    it('Returns the correct data', async () => {
      const response = await chai.request(app).get('/clubs');

      expect(response.status).to.be.equal(200);
      expect(response.body).to.be.an('array');
      expect(response.body).to.have.lengthOf(2);
      expect(response.body).to.be.deep.equal(outputPayload);
    });
  });

  describe('With POST method, ', () => {
    it('Does not break the app', async () => {
      const res = await chai.request(app).post('/club');

      expect(res.status).to.be.equal(404);
    })
  });
});

describe('On /clubs/:id route, ', () => {
  describe('with GET method: ', () => {
    const outputPayload = {
      "clubName": "Santos"
    };

    before(() => {
      sinon.stub(Club, 'findByPk').resolves(outputPayload as Club);
    });
    after(() => {
      sinon.restore();
    });

    it('Returns the correct data', async () => {
      const response = await chai.request(app).get('/clubs/14');

      expect(response.status).to.be.equal(200);
      expect(response.body).to.be.deep.equal(outputPayload);
    });
  });
});
