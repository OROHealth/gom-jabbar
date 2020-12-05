import mongoose from "mongoose";
import { IConfig } from "./config";

export async function connect(config: IConfig): Promise<void> {
  const {
    mongo_host,
    mongo_user,
    mongo_pass,
    mongo_database,
    mongo_debug,
  } = config;
  const mongoIdentity = `${mongo_user}:${mongo_pass}`;
  const mongoServer = `${mongo_host}`;
  const mongoUri = `mongodb+srv://${mongoIdentity}@${mongoServer}/${mongo_database}`;
  console.log(`Trying to connect to DB : ${mongoUri}`);
  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: false
  });
  mongoose.set("debug", mongo_debug);
}