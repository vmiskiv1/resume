export const getChartProps = (width: number) => {
  const isSmallScreen = width < 768;
  return {
    legendProps: { hidden: isSmallScreen },
    chartDimensions: isSmallScreen
      ? { width: 420, height: 150 }
      : { width: 600, height: 200 },
  };
};
