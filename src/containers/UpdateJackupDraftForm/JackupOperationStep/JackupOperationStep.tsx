import { Col, Form, Row } from 'antd';
import { Flexbox } from 'components/Box';
import FormSwitch from 'components/FormSwitch';
import Switch from 'components/Switch';
import { Text } from 'components/Typography';
import { JACKUP_LABELS as labels } from 'consts/rigs';
import { FormikProps } from 'formik';
import { FormValues } from 'containers/UpdateJackupForm';

interface JackupOperationStepProps {
  formikProps: FormikProps<FormValues>;
}

const JackupOperationStep = ({ formikProps }: JackupOperationStepProps) => {
  const setSelectedData = (value: boolean) => {
    formikProps.setValues({
      ...formikProps.values,
      offline_stand_building: value,
      auto_pipe_handling: value,
      dual_activity: value,
      drilltronic: value,
      subsea_drilling: value,
      enhanced_legs: value,
      dynamic_drilling_guide: value,
      process_automation_platform: value,
      automatic_tripping: value,
      closed_bus: value,
      scr: value,
      hybrid: value,
      hvac_heat_recovery: value,
      freshwater_cooling_systems: value,
      seawater_cooling_systems: value,
      operator_awareness_dashboard: value,
      hpu_optimization: value,
      optimized_heat_tracing_system: value,
      floodlighting_optimization: value,
      vfds_on_aux_machinery: value,
    });
  };

  return (
    <Form layout="horizontal" colon={false}>
      <Row gutter={35}>
        <Col span={24}>
          <Flexbox
            justifyContent="flex-end"
            width="100%"
            gap="8px"
            marginBottom="25px"
          >
            <Switch onChange={(checked) => setSelectedData(checked)} />
            <Text>Select all</Text>
          </Flexbox>
        </Col>
        <Col span={12}>
          <FormSwitch<FormValues>
            formItemProps={{
              label: labels.offline_stand_building,
            }}
            name="offline_stand_building"
          />
          <FormSwitch<FormValues>
            formItemProps={{
              label: labels.auto_pipe_handling,
            }}
            name="auto_pipe_handling"
          />
          <FormSwitch<FormValues>
            formItemProps={{
              label: labels.dual_activity,
            }}
            name="dual_activity"
          />
          <FormSwitch<FormValues>
            formItemProps={{
              label: labels.subsea_drilling,
            }}
            name="subsea_drilling"
          />
          <FormSwitch<FormValues>
            formItemProps={{
              label: labels.enhanced_legs,
            }}
            name="enhanced_legs"
          />
          <FormSwitch<FormValues>
            formItemProps={{
              label: labels.drilltronic,
            }}
            name="drilltronic"
          />
          <FormSwitch<FormValues>
            formItemProps={{
              label: labels.dynamic_drilling_guide,
            }}
            name="dynamic_drilling_guide"
          />
          <FormSwitch<FormValues>
            formItemProps={{
              label: labels.process_automation_platform,
            }}
            name="process_automation_platform"
          />
          <FormSwitch<FormValues>
            formItemProps={{
              label: labels.automatic_tripping,
            }}
            name="automatic_tripping"
          />
          <FormSwitch<FormValues>
            formItemProps={{
              label: labels.closed_bus,
            }}
            name="closed_bus"
          />
        </Col>
        <Col span={12}>
          <FormSwitch<FormValues>
            formItemProps={{ label: labels.scr }}
            name="scr"
          />
          <FormSwitch<FormValues>
            formItemProps={{ label: labels.hybrid }}
            name="hybrid"
          />
          <FormSwitch<FormValues>
            formItemProps={{
              label: labels.hvac_heat_recovery,
            }}
            name="hvac_heat_recovery"
          />
          <FormSwitch<FormValues>
            formItemProps={{
              label: labels.freshwater_cooling_systems,
            }}
            name="freshwater_cooling_systems"
          />
          <FormSwitch<FormValues>
            formItemProps={{
              label: labels.seawater_cooling_systems,
            }}
            name="seawater_cooling_systems"
          />
          <FormSwitch<FormValues>
            formItemProps={{
              label: labels.operator_awareness_dashboard,
            }}
            name="operator_awareness_dashboard"
          />
          <FormSwitch<FormValues>
            formItemProps={{
              label: labels.hpu_optimization,
            }}
            name="hpu_optimization"
          />
          <FormSwitch<FormValues>
            formItemProps={{
              label: labels.optimized_heat_tracing_system,
            }}
            name="optimized_heat_tracing_system"
          />
          <FormSwitch<FormValues>
            formItemProps={{
              label: labels.floodlighting_optimization,
            }}
            name="floodlighting_optimization"
          />
          <FormSwitch<FormValues>
            formItemProps={{
              label: labels.vfds_on_aux_machinery,
            }}
            name="vfds_on_aux_machinery"
          />
        </Col>
      </Row>
    </Form>
  );
};

export default JackupOperationStep;
