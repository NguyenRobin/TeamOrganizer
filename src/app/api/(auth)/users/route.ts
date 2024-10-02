import connectToMongoDB from "@/lib/connectToMongoDB";
import { hashPassword } from "@/lib/server/serverHelperFunc";
import UserModel from "@/models/User";
import mongoose, { Types } from "mongoose";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectToMongoDB();
    const users = await UserModel.find();
    return NextResponse.json({
      status: 200,
      message: "success",
      result: users.length,
      users,
    });
  } catch (error: any) {
    return NextResponse.json({ status: 404, message: error.message });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, username, password } = body;
    const hashedPassword = await hashPassword(password);

    const user = {
      username,
      email,
      password: hashedPassword,
    };

    await connectToMongoDB();
    const newUser = new UserModel(user);
    await newUser.save();
    return NextResponse.json({ status: 201, message: "success" });
  } catch (error: any) {
    return NextResponse.json({ status: 500, message: error.message });
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { userId, newUsername } = body;
    await connectToMongoDB();

    if (!userId || !newUsername) {
      return NextResponse.json({
        message: "Invalid request. Missing userId or new username",
        status: 400,
      });
    }

    if (!mongoose.isValidObjectId(userId)) {
      return NextResponse.json({
        message: "Invalid userId for ObjectId",
        status: 400,
      });
    }

    const updatedUser = await UserModel.findOneAndUpdate(
      // convert string to ObjectID
      { _id: Types.ObjectId.createFromHexString(userId) },
      { username: newUsername },
      { new: true }
    );

    if (!updatedUser) {
      return NextResponse.json({
        message: "User not found",
        status: 400,
      });
    }
    return NextResponse.json({
      status: 200,
      message: "success",
      user: updatedUser,
    });
  } catch (error: any) {
    return NextResponse.json({ status: 500, message: error.message });
  }
}

export async function DELETE(request: Request) {
  try {
    console.log(request.url);
    const { searchParams } = new URL(request.url); // http://localhost:3000/api/
    const userId = searchParams.get("userId"); //retrieve the query parameter 1

    if (!userId) {
      return NextResponse.json({
        message: "Invalid request. Missing userId.",
        status: 400,
      });
    }

    if (!mongoose.isValidObjectId(userId)) {
      return NextResponse.json({
        message: "Invalid userId for ObjectId",
        status: 400,
      });
    }

    await connectToMongoDB();

    const deletedUser = await UserModel.findByIdAndDelete(
      Types.ObjectId.createFromHexString(userId)
    );

    if (!deletedUser) {
      return NextResponse.json({
        message: "User not found",
        status: 400,
      });
    }

    return NextResponse.json({
      status: 200,
      message: "success",
      user: deletedUser,
    });
  } catch (error: any) {
    return NextResponse.json({ status: 500, message: error.message });
  }
}
