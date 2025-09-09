import { BOOKING_STATUS } from "../booking/booking.interface";
import { Booking } from "../booking/booking.model";
import { PAYMENT_STATUS } from "./payment.interface";
import { Payment } from "./payment.model";

const successPayment = async (query: Record<string, string>) => {
  //  update Booking status to confirm
  // update  payment status to PAID

  const session = await Booking.startSession();
  session.startTransaction();

  try {
    const updatedPayment = await Payment.findOneAndUpdate(
      { transactionId: query.transactionId },
      {
        status: PAYMENT_STATUS.PAID,
      },
      { new: true, runValidators: true, session: session }
    );

    await Booking.findByIdAndUpdate(
      updatedPayment?.booking,
      { status: BOOKING_STATUS.COMPLETE },
      { new: true, runValidators: true, session }
    )
      .populate("user", " name email phone address")
      .populate("tour", "title costFrom")
      .populate("payment");

    await session.commitTransaction();
    session.endSession();

    return {
      success: true,
      message: "Payment Completed Successfully",
    };
  } catch (error) {
    console.log(error);
  }
};
const failPayment = async () => {
  // Update Booking status to FAIL
  // Update Payment status to Fail
};

const cancelPayment = async () => {
  // Update Booking status to cancel
  // update Payment to cancel
};

export const PaymentService = {
  successPayment,
  failPayment,
  cancelPayment,
};
