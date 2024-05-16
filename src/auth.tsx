import { compare } from "bcryptjs";
import NextAuth, { AuthError, CredentialsSignin } from "next-auth";
import CredentialProvider from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";
import { User } from "./app/util/Model/user";
import dbConnect from "./app/util/db";
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      
    }),
    CredentialProvider({
      name: "credential",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (cred): Promise<any> => {
        const email = cred.email as string;
        const password = cred.password as string;

        // Database Connection
        await dbConnect();
        const user = await User.findOne({ email }).select("+password");

        if (!user) {
          throw new CredentialsSignin({ cause: "Invalid email or password" });
        }
        if (!user.password) {
          throw new CredentialsSignin({ cause: "Invalid email or password" });
        }

        const isMatch = await compare(password, user.password);
        if (!isMatch)
          throw new CredentialsSignin({ cause: "Invalid email or password" });

        return { name: user.name, email: user.email, "_id": user._id };
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },

  callbacks: {
   
    signIn: async ({ user, account }) => {
      if (account?.provider === "github") {
        try {
          const { email, id, name } = user;
          await dbConnect();
          const isUserAlready = await User.findOne({ email });
          if (!isUserAlready) await User.create({ email, id, name });
          return true;
        } catch (err) {
          throw new AuthError("Error while creating user");
        }
      }
      if (account?.provider === "credentials") return true;
      return false;
    },
    
  },
});
