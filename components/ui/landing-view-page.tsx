import Navbar from "./navbar-view"
import { ServerComponent } from "./user-session"

export const LandingPage=async()=>{
     const user = await ServerComponent()
 return(
    <div className=" min-h-screen">
     <Navbar  user={user}/>
    </div>
 )
}