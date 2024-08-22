import dbConnect from '@/lib/mongodb';
import User from '@/models/User';
import { NextResponse } from 'next/server';

export async function POST(request) {
  await dbConnect();

  const { name, email } = await request.json();

  if (!name || !email) {
    return NextResponse.json({ error: 'Name and email are required' }, { status: 400 });
  }

  try {
    const newUser = new User({ name, email });
    await newUser.save();
    return NextResponse.json({ message: 'User created successfully' }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create user' }, { status: 500 });
  }
}