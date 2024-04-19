import mongoose from "mongoose";
const coursesSchema = new mongoose.Schema(
  {
    name: String,
    number: String,
    startDate: Date,
    endDate: Date,
  },
  { collection: "courses" }
);
export default coursesSchema;
