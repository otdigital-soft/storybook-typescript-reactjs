import { Ordering } from 'utils/ordering';

export default {
  conceptWell: (tenantId: number, wellId: number) => {
    return [`/tenants/${tenantId}/wells/concept/`, wellId];
  },

  conceptWells: ({
    pageSize,
    tenantId,
    page,
  }: {
    tenantId: number;
    page?: number;
    pageSize?: number;
  }) => {
    return [`/tenants/${tenantId}/wells/concept/`, page, pageSize];
  },

  allCustomWells: (tenantId: number) => {
    return [`/tenants/${tenantId}/wells/custom/`];
  },

  customWells: ({
    pageSize,
    ordering,
    page,
    tenantId,
    draft,
    latest,
  }: {
    tenantId: number;
    page?: number;
    pageSize?: number;
    ordering?: Ordering;
    draft?: boolean;
    latest?: boolean;
  }) => {
    return [
      `/tenants/${tenantId}/wells/custom/`,
      page,
      pageSize,
      ordering,
      draft,
      latest,
    ];
  },

  customWell: (tenantId: number, wellId: number) => {
    return [`/tenants/${tenantId}/wells/custom/`, wellId];
  },

  wellReferenceMaterial: (tenantId: number) => {
    return [`/tenants/${tenantId}/wells/reference-material/`];
  },

  allWellPlans: (tenantId: number) => {
    return [`/tenants/${tenantId}/wells/planners/`];
  },

  wellPlan(tenantId: number, wellPlanId: number) {
    return [...this.allWellPlans(tenantId), wellPlanId];
  },

  wellPlannedStepsCO2(tenantId: number, wellPlanId: number) {
    return [...this.allWellPlans(tenantId), wellPlanId, '/planned/steps/co2/'];
  },

  wellPlannedStepCO2(
    tenantId: number,
    wellPlanId: number,
    wellPlanStepId: number,
  ) {
    return [
      ...this.allWellPlans(tenantId),
      wellPlanId,
      '/planned/steps/co2/',
      wellPlanStepId,
    ];
  },

  wellPlannedPlanSummary(tenantId: number, wellPlanId: number) {
    return [...this.allWellPlans(tenantId), wellPlanId, '/planned/summary/'];
  },

  allWellCompletePlanCO2({
    tenantId,
    wellPlanId,
  }: {
    tenantId: number;
    wellPlanId: number;
  }) {
    return [...this.allWellPlans(tenantId), wellPlanId, '/complete/co2/'];
  },

  wellCompletePlanCO2({
    tenantId,
    wellPlanId,
    start,
    end,
  }: {
    tenantId: number;
    wellPlanId: number;
    start?: string;
    end?: string;
  }) {
    return [
      ...this.allWellPlans(tenantId),
      wellPlanId,
      '/complete/co2/',
      start,
      end,
    ];
  },

  allWellPlannedPlanCO2({
    tenantId,
    wellPlanId,
  }: {
    tenantId: number;
    wellPlanId: number;
  }) {
    return [...this.allWellPlans(tenantId), wellPlanId, '/planned/', '/co2/'];
  },

  wellPlannedPlanCO2({
    tenantId,
    wellPlanId,
    start,
    end,
  }: {
    tenantId: number;
    wellPlanId: number;
    start: string | undefined;
    end: string | undefined;
  }) {
    return [
      ...this.allWellPlans(tenantId),
      wellPlanId,
      '/planned/',
      '/co2/',
      start,
      end,
    ];
  },

  allWellPlannedPlanSavedCO2({
    tenantId,
    wellPlanId,
  }: {
    tenantId: number;
    wellPlanId: number;
  }) {
    return [
      ...this.allWellPlans(tenantId),
      wellPlanId,
      '/planned/',
      '/co2/saved/',
    ];
  },

  wellPlannedPlanSavedCO2({
    tenantId,
    wellPlanId,
    start,
    end,
  }: {
    tenantId: number;
    wellPlanId: number;
    start: string | undefined;
    end: string | undefined;
  }) {
    return [
      ...this.allWellPlans(tenantId),
      wellPlanId,
      '/planned/',
      '/co2/saved/',
      start,
      end,
    ];
  },

  wellCompletePlanSummary(tenantId: number, wellPlanId: number) {
    return [...this.allWellPlans(tenantId), wellPlanId, '/complete/summary/'];
  },

  allWellMeasuredAirTemperature({
    tenantId,
    wellPlanId,
  }: {
    tenantId: number;
    wellPlanId: number;
  }) {
    return [
      ...this.allWellPlans(tenantId),
      wellPlanId,
      '/measured/air-temperature/',
    ];
  },

  wellMeasuredAirTemperature({
    tenantId,
    wellPlanId,
    start,
    end,
  }: {
    tenantId: number;
    wellPlanId: number;
    start?: string;
    end?: string;
  }) {
    return [
      ...this.allWellPlans(tenantId),
      wellPlanId,
      '/measured/air-temperature/',
      start,
      end,
    ];
  },

  allWellMeasuredWaveHeave({
    tenantId,
    wellPlanId,
  }: {
    tenantId: number;
    wellPlanId: number;
  }) {
    return [
      ...this.allWellPlans(tenantId),
      wellPlanId,
      '/measured/wave-heave/',
    ];
  },

  wellMeasuredWaveHeave({
    tenantId,
    wellPlanId,
    start,
    end,
  }: {
    tenantId: number;
    wellPlanId: number;
    start?: string;
    end?: string;
  }) {
    return [
      ...this.allWellPlans(tenantId),
      wellPlanId,
      '/measured/wave-heave/',
      start,
      end,
    ];
  },

  allWellMeasuredWindSpeed({
    tenantId,
    wellPlanId,
  }: {
    tenantId: number;
    wellPlanId: number;
  }) {
    return [
      ...this.allWellPlans(tenantId),
      wellPlanId,
      '/measured/wind-speed/',
    ];
  },

  wellMeasuredWindSpeed({
    tenantId,
    wellPlanId,
    start,
    end,
  }: {
    tenantId: number;
    wellPlanId: number;
    start?: string;
    end?: string;
  }) {
    return [
      ...this.allWellPlans(tenantId),
      wellPlanId,
      '/measured/wind-speed/',
      start,
      end,
    ];
  },

  phases: (tenantId: number, wellPlanId: number) => {
    return [`/tenants/${tenantId}/wells/planners/${wellPlanId}/phases/`];
  },

  modes: (tenantId: number, wellPlanId: number) => {
    return [`/tenants/${tenantId}/wells/planners/${wellPlanId}/modes/`];
  },

  wellEmissionReductionInitiatives: (tenantId: number, wellPlanId: number) => {
    return [
      `/tenants/${tenantId}/wells/planners/${wellPlanId}/emission-reduction-initiatives/`,
    ];
  },

  wellPlans({
    tenantId,
    page,
    pageSize,
  }: {
    tenantId: number;
    page: number;
    pageSize?: number;
  }) {
    return [
      ...this.allWellPlans(tenantId),
      `page=${page}`,
      `pageSize=${pageSize}`,
    ];
  },

  wellNames: (tenantId: number) => {
    return [`/tenants/${tenantId}/well-names/`];
  },
};
