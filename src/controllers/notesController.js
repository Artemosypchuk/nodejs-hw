import { Note } from '../models/note.js';
import createHttpError from 'http-errors';

export const getNotes = async (req, res) => {
  const notes = await Note.find();
  res.status(200).json(notes);
};

export const getNotesById = async (req, res) => {
  const { noteId } = req.params;
  const note = await Note.findOne({ _id: noteId });
  if (!note) {
    throw createHttpError(404, 'Note not found');
  }
  res.status(200).json(note);
};

export const createNote = async (req, res) => {
  console.log(req.body);
  const note = await Note.create(req.body);
  res.status(201).json(note);
};

export const deleteNote = async (req, res) => {
  const { noteId } = req.params;
  const note = await Note.findByIdAndDelete({ _id: noteId });
  if (!note) {
    throw createHttpError(404, 'Note not found');
  }
  res.status(200).json(note);
};

export const updateNote = async (req, res) => {
  const { noteId } = req.params;
  console.log('Шукаємо ID:', noteId);
  console.log('Тіло запиту:', req.body);
  const note = await Note.findOneAndUpdate({ _id: noteId }, req.body, {
    returnDocument: 'after',
  });
  console.log('Знайдена нотатка:', note);
  if (!note) {
    throw createHttpError(404, 'Note not found');
  }
  res.status(200).json({
    status: 200,
    message: 'Successfully updated a note!',
    data: note,
  });
};
