import { useContext } from 'react';
import { ChartZoomContext } from 'pages/WellPlan/containers/ChartZoomProvider';

const useChartZoom = () => {
  const context = useContext(ChartZoomContext);

  if (context === null) {
    throw new Error('useChartZoom cannot be used outside ChartZoomProvider');
  }
  return context;
};

export default useChartZoom;
