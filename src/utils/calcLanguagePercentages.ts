export const calculateLanguagePercentages = (
  totalLanguages: { [key: string]: number },
  totalBytes: number,
  limit: number
) => {
  const sortedData = Object.entries(totalLanguages)
    .map(([language, bytes], index) => ({
      id: index,
      value: parseFloat(((bytes / totalBytes) * 100).toFixed(2)),
      label: language,
    }))
    .sort((a, b) => b.value - a.value);

  const mainLanguages = sortedData.slice(0, limit);
  const mainLanguagesSum = mainLanguages.reduce(
    (sum, { value }) => sum + value,
    0
  );
  const othersLanguagesPercentage = (100 - mainLanguagesSum).toFixed(2);

  console.log(mainLanguages);

  if (Number(othersLanguagesPercentage) > 0 && mainLanguages.length) {
    mainLanguages.push({
      id: mainLanguages.length,
      value: parseFloat(othersLanguagesPercentage),
      label: "Others",
    });
  }

  return mainLanguages;
};
