import client from 'api/client';
import {
  CreateUpdateEMP,
  CreateUpdatePlan,
  CreateUpdateProject,
  PlanList,
  TenantsService,
} from 'api/schema';
import { RigType } from 'routes';
import { Ordering } from 'utils/ordering';

export default {
  projects: async ({
    page,
    pageSize,
    ordering,
    tenantId,
  }: {
    tenantId: number;
    page?: number;
    pageSize?: number;
    ordering?: Ordering;
  }) => {
    const { data } = await TenantsService.tenantsProjectsList(
      tenantId,
      ordering,
      page,
      pageSize,
    );
    return data;
  },

  createProject: async (tenantId: number, data: CreateUpdateProject) => {
    const response = await TenantsService.tenantsProjectsCreateCreate(
      tenantId,
      data,
    );
    return response.data;
  },

  project: async (tenantId: number, projectId: number) => {
    const response = await TenantsService.tenantsProjectsRetrieve(
      projectId,
      tenantId,
    );
    return response.data;
  },

  projectRigs: async ({
    projectId,
    tenantId,
    ordering,
    draft,
    studiable,
  }: {
    tenantId: number;
    projectId: number;
    ordering?: Ordering;
    draft?: boolean;
    studiable?: boolean;
  }) => {
    const response = await TenantsService.tenantsProjectsRigsList(
      projectId,
      tenantId,
      draft,
      ordering,
      studiable,
    );
    return response.data;
  },

  projectWells: async (
    tenantId: number,
    projectId: number,
    ordering: Ordering,
    draft?: boolean,
  ) => {
    const response = await TenantsService.tenantsProjectsWellsList(
      projectId,
      tenantId,
      draft,
      ordering,
    );
    return response.data;
  },

  updateProject: async (
    tenantId: number,
    projectId: number,
    data: CreateUpdateProject,
  ) => {
    const response = await TenantsService.tenantsProjectsUpdateUpdate(
      projectId,
      tenantId,
      data,
    );
    return response.data;
  },

  deleteProject: async (tenantId: number, projectId: number) => {
    const { data } = await TenantsService.tenantsProjectsDeleteDestroy(
      projectId,
      tenantId,
    );
    return data;
  },

  elements: async ({
    tenantId,
    ordering,
    page,
    pageSize,
  }: {
    tenantId: number;
    page?: number;
    pageSize?: number;
    ordering?: Ordering;
  }) => {
    const { data } = await TenantsService.tenantsElementsList(
      tenantId,
      ordering,
      page,
      pageSize,
    );
    return data;
  },

  plans: async ({
    projectId,
    tenantId,
    ordering,
    draft,
  }: {
    tenantId: number;
    projectId: number;
    ordering?: Ordering;
    draft?: boolean;
  }) => {
    const { data } = await client.get<PlanList[]>(
      `/api/tenants/${tenantId}/projects/${projectId}/plans/`,
      {
        params: {
          ordering,
          draft,
        },
      },
    );
    return data;
  },

  createPlan: async (
    tenantId: number,
    projectId: number,
    data: CreateUpdatePlan,
  ) => {
    const response = await TenantsService.tenantsProjectsPlansCreateCreate(
      projectId,
      tenantId,
      data,
    );
    return response.data;
  },

  updatePlan: async (
    tenantId: number,
    projectId: number,
    planId: number,
    data: CreateUpdatePlan,
  ) => {
    const response = await TenantsService.tenantsProjectsPlansUpdateUpdate(
      planId,
      projectId,
      tenantId,
      data,
    );
    return response.data;
  },

  plan: async (tenantId: number, projectId: number, planId: number) => {
    const { data } = await TenantsService.tenantsProjectsPlansRetrieve(
      planId,
      projectId,
      tenantId,
    );
    return data;
  },

  deletePlan: async (tenantId: number, projectId: number, planId: number) => {
    const response = await TenantsService.tenantsProjectsPlansDeleteDestroy(
      planId,
      projectId,
      tenantId,
    );
    return response.data;
  },

  emp: async ({
    tenantId,
    rigId,
    rigType,
    projectId,
  }: {
    tenantId: number;
    projectId: number;
    rigType: RigType;
    rigId: number;
  }) => {
    const { data } = await TenantsService.tenantsProjectsRigsEmpRetrieve(
      projectId,
      rigId,
      rigType,
      tenantId,
    );
    return data;
  },

  createEMP: async ({
    projectId,
    tenantId,
    data,
    rigType,
    rigId,
  }: {
    tenantId: number;
    projectId: number;
    rigType: RigType;
    rigId: number;
    data: CreateUpdateEMP;
  }) => {
    const response = await TenantsService.tenantsProjectsRigsEmpCreateCreate(
      projectId,
      rigId,
      rigType,
      tenantId,
      data,
    );
    return response.data;
  },

  updateEMP: async ({
    tenantId,
    rigId,
    rigType,
    data,
    projectId,
  }: {
    tenantId: number;
    projectId: number;
    rigType: RigType;
    rigId: number;
    data: CreateUpdateEMP;
  }) => {
    const response = await TenantsService.tenantsProjectsRigsEmpUpdateUpdate(
      projectId,
      rigId,
      rigType,
      tenantId,
      data,
    );
    return response.data;
  },

  deleteEMP: async ({
    projectId,
    tenantId,
    rigType,
    rigId,
  }: {
    tenantId: number;
    projectId: number;
    rigType: RigType;
    rigId: number;
  }) => {
    const response = await TenantsService.tenantsProjectsRigsEmpDeleteDestroy(
      projectId,
      rigId,
      rigType,
      tenantId,
    );
    return response.data;
  },
};
