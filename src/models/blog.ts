import { Blogs } from "@/types";
import { Schema, model, models } from "mongoose";

const blogSchema = new Schema<Blogs>(
  {
    title: {
      type: String,
      required: [true, "Title should not be empty"],
    },
    description: {
      type: String,
      required: [true, "Description should not be empty"],
    },
    imageURL: {
      type: String,
      default: "", //kalo misal ga diisi mau dikasi apa
    },
  },
  { timestamps: true }
);

export const Blog = models.Blogs || model<Blogs>("Blogs", blogSchema);
