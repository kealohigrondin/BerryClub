import { useState, useEffect } from "react";
/**
 *
 * @param {axiosInstance: Object, method: String, url: String, requestConfig: Object} configuration
 */
const useAxios = ({ axiosInstance, method, url, requestConfig = {} }) => {
  const [response, setResponse] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    const fetchData = async () => {
      try {
        const res = await axiosInstance[method.toLowerCase()](url, {
          ...requestConfig,
          signal: controller.signal,
        });
        console.log(res);
        setResponse(res);
      } catch (err) {
        console.log(err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
    //useEffect cleanup to avoid memory leak
    return () => controller.abort();
  }, []);

  return [response, error, loading];
};
export default useAxios;
