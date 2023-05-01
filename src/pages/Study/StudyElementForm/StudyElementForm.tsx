import { Alert, Form } from 'antd';
import Box from 'components/Box';
import FormInput from 'components/FormInput';
import FormSelect from 'components/FormSelect';
import { Title } from 'components/Typography';
import { useFormikContext } from 'formik';
import useProjectPlans from 'pages/Project/useProjectPlans';
import useProjectRigs from 'pages/Project/useProjectRigs';
import useStudyMetrics from 'pages/Study/useStudyMetrics';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toLowerCaseFirstLetter } from 'utils/format';
import { EncodedRig, encodeRig } from 'utils/rigs';
import { FormValues } from './types';
import { filterCompatibleRigs, getCompatibleRigsHint, LABELS } from './utils';

const StudyElementForm = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const { status, values, setFieldValue } = useFormikContext<FormValues>();
  const [rigOptions, setRigOptions] =
    useState<{ value: EncodedRig; label: string }[]>();

  const { data: projectRigsData } = useProjectRigs({
    projectId: Number(projectId),
    draft: false,
    studiable: true,
  });
  const { data: projectPlansData } = useProjectPlans({
    projectId: Number(projectId),
    draft: false,
  });
  const { data: studyMetricsData } = useStudyMetrics();

  useEffect(() => {
    if (projectRigsData && studyMetricsData) {
      setRigOptions(
        values.metric
          ? filterCompatibleRigs(
              values.metric,
              projectRigsData,
              studyMetricsData || [],
            ).map((rig) => ({
              value: encodeRig(rig),
              label: rig.name,
            }))
          : [],
      );
    }
  }, [studyMetricsData, projectRigsData, values.metric, setRigOptions]);
  useEffect(() => {
    if (rigOptions) {
      const filteredRigsValue = values.rigs.filter((key) =>
        rigOptions.map((rigOption) => rigOption.value).includes(key),
      );

      if (filteredRigsValue.length !== values.rigs.length) {
        setFieldValue('rigs', filteredRigsValue);
      }
    }
  }, [rigOptions, values.rigs, setFieldValue]);

  return (
    <Form layout="vertical">
      {status ? (
        <Box mb="10px">
          <Alert message={status} type="error" showIcon />
        </Box>
      ) : undefined}
      <Box marginBottom={8}>
        <Title level={5} type="secondary">
          General
        </Title>
      </Box>
      <FormInput<FormValues>
        name="title"
        formItemProps={{ label: LABELS.title }}
        inputProps={{
          placeholder: `Enter ${toLowerCaseFirstLetter(LABELS.title)}`,
        }}
      />
      <Box marginBottom={8} marginTop={44}>
        <Title level={5} type="secondary">
          Data
        </Title>
      </Box>
      <FormSelect<FormValues>
        name="metric"
        formItemProps={{
          label: LABELS.metric,
          extra: values.metric
            ? getCompatibleRigsHint(values.metric, studyMetricsData || [])
            : undefined,
        }}
        options={
          studyMetricsData?.map((metric) => ({
            value: String(metric.key),
            label: metric.name,
          })) || []
        }
        selectInputProps={{
          placeholder: `Select ${toLowerCaseFirstLetter(LABELS.metric)}`,
        }}
      />
      <FormSelect<FormValues>
        name="plan"
        formItemProps={{ label: LABELS.plan }}
        options={
          projectPlansData?.map((plan) => ({
            value: String(plan.id),
            label: plan.name,
          })) || []
        }
        selectInputProps={{
          placeholder: `Select ${toLowerCaseFirstLetter(LABELS.plan)}`,
        }}
      />
      <FormSelect<FormValues>
        name="rigs"
        formItemProps={{ label: LABELS.rigs }}
        options={rigOptions || []}
        selectInputProps={{
          placeholder: `Select ${toLowerCaseFirstLetter(LABELS.rigs)}`,
          mode: 'multiple',
        }}
      />
    </Form>
  );
};

export default StudyElementForm;
