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
        await connectToDatabase();
        const user = await User.findOne({ username: credentials.username }).exec()

        console.log('user id: ' + user._id)


        if (user && credentials?.password) {
          const isValid = await bcrypt.compare(credentials.password, user.password);

          if (isValid) {
            return { id: user._id.toString(), username: user.username, email: user.email };
          }
        }
        return null;
      },
    }),
  ],
  session: {
    jwt: true,
  },
  // NextAuth.js handles sessions out of the box. By setting session: { jwt: true }, you're telling NextAuth to use JSON Web Tokens (JWT) for session management. This means the session is stored in the client-side cookie and verified on the server.
  callbacks: {
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.email = token.email;
        session.user.username = token.username
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.username = user.username

      }
      return token;
    },
  },
  database: process.env.DATABASE_URI,
});

export { handler as GET, handler as POST };
