import { notification } from 'antd';
import useExportCharts from 'hooks/useExportCharts';
import useTenant from 'hooks/useTenant';
import { useCallback } from 'react';

import Logger from 'utils/logger';
import { MonitorElementType } from 'api/services/monitors';

const useExportMonitorChart = ({
  type,
  monitorId,
  elementId,
  fileName,
}: {
  elementId: number;
  monitorId: number;
  fileName: string;
  type: MonitorElementType;
}) => {
  const { tenantId } = useTenant();
  const {
    exportCharts: exportMonitorChartPdf,
    isExportingCharts: isExportingMonitorChartPdf,
  } = useExportCharts({
    fileName,
    onError: useCallback((e: Error) => {
      Logger.error('Unable to export chart', e);
      notification.error({
        message: 'Chart cannot be exported right now',
      });
    }, []),
  });

  const exportMonitorChartCsv = () => {
    if (!tenantId) {
      throw new Error('Missing tenant id.');
    }

    const url = `${process.env.REACT_APP_API_BASE_URL}api/tenants/${tenantId}/monitors/${monitorId}/elements/${elementId}/?format=csv&type=${type}`;
    window.location.assign(url);
  };

  return {
    exportMonitorChartPdf,
    exportMonitorChartCsv,
    isExportingMonitorChart: isExportingMonitorChartPdf,
  };
};

export default useExportMonitorChart;
