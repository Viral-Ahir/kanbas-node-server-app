import model from "./model.js";

export const createCourse = (course) => {
  delete course._id;
  return model.create(course);
};

export const findAllCourses = () => {
  return model.find();
};

export const findCourseById = (id) => {
  return model.findById(id);
};

export const updateCourse = (id, course) => {
  return model.updateOne({ _id: id }, { $set: course });
};

export const deleteCourse = (id) => {
  return model.deleteOne({ _id: id });
};
