import { useState, useEffect, useCallback } from "react";
import { PersonInfoType } from "src/types";
import { apiData } from "src/api";

function useFetchContacts(page: number) {
  const [contactsList, setContactsList] = useState<PersonInfoType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [hasNextPage, setHasNextPage] = useState<boolean>(true);
 

  const fetchContacts = useCallback(async () => {
    try {
      setLoading(true);
      setError(false);
      const response = await apiData();
      const contactsData = response.contactsList;
      await setContactsList((prev) => [...prev, ...contactsData]);
      setHasNextPage(response.hasNextPage);
      setLoading(false);
    } catch {
      setLoading(false);
      setError(true);
    }
  }, []);

  useEffect(() => {
    fetchContacts();
  }, [fetchContacts, page]);

  return { loading, error, contactsList, hasNextPage };
}

export default useFetchContacts;