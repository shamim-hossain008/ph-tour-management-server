import express from "express";
import { checkAuth } from "../../middlewares/checkAuth";
import { validateRequest } from "../../middlewares/validateRequest";
import { Role } from "../user/user.interface";
import { BookingController } from "./booking.controller";
import {
  createBookingZodSchema,
  updatedBookingStatusZodSchema,
} from "./booking.validation";

const router = express.Router();

// api/v1/booking
router.post(
  "/",
  checkAuth(...Object.values(Role)),
  validateRequest(createBookingZodSchema),
  BookingController.createBooking
);

// api/v1/booking
router.get(
  "/",
  checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
  BookingController.getAllBookings
);

// api/v1/booking/my-booking
router.get(
  "/my-bookings",
  checkAuth(...Object.values(Role)),
  BookingController.getUserBookings
);

// api/v1/booking/bookingId
router.get(
  "/:bookingId",
  checkAuth(...Object.values(Role)),
  BookingController.getSingleBooking
);

//  router/v1/bookingId/status
router.patch(
  "/:bookingId/status",
  checkAuth(...Object.values(Role)),
  validateRequest(updatedBookingStatusZodSchema),
  BookingController.updateBookingStatus
);

//

export const BookingRoutes = router;
