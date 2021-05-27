import express, { Application } from "express";
import * as bodyParser from "body-parser";
import { Routes } from "./routes/crmRoutes";
import mongoose from "mongoose";

class App {
  public app: Application;

  public mongoUrl: string = "mongodb://localhost:27017/CRMdb";

  public router: Routes = new Routes();
  constructor() {
    this.app = express();
    this.config();
    this.router.routes(this.app);

    this.mongoSetup();
  }

  private config(): void {
    this.app.use(bodyParser.json());

    this.app.use(bodyParser.urlencoded({ extended: false }));
  }

  private async mongoSetup(): Promise<void> {
    await mongoose
      .connect(this.mongoUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .catch((reason: any) => {
        console.log(reason);
      });
  }
}

export default new App().app;
