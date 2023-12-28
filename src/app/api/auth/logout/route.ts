
import { serialize } from "cookie";
import { COOKIE_NAME } from "@/constant";

const MAX_AGE = 60*60*24*30;

export async function GET(){
    
    const serializeToken = serialize(COOKIE_NAME, "", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: -1,
        path: "/"
    })

    const response = {msg: "Logout successful"};
    return new Response(JSON.stringify(response), {
        status: 200,
        headers: {"Set-Cookie": serializeToken}
    });

}
