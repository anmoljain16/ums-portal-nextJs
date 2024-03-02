import {connect} from "@/dbConnection/dbConnection";
import {NextResponse} from "next/server";
import {hash} from "bcrypt";
import {sign} from "jsonwebtoken";
// import {setCookie} from "nookies";
import User from "@/models/userModel";


await connect();

async function handler(request) {
    // check if the method is post
    if (request.method === 'POST') {
        //fetch the data from the request
        const {username, email, password} = await request.json();
        // check if the data is valid
        if (!username || !email || !password) {
            return NextResponse.json({error: 'Invalid request, data nor found'});
        }
        // check if the user already exists
        const user = await User.findOne({email});

        if (user) {
            return NextResponse.json({error: 'User already exists'});
        }
        // hash the password
        const hashedPassword = await hash(password, 10);
        // create a new user
        const newUser = await User.create({username, email, password: hashedPassword});
        if (!newUser) {
            return NextResponse.json({error: 'Error creating user'});
        }

        // Create and assign a token
        const token_data = {
            id : newUser._id,
            username: newUser.username,
            email : newUser.email,
        }

        // create a token using jsonwebtoken sign method
        const token = await sign(token_data, process.env.NEXTAUTH_SECRET, {
            expiresIn: '1h'
        });

        // create response and set all the data in the response
        const response = NextResponse.json({
            message: "User Created successfully",
            cookies: {
                token: token
            },
            user: newUser,
            success: true
        });

        // set the token in the cookie in response variable
        response.cookies.set("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            path: '/',
            maxAge: 60 * 60 * 24 * 7,
        });
        // console.log(response);

        return response;
    }
    return NextResponse.json({error: 'Invalid request'});


}

export {handler as POST};
