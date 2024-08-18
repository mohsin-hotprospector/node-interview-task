import express, {Application} from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import setup from './api/routes/base.routes';
class App {
  protected app: Application;

  constructor() {
    this.app = express();
    this.config();
  }

  private config(): void {
    this.app.use(cors());
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({extended: false}));
    setup(this.app);
  }

  public start(): void {
    const appPort = process.env.PORT || 3000;
    this.app.listen(appPort, () => {
      console.log(`Server running at http://localhost:${appPort}/`);
    });
  }
}

const app = new App();
app.start();
