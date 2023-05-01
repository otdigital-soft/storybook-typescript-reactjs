import { useContext } from 'react';
import { WellPlanCO2ChartFiltersContext } from './WellReportCO2ChartFiltersProvider';

const useWellReportCO2ChartFilters = () => {
  const context = useContext(WellPlanCO2ChartFiltersContext);

  if (context === null) {
    throw new Error(
      'useWellPlanCO2ChartFilters cannot be used outside WellPlanCO2ChartFiltersProvider',
    );
  }
  return context;
};

export default useWellReportCO2ChartFilters;
