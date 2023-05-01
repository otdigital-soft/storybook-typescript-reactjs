export default {
  me: (tenantId: number) => {
    return [`/tenants/${tenantId}/me/`];
  },

  invitationDetails: (tenantId: number, token: string) => {
    return [`/tenants/${tenantId}/invitations/${token}/`];
  },

  tenantDetails: (subdomain: string) => {
    return [`/tenants/subdomains/${subdomain}/`];
  },

  passwordResetTokenDetails: (tenantId: number, token: string, uid: string) => {
    return [`tenants/${tenantId}/password-reset/${uid}/${token}/`];
  },

  meLocked: (tenantId: number) => {
    return [`/tenants/${tenantId}/me/locked/`];
  },

  consentLatest: (tenantId: number) => {
    return [`/tenants/${tenantId}/consents/latest/`];
  },

  search: ({
    page,
    pageSize,
    tenantId,
    query,
  }: {
    query: string;
    tenantId: number;
    page?: number;
    pageSize?: number;
  }) => {
    return [`/tenants/${tenantId}/search/`, page, pageSize, query];
  },
};
