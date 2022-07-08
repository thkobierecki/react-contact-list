import { useState, useEffect, useCallback } from "react";
import { PersonInfoType } from "src/types";
import apiData from "src/api";

function useFetch(page: number) {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [list, setList] = useState<PersonInfoType[]>([]);

  const sendQuery = useCallback(async () => {
    try {
      await setLoading(true);
      await setError(false);
      const responseData = await apiData();
      await setList((prev) => [...prev, ...responseData]);
      setLoading(false);
    } catch (err) {
      setLoading(false);
       //@ts-ignore
      setError(err);
    }
  }, []);

  useEffect(() => {
    sendQuery();
  }, [sendQuery, page]);

  return { loading, error, list };
}

export default useFetch;