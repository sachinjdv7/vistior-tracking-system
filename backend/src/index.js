import dotenv from "dotenv";
import { app } from "./app.js";
import { connectDB } from "./db/db-connection.js";

dotenv.config({
  path: "./.env",
});

const PORT = process.env.PORT ?? 8083;

connectDB()
  .then(() => {
    app.on("error", (error) => {
      console.log("Express server connection failed ", error);
    });
    app.listen(PORT, () => {
      console.log(`🚀Express server is running at port:${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log(`MongoDB connection failed !!!, ${error}`);
  });
