import   express  from  "express"
import { CreateAccount ,LoginAccount} from "../controller/user-auth";

export const router=express.Router();

router.post("/account-create",CreateAccount)
router.post("/login-account",LoginAccount)

