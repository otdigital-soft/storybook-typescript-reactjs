import { Alert, Col, Form } from 'antd';
import Box from 'components/Box';
import FormInputNumber from 'components/FormInputNumber';
import FormRadioGroup from 'components/FormRadioGroup';
import FormSelect from 'components/FormSelect';
import { Row } from 'components/Grid';
import { useFormikContext } from 'formik';
import { SEASON_OPTIONS } from 'pages/WellPlan/consts';
import useVesselTypesOptions from 'pages/WellPlan/hooks/useVesselTypesOptions';
import { prettyPlaceholder } from 'utils/format';
import { FormValues, LABELS as labels } from './form';
import { isSafeToShow } from 'utils/safety';

const VesselForm = () => {
  const vesselTypesOptions = useVesselTypesOptions();
  const { status } = useFormikContext<FormValues>();

  return (
    <Form layout="vertical">
      {status && isSafeToShow(status) ? (
        <Box marginBottom={23}>
          <Alert message={status} type="error" showIcon />
        </Box>
      ) : undefined}
      <Row gutter={29}>
        <>
          <Col span={12}>
            <FormSelect<FormValues>
              name="vessel_type"
              formItemProps={{
                label: labels.vessel_type,
                required: true,
              }}
              options={vesselTypesOptions}
              selectInputProps={{
                placeholder: prettyPlaceholder`Select ${labels.vessel_type}`,
              }}
            />
          </Col>
          <Col span={12}></Col>
        </>
        <>
          <Col span={12}>
            <FormInputNumber<FormValues>
              name="duration"
              formItemProps={{
                label: labels.duration,
                required: true,
              }}
              inputNumberProps={{
                placeholder: prettyPlaceholder`Enter ${labels.duration}`,
              }}
            />
          </Col>
          <Col span={12} />
        </>
        <>
          <Col span={12}>
            <FormInputNumber<FormValues>
              name="exposure_against_current_well"
              formItemProps={{
                label: labels.exposure_against_current_well,
                required: true,
              }}
              inputNumberProps={{
                placeholder: prettyPlaceholder`Enter ${labels.exposure_against_current_well}`,
              }}
            />
          </Col>
          <Col span={12} />
        </>
        <>
          <Col span={12}>
            <FormInputNumber<FormValues>
              name="waiting_on_weather"
              formItemProps={{
                label: labels.waiting_on_weather,
                required: true,
              }}
              inputNumberProps={{
                placeholder: prettyPlaceholder`Enter ${labels.waiting_on_weather}`,
              }}
            />
          </Col>
          <Col span={12} />
        </>
        <>
          <Col span={12}>
            <FormRadioGroup<FormValues>
              name="season"
              formItemProps={{
                label: labels.season,
                required: true,
              }}
              options={SEASON_OPTIONS}
            />
          </Col>
          <Col span={12} />
        </>
        <>
          <Col span={12}>
            <FormInputNumber<FormValues>
              name="quota_obligation"
              formItemProps={{
                label: labels.quota_obligation,
                required: true,
              }}
              inputNumberProps={{
                placeholder: prettyPlaceholder`Enter ${labels.quota_obligation}`,
              }}
            />
          </Col>
          <Col span={12} />
        </>
      </Row>
    </Form>
  );
};

export default VesselForm;
