import { Application, Request, Response } from "express";
import {
  BookController,
  ContactController,
  PublisherController,
} from "../controllers/crmController";

export class Routes {
  public contactController: ContactController = new ContactController();
  public publisherController: PublisherController = new PublisherController();
  public bookController: BookController = new BookController();

  public routes(app: Application): void {
    app.route("/").get((req: Request, res: Response) => {
      res.status(201).send({
        message: "GET Request SuccessFully",
      });
    });

    /**
     * Book Routes
     */
    app.route("/addBook").post(this.bookController.addBook);
    app.route("/book").get(this.bookController.getBook);

    /**
     * Publisher Routes
     */

    app.route("/addPublisher").post(this.publisherController.addPublisher);
    app.route("/publisher").get(this.publisherController.getAllPublisher);
    /**
     * Contact Routes
     */
    app
      .route("/contact")
      .get(this.contactController.getContacts)
      .post(this.contactController.addNewContact);

    app
      .route("/contact/:contactId")
      .get(this.contactController.getContactById)
      .put(this.contactController.updateContact)
      .delete(this.contactController.deleteContact);
  }
}
