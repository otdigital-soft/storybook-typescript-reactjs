import { notification } from 'antd';
import { StudyElementList } from 'api/schema';
import useDynamicRefs from 'hooks/useDynamicRefs';
import useExportCharts from 'hooks/useExportCharts';
import { createContext, RefObject, useCallback } from 'react';
import { ChartJSOrUndefined } from 'react-chartjs-2/dist/types';
import Logger from 'utils/logger';

type StudyReportContextType<T> = {
  makeReport: () => void;
  getChartRef: (key: string) => RefObject<T> | undefined;
  setChartRef: (key: string) => RefObject<T>;
  isMakingReport: boolean;
  canMakeReport: boolean;
};

export const StudyReportContext = createContext<StudyReportContextType<
  ChartJSOrUndefined<'bar'>
> | null>(null);

interface StudyReportProviderProps {
  children: JSX.Element;
  projectName: string;
  elements: StudyElementList[];
}

const StudyReportProvider = ({
  children,
  projectName,
  elements,
}: StudyReportProviderProps) => {
  const onError = useCallback((e: Error) => {
    Logger.error('Unable to generate a report', e);
    notification.error({
      message: 'Report cannot be generated right now',
    });
    return;
  }, []);
  const { exportCharts, isExportingCharts: isMakingReport } = useExportCharts({
    fileName: `Benchmark for ${projectName}`,
    onError,
  });
  const { getRef: getChartRef, setRef: setChartRef } =
    useDynamicRefs<ChartJSOrUndefined<'bar'>>();
  const makeReport = () => {
    const charts = elements
      .map((element) => ({
        title: element.title,
        chartJS: getChartRef(String(element.id))?.current,
      }))
      .filter((element) => element.chartJS !== null);
    exportCharts(charts as { title: string; chartJS: ChartJSOrUndefined }[]);
  };
  const values = {
    makeReport,
    canMakeReport: !!elements.length,
    isMakingReport,
    getChartRef,
    setChartRef,
  };

  return (
    <StudyReportContext.Provider value={values}>
      {children}
    </StudyReportContext.Provider>
  );
};

export default StudyReportProvider;
