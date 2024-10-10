import { NextRequest, NextResponse } from "next/server";
import { mongo_uri } from "../../../../../constant";
import connectDB from "@/database";
import { Blog } from "@/models/blog";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDB(mongo_uri);
    const blog = await Blog.findById(params.id);
    return NextResponse.json({
      success: true,
      data: blog,
    });
  } catch (error) {
    if (error instanceof Error && error.name == "CastError") {
      return NextResponse.json(
        {
          success: false,
          message: "resource error",
        },
        { status: 404 }
      );
    }
    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error && error.message,
      },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDB(mongo_uri);
    await Blog.deleteOne({ _id: params.id });
    return NextResponse.json({
      success: true,
      message: "Blog Removed",
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error && error.message,
      },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDB(mongo_uri);
    const { title, description, imageURL } = await req.json();
    const blog = await Blog.findOne({ _id: params.id });

    blog.title = title;
    blog.description = description;
    blog.imageURL = imageURL;

    const updatedBlog = await blog.save();

    return NextResponse.json({
      success: true,
      data: updatedBlog,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error && error.message,
      },
      { status: 500 }
    );
  }
}
