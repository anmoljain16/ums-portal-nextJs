import NextAuth from 'next-auth/next'
import CredentialsProvider from "next-auth/providers/credentials";
import {connect} from "@/dbConnection/dbConnection";
import User from "@/models/userModel";
import bcrypyt from "bcryptjs";

const authOptions = {
    providers: [
        CredentialsProvider({
        name: 'credentials',
        credentials: {},
        async authorize(credentials, req) {
            const{email, password} = credentials;

            try{
                await connect();
                const user = await User.findOne({email})
                if (!user) {
                    return null;
                }

                // Check if password is correct
                const passwordMatch = await bcrypyt.compare(password, user.password);
                if (!passwordMatch) {
                    return null;
                }
                return user;

            }catch (e) {
                console.log("error : ",e)
            }
        },
        })
    ],
    session:{
        strategy: 'jwt',

    },
    secret: process.env.NEXTAUTH_SECRET,
    pages:{
        signIn:'/newlogin',
    }
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST};
