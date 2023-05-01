import FormSwitch from 'components/FormSwitch';
import { FormValues } from 'containers/UpdateDrillshipForm/form';
import { DRILLSHIP_LABELS as labels } from 'consts/rigs';

const OperationEmissionEfficiencyForm = () => {
  return (
    <>
      <FormSwitch<FormValues>
        formItemProps={{
          label: labels.tripsaver,
        }}
        name="tripsaver"
      />
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
      <FormSwitch<FormValues>
        formItemProps={{ label: labels.scr }}
        name="scr"
      />
      <FormSwitch<FormValues>
        formItemProps={{
          label: labels.hybrid,
        }}
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
    </>
  );
};

export default OperationEmissionEfficiencyForm;
