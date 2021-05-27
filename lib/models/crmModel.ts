import * as mongoose from "mongoose";

const Schema = mongoose.Schema;

export const ContactSchema = new Schema(
  {
    firstName: {
      type: String,
      required: "Enter a first name",
    },
    lastName: {
      type: String,
      required: "Enter a last name",
    },
    email: {
      type: String,
    },
    company: {
      type: String,
    },
    phone: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

export const PublisherSchema = new Schema(
  {
    name: String,
    location: String,
    publishedBooks: [
      {
        type: Schema.Types.ObjectId,
        ref: "Book",
      },
    ],
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const BookSchema = new Schema(
  {
    name: String,
    publishYear: Number,
    author: String,
    publisher: {
      type: Schema.Types.ObjectId,
      ref: "Publisher",
      require: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);
