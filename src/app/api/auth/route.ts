import { userSignUpSchema } from "@/schemas/auth";
import { db } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { hash } from 'bcrypt';

export const POST = async (req: Request) => {
  try {
    const body = await req.json();
    const { email, username, password } = userSignUpSchema.parse(body);

    const existingUserByEmail = await db.user.findUnique({
      where: {
        email,
      }
    });
    if ( existingUserByEmail ) {
      return NextResponse.json({
        message: 'User already exists',
        user: null
      }, { status: 409 });
    }

    const existingUserByUsername = await db.user.findUnique({
      where: {
        username,
      }
    });
    if ( existingUserByUsername ) {
      return NextResponse.json({
        message: 'User already exists',
        user: null
      }, { status: 409 });
    }

    const hashedPassword = await hash(password, 10);

    const newUser = await db.user.create({
      data: {
        email,
        username,
        password: hashedPassword,
      }
    });
    const { password: newUserPassword, ...user } = newUser;

    return NextResponse.json({ message: 'User created successfully', user }, { status: 201 });
  } catch ( error ) {
    return NextResponse.json({
      message: 'Something went wrong'
    }, { status: 500 });
  }
}