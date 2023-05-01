import { Button } from 'antd';
import { SubmitRow } from 'components/Row';
import useStudyReport from 'pages/Study/useStudyReport';

const StudyActions = () => {
  const { makeReport, canMakeReport, isMakingReport } = useStudyReport();
  return (
    <SubmitRow>
      <Button
        type="primary"
        onClick={makeReport}
        disabled={isMakingReport || !canMakeReport}
      >
        Make report
      </Button>
    </SubmitRow>
  );
};

export default StudyActions;
