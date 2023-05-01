import { Chart, ChartConfiguration } from 'chart.js';
import { useCallback, useState } from 'react';
import { ChartJSOrUndefined } from 'react-chartjs-2/dist/types';
import { useTheme } from 'styled-components';

const DEFAULT_WIDTH = 1000;
const DEFAULT_HEIGHT = 540;
const LEFT_PADDING = 5;

async function exportChartsToPDF(
  charts: { title: string; chartJS: ChartJSOrUndefined }[],
  fileName: string,
  textColor: string,
) {
  if (!charts.length) {
    throw new Error('Empty chart list');
  }

  const exportContainer = document.getElementById('chart-export');
  if (!exportContainer) {
    throw new Error("chart export container doesn't exist");
  }
  const exportWrapper = document.createElement('div');
  exportWrapper.style.width = `${DEFAULT_WIDTH}px`;
  exportWrapper.style.height = `${DEFAULT_HEIGHT}px`;
  const exportCanvas = document.createElement('canvas');
  exportWrapper.appendChild(exportCanvas);
  exportContainer?.appendChild(exportWrapper);

  const { default: jsPDF } = await import('jspdf');

  const exportPDF = new jsPDF('landscape', 'mm', 'a4');
  exportPDF.setFontSize(14);
  exportPDF.setTextColor(textColor);

  const aspectRatio = exportCanvas.height / exportCanvas.width;
  const width = exportPDF.internal.pageSize.width - 2 * LEFT_PADDING;
  const height = width * aspectRatio;

  let page = 1;
  for (const chart of charts) {
    if (chart.chartJS === undefined) {
      throw new Error('Undefined chart');
    }
    exportPDF.text(chart.title, 5, 10);
    const { type, options, plugins, data } = chart.chartJS
      .config as ChartConfiguration;
    const tempChart = new Chart(exportCanvas, {
      type,
      options: { ...options, animation: false, devicePixelRatio: 2 },
      plugins,
      data,
    });
    const chartImg = exportCanvas.toDataURL('jpeg', 1);
    exportPDF.addImage(chartImg, 'jpeg', LEFT_PADDING, 20, width, height);
    tempChart.clear();
    tempChart.destroy();
    if (page < charts.length) {
      exportPDF.addPage();
      page += 1;
    }
  }
  exportPDF.save(`${fileName}.pdf`);
  exportContainer?.removeChild(exportWrapper);
}

const useExportCharts = ({
  fileName,
  onError,
}: {
  fileName: string;
  onError?: (error: Error) => void;
}) => {
  const { colors } = useTheme();
  const [isExportingCharts, setIsExportingCharts] = useState(false);

  const exportCharts = useCallback(
    async (charts: { title: string; chartJS: ChartJSOrUndefined }[]) => {
      try {
        setIsExportingCharts(true);
        await exportChartsToPDF(charts, fileName, colors.gray[9]);
      } catch (e) {
        if (onError) {
          onError(e as Error);
        }
      } finally {
        setIsExportingCharts(false);
      }
    },
    [colors, fileName, onError],
  );

  return {
    exportCharts,
    isExportingCharts,
  };
};

export default useExportCharts;
