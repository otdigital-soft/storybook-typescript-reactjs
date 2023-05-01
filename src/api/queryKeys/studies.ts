export default {
  studyElements: (tenantId: number, projectId: number) => {
    return [`/tenants/${tenantId}/studies/`, projectId, '/studies/elements/'];
  },

  studyElement: (tenantId: number, projectId: number, elementId: number) => {
    return [
      `/tenants/${tenantId}/studies/`,
      projectId,
      `/studies/elements/${elementId}/`,
    ];
  },

  studyMetrics: (tenantId: number) => {
    return [`/tenants/${tenantId}/studies/metrics/`];
  },
};
