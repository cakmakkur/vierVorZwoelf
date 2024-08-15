"use server"

import { NextRequest } from "next/server";
import User from "@/models/User"
import connectToDatabase from "@/lib/mongodb"

export async function POST(request: NextRequest) {
  await connectToDatabase()

  const bcrypt = require("bcrypt")
  try {
      const {username, email, password} = await request.json();

      // Check if the user already exists
      // const existingUser = await User.findOne({ email });

      // if (existingUser) {
      //   return res.status(400).json({ message: 'User already exists' });
      // }

      // Hash the password
      console.log("received: " + username + " " + email + "" + password)
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create a new user
      const user = await User.create({
        username,
        email,
        password: hashedPassword,
      });
      console.log("saved it to the db")
      return new Response(JSON.stringify("User created successfully"))
    } catch (error) {
      console.log("failed to save it to the db")
      console.error('Error creating user:', error);
      return new Response(JSON.stringify("Failed to create a new user"))
    }
}