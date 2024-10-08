import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials, req) {
        const user = { id: "1", name: `${process.env.ADMIN_USERNAME}` };

        if (
          credentials?.username === process.env.ADMIN_USERNAME &&
          credentials?.password === process.env.ADMIN_PASSWORD
        ) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
    error: "/login",
  },
  session: {
    maxAge: 60 * 60,
  },
};
