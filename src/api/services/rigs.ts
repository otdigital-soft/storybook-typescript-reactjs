import {
  CreateCustomDrillship,
  CreateCustomJackupRigDraft,
  CreateCustomSemiRig,
  TenantsService,
  UpdateCustomDrillship,
  UpdateCustomJackupRig,
  UpdateCustomSemiRig,
} from 'api/schema';
import { Ordering } from 'utils/ordering';

export default {
  conceptJackup: async (tenantId: number, rigId: number) => {
    const { data } = await TenantsService.tenantsRigsConceptJackupRetrieve(
      rigId,
      tenantId,
    );
    return data;
  },
  conceptJackups: async (tenantId: number, page: number, pageSize: number) => {
    const { data } = await TenantsService.tenantsRigsConceptJackupList(
      tenantId,
      page,
      pageSize,
    );
    return data;
  },
  conceptSemi: async (tenantId: number, rigId: number) => {
    const { data } = await TenantsService.tenantsRigsConceptSemiRetrieve(
      rigId,
      tenantId,
    );
    return data;
  },
  conceptSemis: async (tenantId: number, page: number, pageSize: number) => {
    const { data } = await TenantsService.tenantsRigsConceptSemiList(
      tenantId,
      page,
      pageSize,
    );
    return data;
  },
  conceptDrillship: async (tenantId: number, rigId: number) => {
    const { data } = await TenantsService.tenantsRigsConceptDrillshipRetrieve(
      rigId,
      tenantId,
    );
    return data;
  },
  conceptDrillships: async (
    tenantId: number,
    page: number,
    pageSize: number,
  ) => {
    const { data } = await TenantsService.tenantsRigsConceptDrillshipList(
      tenantId,
      page,
      pageSize,
    );
    return data;
  },
  createJackup: async (tenantId: number, data: CreateCustomJackupRigDraft) => {
    const response = await TenantsService.tenantsRigsCustomJackupCreateCreate(
      tenantId,
      data,
    );
    return response.data;
  },
  updateJackup: async (
    tenantId: number,
    rigId: number,
    data: UpdateCustomJackupRig,
  ) => {
    const response = await TenantsService.tenantsRigsCustomJackupUpdateUpdate(
      rigId,
      tenantId,
      data,
    );
    return response.data;
  },
  deleteJackup: async (tenantId: number, rigId: number) => {
    const { data } = await TenantsService.tenantsRigsCustomJackupDeleteDestroy(
      rigId,
      tenantId,
    );
    return data;
  },
  customJackup: async (tenantId: number, rigId: number) => {
    const { data } = await TenantsService.tenantsRigsCustomJackupRetrieve(
      rigId,
      tenantId,
    );
    return data;
  },
  customJackups: async (
    tenantId: number,
    page: number,
    pageSize: number,
    draft?: boolean,
  ) => {
    const { data } = await TenantsService.tenantsRigsCustomJackupList(
      tenantId,
      draft,
      page,
      pageSize,
    );
    return data;
  },
  customSemi: async (tenantId: number, rigId: number) => {
    const { data } = await TenantsService.tenantsRigsCustomSemiRetrieve(
      rigId,
      tenantId,
    );
    return data;
  },
  customSemis: async (
    tenantId: number,
    page: number,
    pageSize: number,
    draft?: boolean,
  ) => {
    const { data } = await TenantsService.tenantsRigsCustomSemiList(
      tenantId,
      draft,
      page,
      pageSize,
    );
    return data;
  },
  createSemi: async (tenantId: number, data: CreateCustomSemiRig) => {
    const response = await TenantsService.tenantsRigsCustomSemiCreateCreate(
      tenantId,
      data,
    );
    return response.data;
  },
  updateSemi: async (
    tenantId: number,
    rigId: number,
    data: UpdateCustomSemiRig,
  ) => {
    const response = await TenantsService.tenantsRigsCustomSemiUpdateUpdate(
      rigId,
      tenantId,
      data,
    );
    return response.data;
  },
  deleteSemi: async (tenantId: number, rigId: number) => {
    const { data } = await TenantsService.tenantsRigsCustomSemiDeleteDestroy(
      rigId,
      tenantId,
    );
    return data;
  },
  customRigs: async ({
    tenantId,
    page,
    pageSize,
    ordering,
    latest,
    draft,
  }: {
    tenantId: number;
    page?: number;
    pageSize?: number;
    ordering?: Ordering;
    latest?: boolean;
    draft?: boolean;
  }) => {
    const { data } = await TenantsService.tenantsRigsCustomList(
      tenantId,
      draft,
      latest,
      ordering,
      page,
      pageSize,
    );
    return data;
  },
  customDrillship: async (tenantId: number, rigId: number) => {
    const { data } = await TenantsService.tenantsRigsCustomDrillshipRetrieve(
      rigId,
      tenantId,
    );
    return data;
  },
  customDrillships: async (
    tenantId: number,
    page: number,
    pageSize: number,
    draft?: boolean,
  ) => {
    const { data } = await TenantsService.tenantsRigsCustomDrillshipList(
      tenantId,
      draft,
      page,
      pageSize,
    );
    return data;
  },
  createDrillship: async (tenantId: number, data: CreateCustomDrillship) => {
    const response =
      await TenantsService.tenantsRigsCustomDrillshipCreateCreate(
        tenantId,
        data,
      );
    return response.data;
  },
  updateDrillship: async (
    tenantId: number,
    rigId: number,
    data: UpdateCustomDrillship,
  ) => {
    const response =
      await TenantsService.tenantsRigsCustomDrillshipUpdateUpdate(
        rigId,
        tenantId,
        data,
      );
    return response.data;
  },
  deleteDrillship: async (tenantId: number, rigId: number) => {
    const { data } =
      await TenantsService.tenantsRigsCustomDrillshipDeleteDestroy(
        rigId,
        tenantId,
      );
    return data;
  },
};
