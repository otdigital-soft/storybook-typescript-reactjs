import { Alert, Col, Form } from 'antd';
import Box from 'components/Box';
import FormInputNumber from 'components/FormInputNumber';
import FormRadioGroup from 'components/FormRadioGroup';
import FormSelect from 'components/FormSelect';
import { Row } from 'components/Grid';
import { useFormikContext } from 'formik';
import { SEASON_OPTIONS } from 'pages/WellPlan/consts';
import EmissionReductionInitiativesFormCheckboxGroup from 'pages/WellPlan/containers/EmissionReductionInitiativesFormCheckboxGroup';
import { prettyPlaceholder } from 'utils/format';
import { FormValues, LABELS as labels } from './form';
import useWellPhaseFormOptions from 'pages/WellPlan/hooks/useWellPhaseFormOptions';
import { isSafeToShow } from 'utils/safety';
import FormTextArea from 'components/FormTextArea';
import { Title } from 'components/Typography';
import FormCheckbox from 'components/FormCheckbox';
import ModeFormSelect from './ModeFormSelect';
import PhaseMaterials from '../PhaseMaterials';

const PhaseForm = () => {
  const { status } = useFormikContext<FormValues>();
  const { phaseOptions } = useWellPhaseFormOptions();

  return (
    <Form layout="vertical">
      {isSafeToShow(status) ? (
        <Box marginBottom={23}>
          <Alert message={status} type="error" showIcon />
        </Box>
      ) : undefined}

      <Row gutter={29}>
        <Col span={12}>
          <FormSelect<FormValues>
            name="phase"
            formItemProps={{
              label: labels.phase,
              required: true,
            }}
            options={phaseOptions}
            selectInputProps={{
              placeholder: prettyPlaceholder`Select ${labels.phase}`,
            }}
          />
        </Col>
        <Col span={12} />
        <Col span={12}>
          <ModeFormSelect<FormValues>
            modeName="mode"
            phaseName="phase"
            formItemProps={{
              label: labels.mode,
              required: true,
            }}
            selectInputProps={{
              placeholder: prettyPlaceholder`Select ${labels.mode}`,
            }}
          />
        </Col>
        <Col span={12} />
        <Col span={12}>
          <FormInputNumber<FormValues>
            name="well_section_length"
            formItemProps={{
              label: labels.well_section_length,
              required: true,
            }}
            inputNumberProps={{
              placeholder: prettyPlaceholder`Enter ${labels.well_section_length}`,
            }}
          />
        </Col>
        <Col span={12} />
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
        <Col span={24}>
          <FormTextArea<FormValues>
            name="comment"
            formItemProps={{
              label: labels.comment,
            }}
            textAreaProps={{
              placeholder: prettyPlaceholder`Enter ${labels.comment}`,
              rows: 3,
            }}
          />
        </Col>
        <Col span={24}>
          <Box marginBottom={20}>
            <PhaseMaterials />
          </Box>
        </Col>
        <Col span={24}>
          <Box marginBottom={20}>
            <Title level={5}>Carbon capture & storage (CC&S)</Title>
          </Box>
        </Col>
        <Col span={12}>
          <FormInputNumber<FormValues>
            name="carbon_capture_storage_system_quantity"
            formItemProps={{
              label: labels.carbon_capture_storage_system_quantity,
            }}
            inputNumberProps={{
              placeholder: prettyPlaceholder`Enter ${labels.carbon_capture_storage_system_quantity}`,
              disabled: true,
            }}
          />
        </Col>
        <Col span={24}>
          <Box marginBottom={9}>
            <Title level={5}>External energy supply</Title>
          </Box>
          <Row gutter={[13, 20]}>
            <Col span={12}>
              <FormCheckbox<FormValues> name="external_energy_supply_enabled">
                Enabled
              </FormCheckbox>
            </Col>
            <Col span={12}>
              <FormCheckbox<FormValues> name="external_energy_supply_quota">
                {labels.external_energy_supply_quota}
              </FormCheckbox>
            </Col>
          </Row>
        </Col>
        <Col span={12} />
        <Col span={24}>
          <EmissionReductionInitiativesFormCheckboxGroup<FormValues> name="emission_reduction_initiatives" />
        </Col>
      </Row>
    </Form>
  );
};

export default PhaseForm;
