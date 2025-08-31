import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { TourService } from "./tour.service";

// create tour
const createTour = catchAsync(async (req: Request, res: Response) => {
  const result = await TourService.createTour(req.body);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Tour create successfully",
    data: result,
  });
});

// get all tours
const getAllTours = catchAsync(async (req: Request, res: Response) => {
  const query = req.query;
  const result = await TourService.getAllTours(query as Record<string, string>);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Tours retrieved successfully",
    data: result.data,
    meta: result.meta,
  });
});

// update Tour
const updateTour = catchAsync(async (req: Request, res: Response) => {
  const result = await TourService.updateTour(req.params.id, req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Tour updated successfully",
    data: result,
  });
});

// delete Tour
const deleteTour = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await TourService.deleteTour(id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Tour deleted successfully",
    data: result,
  });
});

export const TourController = {
  createTour,
  getAllTours,
  updateTour,
  deleteTour,
};
