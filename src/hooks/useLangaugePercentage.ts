import { aggregateLanguageData } from "@utils/languageagregation";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

export const useLanguagePercentage = (repos: any[]) => {
  const dispatch = useDispatch();
  const [languageData, setLanguageData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const aggregatedData = [];

      for (const repo of repos) {
        try {
          // const data = await dispatch(getUserLanguagePercentage(repo)).unwrap();

          const data: any[] = [];

          aggregatedData.push(...data);
        } catch (error) {
          console.error("Error fetching language data:", error);
        }
      }

      const aggregatedLanguages = aggregateLanguageData(aggregatedData);
      setLanguageData(aggregatedLanguages);
    };

    fetchData();
  }, [repos, dispatch]);

  return languageData;
};
