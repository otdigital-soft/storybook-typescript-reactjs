export default {
  allVesselTypes: (tenantId: number) => {
    return [`/tenants/${tenantId}/vessel-types/`];
  },
  vesselTypes: ({
    tenantId,
    page,
    pageSize,
  }: {
    tenantId: number;
    page: number;
    pageSize: number | undefined;
  }) => {
    return [
      `/tenants/${tenantId}/vessel-types/`,
      `page=${page}`,
      `pageSize=${pageSize}`,
    ];
  },
  vesselTypesAll: (tenantId: number) => {
    return [`/tenants/${tenantId}/vessel-types/`, 'all'];
  },
  allHelicopterTypes: (tenantId: number) => {
    return [`/tenants/${tenantId}/helicopter-types/`];
  },
  helicopterTypes: ({
    tenantId,
    page,
    pageSize,
  }: {
    tenantId: number;
    page: number;
    pageSize: number | undefined;
  }) => {
    return [
      `/tenants/${tenantId}/helicopter-types/`,
      `page=${page}`,
      `pageSize=${pageSize}`,
    ];
  },
  helicopterTypesAll: (tenantId: number) => {
    return [`/tenants/${tenantId}/helicopter-types/`, 'all'];
  },
  allAssets(tenantId: number) {
    return [`/tenants/${tenantId}/assets/`];
  },
  assets({
    tenantId,
    page,
    pageSize,
  }: {
    tenantId: number;
    page: number;
    pageSize: number | undefined;
  }) {
    return this.allAssets(tenantId).concat([
      `page=${page}`,
      `pageSize=${pageSize}`,
    ]);
  },
  asset(tenantId: number, assetId: number) {
    return this.allAssets(tenantId).concat([String(assetId)]);
  },
  completeAssets(tenantId: number) {
    return this.allAssets(tenantId).concat(['complete']);
  },
  assetReferenceMaterial: (tenantId: number) => {
    return [`/tenants/${tenantId}/assets/reference-material/`];
  },
  phases: (tenantId: number, assetId: number) => {
    return [`/tenants/${tenantId}/assets/${assetId}/phases/`];
  },
  modes: (tenantId: number, assetId: number) => {
    return [`/tenants/${tenantId}/assets/${assetId}/modes/`];
  },
  baseline: ({
    tenantId,
    assetId,
    baselineId,
  }: {
    tenantId: number;
    assetId: number;
    baselineId: number;
  }) => {
    return [`/tenants/${tenantId}/assets/${assetId}/baselines/${baselineId}/`];
  },
  allEmissionManagementPlans({
    tenantId,
    assetId,
    baselineId,
  }: {
    tenantId: number;
    assetId: number;
    baselineId: number;
  }) {
    return [
      `/tenants/${tenantId}/assets/${assetId}/baselines/${baselineId}/emission-management-plans/`,
    ];
  },
  emissionManagementPlan({
    tenantId,
    assetId,
    baselineId,
    emissionManagementPlanId,
  }: {
    tenantId: number;
    assetId: number;
    baselineId: number;
    emissionManagementPlanId: number;
  }) {
    return [
      ...this.allEmissionManagementPlans({ tenantId, assetId, baselineId }),
      emissionManagementPlanId,
    ];
  },
  emissionReductionInitiative({
    tenantId,
    assetId,
    baselineId,
    emissionManagementPlanId,
    emissionReductionInitiativeId,
  }: {
    tenantId: number;
    assetId: number;
    baselineId: number;
    emissionManagementPlanId: number;
    emissionReductionInitiativeId: number;
  }) {
    return [
      ...this.emissionManagementPlan({
        tenantId,
        assetId,
        baselineId,
        emissionManagementPlanId,
      }),
      'emission-reduction-initiatives',
      emissionReductionInitiativeId,
    ];
  },
  baselinePhases: ({
    tenantId,
    assetId,
    baselineId,
  }: {
    tenantId: number;
    assetId: number;
    baselineId: number;
  }) => {
    return [
      `/tenants/${tenantId}/assets/${assetId}/baselines/${baselineId}/phases/`,
    ];
  },
  baselineModes: ({
    tenantId,
    assetId,
    baselineId,
  }: {
    tenantId: number;
    assetId: number;
    baselineId: number;
  }) => {
    return [
      `/tenants/${tenantId}/assets/${assetId}/baselines/${baselineId}/modes/`,
    ];
  },
  allMaterialTypes: (tenantId: number) => {
    return [`/tenants/${tenantId}/material-types/all/`];
  },
  materialTypesAll: (tenantId: number) => {
    return [`/tenants/${tenantId}/material-types/`];
  },
  materialTypes: ({
    tenantId,
    page,
    pageSize,
  }: {
    tenantId: number;
    page: number;
    pageSize: number | undefined;
  }) => {
    return [
      `/tenants/${tenantId}/material-types/`,
      `page=${page}`,
      `pageSize=${pageSize}`,
    ];
  },
};
