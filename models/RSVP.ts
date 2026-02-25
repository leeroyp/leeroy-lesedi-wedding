import mongoose, { Schema, Model } from 'mongoose';

export interface IRSVP {
  _id?: string;
  guestName: string;
  hasPlusOne: boolean;
  plusOneName?: string;
  email?: string;
  message?: string;
  attending: boolean;
  createdAt?: Date;
}

const RSVPSchema = new Schema<IRSVP>({
  guestName: {
    type: String,
    required: true,
    trim: true,
  },
  hasPlusOne: {
    type: Boolean,
    default: false,
  },
  plusOneName: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
  },
  message: {
    type: String,
    trim: true,
  },
  attending: {
    type: Boolean,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const RSVP: Model<IRSVP> = mongoose.models.RSVP || mongoose.model<IRSVP>('RSVP', RSVPSchema);
