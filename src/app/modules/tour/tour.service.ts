import { QueryBuilder } from "../../utils/QueryBuilder";
import { tourSearchableField } from "./tour.constant";
import { ITour } from "./tour.interface";
import { Tour } from "./tour.model";

// create tour
const createTour = async (payload: ITour) => {
  const existingTour = await Tour.findOne({ title: payload.title });
  if (existingTour) {
    throw new Error("A tour with this title already.");
  }

  const tour = await Tour.create(payload);

  return tour;
};

// get all tours
const getAllTours = async (query: Record<string, string>) => {
  const queryBuilder = new QueryBuilder(Tour.find(), query);

  const tours = await queryBuilder
    .search(tourSearchableField)
    .filter()
    .sort()
    .fields()
    .paginate();

  const [data, meta] = await Promise.all([
    tours.build(),
    queryBuilder.getMeta(),
  ]);

  return {
    data,
    meta,
  };
};

// Update tour
const updateTour = async (id: string, payload: Partial<ITour>) => {
  const existingTour = await Tour.findById(id);

  if (!existingTour) {
    throw new Error("Tour not found");
  }

  const updateTour = await Tour.findByIdAndUpdate(id, payload, { new: true });

  return updateTour;
};

// delete tour
const deleteTour = async (id: string) => {
  return await Tour.findByIdAndDelete(id);
};

export const TourService = {
  createTour,
  getAllTours,
  updateTour,
  deleteTour,
};
