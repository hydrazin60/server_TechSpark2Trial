import mongoose, { Document, Schema, Types } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  phone: string;
  password: string;
  profilePicture?: string;
  bio?: string;
  userType: "tenant" | "landlord" | "admin";
  isVerified: boolean;
  forgetPasswordToken?: string;
  forgetPasswordTokenExpiry?: Date;
  lastLogin?: Date;
  isActive: boolean;
  chats: Types.ObjectId[];
  notifications: Types.ObjectId[];
  favorites: Types.ObjectId[];
  listings: Types.ObjectId[];
  rating?: number;
  reviews: Types.ObjectId[];
  CurrentAddress?: {
    district: string;
    municipality?: string;
    city?: string;
    tole?: string;
    nearFamousPlace?: string;
    country: string;
    province: string;
    zip: string;
    cordinate?: [number, number];
  };
  location?: {
    type: "Point";
    coordinates: [number, number]; // [longitude, latitude]
  };
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema: Schema<IUser> = new Schema<IUser>(
  {
    name: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address",
      ],
    },
    phone: {
      type: String,
      trim: true,
      match: [
        /^(\+977)?[ -]?\d{2,3}[ -]?\d{6,7}$/,
        "Phone number is not valid",
      ],
    },
    password: { type: String, required: true },

    profilePicture: String,
    bio: { type: String, maxlength: 500 },

    userType: {
      type: String,
      enum: ["tenant", "landlord", "admin"],
      default: "tenant",
    },
    isVerified: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },

    forgetPasswordToken: String,
    forgetPasswordTokenExpiry: Date,

    lastLogin: Date,

    chats: [{ type: Schema.Types.ObjectId, ref: "Chat" }],
    notifications: [{ type: Schema.Types.ObjectId, ref: "Notification" }],
    favorites: [{ type: Schema.Types.ObjectId, ref: "Property" }],
    listings: [{ type: Schema.Types.ObjectId, ref: "Property" }],

    rating: { type: Number, min: 0, max: 5 },
    reviews: [{ type: Schema.Types.ObjectId, ref: "Review" }],

    CurrentAddress: {
      district: String,
      municipality: String,
      city: String,
      tole: String,
      nearFamousPlace: String,
      country: { type: String, default: "Nepal" },
      province: String,
      zip: String,
      cordinate: [Number],
    },

    location: {
      type: {
        type: String,
        enum: ["Point"],
      },
      coordinates: {
        type: [Number], // [longitude, latitude]
        index: "2dsphere",
      },
    },
  },
  {
    timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" },
  }
);

export const User = mongoose.model<IUser>("User", UserSchema);
