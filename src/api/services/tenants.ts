import {
  Login,
  PasswordChange,
  PasswordReset,
  PasswordResetChangePassword,
  TenantInvitationSignup,
  TenantsService,
} from 'api/schema';
import { MeUpdate } from 'api/schema/models/MeUpdate';
import { isForbiddenError, isNotFoundError } from 'utils/api';

export default {
  login: async (tenantId: number, values: Login) => {
    const response = await TenantsService.tenantsLoginCreate(tenantId, values);
    return response.data;
  },

  logout: async (tenantId: number) => {
    const response = await TenantsService.tenantsLogoutCreate(tenantId);
    return response.data;
  },

  invitationDetails: async (tenantId: number, token: string) => {
    const response = await TenantsService.tenantsInvitationsRetrieve(
      tenantId,
      token,
    );
    return response.data;
  },

  signup: async (
    tenantId: number,
    token: string,
    data: TenantInvitationSignup,
  ) => {
    const response = await TenantsService.tenantsInvitationsSignupCreate(
      tenantId,
      token,
      data,
    );
    return response.data;
  },
  invitationAccept: async (tenantId: number, token: string) => {
    const response = await TenantsService.tenantsInvitationsAcceptCreate(
      tenantId,
      token,
    );
    return response.data;
  },

  me: async (tenantId: number) => {
    try {
      const response = await TenantsService.tenantsMeRetrieve(tenantId);
      return response.data;
    } catch (e) {
      if (isForbiddenError(e)) {
        return null;
      }
      throw e;
    }
  },

  meUpdate: async (tenantId: number, values: MeUpdate) => {
    const { data } = await TenantsService.tenantsMeUpdateCreate(
      tenantId,
      values,
    );
    return data;
  },

  tenantDetails: async (subdomain: string) => {
    const { data } = await TenantsService.tenantsSubdomainsRetrieve(subdomain);
    return data;
  },

  resetPassword: async (tenantId: number, values: PasswordReset) => {
    const { data } = await TenantsService.tenantsPasswordResetCreate(
      tenantId,
      values,
    );
    return data;
  },

  passwordResetTokenDetails: async (
    tenantId: number,
    token: string,
    uid: string,
  ) => {
    try {
      await TenantsService.tenantsPasswordResetRetrieve(tenantId, token, uid);
      return true;
    } catch (e) {
      if (isNotFoundError(e)) {
        return false;
      }
      throw e;
    }
  },

  changeForgottenPassword: async (
    tenantId: number,
    token: string,
    uid: string,
    values: PasswordResetChangePassword,
  ) => {
    const { data } = await TenantsService.tenantsPasswordResetChangeCreate(
      tenantId,
      token,
      uid,
      values,
    );
    return data;
  },

  policyLatestAccept: async (tenantId: number) => {
    const response = await TenantsService.tenantsPoliciesLatestAcceptCreate(
      tenantId,
    );
    return response.data;
  },

  consentLatest: async (tenantId: number) => {
    const response = await TenantsService.tenantsConsentsLatestRetrieve(
      tenantId,
    );
    return response.data;
  },

  meLocked: async (tenantId: number) => {
    const response = await TenantsService.tenantsMeLockedRetrieve(tenantId);
    return response.data;
  },

  changePassword: async (
    tenantId: number,
    email: string,
    values: PasswordChange,
  ) => {
    const response = await TenantsService.tenantsMePasswordCreate(
      tenantId,
      values,
    );
    return response.data;
  },

  deleteAccount: async (tenantId: number) => {
    const response = await TenantsService.tenantsDeleteAccountDestroy(tenantId);
    return response.data;
  },

  updateAvatar: async (tenantId: number, avatar: File) => {
    const { data } = await TenantsService.tenantsMeAvatarCreate(tenantId, {
      profile_image: avatar,
    });
    return data;
  },

  deleteAvatar: async (tenantId: number) => {
    const { data } = await TenantsService.tenantsMeAvatarDeleteDestroy(
      tenantId,
    );
    return data;
  },

  search: async ({
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
    const { data } = await TenantsService.tenantsSearchList(
      query,
      tenantId,
      page,
      pageSize,
    );
    return data;
  },
};
