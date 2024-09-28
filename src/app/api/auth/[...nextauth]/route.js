import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import connectToDatabase from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcrypt";

// Sanitization function to prevent XSS attacks
function sanitizeInput(input) {
  return input.trim().replace(/[<>&'"]/g, (char) => {
    switch (char) {
      case "<":
        return "&lt;";
      case ">":
        return "&gt;";
      case "&":
        return "&amp;";
      case '"':
        return "&quot;";
      case "'":
        return "&#39;";
      default:
        return char;
    }
  });
}

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          await connectToDatabase();

          const sanitizedUsername = sanitizeInput(credentials.username);
          const sanitizedPassword = sanitizeInput(credentials.password);

          const user = await User.findOne({
            username: sanitizedUsername,
          }).exec();
          if (!user) {
            throw new Error("User not found");
          }
          const isValid = await bcrypt.compare(
            sanitizedPassword,
            user.password
          );
          if (!isValid) {
            throw new Error("Invalid credentials");
          }
          return {
            id: user._id.toString(),
            username: user.username,
            email: user.email,
            role: user.role,
          };
        } catch (error) {
          console.error("Error during authorization:", error.message);
          return null;
        }
      },
    }),
  ],
  session: {
    jwt: true,
    maxAge: 2 * 60 * 60, // 2 hours session duration
  },

  jwt: {
    secret: process.env.JWT_SECRET,
  },
  callbacks: {
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.email = token.email;
        session.user.username = token.username;
        session.user.role = token.role;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.username = user.username;
        token.stayLoggedIn = user.stayLoggedIn;
        token.role = user.role;
      }

      return token;
    },
  },
  database: process.env.DATABASE_URI,
});

export { handler as GET, handler as POST };
