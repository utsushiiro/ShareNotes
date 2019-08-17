import { actionCreators } from "./actions";
import constants from "./constants";
import { PickActionType } from "../types";

export type Note = {
  id: number;
  title: string;
  content: string;
  version: number;
};

export type NotesEventType = keyof (typeof constants.eventTypes);

export type NotesEvent = {
  id: string;
  type: NotesEventType;
  createdAt: string;
};

export type NotesAction = PickActionType<typeof actionCreators>;

export type NotesState = {
  isLoading: boolean;
  note: Note | null;
  notes: Note[];
  events: NotesEvent[];
};
