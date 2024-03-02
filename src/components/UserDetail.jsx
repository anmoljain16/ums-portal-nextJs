"use client"

import {useSession} from "next-auth/react";

export default function UserDetail() {
    const {data: session} = useSession();
    console.log(session);
    return (
        <div>
            <h1>{ session?.user?.email }</h1>
        </div>
    )
}
