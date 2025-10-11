import type { Note, NoteFormData } from "../../types/note";
import { nextServer } from "./api";

// axios.defaults.baseURL = "https://notehub-api.goit.study/api";
// axios.defaults.headers.common["Authorization"] = `Bearer ${
//   process.env.NEXT_PUBLIC_NOTEHUB_TOKEN
// }`;

export interface ResponseAPI {
  notes: Note[];
  totalPages: number;
}

export interface OptionsAPI {
  params: {
    search: string;
    tag?: string;
    page: number;
    perPage: number;
  };
  headers?: {
    Cookie: string;
  };
}

export async function fetchNotes(
  searchWord: string,
  page: number,
  tag?: string
) {
  if (tag === "All") {
    tag = undefined;
  }

  const options: OptionsAPI = {
    params: {
      search: searchWord,
      tag: tag,
      page: page,
      perPage: 12,
    },
  };

  const res = await nextServer.get<ResponseAPI>("/notes", options);
  return res.data;
}

export async function fetchNoteById(id: string) {
  const res = await nextServer.get<Note>(`/notes/${id}`);
  return res.data;
}

export async function createNote(data: NoteFormData) {
  const res = await nextServer.post<Note>("/notes", data);
  return res.data;
}

export async function deleteNote(id: string) {
  const res = await nextServer.delete<Note>(`/notes/${id}`);
  return res.data;
}

export type RegisterRequest = {
  email: string;
  password: string;
};

export type User = {
  username: string;
  email: string;
  avatar?: string;
};

export const register = async (data: RegisterRequest) => {
  const res = await nextServer.post<User>("/auth/register", data);
  return res.data;
};

export type LoginRequest = {
  email: string;
  password: string;
};

export const login = async (data: LoginRequest) => {
  const res = await nextServer.post<User>("/auth/login", data);
  return res.data;
};

export const logout = async (): Promise<void> => {
  await nextServer.post("/auth/logout");
};

export type CheckSessionRequest = {
  message: string;
};

export const checkSession = async () => {
  const res = await nextServer.get<CheckSessionRequest>("/auth/session");
  return res.data;
};

export const getMe = async () => {
  const { data } = await nextServer.get<User>("/auth/me");
  return data;
};

export type UpdateUserRequest = {
  email: string;
  username: string;
};

export const updateMe = async (payload: UpdateUserRequest) => {
  const res = await nextServer.put<User>("/auth/me", payload);
  return res.data;
};
