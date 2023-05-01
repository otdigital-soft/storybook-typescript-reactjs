import { useContext } from 'react';
import { StudyReportContext } from './StudyReportProvider';

const useStudyReport = () => {
  const context = useContext(StudyReportContext);
  if (!context) {
    throw new Error(
      'useStudyReport can not be used outside of StudyReportProvider',
    );
  }
  return context;
};

export default useStudyReport;
