import mockData from "./mockData.json";
import { ContactsResponseType } from "./types";

let cursor = -1;
const size = 10;

function delay(time: number): Promise<void> {
  return new Promise((resolve) => setTimeout(() => resolve(), time));
}

export async function apiData(): Promise<ContactsResponseType> {
  await delay(1000);
  if (Math.random() > 0.7) {
    throw new Error("Something went wrong");
  }
  cursor += 1;
  const start = cursor * size;
  const end = cursor * size + size;
  const totalPages = Math.ceil(mockData.length / size);
  const currentPage = cursor + 1;
  const hasNextPage = currentPage < totalPages;
  return {
    contactsList: mockData.slice(start, end),
    hasNextPage
  };
}
