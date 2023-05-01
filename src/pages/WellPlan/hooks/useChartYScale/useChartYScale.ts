import { useContext } from 'react';
import { ChartYScaleContext } from 'pages/WellPlan/containers/ChartYScaleProvider';

const useChartYScale = () => {
  const context = useContext(ChartYScaleContext);

  if (context === null) {
    throw new Error(
      'useChartYScale cannot be used outside ChartYScaleProvider',
    );
  }
  return context;
};

export default useChartYScale;
