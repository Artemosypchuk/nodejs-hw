import { Schema, model } from 'mongoose';

const noteSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      default: '',
    },
    tag: {
      type: String,
      enum: [
        'Work',
        'Travel',
        'Shopping',
        'Meeting',
        'Ideas',
        'Important',
        'Personal',
        'Finance',
        'Heals',
      ],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Note = model('note', noteSchema);
