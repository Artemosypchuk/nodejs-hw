import { Schema, model } from 'mongoose';

const noteSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      default: '',
      trim: true,
    },
    tag: {
      type: String,
      enum: [
        'Work',
        'Todo',
        'Travel',
        'Shopping',
        'Meeting',
        'Ideas',
        'Important',
        'Personal',
        'Finance',
        'Health',
      ],
      default: 'Todo',
    },
  },
  {
    timestamps: true,
  }
);

export const Note = model('note', noteSchema);
