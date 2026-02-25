import mongoose, { Schema, Model } from 'mongoose';

export interface IGuest {
  _id?: string;
  firstName: string;
  lastName: string;
  email?: string;
  isAuthenticated?: boolean;
  createdAt?: Date;
}

const GuestSchema = new Schema<IGuest>({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
  },
  isAuthenticated: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create index for faster lookups
GuestSchema.index({ firstName: 1, lastName: 1 });
GuestSchema.index({ email: 1 });

export const Guest: Model<IGuest> = mongoose.models.Guest || mongoose.model<IGuest>('Guest', GuestSchema);
