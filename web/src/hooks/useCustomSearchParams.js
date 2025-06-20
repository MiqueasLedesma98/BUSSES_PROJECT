import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

/**
 * Custom React hook that manages URL search parameters, ensuring that specified initial parameters
 * are present in the URL. If any initial parameter is missing, it updates the URL to include them.
 *
 * @param {Object.<string, string|number|boolean>} initialParams - An object representing the initial search parameters to ensure in the URL.
 * @returns {[URLSearchParams, function]} An array containing the current URLSearchParams object and a function to update the search parameters.
 */
export const useCustomSearchParams = (initialParams) => {
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const shouldUpdate = Object.entries(initialParams).some(
      ([key, _]) => !searchParams.has(key)
    );

    if (shouldUpdate) {
      const newParams = new URLSearchParams(searchParams);
      Object.entries(initialParams).forEach(([key, value]) => {
        if (!newParams.has(key)) {
          newParams.set(key, value.toString());
        }
      });
      setSearchParams(newParams, { replace: true });
    }
  }, []);

  return [searchParams, setSearchParams];
};
