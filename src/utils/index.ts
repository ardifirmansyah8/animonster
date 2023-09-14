import { BOOKMARK } from "../constants";
import { Anime } from "../types";

export const ratingColor = (rating: number): string => {
  if (rating > 75) {
    return "text-green-500";
  } else if (rating < 75 && rating > 60) {
    return "text-orange-500";
  } else {
    return "text-red-500";
  }
};

export const getItem = (key: string) => {
  const item = localStorage.getItem(key);
  return item ? JSON.parse(item) : "";
};

export const setItem = (key: string, value: any) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const addBookmark = (value: Anime) => {
  const bookmarks = getItem(BOOKMARK) as Anime[];

  if (bookmarks) {
    setItem(BOOKMARK, [...bookmarks, ...[value]]);
  } else {
    setItem(BOOKMARK, [value]);
  }
};

export const removeBookmark = (id: number) => {
  const bookmarks = getItem(BOOKMARK) as Anime[];

  if (bookmarks) {
    setItem(
      BOOKMARK,
      bookmarks.filter((item) => item.id !== id)
    );
  }
};

export const isExistInBookmark = (id: number) => {
  const bookmarks = getItem(BOOKMARK) as Anime[];

  if (bookmarks) {
    const matchItem = bookmarks.find((item: Anime) => item.id === id);
    return Boolean(matchItem);
  }

  return false;
};
