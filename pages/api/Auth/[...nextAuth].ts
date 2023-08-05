import { NextApiHandler } from 'next';
import NextAuth, { NextAuthOptions } from 'next-auth';

 
import { authOptions } from '@/config/nextauth.config';

const nextAuthOptions: NextAuthOptions = {
  ...authOptions,
  
};

const nextAuthHandler: NextApiHandler = (req, res) =>
  NextAuth(req, res, nextAuthOptions);

export default nextAuthHandler;

