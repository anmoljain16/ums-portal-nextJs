
import Link from "next/link";
import Logout from "@/components/Logout";
import UserDetail from "@/components/UserDetail";


export default function Home() {
  return (

      <>

        <h1>Hello </h1>
          <UserDetail/>
        <Link href={"/login"}>Login </Link>
        <Link href={"/signup"} >Signup </Link>
          <Logout/>
      </>
  )
}
