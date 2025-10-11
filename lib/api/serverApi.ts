import { cookies } from "next/headers";
import { nextServer } from "./api";
import {
  CheckSessionRequest,
  OptionsAPI,
  ResponseAPI,
  User,
} from "./clientApi";
import { Note } from "@/types/note";

export const checkSession = async () => {
  const cookieStore = await cookies();
  const res = await nextServer.get<CheckSessionRequest>("/auth/session", {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return res;
};

export const getMe = async () => {
  const cookieStore = await cookies();
  const { data } = await nextServer.get<User>("/auth/me", {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return data;
};

export const fetchNotes = async (
  searchWord: string,
  page: number,
  tag?: string
) => {
  const cookieStore = await cookies();
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
    headers: {
      Cookie: cookieStore.toString(),
    },
  };

  const { data } = await nextServer.get<ResponseAPI>("/notes", options);
  return data;
};

export const fetchNoteById = async (id: string) => {
  const cookieStore = await cookies();
  const { data } = await nextServer.get<Note>(`/notes/${id}`, {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return data;
};
