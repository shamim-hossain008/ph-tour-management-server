import { IDivision } from "./division.interface";
import { Division } from "./division.model";

// create division
const createDivision = async (payload: IDivision) => {
  const existingDivision = await Division.findOne({ name: payload.name });

  if (existingDivision) {
    throw new Error("A division with this name already exists.");
  }

  const division = await Division.create(payload);

  return division;
};

// const get All Division
const getAllDivisions = async () => {
  const divisions = await Division.find({});
  const totalDivisions = await Division.countDocuments();

  return {
    data: divisions,
    meta: {
      total: totalDivisions,
    },
  };
};

// get single
const getSingleDivision = async (slug: string) => {
  const division = await Division.findOne({ slug });

  return {
    data: division,
  };
};

// Update division
const updateDivision = async (id: string, payload: Partial<IDivision>) => {
  const existingDivision = await Division.findById(id);

  if (!existingDivision) {
    throw new Error("Division not found.");
  }

  const duplicateDivision = await Division.findOne({
    name: payload.name,
    _id: { $ne: id },
  });
  if (duplicateDivision) {
    throw new Error("A division with this name already exists");
  }

  const updateDivision = await Division.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  return updateDivision;
};

// delete division
const deleteDivision = async (id: string) => {
  await Division.findByIdAndDelete(id);

  return null;
};

export const DivisionService = {
  createDivision,
  getAllDivisions,
  getSingleDivision,
  updateDivision,
  deleteDivision,
};
