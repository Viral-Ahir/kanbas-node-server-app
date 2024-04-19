// import db from "../Database/index.js";
import * as dao from "./dao.js";
function ModuleRoutes(app) {
  app.delete("/api/modules/:mid", async (req, res) => {
    const { mid } = req.params;
    try {
      await dao.deleteModule(mid);
      res.sendStatus(204);
    } catch (error) {
      res.status(500).json("Internal Server Error");
    }
  });
  // app.delete("/api/modules/:mid", (req, res) => {
  //   const { mid } = req.params;
  //   db.modules = db.modules.filter((m) => m._id !== mid);
  //   res.sendStatus(200);
  // });

  app.put("/api/modules/:mid", async (req, res) => {
    const { mid } = req.params;
    const module = req.body;
    try {
      await dao.updateModule(mid, module);
      res.sendStatus(204);
    } catch (error) {
      res.status(500).json("Internal Server Error");
    }
  });
  // app.put("/api/modules/:mid", (req, res) => {
  //   const { mid } = req.params;
  //   const moduleIndex = db.modules.findIndex((m) => m._id === mid);
  //   db.modules[moduleIndex] = {
  //     ...db.modules[moduleIndex],
  //     ...req.body,
  //   };
  //   res.sendStatus(204);
  // });

  app.post("/api/courses/:cid/modules", async (req, res) => {
    const { cid } = req.params;
    const newModule = {
      ...req.body,
      course: cid,
    };
    try {
      const createdModule = await dao.createModule(newModule);
      res.json(createdModule);
    } catch (error) {
      res.status(500).json("Internal Server Error");
    }
  });
  // app.post("/api/courses/:cid/modules", (req, res) => {
  //   const { cid } = req.params;
  //   const newModule = {
  //     ...req.body,
  //     course: cid,
  //     _id: new Date().getTime().toString(),
  //   };
  //   db.modules.push(newModule);
  //   res.send(newModule);
  // });

  app.get("/api/courses/:cid/modules", async (req, res) => {
    const { cid } = req.params;
    // try {
    const modules = await dao.findAllModules();
    // console.log(modules);
    const filteredModules = modules.filter((m) => m.course === cid);
    // console.log(filteredModules);
    res.json(filteredModules);
    // } catch (error) {
    //   res.status(500).json("Internal Server Error");
    // }
  });
  // app.get("/api/courses/:cid/modules", (req, res) => {
  //   const { cid } = req.params;
  //   const modules = db.modules.filter((m) => m.course === cid);
  //   res.send(modules);
  // });
}
export default ModuleRoutes;
