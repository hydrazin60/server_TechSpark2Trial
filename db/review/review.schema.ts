import mongoose, { Document, Schema } from "mongoose";

export interface IRoomReview extends Document {
  room: mongoose.Types.ObjectId;       // Reference to the Room being reviewed
  reviewer: mongoose.Types.ObjectId;   // Reference to the User who wrote the review
  rating: number;                      // Integer rating from 1 to 5
  comment?: string;                    // Optional textual feedback
  reviewDate: Date;                    // Date when review was created
}

const RoomReviewSchema = new Schema<IRoomReview>(
  {
    room: {
      type: Schema.Types.ObjectId,
      ref: "Room",
      required: true,
      index: true,
    },
    reviewer: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
      validate: {
        validator: Number.isInteger,
        message: "{VALUE} is not an integer value",
      },
    },
    comment: {
      type: String,
      trim: true,
      maxlength: 2000,
    },
    reviewDate: {
      type: Date,
      default: () => new Date(),
      immutable: true,
    },
  },
  {
    timestamps: false,
  }
);

export const RoomReview = mongoose.model<IRoomReview>("RoomReview", RoomReviewSchema);
