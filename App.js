import express from "express";
import session from "express-session";
import Hello from "./hello.js";
import Lab5 from "./Lab5.js";
import cors from "cors";
import "dotenv/config";
import CourseRoutes from "./Kanbas/Courses/routes.js";
import ModuleRoutes from "./Kanbas/modules/routes.js";
import AssignmentRoutes from "./Kanbas/assignments/routes.js";
import UserRoutes from "./Kanbas/Users/routes.js";
import { mongoose } from "mongoose";
const CONNECTION_STRING =
  process.env.DB_CONNECTION_STRING || "mongodb://127.0.0.1:27017/kanbas";
mongoose.connect(CONNECTION_STRING);
const app = express();
app.use(cors({ credentials: true, origin: process.env.FRONTEND_URL }));
const sessionOptions = {
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
};
if (process.env.NODE_ENV !== "development") {
  sessionOptions.proxy = true;
  sessionOptions.cookie = {
    sameSite: "none",
    secure: true,
  };
}
app.use(session(sessionOptions));

app.use(express.json());
Hello(app);
AssignmentRoutes(app);
ModuleRoutes(app);
CourseRoutes(app);
UserRoutes(app);
Lab5(app);
app.listen(process.env.PORT || 4000);
