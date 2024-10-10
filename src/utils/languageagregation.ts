export const aggregateLanguageData = (data: any) => {
  const aggregated: { [key: string]: number } = {};

  data.forEach((item: any) => {
    const { label, value } = item;

    if (!aggregated[label]) {
      aggregated[label] = 0;
    }

    aggregated[label] += value;
  });

  return Object.entries(aggregated)
    .map(([label, value], index) => ({ id: index, label, value }))
    .sort((a, b) => b.value - a.value);
};