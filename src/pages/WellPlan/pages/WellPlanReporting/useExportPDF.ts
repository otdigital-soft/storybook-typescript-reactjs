import { useCallback, useEffect, useRef, useState } from 'react';
import { generatePath } from 'react-router-dom';
import routes from 'routes';
import { notification } from 'antd';
import Logger from 'utils/logger';
import { GENERATED_REPORT_EVENT_NAME } from 'pages/WellPlan/consts';

const createIframe = (wellPlanId: number) => {
  document.querySelectorAll('.report-export').forEach((e) => e.remove());
  const iframe = document.createElement('iframe');
  iframe.width = '0';
  iframe.height = '0';
  iframe.className = 'report-export';
  iframe.src = generatePath(routes.wellPlaneReport, {
    wellPlanId: String(wellPlanId),
  });
  document.body.appendChild(iframe);

  return iframe;
};

const useExportPDF = (wellPlanId: number) => {
  const [isExportingPDF, setIsExportingPDF] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>();
  const handleGeneratedReportEvent: EventListenerOrEventListenerObject =
    useCallback(async () => {
      try {
        const { default: html2canvas } = await import('html2canvas');
        if (!iframeRef.current?.contentWindow) {
          Logger.error(
            `Unable to generate PDF report for WellPlanner(id=${wellPlanId}). Missing iframe`,
          );
          notification.error({
            message: 'Unable to export PDF',
          });
          return;
        }
        const reportCanvas = await html2canvas(
          iframeRef.current.contentWindow.document.body,
        );
        const reportImgData = reportCanvas.toDataURL('image/png');
        const { default: jsPDF } = await import('jspdf');
        const exportPDF = new jsPDF('landscape', 'mm', 'a4');
        const aspectRatio = reportCanvas.height / reportCanvas.width;
        const width = exportPDF.internal.pageSize.getWidth();
        const height = width * aspectRatio;

        exportPDF.addImage(reportImgData, 'jpeg', 0, 0, width, height);
        exportPDF.save('well-report.pdf');
        iframeRef.current.remove();
      } finally {
        setIsExportingPDF(false);
      }
    }, [wellPlanId]);

  useEffect(() => {
    window.document.addEventListener(
      GENERATED_REPORT_EVENT_NAME,
      handleGeneratedReportEvent,
      false,
    );
    return () => {
      window.document.removeEventListener(
        GENERATED_REPORT_EVENT_NAME,
        handleGeneratedReportEvent,
      );
    };
  }, [handleGeneratedReportEvent]);

  const onExportPDF = useCallback(async () => {
    iframeRef.current = createIframe(wellPlanId);
    setIsExportingPDF(true);
  }, [wellPlanId]);

  return {
    onExportPDF,
    isExportingPDF,
  };
};

export default useExportPDF;
