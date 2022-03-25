import * as sinon from 'sinon';
import * as chai from 'chai';

import chaiHttp = require('chai-http');

import { app } from '../app';

import MatchRepository from '../database/repositories/MatchRepository';
import Matchs from '../database/models/Match';

chai.use(chaiHttp);
const { expect } = chai;

describe('On /matchs route, ', () => {
  describe('with GET method, ', () => {
    const outputMock = [{
      id: 1,
      homeTeam: 16,
      homeTeamGoals: 1,
      awayTeam: 8,
      awayTeamGoals: 1,
      inProgress: false,
    }];

    before(() => {
      sinon.stub(MatchRepository, 'getAll').resolves(outputMock as Matchs[]);
    });
    after(() => {
      sinon.restore();
    });

    it('should return a list of matches', async () => {
      const response = await chai.request(app).get('/matchs');

      expect(response.status).to.be.equal(200);
      expect(response.body).to.be.deep.equal(outputMock);
    });
  });
});
