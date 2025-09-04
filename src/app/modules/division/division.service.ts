import { QueryBuilder } from "../../utils/QueryBuilder";
import { divisionSearchableFields } from "./division.constant";
import { IDivision } from "./division.interface";
import { Division } from "./division.model";

// create division
const createDivision = async (payload: IDivision) => {
  const existingDivision = await Division.findOne({ name: payload.name });

  if (existingDivision) {
    throw new Error("A division with this name already exists.");
  }
  //  create slug

  // const baseSlug = payload.name.toLowerCase().split(" ").join("-");
  // let slug = `${baseSlug}-division`;
  // let counter = 0;
  // while (await Division.exists({ slug })) {
  //   slug = `${slug}-${counter++}`;
  // }
  // payload.slug = slug;

  const division = await Division.create(payload);

  return division;
};

// const get All Division
const getAllDivisions = async (query:Record<string, string>) => {
  const queryBuilder = new QueryBuilder(Division.find(),query)
  
  const divisionsData = queryBuilder
  .search(divisionSearchableFields)
  .filter()
  .sort()
  .fields()
  .paginate()


  const [data, meta] = await Promise.all([
    divisionsData.build(),
    queryBuilder.getMeta()
  ])
  return {
    data,
    meta
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

  // update slug
  // if (payload.name) {
  //   const baseSlug = payload.name.toLowerCase().split(" ").join("-");
  //   let slug = `${baseSlug}-division`;
  //   let counter = 0;
  //   while (await Division.exists({ slug })) {
  //     slug = `${slug}-${counter++}`;
  //   }
  //   payload.slug = slug;
  // }

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
