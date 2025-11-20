import   express  from  "express"
import cors from "cors";
import { MongoDB_Connections } from "./database/connections";
import dotenv from "dotenv"
import { router as authRouter, router } from "./routers/auth-route";


 dotenv.config();
const app=express()

app.use(express.json())

app.use(cors())

MongoDB_Connections()

app.get("/",(req,res)=>{
    res.send("Flux Backend is working fine ")
})

app.use("/api/v1/flux/user",authRouter)

const PORT=8000;
app.listen(PORT,()=>{
    console.log("Server is running at port ",PORT)
})