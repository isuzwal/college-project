import { connect } from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const DATABASE_UTL = process.env.DATA_BASE_URL;
export const MongoDB_Connections = async () => {
  try {
    if (!DATABASE_UTL) {
      console.log("URL is Missing ");
    } else {
      await connect(DATABASE_UTL);
    }
    console.log("Connections is working");
  } catch (error) {
    console.log("Conections Fail Data", error);
  }
};
