import { renderHook } from '@testing-library/react-hooks';
import * as api from 'src/api';
import { ContactsResponseType } from 'src/types';
import mockData from "src/mockData.json";
import useFetchContacts from './useFetchContacts';

// Mocks
const contactsList = mockData.slice(0,10);

const fetchContactsSpy = jest.spyOn(api, "apiData");
const fetchContactsWithSucess = () => Promise.resolve({ hasNextPage: true, contactsList }) as Promise<ContactsResponseType>;
const fetchContactsWithError = () => Promise.reject(new Error("Something went wrong"));

describe("useFetchContacts", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it("should fetch contacts", async () => {
    fetchContactsSpy.mockImplementation(fetchContactsWithSucess);
    const { result } = renderHook(() => useFetchContacts(1));
    expect(result.current.loading).toBe(true);
    await expect(fetchContactsSpy).toHaveBeenCalled();
    await expect(result.current.contactsList).toEqual(contactsList);
    expect(result.current.hasNextPage).toBe(true);
    expect(result.current.error).toBe(false);
    expect(result.current.loading).toBe(false);
  });
  it("should fetch contacts, and return error", async () => {
    fetchContactsSpy.mockImplementation(fetchContactsWithError);
    const { result } = renderHook(() => useFetchContacts(1));
    await expect(fetchContactsSpy).toHaveBeenCalled();
    expect(result.current.error).toBe(true);

  });
})