import request from "@/api/api";
import { useEffect, useState } from "react";

const useFetch = (
  url: string,
  params: { [key: string]: any },
  refreshing?: boolean
) => {
  const [data, setData] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pageNum, setPageNum] = useState(1);

  const fetchData = async () => {
    console.log("fetching data ..................");
    setLoading(true);
    try {
      const res = await request.get("/", {
        params: {
          ...params,
          page: pageNum,
        },
      });
      setData(res.data);
      setPageNum(pageNum + 1);
    } catch (error: any) {
      console.log("api error: ", error?.message);
      setError(error?.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    console.log("initial fetching data ..................");

    fetchData();

    return () => {};
  }, [url, params?.q, params?.category]);

  return { data, loading, error, fetchData, pageNum };
};

export default useFetch;
