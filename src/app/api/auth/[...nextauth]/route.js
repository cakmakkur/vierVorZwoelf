import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import connectToDatabase from "@/lib/mongodb"
import User from "@/models/User";
import bcrypt from "bcrypt"

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
          const user = await User.findOne({ username: credentials.username }).exec();
          if (!user) {
            throw new Error("User not found");
          }
          const isValid = await bcrypt.compare(credentials.password, user.password);
          if (!isValid) {
            throw new Error("Invalid credentials");
          }
          return {
            id: user._id.toString(),
            username: user.username,
            email: user.email,
            role: user.role,
            // stayLoggedIn: credentials.stayLoggedIn,
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

  // NextAuth.js handles sessions out of the box. By setting session: { jwt: true }, you're telling NextAuth to use JSON Web Tokens (JWT) for session management. This means the session is stored in the client-side cookie and verified on the server.
  jwt: {
    secret: process.env.JWT_SECRET,
  },
  callbacks: {
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.email = token.email;
        session.user.username = token.username
        session.user.role = token.role;
        // session.stayLoggedIn = token.stayLoggedIn
        // session.expires = new Date(token.exp * 1000).toISOString();
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
        // token.exp = token.stayLoggedIn
        //   ? Math.floor(Date.now() / 1000) + 30 * 24 * 60 * 60 // 30 days
        //   : Math.floor(Date.now() / 1000) + 10;
      } 

      return token;
    }
  },
  database: process.env.DATABASE_URI,
});

export { handler as GET, handler as POST };
