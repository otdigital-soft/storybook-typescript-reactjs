import { Alert, Divider, Form } from 'antd';
import { useFormikContext } from 'formik';
import Box from 'components/Box';
import PlanInformation from './PlanInformation';
import PlanWells from './PlanWells';
import { FormValues } from './form';

interface PlanFormProps {
  children: JSX.Element;
  onClear?: () => void;
}

const PlanForm = ({ children, onClear }: PlanFormProps) => {
  const { status } = useFormikContext<FormValues>();

  return (
    <Form layout="vertical">
      {status ? (
        <Box mb="10px">
          <Alert message={status} type="error" showIcon />
        </Box>
      ) : undefined}
      <Box>
        <PlanInformation onClear={onClear} />

        <Divider />

        <Box marginTop={30}>
          <PlanWells />
        </Box>
      </Box>
      {children}
    </Form>
  );
};

export default PlanForm;
