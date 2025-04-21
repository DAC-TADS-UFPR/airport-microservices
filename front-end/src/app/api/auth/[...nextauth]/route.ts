import NextAuth from "next-auth";

const handle = NextAuth({
  providers: [],
  callbacks: {
    jwt: ({ token, account }) => {
      if (account?.access_token) {
        token.access_token = account.access_token;
      }
      if (account?.id_token) {
        token.id_token = account.id_token;
      }
      return token;
    },
    session: async ({ session, user, token }) => {
      session.user = { ...user, ...token };
      return session;
    },
  },
});

export { handle as GET, handle as POST };
