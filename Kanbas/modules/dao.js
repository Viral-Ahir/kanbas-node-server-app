import model from "./model.js";

export const createModule = async (module) => {
  delete module._id;
  return await model.create(module);
};

export const findAllModules = async () => {
  // console.log(model.find());
  return await model.find();
};

export const findModuleById = async (id) => {
  return await model.findById(id);
};

export const updateModule = async (id, module) => {
  return await model.updateOne({ _id: id }, { $set: module });
};

export const deleteModule = async (id) => {
  return await model.deleteOne({ _id: id });
};
