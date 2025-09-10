import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { DivisionService } from "./division.service";

// create division
const createDivision = catchAsync(async (req: Request, res: Response) => {

  const result = await DivisionService.createDivision(req.body);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Division created",
    data: result,
  });
});

// get all divisions
const getAllDivisions = catchAsync(async (req: Request, res: Response) => {
  const query = req.query 
  const result = await DivisionService.getAllDivisions(query as Record<string, string>);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Division retrieved",
    data: result.data,
    meta: result.meta,
  });
});

// get single division
const getSingleDivision = catchAsync(async (req: Request, res: Response) => {
  const slug = req.params.slug;
  const result = await DivisionService.getSingleDivision(slug);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Division retrieved",
    data: result.data,
  });
});

// update division
const updateDivision = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await DivisionService.updateDivision(id, req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Division updated",
    data: result,
  });
});

// delete division
const deleteDivision = catchAsync(async (req: Request, res: Response) => {
  const result = await DivisionService.deleteDivision(req.params.id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Division delete",
    data: result,
  });
});

export const DivisionController = {
  createDivision,
  getAllDivisions,
  getSingleDivision,
  updateDivision,
  deleteDivision,
};
