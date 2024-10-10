export const getChartProps = (width: number) => {
  const isSmallScreen = width < 576;
  return {
    legendProps: { hidden: isSmallScreen },
    chartDimensions: isSmallScreen
      ? { width: 300, height: 150 }
      : { width: 650, height: 200 },
  };
};
