import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import routes from "@/routes";

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use("/api", routes);

// End point sample
app.get("/", (req, res) => {
  res.send("API is running");
});

export default app;