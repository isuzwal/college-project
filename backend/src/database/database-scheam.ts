import { Schema,model} from "mongoose";


interface User{
    username:string;
    email:string;
    password:string;
    profile_image:string;
}
const UserScheam=new Schema<User>({
    username: { type: String, required: true },
    email: { type: String, required: true },
    password:{type:String,required:true },
    profile_image: String
})


export const UserModel=model<User>('user',UserScheam)