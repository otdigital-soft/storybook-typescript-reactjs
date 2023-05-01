import {
  AirgapEnum,
  CustomSemiRigDetails,
  DpClassEnum,
  DrillfloorEfficiencyEnum,
  RigStatusEnum,
  TopsideDesignEnum,
  UpdateCustomSemiRig,
} from 'api/schema';
import rigsServices from 'api/services/rigs';
import rigsQueryKeys from 'api/queryKeys/rigs';
import { FormikHelpers } from 'formik';
import useTenant from 'hooks/useTenant';
import { useMutation, useQueryClient } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { apiValidationErrors } from 'utils/api';
import { notification } from 'antd';
import { normalizeValues } from './utils';
import { publishedRigValidationSchema } from './schema';
import Logger from 'utils/logger';
import { RigType } from 'routes';
import { generateRigPath } from 'routes/utils';
import useInvalidateRigCache from 'hooks/useInvalidateRigCache';

export type FormValues = {
  // General
  name: string;
  manager: string;
  design: string;
  build_yard: string;
  rig_status: RigStatusEnum | null;
  delivery_date: Date | null;
  end_of_last_contract: Date | null;
  special_survey_due: Date | null;
  drillfloor_efficiency: DrillfloorEfficiencyEnum | null;
  months_in_operation_last_year: number | '';
  months_in_operation_last_3_years: number | '';
  design_score: DrillfloorEfficiencyEnum | null;
  topside_design: TopsideDesignEnum | null;
  // Capacities
  quarters_capacity: number | '';
  rig_water_depth: number | '';
  variable_load: number | '';
  hull_breadth: number | '';
  hull_depth: number | '';
  hull_length: number | '';
  derrick_height: number | '';
  derrick_capacity: number | '';
  drawworks_power: number | '';
  total_cranes: number | '';
  crane_capacity: number | '';
  total_bop_rams: number | '';
  bop_diameter_wp_max: number | '';
  bop_wp_max: number | '';
  number_of_bop_stacks: number | '';
  mudpump_quantity: number | '';
  liquid_mud: number | '';
  mud_total_power: number | '';
  shaleshaker_total: number | '';
  engine_power: number | '';
  engine_quantity: number | '';
  engine_total: number | '';
  generator_power: number | '';
  generator_quantity: number | '';
  generator_total: number | '';
  equipment_load: DrillfloorEfficiencyEnum | null;
  hull_concept_score: number | '';
  hull_design_eco_score: number | '';
  dp: boolean;
  dp_class: DpClassEnum | null;
  thruster_assist: boolean;
  total_anchors: number | '';
  anchor_standalone: boolean;
  airgap: AirgapEnum | null;
  draft_depth: number | '';
  displacement: number | '';
  dual_derrick: boolean;
  active_heave_drawwork: boolean;
  cmc_with_active_heave: boolean;
  ram_system: boolean;
  // Operation & emission
  offline_stand_building: boolean;
  auto_pipe_handling: boolean;
  dual_activity: boolean;
  drilltronic: boolean;
  dynamic_drilling_guide: boolean;
  process_automation_platform: boolean;
  automatic_tripping: boolean;
  closed_bus: boolean;
  scr: boolean;
  hybrid: boolean;
  hvac_heat_recovery: boolean;
  freshwater_cooling_systems: boolean;
  seawater_cooling_systems: boolean;
  operator_awareness_dashboard: boolean;
  hpu_optimization: boolean;
  optimized_heat_tracing_system: boolean;
  floodlighting_optimization: boolean;
  vfds_on_aux_machinery: boolean;
  tripsaver: boolean;
  day_rate: number | '';
  spread_cost: number | '';
  tugs_no_used: number | '';
  move_speed: number | '';
};

const useUpdateSemiForm = () => {
  const { tenantId } = useTenant();
  const { rigId } = useParams<{ rigId: string }>();
  const { projectId } = useParams<{ projectId: string }>();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const invalidateRigCache = useInvalidateRigCache(
    projectId ? Number(projectId) : undefined,
  );

  const { mutateAsync: onUpdateSemiRig, isLoading: isUpdateSemiRigLoading } =
    useMutation<
      CustomSemiRigDetails,
      Error,
      {
        values: FormValues;
        formikHelpers: FormikHelpers<FormValues>;
      }
    >(
      ({ values }) => {
        if (!tenantId) {
          throw new Error('Missing tenant id');
        }

        if (!rigId) {
          throw new Error('Missing rig id');
        }

        const data: UpdateCustomSemiRig = normalizeValues(values, false);
        return rigsServices.updateSemi(tenantId, Number(rigId), data);
      },
      {
        onSuccess: async (data) => {
          if (!tenantId) {
            throw new Error('Missing tenant id');
          }

          const customSemiQueryKey = rigsQueryKeys.customSemi(
            Number(tenantId),
            Number(rigId),
          );
          queryClient.setQueryData<CustomSemiRigDetails>(
            customSemiQueryKey,
            data,
          );
          await invalidateRigCache();

          notification.success({
            message: 'Saved rig',
            description: (
              <>
                Rig "<strong>{data.name}</strong>" has been saved.
              </>
            ),
          });

          navigate(
            generateRigPath(
              Number(rigId),
              RigType.Semi,
              projectId ? Number(projectId) : undefined,
            ),
          );
        },
        onError: (error, { formikHelpers }) => {
          const { nonFieldErrors, fieldErrors } = apiValidationErrors(
            error,
            'Unable to update rig. Please try later',
          );

          Logger.error(`Unable to update a CustomSemiRig(id=${rigId}).`, error);
          formikHelpers.setStatus(nonFieldErrors);
          formikHelpers.setErrors(fieldErrors);
        },
      },
    );

  return {
    schema: publishedRigValidationSchema,
    onUpdateSemiRig,
    isUpdateSemiRigLoading,
  };
};

export default useUpdateSemiForm;
