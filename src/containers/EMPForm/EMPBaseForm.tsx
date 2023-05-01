import Box from 'components/Box';
import EMPDefinition from 'containers/EMPForm/EMPDefinition';
import Divider from 'components/Divider';
import EMPElements from './EMPElements';
import { Alert, Form } from 'antd';
import React from 'react';
import { useFormikContext } from 'formik';
import * as yup from 'yup';

export type FormElementValues = {
  id: number | null;
  concept_id: number;
  name: string;
  subarea: string;
  baseline_average: number | '';
  target_average: number | '';
  percentage_improvement: number;
};

export type FormValues = {
  name: string;
  description: string;
  start_date: Date | null;
  end_date: Date | null;
  total_rig_baseline_average: number | '';
  total_rig_target_average: number | '';
  api_description: string;
  availableElements: FormElementValues[];
  addedElements: FormElementValues[];
};

export const labels = {
  name: 'EMP name',
  description: 'EMP description',
  start_date: 'Start date',
  end_date: 'Complete date',
  total_rig_baseline_average: 'Total rig baseline average',
  total_rig_target_average: 'Total rig target average',
  api_description: 'API description',
  baseline_average: 'Baseline average MW',
  target_average: 'Target average MW',
};

export const schema = yup.object().shape({
  name: yup.string().required(`${labels.name} is required`),
  description: yup.string().required(`${labels.description} is required`),
  start_date: yup
    .date()
    .required(`${labels.start_date} is required`)
    .nullable(),
  end_date: yup
    .date()
    .min(yup.ref('start_date'), `${labels.end_date} can't be before start date`)
    .required(`${labels.end_date} is required`)
    .nullable(),
  total_rig_baseline_average: yup
    .number()
    .positive(`${labels.total_rig_baseline_average} must be a positive number`)
    .required(`${labels.total_rig_baseline_average} is required`),
  total_rig_target_average: yup
    .number()
    .positive(`${labels.total_rig_target_average} must be a positive number`)
    .required(`${labels.total_rig_target_average} is required`),
  api_description: yup
    .string()
    .required(`${labels.api_description} is required`),
  addedElements: yup.array().of(
    yup.object().shape({
      baseline_average: yup
        .number()
        .positive(`${labels.baseline_average} must be a positive number`)
        .required(`${labels.baseline_average} is required`),
      target_average: yup
        .number()
        .positive(`${labels.target_average} must be a positive number`)
        .required(`${labels.target_average} is required`),
    }),
  ),
});

interface EMPBaseFormProps {
  children: React.ReactNode;
  onClear?: () => void;
}

const EMPBaseForm = ({ children, onClear }: EMPBaseFormProps) => {
  const { status } = useFormikContext<FormValues>();

  return (
    <Form layout="vertical">
      {status ? (
        <Box mb="10px">
          <Alert message={status} type="error" showIcon />
        </Box>
      ) : undefined}

      <EMPDefinition onClear={onClear} />

      <Box marginY={30}>
        <Divider />
      </Box>

      <EMPElements />

      {children}
    </Form>
  );
};

export default EMPBaseForm;
