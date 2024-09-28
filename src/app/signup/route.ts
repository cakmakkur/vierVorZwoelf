"use server";

import { NextRequest } from "next/server";
import User from "@/models/User";
import connectToDatabase from "@/lib/mongodb";

export async function POST(request: NextRequest) {
  await connectToDatabase();

  // Sanitization
  const sanitizeInput = (input: string): string => {
    return input.trim().replace(/[<>]/g, "");
  };
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const bcrypt = require("bcrypt");
  try {
    const { username, email, password } = await request.json();

    const sanitizedUsername = sanitizeInput(username);
    const sanitizedEmail = sanitizeInput(email);
    const sanitizedPassword = sanitizeInput(password);
    if (!validateEmail(sanitizedEmail)) {
      throw new Error("Invalid email format");
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return new Response(JSON.stringify("User already exists"));
    }

    const hashedPassword = await bcrypt.hash(sanitizedPassword, 10);
    const user = await User.create({
      username: sanitizedUsername,
      email: sanitizedEmail,
      password: hashedPassword,
    });
    console.log("saved it to the db");
    return new Response(JSON.stringify("User created successfully"));
  } catch (error) {
    console.log("failed to save it to the db");
    console.error("Error creating user:", error);
    return new Response(JSON.stringify("Failed to create a new user"));
  }
}
