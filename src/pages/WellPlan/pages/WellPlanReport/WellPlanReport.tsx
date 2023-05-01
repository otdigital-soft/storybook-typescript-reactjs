import Box from 'components/Box';
import WellReportSummary from '../WellPlanReporting/WellReportSummary';
import ChartYScaleProvider from 'pages/WellPlan/containers/ChartYScaleProvider';
import WellReportCO2ChartFiltersProvider from '../WellPlanReporting/WellReportCO2ChartFiltersProvider';
import WellReportCO2 from '../WellPlanReporting/WellReportCO2';
import useWellPlanReport from './useWellPlanReport';
import ReportProvider from 'pages/WellPlan/containers/ReportProvider';
import { useEffect } from 'react';

const WellPlanReport = () => {
  const { isLoading, error } = useWellPlanReport();
  useEffect(() => {
    // for some reason html2canvas is rendering noscript text on Chrome so I remove it
    const noscript = document.getElementsByTagName('noscript')[0];
    noscript?.parentNode?.removeChild(noscript);
  }, []);
  if (isLoading || error) {
    return null;
  }

  return (
    <Box width={1754} height={1240} padding={20}>
      <ReportProvider dispatchEvents>
        <Box>
          <WellReportSummary />

          <Box
            height={1}
            backgroundColor="gray.6"
            marginTop={27}
            marginBottom={31}
          />

          <ChartYScaleProvider>
            <WellReportCO2ChartFiltersProvider>
              <WellReportCO2 />
            </WellReportCO2ChartFiltersProvider>
          </ChartYScaleProvider>
        </Box>
      </ReportProvider>
    </Box>
  );
};

export default WellPlanReport;
