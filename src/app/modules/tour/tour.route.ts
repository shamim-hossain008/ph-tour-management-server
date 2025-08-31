import { Router } from "express";
import { checkAuth } from "../../middlewares/checkAuth";
import { validateRequest } from "../../middlewares/validateRequest";
import { Role } from "../user/user.interface";
import { TourController } from "./tour.controller";
import {
  createTourTypeZodSchema,
  updateTourZodSchema,
} from "./tour.validation";

const router = Router();

/****---------Tour routes-----****/

router.post(
  "/create",
  checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
  validateRequest(createTourTypeZodSchema),
  TourController.createTour
);
router.get("/", TourController.getAllTours);

router.patch(
  "/:id",
  checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
  validateRequest(updateTourZodSchema),
  TourController.updateTour
);

router.delete(
  "/:id",
  checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
  TourController.deleteTour
);

export const DivisionRoutes = router;
