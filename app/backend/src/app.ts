import * as express from 'express';
import * as cors from 'cors';

import validateInputs from './database/middlewares/validateInputs';

import omegaRoute from './database/routes/omegaRoutes';

class App {
  public app: express.Express;

  constructor() {
    this.app = express();
    this.config();
  }

  private config(): void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };
    this.app.use(accessControl);
    this.app.use(express.json());
    this.app.use(cors());
    //
    this.app.use(validateInputs);
    //
    this.app.use(omegaRoute);
    //
  }

  public start(PORT: string | number): void {
    this.app.listen(PORT, () => console.log(`>>--------------${PORT}--------------<<`));
  }
}

export { App };

// A execução dos testes de cobertura depende dessa exportação
export const { app } = new App();
