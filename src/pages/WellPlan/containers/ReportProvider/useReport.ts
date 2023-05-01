import { useContext } from 'react';
import { ReportProviderContext } from './ReportProvider';

const useReport = () => {
  const context = useContext(ReportProviderContext);

  if (context === null) {
    throw new Error('useReport cannot be used outside ReportProvider');
  }
  return context;
};

export default useReport;
