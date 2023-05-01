import { Ordering } from 'utils/ordering';

export default {
  conceptJackup: (tenantId: number, rigId: number) => {
    return [`/tenants/${tenantId}/rigs/concept/jackup/${rigId}/`];
  },
  conceptJackups: (tenantId: number, page: number, pageSize: number) => {
    return [`/tenants/${tenantId}/rigs/concept/jackup/`, page, pageSize];
  },
  conceptSemi: (tenantId: number, rigId: number) => {
    return [`/tenants/${tenantId}/rigs/concept/semi/${rigId}/`];
  },
  conceptSemis: (tenantId: number, page: number, pageSize: number) => {
    return [`/tenants/${tenantId}/rigs/concept/semi/`, page, pageSize];
  },
  conceptDrillship: (tenantId: number, rigId: number) => {
    return [`/tenants/${tenantId}/rigs/concept/drillship/${rigId}/`];
  },
  conceptDrillships: (tenantId: number, page: number, pageSize: number) => {
    return [`/tenants/${tenantId}/rigs/concept/drillship/`, page, pageSize];
  },
  allCustomRigs: (tenantId: number) => {
    return [`/tenants/${tenantId}/rigs/custom/`];
  },
  customRigs: ({
    page,
    pageSize,
    ordering,
    tenantId,
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
    return [
      `/tenants/${tenantId}/rigs/custom/`,
      page,
      pageSize,
      ordering,
      latest,
      draft,
    ];
  },
  customJackup: (tenantId: number, rigId: number) => {
    return [`/tenants/${tenantId}/rigs/custom/`, 'jackup', `/${rigId}/`];
  },
  customJackups: (
    tenantId: number,
    page: number,
    pageSize: number,
    draft?: boolean,
  ) => {
    return [
      `/tenants/${tenantId}/rigs/custom/`,
      'jackup',
      page,
      pageSize,
      draft,
    ];
  },
  customSemi: (tenantId: number, rigId: number) => {
    return [`/tenants/${tenantId}/rigs/custom/`, 'semi', `/${rigId}/`];
  },
  customSemis: (tenantId: number, page: number, pageSize: number) => {
    return [`/tenants/${tenantId}/rigs/custom/`, 'semi', page, pageSize];
  },
  customDrillship: (tenantId: number, rigId: number) => {
    return [`/tenants/${tenantId}/rigs/custom/`, 'drillship', `/${rigId}/`];
  },
  customDrillships: (tenantId: number, page: number, pageSize: number) => {
    return [`/tenants/${tenantId}/rigs/custom/`, 'drillship', page, pageSize];
  },
};
