import { Request, Response } from "express";
import * as mongoose from "mongoose";
import { BookSchema, ContactSchema, PublisherSchema } from "../models/crmModel";

/**
 * Daftarin Model
 */
const Contact = mongoose.model("Contact", ContactSchema);
const Publisher = mongoose.model("Publisher", PublisherSchema);
const Book = mongoose.model("Book", BookSchema);

export class BookController {
  public async addBook(req: Request, res: Response): Promise<void> {
    const book = new Book(req.body);

    await book.save();

    Publisher.findById(
      { _id: req.body.publisher },
      async (err: any, publisher: any) => {
        publisher.publishedBooks.push(book);
        await publisher.save();
      }
    );
    res.status(200).json({ success: true, data: book });
  }
  public async getBook(req: Request, res: Response): Promise<void> {
    let data = await Book.find({}).populate("publisher");
    res.status(201).json(data);
  }
}

export class PublisherController {
  public async addPublisher(req: Request, res: Response): Promise<void> {
    const publisher = new Publisher(req.body);

    await publisher.save();

    res.status(201).json({
      success: true,
      data: publisher,
    });
  }

  public async getAllPublisher(req: Request, res: Response): Promise<void> {
    let data = await Publisher.find({}).populate("publishedBooks");

    res.status(201).json(data);
  }
}

export class ContactController {
  public addNewContact(req: Request, res: Response): void {
    let newContact = new Contact(req.body);

    newContact.save((err: any, contact: any) => {
      if (err) {
        res.send(err);
      }
      res.json({ contact });
    });
  }

  public getContacts(req: Request, res: Response): void {
    Contact.find({}, (err: any, contact: any) => {
      if (err) {
        res.send(err);
      }

      res.json({ contact });
    });
  }

  public getContactById(req: Request, res: Response): void {
    Contact.findById(req.params.contactId, (err: any, contact: any) => {
      if (err) {
        res.send(err);
      }
      res.json({ contact });
    });
  }

  public updateContact(req: Request, res: Response): void {
    Contact.findOneAndUpdate(
      { _id: req.params.contactId },
      req.body,
      {
        new: true,
      },
      (err: any, contact: any) => {
        if (err) {
          res.send(err);
        }

        res.json({ contact });
      }
    );
  }

  public deleteContact(req: Request, res: Response): void {
    try {
      Contact.remove({ _id: req.params.contactId });
      res.send({
        message: "Berhasil hapus",
      });
    } catch (err) {
      res.send(err);
    }
  }
}
