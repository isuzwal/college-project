import Navbar from "./navbar-view"
import { UserComponent } from "@/lib/user/user"

export const LandingPage=async()=>{
     const user = await UserComponent()
 return(
    <div className=" min-h-screen">
     <Navbar  user={user}/>
    </div>
 )
}