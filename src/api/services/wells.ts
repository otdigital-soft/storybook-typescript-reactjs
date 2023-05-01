import { Ordering } from 'utils/ordering';
import { CreateCustomWell, TenantsService, UpdateCustomWell } from 'api/schema';

export default {
  conceptWells: async ({
    pageSize,
    page,
    tenantId,
  }: {
    tenantId: number;
    page?: number;
    pageSize?: number;
  }) => {
    const { data } = await TenantsService.tenantsWellsConceptList(
      tenantId,
      page,
      pageSize,
    );
    return data;
  },

  conceptWell: async (tenantId: number, wellId: number) => {
    const { data } = await TenantsService.tenantsWellsConceptRetrieve(
      tenantId,
      wellId,
    );
    return data;
  },

  customWells: async ({
    ordering,
    page,
    pageSize,
    tenantId,
    draft,
    latest,
  }: {
    tenantId: number;
    page?: number;
    pageSize?: number;
    ordering?: Ordering;
    latest?: boolean;
    draft?: boolean;
  }) => {
    const { data } = await TenantsService.tenantsWellsCustomList(
      tenantId,
      draft,
      latest,
      ordering,
      page,
      pageSize,
    );
    return data;
  },

  customWell: async (tenantId: number, wellId: number) => {
    const { data } = await TenantsService.tenantsWellsCustomRetrieve(
      tenantId,
      wellId,
    );
    return data;
  },

  createCustomWell: async (tenantId: number, data: CreateCustomWell) => {
    const response = await TenantsService.tenantsWellsCustomCreateCreate(
      tenantId,
      data,
    );
    return response.data;
  },

  deleteCustomWell: async (tenantId: number, wellId: number) => {
    const { data } = await TenantsService.tenantsWellsCustomDeleteDestroy(
      tenantId,
      wellId,
    );
    return data;
  },

  updateCustomWell: async (
    tenantId: number,
    wellId: number,
    data: UpdateCustomWell,
  ) => {
    const response = await TenantsService.tenantsWellsCustomUpdateUpdate(
      tenantId,
      wellId,
      data,
    );
    return response.data;
  },
};
