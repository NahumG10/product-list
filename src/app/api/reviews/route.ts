import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Review from "@/models/Review";
import mongoose from "mongoose";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const productId = searchParams.get("productId");

    if (!productId || !mongoose.Types.ObjectId.isValid(productId)) {
      return NextResponse.json(
        { error: "Valid productId parameter is required" },
        { status: 400 }
      );
    }

    await connectToDatabase();
    const reviews = await Review.find({ productId }).sort({ createdAt: -1 });

    return NextResponse.json(reviews);
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to fetch reviews" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { productId, userName, rating, comment } = body;

    if (!productId || !mongoose.Types.ObjectId.isValid(productId)) {
      return NextResponse.json(
        { error: "Valid productId is required" },
        { status: 400 }
      );
    }

    if (!userName || !rating || !comment) {
      return NextResponse.json(
        { error: "userName, rating, and comment are required" },
        { status: 400 }
      );
    }

    await connectToDatabase();
    const review = new Review({
      productId,
      userName,
      rating,
      comment,
    });

    await review.save();
    return NextResponse.json(review, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to create review" },
      { status: 500 }
    );
  }
}
