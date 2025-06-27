import mongoose, { Document, Schema } from "mongoose";

export interface IRoom extends Document {
  title: string;
  description?: string;
  roomType: "single" | "double" | "single_with_kitchen" | "hostel" | "hotel" | "home";
  floor?: number;
  areaInSqFt?: number;
  pricePerMonth: number;
  waterBillIncluded: boolean;
  electricityBillIncluded: boolean;
  wifiAvailable: boolean;
  furnished: boolean;
  availableFrom?: Date;
  images: string[];
  location: {
    district: string;
    municipality?: string;
    city?: string;
    tole?: string;
    nearFamousPlace?: string;
    province?: string;
    country?: string;
    zip?: string;
    coordinates?: [number, number]; // [longitude, latitude]
  };
  amenities: string[];
  postedBy: mongoose.Types.ObjectId; // User reference
  createdAt: Date;
  updatedAt: Date;
}

const RoomSchema: Schema<IRoom> = new Schema<IRoom>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      maxlength: 2000,
    },
    roomType: {
      type: String,
      enum: ["single", "double", "single_with_kitchen", "hostel", "hotel", "home"],
      required: true,
    },
    floor: {
      type: Number,
      min: 0,
    },
    areaInSqFt: {
      type: Number,
      min: 0,
    },
    pricePerMonth: {
      type: Number,
      required: true,
      min: 0,
    },
    waterBillIncluded: {
      type: Boolean,
      default: false,
    },
    electricityBillIncluded: {
      type: Boolean,
      default: false,
    },
    wifiAvailable: {
      type: Boolean,
      default: false,
    },
    furnished: {
      type: Boolean,
      default: false,
    },
    availableFrom: {
      type: Date,
    },
    images: [
      {
        type: String, // URL
      },
    ],
    location: {
      district: { type: String, required: true },
      municipality: String,
      city: String,
      tole: String,
      nearFamousPlace: String,
      province: String,
      country: { type: String, default: "Nepal" },
      zip: String,
      coordinates: {
        type: [Number],
        index: "2dsphere",
      },
    },
    amenities: [
      {
        type: String,
        enum: [
          "parking",
          "balcony",
          "attached_bathroom",
          "shared_bathroom",
          "cctv",
          "security_guard",
          "water_filter",
          "geyser",
          "air_conditioning",
        ],
      },
    ],
    postedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" },
  }
);

export const Room = mongoose.model<IRoom>("Room", RoomSchema);
