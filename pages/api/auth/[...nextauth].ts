import NextAuth, { NextAuthOptions } from "next-auth"
import { PluginLab } from "../../../providers/pluginlab";

export const authOptions: NextAuthOptions = {
  debug: true,
  providers: [
    PluginLab({
      clientId: process.env.PLUGINLAB_CLIENT_ID,
      clientSecret: process.env.PLUGINLAB_CLIENT_SECRET,
      pluginId: process.env.PLUGINLAB_PLUGIN_ID,
    }),
  ],
  callbacks: {
    async jwt({ token }) {
      return token
    },
  },
}

export default NextAuth(authOptions)
