import * as dao from "./dao.js";
import Database from "../Database/index.js";
export default function CourseRoutes(app) {
  app.get("/api/courses/:id", async (req, res) => {
    const { id } = req.params;
    const course = await dao.findCourseById(id);
    // const course = Database.courses.find((c) => c._id === id);
    if (!course) {
      res.status(404).json("Course not found");
      return;
    }
    res.send(course);
  });

  // app.put("/api/courses/:id", (req, res) => {
  //   const { id } = req.params;
  //   const course = req.body;
  //   Database.courses = Database.courses.map((c) =>
  //     c._id === id ? { ...c, ...course } : c
  //   );
  //   res.sendStatus(204);
  // });
  app.put("/api/courses/:id", async (req, res) => {
    const { id } = req.params;
    const course = req.body;
    try {
      await dao.updateCourse(id, course);
      res.sendStatus(204);
    } catch (error) {
      res.status(500).json("Internal Server Error");
    }
  });

  // app.delete("/api/courses/:id", (req, res) => {
  //   const { id } = req.params;
  //   Database.courses = Database.courses.filter((c) => c._id !== id);
  //   res.sendStatus(204);
  // });
  app.delete("/api/courses/:id", async (req, res) => {
    const { id } = req.params;
    try {
      await dao.deleteCourse(id);
      res.sendStatus(204);
    } catch (error) {
      res.status(500).json("Internal Server Error");
    }
  });

  // app.post("/api/courses", (req, res) => {
  //   const course = { ...req.body, _id: new Date().getTime().toString() };
  //   Database.courses.push(course);
  //   res.send(course);
  // });
  app.post("/api/courses", async (req, res) => {
    const course = req.body;
    try {
      const newCourse = await dao.createCourse(course);
      res.json(newCourse);
    } catch (error) {
      res.status(500).json("Internal Server Error");
    }
  });

  // app.get("/api/courses", (req, res) => {
  //   const courses = Database.courses;
  //   res.send(courses);
  // });
  app.get("/api/courses", async (req, res) => {
    try {
      const courses = await dao.findAllCourses();
      res.json(courses);
    } catch (error) {
      res.status(500).json("Internal Server Error");
    }
  });
}
