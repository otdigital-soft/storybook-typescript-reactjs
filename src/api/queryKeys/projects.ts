import { RigType } from 'routes';
import { Ordering } from 'utils/ordering';

export default {
  allProjects: (tenantId: number) => {
    return [`/tenants/${tenantId}/projects/`];
  },

  projects: ({
    tenantId,
    page,
    pageSize,
    ordering,
  }: {
    tenantId: number;
    page?: number;
    pageSize?: number;
    ordering?: Ordering;
  }) => {
    return [`/tenants/${tenantId}/projects/`, page, pageSize, ordering];
  },

  project: (tenantId: number, projectId: number) => {
    return [`/tenants/${tenantId}/projects/`, projectId];
  },

  allProjectRigs: (tenantId: number, projectId: number) => {
    return [`/tenants/${tenantId}/projects/`, projectId, '/rigs/'];
  },

  projectRigs: ({
    tenantId,
    projectId,
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
    return [
      `/tenants/${tenantId}/projects/`,
      projectId,
      '/rigs/',
      ordering,
      draft,
      studiable,
    ];
  },

  allProjectWells: (tenantId: number, projectId: number) => {
    return [`/tenants/${tenantId}/projects/`, projectId, '/wells/'];
  },

  projectWells: (
    tenantId: number,
    projectId: number,
    ordering: Ordering,
    draft?: boolean,
  ) => {
    return [
      `/tenants/${tenantId}/projects/`,
      projectId,
      '/wells/',
      ordering,
      draft,
    ];
  },

  allPlans: (tenantId: number, projectId: number) => {
    return [`/tenants/${tenantId}/projects/`, projectId, '/plans/'];
  },

  plans: ({
    tenantId,
    projectId,
    ordering,
    draft,
  }: {
    tenantId: number;
    projectId: number;
    ordering?: Ordering;
    draft?: boolean;
  }) => {
    return [
      `/tenants/${tenantId}/projects/`,
      projectId,
      '/plans/',
      ordering,
      draft,
    ];
  },

  plan: (tenantId: number, projectId: number, planId: number) => {
    return [`/tenants/${tenantId}/projects/`, projectId, '/plans/', planId];
  },

  allElements: (tenantId: number) => {
    return [`/tenants/${tenantId}/elements/`];
  },

  elements: ({
    tenantId,
    page,
    pageSize,
    ordering,
  }: {
    tenantId: number;
    page?: number;
    pageSize?: number;
    ordering?: Ordering;
  }) => {
    return [`/tenants/${tenantId}/elements/`, page, pageSize, ordering];
  },

  emp: ({
    tenantId,
    projectId,
    rigId,
    rigType,
  }: {
    tenantId: number;
    projectId: number;
    rigId: number;
    rigType: RigType;
  }) => {
    return [
      `/api/tenants/${tenantId}/projects/`,
      projectId,
      '/rigs/',
      rigType,
      rigId,
      '/emp/',
    ];
  },
};
