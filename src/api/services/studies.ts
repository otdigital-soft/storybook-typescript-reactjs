import {
  TenantsService,
  CreateUpdateStudyElement,
  SwapStudyElements,
} from 'api/schema';

export default {
  studyElement: async (
    tenantId: number,
    projectId: number,
    elementId: number,
  ) => {
    const { data } = await TenantsService.tenantsStudiesElementsRetrieve(
      elementId,
      projectId,
      tenantId,
    );
    return data;
  },
  studyElements: async (tenantId: number, projectId: number) => {
    const { data } = await TenantsService.tenantsStudiesElementsList(
      projectId,
      tenantId,
    );
    return data;
  },

  deleteStudyElement: async (
    tenantId: number,
    projectId: number,
    elementId: number,
  ) => {
    const { data } = await TenantsService.tenantsStudiesElementsDeleteDestroy(
      elementId,
      projectId,
      tenantId,
    );
    return data;
  },

  createStudyElement: async (
    tenantId: number,
    projectId: number,
    data: CreateUpdateStudyElement,
  ) => {
    const response = await TenantsService.tenantsStudiesElementsCreateCreate(
      projectId,
      tenantId,
      data,
    );
    return response.data;
  },

  swapStudyElements: async (
    tenantId: number,
    projectId: number,
    data: SwapStudyElements,
  ) => {
    const response = await TenantsService.tenantsStudiesElementsSwapCreate(
      projectId,
      tenantId,
      data,
    );
    return response.data;
  },

  updateStudyElement: async (
    tenantId: number,
    projectId: number,
    elementId: number,
    data: CreateUpdateStudyElement,
  ) => {
    const response = await TenantsService.tenantsStudiesElementsUpdateUpdate(
      elementId,
      projectId,
      tenantId,
      data,
    );
    return response.data;
  },

  studyMetrics: async (tenantId: number) => {
    const { data } = await TenantsService.tenantsStudiesMetricsList(tenantId);
    return data;
  },
};
