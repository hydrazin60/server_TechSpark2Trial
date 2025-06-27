import mongoose, { Document, Schema } from "mongoose";
export type BookingStatus = "pending" | "approved" | "rejected" | "cancelled";
export interface IBooking extends Document {
  room: mongoose.Types.ObjectId; // The room being booked
  user: mongoose.Types.ObjectId; // The tenant who booked
  landlord: mongoose.Types.ObjectId; // The owner of the room
  status: BookingStatus; // Booking status
  checkInDate: Date; // When tenant wants to check in
  checkOutDate: Date; // When tenant will check out
  totalGuests: number; // Number of people
  specialRequest?: string; // Optional special instructions
  createdAt: Date;
  updatedAt: Date;
}

const BookingSchema = new Schema<IBooking>(
  {
    room: {
      type: Schema.Types.ObjectId,
      ref: "Room",
      required: true,
      index: true, // faster queries on room bookings
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    landlord: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected", "cancelled"],
      default: "pending",
      index: true, // faster filtering by status
    },
    checkInDate: {
      type: Date,
      required: true,
    },
    checkOutDate: {
      type: Date,
      required: true,
    },
    totalGuests: {
      type: Number,
      default: 1,
      min: 1,
      max: 20,
    },
    specialRequest: {
      type: String,
      maxlength: 1000,
    },
  },
  {
    timestamps: true, // auto-manage createdAt and updatedAt
  }
);

export const Booking = mongoose.model<IBooking>("Booking", BookingSchema);
